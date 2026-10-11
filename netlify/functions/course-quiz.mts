/**
 * GET /api/course/quiz?module=<id>   Authorization: Bearer <token>
 */
import { requireBuyer, ID_PATTERN } from "../lib/course-auth.mjs";
import { loadCourseContent } from "../lib/course-content.mjs";
import { json } from "../lib/http.mjs";

export default async function handler(req: Request) {
  const buyer = await requireBuyer(req);
  if (buyer instanceof Response) return buyer;

  const moduleId = new URL(req.url).searchParams.get("module") ?? "";
  if (!ID_PATTERN.test(moduleId)) return json({ error: "bad_request" }, 400);

  const content = await loadCourseContent();
  if (!content) return json({ error: "content_unavailable" }, 503);
  const quiz = content.quizzes[moduleId];
  return quiz ? json({ quiz }) : json({ error: "not_found" }, 404);
}

export const config = { path: "/api/course/quiz", method: "GET" };
