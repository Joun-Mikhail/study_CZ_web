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

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why should I pay when the guides are free?",
      acceptedAnswer: { "@type": "Answer", text: "The guides teach you the process. The services are me personally reviewing your specific documents, your specific situation, and answering your specific questions. It's the difference between reading a medical textbook and seeing a doctor." },
    },
    {
      "@type": "Question",
      name: "How is this different from an agency?",
      acceptedAnswer: { "@type": "Answer", text: "Agencies sell you a package and disappear. They've never been to Czechia. I live here, went through this process myself, and cost a fraction of what they charge." },
    },
    {
      "@type": "Question",
      name: "What if I pay and I'm not satisfied?",
      acceptedAnswer: { "@type": "Answer", text: "Message me within 48 hours of any service and I'll refund you completely. No questions, no forms, no waiting." },
    },
    {
      "@type": "Question",
      name: "Is it safe to pay online?",
      acceptedAnswer: { "@type": "Answer", text: "Payments are processed by Stripe, the same company that handles payments for Amazon, Google, and Shopify. I never see your card number." },
    },
    {
      "@type": "Question",
      name: "What if my visa gets rejected even after using your service?",
      acceptedAnswer: { "@type": "Answer", text: "I help you build the strongest possible application, but I can't guarantee embassy decisions. Nobody can. Anyone who promises a guaranteed visa is lying." },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [...serviceSchema, faqSchema],
          }),
        }}
      />
      {children}
    </>
  );
}
