import type { Metadata } from "next";
import { COURSE } from "@/data/course";
import { notFound } from "next/navigation";
import LessonClient from "./LessonClient";

type Props = { params: Promise<{ moduleId: string; lessonId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId, lessonId } = await params;
  const mod = COURSE.modules.find((m) => m.id === moduleId);
  const lesson = mod?.lessons.find((l) => l.id === lessonId);
  if (!mod || !lesson) return { title: "Lesson Not Found" };

  return {
    title: `${lesson.title.en} — ${mod.title.en}`,
    description: lesson.content.en.slice(0, 160),
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return COURSE.modules.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      moduleId: mod.id,
      lessonId: lesson.id,
    }))
  );
}

export default async function Page({ params }: Props) {
  const { moduleId, lessonId } = await params;
  const mod = COURSE.modules.find((m) => m.id === moduleId);
  const lesson = mod?.lessons.find((l) => l.id === lessonId);
  if (!mod || !lesson) notFound();

  return <LessonClient moduleId={moduleId} lessonId={lessonId} />;
}
