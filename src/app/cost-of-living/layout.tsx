import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost of Living",
  description: "Compare monthly living costs across Czech cities — rent, food, transport, and more for international students.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
