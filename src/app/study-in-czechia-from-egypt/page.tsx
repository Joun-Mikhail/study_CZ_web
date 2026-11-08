import type { Metadata } from "next";
import FromEgyptClient from "./FromEgyptClient";

export const metadata: Metadata = {
  title: "Study in Czechia from Egypt: Costs, Visa and Admission Guide",
  description:
    "For Egyptian students: what it costs, the student visa in Cairo, Thanaweya Amma recognition and every step from applying to your first week in Czechia.",
  alternates: { canonical: "/study-in-czechia-from-egypt" },
};

export default function FromEgyptPage() {
  return <FromEgyptClient />;
}
