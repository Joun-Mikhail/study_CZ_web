import type { Metadata } from "next";
import ChecklistClient from "./ChecklistClient";

export const metadata: Metadata = {
  title: "Czech Student Visa from Egypt: Printable Document Checklist",
  description:
    "A checklist you can tick off and print for the Czech study visa at the Cairo embassy: documents, the money to show, the appointment email and the day itself. Official sources.",
  alternates: { canonical: "/student-visa-egypt/checklist" },
};

export default function VisaChecklistPage() {
  return <ChecklistClient />;
}
