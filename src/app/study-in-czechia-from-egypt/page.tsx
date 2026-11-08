import type { Metadata } from "next";
import { englishTuition, livingByCity, medicineTuition } from "@/lib/study-costs";
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
  const costs = {
    bachelorMedian: englishTuition().bachelor.median,
    medicine: medicineTuition(),
    brno: monthly("brno"),
    prague: monthly("prague"),
  };
  return <FromEgyptClient costs={costs} />;
}
