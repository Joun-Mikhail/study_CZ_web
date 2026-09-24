import type { Metadata } from "next";
import VerifyIndexClient from "./VerifyIndexClient";

export const metadata: Metadata = {
  title: "Verify Certificate | Study Czechia",
  description: "Verify a Study Czechia course completion certificate",
  alternates: { canonical: "/verify" },
};

export default function VerifyIndexPage() {
  return <VerifyIndexClient />;
}
