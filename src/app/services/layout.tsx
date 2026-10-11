import type { Metadata } from "next";
import { priceOf, fullPackageTotal } from "@/config/pricing";
import { REFUND_COPY } from "@/config/contact";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

export const metadata: Metadata = {
  title: "Services",
  description: "Personal application support for Czech universities: document review, embassy interview prep, arrival help and full application guidance.",
};

const serviceSchema = [
  {
    "@type": "Service",
    name: "University Application Consultation",
    description: "30-minute personalized consultation about your Czech university application, including university selection, document requirements, and visa guidance.",
    provider: { "@type": "Organization", name: "Study Czechia", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    offers: { "@type": "Offer", price: String(priceOf("consultation")), priceCurrency: "EUR" },
  },
  {
    "@type": "Service",
    name: "Document Review",
    description: "Complete review of your university application and visa document package with detailed written feedback on what needs fixing.",
    provider: { "@type": "Organization", name: "Study Czechia", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    offers: { "@type": "Offer", price: String(priceOf("documentReview")), priceCurrency: "EUR" },
  },
  {
    "@type": "Service",
    name: "Embassy Interview Preparation",
    description: "45-minute mock embassy interview session with real questions, feedback, and a written cheat sheet of common questions and ideal answers.",
    provider: { "@type": "Organization", name: "Study Czechia", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    offers: { "@type": "Offer", price: String(priceOf("interviewPrep")), priceCurrency: "EUR" },
  },
  {
    "@type": "Service",
    name: "Arrival Support",
    description: "Personalized first-two-weeks checklist, foreign police registration walkthrough, bank and SIM setup guidance, plus 14 days of WhatsApp support.",
    provider: { "@type": "Organization", name: "Study Czechia", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    offers: { "@type": "Offer", price: String(priceOf("arrivalSupport")), priceCurrency: "EUR" },
  },
  {
    "@type": "Service",
    name: "Full Application Package",
    description: "End-to-end support from university selection through visa approval and first month in Czechia, including all individual services plus ongoing WhatsApp support.",
    provider: { "@type": "Organization", name: "Study Czechia", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Czech Republic" },
    offers: { "@type": "Offer", price: String(fullPackageTotal()), priceCurrency: "EUR" },
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
      acceptedAnswer: { "@type": "Answer", text: "Many agencies sell a package and stop once you have your visa. I live here, went through this process myself, and cost a fraction of what agencies usually charge." },
    },
    {
      "@type": "Question",
      name: "What if I pay and I'm not satisfied?",
      acceptedAnswer: { "@type": "Answer", text: REFUND_COPY.en.faq },
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
