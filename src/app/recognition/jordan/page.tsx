import type { Metadata } from "next";
import RecognitionJordanClient from "./RecognitionJordanClient";

export const metadata: Metadata = {
  title: "Is a Czech Degree Recognised in Jordan? Equivalency Step by Step",
  description:
    "How Jordan's Ministry makes a Czech degree equivalent: recognised Czech universities, the language and residence rules, documents, fees and how to apply. From official sources only, with the date checked.",
  alternates: { canonical: "/recognition/jordan" },
};

export default function RecognitionJordanPage() {
  return <RecognitionJordanClient />;
}
