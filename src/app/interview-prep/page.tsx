import InterviewPrepClient from "./InterviewPrepClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Czech Embassy Student Visa Interview Prep",
  description:
    "Live 45-minute mock embassy interview with real questions, feedback and a cheat sheet, coached by a student who lives in Czechia and knows what officers test.",
  alternates: { canonical: "/interview-prep" },
};

export default function InterviewPrepPage() {
  return <InterviewPrepClient />;
}
