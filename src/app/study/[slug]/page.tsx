import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllFieldSlugs,
  getAllCitySlugs,
  getAllDegreeSlugs,
  slugToField,
  slugToCity,
  slugToDegree,
} from "@/lib/seo-utils";
import { medicineRows } from "@/lib/medicine-guide";
import StudyPageClient from "./StudyPageClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...getAllFieldSlugs(), ...getAllCitySlugs(), ...getAllDegreeSlugs()].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const field = slugToField(slug);
  if (field === "Medicine") {
    const rows = medicineRows();
    const from = Math.min(...rows.map((r) => r.programme.tuitionEurPerYear));
    return {
      title: "Study Medicine in Czech Republic in English: Fees & Exams",
      description: `General Medicine and Dentistry in English at Czech universities: ${rows.length} programmes from €${from.toLocaleString("en-US")} a year, entrance exam subjects and official fee sources.`,
      alternates: { canonical: `/study/${slug}` },
    };
  }
  if (field) {
    return {
      title: `Study ${field} in Czech Republic`,
      description: `Explore English-taught ${field} programmes at Czech universities. Compare tuition, deadlines, and entry requirements.`,
      alternates: { canonical: `/study/${slug}` },
    };
  }

  const city = slugToCity(slug);
  if (city) {
    return {
      title: `Study in ${city}, Czech Republic`,
      description: `Discover English-taught programmes at universities in ${city}, Czech Republic. Verified tuition fees, deadlines, and application info.`,
      alternates: { canonical: `/study/${slug}` },
    };
  }

  const degree = slugToDegree(slug);
  if (degree) {
    return {
      title: `${degree} Programmes in Czech Republic`,
      description: `Browse English-taught ${degree}'s degree programmes at Czech universities. Compare tuition, deadlines, and application requirements.`,
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

  const degree = slugToDegree(slug);
  if (degree) {
    return <StudyPageClient type="degree" value={degree} slug={slug} />;
  }

  return notFound();
}
