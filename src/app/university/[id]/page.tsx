import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { universities } from "@/data/universities";
import { universitiesV2 } from "@/data/universities-v2";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { noindexUnless, universityPageIndexable } from "@/lib/seo-utils";
import UniversityDetailClient from "./UniversityDetailClient";
import { universityLinks } from "@/lib/university-links";
import { universityJsonLd } from "@/lib/university-schema";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return universities.map((u) => ({ id: u.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const uni = universities.find((u) => u.id === id);
  if (!uni) return { title: "University Not Found" };
  const v2 = universitiesV2.find((u) => u.id === id);
  // "Brno University of Technology (VUT / BUT)" + "VUT Brno" -> "Brno University of Technology (VUT Brno)"
  const name = v2?.searchName ? `${uni.name.split(" (")[0]} (${v2.searchName})` : uni.name;
  // The blurb, then the local name, city and what the page covers. Search
  // results cut descriptions at about 160 characters, so shorten the tail step
  // by step rather than let the snippet end mid-sentence.
  const blurb = uni.blurb?.en || `Learn about ${uni.name}.`;
  const tail = `${uni.city}, Czech Republic: English programmes, tuition and how to apply.`;
  const description =
    [
      v2?.nameLocal ? `${blurb} ${v2.nameLocal}, ${tail}` : "",
      `${blurb} ${tail}`,
      `${blurb} ${uni.city}, Czech Republic: programmes, fees, admission.`,
    ].find((d) => d && d.length <= 160) ?? blurb;
  return {
    title: `${name}: Programmes, Fees and Admission`,
    description,
    alternates: { canonical: `/university/${id}` },
    ...noindexUnless(universityPageIndexable(id)),
  };
}

export default async function UniversityPage({ params }: Props) {
  const { id } = await params;
  const uni = universities.find((u) => u.id === id);
  if (!uni) return notFound();
  const jsonLd = universityJsonLd(id);

  return (
    <div className="min-h-screen">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <Breadcrumbs items={[{ label: "Universities", href: "/universities" }, { label: uni.name }]} />
        <GlassCard>
          <UniversityDetailClient uni={uni} links={universityLinks(uni.id)} />
        </GlassCard>
      </main>
      <Footer />
    </div>
  );
}
