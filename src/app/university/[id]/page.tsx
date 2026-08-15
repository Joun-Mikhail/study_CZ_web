import React from "react";
import { notFound } from "next/navigation";
import { universities } from "@/data/universities";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import UniversityDetailClient from "./UniversityDetailClient";

type Props = {
  params: { id: string };
};

export default function UniversityPage({ params }: Props) {
  const uni = universities.find((u) => u.id === params.id);
  if (!uni) return notFound();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-2">{uni.name}</h1>
        <div className="text-sm text-text-secondary mb-6">{uni.city} — {uni.founded ? `Established ${uni.founded}` : ""}</div>

        <GlassCard>
          <UniversityDetailClient uni={uni} />
        </GlassCard>
      </main>
      <Footer />
    </div>
  );
}
