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
    proofOfFunds: "Can you show proof of roughly EUR 5,500/year in a bank account?",
    fundingSource: "How are you funding your studies?",
    startWhen: "When do you want to start?",
    appliedBefore: "Applied to a Czech university before?",
    englishCert: "English certificate",
    czechPrep: "Czech language preparation",
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
    highschool: "High school",
    bachelor: "Bachelor's",
    master: "Master's",
    phd: "PhD",
  },
  resultsTitle: "Your Eligibility Assessment",
  resultsSubtitle: "Here's where you stand based on what you told us.",
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
          paidLink: "/services",
          paidLabel: `Or get a consultation — ${price("consultation")}`,
        },
        fail: {
          detail: "Without confirming your education level and grades, universities cannot assess your application. Gather your transcripts and diploma first.",
          freeLink: "/application-guide",
          freeLabel: "Read the free Application Guide",
          paidLink: "/services",
          paidLabel: `Or get your documents reviewed — ${price("documentReview")}`,
        },
      },
    },
    documents: {
      title: "Required Documents",
      pass: "All essential documents are ready.",
      warning: "Some documents still need attention — you can fix this in time.",
      fail: "Critical document gaps could block your application.",
      advice: {
        warning: {
          detail: "Missing apostille or translation can delay your application by weeks. In Egypt, apostille requires legalization from the Ministry of Foreign Affairs and then the Czech embassy — typically 4-8 weeks.",
          freeLink: "/application-guide",
          freeLabel: "Read our free apostille and document guide",
          paidLink: "/services",
          paidLabel: `Or get your full document package reviewed — ${price("documentReview")}`,
        },
        fail: {
          detail: "The embassy does not tell you what is wrong — they just say \"rejected.\" You will not know which document killed your application unless someone checks before you submit.",
          freeLink: "/application-guide",
          freeLabel: "Read the free Application Guide",
          paidLink: "/services",
          paidLabel: `Or get your full document package reviewed — ${price("documentReview")}`,
        },
      },
    },
    finances: {
      title: "Financial Readiness",
      pass: "Your finances look sufficient for a student visa.",
      warning: "You say you can arrange funds — start now, it takes time.",
      fail: "Insufficient funds or no proof. This will likely cause a visa rejection.",
      advice: {
        warning: {
          detail: "The Czech embassy requires bank statements showing approximately EUR 5,500 per year. Start gathering this proof now — last-minute transfers raise red flags.",
          freeLink: "/cost-of-living",
          freeLabel: "Use the free Cost of Living Calculator",
          paidLink: "/services",
          paidLabel: `Or book a consultation — ${price("consultation")}`,
        },
        fail: {
          detail: "Without proof of financial support, your visa will almost certainly be rejected. This is one of the most common reasons for denial.",
          freeLink: "/cost-of-living",
          freeLabel: "Use the free Cost of Living Calculator",
          paidLink: "/services",
          paidLabel: `Or book a consultation — ${price("consultation")}`,
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
          paidLink: "/services",
          paidLabel: `Or get full application assistance — ${price("fullPackageStep1")} to start`,
        },
        fail: {
          detail: "With this timeline and outstanding gaps, applying this semester risks a rejection that goes on your record. Targeting the next intake gives you time to build a strong application.",
          freeLink: "/application-guide",
          freeLabel: "Read the free Application Guide",
          paidLink: "/services",
          paidLabel: `Or let me plan your timeline — ${price("consultation")} consultation`,
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
          paidLink: "/services",
          paidLabel: `Or book a consultation — ${price("consultation")}`,
        },
        fail: {
          detail: "Without knowing whether you need a language certificate, you risk applying to programs you are not eligible for. Check requirements for your target program.",
          freeLink: "/qa",
          freeLabel: "Check language requirements in the Q&A",
          paidLink: "/services",
          paidLabel: `Or book a consultation — ${price("consultation")}`,
        },
      },
    },
  },
  ctaPaths: {
    selfLabel: "I'll handle it myself",
    selfSub: "Great — use our free guides and the Facebook community.",
    specificLabel: "I need help with specific things",
    specificSub: "Book just the services you need.",
    fullLabel: `I want someone to guide me through everything — Start with ${price("fullPackageStep1")}`,
    fullSub: "I'll build your complete plan.",
  },
  sendReportTitle: "Want this report sent to you?",
  sendReportDesc: "Message us on WhatsApp and we'll discuss your results and next steps. Free, no pressure.",
  whatsappButton: "Message me on WhatsApp",
  startOver: "Start Over",
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
    highschool: "ثانوية عامة",
    bachelor: "بكالوريوس",
    master: "ماجستير",
    phd: "دكتوراه",
  },
  resultsTitle: "شوف وضعك",
  resultsSubtitle: "دي نتيجتك حسب اللي قولتهولنا.",
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
          paidLink: "/services",
          paidLabel: `أو احجز استشارة — ${price("consultation", "ar")}`,
        },
        fail: {
          detail: "من غير ما تأكد مستواك التعليمي ودرجاتك، الجامعات مش هتقدر تقيّم طلبك. جمّع كشف الدرجات والشهادة الأول.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم المجاني",
          paidLink: "/services",
          paidLabel: `أو خلي أوراقك تتراجع — ${price("documentReview", "ar")}`,
        },
      },
    },
    documents: {
      title: "الأوراق المطلوبة",
      pass: "كل الأوراق الأساسية جاهزة.",
      warning: "بعض الأوراق لسه محتاجة انتباه — تقدر تلحق.",
      fail: "نواقص حرجة في الأوراق ممكن توقف طلبك.",
      advice: {
        warning: {
          detail: "التصديق أو الترجمة الناقصة ممكن تأخر طلبك أسابيع. في مصر، التصديق (الأبوستيل) محتاج تروح الخارجية وبعدين السفارة التشيكية — عادة 4-8 أسابيع.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل الأوراق والتصديقات المجاني",
          paidLink: "/services",
          paidLabel: `أو خلي كل أوراقك تتراجع — ${price("documentReview", "ar")}`,
        },
        fail: {
          detail: "السفارة مش بتقولك إيه الغلط — بس بتقول \"مرفوض\". مش هتعرف أي ورقة وقعتك غير لما حد يراجع قبل ما تقدم.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم المجاني",
          paidLink: "/services",
          paidLabel: `أو خلي كل أوراقك تتراجع — ${price("documentReview", "ar")}`,
        },
      },
    },
    finances: {
      title: "الوضع المادي",
      pass: "فلوسك كفاية لفيزا الطالب.",
      warning: "بتقول تقدر ترتبه — ابدأ دلوقتي لإن بياخد وقت.",
      fail: "مفيش فلوس كفاية أو مفيش إثبات. ده غالبا بيسبب رفض الفيزا.",
      advice: {
        warning: {
          detail: "السفارة التشيكية بتطلب كشوفات حساب بتوضح حوالي 5,500 يورو في السنة. ابدأ تجمع الإثبات ده دلوقتي — التحويلات اللي في آخر لحظة بترفع علامات استفهام.",
          freeLink: "/cost-of-living",
          freeLabel: "استخدم حاسبة تكلفة المعيشة المجانية",
          paidLink: "/services",
          paidLabel: `أو احجز استشارة — ${price("consultation", "ar")}`,
        },
        fail: {
          detail: "من غير إثبات دعم مالي، فيزتك هتترفض تقريبا. ده من أكتر أسباب الرفض شيوعا.",
          freeLink: "/cost-of-living",
          freeLabel: "استخدم حاسبة تكلفة المعيشة المجانية",
          paidLink: "/services",
          paidLabel: `أو احجز استشارة — ${price("consultation", "ar")}`,
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
          paidLink: "/services",
          paidLabel: `أو خد مساعدة كاملة في التقديم — ابدأ بـ ${price("fullPackageStep1", "ar")}`,
        },
        fail: {
          detail: "بالجدول الزمني ده والنواقص اللي عندك، التقديم الفصل ده بيخاطر برفض هيتسجل في ملفك. استهداف الدفعة الجاية هيديك وقت تبني طلب قوي.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم المجاني",
          paidLink: "/services",
          paidLabel: `أو خليني أخطط جدولك — استشارة ${price("consultation", "ar")}`,
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
          paidLink: "/services",
          paidLabel: `أو احجز استشارة — ${price("consultation", "ar")}`,
        },
        fail: {
          detail: "من غير ما تعرف لو محتاج شهادة لغة ولا لا، ممكن تقدم على برامج مش مؤهل ليها. تحقق من متطلبات البرنامج اللي مستهدفه.",
          freeLink: "/qa",
          freeLabel: "شوف متطلبات اللغة في الأسئلة الشائعة",
          paidLink: "/services",
          paidLabel: `أو احجز استشارة — ${price("consultation", "ar")}`,
        },
      },
    },
  },
  ctaPaths: {
    selfLabel: "هتعمل كل حاجة بنفسي",
    selfSub: "تمام — استخدم الأدلة المجانية ومجتمع فيسبوك.",
    specificLabel: "محتاج مساعدة في حاجات معينة",
    specificSub: "احجز بس الخدمات اللي محتاجها.",
    fullLabel: `عايز حد يمشيني في كل حاجة — ابدأ بـ ${price("fullPackageStep1", "ar")}`,
    fullSub: "هبنيلك خطة كاملة.",
  },
  sendReportTitle: "عايز التقرير ده يتبعتلك؟",
  sendReportDesc: "راسلنا على واتساب وهنناقش نتيجتك والخطوات الجاية. مجاني، من غير ضغط.",
  whatsappButton: "راسلني على واتساب",
  startOver: "ابدأ من الأول",
};
