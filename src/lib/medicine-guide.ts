import { programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme } from "@/data/types";

const FACULTY_AR: Record<string, string> = {
  "First Faculty of Medicine": "كلية الطب الأولى",
  "Second Faculty of Medicine": "كلية الطب الثانية",
  "Faculty of Medicine": "كلية الطب",
  "Faculty of Medicine and Dentistry": "كلية الطب وطب الأسنان",
};

export type MedicineRow = {
  programme: Programme;
  /** "First Faculty of Medicine, Charles University" or the university alone. */
  where: { en: string; ar: string };
  city: string;
};

export type ExamSubjects = { withSubjects: number; biology: number; chemistry: number; physics: number };

/** The two degrees the guide covers. Pharmacy is also filed under "Medicine" but has its own fees and exam. */
export const MEDICAL_DEGREES = ["General Medicine", "Dentistry"];

/** English-taught General Medicine and Dentistry programmes, cheapest first. */
export function medicineRows(): MedicineRow[] {
  return programmes
    .filter((p) => p.field === "Medicine" && p.language === "English" && MEDICAL_DEGREES.includes(p.name.en))
    .map((p) => {
      const uni = universitiesV2.find((u) => u.id === p.universityId);
      const uniEn = uni?.name ?? "";
      const uniAr = (uni?.nameAr ?? uniEn).split(" (")[0];
      return {
        programme: p,
        where: {
          en: p.faculty ? `${p.faculty}, ${uniEn}` : uniEn,
          ar: p.faculty ? `${FACULTY_AR[p.faculty] ?? p.faculty}، ${uniAr}` : uniAr,
        },
        city: uni?.city ?? "",
      };
    })
    .sort((a, b) => a.programme.tuitionEurPerYear - b.programme.tuitionEurPerYear);
}

/** Yearly tuition range for one programme name, e.g. "General Medicine". */
export function feeRange(rows: MedicineRow[], nameEn: string): { min: number; max: number; years: number } | null {
  const own = rows.filter((r) => r.programme.name.en === nameEn).map((r) => r.programme);
  if (own.length === 0) return null;
  const fees = own.map((p) => p.tuitionEurPerYear);
  return { min: Math.min(...fees), max: Math.max(...fees), years: own[0].durationYears };
}

const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
};

/** Western digits; the currency goes after the number in Arabic, as elsewhere on the site. */
export function formatMoney(amount: number, currency: "EUR" | "CZK", locale: "en" | "ar"): string {
  const n = amount.toLocaleString("en-US");
  if (currency === "EUR") return locale === "ar" ? `${n}€` : `€${n}`;
  return locale === "ar" ? `${n} كرونة` : `${n} CZK`;
}

/** "1 November 2026" / "1 نوفمبر 2026" from an ISO date. */
export function formatDate(iso: string, locale: "en" | "ar"): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[locale][m - 1]} ${y}`;
}

/** How many programmes with published exam subjects test each science. */
export function examSubjects(rows: MedicineRow[]): ExamSubjects {
  const details = rows.map((r) => r.programme.entranceExamDetails?.en.toLowerCase()).filter((d): d is string => !!d);
  const count = (word: string) => details.filter((d) => d.includes(word)).length;
  return { withSubjects: details.length, biology: count("biology"), chemistry: count("chemistry"), physics: count("physics") };
}
