import type { Metadata } from "next";
import RecognitionJordanClient from "./RecognitionJordanClient";

export const metadata: Metadata = {
  title: "Is a Czech Degree Recognised in Jordan? Equivalency Step by Step",
  description:
    "How Jordan's Ministry makes a Czech degree equivalent: recognised universities, language and residence rules, documents, fees and applying, from official sources.",
  alternates: { canonical: "/recognition/jordan" },
};

export default function RecognitionJordanPage() {
  return <RecognitionJordanClient />;
}
