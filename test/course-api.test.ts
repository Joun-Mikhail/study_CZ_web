import { createHash } from "node:crypto";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import stripeLinks from "../stripe-links.json";
import claim from "../netlify/functions/course-claim.mts";
import lesson from "../netlify/functions/course-lesson.mts";
import quiz from "../netlify/functions/course-quiz.mts";
import admin from "../netlify/functions/course-admin.mts";
import { signCourseToken, verifyCourseToken } from "../netlify/lib/course-token.mts";
import { signedBunnyEmbedUrl } from "../netlify/lib/bunny.mts";
import { resetStripeCache } from "../netlify/lib/stripe.mts";
import { resetContentCache } from "../netlify/lib/course-content.mts";
import { memoryStore, setAccessStoreForTests } from "../netlify/lib/course-access-store.mts";

const SECRET = "test-secret-that-is-long-enough-1234567890";
const PASSWORD = "correct horse battery";
const COURSE_PLINK = "plink_course123";
const STEP1_PLINK = "plink_step1";
const OLD_COURSE_PLINK = "plink_oldcourse";
const OPEN = "2020-01-01T00:00:00Z";

const contentFile = path.join(mkdtempSync(path.join(tmpdir(), "course-")), "content.json");
writeFileSync(
  contentFile,
  JSON.stringify({
    version: 1,
    lessons: { "first-week/airport-to-home": { content: { en: "Paid text", ar: "نص مدفوع" }, videoId: "video-guid-1", resources: [] } },
    quizzes: { "first-week": { title: { en: "Quiz", ar: "اختبار" }, passingScore: 70, questions: [] } },
  })
);

type Session = {
  id: string;
  created?: number;
  status: string;
  payment_status: string;
  payment_link: string | null;
  customer_details: { email: string | null; phone?: string | null };
};

function stripeMock(sessions: Record<string, Session>) {
  return vi.fn(async (input: string | URL | Request) => {
    const url = new URL(String(input));
    const ok = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });
    if (url.pathname === "/v1/payment_links") {
      return ok({
        data: [
          { id: COURSE_PLINK, url: stripeLinks.links.course.url },
          { id: STEP1_PLINK, url: stripeLinks.links.fullPackageStep1.url },
          { id: OLD_COURSE_PLINK, url: "https://buy.stripe.com/eVqcN42GK1X0fQvgE7fnO04" },
          { id: "plink_other", url: stripeLinks.links.consultation.url },
        ],
        has_more: false,
      });
    }
    if (url.pathname === "/v1/checkout/sessions") {
      const email = url.searchParams.get("customer_details[email]");
      const link = url.searchParams.get("payment_link");
      return ok({
        data: Object.values(sessions).filter((s) => (!email || s.customer_details.email === email) && s.payment_link === link),
        has_more: false,
      });
    }
    const id = decodeURIComponent(url.pathname.split("/").pop() ?? "");
    return sessions[id] ? ok(sessions[id]) : new Response("{}", { status: 404 });
  });
}

const base = { status: "complete", payment_status: "paid", created: 1791700000 };
const paid: Session = { ...base, id: "cs_live_paidcourse0001", payment_link: COURSE_PLINK, customer_details: { email: "student@example.com", phone: "+201000000000" } };
const fullJourney: Session = { ...base, id: "cs_live_fulljourney001", payment_link: STEP1_PLINK, customer_details: { email: "journey@example.com" } };
const oldLink: Session = { ...base, id: "cs_live_oldcourselink1", payment_link: OLD_COURSE_PLINK, customer_details: { email: "early@example.com" } };
const otherProduct: Session = { ...paid, id: "cs_live_otherproduct01", payment_link: "plink_other" };
const unpaid: Session = { ...paid, id: "cs_live_unpaidcourse1", payment_status: "unpaid", status: "open" };

beforeEach(() => {
  resetStripeCache();
  resetContentCache();
  setAccessStoreForTests(memoryStore());
  process.env.STRIPE_COURSE_KEY = "rk_live_test";
  process.env.COURSE_TOKEN_SECRET = SECRET;
  process.env.COURSE_ADMIN_PASSWORD = PASSWORD;
  process.env.COURSE_CONTENT_FILE = contentFile;
  process.env.COURSE_OPENS_AT = OPEN;
  process.env.BUNNY_LIBRARY_ID = "12345";
  process.env.BUNNY_TOKEN_KEY = "bunny-key";
  vi.stubGlobal("fetch", stripeMock(Object.fromEntries([paid, fullJourney, oldLink, otherProduct, unpaid].map((s) => [s.id, s]))));
});

afterEach(() => {
  vi.unstubAllGlobals();
  setAccessStoreForTests(null);
});

const post = (url: string, body: unknown) =>
  new Request(`https://studyczechia.com${url}`, { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });
const get = (url: string, token?: string) =>
  new Request(`https://studyczechia.com${url}`, { headers: token ? { authorization: `Bearer ${token}` } : {} });
const adminCall = (body: Record<string, unknown>) => admin(post("/api/course/admin", { password: PASSWORD, ...body }));
const lessonUrl = "/api/course/lesson?module=first-week&lesson=airport-to-home";

describe("course tokens", () => {
  it("round-trips and rejects tampering or the wrong secret", async () => {
    const token = await signCourseToken({ sub: "a@b.c", src: "checkout" }, SECRET);
    expect((await verifyCourseToken(token, SECRET))?.sub).toBe("a@b.c");
    expect(await verifyCourseToken(token, `${SECRET}x`)).toBeNull();
    const [body, sig] = token.split(".");
    expect(await verifyCourseToken(`${body}x.${sig}`, SECRET)).toBeNull();
    expect(await verifyCourseToken("garbage", SECRET)).toBeNull();
  });

  it("refuses short secrets", async () => {
    await expect(signCourseToken({ sub: "a", src: "admin" }, "short")).rejects.toThrow();
  });
});

describe("POST /api/course/claim", () => {
  it("unlocks course buyers, Full Journey buyers and buyers from older course links", async () => {
    for (const s of [paid, fullJourney, oldLink]) {
      const res = await claim(post("/api/course/claim", { sessionId: s.id }));
      expect(res.status).toBe(200);
      const body = await res.json();
      expect((await verifyCourseToken(body.token, SECRET))?.sub).toBe(s.customer_details.email);
      expect(body.open).toBe(true);
    }
  });

  it("reports pre-order status before the opening date", async () => {
    process.env.COURSE_OPENS_AT = "2999-01-01T00:00:00Z";
    const body = await (await claim(post("/api/course/claim", { sessionId: paid.id }))).json();
    expect(body.open).toBe(false);
    expect(body.opensAt).toBe("2999-01-01T00:00:00Z");
  });

  it("refuses other products, unpaid, unknown and revoked buyers", async () => {
    expect((await claim(post("/api/course/claim", { sessionId: otherProduct.id }))).status).toBe(403);
    expect((await claim(post("/api/course/claim", { sessionId: unpaid.id }))).status).toBe(403);
    expect((await claim(post("/api/course/claim", { sessionId: "cs_live_doesnotexist1" }))).status).toBe(400);
    expect((await claim(post("/api/course/claim", { sessionId: "not-a-session" }))).status).toBe(400);
    await adminCall({ action: "revoke", email: paid.customer_details.email, note: "refunded" });
    expect((await claim(post("/api/course/claim", { sessionId: paid.id }))).status).toBe(403);
  });

  it("reports missing configuration instead of failing open", async () => {
    delete process.env.STRIPE_COURSE_KEY;
    expect((await claim(post("/api/course/claim", { sessionId: paid.id }))).status).toBe(503);
  });
});

describe("lessons and quizzes", () => {
  it("need a valid token", async () => {
    expect((await lesson(get(lessonUrl))).status).toBe(401);
    expect((await lesson(get(lessonUrl, "bad.token"))).status).toBe(401);
  });

  it("return paid content and a signed video URL once the course is open", async () => {
    const token = await signCourseToken({ sub: "a@b.c", src: "checkout" }, SECRET);
    const res = await lesson(get(lessonUrl, token));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.content.en).toBe("Paid text");
    expect(body.videoUrl).toMatch(/^https:\/\/iframe\.mediadelivery\.net\/embed\/12345\/video-guid-1\?token=[0-9a-f]{64}&expires=\d+$/);
    expect((await lesson(get("/api/course/lesson?module=first-week&lesson=nope", token))).status).toBe(404);
    expect((await lesson(get("/api/course/lesson?module=../etc&lesson=x", token))).status).toBe(400);
  });

  it("stay closed to buyers before the opening date", async () => {
    process.env.COURSE_OPENS_AT = "2999-01-01T00:00:00Z";
    const token = await signCourseToken({ sub: "a@b.c", src: "checkout" }, SECRET);
    const res = await lesson(get(lessonUrl, token));
    expect(res.status).toBe(403);
    expect((await res.json()).error).toBe("not_open");
    expect((await quiz(get("/api/course/quiz?module=first-week", token))).status).toBe(403);
  });

  it("lock a revoked buyer on every device, and unlock after unrevoke", async () => {
    const phone = await signCourseToken({ sub: "refund@example.com", src: "checkout" }, SECRET);
    const laptop = await signCourseToken({ sub: "refund@example.com", src: "admin" }, SECRET);
    expect((await lesson(get(lessonUrl, phone))).status).toBe(200);
    await adminCall({ action: "revoke", email: "Refund@Example.com", note: "refunded 2026-10-12" });
    expect((await lesson(get(lessonUrl, phone))).status).toBe(401);
    expect((await quiz(get("/api/course/quiz?module=first-week", laptop))).status).toBe(401);
    await adminCall({ action: "unrevoke", email: "refund@example.com" });
    expect((await lesson(get(lessonUrl, laptop))).status).toBe(200);
  });

  it("say when the content was not deployed", async () => {
    process.env.COURSE_CONTENT_FILE = path.join(tmpdir(), "missing-course.json");
    const token = await signCourseToken({ sub: "a@b.c", src: "checkout" }, SECRET);
    expect((await lesson(get(lessonUrl, token))).status).toBe(503);
  });
});

describe("POST /api/course/admin", () => {
  it("rejects a wrong password", async () => {
    expect((await admin(post("/api/course/admin", { password: "nope", action: "buyers" }))).status).toBe(401);
  });

  it("makes links only for buyers or manual grants", async () => {
    expect((await adminCall({ action: "link", email: "nobody@example.com" })).status).toBe(404);
    const res = await adminCall({ action: "link", email: " Journey@Example.com " });
    expect(res.status).toBe(200);
    const url = new URL((await res.json()).link);
    expect(url.pathname).toBe("/courses/learn/");
    expect((await verifyCourseToken(url.searchParams.get("access") ?? "", SECRET))?.sub).toBe("journey@example.com");
  });

  it("grants InstaPay buyers manually, with a required note", async () => {
    expect((await adminCall({ action: "grant", email: "instapay@example.com" })).status).toBe(400);
    const res = await adminCall({ action: "grant", email: "instapay@example.com", note: "InstaPay 12 Oct" });
    expect(res.status).toBe(200);
    expect((await adminCall({ action: "link", email: "instapay@example.com" })).status).toBe(200);
  });

  it("lists Stripe buyers and manual grants, with revocations flagged", async () => {
    await adminCall({ action: "grant", email: "instapay@example.com", note: "InstaPay" });
    await adminCall({ action: "revoke", email: "early@example.com", note: "refund" });
    const { buyers } = await (await adminCall({ action: "buyers" })).json();
    const byEmail = Object.fromEntries(buyers.map((b: { email: string }) => [b.email, b]));
    expect(byEmail["student@example.com"]).toMatchObject({ product: "course", phone: "+201000000000", revoked: false });
    expect(byEmail["journey@example.com"].product).toBe("fullJourney");
    expect(byEmail["instapay@example.com"]).toMatchObject({ product: "manual", note: "InstaPay" });
    expect(byEmail["early@example.com"].revoked).toBe(true);
    expect(byEmail["other@example.com"]).toBeUndefined();
  });

  it("won't hand out links to revoked buyers", async () => {
    await adminCall({ action: "revoke", email: "student@example.com", note: "refund" });
    expect((await adminCall({ action: "link", email: "student@example.com" })).status).toBe(409);
  });
});

describe("Bunny signing", () => {
  it("matches Bunny's token formula", async () => {
    const now = Date.UTC(2027, 0, 1);
    const url = new URL(await signedBunnyEmbedUrl("1", "vid", "key", 3600, now));
    const expires = url.searchParams.get("expires")!;
    expect(expires).toBe(String(now / 1000 + 3600));
    expect(url.searchParams.get("token")).toBe(createHash("sha256").update(`keyvid${expires}`).digest("hex"));
  });
});
