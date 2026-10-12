import type { Metadata } from "next";
import RecognitionSaudiClient from "./RecognitionSaudiClient";

export const metadata: Metadata = {
  title: "Is a Czech Degree Recognised in Saudi Arabia? Equivalency Step by Step",
  description:
    "How Saudi Arabia's Ministry of Education makes a Czech degree equivalent: prior approval for self-funded study, classified universities, in-person study, and the online application. From official sources only, with the date checked.",
  alternates: { canonical: "/recognition/saudi-arabia" },
};

export default function RecognitionSaudiPage() {
  return <RecognitionSaudiClient />;
}
