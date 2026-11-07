import { price } from "@/config/pricing";
import type { HelpService } from "@/data/help-services";
import type { Bilingual } from "@/data/stages";

export type ContextualCtaService = "consultation" | "documentCheck" | "interviewPrep" | "arrivalSupport";

export type ContextualCtaConfig = {
  title: Bilingual;
  stuckLine: Bilingual;
  cta: Bilingual;
  service: HelpService;
};

// Copy reused verbatim from ServicesClient.tsx / stages.ts -- nothing
// invented here. One entry per paid service; a page picks the one that
// topically matches the section it's placed next to.
export const contextualCtas: Record<ContextualCtaService, ContextualCtaConfig> = {
  consultation: {
    title: { en: "Ask Me Anything: 30 Minutes", ar: "اسألني أي حاجة: 30 دقيقة" },
    stuckLine: {
      en: "Stuck on one question you can't get a straight answer to? Ask me in a 30-minute call, and I'll tell you what I'd do in your place.",
      ar: "واقف عند سؤال مش لاقيله إجابة واضحة؟ اسألني في مكالمة 30 دقيقة، وهقولك أنا كنت هعمل إيه مكانك.",
    },
    cta: { en: `Book a Call (${price("consultation")})`, ar: `احجز مكالمة (${price("consultation", "ar")})` },
    service: "consultation",
  },
  documentCheck: {
    title: { en: "Document Check: Before You Submit", ar: "مراجعة الأوراق: قبل ما تقدم" },
    stuckLine: {
      en: "Stuck on the apostille or the translations? Send me your documents and I'll check every page before you submit.",
      ar: "واقف عند الأبوستيل أو الترجمة؟ ابعتلي أوراقك وأنا أراجع كل صفحة قبل ما تقدم.",
    },
    cta: { en: `Get My Documents Reviewed (${price("documentReview")})`, ar: `راجع أوراقي (${price("documentReview", "ar")})` },
    service: "documentReview",
  },
  interviewPrep: {
    title: { en: "Embassy interview: let's practise it first", ar: "مقابلة السفارة: نتدرب عليها الأول" },
    stuckLine: {
      en: "Nervous about the embassy interview? Let's practise it together with the questions embassies ask, so nothing on the day surprises you.",
      ar: "قلقان من مقابلة السفارة؟ يلا نتدرب عليها مع بعض بالأسئلة اللي السفارات بتسألها، عشان مافيش حاجة تفاجئك يومها.",
    },
    cta: { en: `Book My Mock Interview — ${price("interviewPrep")}`, ar: `احجز مقابلة تجريبية — ${price("interviewPrep", "ar")}` },
    service: "interviewPrep",
  },
  arrivalSupport: {
    title: { en: "Landed in Czechia? I've Got You.", ar: "وصلت التشيك؟ أنا معاك." },
    stuckLine: {
      en: "The first two weeks are a lot: foreign police, bank, insurance, transport, a SIM card, mostly in Czech. I'll give you a checklist for your city and answer your questions while you settle in.",
      ar: "أول أسبوعين فيهم حاجات كتير: شرطة الأجانب، البنك، التأمين، المواصلات، الشريحة، ومعظمها بالتشيكي. هديك قائمة لمدينتك وهرد على أسئلتك وأنت بتستقر.",
    },
    cta: { en: `Get My Arrival Plan (${price("arrivalSupport")})`, ar: `احصل على خطة وصولي (${price("arrivalSupport", "ar")})` },
    service: "arrivalSupport",
  },
};
