import type { Metadata } from "next";
import StudentVisaEgyptClient from "./StudentVisaEgyptClient";

export const metadata: Metadata = {
  title: "Czech Student Visa from Egypt: Documents, 115,810 CZK, Appointment",
  description:
    "Czech study visa from Egypt: documents, 115,810 CZK proof of funds, booking the Cairo embassy appointment by email, fee and processing time, from official sources.",
  alternates: { canonical: "/student-visa-egypt" },
};

export default function StudentVisaEgyptPage() {
  return <StudentVisaEgyptClient />;
}
