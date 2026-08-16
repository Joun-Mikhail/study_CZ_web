import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Study in Czechia team via email, WhatsApp, or Facebook.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
