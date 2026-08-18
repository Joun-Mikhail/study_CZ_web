import WhatItCostsClient from "./WhatItCostsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Studying in Czechia Actually Costs",
  description:
    "Real tuition fees, living costs, visa fees, and document costs for studying in the Czech Republic. No invented numbers. Every figure verified with a date.",
  alternates: { canonical: "/what-it-costs" },
};

export default function WhatItCostsPage() {
  return <WhatItCostsClient />;
}
