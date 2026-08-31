import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { programmes, getProgrammeById } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import ProgrammeDetailClient from "./ProgrammeDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prog = getProgrammeById(slug);
  if (!prog) return { title: "Programme Not Found" };
  const uni = universitiesV2.find((u) => u.id === prog.universityId);
  const uniName = uni?.name ?? "";
  return {
    title: `${prog.name.en} | ${uniName}`,
    description: `${prog.degree} in ${prog.name.en} at ${uniName}, ${uni?.city ?? "Czech Republic"}. ${prog.language}-taught, ${prog.durationYears} years, €${prog.tuitionEurPerYear.toLocaleString()} per year.`,
    alternates: { canonical: `/programmes/${slug}` },
  };
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const prog = getProgrammeById(slug);
  if (!prog) return notFound();
  const uni = universitiesV2.find((u) => u.id === prog.universityId);

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: prog.name.en,
    description: `${prog.degree} programme in ${prog.name.en} at ${uni?.name ?? prog.universityId}`,
    provider: {
      "@type": "CollegeOrUniversity",
      name: uni?.name ?? prog.universityId,
      url: uni?.website,
      address: {
        "@type": "PostalAddress",
        addressLocality: uni?.city ?? "Czech Republic",
        addressCountry: "CZ",
      },
    },
    inLanguage: prog.language === "English" ? "en" : "cs",
    timeToComplete: `P${prog.durationYears}Y`,
    educationalLevel: prog.degree,
    offers: {
      "@type": "Offer",
      price: prog.tuitionEurPerYear,
      priceCurrency: "EUR",
      category: "Tuition per academic year",
    },
    url: `${SITE_URL}/programmes/${prog.id}`,
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="relative w-full h-[160px] sm:h-[200px] rounded-2xl overflow-hidden mb-6">
          <Image
            src="/images/university-campus.jpg"
            alt="University campus"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-midnight/20 to-transparent" />
        </div>
        <Breadcrumbs
          items={[
            { label: "Programmes", href: "/programmes" },
            { label: prog.name.en },
          ]}
        />
        <ProgrammeDetailClient programme={prog} university={uni ?? null} />
      </main>
      <Footer />
    </div>
  );
}
