import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholarships in Czechia for International Students",
  description: "Scholarships and funding for studying in the Czech Republic: Czech government scholarships, university scholarships and other options for international students.",
  alternates: { canonical: "/scholarships" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
