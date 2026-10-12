// Copy for the help sheet (src/components/help-sheet.tsx). Bullets are taken
// from the "included" lists on /services/, the after-payment steps from
// /thanks/ (src/data/after-payment.ts) and refunds from REFUND_COPY, so the
// sheet never promises anything those pages don't. See docs/JOURNEY.md, 2.3.
import type { PriceKey } from "@/config/pricing";
import type { PaidProduct } from "./after-payment";

export type HelpService = "consultation" | "documentReview" | "interviewPrep" | "arrivalSupport" | "fullPackage";

type Copy = { name: string; bullets: string[]; time: string };

export const HELP_SERVICES: Record<
  HelpService,
  {
    priceKey: PriceKey;
    /** Key in stripe-links.json and in AFTER_PAYMENT. */
    product: PaidProduct;
    refundKey: "consultation" | "documentReview" | "interviewPrep" | "arrivalSupport" | "fullPackage";
    en: Copy;
    ar: Copy;
  }
> = {
  consultation: {
    priceKey: "consultation",
    product: "consultation",
    refundKey: "consultation",
    en: {
      name: "30-minute call with me",
      bullets: [
        "30-minute video or voice call, your choice",
        "I look at your situation before the call",
        "A written summary afterwards, plus 48 hours of WhatsApp follow-up",
      ],
      time: "At a time we agree on WhatsApp.",
    },
    ar: {
      name: "مكالمة 30 دقيقة معايا",
      bullets: [
        "مكالمة فيديو أو صوت 30 دقيقة، اختيارك",
        "براجع وضعك قبل المكالمة",
        "ملخص مكتوب بعدها، و48 ساعة متابعة على واتساب",
      ],
      time: "في معاد نتفق عليه على واتساب.",
    },
  },
  documentReview: {
    priceKey: "documentReview",
    product: "documentReview",
    refundKey: "documentReview",
    en: {
      name: "Document review",
      bullets: [
        "A full review of your whole document package",
        "A written report: what's right, what to fix, what's missing",
        "One follow-up round to confirm you're good",
      ],
      time: "A written report within 5 business days of receiving your documents.",
    },
    ar: {
      name: "مراجعة الأوراق",
      bullets: [
        "مراجعة كاملة لكل الأوراق",
        "تقرير مكتوب: الصحيح، اللي محتاج تعديل، الناقص",
        "جولة متابعة: بأكدلك إن كله تمام",
      ],
      time: "تقرير مكتوب خلال 5 أيام عمل من استلامي للأوراق.",
    },
  },
  interviewPrep: {
    priceKey: "interviewPrep",
    product: "interviewPrep",
    refundKey: "interviewPrep",
    en: {
      name: "Mock embassy interview",
      bullets: [
        "A 45-minute mock interview by video",
        "Feedback on your answers and your confidence",
        "A written sheet of the 15 most common questions",
      ],
      time: "One session at a time we agree, then WhatsApp support until your interview.",
    },
    ar: {
      name: "مقابلة السفارة التجريبية",
      bullets: [
        "مقابلة تجريبية 45 دقيقة فيديو",
        "تعليق على إجاباتك وثقتك",
        "ورقة مكتوبة بأكتر 15 سؤال شائع",
      ],
      time: "جلسة واحدة في معاد نتفق عليه، وبعدها دعم واتساب لحد مقابلتك.",
    },
  },
  arrivalSupport: {
    priceKey: "arrivalSupport",
    product: "arrivalSupport",
    refundKey: "arrivalSupport",
    en: {
      name: "Arrival plan",
      bullets: [
        "A first-two-weeks checklist for your city",
        "Foreign police registration and bank account, step by step",
        "14 days of WhatsApp support",
      ],
      time: "You send your city and arrival date, I send your checklist, then 14 days of WhatsApp support.",
    },
    ar: {
      name: "خطة الوصول",
      bullets: [
        "قائمة أول أسبوعين مخصصة لمدينتك",
        "تسجيل شرطة الأجانب وفتح الحساب البنكي خطوة بخطوة",
        "14 يوم دعم على واتساب",
      ],
      time: "بتبعتلي مدينتك وميعاد وصولك، أبعتلك القائمة، وبعدها 14 يوم دعم على واتساب.",
    },
  },
  fullPackage: {
    priceKey: "fullPackageStep1",
    product: "fullPackageStep1",
    refundKey: "fullPackage",
    en: {
      name: "Full Journey, step 1",
      bullets: [
        "Choosing universities and programmes that fit you",
        "Documents, translations, the visa and a mock interview",
        "WhatsApp with me throughout, plus 30 days after you arrive",
      ],
      time: "We book the first session together on WhatsApp. Step 2 is only due after a university accepts you.",
    },
    ar: {
      name: "الرحلة الكاملة، المرحلة الأولى",
      bullets: [
        "اختيار الجامعات والبرامج اللي تناسبك",
        "الأوراق والترجمات والفيزا ومقابلة تجريبية",
        "واتساب معايا طول الطريق، و30 يوم بعد ما توصل",
      ],
      time: "بنحجز أول جلسة مع بعض على واتساب. المرحلة التانية بس بعد ما جامعة تقبلك.",
    },
  },
};

export const HELP_SHEET_COPY = {
  en: {
    johnLine: "I'm John. I'll do this with you myself, on WhatsApp.",
    whatYouGet: "What you get",
    afterPay: "What happens after you pay",
    time: "How long it takes",
    refund: "Refund rule",
    pay: "Continue to secure payment",
    ask: "Ask me first on WhatsApp",
    close: "Not now",
    closeLabel: "Close",
  },
  ar: {
    johnLine: "أنا جون، وهعمل ده معاك بنفسي على واتساب.",
    whatYouGet: "هتاخد إيه",
    afterPay: "إيه اللي بيحصل بعد ما تدفع",
    time: "بياخد قد إيه",
    refund: "قاعدة الاسترداد",
    pay: "كمّل للدفع الآمن",
    ask: "اسألني الأول على واتساب",
    close: "مش دلوقتي",
    closeLabel: "إغلاق",
  },
};
