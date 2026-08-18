import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Matcher",
  description: "Answer a few questions to find the best Czech university for your goals, budget, and preferred city.",
  alternates: { canonical: "/university-matcher" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
