import type { Metadata } from "next";
import CheapestClient from "./CheapestClient";

export const metadata: Metadata = {
  title: "Cheapest English-Taught Programmes in Czech Republic",
  description:
    "Find the most affordable English-taught university programmes in the Czech Republic, sorted by tuition. Verified fees from official sources.",
  alternates: { canonical: "/study/cheapest-programmes" },
};

export default function CheapestPage() {
  return <CheapestClient />;
}
