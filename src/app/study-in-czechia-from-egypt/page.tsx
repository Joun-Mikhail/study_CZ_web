import type { Metadata } from "next";
import { degreeTotalEur, englishTuition, livingByCity, medicineTuition, OFFICIAL } from "@/lib/study-costs";
import { formatDate } from "@/lib/medicine-guide";
import FromEgyptClient from "./FromEgyptClient";

export const metadata: Metadata = {
  title: "Study in Czechia from Egypt: Costs, Visa and Admission Guide",
  description:
    "For Egyptian students: what studying in the Czech Republic costs, the student visa in Cairo, Thanaweya Amma recognition and every step from applying to arrival.",
  alternates: { canonical: "/study-in-czechia-from-egypt" },
};

export default function FromEgyptPage() {
  // Worked out here so the programme data stays out of the page's JavaScript.
  const monthly = (key: string) => livingByCity().find((c) => c.key === key)!.monthlyCzk;
  const bachelorMedian = englishTuition().bachelor.median;
  const checkedOn = (iso: string) => ({ en: formatDate(iso, "en"), ar: formatDate(iso, "ar") });
  const costs = {
    bachelorMedian,
    medicine: medicineTuition(),
    brno: monthly("brno"),
    prague: monthly("prague"),
    firstYearEnglish: degreeTotalEur(bachelorMedian, 1, "brno"),
    firstYearCzech: degreeTotalEur(0, 1, "brno"),
    checkedFees: checkedOn(OFFICIAL.visaFeeCairoEgp.checked),
    checkedFunds: checkedOn(OFFICIAL.proofOfFundsYearCzk.checked),
  };
  return <FromEgyptClient costs={costs} />;
}
