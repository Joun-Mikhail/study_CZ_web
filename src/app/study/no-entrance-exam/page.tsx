import type { Metadata } from "next";
import NoExamClient from "./NoExamClient";

export const metadata: Metadata = {
  title: "Programmes Without Entrance Exams in Czech Republic",
  description:
    "English-taught Czech university programmes with no entrance exam requirement. Apply with documents only — verified information.",
  alternates: { canonical: "/study/no-entrance-exam" },
};

export default function NoExamPage() {
  return <NoExamClient />;
}
