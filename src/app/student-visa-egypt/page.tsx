import type { Metadata } from "next";
import StudentVisaEgyptClient from "./StudentVisaEgyptClient";

export const metadata: Metadata = {
  title: "Czech Student Visa from Egypt: Documents, Money and Appointment",
  description:
    "How to apply for a Czech long-term study visa at the embassy in Cairo: documents, the 115,810 CZK proof of funds, the email appointment rules, fee and processing time. From official sources only, with the date checked.",
  alternates: { canonical: "/student-visa-egypt" },
};

export default function StudentVisaEgyptPage() {
  return <StudentVisaEgyptClient />;
}
