import type { Metadata } from "next";
import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare Programmes",
  description: "Compare up to 3 Czech university programmes side by side: tuition, duration, entrance exams, deadlines, and more.",
  alternates: { canonical: "/programmes/compare" },
};

export default function ComparePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <Breadcrumbs
          items={[
            { label: "Programmes", href: "/programmes" },
            { label: "Compare" },
          ]}
        />
        <CompareClient />
      </main>
      <Footer />
    </div>
  );
}
