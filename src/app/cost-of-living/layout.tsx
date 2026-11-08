import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost of Living in Czechia for Students: Prices and Pay",
  description: "What a student month costs in Prague, Brno and Ostrava, what part-time jobs pay per hour, and what a day's wage buys in a Czech supermarket. All sourced.",
  alternates: { canonical: "/cost-of-living" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
