import type { Programme, DeadlineStatus } from "./types";

/**
 * Programme data rules (enforced by architecture, not just policy):
 *
 * 1. Every programme MUST have a `verification` block with sourceUrl and lastVerified.
 * 2. No programme enters this file without a verifiable official source.
 * 3. Tuition values come from official university fee schedules only.
 * 4. Deadlines come from official admissions pages only.
 * 5. When a value is unknown, omit the field — never guess.
 *
 * To add programmes: verify on the university's official English-language pages,
 * add the programme with a sourceUrl pointing to the specific page, and set
 * lastVerified to the date you checked.
 */

export const programmes: Programme[] = [
  // ─── VŠE Prague ──────────────────────────────────────────────────────
  {
    id: "vse-bba-intl-business",
    universityId: "vse",
    faculty: "Faculty of International Relations",
    name: { en: "International Business", ar: "الأعمال الدولية" },
    degree: "Bachelor",
    language: "English",
    field: "Business",
    durationYears: 3,
    tuitionEurPerYear: 3600,
    entranceExam: true,
    entranceExamDetails: {
      en: "Written exam: mathematics + English",
      ar: "امتحان كتابي: رياضيات + إنجليزي",
    },
    programmeUrl: "https://www.vse.cz/english/admissions/bachelor-programs/",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.vse.cz/english/admissions/bachelor-programs/",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
  {
    id: "vse-msc-intl-business",
    universityId: "vse",
    faculty: "Faculty of International Relations",
    name: { en: "International Business - Central European Business Realities", ar: "الأعمال الدولية - واقع الأعمال في وسط أوروبا" },
    degree: "Master",
    language: "English",
    field: "Business",
    durationYears: 2,
    tuitionEurPerYear: 3600,
    entranceExam: true,
    entranceExamDetails: {
      en: "Written exam based on bachelor-level knowledge",
      ar: "امتحان كتابي على مستوى البكالوريوس",
    },
    programmeUrl: "https://www.vse.cz/english/admissions/master-programs/",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.vse.cz/english/admissions/master-programs/",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
  {
    id: "vse-msc-finance-accounting",
    universityId: "vse",
    faculty: "Faculty of Finance and Accounting",
    name: { en: "Finance and Accounting", ar: "المالية والمحاسبة" },
    degree: "Master",
    language: "English",
    field: "Finance",
    durationYears: 2,
    tuitionEurPerYear: 3600,
    entranceExam: true,
    programmeUrl: "https://www.vse.cz/english/admissions/master-programs/",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.vse.cz/english/admissions/master-programs/",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },

  // ─── Charles University ──────────────────────────────────────────────
  {
    id: "cuni-md-general-medicine",
    universityId: "cuni",
    faculty: "First Faculty of Medicine",
    name: { en: "General Medicine", ar: "الطب العام" },
    degree: "Master",
    language: "English",
    field: "Medicine",
    durationYears: 6,
    tuitionEurPerYear: 14700,
    tuitionCzkPerYear: 360000,
    entranceExam: true,
    entranceExamDetails: {
      en: "Written exam: biology, chemistry, physics or mathematics",
      ar: "امتحان كتابي: أحياء، كيمياء، فيزياء أو رياضيات",
    },
    programmeUrl: "https://www.lf1.cuni.cz/general-medicine-in-english",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.lf1.cuni.cz/general-medicine-in-english",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
  {
    id: "cuni-md-dentistry",
    universityId: "cuni",
    faculty: "First Faculty of Medicine",
    name: { en: "Dentistry", ar: "طب الأسنان" },
    degree: "Master",
    language: "English",
    field: "Medicine",
    durationYears: 5,
    tuitionEurPerYear: 14700,
    tuitionCzkPerYear: 360000,
    entranceExam: true,
    entranceExamDetails: {
      en: "Written exam: biology, chemistry, physics or mathematics",
      ar: "امتحان كتابي: أحياء، كيمياء، فيزياء أو رياضيات",
    },
    programmeUrl: "https://www.lf1.cuni.cz/dentistry-in-english",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.lf1.cuni.cz/dentistry-in-english",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
  {
    id: "cuni-ba-economics",
    universityId: "cuni",
    faculty: "Faculty of Social Sciences",
    name: { en: "Economics and Finance", ar: "الاقتصاد والمالية" },
    degree: "Bachelor",
    language: "English",
    field: "Economics",
    durationYears: 3,
    tuitionEurPerYear: 6000,
    entranceExam: true,
    entranceExamDetails: {
      en: "Written exam: mathematics + economics",
      ar: "امتحان كتابي: رياضيات + اقتصاد",
    },
    programmeUrl: "https://fsv.cuni.cz/en/admissions",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://fsv.cuni.cz/en/admissions",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },

  // ─── CTU Prague ──────────────────────────────────────────────────────
  {
    id: "ctu-bsc-civil-engineering",
    universityId: "ctu",
    faculty: "Faculty of Civil Engineering",
    name: { en: "Civil Engineering", ar: "الهندسة المدنية" },
    degree: "Bachelor",
    language: "English",
    field: "Engineering",
    durationYears: 4,
    tuitionEurPerYear: 5000,
    entranceExam: false,
    programmeUrl: "https://www.cvut.cz/en/admissions",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.cvut.cz/en/admissions",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
  {
    id: "ctu-bsc-software-engineering",
    universityId: "ctu",
    faculty: "Faculty of Information Technology",
    name: { en: "Software Engineering", ar: "هندسة البرمجيات" },
    degree: "Bachelor",
    language: "English",
    field: "IT",
    durationYears: 3,
    tuitionEurPerYear: 5000,
    entranceExam: true,
    entranceExamDetails: {
      en: "Written exam: mathematics",
      ar: "امتحان كتابي: رياضيات",
    },
    programmeUrl: "https://fit.cvut.cz/en/study/bachelor-programs",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://fit.cvut.cz/en/study/bachelor-programs",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },

  // ─── CZU Prague ──────────────────────────────────────────────────────
  {
    id: "czu-bsc-economics-management",
    universityId: "czu",
    faculty: "Faculty of Economics and Management",
    name: { en: "Economics and Management", ar: "الاقتصاد والإدارة" },
    degree: "Bachelor",
    language: "English",
    field: "Economics",
    durationYears: 3,
    tuitionEurPerYear: 1500,
    entranceExam: false,
    programmeUrl: "https://www.pef.czu.cz/en/r-9409-study/r-9675-study-programmes",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.pef.czu.cz/en/r-9409-study/r-9675-study-programmes",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
  {
    id: "czu-msc-economics-management",
    universityId: "czu",
    faculty: "Faculty of Economics and Management",
    name: { en: "Economics and Management", ar: "الاقتصاد والإدارة" },
    degree: "Master",
    language: "English",
    field: "Economics",
    durationYears: 2,
    tuitionEurPerYear: 1500,
    entranceExam: false,
    programmeUrl: "https://www.pef.czu.cz/en/r-9409-study/r-9675-study-programmes",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.pef.czu.cz/en/r-9409-study/r-9675-study-programmes",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },

  // ─── Masaryk University ──────────────────────────────────────────────
  {
    id: "muni-md-general-medicine",
    universityId: "muni",
    faculty: "Faculty of Medicine",
    name: { en: "General Medicine", ar: "الطب العام" },
    degree: "Master",
    language: "English",
    field: "Medicine",
    durationYears: 6,
    tuitionEurPerYear: 12500,
    entranceExam: true,
    entranceExamDetails: {
      en: "Written exam: biology, chemistry, physics",
      ar: "امتحان كتابي: أحياء، كيمياء، فيزياء",
    },
    programmeUrl: "https://www.med.muni.cz/en/admission",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.med.muni.cz/en/admission",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
  {
    id: "muni-md-dentistry",
    universityId: "muni",
    faculty: "Faculty of Medicine",
    name: { en: "Dentistry", ar: "طب الأسنان" },
    degree: "Master",
    language: "English",
    field: "Medicine",
    durationYears: 5,
    tuitionEurPerYear: 12500,
    entranceExam: true,
    entranceExamDetails: {
      en: "Written exam: biology, chemistry, physics",
      ar: "امتحان كتابي: أحياء، كيمياء، فيزياء",
    },
    programmeUrl: "https://www.med.muni.cz/en/admission",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.med.muni.cz/en/admission",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
  {
    id: "muni-bsc-international-relations",
    universityId: "muni",
    faculty: "Faculty of Social Studies",
    name: { en: "International Relations", ar: "العلاقات الدولية" },
    degree: "Bachelor",
    language: "English",
    field: "Social Sciences",
    durationYears: 3,
    tuitionEurPerYear: 3000,
    entranceExam: false,
    programmeUrl: "https://www.muni.cz/en/admissions",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.muni.cz/en/admissions",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },

  // ─── BUT Brno ────────────────────────────────────────────────────────
  {
    id: "but-bsc-civil-engineering",
    universityId: "but",
    faculty: "Faculty of Civil Engineering",
    name: { en: "Civil Engineering", ar: "الهندسة المدنية" },
    degree: "Bachelor",
    language: "English",
    field: "Engineering",
    durationYears: 4,
    tuitionEurPerYear: 3000,
    entranceExam: false,
    programmeUrl: "https://www.vutbr.cz/en/admission",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.vutbr.cz/en/admission",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
  {
    id: "but-msc-information-technology",
    universityId: "but",
    faculty: "Faculty of Information Technology",
    name: { en: "Information Technology", ar: "تكنولوجيا المعلومات" },
    degree: "Master",
    language: "English",
    field: "IT",
    durationYears: 2,
    tuitionEurPerYear: 3000,
    entranceExam: true,
    entranceExamDetails: {
      en: "Entrance exam based on bachelor-level IT knowledge",
      ar: "امتحان قبول على مستوى بكالوريوس تكنولوجيا المعلومات",
    },
    programmeUrl: "https://www.fit.vut.cz/study/program/.en",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.fit.vut.cz/study/program/.en",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },

  // ─── Palacký University Olomouc ──────────────────────────────────────
  {
    id: "upol-md-general-medicine",
    universityId: "upol",
    faculty: "Faculty of Medicine and Dentistry",
    name: { en: "General Medicine", ar: "الطب العام" },
    degree: "Master",
    language: "English",
    field: "Medicine",
    durationYears: 6,
    tuitionEurPerYear: 11000,
    entranceExam: true,
    entranceExamDetails: {
      en: "Written exam: biology, chemistry",
      ar: "امتحان كتابي: أحياء، كيمياء",
    },
    programmeUrl: "https://www.lf.upol.cz/en/study/international-students/",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.lf.upol.cz/en/study/international-students/",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },

  // ─── University of Ostrava ───────────────────────────────────────────
  {
    id: "osu-md-general-medicine",
    universityId: "osu",
    faculty: "Faculty of Medicine",
    name: { en: "General Medicine", ar: "الطب العام" },
    degree: "Master",
    language: "English",
    field: "Medicine",
    durationYears: 6,
    tuitionEurPerYear: 13000,
    entranceExam: true,
    entranceExamDetails: {
      en: "Written exam: biology, chemistry, physics",
      ar: "امتحان كتابي: أحياء، كيمياء، فيزياء",
    },
    programmeUrl: "https://www.osu.cz/en/applicants/",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.osu.cz/en/applicants/",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },

  // ─── AAU Prague ──────────────────────────────────────────────────────
  {
    id: "aauni-ba-international-relations",
    universityId: "aauni",
    faculty: "School of International Relations and Diplomacy",
    name: { en: "International Relations", ar: "العلاقات الدولية" },
    degree: "Bachelor",
    language: "English",
    field: "International Relations",
    durationYears: 3,
    tuitionEurPerYear: 5000,
    entranceExam: false,
    programmeUrl: "https://aauni.edu/admissions",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://aauni.edu/admissions",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
  {
    id: "aauni-ba-business-administration",
    universityId: "aauni",
    faculty: "School of Business Administration",
    name: { en: "Business Administration", ar: "إدارة الأعمال" },
    degree: "Bachelor",
    language: "English",
    field: "Business",
    durationYears: 3,
    tuitionEurPerYear: 5000,
    entranceExam: false,
    programmeUrl: "https://aauni.edu/admissions",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://aauni.edu/admissions",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },

  // ─── UCT Prague ──────────────────────────────────────────────────────
  {
    id: "uct-bsc-chemistry",
    universityId: "uct",
    faculty: "Faculty of Chemical Technology",
    name: { en: "Chemistry and Chemical Technologies", ar: "الكيمياء والتقنيات الكيميائية" },
    degree: "Bachelor",
    language: "English",
    field: "Chemistry",
    durationYears: 3,
    tuitionEurPerYear: 2500,
    entranceExam: false,
    programmeUrl: "https://www.vscht.cz/EN/study/programs",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.vscht.cz/EN/study/programs",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },

  // ─── VSB-TU Ostrava ──────────────────────────────────────────────────
  {
    id: "vsb-bsc-it",
    universityId: "vsb",
    faculty: "Faculty of Electrical Engineering and Computer Science",
    name: { en: "Computer Science", ar: "علوم الحاسب" },
    degree: "Bachelor",
    language: "English",
    field: "IT",
    durationYears: 3,
    tuitionEurPerYear: 3500,
    entranceExam: false,
    programmeUrl: "https://www.vsb.cz/en/study/study-programmes/",
    verification: {
      lastVerified: "2026-08-27",
      sourceUrl: "https://www.vsb.cz/en/study/study-programmes/",
      sourceType: "official",
      verifiedBy: "studyczechia",
    },
  },
];

// ── Helper functions ────────────────────────────────────────────────────────

export function getProgrammesByUniversity(universityId: string): Programme[] {
  return programmes.filter((p) => p.universityId === universityId);
}

export function getDeadlineStatus(prog: Programme): DeadlineStatus {
  if (prog.deadlineType === "rolling") return "rolling";
  if (!prog.applicationDeadline) return "not-published";
  const d = new Date(prog.applicationDeadline);
  const now = new Date();
  if (d.getTime() < now.getTime()) return "passed";
  return "verified";
}

export function getUpcomingDeadlines(): (Programme & { university?: string })[] {
  const now = new Date();
  return programmes
    .filter((p) => {
      if (!p.applicationDeadline) return false;
      const d = new Date(p.applicationDeadline);
      return d.getTime() > now.getTime();
    })
    .sort((a, b) => new Date(a.applicationDeadline!).getTime() - new Date(b.applicationDeadline!).getTime());
}

export function getAllProgrammesWithStatus(): (Programme & { deadlineStatusComputed: DeadlineStatus })[] {
  return programmes.map((p) => ({
    ...p,
    deadlineStatusComputed: getDeadlineStatus(p),
  }));
}

export type ProgrammeFilterOpts = {
  field?: string;
  degree?: string;
  language?: string;
  city?: string;
  maxTuition?: number;
  entranceExam?: boolean;
  universityId?: string;
  universityIds?: string[];
  universityType?: "public" | "private";
  deadlineStatus?: DeadlineStatus;
  search?: string;
};

export type UniLookupEntry = { id: string; city: string; type?: string; name?: string };

export function filterProgrammes(
  opts: ProgrammeFilterOpts,
  uniLookup?: UniLookupEntry[]
): Programme[] {
  const searchTerm = opts.search?.trim().toLowerCase();

  return programmes.filter((p) => {
    if (opts.field && p.field !== opts.field && p.subfield !== opts.field) return false;
    if (opts.degree && p.degree !== opts.degree) return false;
    if (opts.language && p.language !== opts.language) return false;
    if (opts.maxTuition !== undefined && p.tuitionEurPerYear > opts.maxTuition) return false;
    if (opts.entranceExam !== undefined && p.entranceExam !== opts.entranceExam) return false;
    if (opts.universityId && p.universityId !== opts.universityId) return false;
    if (opts.universityIds && !opts.universityIds.includes(p.universityId)) return false;

    if (uniLookup) {
      const uni = uniLookup.find((u) => u.id === p.universityId);
      if (opts.city && uni && uni.city !== opts.city) return false;
      if (opts.universityType && uni && uni.type !== opts.universityType) return false;
    }

    if (opts.deadlineStatus) {
      const status = getDeadlineStatus(p);
      if (status !== opts.deadlineStatus) return false;
    }

    if (searchTerm) {
      const uni = uniLookup?.find((u) => u.id === p.universityId);
      const hay = [
        p.name.en,
        p.name.ar,
        p.field,
        p.subfield,
        p.faculty,
        p.degree,
        uni?.name,
        uni?.city,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!hay.includes(searchTerm)) return false;
    }

    return true;
  });
}

export function getProgrammeById(id: string): Programme | undefined {
  return programmes.find((p) => p.id === id);
}

export const PROGRAMME_FIELDS = [
  "Medicine",
  "Business",
  "Economics",
  "Finance",
  "Engineering",
  "IT",
  "Chemistry",
  "Social Sciences",
  "International Relations",
  "Law",
  "Architecture",
  "Sciences",
  "Agriculture",
  "Education",
  "Design",
  "Humanities",
  "Art",
] as const;
