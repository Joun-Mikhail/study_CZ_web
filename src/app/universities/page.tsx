import type { Metadata } from "next";
import React from "react";
import UniversityListClient from "./UniversityListClient";
import { universities } from "@/data/universities";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Universities",
  description: "Browse all Czech universities — filter by city, field of study, and sort by name or founding year.",
  alternates: { canonical: "/universities" },
};

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export default function Page() {
  const cities = unique(universities.map((u) => u.city)).sort();
  const fields = unique(universities.flatMap((u) => u.fields)).sort();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">Universities</h1>
          <p className="text-text-secondary">Browse and filter Czech universities by city, field, or name.</p>
        </div>
      </div>
      <UniversityListClient initialList={universities} initialQ={""} cities={cities} fields={fields} />
      <Footer />
    </div>
  );
}
