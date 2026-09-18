import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stages, stageOrder, type StageSlug } from "@/data/stages";
import StagePageClient from "./StagePageClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stageOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = stages[slug as StageSlug];
  if (!config) return { title: "Not Found" };

  return {
    title: config.h1.en,
    description: config.intro.en,
    alternates: { canonical: `/stage/${slug}` },
  };
}

export default async function StagePage({ params }: Props) {
  const { slug } = await params;
  if (!stageOrder.includes(slug as StageSlug)) notFound();

  return <StagePageClient slug={slug as StageSlug} />;
}
