import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholarships & Funding",
  description: "Explore scholarship opportunities and funding options for studying in the Czech Republic.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
