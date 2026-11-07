import WhatItCostsClient from "./WhatItCostsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost of Studying in Czechia in 2027: Tuition, Living and Visa",
  description:
    "What studying in the Czech Republic costs: English tuition by degree, monthly living costs in Prague, Brno and Ostrava, the visa money and fees, and a whole-degree estimate. Every figure says where it comes from.",
  alternates: { canonical: "/what-it-costs" },
};

export default function WhatItCostsPage() {
  return <WhatItCostsClient />;
}
