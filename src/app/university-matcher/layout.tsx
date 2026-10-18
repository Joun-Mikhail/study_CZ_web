import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Czech University Matcher: Find Your Programme",
  description: "Find your programme at Czech universities in a few questions, matched by field, budget, city and language: English-taught, or Czech-taught and free at public universities.",
  alternates: { canonical: "/university-matcher" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
