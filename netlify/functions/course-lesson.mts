/**
 * GET /api/course/lesson?module=<id>&lesson=<id>   Authorization: Bearer <token>
 * Returns the paid lesson text, resources and a short-lived signed video URL.
 */
import { requireBuyer, ID_PATTERN } from "../lib/course-auth.mjs";
import { signedBunnyEmbedUrl } from "../lib/bunny.mjs";
import { loadCourseContent } from "../lib/course-content.mjs";
import { env, json } from "../lib/http.mjs";

export default async function handler(req: Request) {
  const buyer = await requireBuyer(req);
  if (buyer instanceof Response) return buyer;

  const url = new URL(req.url);
  const moduleId = url.searchParams.get("module") ?? "";
  const lessonId = url.searchParams.get("lesson") ?? "";
  if (!ID_PATTERN.test(moduleId) || !ID_PATTERN.test(lessonId)) return json({ error: "bad_request" }, 400);

  const content = await loadCourseContent();
  if (!content) return json({ error: "content_unavailable" }, 503);
  const lesson = content.lessons[`${moduleId}/${lessonId}`];
  if (!lesson) return json({ error: "not_found" }, 404);

  const library = env("BUNNY_LIBRARY_ID");
  const tokenKey = env("BUNNY_TOKEN_KEY");
  const videoUrl =
    lesson.videoId && library && tokenKey ? await signedBunnyEmbedUrl(library, lesson.videoId, tokenKey) : null;

  return json({ content: lesson.content, resources: lesson.resources ?? [], videoUrl });
}

export const config = { path: "/api/course/lesson", method: "GET" };
