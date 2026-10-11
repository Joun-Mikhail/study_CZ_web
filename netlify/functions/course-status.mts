/**
 * GET /api/course/status — which pieces are configured (booleans only, no
 * values), so a deploy can be checked from outside.
 */
import { loadCourseContent } from "../lib/course-content.mjs";
import { env, json } from "../lib/http.mjs";

export default async function handler() {
  const content = await loadCourseContent();
  return json({
    stripe: Boolean(env("STRIPE_COURSE_KEY")),
    tokenSecret: Boolean(env("COURSE_TOKEN_SECRET")),
    adminPassword: Boolean(env("COURSE_ADMIN_PASSWORD")),
    video: Boolean(env("BUNNY_LIBRARY_ID") && env("BUNNY_TOKEN_KEY")),
    content: content ? { lessons: Object.keys(content.lessons).length, quizzes: Object.keys(content.quizzes).length } : null,
  });
}

export const config = { path: "/api/course/status", method: "GET" };
