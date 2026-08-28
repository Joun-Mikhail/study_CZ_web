import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programme Matcher: Find Your Czech University Programme",
  description: "Answer a few questions to find the right English-taught programme at a Czech university. Matched by field, budget, city, and language.",
  alternates: { canonical: "/university-matcher" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
