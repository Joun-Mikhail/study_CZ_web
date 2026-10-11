// @custom-ar — Arabic twin of /stage/[slug]/.
import type { Metadata } from "next";
import { generateMetadata as en } from "@/app/stage/[slug]/page";
import { arabicMetadata } from "@/i18n/ar-metadata";
import { stages, type StageSlug } from "@/data/stages";
export { default, generateStaticParams } from "@/app/stage/[slug]/page";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const base = await en(props);
  const config = stages[slug as StageSlug];
  return arabicMetadata(
    `/stage/${slug}/`,
    base,
    config ? { title: config.h1.ar, description: config.intro.ar } : undefined
  );
}
