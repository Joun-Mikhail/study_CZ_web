import type { Metadata } from "next";
import React from "react";
import UniversityListClient from "./UniversityListClient";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Programme Discovery: Browse Czech University Programmes",
  description: "Search and filter English-taught programmes at Czech universities by field, city, degree, tuition, and more.",
  alternates: { canonical: "/universities" },
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumb />
      <UniversityListClient />
      <Footer />
    </div>
  );
}
