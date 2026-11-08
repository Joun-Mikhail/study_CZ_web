"use client";

const STORAGE_KEY = "studycz_course";
/** Signed access token issued by the course API after a verified purchase. */
const TOKEN_KEY = "studycz_course_token";
/** Old client-side flag from the hard-coded-code era; cleared on sight. */
const LEGACY_ACCESS_KEY = "studycz_access";

export type CourseProgress = {
  completedLessons: string[]; // "moduleId/lessonId"
  quizScores: Record<string, number>; // moduleId -> score percentage
  lastVisited: string | null; // "moduleId/lessonId"
};

function getDefault(): CourseProgress {
  return { completedLessons: [], quizScores: {}, lastVisited: null };
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    localStorage.removeItem(LEGACY_ACCESS_KEY);
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {}
}

/**
 * Whether this browser holds an access token. The token is only checked by
 * the course API when a paid lesson is loaded, so this is a hint for the UI,
 * not a lock: paid content never ships in the site itself.
 */
export function hasAccess(): boolean {
  return Boolean(getAccessToken());
}

/**
 * Personal access links look like /courses/learn/?access=<token>. Store the
 * token and remove it from the address bar so it isn't shared by accident.
 */
export function captureAccessFromUrl(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("access");
    if (!token) return;
    setAccessToken(token);
    url.searchParams.delete("access");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  } catch {}
}

export function revokeAccess(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LEGACY_ACCESS_KEY);
  } catch {}
}

export function getProgress(): CourseProgress {
  if (typeof window === "undefined") return getDefault();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefault();
    return JSON.parse(raw) as CourseProgress;
  } catch {
    return getDefault();
  }
}

function saveProgress(p: CourseProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {}
}

export function markLessonComplete(moduleId: string, lessonId: string) {
  const p = getProgress();
  const key = `${moduleId}/${lessonId}`;
  if (!p.completedLessons.includes(key)) {
    p.completedLessons.push(key);
  }
  saveProgress(p);
}

export function isLessonComplete(moduleId: string, lessonId: string): boolean {
  const p = getProgress();
  return p.completedLessons.includes(`${moduleId}/${lessonId}`);
}

export function saveQuizScore(moduleId: string, score: number) {
  const p = getProgress();
  p.quizScores[moduleId] = score;
  saveProgress(p);
}

export function getQuizScore(moduleId: string): number | null {
  const p = getProgress();
  return p.quizScores[moduleId] ?? null;
}

export function setLastVisited(moduleId: string, lessonId: string) {
  const p = getProgress();
  p.lastVisited = `${moduleId}/${lessonId}`;
  saveProgress(p);
}

export function getLastVisited(): { moduleId: string; lessonId: string } | null {
  const p = getProgress();
  if (!p.lastVisited) return null;
  const [moduleId, lessonId] = p.lastVisited.split("/");
  return { moduleId, lessonId };
}

export function getModuleProgress(moduleId: string, totalLessons: number): number {
  const p = getProgress();
  const completed = p.completedLessons.filter((k) => k.startsWith(`${moduleId}/`)).length;
  return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
}
