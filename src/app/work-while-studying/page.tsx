import type { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Working While Studying in Czechia: Rules for Foreign Students",
  description:
    "Can international students work in Czechia? Free access to the labour market for full-time students, and the 9-month job-seeking permit after graduation.",
  alternates: { canonical: "/work-while-studying" },
};

export default function WorkPage() {
  return <WorkClient />;
}
