import WhatItCostsClient from "./WhatItCostsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost of Studying in Czechia in 2027: Tuition, Living and Visa",
  description:
    "What studying in Czechia costs: English tuition by degree, living costs in Prague, Brno and Ostrava, visa money and fees, and a whole-degree estimate, all sourced.",
  alternates: { canonical: "/what-it-costs" },
};

export default function WhatItCostsPage() {
  return <WhatItCostsClient />;
}
