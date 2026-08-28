import DeadlinesClient from "./DeadlinesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deadline Tracker: Czech University Application Deadlines",
  description:
    "Track verified application deadlines for English-taught programmes at Czech universities. Filter by degree, field, city, and tuition. Only official sources.",
  alternates: { canonical: "/deadlines" },
};

export default function DeadlinesPage() {
  return <DeadlinesClient />;
}
