import type { Metadata } from "next";
import RecognitionEgyptClient from "./RecognitionEgyptClient";

export const metadata: Metadata = {
  title: "Is a Czech Degree Recognised in Egypt? Equivalency Step by Step",
  description:
    "How Egypt's Supreme Council of Universities makes a Czech degree equivalent: conditions, legalisation, documents, fees and where to send them. From official sources only, with the date checked.",
  alternates: { canonical: "/recognition/egypt" },
};

export default function RecognitionEgyptPage() {
  return <RecognitionEgyptClient />;
}
