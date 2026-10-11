import subscribe from "../netlify/functions/email-subscribe.mts";
import unsubscribe from "../netlify/functions/email-unsubscribe.mts";
import { dueSeriesStep, dueReminders } from "../netlify/functions/email-daily.mts";
import { unsubscribeUrl, verifyUnsubscribe } from "../netlify/lib/email-links.mts";
import { eligibilityResultEmail, sanitizeAnswers, knownProgrammeIds, render, seriesBlocks, SERIES_DAYS } from "../netlify/lib/email-templates.mts";
import { programmes } from "@/data/programmes";

const SECRET = "email-link-secret-that-is-long-enough-123456";

type Call = { method: string; path: string; body?: Record<string, unknown> };

function brevoMock(existing: Record<string, unknown> | null = null) {
  const calls: Call[] = [];
  const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = new URL(String(input));
    const path = url.pathname.replace("/v3", "") + url.search;
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    calls.push({ method: init?.method ?? "GET", path, body });
    const ok = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status });
    if (path.startsWith("/contacts/lists?")) return ok({ lists: [{ id: 7, name: "Study Czechia - deadline reminders" }, { id: 8, name: "Study Czechia - tips and offers" }] });
    if (path === "/contacts/attributes") return ok({ attributes: [] });
    if (path.startsWith("/contacts/attributes/normal/")) return new Response(null, { status: 204 });
    if (init?.method === "GET" && path.startsWith("/contacts/") && path.includes("%40")) return existing ? ok(existing) : ok({ code: "document_not_found" }, 404);
    if (path === "/contacts") return ok({ id: 1 }, 201);
    if (path === "/smtp/email") return ok({ messageId: "x" }, 201);
    return ok({});
  });
  return { calls, fetchMock };
}

const post = (body: unknown) =>
  new Request("https://studyczechia.com/api/email/subscribe", { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });

beforeEach(() => {
  process.env.BREVO_API_KEY = "xkeysib-test";
  process.env.EMAIL_LINK_SECRET = SECRET;
  process.env.EMAIL_FROM_ADDRESS = "john@studyczechia.com";
});
afterEach(() => vi.unstubAllGlobals());

const answers = {
  highestEducation: "highSchool",
  gpa: "85",
  targetLevel: "bachelor",
  apostille: "yes",
  translation: "english",
  passportValid: "yes",
  proofOfFunds: "canArrange",
  fundingSource: "family",
  startWhen: "nextYear",
  appliedBefore: "no",
  englishCert: "plan",
  czechPrep: "no",
};

describe("email templates", () => {
  it("only keeps known answer fields, trimmed", () => {
    const a = sanitizeAnswers({ ...answers, firstName: "<script>", email: "x@y.z", gpa: "8".repeat(50) })!;
    expect(a.firstName).toBe("");
    expect(a.email).toBe("");
    expect(a.gpa.length).toBeLessThanOrEqual(8);
  });

  it("builds the eligibility result from the scoring, in both languages", () => {
    const en = eligibilityResultEmail(sanitizeAnswers(answers)!, "en");
    expect(en.subject).toMatch(/^Your result: \d+% ready/);
    const ar = eligibilityResultEmail(sanitizeAnswers(answers)!, "ar");
    expect(ar.subject).toContain("نتيجتك");
    const html = render("ar", ar.subject, ar.blocks, { kind: "requested", unsubscribeAll: "https://x/u" }).html;
    expect(html).toContain('dir="rtl"');
    expect(html).toContain("utm_source=email");
  });

  it("escapes HTML", () => {
    const html = render("en", "<b>", [{ p: '<img src=x onerror="alert(1)">' }], { kind: "requested" }).html;
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;img");
  });

  it("accepts only real programme IDs", () => {
    const real = programmes[0].id;
    expect(knownProgrammeIds([real, "nope", real, 5])).toEqual([real]);
  });

  it("has an email for every series step", () => {
    for (let i = 0; i < SERIES_DAYS.length; i++) expect(seriesBlocks(i, "en")).not.toBeNull();
    expect(seriesBlocks(SERIES_DAYS.length, "en")).toBeNull();
  });
});

describe("POST /api/email/subscribe", () => {
  it("is off until configured", async () => {
    delete process.env.BREVO_API_KEY;
    expect((await subscribe(post({ email: "a@b.cz", source: "checklist" }))).status).toBe(503);
  });

  it("rejects bad input and quietly drops bots", async () => {
    const { fetchMock } = brevoMock();
    vi.stubGlobal("fetch", fetchMock);
    expect((await subscribe(post({ email: "nope", source: "checklist" }))).status).toBe(400);
    expect((await subscribe(post({ email: "a@b.cz", source: "spam" }))).status).toBe(400);
    expect((await subscribe(post({ email: "a@b.cz", source: "deadline", programmeIds: ["fake"] }))).status).toBe(400);
    expect((await subscribe(post({ email: "a@b.cz", source: "checklist", website: "http://spam" }))).status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("emails the eligibility result and adds tips only with consent", async () => {
    const { calls, fetchMock } = brevoMock();
    vi.stubGlobal("fetch", fetchMock);
    const res = await subscribe(post({ email: "Student@Example.com", locale: "ar", source: "eligibility", answers, marketing: false }));
    expect(res.status).toBe(200);
    const contact = calls.find((c) => c.path === "/contacts" && c.method === "POST")!;
    expect(contact.body!.email).toBe("student@example.com");
    expect(contact.body!.listIds).toEqual([]);
    expect((contact.body!.attributes as Record<string, unknown>).MARKETING).toBeUndefined();
    const mail = calls.find((c) => c.path === "/smtp/email")!;
    expect((mail.body!.to as { email: string }[])[0].email).toBe("student@example.com");
    expect(String(mail.body!.subject)).toContain("نتيجتك");
    expect(String(mail.body!.htmlContent)).not.toContain("Student@Example.com");
  });

  it("follows programmes and opts in to tips when asked", async () => {
    const { calls, fetchMock } = brevoMock();
    vi.stubGlobal("fetch", fetchMock);
    const id = programmes[0].id;
    const res = await subscribe(post({ email: "a@b.cz", source: "deadline", programmeIds: [id], marketing: true }));
    expect(res.status).toBe(200);
    const contact = calls.find((c) => c.path === "/contacts" && c.method === "POST")!;
    expect(contact.body!.listIds).toEqual([7, 8]);
    const attrs = contact.body!.attributes as Record<string, unknown>;
    expect(attrs.PROGRAMMES).toBe(id);
    expect(attrs.MARKETING).toBe(true);
    expect(attrs.SERIES_STEP).toBe(0);
    const mail = calls.find((c) => c.path === "/smtp/email")!;
    expect((mail.body!.headers as Record<string, string>)["List-Unsubscribe"]).toMatch(/^<https:\/\/studyczechia\.com\/api\/email\/unsubscribe\?/);
  });
});

describe("unsubscribe", () => {
  it("signs and verifies links per scope", async () => {
    const url = new URL(await unsubscribeUrl("A@B.cz", "tips", SECRET));
    expect(await verifyUnsubscribe("a@b.cz", "tips", url.searchParams.get("t")!, SECRET)).toBe(true);
    expect(await verifyUnsubscribe("a@b.cz", "all", url.searchParams.get("t")!, SECRET)).toBe(false);
    expect(await verifyUnsubscribe("c@b.cz", "tips", url.searchParams.get("t")!, SECRET)).toBe(false);
  });

  it("asks for confirmation on GET and unsubscribes on POST", async () => {
    const { calls, fetchMock } = brevoMock({ email: "a@b.cz", attributes: {}, listIds: [8] });
    vi.stubGlobal("fetch", fetchMock);
    const link = await unsubscribeUrl("a@b.cz", "tips", SECRET);
    const get = await unsubscribe(new Request(link));
    expect(await get.text()).toContain("<form method=\"post\"");
    expect(calls.some((c) => c.method === "PUT")).toBe(false);
    const done = await unsubscribe(new Request(link, { method: "POST" }));
    expect(done.status).toBe(200);
    const put = calls.find((c) => c.method === "PUT")!;
    expect(put.body).toEqual({ attributes: { MARKETING: false }, unlinkListIds: [8] });
  });

  it("rejects forged links", async () => {
    const res = await unsubscribe(new Request("https://studyczechia.com/api/email/unsubscribe?e=a%40b.cz&s=all&t=forged", { method: "POST" }));
    expect(res.status).toBe(400);
  });
});

describe("daily job schedule", () => {
  const day = 86_400_000;
  const signup = Date.parse("2026-11-01T00:00:00Z");

  it("sends the next tip only when it's due and only to opted-in contacts", () => {
    const c = (step: number, marketing = true) => ({ email: "a@b.cz", listIds: [8], attributes: { MARKETING: marketing, SIGNUP_DATE: "2026-11-01", SERIES_STEP: step } });
    expect(dueSeriesStep(c(0), signup)).toBeNull();
    expect(dueSeriesStep(c(0), signup + 1 * day)).toBe(0);
    expect(dueSeriesStep(c(1), signup + 2 * day)).toBeNull();
    expect(dueSeriesStep(c(1), signup + 3 * day)).toBe(1);
    expect(dueSeriesStep(c(6), signup + 99 * day)).toBeNull();
    expect(dueSeriesStep(c(0, false), signup + 5 * day)).toBeNull();
  });

  it("sends no reminders for programmes without a confirmed deadline", () => {
    const unconfirmed = programmes.find((p) => !p.applicationDeadline)!;
    expect(dueReminders({ email: "a@b.cz", listIds: [7], attributes: { PROGRAMMES: unconfirmed.id } })).toEqual([]);
  });
});
