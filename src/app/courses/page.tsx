import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Your First 90 Days in Czechia",
  description: "Language, culture, embassy prep, and everything nobody tells you. Taught in Arabic by a student who lives here. €49, lifetime access.",
  alternates: { canonical: "/courses" },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Your First 90 Days in Czechia",
  description: "Language, culture, embassy prep, and everything nobody tells you. Taught in Arabic by a student who lives here.",
  provider: {
    "@type": "Organization",
    name: "Study in Czechia",
    url: "https://studyczechia.com",
  },
  offers: {
    "@type": "Offer",
    price: "49",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
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
