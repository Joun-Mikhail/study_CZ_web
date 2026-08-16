import type { Metadata } from "next";
import React, { Suspense } from "react";
import SearchClient from "./SearchClient";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Search Universities",
  description: "Search Czech universities by name, city, or field of study.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Suspense fallback={<div />}>
          <SearchClient />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
