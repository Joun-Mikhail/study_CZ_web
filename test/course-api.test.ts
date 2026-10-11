import { createHash } from "node:crypto";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import stripeLinks from "../stripe-links.json";
import claim from "../netlify/functions/course-claim.mts";
import lesson from "../netlify/functions/course-lesson.mts";
import quiz from "../netlify/functions/course-quiz.mts";
import adminLink from "../netlify/functions/course-admin-link.mts";
import { signCourseToken, verifyCourseToken } from "../netlify/lib/course-token.mts";
import { signedBunnyEmbedUrl } from "../netlify/lib/bunny.mts";
import { resetStripeCache } from "../netlify/lib/stripe.mts";
import { resetContentCache } from "../netlify/lib/course-content.mts";

const SECRET = "test-secret-that-is-long-enough-1234567890";
const COURSE_PLINK = "plink_course123";

const contentFile = path.join(mkdtempSync(path.join(tmpdir(), "course-")), "content.json");
writeFileSync(
  contentFile,
  JSON.stringify({
    version: 1,
    lessons: {
      "first-week/airport-to-home": {
        content: { en: "Paid text", ar: "نص مدفوع" },
        videoId: "video-guid-1",
        resources: [],
      },
    },
    quizzes: { "first-week": { title: { en: "Quiz", ar: "اختبار" }, passingScore: 70, questions: [] } },
  })
);

type Session = {
  id: string;
  status: string;
  payment_status: string;
  payment_link: string | null;
  customer_details: { email: string | null };
};

function stripeMock(sessions: Record<string, Session>) {
  return vi.fn(async (input: string | URL | Request) => {
    const url = new URL(String(input));
    const ok = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });
    if (url.pathname === "/v1/payment_links") {
      return ok({
        data: [
          { id: COURSE_PLINK, url: stripeLinks.links.course.url },
          { id: "plink_other", url: "https://buy.stripe.com/other" },
        ],
        has_more: false,
      });
    }
    if (url.pathname === "/v1/checkout/sessions") {
      const email = url.searchParams.get("customer_details[email]");
      const link = url.searchParams.get("payment_link");
      return ok({
        data: Object.values(sessions).filter((s) => s.customer_details.email === email && s.payment_link === link),
      });
    }
    const id = decodeURIComponent(url.pathname.split("/").pop() ?? "");
    return sessions[id] ? ok(sessions[id]) : new Response("{}", { status: 404 });
  });
}

const paid: Session = {
  id: "cs_live_paidcourse0001",
  status: "complete",
  payment_status: "paid",
  payment_link: COURSE_PLINK,
  customer_details: { email: "student@example.com" },
};
const otherProduct: Session = { ...paid, id: "cs_live_otherproduct01", payment_link: "plink_other" };
const unpaid: Session = { ...paid, id: "cs_live_unpaidcourse1", payment_status: "unpaid", status: "open" };

beforeEach(() => {
  resetStripeCache();
  resetContentCache();
  process.env.STRIPE_COURSE_KEY = "rk_live_test";
  process.env.COURSE_TOKEN_SECRET = SECRET;
  process.env.COURSE_ADMIN_PASSWORD = "correct horse battery";
  process.env.COURSE_CONTENT_FILE = contentFile;
  process.env.BUNNY_LIBRARY_ID = "12345";
  process.env.BUNNY_TOKEN_KEY = "bunny-key";
  vi.stubGlobal("fetch", stripeMock({ [paid.id]: paid, [otherProduct.id]: otherProduct, [unpaid.id]: unpaid }));
});

afterEach(() => vi.unstubAllGlobals());

const post = (url: string, body: unknown) =>
  new Request(`https://studyczechia.com${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
const get = (url: string, token?: string) =>
  new Request(`https://studyczechia.com${url}`, { headers: token ? { authorization: `Bearer ${token}` } : {} });

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
  it("gives a token for a paid course checkout", async () => {
    const res = await claim(post("/api/course/claim", { sessionId: paid.id }));
    expect(res.status).toBe(200);
    const { token } = await res.json();
    expect((await verifyCourseToken(token, SECRET))?.sub).toBe("student@example.com");
  });

  it("refuses other products, unpaid and unknown sessions", async () => {
    expect((await claim(post("/api/course/claim", { sessionId: otherProduct.id }))).status).toBe(403);
    expect((await claim(post("/api/course/claim", { sessionId: unpaid.id }))).status).toBe(403);
    expect((await claim(post("/api/course/claim", { sessionId: "cs_live_doesnotexist1" }))).status).toBe(400);
    expect((await claim(post("/api/course/claim", { sessionId: "not-a-session" }))).status).toBe(400);
  });

  it("reports missing configuration instead of failing open", async () => {
    delete process.env.STRIPE_COURSE_KEY;
    expect((await claim(post("/api/course/claim", { sessionId: paid.id }))).status).toBe(503);
  });
});

describe("GET /api/course/lesson and quiz", () => {
  const lessonUrl = "/api/course/lesson?module=first-week&lesson=airport-to-home";

  it("needs a valid token", async () => {
    expect((await lesson(get(lessonUrl))).status).toBe(401);
    expect((await lesson(get(lessonUrl, "bad.token"))).status).toBe(401);
  });

  it("returns paid content and a signed video URL", async () => {
    const token = await signCourseToken({ sub: "a@b.c", src: "checkout" }, SECRET);
    const res = await lesson(get(lessonUrl, token));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.content.en).toBe("Paid text");
    expect(body.videoUrl).toMatch(
      /^https:\/\/iframe\.mediadelivery\.net\/embed\/12345\/video-guid-1\?token=[0-9a-f]{64}&expires=\d+$/
    );
    expect((await lesson(get("/api/course/lesson?module=first-week&lesson=nope", token))).status).toBe(404);
    expect((await lesson(get("/api/course/lesson?module=../etc&lesson=x", token))).status).toBe(400);
  });

  it("returns quizzes to buyers only", async () => {
    const token = await signCourseToken({ sub: "a@b.c", src: "admin" }, SECRET);
    expect((await quiz(get("/api/course/quiz?module=first-week"))).status).toBe(401);
    const res = await quiz(get("/api/course/quiz?module=first-week", token));
    expect((await res.json()).quiz.passingScore).toBe(70);
  });

  it("says when the content was not deployed", async () => {
    process.env.COURSE_CONTENT_FILE = path.join(tmpdir(), "missing-course.json");
    const token = await signCourseToken({ sub: "a@b.c", src: "checkout" }, SECRET);
    expect((await lesson(get(lessonUrl, token))).status).toBe(503);
  });
});

describe("POST /api/course/admin-link", () => {
  it("rejects a wrong password", async () => {
    const res = await adminLink(post("/api/course/admin-link", { password: "nope", email: "student@example.com" }));
    expect(res.status).toBe(401);
  });

  it("only makes links for emails that paid", async () => {
    const password = "correct horse battery";
    const none = await adminLink(post("/api/course/admin-link", { password, email: "nobody@example.com" }));
    expect(none.status).toBe(404);
    const res = await adminLink(post("/api/course/admin-link", { password, email: " Student@Example.com " }));
    expect(res.status).toBe(200);
    const { link } = await res.json();
    const url = new URL(link);
    expect(url.pathname).toBe("/courses/learn/");
    expect((await verifyCourseToken(url.searchParams.get("access") ?? "", SECRET))?.src).toBe("admin");
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
