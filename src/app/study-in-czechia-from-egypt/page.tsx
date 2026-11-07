import type { Metadata } from "next";
import FromEgyptClient from "./FromEgyptClient";

export const metadata: Metadata = {
  title: "Study in Czechia from Egypt: The Whole Path, Step by Step",
  description:
    "For Egyptian students: from Thanaweya Amma to your first week in Czechia. Eligibility, Czech or English, deadlines, costs, the Cairo visa and degree recognition.",
  alternates: { canonical: "/study-in-czechia-from-egypt" },
};

export default function FromEgyptPage() {
  return <FromEgyptClient />;
}
