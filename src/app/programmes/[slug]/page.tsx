import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { programmes, getProgrammeById } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
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
    description: `${prog.degree} in ${prog.name.en} at ${uniName}, ${uni?.city ?? "Czech Republic"}. ${prog.language}-taught, ${prog.durationYears} years, €${prog.tuitionEurPerYear.toLocaleString()}/yr.`,
    alternates: { canonical: `/programmes/${slug}` },
  };
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const prog = getProgrammeById(slug);
  if (!prog) return notFound();
  const uni = universitiesV2.find((u) => u.id === prog.universityId);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <Breadcrumbs
          items={[
            { label: "Programmes", href: "/universities" },
            { label: prog.name.en },
          ]}
        />
        <ProgrammeDetailClient programme={prog} university={uni ?? null} />
      </main>
      <Footer />
    </div>
  );
}
