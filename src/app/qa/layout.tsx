import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Q&A",
  description: "Frequently asked questions about studying in the Czech Republic — visas, costs, language, and admissions.",
  alternates: { canonical: "/qa" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
