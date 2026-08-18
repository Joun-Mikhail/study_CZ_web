import InterviewPrepClient from "./InterviewPrepClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embassy Interview Prep",
  description:
    "Live 45-minute mock embassy interview with real questions, feedback, and a cheat sheet. Coached by a student who lives in Czechia and knows what officers actually test.",
  alternates: { canonical: "/interview-prep" },
};

export default function InterviewPrepPage() {
  return <InterviewPrepClient />;
}
