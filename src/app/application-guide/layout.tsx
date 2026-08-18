import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Guide",
  description: "Step-by-step guide to applying to Czech universities — documents, deadlines, and visa requirements.",
  alternates: { canonical: "/application-guide" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
