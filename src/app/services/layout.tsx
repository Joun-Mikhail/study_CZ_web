import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

export const metadata: Metadata = {
  title: "Services",
  description: "Professional application support, document translation, and admission consulting for Czech universities.",
};

const serviceSchema = [
  {
    "@type": "Service",
    name: "University Application Consultation",
    description: "30-minute personalized consultation about your Czech university application, including university selection, document requirements, and visa guidance.",
    provider: { "@type": "EducationalOrganization", name: "Study Czechia", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    offers: { "@type": "Offer", price: "15", priceCurrency: "EUR" },
  },
  {
    "@type": "Service",
    name: "Document Review",
    description: "Complete review of your university application and visa document package with detailed written feedback on what needs fixing.",
    provider: { "@type": "EducationalOrganization", name: "Study Czechia", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    offers: { "@type": "Offer", price: "25", priceCurrency: "EUR" },
  },
  {
    "@type": "Service",
    name: "Embassy Interview Preparation",
    description: "45-minute mock embassy interview session with real questions, feedback, and a written cheat sheet of common questions and ideal answers.",
    provider: { "@type": "EducationalOrganization", name: "Study Czechia", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    offers: { "@type": "Offer", price: "39", priceCurrency: "EUR" },
  },
  {
    "@type": "Service",
    name: "Arrival Support",
    description: "Personalized first-two-weeks checklist, foreign police registration walkthrough, bank and SIM setup guidance, plus 14 days of WhatsApp support.",
    provider: { "@type": "EducationalOrganization", name: "Study Czechia", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    offers: { "@type": "Offer", price: "29", priceCurrency: "EUR" },
  },
  {
    "@type": "Service",
    name: "Full Application Package",
    description: "End-to-end support from university selection through visa approval and first month in Czechia, including all individual services plus ongoing WhatsApp support.",
    provider: { "@type": "EducationalOrganization", name: "Study Czechia", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    offers: { "@type": "Offer", price: "350", priceCurrency: "EUR" },
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": serviceSchema,
          }),
        }}
      />
      {children}
    </>
  );
}
