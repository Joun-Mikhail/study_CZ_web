import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Study Czechia",
  description:
    "Study Czechia is an independent, student-built platform helping Arabic-speaking students navigate Czech universities. Not affiliated with any embassy or university.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
