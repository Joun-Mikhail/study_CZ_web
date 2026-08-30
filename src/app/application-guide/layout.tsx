import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Guide",
  description: "Step-by-step guide to applying to Czech universities. Documents, deadlines, and visa requirements.",
  alternates: { canonical: "/application-guide" },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Apply to Czech Universities as an International Student",
  description:
    "A step-by-step guide covering major selection, document preparation, university applications, entrance exams, visa application, embassy interview, and arrival in the Czech Republic.",
  totalTime: "P6M",
  step: [
    { "@type": "HowToStep", name: "Decide on your major", text: "Choose your field of study — everything else depends on this choice." },
    { "@type": "HowToStep", name: "Choose your language of instruction", text: "Decide between English-taught programmes (paid tuition) or Czech-taught programmes (free tuition after preparatory year)." },
    { "@type": "HowToStep", name: "Work out your budget", text: "Calculate how much you can pay per year for tuition and living expenses." },
    { "@type": "HowToStep", name: "Research universities", text: "Compare tuition, entrance requirements, and locations across universities offering your major." },
    { "@type": "HowToStep", name: "Prepare your bank account", text: "Ensure you have the embassy's minimum balance requirement in a current account for at least 6 months." },
    { "@type": "HowToStep", name: "Gather your documents", text: "Collect your ID, graduation certificate, passport photos, military status, and transcripts." },
    { "@type": "HowToStep", name: "Authenticate and translate documents", text: "Get documents authenticated at the Ministry of Foreign Affairs and translated by an accredited office." },
    { "@type": "HowToStep", name: "Get a criminal record check", text: "Obtain a criminal record extract from your local police station." },
    { "@type": "HowToStep", name: "Apply and sit entrance exams", text: "Submit applications (January–March window) and sit entrance exams (May–June)." },
    { "@type": "HowToStep", name: "Apply for university accommodation", text: "Once accepted, apply for housing and get your accommodation contract for the visa." },
    { "@type": "HowToStep", name: "Get your acceptance letter", text: "Request the provisional acceptance letter, make tuition payment, and submit records for equivalency." },
    { "@type": "HowToStep", name: "Legalize documents at the Czech Embassy", text: "Take all documents to the Czech Embassy for authentication." },
    { "@type": "HowToStep", name: "Apply for your student visa", text: "Submit your complete student visa application at the embassy." },
    { "@type": "HowToStep", name: "Prepare for the embassy interview", text: "Practice answering questions about your university, finances, and study plans — preferably in English." },
    { "@type": "HowToStep", name: "Book flight and insurance", text: "Once approved, book your flight, buy health insurance, and send copies to the embassy." },
    { "@type": "HowToStep", name: "Travel and settle in", text: "Pick up your visa, travel to Czechia, register with foreign police, open a bank account, and get a SIM card." },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {children}
    </>
  );
}
