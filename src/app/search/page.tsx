import type { Metadata } from "next";
import React, { Suspense } from "react";
import SearchClient from "./SearchClient";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Search Universities",
  description: "Search Czech universities by name, city, or field of study.",
  alternates: { canonical: "/search" },
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <SearchClient />
      </Suspense>
      <Footer />
    </div>
  );
}
