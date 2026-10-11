"use client";

import { useEffect, useState } from "react";
import type { Bilingual, Lesson, LessonResource, Quiz } from "@/data/course";
import { getAccessToken, revokeAccess, setAccessToken } from "@/lib/course-store";

/** Why paid content couldn't be shown. */
export type LockReason = "no-access" | "not-open" | "unavailable";

export type LessonBody =
  | { status: "loading" }
  | { status: "locked"; reason: LockReason }
  | { status: "ready"; content: Bilingual; videoUrl: string | null; resources: LessonResource[] };

export type QuizState = { status: "loading" } | { status: "locked"; reason: LockReason } | { status: "ready"; quiz: Quiz };

async function getJson<T>(url: string): Promise<{ ok: true; data: T } | { ok: false; reason: LockReason }> {
  const token = getAccessToken();
  if (!token) return { ok: false, reason: "no-access" };
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) {
      revokeAccess();
      return { ok: false, reason: "no-access" };
    }
    if (res.status === 403) return { ok: false, reason: "not-open" };
    if (!res.ok) return { ok: false, reason: "unavailable" };
    return { ok: true, data: (await res.json()) as T };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

/** Free lessons render from the public data; paid lessons load from the course API. */
export function useLessonBody(moduleId: string, lesson: Lesson | undefined): LessonBody {
  const [body, setBody] = useState<LessonBody>({ status: "loading" });
  useEffect(() => {
    if (!lesson) return;
    if (lesson.isFree && lesson.content) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- free lessons are ready immediately
      setBody({ status: "ready", content: lesson.content, videoUrl: lesson.videoUrl, resources: lesson.resources });
      return;
    }
    let cancelled = false;
    setBody({ status: "loading" });
    const params = new URLSearchParams({ module: moduleId, lesson: lesson.id });
    getJson<{ content: Bilingual; videoUrl: string | null; resources: LessonResource[] }>(
      `/api/course/lesson?${params}`
    ).then((r) => {
      if (cancelled) return;
      setBody(r.ok ? { status: "ready", ...r.data } : { status: "locked", reason: r.reason });
    });
    return () => {
      cancelled = true;
    };
  }, [moduleId, lesson]);
  return body;
}

export function useQuiz(moduleId: string): QuizState {
  const [state, setState] = useState<QuizState>({ status: "loading" });
  useEffect(() => {
    let cancelled = false;
    getJson<{ quiz: Quiz }>(`/api/course/quiz?${new URLSearchParams({ module: moduleId })}`).then((r) => {
      if (cancelled) return;
      setState(r.ok ? { status: "ready", quiz: r.data.quiz } : { status: "locked", reason: r.reason });
    });
    return () => {
      cancelled = true;
    };
  }, [moduleId]);
  return state;
}

export type ClaimResult = "ok" | "preorder" | "not-paid" | "unavailable";

/** Exchange the Stripe Checkout Session for an access token; "preorder" = paid, course not open yet. */
export async function claimAccess(sessionId: string): Promise<ClaimResult> {
  try {
    const res = await fetch("/api/course/claim", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });
    if (res.ok) {
      const { token, open } = (await res.json()) as { token: string; open?: boolean };
      setAccessToken(token);
      return open === false ? "preorder" : "ok";
    }
    return res.status === 403 || res.status === 400 ? "not-paid" : "unavailable";
  } catch {
    return "unavailable";
  }
}
