import type { Metadata } from "next";
import { qaEntries } from "@/data/qa";

export const metadata: Metadata = {
  title: "Q&A — Studying in Czechia",
  description: "Frequently asked questions about studying in the Czech Republic — visas, costs, language, and admissions.",
  alternates: { canonical: "/qa" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: qaEntries.slice(0, 20).map((entry) => ({
    "@type": "Question",
    name: entry.q.en,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.a.en,
    },
  })),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
