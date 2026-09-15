import ServicesClient from "./ServicesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services: Study in Czechia",
  description:
    "Personal guidance for Arabic-speaking students applying to Czech universities. Document review, embassy interview prep, arrival support, and full application packages.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
