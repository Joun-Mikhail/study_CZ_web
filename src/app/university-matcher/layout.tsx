import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Matcher: Find Your Programme at Czech Universities | Study in CZ",
  description: "Answer a few questions to find your programme at Czech universities, matched by field, budget, city and language: English-taught, or Czech-taught (free at public universities, usually after a Czech language preparatory or foundation year). A first step to study in Europe.",
  alternates: { canonical: "/university-matcher" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
