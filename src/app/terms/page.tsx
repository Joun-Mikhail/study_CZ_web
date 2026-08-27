import type { Metadata } from "next";
import LegalClient from "./LegalClient";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Study Czechia — services, refunds, and your rights.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalClient />;
}
