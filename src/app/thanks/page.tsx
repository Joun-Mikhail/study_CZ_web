import type { Metadata } from "next";
import ThanksClient from "./ThanksClient";

export const metadata: Metadata = {
  title: "Payment received",
  description: "Thank you for your payment. Here is what happens next with your Study Czechia service.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThanksClient />;
}
