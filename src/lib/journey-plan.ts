// "Your next step" on My Journey, computed from what the visitor has saved.
// Pure functions, so they can be tested without a browser. The rules are in
// docs/JOURNEY.md, 2.6: the first rule that matches wins, and each step has a
// free "do it yourself" path and, where it fits, one service to do it with John.
import type { StageSlug } from "@/data/stages";
import type { HelpService } from "@/data/help-services";
import type { Programme } from "@/data/types";
import { getDeadlineStatus } from "@/data/programmes";
import { scoreForm, topRisks, en as eligEn, ar as eligAr, initial, type FormData } from "@/app/eligibility/eligibility-logic";
import type { JourneyData } from "./journey-store";

type Locale = "en" | "ar";

export const STAGE_LABELS: Record<StageSlug, { en: string; ar: string }> = {
  considering: { en: "Thinking about it", ar: "لسه بفكر" },
  choosing: { en: "Choosing programmes", ar: "باختار البرامج" },
  documents: { en: "Preparing documents", ar: "بجهز الأوراق" },
  visa: { en: "Visa and interview", ar: "الفيزا والمقابلة" },
  arrived: { en: "Arrived in Czechia", ar: "وصلت التشيك" },
};

export type NextStep = {
  id: "arrived" | "visa" | "deadline" | "eligibility" | "risk" | "programmes" | "keepGoing";
  title: string;
  diy?: { href: string; label: string };
  /** Shown as a quiet link to the course page (a companion, not John's hours). */
  extra?: { href: string; label: string };
  john?: HelpService;
};

const URGENT_DAYS = 56; // 8 weeks

export function eligibilityForm(journey: JourneyData | null): FormData | null {
  const answers = journey?.eligibility?.answers;
  return answers ? { ...initial, ...answers } : null;
}

export function daysUntil(date: string | undefined, now: number): number | null {
  if (!date) return null;
  return Math.ceil((new Date(date).getTime() - now) / 86_400_000);
}

export function nextStep(
  journey: JourneyData | null,
  locale: Locale,
  getProgramme: (id: string) => Programme | undefined,
  now: number
): NextStep {
  const ar = locale === "ar";
  const stage = journey?.stage;

  if (stage === "arrived") {
    return {
      id: "arrived",
      title: ar ? "أول أسبوعين ليك" : "Your first two weeks",
      diy: { href: "/arrival", label: ar ? "دليل الوصول المجاني" : "The free arrival guide" },
      extra: { href: "/courses", label: ar ? "كورس أول 90 يوم في التشيك" : "The First 90 Days course" },
      john: "arrivalSupport",
    };
  }
  if (stage === "visa") {
    return {
      id: "visa",
      title: ar ? "جهّز نفسك لمقابلة السفارة" : "Get ready for the embassy interview",
      diy: { href: "/interview-prep", label: ar ? "تجهيز المقابلة" : "Interview preparation" },
      extra: { href: "/courses", label: ar ? "كورس أول 90 يوم في التشيك" : "The First 90 Days course" },
      john: "interviewPrep",
    };
  }

  const saved = journey?.savedProgrammes ?? [];
  const urgent = saved
    .map((s) => {
      const p = getProgramme(s.programmeId);
      if (!p || getDeadlineStatus(p) !== "verified") return null;
      const days = daysUntil(p.applicationDeadline, now);
      const open = s.checklist.some((c) => !c.done);
      return days !== null && days >= 0 && days < URGENT_DAYS && open ? { p, days } : null;
    })
    .filter((x): x is { p: Programme; days: number } => x !== null)
    .sort((a, b) => a.days - b.days)[0];
  if (urgent) {
    const name = urgent.p.name[locale] || urgent.p.name.en;
    return {
      id: "deadline",
      title: ar ? `${name}: فاضل ${urgent.days} يوم على آخر ميعاد` : `${name}: ${urgent.days} days to the deadline`,
      diy: { href: "/application-guide", label: ar ? "دليل التقديم" : "The application guide" },
      john: "documentReview",
    };
  }

  const form = eligibilityForm(journey);
  if (!form) {
    return {
      id: "eligibility",
      title: ar ? "شوف وضعك، هياخد دقيقتين." : "Check where you stand. It takes 2 minutes.",
      diy: { href: "/eligibility", label: ar ? "اختبار الأهلية" : "The eligibility check" },
    };
  }

  const risk = topRisks(scoreForm(form).categories)[0];
  if (risk) {
    const copy = ar ? eligAr : eligEn;
    const info = copy.resultCategories[risk.key as keyof typeof copy.resultCategories];
    const advice = info.advice[risk.status];
    return {
      id: "risk",
      title: ar ? `اشتغل على: ${info.title}` : `Work on: ${info.title}`,
      diy: advice ? { href: advice.freeLink, label: advice.freeLabel } : undefined,
      john: risk.service,
    };
  }

  if (saved.length === 0) {
    return {
      id: "programmes",
      title: ar ? "لاقي البرامج اللي تناسبك" : "Find programmes that fit you",
      diy: { href: "/university-matcher", label: ar ? "مطابق البرامج" : "The programme matcher" },
      john: "consultation",
    };
  }

  return {
    id: "keepGoing",
    title: ar ? "كمّل في قوائمك" : "Keep going through your checklists",
  };
}

/** The "Send my plan to John" message: stage, readiness, risks, programmes. No personal data. */
export function journeySummary(
  journey: JourneyData | null,
  locale: Locale,
  getProgramme: (id: string) => Programme | undefined
): string {
  const ar = locale === "ar";
  const parts: string[] = [ar ? "أهلًا جون، دي خطتي من رحلتي على الموقع." : "Hi John, here's my plan from My Journey."];
  if (journey?.stage) parts.push(`${ar ? "المرحلة" : "Stage"}: ${STAGE_LABELS[journey.stage][locale]}.`);
  const form = eligibilityForm(journey);
  if (form) {
    const { categories, pct } = scoreForm(form);
    const copy = ar ? eligAr : eligEn;
    const risks = topRisks(categories)
      .map((r) => copy.resultCategories[r.key as keyof typeof copy.resultCategories].title)
      .join(ar ? "، " : ", ");
    parts.push(`${ar ? "الجاهزية" : "Readiness"}: ${pct}%${risks ? (ar ? `، محتاج أشتغل على: ${risks}` : `; to work on: ${risks}`) : ""}.`);
  }
  const progs = (journey?.savedProgrammes ?? [])
    .map((s) => getProgramme(s.programmeId))
    .filter((p): p is Programme => !!p)
    .slice(0, 5)
    .map((p) => {
      const name = p.name[locale] || p.name.en;
      return getDeadlineStatus(p) === "verified" && p.applicationDeadline ? `${name} (${p.applicationDeadline})` : name;
    });
  if (progs.length) parts.push(`${ar ? "البرامج" : "Programmes"}: ${progs.join(ar ? "، " : ", ")}.`);
  parts.push(ar ? "ممكن تساعدني في الخطوة الجاية؟" : "Can you help me with the next step?");
  return parts.join(" ");
}
