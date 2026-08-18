import QuestionsToAskClient from "./QuestionsToAskClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Before You Pay Any Agency, Ask These 8 Questions",
  description:
    "Eight questions every student should ask before paying any study-abroad agency. Ask these of any agency, including us.",
};

export default function QuestionsToAskPage() {
  return <QuestionsToAskClient />;
}
