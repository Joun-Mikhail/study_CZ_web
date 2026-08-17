import EligibilityClient from "./EligibilityClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eligibility Assessment — Study in Czechia",
  description:
    "Check your eligibility for Czech university admission in 5 minutes. Free assessment covering academics, documents, finances, and visa timeline.",
};

export default function EligibilityPage() {
  return <EligibilityClient />;
}
