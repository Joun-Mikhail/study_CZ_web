import type { Metadata } from "next";
import RecognitionIndexClient from "./RecognitionIndexClient";

export const metadata: Metadata = {
  title: "Degree Recognition Guides: Will a Czech Degree Count at Home?",
  description:
    "Country guides to getting a Czech university degree recognised at home, built only from official ministry and embassy pages, each with the date it was checked.",
  alternates: { canonical: "/recognition" },
};

export default function RecognitionPage() {
  return <RecognitionIndexClient />;
}
