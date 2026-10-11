/**
 * POST /api/course/admin-link  { password, email }
 * For the owner: when a buyer changes phone or laptop, look up their email in
 * Stripe and, if they paid for the course, return a personal access link to
 * send them on WhatsApp.
 */
import { signCourseToken } from "../lib/course-token.mjs";
import { env, json, safeEqual, SITE_URL } from "../lib/http.mjs";
import { emailHasPaidCourse } from "../lib/stripe.mjs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: Request) {
  const password = env("COURSE_ADMIN_PASSWORD");
  const key = env("STRIPE_COURSE_KEY");
  const secret = env("COURSE_TOKEN_SECRET");
  if (!password || password.length < 12 || !key || !secret) return json({ error: "not_configured" }, 503);

  let body: { password?: unknown; email?: unknown } = {};
  try {
    body = (await req.json()) as typeof body;
  } catch {}

  if (!safeEqual(String(body.password ?? ""), password)) {
    await new Promise((r) => setTimeout(r, 1000)); // slow down guessing
    return json({ error: "wrong_password" }, 401);
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) return json({ error: "bad_email" }, 400);

  try {
    if (!(await emailHasPaidCourse(email, key))) return json({ error: "no_purchase" }, 404);
  } catch (err) {
    console.error("course-admin-link failed", err instanceof Error ? err.message : err);
    return json({ error: "stripe_unavailable" }, 502);
  }

  const token = await signCourseToken({ sub: email, src: "admin" }, secret);
  return json({ link: `${SITE_URL}/courses/learn/?access=${encodeURIComponent(token)}` });
}

export const config = { path: "/api/course/admin-link", method: "POST" };
