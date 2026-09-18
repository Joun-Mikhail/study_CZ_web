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

function SearchFallback() {
  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">Search Results</h1>
    </main>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Suspense fallback={<SearchFallback />}>
        <SearchClient />
      </Suspense>
      <Footer />
    </div>
  );
}
