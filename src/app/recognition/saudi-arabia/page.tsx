import type { Metadata } from "next";
import RecognitionSaudiClient from "./RecognitionSaudiClient";

export const metadata: Metadata = {
  title: "Is a Czech Degree Recognised in Saudi Arabia? Equivalency Step by Step",
  description:
    "How Saudi Arabia's Ministry of Education makes a Czech degree equivalent: prior approval, classified universities, in-person study, how to apply. Official sources.",
  alternates: { canonical: "/recognition/saudi-arabia" },
};

export default function RecognitionSaudiPage() {
  return <RecognitionSaudiClient />;
}
