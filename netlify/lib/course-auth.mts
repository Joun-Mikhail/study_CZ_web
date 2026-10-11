import { bearerToken, verifyCourseToken, type CourseTokenPayload } from "./course-token.mjs";
import { env, json } from "./http.mjs";

/** Verifies the buyer's token, or returns the error response to send. */
export async function requireBuyer(req: Request): Promise<CourseTokenPayload | Response> {
  const secret = env("COURSE_TOKEN_SECRET");
  if (!secret) return json({ error: "not_configured" }, 503);
  const token = bearerToken(req);
  if (!token) return json({ error: "no_access" }, 401);
  const payload = await verifyCourseToken(token, secret);
  return payload ?? json({ error: "no_access" }, 401);
}

export const ID_PATTERN = /^[a-z0-9-]{1,80}$/;
