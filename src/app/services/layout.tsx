import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Professional application support, document translation, and admission consulting for Czech universities.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
