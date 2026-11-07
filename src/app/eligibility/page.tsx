import EligibilityClient from "./EligibilityClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admission Requirements: Can I Study in Czechia?",
  description:
    "Check your eligibility for Czech university admission in 5 minutes. Free assessment covering academics, documents, finances, and visa timeline.",
  alternates: { canonical: "/eligibility" },
};

export default function EligibilityPage() {
  return <EligibilityClient />;
}
