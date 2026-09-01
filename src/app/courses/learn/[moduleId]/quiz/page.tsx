import type { Metadata } from "next";
import { COURSE } from "@/data/course";
import { notFound } from "next/navigation";
import QuizClient from "./QuizClient";

type Props = { params: Promise<{ moduleId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId } = await params;
  const mod = COURSE.modules.find((m) => m.id === moduleId);
  if (!mod) return { title: "Quiz Not Found" };

  return {
    title: `${mod.quiz.title.en}`,
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return COURSE.modules.map((mod) => ({ moduleId: mod.id }));
}

export default async function Page({ params }: Props) {
  const { moduleId } = await params;
  const mod = COURSE.modules.find((m) => m.id === moduleId);
  if (!mod) notFound();

  return <QuizClient moduleId={moduleId} />;
}
