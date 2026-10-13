import type { Metadata } from "next";
import React from "react";
import UniversityListClient from "./UniversityListClient";
import { cityMapData } from "@/lib/city-map-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Czech Universities: English Programmes, Fees and Deadlines",
  description: "Czech universities such as Charles University, VUT Brno and ČVUT: search English-taught programmes by field, city, degree and tuition, with fees from official university pages.",
  alternates: { canonical: "/universities" },
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumb />
      <UniversityListClient mapCities={cityMapData()} />
      <Footer />
    </div>
  );
}
