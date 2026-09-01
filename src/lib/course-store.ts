"use client";

const STORAGE_KEY = "studycz_course";
const ACCESS_KEY = "studycz_access";

// Valid access codes — in production you'd verify against a backend
// For now, you manually give these codes to students after Stripe payment
const VALID_CODES = [
  "CZECH2024", "PRAGUE90", "STUDY-CZ-VIP",
  "FIRST90DAYS", "CZECHIA2025", "WELCOME-CZ",
];

export type CourseProgress = {
  completedLessons: string[]; // "moduleId/lessonId"
  quizScores: Record<string, number>; // moduleId -> score percentage
  lastVisited: string | null; // "moduleId/lessonId"
};

function getDefault(): CourseProgress {
  return { completedLessons: [], quizScores: {}, lastVisited: null };
}

export function hasAccess(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(ACCESS_KEY) === "true";
  } catch {
    return false;
  }
}

export function validateCode(code: string): boolean {
  const normalized = code.trim().toUpperCase();
  if (VALID_CODES.includes(normalized)) {
    try {
      localStorage.setItem(ACCESS_KEY, "true");
    } catch {}
    return true;
  }
  return false;
}

export function revokeAccess(): void {
  try {
    localStorage.removeItem(ACCESS_KEY);
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
