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
      <div className="pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">Programme Discovery</h1>
          <p className="text-text-secondary">Search and filter English-taught programmes at Czech universities.</p>
        </div>
      </div>
      <UniversityListClient />
      <Footer />
    </div>
  );
}
