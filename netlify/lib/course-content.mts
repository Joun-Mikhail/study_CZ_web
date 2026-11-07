/**
 * Paid course content. It lives in a separate private repository and is
 * downloaded at build time by tools/fetch-course-content.mjs into
 * netlify/course-content/content.json (git-ignored, shipped with the
 * functions through `included_files` in netlify.toml). It never reaches the
 * public repo or the static site.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

type Bilingual = { en: string; ar: string };

export type PaidLesson = {
  content: Bilingual;
  /** Bunny Stream video GUID, or null while not recorded yet. */
  videoId: string | null;
  resources: { title: Bilingual; url: string; type: "pdf" | "audio" | "cheatsheet" }[];
};

export type PaidQuiz = {
  title: Bilingual;
  passingScore: number;
  questions: {
    id: string;
    question: Bilingual;
    options: Bilingual[];
    correctIndex: number;
    explanation: Bilingual;
  }[];
};

export type CourseContent = {
  version: 1;
  /** Keyed by "moduleId/lessonId". */
  lessons: Record<string, PaidLesson>;
  /** Keyed by moduleId. */
  quizzes: Record<string, PaidQuiz>;
};

export const CONTENT_PATH = "netlify/course-content/content.json";

let cached: CourseContent | null = null;

export async function loadCourseContent(
  file: string = process.env.COURSE_CONTENT_FILE || path.resolve(process.cwd(), CONTENT_PATH)
): Promise<CourseContent | null> {
  if (cached) return cached;
  try {
    const parsed = JSON.parse(await readFile(file, "utf8")) as CourseContent;
    if (parsed.version !== 1 || typeof parsed.lessons !== "object") return null;
    cached = parsed;
    return parsed;
  } catch {
    return null;
  }
}

export function resetContentCache() {
  cached = null;
}
