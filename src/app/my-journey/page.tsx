import type { Metadata } from "next";
import JourneyClient from "./JourneyClient";

export const metadata: Metadata = {
  title: "My Journey",
  description: "Track your Czech university application progress — saved programmes, document checklists, and deadline countdowns.",
  alternates: { canonical: "/my-journey" },
};

export default function MyJourneyPage() {
  return <JourneyClient />;
}
