import QuestionsToAskClient from "./QuestionsToAskClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Edu, MSM Academy or Another Agency? Ask These 8 Questions First",
  description:
    "Comparing Top Edu, MSM Academy or another agency for Czechia? Eight questions to ask before you pay any agency, us included. We aren't connected to these companies.",
  alternates: { canonical: "/questions-to-ask" },
};

export default function QuestionsToAskPage() {
  return <QuestionsToAskClient />;
}
