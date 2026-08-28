import ServicesClient from "./ServicesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services: Study in Czechia",
  description:
    "Personal guidance for Arabic-speaking students applying to Czech universities. Document review, embassy interview prep, arrival support, and full application packages.",
  alternates: { canonical: "/services" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why should I pay when the guides are free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The guides teach you the process. The services are me personally reviewing your documents, your situation, and answering your questions. The difference between reading a medical textbook and seeing a doctor.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between you and an agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agencies in Egypt or Jordan sell you a package and disappear. They've never been to Czechia. I live here, went through the process myself, and cost a fraction of their price.",
      },
    },
    {
      "@type": "Question",
      name: "What if I'm not satisfied?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Message me within 48 hours and I'll refund you in full. No questions, no forms, no waiting.",
      },
    },
    {
      "@type": "Question",
      name: "Is online payment safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Payments are processed through Stripe, the same company used by Amazon and Google. I never see your card number. If you're in Egypt and prefer InstaPay, that works too. Message me on WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Can I message you on WhatsApp for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely, and I answer questions in the Facebook group every day for free. But if you need two hours of document review or a 45-minute mock interview, that's what the services are for.",
      },
    },
    {
      "@type": "Question",
      name: "What if my visa gets rejected despite the service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I help you build the strongest application possible, but I cannot guarantee embassy decisions. Nobody can, and anyone who promises you a 'guaranteed visa' is lying. Students I've worked with have a much higher acceptance rate because we catch the mistakes that cause most rejections.",
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServicesClient />
    </>
  );
}
