import type { Metadata } from "next";
import ParentsClient from "./ParentsClient";

export const metadata: Metadata = {
  title: "For Parents: Cost, Safety and How Payment Works",
  description:
    "What studying in Czechia costs, how safe it is, who runs Study Czechia, and how paying for help works: payment in two steps, refunds, receipts and how to reach John directly.",
  alternates: { canonical: "/for-parents" },
};

export default function ForParentsPage() {
  return <ParentsClient />;
}
