import ArrivalClient from "./ArrivalClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Just Landed in Czechia? Start Here",
  description:
    "Just arrived in Czechia? What foreign police registration is, your deadline and what to do first, free. Or a paid two-week arrival plan that handles it for you.",
  alternates: { canonical: "/arrival" },
};

export default function ArrivalPage() {
  return <ArrivalClient />;
}
