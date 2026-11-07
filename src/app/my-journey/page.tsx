import type { Metadata } from "next";
import JourneyClient from "./JourneyClient";

export const metadata: Metadata = {
  title: "My Journey",
  description: "Track your Czech university application progress — saved programmes, document checklists, and deadline countdowns.",
  alternates: { canonical: "/my-journey" },
  // A per-visitor tracker read from localStorage: crawlers only ever see the
  // empty shell (about 25 words), so it has nothing to rank for.
  robots: { index: false, follow: true },
};

export default function MyJourneyPage() {
  return <JourneyClient />;
}
