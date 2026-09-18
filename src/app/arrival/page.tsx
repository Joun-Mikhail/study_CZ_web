import ArrivalClient from "./ArrivalClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Just Landed in Czechia? Start Here",
  description:
    "Just arrived in Czechia? Here's what foreign police registration is, your deadline, and what to do first — free. Plus a paid first-two-weeks arrival plan if you want it handled for you.",
  alternates: { canonical: "/arrival" },
};

export default function ArrivalPage() {
  return <ArrivalClient />;
}
