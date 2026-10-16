import DeadlinesClient from "./DeadlinesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Czech Universities Application Deadlines | Study in CZ Deadline Tracker",
  description:
    "Application deadlines for Czech universities, most at the end of February. Track English-taught programmes, and plan a Czech language year (preparatory or foundation year) if you want to study in Czech for free. Study in Europe without missing a date.",
  alternates: { canonical: "/deadlines" },
};

export default function DeadlinesPage() {
  return <DeadlinesClient />;
}
