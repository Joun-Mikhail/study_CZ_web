/**
 * 2027/2028 admission rounds for the English-taught medicine programmes, as each
 * faculty publishes them. Only what the cited page states is recorded: a faculty
 * that hasn't published its round has no dates, never a guess from last year.
 */
export type AdmissionRound = {
  /** Programmes in src/data/programmes.ts this round covers. */
  programmeIds: string[];
  /** ISO dates of the application window, when the faculty states them. */
  applyFrom?: string;
  applyUntil?: string;
  /** What the window depends on, when it isn't one fixed date. */
  note?: { en: string; ar: string };
  applicationFee?: { amount: number; currency: "EUR" | "CZK" };
  sourceUrl: string;
  checkedOn: string;
};

export const ADMISSIONS_INTAKE = "2027/2028";
const CHECKED = "2026-10-27";

export const MEDICINE_ADMISSIONS: AdmissionRound[] = [
  {
    programmeIds: ["cuni-md-general-medicine", "cuni-md-dentistry"],
    applyFrom: "2026-11-01",
    applyUntil: "2027-04-30",
    applicationFee: { amount: 285, currency: "EUR" },
    sourceUrl: "https://en.lf1.cuni.cz/applicants",
    checkedOn: CHECKED,
  },
  {
    programmeIds: ["cuni-lf2-md-general-medicine"],
    sourceUrl: "https://www.lf2.cuni.cz/en/applicants/how-to-apply/apply-online",
    checkedOn: CHECKED,
  },
  {
    programmeIds: ["cuni-plzen-md-general-medicine", "cuni-plzen-md-dentistry"],
    applyFrom: "2026-11-01",
    applyUntil: "2027-04-30",
    note: { en: "Regular exam in Pilsen on 26 May 2027.", ar: "الامتحان الأساسي في بلزن يوم 26 مايو 2027." },
    applicationFee: { amount: 990, currency: "CZK" },
    sourceUrl: "https://lfp.cuni.cz/en/faculty-of-medicine-in-pilsen/admission-procedure/",
    checkedOn: CHECKED,
  },
  {
    programmeIds: ["cuni-hradec-md-general-medicine", "cuni-hradec-md-dentistry"],
    applyUntil: "2027-04-30",
    note: {
      en: "Apply and pay by 30 April 2027, even for exam dates after it; exams run November 2026 to June 2027.",
      ar: "التقديم والدفع حتى 30 أبريل 2027 حتى لمواعيد الامتحان بعده، والامتحانات من نوفمبر 2026 إلى يونيو 2027.",
    },
    applicationFee: { amount: 2500, currency: "CZK" },
    sourceUrl: "https://www.lfhk.cuni.cz/LFHKEN-181.html",
    checkedOn: CHECKED,
  },
  {
    programmeIds: ["muni-md-general-medicine", "muni-md-dentistry"],
    applyFrom: "2027-01-02",
    applyUntil: "2027-07-31",
    note: {
      en: "For exams through the faculty's agencies abroad; apply about two weeks before your exam date.",
      ar: "للامتحان عن طريق وكلاء الكلية في الخارج، والتقديم قبل موعد امتحانك بأسبوعين تقريبًا.",
    },
    sourceUrl: "https://www.med.muni.cz/en/admissions/admission-information",
    checkedOn: CHECKED,
  },
  {
    programmeIds: ["upol-md-general-medicine"],
    applyFrom: "2026-11-01",
    applyUntil: "2027-07-31",
    note: {
      en: "Complete your application two weeks before the exam date you choose; the exam is online.",
      ar: "أكمل طلبك قبل موعد الامتحان الذي تختاره بأسبوعين، والامتحان أونلاين.",
    },
    applicationFee: { amount: 80, currency: "EUR" },
    sourceUrl: "https://www.lf.upol.cz/en/studyat-our-faculty/general-medicine-mudr/",
    checkedOn: CHECKED,
  },
  {
    programmeIds: ["osu-md-general-medicine"],
    sourceUrl: "https://lf.osu.eu/21563/masters-degree-programme-general-medicine-in-english/",
    checkedOn: CHECKED,
  },
];

/** Official pages behind the guide's admission, timeline and cost sections. */
export const MEDICINE_GUIDE_SOURCES = {
  czechFree: "https://studyin.gov.cz/plan-your-studies/learn-czech-study-tuition-free/",
  plzenAdmission: "https://lfp.cuni.cz/en/faculty-of-medicine-in-pilsen/admission-procedure/",
  lf1Applicants: "https://en.lf1.cuni.cz/applicants",
  muniAdmission: "https://www.med.muni.cz/en/admissions/admission-information",
  hkAdmission: "https://www.lfhk.cuni.cz/LFHKEN-181.html",
  upolAdmission: "https://www.lf.upol.cz/en/studyat-our-faculty/general-medicine-mudr/",
  fundsInterior: "https://frs.gov.cz/en/forms-and-documents/documents/proof-of-funds-for-the-residence-finances/",
} as const;
