import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost of Living in Czechia for Students",
  description: "Monthly student living costs in Prague, Brno and other Czech cities: rent, food, transport and more, from a student who lives in Czechia.",
  alternates: { canonical: "/cost-of-living" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
