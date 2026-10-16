import type { QaEntry } from "@/data/qa";
import type { StageSlug } from "@/data/stages";

/**
 * Guide, tool and service pages that site search can find.
 *
 * `title` and `description` repeat the English metadata of the page
 * (src/app/<path>/page.tsx, or layout.tsx when the page has none); the Arabic
 * text comes from AR_PAGE_META. test/site-search.test.ts fails if either
 * drifts, so update this list when you rename a page.
 *
 * `keywords` are extra words people search for that the title and description
 * don't use, such as "accommodation" for cost of living or "فيزا" next to
 * "تأشيرة". Only list topics the page actually covers.
 */
export type SitePage = {
  path: string;
  title: string;
  description: string;
  keywords: { en: string[]; ar: string[] };
};

export const SITE_PAGES: SitePage[] = [
  {
    path: "/application-guide/",
    title: "Application Guide",
    description: "Step-by-step guide to applying to Czech universities. Documents, deadlines, and visa requirements.",
    keywords: {
      en: ["how to apply", "admission", "visa", "documents", "accommodation", "housing", "insurance", "foreign police", "bank account"],
      ar: ["تقديم", "قبول", "تأشيرة", "فيزا", "أوراق", "مستندات", "سكن", "تأمين"],
    },
  },
  {
    path: "/arrival/",
    title: "Just Landed in Czechia? Start Here",
    description:
      "Just arrived in Czechia? Here's what foreign police registration is, your deadline, and what to do first — free. Plus a paid first-two-weeks arrival plan if you want it handled for you.",
    keywords: {
      en: ["arrival", "foreign police", "residence", "bank account", "SIM card", "transport", "insurance", "accommodation", "dorm"],
      ar: ["وصول", "شرطة الأجانب", "تسجيل", "إقامة", "حساب بنكي", "شريحة", "مواصلات", "تأمين", "سكن"],
    },
  },
  {
    path: "/qa/",
    title: "Q&A: Studying in Czechia",
    description: "Frequently asked questions about studying in the Czech Republic. Visas, costs, language, and admissions.",
    keywords: {
      en: ["faq", "questions", "embassy", "documents", "bank", "housing", "accommodation", "dorm", "scams"],
      ar: ["أسئلة", "تأشيرة", "فيزا", "سفارة", "أوراق", "بنك", "سكن", "نصب"],
    },
  },
  {
    path: "/services/",
    title: "Services: Study in Czechia",
    description:
      "Personal guidance for Arabic-speaking students applying to Czech universities. Document review, embassy interview prep, arrival support, and full application packages.",
    keywords: {
      en: ["help", "support", "consultation", "visa", "pricing"],
      ar: ["خدمات", "مساعدة", "استشارة", "مراجعة الأوراق", "مقابلة", "تأشيرة", "فيزا", "أسعار"],
    },
  },
  {
    path: "/interview-prep/",
    title: "Embassy Interview Prep",
    description:
      "Live 45-minute mock embassy interview with real questions, feedback, and a cheat sheet. Coached by a student who lives in Czechia and knows what officers actually test.",
    keywords: { en: ["visa interview", "embassy questions"], ar: ["مقابلة", "سفارة", "تأشيرة", "فيزا"] },
  },
  {
    path: "/cost-of-living/",
    title: "Cost of Living",
    description: "Compare monthly living costs across Czech cities. Rent, food, transport, and more for international students.",
    keywords: {
      en: ["accommodation", "housing", "dorm", "budget", "insurance", "Prague", "Brno", "Ostrava"],
      ar: ["سكن", "إيجار", "مصاريف", "ميزانية", "أكل", "مواصلات", "معيشة"],
    },
  },
  {
    path: "/what-it-costs/",
    title: "What Studying in Czechia Actually Costs",
    description:
      "Real tuition fees, living costs, visa fees, and document costs for studying in the Czech Republic. No invented numbers. Every figure verified with a date.",
    keywords: { en: ["price", "budget", "insurance", "dorm"], ar: ["تكلفة", "رسوم", "مصاريف", "تأشيرة", "فيزا", "ميزانية"] },
  },
  {
    path: "/eligibility/",
    title: "Eligibility Assessment: Study in Czechia",
    description:
      "Check your eligibility for Czech university admission in 5 minutes. Free assessment covering academics, documents, finances, and visa timeline.",
    keywords: { en: ["requirements", "grades", "can I study"], ar: ["أهلية", "شروط", "قبول", "درجات", "تأشيرة", "فيزا"] },
  },
  {
    path: "/deadlines/",
    title: "Czech Universities Application Deadlines | Study in CZ Deadline Tracker",
    description:
      "Application deadlines for Czech universities, most at the end of February. Track English-taught programmes, and plan a Czech language year (preparatory or foundation year) if you want to study in Czech for free. Study in Europe without missing a date.",
    keywords: { en: ["dates", "when to apply", "entrance exam"], ar: ["مواعيد", "موعد", "تقديم", "امتحان القبول"] },
  },
  {
    path: "/preparatory-year/",
    title: "Study for Free in Czechia: Preparatory & Czech Language Year",
    description:
      "Public Czech universities are free when you study in Czech. Guide to the preparatory language year: providers, prices, visa and enrolment steps for international students.",
    keywords: { en: ["foundation year", "free tuition"], ar: ["سنة تحضيرية", "لغة تشيكية", "مجاني", "فيزا"] },
  },
  {
    path: "/scholarships/",
    title: "Scholarships & Funding",
    description: "Explore scholarship opportunities and funding options for studying in the Czech Republic.",
    keywords: { en: ["grant", "funding"], ar: ["منحة", "منح", "تمويل"] },
  },
  {
    path: "/recognition/",
    title: "Degree Recognition Guides: Will a Czech Degree Count at Home?",
    description:
      "Country guides to getting a Czech university degree recognised at home, built only from official ministry and embassy pages, each with the date it was checked.",
    keywords: { en: ["equivalency", "nostrification", "recognized"], ar: ["معادلة", "اعتراف", "شهادة"] },
  },
  {
    path: "/recognition/egypt/",
    title: "Is a Czech Degree Recognised in Egypt? Equivalency Step by Step",
    description:
      "How Egypt's Supreme Council of Universities makes a Czech degree equivalent: conditions, legalisation, documents, fees and where to send them. From official sources only, with the date checked.",
    keywords: { en: ["recognition", "nostrification", "recognized"], ar: ["معادلة", "اعتراف"] },
  },
  {
    path: "/recognition/jordan/",
    title: "Is a Czech Degree Recognised in Jordan? Equivalency Step by Step",
    description:
      "How Jordan's Ministry makes a Czech degree equivalent: recognised Czech universities, the language and residence rules, documents, fees and how to apply. From official sources only, with the date checked.",
    keywords: { en: ["recognition", "nostrification", "recognized"], ar: ["معادلة", "اعتراف"] },
  },
  {
    path: "/recognition/saudi-arabia/",
    title: "Is a Czech Degree Recognised in Saudi Arabia? Equivalency Step by Step",
    description:
      "How Saudi Arabia's Ministry of Education makes a Czech degree equivalent: prior approval for self-funded study, classified universities, in-person study, and the online application. From official sources only, with the date checked.",
    keywords: { en: ["recognition", "nostrification", "recognized", "KSA"], ar: ["معادلة", "اعتراف"] },
  },
  {
    path: "/for-parents/",
    title: "For Parents: Cost, Safety and How Payment Works",
    description:
      "What studying in Czechia costs, how safe it is, who runs Study Czechia, and how paying for help works: payment in two steps, refunds, receipts and how to reach John directly.",
    keywords: { en: ["family", "parent"], ar: ["أولياء الأمور", "أهل", "أمان", "دفع", "استرداد"] },
  },
  {
    path: "/questions-to-ask/",
    title: "Top Edu, MSM Academy or Another Agency? Ask These 8 Questions First",
    description:
      "Comparing Top Edu, MSM Academy or another agency for studying in Czechia? Eight questions to ask before you pay any agency, including us. Study Czechia is not connected to these companies.",
    keywords: { en: ["agencies", "scam"], ar: ["وكالة", "وكالات", "نصب"] },
  },
  {
    path: "/courses/",
    title: "Your First 90 Days in Czechia",
    description:
      "Language, culture, embassy prep, and everything nobody tells you. Taught in Arabic by a student who lives here. Pre-order now; the course opens on 1 January 2027.",
    keywords: { en: ["course", "Czech language"], ar: ["كورس", "دورة", "لغة", "ثقافة"] },
  },
  {
    path: "/why-czechia/",
    title: "Why Study in Czechia: Costs, Cities and Programmes",
    description:
      "Why international students choose Czechia: free or low tuition, English programmes, safe cities and an EU degree. Key facts, verified figures and programmes by field and city.",
    keywords: { en: ["Czech Republic", "Europe"], ar: ["تشيكيا", "أوروبا", "لماذا"] },
  },
  {
    path: "/university-matcher/",
    title: "University Matcher: Find Your Programme at Czech Universities | Study in CZ",
    description:
      "Answer a few questions to find your programme at Czech universities, matched by field, budget, city and language: English-taught, or Czech-taught (free at public universities, usually after a Czech language preparatory or foundation year). A first step to study in Europe.",
    keywords: { en: ["quiz", "which university"], ar: ["اختبار", "اختيار", "جامعة"] },
  },
  {
    path: "/universities/",
    title: "Czech Universities: English Programmes, Fees and Deadlines",
    description:
      "Czech universities such as Charles University, VUT Brno and ČVUT: search English-taught programmes by field, city, degree and tuition, with fees from official university pages.",
    keywords: { en: [], ar: ["جامعات"] },
  },
  {
    path: "/programmes/",
    title: "Browse Programmes",
    description:
      "Explore verified English-taught university programmes in the Czech Republic. Filter by field, city, degree level, and tuition.",
    keywords: { en: ["courses", "degrees"], ar: ["برامج", "تخصصات"] },
  },
  {
    path: "/study/cheapest-programmes/",
    title: "Cheapest English-Taught Programmes in Czech Republic",
    description:
      "Find the most affordable English-taught university programmes in the Czech Republic, sorted by tuition. Verified fees from official sources.",
    keywords: { en: ["cheap", "low cost", "fees"], ar: ["أرخص", "رخيصة", "رسوم"] },
  },
  {
    path: "/about/",
    title: "About Study Czechia",
    description:
      "Study Czechia is an independent, student-built platform helping Arabic-speaking students navigate Czech universities. Not affiliated with any embassy or university.",
    keywords: { en: ["who we are"], ar: ["من نحن"] },
  },
  {
    path: "/contact/",
    title: "Contact Us",
    description: "Get in touch with the Study in Czechia team via email, WhatsApp, or Facebook.",
    keywords: { en: [], ar: ["تواصل", "واتساب", "إيميل"] },
  },
  {
    path: "/terms/",
    title: "Terms of Service",
    description: "Terms of service for Study Czechia. Services, refunds, and your rights.",
    keywords: { en: ["refund"], ar: ["استرداد", "شروط"] },
  },
  {
    path: "/privacy/",
    title: "Privacy Policy",
    description: "How Study Czechia handles your data. What we collect, why, and your rights.",
    keywords: { en: ["data"], ar: ["خصوصية", "بيانات"] },
  },
];

/** Extra search words for each "where am I" stage page (/stage/<slug>/). */
export const STAGE_KEYWORDS: Record<StageSlug, { en: string[]; ar: string[] }> = {
  considering: { en: ["costs", "scholarships", "agencies"], ar: ["تكاليف", "منح", "وكالات"] },
  choosing: { en: ["universities", "programmes", "deadlines"], ar: ["جامعات", "برامج", "مواعيد"] },
  documents: { en: ["documents", "eligibility", "nostrification"], ar: ["أوراق", "مستندات", "معادلة"] },
  visa: { en: ["visa", "embassy", "interview"], ar: ["تأشيرة", "فيزا", "سفارة", "مقابلة"] },
  arrived: { en: ["arrival", "foreign police", "accommodation"], ar: ["وصول", "شرطة الأجانب", "سكن"] },
};

/** Extra search words for each Q&A category, on top of its label. */
export const QA_CATEGORY_KEYWORDS: Record<QaEntry["category"], { en: string[]; ar: string[] }> = {
  visa: { en: ["visa", "residence permit"], ar: ["تأشيرة", "فيزا", "إقامة"] },
  embassy: { en: ["visa", "interview"], ar: ["تأشيرة", "فيزا", "مقابلة"] },
  documents: { en: ["papers", "translation"], ar: ["مستندات", "ترجمة"] },
  bank: { en: ["money", "proof of funds"], ar: ["بنك", "فلوس"] },
  university: { en: ["admission"], ar: ["جامعة", "قبول"] },
  housing: { en: ["accommodation", "dorm", "rent"], ar: ["سكن", "سكن طلابي", "إيجار"] },
  costs: { en: ["money", "work", "job"], ar: ["تكاليف", "شغل", "عمل"] },
  scams: { en: ["agency", "fraud"], ar: ["نصب", "وكالة"] },
  prep: { en: ["travel", "packing"], ar: ["سفر"] },
};
