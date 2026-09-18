import { PAYMENT_LINKS } from "@/config/contact";

export type Bilingual = { en: string; ar: string };

export type StageSlug = "considering" | "choosing" | "documents" | "visa" | "arrived";

export type StageLink = { href: string; label: Bilingual };

export type StagePaidService = {
  title: Bilingual;
  fearTrigger: Bilingual;
  cta: Bilingual;
  postButton: Bilingual;
  href: string;
};

export type StageConfig = {
  slug: StageSlug;
  h1: Bilingual;
  intro: Bilingual;
  tools: StageLink[];
  qaIds: string[];
  paidService: StagePaidService | null;
};

// Content sourced from the Ticket 7 mapping audit (approved). Tool/guide
// labels reuse each page's own existing title (metadata title, breadcrumb
// label, or established on-page copy) -- nothing here is a new claim.
export const stageOrder: StageSlug[] = ["considering", "choosing", "documents", "visa", "arrived"];

export const stages: Record<StageSlug, StageConfig> = {
  considering: {
    slug: "considering",
    h1: { en: "Is Czechia realistic for me?", ar: "تشيكيا فعلاً حل مناسب ليا؟" },
    intro: {
      en: "Free tools and honest numbers to help you decide — no sign-up.",
      ar: "أدوات مجانية وأرقام حقيقية تساعدك تقرر — بدون تسجيل.",
    },
    tools: [
      { href: "/cost-of-living", label: { en: "Cost of Living", ar: "تكاليف المعيشة" } },
      { href: "/what-it-costs", label: { en: "What Studying in Czechia Actually Costs", ar: "التكاليف" } },
      { href: "/scholarships", label: { en: "Scholarships", ar: "المنح الدراسية" } },
      { href: "/questions-to-ask", label: { en: "Before You Pay Any Agency, Ask These 8 Questions", ar: "أسئلة مهمة" } },
      { href: "/preparatory-year", label: { en: "Preparatory Year", ar: "السنة التحضيرية" } },
    ],
    qaIds: [
      "how-to-choose-university",
      "study-in-czech-free",
      "bologna-system",
      "english-program-count",
      "scams-avoid-agencies",
      "costs-breakdown",
    ],
    paidService: null,
  },

  choosing: {
    slug: "choosing",
    h1: { en: "Which university fits my grades and budget?", ar: "أي جامعة تناسب درجاتي وميزانيتي؟" },
    intro: {
      en: "Free tools to match you with real programmes, plus what past students needed to know before applying.",
      ar: "أدوات مجانية تساعدك تلاقي برامج حقيقية تناسبك، وكل اللي طلاب قبلك احتاجوا يعرفوه قبل التقديم.",
    },
    tools: [
      { href: "/university-matcher", label: { en: "Programme Matcher", ar: "مطابق البرامج" } },
      { href: "/universities", label: { en: "Universities", ar: "الجامعات" } },
      { href: "/programmes", label: { en: "Programmes", ar: "البرامج" } },
      { href: "/programmes/compare", label: { en: "Compare Programmes", ar: "مقارنة البرامج" } },
      { href: "/study/cheapest-programmes", label: { en: "Cheapest Programmes", ar: "أرخص البرامج" } },
      { href: "/study/no-entrance-exam", label: { en: "No Entrance Exam", ar: "بدون امتحان قبول" } },
      { href: "/deadlines", label: { en: "Deadline Tracker", ar: "متتبع المواعيد" } },
      { href: "/my-journey", label: { en: "My Journey", ar: "رحلتي" } },
    ],
    qaIds: [
      "med-preparatory-year",
      "med-language-level",
      "med-entrance-exam-subjects",
      "housing-priority-system",
      "housing-how-to-apply",
      "costs-work-hours",
    ],
    paidService: {
      title: { en: "Ask Me Anything: 30 Minutes", ar: "اسألني أي حاجة: 30 دقيقة" },
      fearTrigger: {
        en: "The answer that takes you 3 weeks of forum scrolling takes me 3 minutes.",
        ar: "الإجابة اللي بتاخد منك 3 أسابيع بحث في المنتديات بتاخد مني 3 دقايق.",
      },
      cta: { en: "Book a Call (€15)", ar: "احجز مكالمة (15€)" },
      postButton: {
        en: "🔒 Secure payment via Stripe · Full refund if the call doesn't happen",
        ar: "🔒 دفع آمن عبر Stripe · استرداد كامل لو المكالمة ماتمتش",
      },
      href: PAYMENT_LINKS.consultation,
    },
  },

  documents: {
    slug: "documents",
    h1: { en: "Are my documents right?", ar: "أوراقي سليمة؟" },
    intro: {
      en: "Free ways to check your documents before you submit, plus what actually gets rejected.",
      ar: "طرق مجانية تتأكد من أوراقك قبل ما تقدم، وإيه اللي فعلاً بيترفض.",
    },
    tools: [
      { href: "/eligibility", label: { en: "Eligibility Check", ar: "الأهلية" } },
      { href: "/application-guide", label: { en: "Application Guide", ar: "دليل التقديم" } },
    ],
    qaIds: [
      "docs-czech-vs-english",
      "docs-passport-required",
      "docs-nostrification",
      "bank-minimum-amount",
      "prep-packing-checklist",
      "prep-military-travel-permit",
    ],
    paidService: {
      title: { en: "Document Check: Before You Submit", ar: "مراجعة الأوراق: قبل ما تقدم" },
      fearTrigger: {
        en: "I've seen students rejected for a missing apostille, a wrong date format, or a translation that used the wrong legal term. Don't be that student.",
        ar: "شفت طلاب اترفضوا بسبب ابوستيل ناقص، أو تاريخ بصيغة غلط، أو ترجمة استخدمت مصطلح قانوني غلط. ماتكونش الطالب ده.",
      },
      cta: { en: "Get My Documents Reviewed (€25)", ar: "راجع أوراقي (25€)" },
      postButton: {
        en: "🔒 Secure payment via Stripe · Send documents via WhatsApp or email",
        ar: "🔒 دفع آمن عبر Stripe · ابعت الأوراق على واتساب أو إيميل",
      },
      href: PAYMENT_LINKS.documentReview,
    },
  },

  visa: {
    slug: "visa",
    h1: { en: "What will they ask me at the embassy?", ar: "هيسألوني إيه في السفارة؟" },
    intro: {
      en: "Free prep for the embassy interview, plus real questions from real interviews.",
      ar: "تحضير مجاني لمقابلة السفارة، وأسئلة حقيقية من مقابلات حقيقية.",
    },
    tools: [
      { href: "/interview-prep", label: { en: "Embassy Interview Prep", ar: "تجهيز مقابلة السفارة" } },
      { href: "/application-guide", label: { en: "Application Guide", ar: "دليل التقديم" } },
    ],
    qaIds: [
      "visa-decision-delayed",
      "visa-reapply-after-rejection",
      "visa-refund-after-rejection",
      "visa-appeal",
      "visa-validity",
      "visa-90-day-vs-long-term",
      "interview-language",
      "interview-common-questions",
      "embassy-booking-appointment",
    ],
    paidService: {
      title: { en: "Embassy Interview Prep: Don't Walk In Unprepared", ar: "تجهيز مقابلة السفارة: ماتروحش من غير تحضير" },
      fearTrigger: {
        en: "The interview lasts 10 minutes. The wrong answer lasts 6 months.",
        ar: "المقابلة بتاخد 10 دقايق. الإجابة الغلط بتكلفك 6 شهور.",
      },
      cta: { en: "Book My Mock Interview —EUR 39", ar: "احجز مقابلة تجريبية —39 يورو" },
      postButton: { en: "", ar: "" },
      href: PAYMENT_LINKS.interviewPrep,
    },
  },

  arrived: {
    slug: "arrived",
    h1: { en: "I just landed. Now what?", ar: "لسه واصل. دلوقتي أعمل إيه؟" },
    intro: {
      en: "Everything you need for your first days, starting with the one deadline that matters.",
      ar: "كل اللي محتاجه لأول أيامك، بدءًا من الموعد الوحيد اللي فعلاً يهم.",
    },
    tools: [
      { href: "/arrival", label: { en: "Just Arrived", ar: "لسه واصل" } },
      { href: "/application-guide", label: { en: "Application Guide", ar: "دليل التقديم" } },
    ],
    qaIds: [],
    paidService: {
      title: { en: "Landed in Czechia? I've Got You.", ar: "وصلت التشيك؟ أنا معاك." },
      fearTrigger: {
        en: "Your first 2 weeks will be overwhelming. Bank account, foreign police, insurance, transport, phone, and everything is in Czech.",
        ar: "أول أسبوعين هيكونوا صعبين. حساب بنكي، شرطة الأجانب، تأمين، مواصلات، موبايل. وكل حاجة بالتشيكي.",
      },
      cta: { en: "Get My Arrival Plan (€29)", ar: "احصل على خطة وصولي (29€)" },
      postButton: { en: "🔒 Secure payment via Stripe", ar: "🔒 دفع آمن عبر Stripe" },
      href: PAYMENT_LINKS.arrivalSupport,
    },
  },
};
