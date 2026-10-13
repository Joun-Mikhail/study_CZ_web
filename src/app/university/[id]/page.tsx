import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { universities } from "@/data/universities";
import { universitiesV2 } from "@/data/universities-v2";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import UniversityDetailClient from "./UniversityDetailClient";

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
  return {
    title: `${name}: Programmes, Fees and Admission`,
    description: `${uni.blurb?.en || `Learn about ${uni.name}.`} ${v2?.nameLocal ? `${v2.nameLocal}, ` : ""}${uni.city}, Czech Republic: English programmes, tuition and how to apply.`,
    alternates: { canonical: `/university/${id}` },
  };
}

export default async function UniversityPage({ params }: Props) {
  const { id } = await params;
  const uni = universities.find((u) => u.id === id);
  if (!uni) return notFound();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <Breadcrumbs items={[{ label: "Universities", href: "/universities" }, { label: uni.name }]} />
        <GlassCard>
          <UniversityDetailClient uni={uni} />
        </GlassCard>
      </main>
      <Footer />
    </div>
  );
}
