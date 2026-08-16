import type { Metadata } from "next";
import React from "react";
import UniversityListClient from "./UniversityListClient";
import { universities } from "@/data/universities";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Universities",
  description: "Browse all Czech universities — filter by city, field of study, and sort by name or founding year.",
};

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export default function Page() {
  const cities = unique(universities.map((u) => u.city)).sort();
  const fields = unique(universities.flatMap((u) => u.fields)).sort();

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <UniversityListClient initialList={universities} initialQ={""} cities={cities} fields={fields} />
      </div>
      <Footer />
    </>
  );
}
