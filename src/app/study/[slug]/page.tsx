import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllFieldSlugs,
  getAllCitySlugs,
  slugToField,
  slugToCity,
} from "@/lib/seo-utils";
import StudyPageClient from "./StudyPageClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...getAllFieldSlugs(), ...getAllCitySlugs()].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const field = slugToField(slug);
  if (field) {
    return {
      title: `Study ${field} in Czech Republic | Verified Programmes`,
      description: `Explore verified English-taught ${field} programmes at Czech universities. Compare tuition, deadlines, and entry requirements.`,
      alternates: { canonical: `/study/${slug}` },
    };
  }

  const city = slugToCity(slug);
  if (city) {
    return {
      title: `Study in ${city}, Czech Republic | Universities & Programmes`,
      description: `Discover English-taught programmes at universities in ${city}, Czech Republic. Verified tuition fees, deadlines, and application info.`,
      alternates: { canonical: `/study/${slug}` },
    };
  }

  return { title: "Not Found" };
}

export default async function StudyPage({ params }: Props) {
  const { slug } = await params;

  const field = slugToField(slug);
  if (field) {
    return <StudyPageClient type="field" value={field} slug={slug} />;
  }

  const city = slugToCity(slug);
  if (city) {
    return <StudyPageClient type="city" value={city} slug={slug} />;
  }

  return notFound();
}
