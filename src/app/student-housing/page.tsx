import type { Metadata } from "next";
import HousingClient from "./HousingClient";

export const metadata: Metadata = {
  title: "Student Housing in Czechia: University Dorm Prices in Prague and Brno",
  description:
    "What a university dorm bed costs in Prague and Brno: Charles University, ČVUT, Masaryk and VUT price lists, per night and for a month, from official sources.",
  alternates: { canonical: "/student-housing" },
};

export default function HousingPage() {
  return <HousingClient />;
}
