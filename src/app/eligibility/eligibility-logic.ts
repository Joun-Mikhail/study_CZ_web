// Eligibility scoring and copy, shared by the eligibility page and the
// email that sends a student their result (netlify/functions/email-subscribe.mts).
// Plain TypeScript: no React, so the Netlify Function can import it.
import { price } from "@/config/pricing";

export type Status = "pass" | "warning" | "fail";

export interface FormData {
  firstName: string;
  country: string;
  whatsapp: string;
  email: string;
  highestEducation: string;
  gpa: string;
  targetLevel: string;
  apostille: string;
  translation: string;
  passportValid: string;
  proofOfFunds: string;
  fundingSource: string;
  startWhen: string;
  appliedBefore: string;
  englishCert: string;
  czechPrep: string;
  /** Optional: "myself" | "someHelp" | "withMe". */
  helpStyle: string;
}

export const initial: FormData = {
  firstName: "",
  country: "",
  whatsapp: "",
  email: "",
  highestEducation: "",
  gpa: "",
  targetLevel: "",
  apostille: "",
  translation: "",
  passportValid: "",
  proofOfFunds: "",
  fundingSource: "",
  startWhen: "",
  appliedBefore: "",
  englishCert: "",
  czechPrep: "",
  helpStyle: "",
};

// ── Scoring ──────────────────────────────────────────────────────────────────

export interface ScoredCategory {
  key: string;
  status: Status;
  score: number;
}

export function scoreForm(form: FormData): { categories: ScoredCategory[]; pct: number; total: number } {
  const categories: ScoredCategory[] = [];

  // Academics: education completed + grade
  const gpaText = form.gpa.replace(",", ".").replace("%", "");
  const gpaNum = parseFloat(gpaText) || 0;
  const hasEducation = form.highestEducation !== "";
  if (hasEducation && gpaNum > 0 && (gpaNum >= 60 || (gpaNum < 10 && gpaNum >= 2.5))) {
    categories.push({ key: "academics", status: "pass", score: 2 });
  } else if (gpaNum > 0 && gpaNum < 60 && gpaNum >= 10) {
    categories.push({ key: "academics", status: "warning", score: 1 });
  } else if (gpaNum > 0 && gpaNum < 2.5 && gpaNum < 10) {
    categories.push({ key: "academics", status: "warning", score: 1 });
  } else {
    categories.push({ key: "academics", status: hasEducation ? "warning" : "fail", score: hasEducation ? 1 : 0 });
  }

  // Documents
  const apostilleOk = form.apostille === "yes";
  const translationOk = form.translation === "english" || form.translation === "czech";
  const passportOk = form.passportValid === "yes";
  if (apostilleOk && translationOk && passportOk) {
    categories.push({ key: "documents", status: "pass", score: 2 });
  } else if (form.apostille === "unknown" || form.passportValid === "no") {
    categories.push({ key: "documents", status: "fail", score: 0 });
  } else {
    categories.push({ key: "documents", status: "warning", score: 1 });
  }

  // Finances
  if (form.proofOfFunds === "available") {
    categories.push({ key: "finances", status: "pass", score: 2 });
  } else if (form.proofOfFunds === "canArrange") {
    categories.push({ key: "finances", status: "warning", score: 1 });
  } else {
    categories.push({ key: "finances", status: "fail", score: 0 });
  }

  // Timeline
  const nonPassCount = categories.filter((c) => c.status !== "pass").length;
  const failCount = categories.filter((c) => c.status === "fail").length;
  if (form.startWhen === "nextYear" || form.startWhen === "exploring") {
    categories.push({ key: "timeline", status: "pass", score: 2 });
  } else if (form.startWhen === "thisSemester" && failCount >= 2) {
    categories.push({ key: "timeline", status: "fail", score: 0 });
  } else if (form.startWhen === "thisSemester" && nonPassCount > 0) {
    categories.push({ key: "timeline", status: "warning", score: 1 });
  } else {
    categories.push({ key: "timeline", status: "pass", score: 2 });
  }

  // Language
  if (form.englishCert === "yes" || form.englishCert === "notRequired") {
    categories.push({ key: "language", status: "pass", score: 2 });
  } else if (form.englishCert === "plan") {
    categories.push({ key: "language", status: "warning", score: 1 });
  } else {
    categories.push({ key: "language", status: "fail", score: 0 });
  }

  const total = categories.reduce((sum, c) => sum + c.score, 0);
  const pct = Math.round((total / 10) * 100);

  return { categories, pct, total };
}

// ── The plan: verdict, top risks, matched help ──────────────────────────────
// The risk → help mapping is in docs/JOURNEY.md, 2.1. Each risk gets a free fix
// first and at most one paid service: the cheapest one that fixes it.

export type Verdict = "ready" | "fixable" | "notYet";
/** Same keys as HelpService in src/data/help-services.ts (kept plain here for the email function). */
export type PlanService = "documentReview" | "consultation";

export interface Risk {
  key: string;
  status: Exclude<Status, "pass">;
  service?: PlanService;
}

const RISK_ORDER = ["documents", "finances", "timeline", "academics", "language"];

function serviceFor(key: string, status: Status): PlanService | undefined {
  if (key === "documents") return "documentReview";
  if (key === "finances" || key === "timeline") return "consultation";
  if (key === "academics" && status === "warning") return "consultation";
  return undefined; // missing education details or language: nothing I sell fixes it
}

export function verdictFor(categories: ScoredCategory[]): Verdict {
  const fails = categories.filter((c) => c.status === "fail").length;
  const warnings = categories.filter((c) => c.status === "warning").length;
  if (fails >= 2) return "notYet";
  if (fails === 0 && warnings <= 1) return "ready";
  return "fixable";
}

/** Up to three open risks, fails first; a service is never offered twice. */
export function topRisks(categories: ScoredCategory[]): Risk[] {
  const open = categories
    .filter((c): c is ScoredCategory & { status: Exclude<Status, "pass"> } => c.status !== "pass")
    .sort(
      (a, b) =>
        (a.status === "fail" ? 0 : 1) - (b.status === "fail" ? 0 : 1) ||
        RISK_ORDER.indexOf(a.key) - RISK_ORDER.indexOf(b.key)
    )
    .slice(0, 3);
  const used = new Set<PlanService>();
  return open.map((c) => {
    const s = serviceFor(c.key, c.status);
    const service = s && !used.has(s) ? s : undefined;
    if (service) used.add(service);
    return { key: c.key, status: c.status, service };
  });
}

/** The Full Journey is offered only for several red flags, or when asked for. */
export function offersFullJourney(form: FormData, categories: ScoredCategory[]): boolean {
  return form.helpStyle === "withMe" || categories.filter((c) => c.status === "fail").length >= 2;
}

/** Short reason per risk, for the WhatsApp summary ("apostille not done"). */
function riskReason(key: string, form: FormData, locale: "en" | "ar"): string {
  const ar = locale === "ar";
  switch (key) {
    case "documents":
      if (form.passportValid === "no") return ar ? "الجواز هيخلص قريب" : "passport expiring soon";
      if (form.apostille !== "yes") return ar ? "لسه ماعملتش أبوستيل" : "apostille not done";
      return ar ? "الترجمة لسه" : "translations not done";
    case "finances":
      return form.proofOfFunds === "canArrange" ? (ar ? "أقدر أرتبها" : "can arrange funds") : ar ? "مش متأكد" : "not sure yet";
    case "timeline":
      return ar ? "عايز أبدأ الفصل الجاي" : "starting this coming semester";
    case "academics":
      return ar ? "المجموع" : "grades";
    default:
      return ar ? "شهادة اللغة" : "language certificate";
  }
}

/** The prefilled "Send my plan to John" message. Answers only: no name, email or number. */
export function planSummary(form: FormData, locale: "en" | "ar"): string {
  const { categories, pct } = scoreForm(form);
  const copy = locale === "ar" ? ar : en;
  const risks = topRisks(categories)
    .map((r) => `${copy.resultCategories[r.key as keyof typeof copy.resultCategories].title} (${riskReason(r.key, form, locale)})`)
    .join(locale === "ar" ? "، " : ", ");
  const start = { thisSemester: copy.options.thisSemester, nextYear: copy.options.nextYear, exploring: copy.options.exploring }[
    form.startWhen as "thisSemester" | "nextYear" | "exploring"
  ];
  if (locale === "ar") {
    return [
      `أهلًا جون، دي خطتي من اختبار الأهلية. الجاهزية: ${pct}%.`,
      risks ? `محتاج أشتغل على: ${risks}.` : "",
      start ? `عايز أبدأ: ${start}.` : "",
      "ممكن تساعدني في الخطوة الجاية؟",
    ].filter(Boolean).join(" ");
  }
  return [
    `Hi John, here's my plan from the eligibility check. Readiness: ${pct}%.`,
    risks ? `To work on: ${risks}.` : "",
    start ? `Starting: ${start.toLowerCase()}.` : "",
    "Can you help me with the next step?",
  ].filter(Boolean).join(" ");
}

/** Official sources for the figures in the timeline. */
export const TIMELINE_SOURCES = {
  visa: "https://mzv.gov.cz/cairo/en/visa_and_consular_information/long_term_visa/study_long_term_visa_to_the_czech/index.html",
  police: "https://policie.gov.cz/reditelstvi-sluzby-cizinecke-policie/reporting-of-the-place-of-foreigns-residence",
};

// ─── English copy ───────────────────────────────────────────────────────────

export const en = {
  title: "Am I Eligible?",
  subtitle: "Answer a few questions and we'll tell you where you stand — free, instant, no sign-up.",
  steps: ["Academics", "Documents", "Finances", "Timeline & Language"],
  back: "Back",
  next: "Next",
  seeResults: "See My Results",
  fields: {
    firstName: "First name",
    country: "Country",
    whatsapp: "WhatsApp number (optional)",
    email: "Email (optional)",
    highestEducation: "Highest completed education",
    gpa: "Overall grade or GPA",
    targetLevel: "Target program level",
    apostille: "Have you apostilled your diploma/transcripts?",
    translation: "Have you had documents officially translated?",
    passportValid: "Valid passport, expiring more than 18 months from now?",
    proofOfFunds: "Can you show proof of roughly €5,500 a year in a bank account?",
    fundingSource: "How are you funding your studies?",
    startWhen: "When do you want to start?",
    appliedBefore: "Applied to a Czech university before?",
    englishCert: "English certificate",
    czechPrep: "Czech language preparation",
    helpStyle: "How would you like to do this? (optional)",
  },
  placeholders: {
    firstName: "Your first name",
    country: "Select your country...",
    gpa: "e.g. 85%, 3.2 GPA",
  },
  helpers: {
    whatsapp: "So we can send your results if you want",
    email: "For your eligibility report",
    gpa: "Approximate is fine — e.g. 85%, 3.2 GPA",
  },
  options: {
    yes: "Yes",
    no: "No",
    dontKnow: "I don't know what that means",
    notSure: "Not sure",
    translatedEn: "Yes, English",
    translatedCs: "Yes, Czech",
    expiringSoon: "Expiring soon",
    availableNow: "Yes, available now",
    canArrange: "I can arrange it",
    noOrUnsure: "No / not sure",
    family: "Family support",
    savings: "Savings",
    scholarship: "Scholarship",
    workStudy: "Work + study",
    notSureYet: "Not sure yet",
    thisSemester: "This coming semester",
    nextYear: "Next academic year",
    exploring: "Exploring, no rush",
    yesAccepted: "Yes, accepted",
    yesRejected: "Yes, rejected",
    firstTime: "No, first time",
    planToTake: "Plan to take one",
    notRequired: "Not required",
    courseTaken: "Course taken",
    selfStudy: "Some self-study",
    noneYet: "None yet",
    myself: "By myself",
    someHelp: "With help on specific steps",
    withMe: "With someone the whole way",
    highschool: "High school",
    bachelor: "Bachelor's",
    master: "Master's",
    phd: "PhD",
  },
  resultsTitle: "Your plan",
  resultsSubtitle: "Based on what you told me.",
  readiness: "readiness",
  resultCategories: {
    academics: {
      title: "Academic Background",
      pass: "Your grades and education meet admission requirements.",
      warning: "Grade may limit program options — consider preparatory year.",
      fail: "Missing education details may block your application.",
      advice: {
        warning: {
          detail: "A lower GPA does not disqualify you, but it narrows your university choices. A preparatory year can strengthen your profile significantly.",
          freeLink: "/preparatory-year",
          freeLabel: "Read the free Preparatory Year guide",
        },
        fail: {
          detail: "Without confirming your education level and grades, universities cannot assess your application. Gather your transcripts and diploma first.",
          freeLink: "/application-guide",
          freeLabel: "Read the free Application Guide",
        },
      },
    },
    documents: {
      title: "Required Documents",
      pass: "All essential documents are ready.",
      warning: "Some documents still need attention — you can fix this in time.",
      fail: "Some documents need sorting out before you apply.",
      advice: {
        warning: {
          detail: "Missing apostille or translation can delay your application by weeks. In Egypt, apostille requires legalization from the Ministry of Foreign Affairs and then the Czech embassy — typically 4-8 weeks.",
          freeLink: "/application-guide",
          freeLabel: "Read our free apostille and document guide",
        },
        fail: {
          detail: "An apostille you're unsure about, or a passport that expires too soon, can hold up the whole application. Both are fixable. Start with the apostille: it usually takes 4-8 weeks.",
          freeLink: "/application-guide",
          freeLabel: "Read the free Application Guide",
        },
      },
    },
    finances: {
      title: "Financial Readiness",
      pass: "Your finances look sufficient for a student visa.",
      warning: "You say you can arrange funds — start now, it takes time.",
      fail: "No proof of funds yet. The visa needs it, so plan this first.",
      advice: {
        warning: {
          detail: "The Czech embassy requires bank statements showing approximately €5,500 per year. Start gathering this proof now — last-minute transfers raise red flags.",
          freeLink: "/cost-of-living",
          freeLabel: "Use the free Cost of Living Calculator",
        },
        fail: {
          detail: "The embassy asks for proof of about €5,500 a year before it grants a student visa, so this needs a plan before you apply. The calculator shows what you'll really need; cheaper cities and scholarships can close the gap.",
          freeLink: "/cost-of-living",
          freeLabel: "Use the free Cost of Living Calculator",
        },
      },
    },
    timeline: {
      title: "Timeline",
      pass: "You have enough time to prepare a strong application.",
      warning: "Tight timeline — start immediately and do not wait on anything.",
      fail: "Very little time left. You may need to target the next intake.",
      advice: {
        warning: {
          detail: "Rushing an application leads to mistakes. Apostille alone can take 4-8 weeks. If any of your documents are not ready, start today.",
          freeLink: "/application-guide",
          freeLabel: "Read the step-by-step Application Guide",
        },
        fail: {
          detail: "With this timeline and a few gaps still open, the next intake gives you time to apply properly instead of in a rush.",
          freeLink: "/application-guide",
          freeLabel: "Read the free Application Guide",
        },
      },
    },
    language: {
      title: "Language Proficiency",
      pass: "Your language qualifications look good.",
      warning: "Plan to get certified — some programs require proof.",
      fail: "Unclear language status could limit your options.",
      advice: {
        warning: {
          detail: "Most English-taught programs require IELTS 5.5-6.5 or equivalent. Book your test soon — slots fill up and results take weeks.",
          freeLink: "/qa",
          freeLabel: "Check language requirements in the Q&A",
        },
        fail: {
          detail: "Without knowing whether you need a language certificate, you risk applying to programs you are not eligible for. Check requirements for your target program.",
          freeLink: "/qa",
          freeLabel: "Check language requirements in the Q&A",
        },
      },
    },
  },
  plan: {
    verdicts: {
      ready: "You're in a good position to apply.",
      fixable: "You can apply. Fix these first.",
      notYet: "Not yet, but here's how to get there.",
    },
    risksTitle: "The things to work on",
    noRisks: "Nothing stands in your way. Next: pick your programmes and their deadlines.",
    diy: "Do it yourself:",
    service: {
      documentReview: "Or I can check your documents for you",
      consultation: "Or let's plan it together in a 30-minute call",
    },
    fullTitle: "Several things need work at once.",
    fullBody: (step1: string, step2: string) =>
      `If you'd rather not juggle them alone, I can go through the whole process with you. You pay step 1 (${step1}) now. Step 2 (${step2}) is only due after a university accepts you.`,
    fullButton: "See how the Full Journey works",
    timelineTitle: "Your timeline",
    timeline: [
      "Now: start the apostille and translations (usually 4-8 weeks).",
      "Pick your programmes and note their deadlines.",
      "Apply before each programme's deadline.",
      "After you're accepted: book the embassy appointment. The visa decision can take up to 60 days, sometimes 90.",
      "When you arrive: report your address to the foreign police within 3 working days (dorms and hotels usually do it for you).",
    ],
    deadlinesLink: "Deadline tracker",
    nextIntake: "Aim for the next intake. It gives you time to do this properly.",
    sourceLabel: "Source",
    save: "Save to My Journey",
    saved: "Saved. Open My Journey",
    send: "Send my plan to John",
    sendHint: "Opens WhatsApp with a short summary of your answers. Nothing is sent until you press send.",
    startOver: "Start over",
  },
};

// ─── Arabic copy ────────────────────────────────────────────────────────────

export const ar: typeof en = {
  title: "أقدر أقدم؟",
  subtitle: "جاوب على كام سؤال وهنقولك وضعك — ببلاش وفي ثواني من غير تسجيل.",
  steps: ["الدراسة", "الأوراق", "الفلوس", "الوقت واللغة"],
  back: "رجوع",
  next: "التالي",
  seeResults: "شوف نتيجتي",
  fields: {
    firstName: "الاسم الأول",
    country: "البلد",
    whatsapp: "رقم واتساب (اختياري)",
    email: "البريد الإلكتروني (اختياري)",
    highestEducation: "أعلى شهادة عندك",
    gpa: "مجموعك أو معدلك",
    targetLevel: "عايز تدرس إيه",
    apostille: "عملت تصديق رسمي (أبوستيل) لشهادتك وكشف الدرجات؟",
    translation: "ترجمت أوراقك ترجمة معتمدة؟",
    passportValid: "جوازك ساري لأكتر من 18 شهر؟",
    proofOfFunds: "تقدر تبين إن في حسابك حوالي 5,500 يورو في السنة؟",
    fundingSource: "هتصرف على دراستك إزاي؟",
    startWhen: "عايز تبدأ امتى؟",
    appliedBefore: "قدمت على جامعة تشيكية قبل كده؟",
    englishCert: "شهادة إنجليزي",
    czechPrep: "تحضير اللغة التشيكية",
    helpStyle: "حابب تعملها إزاي؟ (اختياري)",
  },
  placeholders: {
    firstName: "اسمك الأول",
    country: "اختر بلدك...",
    gpa: "مثلا: 85%، 3.2",
  },
  helpers: {
    whatsapp: "عشان نبعتلك النتيجة لو حبيت",
    email: "عشان نبعتلك النتيجة",
    gpa: "تقريبي كفاية — مثلا 85%، 3.2",
  },
  options: {
    yes: "أيوه",
    no: "لا",
    dontKnow: "مش عارف يعني إيه ده",
    notSure: "مش متأكد",
    translatedEn: "أيوه، إنجليزي",
    translatedCs: "أيوه، تشيكي",
    expiringSoon: "قرب يخلص",
    availableNow: "أيوه، متاح دلوقتي",
    canArrange: "أقدر أرتبه",
    noOrUnsure: "لا / مش متأكد",
    family: "دعم عائلي",
    savings: "مدخرات",
    scholarship: "منحة",
    workStudy: "شغل + دراسة",
    notSureYet: "مش متأكد لسه",
    thisSemester: "الفصل الجاي",
    nextYear: "السنة الدراسية الجاية",
    exploring: "بستكشف، مش مستعجل",
    yesAccepted: "أيوه، اتقبلت",
    yesRejected: "أيوه، اترفضت",
    firstTime: "لا، أول مرة",
    planToTake: "ناوي أمتحن",
    notRequired: "مش مطلوبة",
    courseTaken: "خدت كورس",
    selfStudy: "شوية دراسة ذاتية",
    noneYet: "لسه مبدأتش",
    myself: "لوحدي",
    someHelp: "بمساعدة في خطوات معينة",
    withMe: "مع حد طول الطريق",
    highschool: "ثانوية عامة",
    bachelor: "بكالوريوس",
    master: "ماجستير",
    phd: "دكتوراه",
  },
  resultsTitle: "خطتك",
  resultsSubtitle: "حسب اللي قولتهولي.",
  readiness: "جاهزية",
  resultCategories: {
    academics: {
      title: "الدراسة والشهادات",
      pass: "درجاتك كويسة وبتستوفي شروط القبول.",
      warning: "مجموعك ممكن يقلل اختياراتك — فكّر في سنة تحضيرية.",
      fail: "معلومات الشهادة ناقصة وده ممكن يوقف طلبك.",
      advice: {
        warning: {
          detail: "معدل أقل مش بيشيلك، بس بيقلل اختياراتك. السنة التحضيرية ممكن تقوي ملفك بشكل كبير.",
          freeLink: "/preparatory-year",
          freeLabel: "اقرأ دليل السنة التحضيرية المجاني",
        },
        fail: {
          detail: "من غير ما تأكد مستواك التعليمي ودرجاتك، الجامعات مش هتقدر تقيّم طلبك. جمّع كشف الدرجات والشهادة الأول.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم المجاني",
        },
      },
    },
    documents: {
      title: "الأوراق المطلوبة",
      pass: "كل الأوراق الأساسية جاهزة.",
      warning: "بعض الأوراق لسه محتاجة انتباه — تقدر تلحق.",
      fail: "في أوراق محتاجة تتظبط قبل ما تقدم.",
      advice: {
        warning: {
          detail: "التصديق أو الترجمة الناقصة ممكن تأخر طلبك أسابيع. في مصر، التصديق (الأبوستيل) محتاج تروح الخارجية وبعدين السفارة التشيكية — عادة 4-8 أسابيع.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل الأوراق والتصديقات المجاني",
        },
        fail: {
          detail: "الأبوستيل اللي مش متأكد منه، أو جواز سفر هيخلص بدري، ممكن يوقفوا الطلب كله. والاتنين ليهم حل. ابدأ بالأبوستيل لإنه غالبًا بياخد من 4 لـ8 أسابيع.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم المجاني",
        },
      },
    },
    finances: {
      title: "الوضع المادي",
      pass: "فلوسك كفاية لفيزا الطالب.",
      warning: "بتقول تقدر ترتبه — ابدأ دلوقتي لإن بياخد وقت.",
      fail: "لسه مفيش إثبات فلوس. الفيزا محتاجاه، فخطط له الأول.",
      advice: {
        warning: {
          detail: "السفارة التشيكية بتطلب كشوفات حساب بتوضح حوالي 5,500 يورو في السنة. ابدأ تجمع الإثبات ده دلوقتي — التحويلات اللي في آخر لحظة بترفع علامات استفهام.",
          freeLink: "/cost-of-living",
          freeLabel: "استخدم حاسبة تكلفة المعيشة المجانية",
        },
        fail: {
          detail: "السفارة بتطلب إثبات حوالي 5,500 يورو في السنة قبل ما تدي فيزا الطالب، فده محتاج خطة قبل ما تقدم. الحاسبة هتوريك محتاج كام فعلًا، والمدن الأرخص والمنح ممكن يسدوا الفرق.",
          freeLink: "/cost-of-living",
          freeLabel: "استخدم حاسبة تكلفة المعيشة المجانية",
        },
      },
    },
    timeline: {
      title: "الوقت",
      pass: "عندك وقت كافي تجهز طلب قوي.",
      warning: "الوقت ضيق — ابدأ فورا وماتستناش حاجة.",
      fail: "فاضل وقت قليل جدا. ممكن تحتاج تستهدف الدفعة الجاية.",
      advice: {
        warning: {
          detail: "الاستعجال في التقديم بيجيب أخطاء. التصديق (الأبوستيل) لوحده ممكن ياخد 4-8 أسابيع. لو أي ورق مش جاهز، ابدأ النهارده.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم خطوة بخطوة",
        },
        fail: {
          detail: "بالوقت ده ومع النواقص اللي لسه مفتوحة، الدفعة الجاية هتديك وقت تقدم صح بدل ما تقدم على عجلة.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم المجاني",
        },
      },
    },
    language: {
      title: "مستوى اللغة",
      pass: "مستوى لغتك كويس.",
      warning: "خطط تمتحن — بعض البرامج بتطلب إثبات.",
      fail: "وضع اللغة مش واضح وده ممكن يحد من اختياراتك.",
      advice: {
        warning: {
          detail: "معظم البرامج بالإنجليزي بتطلب IELTS 5.5-6.5 أو ما يعادله. احجز امتحانك بدري — الأماكن بتخلص والنتايج بتاخد أسابيع.",
          freeLink: "/qa",
          freeLabel: "شوف متطلبات اللغة في الأسئلة الشائعة",
        },
        fail: {
          detail: "من غير ما تعرف لو محتاج شهادة لغة ولا لا، ممكن تقدم على برامج مش مؤهل ليها. تحقق من متطلبات البرنامج اللي مستهدفه.",
          freeLink: "/qa",
          freeLabel: "شوف متطلبات اللغة في الأسئلة الشائعة",
        },
      },
    },
  },
  plan: {
    verdicts: {
      ready: "وضعك كويس وتقدر تقدم.",
      fixable: "تقدر تقدم، بس صلّح الحاجات دي الأول.",
      notYet: "لسه مش دلوقتي، بس دي الطريقة اللي توصلك.",
    },
    risksTitle: "الحاجات اللي تشتغل عليها",
    noRisks: "مفيش حاجة واقفة قدامك. الخطوة الجاية: اختار برامجك ومواعيدها.",
    diy: "اعملها بنفسك:",
    service: {
      documentReview: "أو أراجعلك أوراقك بنفسي",
      consultation: "أو نخططها مع بعض في مكالمة 30 دقيقة",
    },
    fullTitle: "في كذا حاجة محتاجة شغل في نفس الوقت.",
    fullBody: (step1: string, step2: string) =>
      `لو مش عايز تشيلهم لوحدك، أقدر أمشي معاك في العملية كلها. بتدفع المرحلة الأولى (${step1}) دلوقتي، والتانية (${step2}) بس بعد ما جامعة تقبلك.`,
    fullButton: "شوف الرحلة الكاملة بتمشي إزاي",
    timelineTitle: "الجدول بتاعك",
    timeline: [
      "دلوقتي: ابدأ الأبوستيل والترجمة (غالبًا من 4 لـ8 أسابيع).",
      "اختار برامجك واكتب مواعيدها.",
      "قدّم قبل آخر ميعاد لكل برنامج.",
      "بعد القبول: احجز ميعاد السفارة. قرار الفيزا ممكن ياخد لحد 60 يوم، وأحيانًا 90.",
      "أول ما توصل: بلّغ شرطة الأجانب بعنوانك خلال 3 أيام عمل (السكن الجامعي والفنادق غالبًا بيعملوها بدالك).",
    ],
    deadlinesLink: "متتبع المواعيد",
    nextIntake: "خلي هدفك الدفعة الجاية، هتديك وقت تعملها صح.",
    sourceLabel: "المصدر",
    save: "احفظ في رحلتي",
    saved: "اتحفظت. افتح رحلتي",
    send: "ابعت خطتي لجون",
    sendHint: "هيفتح واتساب بملخص قصير لإجاباتك. مفيش حاجة بتتبعت غير لما تدوس إرسال.",
    startOver: "ابدأ من الأول",
  },
};
