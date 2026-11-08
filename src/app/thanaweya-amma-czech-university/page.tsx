import type { Metadata } from "next";
import ThanaweyaClient from "./ThanaweyaClient";

export const metadata: Metadata = {
  title: "Thanaweya Amma to a Czech University: Legalisation and Nostrification",
  description:
    "Egyptian secondary certificate for Czech universities: superlegalisation in Cairo, faculty recognition or nostrification (3,000 CZK, 30 days), from official sources.",
  alternates: { canonical: "/thanaweya-amma-czech-university" },
};

export default function ThanaweyaPage() {
  return <ThanaweyaClient />;
}
