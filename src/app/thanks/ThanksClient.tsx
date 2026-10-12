"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { track } from "@/components/umami";
import { CONTACT_EMAIL, REFUND_COPY, WHATSAPP_URL } from "@/config/contact";
import { CheckCircle2, MessageCircle, Mail } from "lucide-react";

/**
 * Stripe sends service buyers here after paying:
 *   /thanks/?p=<consultation|documentReview|interviewPrep|arrivalSupport|fullPackageStep1>&session_id={CHECKOUT_SESSION_ID}
 * Visitors who chose Arabic before are moved to /ar/thanks/ by the
 * TranslationProvider, keeping the query string.
 */
type Product = "consultation" | "documentReview" | "interviewPrep" | "arrivalSupport" | "fullPackageStep1";
const PRODUCTS: Product[] = ["consultation", "documentReview", "interviewPrep", "arrivalSupport", "fullPackageStep1"];

export default function ThanksClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;
  const [product, setProduct] = useState<Product | null>(null);
  const [ref, setRef] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p") as Product | null;
    const session = params.get("session_id") ?? "";
    const known = p && PRODUCTS.includes(p) ? p : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL after mount (static export has no request)
    setProduct(known);
    setRef(/^cs_(live|test)_[A-Za-z0-9]+$/.test(session) ? session.slice(-6) : "");
    setReady(true);
    if (known) track("purchase", { product: known });
  }, []);

  const c = product ? t.products[product] : null;
  const whatsapp = c ? `${WHATSAPP_URL}?text=${encodeURIComponent(c.whatsappText + (ref ? ` (${t.refLabel} ${ref})` : ""))}` : WHATSAPP_URL;
  const refund = product ? REFUND_COPY[locale].perService[product === "fullPackageStep1" ? "fullPackage" : product] : null;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <GlassCard>
            <div className="space-y-5">
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" aria-hidden="true" />
                <h1 className="text-2xl font-bold text-text-primary">{t.title}</h1>
                {c && <p className="text-sm text-text-secondary mt-2">{c.name}</p>}
                {ref && (
                  <p className="text-xs text-text-muted mt-1" dir="ltr">
                    {t.refLabel} {ref}
                  </p>
                )}
              </div>

              {ready && c && (
                <>
                  <div>
                    <h2 className="text-base font-semibold text-text-primary mb-2">{t.nextStep}</h2>
                    <ol className="space-y-2 list-decimal ps-5 text-sm text-text-secondary leading-relaxed">
                      {c.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                  </div>
                  <MagneticButton variant="primary" href={whatsapp} className="w-full">
                    <MessageCircle className="w-4 h-4" />
                    {c.button}
                  </MagneticButton>
                  {product === "documentReview" && (
                    <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Document review${ref ? ` ${ref}` : ""}`)}`} className="flex items-center justify-center gap-2 text-sm text-brand hover:underline">
                      <Mail className="w-4 h-4" />
                      {t.orEmail} {CONTACT_EMAIL}
                    </a>
                  )}
                  {refund && <p className="text-xs text-text-muted text-center">{refund}</p>}
                </>
              )}

              {ready && !c && (
                <>
                  <p className="text-sm text-text-secondary text-center">{t.generic}</p>
                  <MagneticButton variant="primary" href={whatsapp} className="w-full">
                    <MessageCircle className="w-4 h-4" />
                    {t.genericButton}
                  </MagneticButton>
                </>
              )}
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const en = {
  title: "Payment received, thank you!",
  refLabel: "Ref",
  nextStep: "What happens next",
  orEmail: "Or email them to",
  generic: "Message me on WhatsApp and we'll take it from there.",
  genericButton: "Message me on WhatsApp",
  products: {
    consultation: {
      name: "Ask-me-anything call (30 min)",
      steps: ["Message me on WhatsApp with two or three times that suit you.", "Add one line about where you're stuck, so I can prepare.", "We talk by voice or video at the time we agree."],
      button: "Book my call on WhatsApp",
      whatsappText: "Hi John, I just paid for the 30-minute call. Times that suit me:",
    },
    documentReview: {
      name: "Document review",
      steps: [
        "Send me every document you plan to submit (application, visa documents, translations, bank statements) as PDFs or clear photos.",
        "I go through each page the way the embassy officer will.",
        "You get a written report within 5 business days of me receiving your documents.",
      ],
      button: "Send my documents on WhatsApp",
      whatsappText: "Hi John, I just paid for the document review. Sending my documents now.",
    },
    interviewPrep: {
      name: "Embassy mock interview",
      steps: ["Message me on WhatsApp with your embassy, your interview date if you have one, and times that suit you.", "We do a full mock interview together.", "You get feedback on your answers before the real one."],
      button: "Book my mock interview on WhatsApp",
      whatsappText: "Hi John, I just paid for the mock interview. My embassy and interview date:",
    },
    arrivalSupport: {
      name: "Arrival plan",
      steps: ["Message me on WhatsApp with your city and arrival date.", "I send you your personal first-week checklist.", "Ask me anything on WhatsApp while you settle in."],
      button: "Start my arrival plan on WhatsApp",
      whatsappText: "Hi John, I just paid for the arrival plan. My city and arrival date:",
    },
    fullPackageStep1: {
      name: "Full Journey, step 1",
      steps: [
        "Message me on WhatsApp to book our first session.",
        "Before it, send me your grades, your rough budget and anything you've already prepared.",
        "In the first session we choose universities and programmes that fit you, and plan your documents and timeline.",
        "Step 2 is only due once a university accepts you. If you're not accepted, you never pay it.",
        "The course \"Your First 90 Days in Czechia\" is included and opens on 1 January 2027.",
      ],
      button: "Book my first session on WhatsApp",
      whatsappText: "Hi John, I just paid for Full Journey step 1. Let's book our first session.",
    },
  },
};

const ar: typeof en = {
  title: "الدفع وصل، شكرًا!",
  refLabel: "رقم مرجعي",
  nextStep: "الخطوة الجاية",
  orEmail: "أو ابعتها على",
  generic: "ابعتلي على واتساب ونكمل من هناك.",
  genericButton: "كلمني على واتساب",
  products: {
    consultation: {
      name: "اسألني أي حاجة (مكالمة 30 دقيقة)",
      steps: ["ابعتلي على واتساب معادين أو تلاتة يناسبوك.", "اكتب سطر عن النقطة اللي واقف عندها عشان أجهز.", "بنتكلم صوت أو فيديو في المعاد اللي نتفق عليه."],
      button: "احجز المكالمة على واتساب",
      whatsappText: "أهلًا جون، لسه دافع للمكالمة (30 دقيقة). المواعيد اللي تناسبني:",
    },
    documentReview: {
      name: "مراجعة الأوراق",
      steps: [
        "ابعتلي كل الأوراق اللي ناوي تقدمها (طلب الجامعة، أوراق الفيزا، الترجمات، كشف الحساب) PDF أو صور واضحة.",
        "براجع كل صفحة زي ما موظف السفارة هيعمل.",
        "التقرير المكتوب بيوصلك خلال 5 أيام عمل من استلامي للأوراق.",
      ],
      button: "ابعت الأوراق على واتساب",
      whatsappText: "أهلًا جون، لسه دافع لمراجعة الأوراق. هبعت الأوراق دلوقتي.",
    },
    interviewPrep: {
      name: "مقابلة السفارة التجريبية",
      steps: ["ابعتلي على واتساب السفارة، وميعاد المقابلة لو عندك، ومواعيد تناسبك.", "بنعمل مقابلة تجريبية كاملة مع بعض.", "بتاخد ملاحظات على إجاباتك قبل المقابلة الحقيقية."],
      button: "احجز المقابلة التجريبية على واتساب",
      whatsappText: "أهلًا جون، لسه دافع للمقابلة التجريبية. السفارة وميعاد المقابلة:",
    },
    arrivalSupport: {
      name: "خطة الوصول",
      steps: ["ابعتلي على واتساب المدينة وميعاد وصولك.", "هبعتلك قائمة أول أسبوع بتاعتك.", "اسألني أي حاجة على واتساب وأنت بتستقر."],
      button: "ابدأ خطة الوصول على واتساب",
      whatsappText: "أهلًا جون، لسه دافع لخطة الوصول. المدينة وميعاد الوصول:",
    },
    fullPackageStep1: {
      name: "المرافقة الكاملة، المرحلة الأولى",
      steps: [
        "ابعتلي على واتساب عشان نحجز أول جلسة.",
        "قبلها ابعتلي مجموعك، ميزانيتك التقريبية، وأي حاجة جهزتها.",
        "في أول جلسة بنختار الجامعات والبرامج المناسبة ليك، ونخطط للأوراق والمواعيد.",
        "المرحلة التانية بتدفعها بس لما جامعة تقبلك، ولو ماتقبلتش مش هتدفعها خالص.",
        "كورس \"أول 90 يوم في التشيك\" معاها، وبيفتح يوم 1 يناير 2027.",
      ],
      button: "احجز أول جلسة على واتساب",
      whatsappText: "أهلًا جون، لسه دافع للمرحلة الأولى من المرافقة الكاملة. يلا نحجز أول جلسة.",
    },
  },
};
