import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study for Free in Czechia: Preparatory & Czech Language Year",
  description: "Public Czech universities are free when you study in Czech. Guide to the preparatory language year: providers, prices, visa and enrolment steps for international students.",
  alternates: { canonical: "/preparatory-year" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
