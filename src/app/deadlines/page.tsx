import DeadlinesClient from "./DeadlinesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Czech University Application Deadlines 2027",
  description:
    "Czech university application deadlines, most at the end of February. Track English-taught programmes and plan a Czech language year to study in Czech for free.",
  alternates: { canonical: "/deadlines" },
};

export default function DeadlinesPage() {
  return <DeadlinesClient />;
}
