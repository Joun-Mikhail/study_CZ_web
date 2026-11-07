import type { Metadata } from "next";
import WhyCzechiaClient from "./WhyCzechiaClient";
import { cityMapData } from "@/lib/city-map-data";

export const metadata: Metadata = {
  title: "Why Study in Czechia: Costs, Cities and Programmes",
  description:
    "Why international students choose Czechia: free or low tuition, English programmes, safe cities and an EU degree. Key facts, verified figures and programmes by field and city.",
  alternates: { canonical: "/why-czechia" },
};

export default function Page() {
  return <WhyCzechiaClient mapCities={cityMapData()} />;
}
