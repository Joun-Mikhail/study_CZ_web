import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost of Living in Czechia for Students",
  description: "A student month in Prague, Brno and Ostrava, priced from official dorm and transport price lists, supermarket prices and university canteens.",
  alternates: { canonical: "/cost-of-living" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
