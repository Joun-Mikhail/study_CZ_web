/**
 * POST /api/course/admin  { password, action, email?, note? }   (owner only)
 *
 * actions:
 *   link      personal access link for a buyer (Stripe purchase or manual grant)
 *   grant     manual access without Stripe (e.g. InstaPay), logged with a note
 *   revoke    stop one buyer's access (e.g. after a refund); needs a note
 *   unrevoke  undo a revocation
 *   buyers    everyone with access: Stripe buyers plus manual grants
 *
 * Wrong passwords are slowed down, and Netlify rate-limits the endpoint per IP.
 * Emails and tokens are never written to the function logs.
 */
import { signCourseToken } from "../lib/course-token.mjs";
import { env, json, safeEqual, SITE_URL } from "../lib/http.mjs";
import { emailHasPaidCourse, listBuyers, type AccessProduct } from "../lib/stripe.mjs";
import { accessStore } from "../lib/course-access-store.mjs";

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

type Body = { password?: unknown; action?: unknown; email?: unknown; note?: unknown };

export default async function handler(req: Request) {
  const password = env("COURSE_ADMIN_PASSWORD");
  const key = env("STRIPE_COURSE_KEY");
  const secret = env("COURSE_TOKEN_SECRET");
  if (!password || password.length < 12 || !key || !secret) return json({ error: "not_configured" }, 503);

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {}

  if (!safeEqual(String(body.password ?? ""), password)) {
    await new Promise((r) => setTimeout(r, 1000)); // slow down guessing
    return json({ error: "wrong_password" }, 401);
  }

  const action = String(body.action ?? "");
  const email = String(body.email ?? "").trim().toLowerCase();
  const note = String(body.note ?? "").trim().slice(0, 200);
  const store = accessStore();
  const today = new Date().toISOString().slice(0, 10);
  const linkFor = async (sub: string) =>
    `${SITE_URL}/courses/learn/?access=${encodeURIComponent(await signCourseToken({ sub, src: "admin" }, secret))}`;

  try {
    if (action === "buyers") {
      const [stripeBuyers, grants, revoked] = await Promise.all([listBuyers(key), store.listGrants(), store.listRevoked()]);
      const revokedSet = new Set(revoked.map((r) => r.subject));
      const rows: { email: string; phone: string | null; date: string; product: AccessProduct | "manual"; note: string; revoked: boolean }[] = [
        ...stripeBuyers.map((b) => ({ ...b, note: "", revoked: revokedSet.has(b.email) })),
        ...grants.map((g) => ({ email: g.email, phone: null, date: g.date, product: "manual" as const, note: g.note, revoked: revokedSet.has(g.email) })),
      ].sort((a, b) => b.date.localeCompare(a.date));
      return json({ buyers: rows });
    }

    if (!EMAIL.test(email)) return json({ error: "bad_email" }, 400);

    if (action === "link") {
      if (await store.isRevoked(email)) return json({ error: "revoked" }, 409);
      const granted = (await store.getGrant(email)) !== null;
      if (!granted && !(await emailHasPaidCourse(email, key))) return json({ error: "no_purchase" }, 404);
      return json({ link: await linkFor(email) });
    }
    if (action === "grant") {
      if (!note) return json({ error: "note_required" }, 400);
      if (await store.isRevoked(email)) return json({ error: "revoked" }, 409);
      await store.setGrant({ email, note, date: today });
      return json({ link: await linkFor(email) });
    }
    if (action === "revoke") {
      if (!note) return json({ error: "note_required" }, 400);
      await store.revoke({ subject: email, note, date: today });
      return json({ ok: true });
    }
    if (action === "unrevoke") {
      await store.unrevoke(email);
      return json({ ok: true });
    }
    return json({ error: "bad_action" }, 400);
  } catch (err) {
    console.error("course-admin failed", action, err instanceof Error ? err.message : "unknown");
    return json({ error: "unavailable" }, 502);
  }
}

export const config = {
  path: "/api/course/admin",
  method: "POST",
  rateLimit: { windowLimit: 20, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
