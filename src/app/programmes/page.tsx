import type { Metadata } from "next";
import ProgrammesClient from "./ProgrammesClient";

export const metadata: Metadata = {
  title: "Browse Programmes | Study in Czech Republic",
  description:
    "Explore verified English-taught university programmes in the Czech Republic. Filter by field, city, degree level, and tuition.",
  alternates: { canonical: "/programmes" },
};

export default function ProgrammesPage() {
  return <ProgrammesClient />;
}
