import { PAYMENT_LINKS } from "@/config/contact";
import type { Bilingual } from "@/data/stages";

export type ContextualCtaService = "consultation" | "documentCheck" | "interviewPrep" | "arrivalSupport";

export type ContextualCtaConfig = {
  title: Bilingual;
  fearTrigger: Bilingual;
  cta: Bilingual;
  href: string;
};

// Copy reused verbatim from ServicesClient.tsx / stages.ts -- nothing
// invented here. One entry per paid service; a page picks the one that
// topically matches the section it's placed next to.
export const contextualCtas: Record<ContextualCtaService, ContextualCtaConfig> = {
  consultation: {
    title: { en: "Ask Me Anything: 30 Minutes", ar: "اسألني أي حاجة: 30 دقيقة" },
    fearTrigger: {
      en: "The answer that takes you 3 weeks of forum scrolling takes me 3 minutes.",
      ar: "الإجابة اللي بتاخد منك 3 أسابيع بحث في المنتديات بتاخد مني 3 دقايق.",
    },
    cta: { en: "Book a Call (€15)", ar: "احجز مكالمة (15€)" },
    href: PAYMENT_LINKS.consultation,
  },
  documentCheck: {
    title: { en: "Document Check: Before You Submit", ar: "مراجعة الأوراق: قبل ما تقدم" },
    fearTrigger: {
      en: "I've seen students rejected for a missing apostille, a wrong date format, or a translation that used the wrong legal term. Don't be that student.",
      ar: "شفت طلاب اترفضوا بسبب ابوستيل ناقص، أو تاريخ بصيغة غلط، أو ترجمة استخدمت مصطلح قانوني غلط. ماتكونش الطالب ده.",
    },
    cta: { en: "Get My Documents Reviewed (€25)", ar: "راجع أوراقي (25€)" },
    href: PAYMENT_LINKS.documentReview,
  },
  interviewPrep: {
    title: { en: "Embassy Interview Prep: Don't Walk In Unprepared", ar: "تجهيز مقابلة السفارة: ماتروحش من غير تحضير" },
    fearTrigger: {
      en: "The interview lasts 10 minutes. The wrong answer lasts 6 months.",
      ar: "المقابلة بتاخد 10 دقايق. الإجابة الغلط بتكلفك 6 شهور.",
    },
    cta: { en: "Book My Mock Interview —EUR 39", ar: "احجز مقابلة تجريبية —39 يورو" },
    href: PAYMENT_LINKS.interviewPrep,
  },
  arrivalSupport: {
    title: { en: "Landed in Czechia? I've Got You.", ar: "وصلت التشيك؟ أنا معاك." },
    fearTrigger: {
      en: "Your first 2 weeks will be overwhelming. Bank account, foreign police, insurance, transport, phone, and everything is in Czech.",
      ar: "أول أسبوعين هيكونوا صعبين. حساب بنكي، شرطة الأجانب، تأمين، مواصلات، موبايل. وكل حاجة بالتشيكي.",
    },
    cta: { en: "Get My Arrival Plan (€29)", ar: "احصل على خطة وصولي (29€)" },
    href: PAYMENT_LINKS.arrivalSupport,
  },
};
