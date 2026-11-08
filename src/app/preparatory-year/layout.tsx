import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Czech Language Preparatory Year: Study Free in Czechia",
  description: "Public Czech universities are free when you study in Czech. Guide to the preparatory language year: providers, prices, visa and enrolment steps.",
  alternates: { canonical: "/preparatory-year" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
