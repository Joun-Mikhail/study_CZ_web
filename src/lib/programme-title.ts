import { programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { DEGREE_VALUE_AR } from "@/i18n/ar-metadata";
import type { Programme } from "@/data/types";

const FACULTY_AR: Record<string, string> = {
  "First Faculty of Medicine": "كلية الطب الأولى",
  "Second Faculty of Medicine": "كلية الطب الثانية",
};
// Roughly what Google shows before cutting a title off.
const MAX = { en: 65, ar: 70 } as const;
const BRAND = " | Study Czechia";

/**
 * Page title for a programme, e.g. "Finance (Bachelor), Mendel University in Brno | Study Czechia".
 * The degree keeps Bachelor and Master pages apart; the faculty is added when two programmes at
 * the same university share name and degree (Charles University's two medical faculties). To fit
 * search results it drops the brand, then falls back to the university's short name (VUT Brno, VŠE).
 */
export function programmeTitle(p: Programme, locale: "en" | "ar"): string {
  const uni = universitiesV2.find((u) => u.id === p.universityId);
  const name = p.name[locale] || p.name.en;
  const degree = locale === "ar" ? DEGREE_VALUE_AR[p.degree] ?? p.degree : p.degree;
  const sep = locale === "ar" ? "، " : ", ";
  const full = (locale === "ar" && uni?.nameAr) || uni?.name || "";
  const plain = full.split(" (")[0];
  const short = uni?.searchName ?? uni?.name.match(/\(([^)]+)\)$/)?.[1]?.split(" / ")[0];
  const clash =
    !!p.faculty &&
    programmes.some((o) => o.id !== p.id && o.universityId === p.universityId && o.degree === p.degree && o.name.en === p.name.en);
  const faculty = clash && p.faculty ? (locale === "ar" ? FACULTY_AR[p.faculty] ?? p.faculty : p.faculty) : null;
  const head = `${name} (${degree})`;
  const options = [...new Set([full, plain, short].filter((u): u is string => !!u))].map((u) =>
    faculty ? `${head}${sep}${faculty}${sep}${u}` : `${head}${sep}${u}`
  );
  for (const o of options) if ((o + BRAND).length <= MAX[locale]) return o + BRAND;
  // Nothing fits: use the shortest, keeping the full name on a tie.
  return options.find((o) => o.length <= MAX[locale]) ?? options.reduce((a, b) => (b.length < a.length ? b : a));
}
