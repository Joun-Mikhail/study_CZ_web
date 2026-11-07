/**
 * POST /api/course/claim  { sessionId: "cs_live_…" }
 * Stripe sends buyers back to /courses/welcome/?session_id={CHECKOUT_SESSION_ID}.
 * If that Checkout Session is a paid course purchase, return an access token.
 */
import { signCourseToken } from "../lib/course-token.mjs";
import { env, json } from "../lib/http.mjs";
import { accessStore } from "../lib/course-access-store.mjs";
import { courseIsOpen, courseOpensAt } from "../lib/course-auth.mjs";
import { coursePaymentLinkIds, getCheckoutSession, isPaidCourseSession, StripeError } from "../lib/stripe.mjs";

const SESSION_ID = /^cs_(live|test)_[A-Za-z0-9]{10,200}$/;

export default async function handler(req: Request) {
  const key = env("STRIPE_COURSE_KEY");
  const secret = env("COURSE_TOKEN_SECRET");
  if (!key || !secret) return json({ error: "not_configured" }, 503);

  let sessionId = "";
  try {
    sessionId = String(((await req.json()) as { sessionId?: unknown }).sessionId ?? "");
  } catch {}
  if (!SESSION_ID.test(sessionId)) return json({ error: "bad_session" }, 400);

  try {
    const [session, linkIds] = await Promise.all([getCheckoutSession(sessionId, key), coursePaymentLinkIds(key)]);
    if (!isPaidCourseSession(session, linkIds)) return json({ error: "not_paid" }, 403);
    const subject = (session.customer_details?.email || session.id).toLowerCase();
    // A refunded buyer whose access was revoked can't unlock again with the old link.
    if (await accessStore().isRevoked(subject)) return json({ error: "revoked" }, 403);
    const token = await signCourseToken({ sub: subject, src: "checkout" }, secret);
    return json({ token, open: courseIsOpen(), opensAt: courseOpensAt() });
  } catch (err) {
    if (err instanceof StripeError && err.status === 404) return json({ error: "bad_session" }, 400);
    console.error("course-claim failed", err instanceof Error ? err.message : "unknown");
    return json({ error: "stripe_unavailable" }, 502);
  }
}

export const config = { path: "/api/course/claim", method: "POST" };
