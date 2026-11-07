import type { DegreeLevel, Programme } from "@/data/types";
import { feeVerified } from "@/lib/fee-source";
import { universityJsonLd } from "@/lib/university-schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

const CREDENTIAL: Record<DegreeLevel, string> = {
  Bachelor: "Bachelor's degree",
  Master: "Master's degree",
  PhD: "Doctoral degree",
};

/**
 * schema.org markup for a /programmes/<id>/ page. A whole degree is an
 * EducationalOccupationalProgram rather than a Course (a single course of
 * study); schema.org defines timeToComplete on it but not on Course. The provider is the
 * university page's own entity (src/lib/university-schema.ts).
 */
export function programmeJsonLd(prog: Programme): Record<string, unknown> {
  const uni = universityJsonLd(prog.universityId);
  // Nested inside this block, so without its own @context
  const provider = uni && Object.fromEntries(Object.entries(uni).filter(([k]) => k !== "@context"));
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: prog.name.en,
    description: `${prog.degree} programme in ${prog.name.en}, taught in ${prog.language}, at ${uni?.name ?? prog.universityId}`,
    ...(provider ? { provider } : {}),
    educationalCredentialAwarded: CREDENTIAL[prog.degree],
    timeToComplete: `P${prog.durationYears}Y`,
    // State a price only when the linked source shows it.
    ...(feeVerified(prog)
      ? {
          offers: {
            "@type": "Offer",
            price: prog.tuitionEurPerYear,
            priceCurrency: "EUR",
            category: "Tuition per academic year",
          },
        }
      : {}),
    url: `${SITE_URL}/programmes/${prog.id}/`,
  };
}
