import { bearerToken, verifyCourseToken, type CourseTokenPayload } from "./course-token.mjs";
import { accessStore } from "./course-access-store.mjs";
import { env, json } from "./http.mjs";

/** When paid lessons open. Override with COURSE_OPENS_AT (ISO date-time). */
export const DEFAULT_OPENS_AT = "2027-01-01T00:00:00+01:00";

export function courseOpensAt(): string {
  const value = env("COURSE_OPENS_AT");
  return value && !Number.isNaN(Date.parse(value)) ? value : DEFAULT_OPENS_AT;
}

export function courseIsOpen(now = Date.now()): boolean {
  return now >= Date.parse(courseOpensAt());
}

/** Verifies the buyer's token and that it hasn't been revoked. */
export async function requireBuyer(req: Request): Promise<CourseTokenPayload | Response> {
  const secret = env("COURSE_TOKEN_SECRET");
  if (!secret) return json({ error: "not_configured" }, 503);
  const token = bearerToken(req);
  if (!token) return json({ error: "no_access" }, 401);
  const payload = await verifyCourseToken(token, secret);
  if (!payload) return json({ error: "no_access" }, 401);
  if (await accessStore().isRevoked(payload.sub)) return json({ error: "no_access" }, 401);
  return payload;
}

/** As requireBuyer, and the course must have opened (pre-orders wait). */
export async function requireOpenCourse(req: Request): Promise<CourseTokenPayload | Response> {
  const buyer = await requireBuyer(req);
  if (buyer instanceof Response) return buyer;
  if (!courseIsOpen()) return json({ error: "not_open", opensAt: courseOpensAt() }, 403);
  return buyer;
}

export const ID_PATTERN = /^[a-z0-9-]{1,80}$/;
