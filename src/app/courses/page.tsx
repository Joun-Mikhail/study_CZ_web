import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";
import { priceOf } from "@/config/pricing";

export const metadata: Metadata = {
  title: "Your First 90 Days in Czechia",
  description: "Language, culture, embassy prep, and everything nobody tells you. Taught in Arabic by a student who lives here. Pre-order now; the course opens on 1 January 2027.",
  alternates: { canonical: "/courses" },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Your First 90 Days in Czechia",
  description: "Language, culture, embassy prep, and everything nobody tells you. Taught in Arabic by a student who lives here.",
  provider: {
    "@type": "Organization",
    name: "Study Czechia",
    url: "https://studyczechia.com",
  },
  offers: {
    "@type": "Offer",
    price: String(priceOf("course")),
    priceCurrency: "EUR",
    availability: "https://schema.org/PreOrder",
  },
  inLanguage: "ar",
  courseMode: "online",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <CoursesClient />
    </>
  );
}
