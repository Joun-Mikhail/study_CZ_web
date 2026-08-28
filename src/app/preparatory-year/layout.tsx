import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preparatory & Language Year",
  description: "Complete guide to preparatory and language year programs in the Czech Republic. Providers, pricing, visa info, and enrollment steps for international students.",
  alternates: { canonical: "/preparatory-year" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
