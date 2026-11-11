import type { Metadata } from "next";
import SourcesClient, { type FeeCounts } from "./SourcesClient";
import { programmes } from "@/data/programmes";
import { feeStatus } from "@/lib/fee-source";

export const metadata: Metadata = {
  title: "Official Sources for Studying in Czechia, Checked and Linked",
  description:
    "Where the official Study in Czechia pages live now (studyin.gov.cz), which authority decides admission, fees and visas, and how Study Czechia checks its facts.",
  alternates: { canonical: "/official-sources" },
};

// Counted at build time so the page never claims more than the data supports,
// and the client bundle does not load the programme list.
const english = programmes.filter((p) => p.language === "English");
const counts: FeeCounts = {
  total: english.length,
  verified: english.filter((p) => feeStatus(p) === "verified").length,
};

export default function OfficialSourcesPage() {
  return <SourcesClient counts={counts} />;
}
