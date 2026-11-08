import type { CityKey } from "@/data/costs";
import { DORM_PRICES, NIGHTS_PER_MONTH } from "@/data/dorm-prices";

/**
 * City-level prices for the student-month simulator. Two kinds, never mixed:
 *
 * 1. Official prices: student transport passes and university dorm beds,
 *    from the operator's own price list, with the date we checked it.
 * 2. Crowd-sourced estimates from Numbeo (numbeo.com): averages of prices
 *    that visitors report. They are city-wide guides, not offers you can buy.
 *    Numbeo limits automated access, so these figures were read from its
 *    public city pages as listed in search results on NUMBEO_READ_ON; each
 *    city keeps the month Numbeo's page showed.
 */

export const CITY_COSTS_CHECKED_ON = "2026-11-08";
export const NUMBEO_READ_ON = "2026-11-08";

export type Sourced<T> = T & { url: string; checkedOn: string };

/** Student (age 15/18 to 26, full-time study) public transport passes, CZK. */
export const STUDENT_TRANSPORT: Record<CityKey, Sourced<{ monthlyCzk: number; yearlyCzk: number; operator: string; note?: { en: string; ar: string } }>> = {
  prague: {
    monthlyCzk: 130,
    yearlyCzk: 1280,
    operator: "PID (Pražská integrovaná doprava)",
    note: { en: "Students 18 to 26 in full-time study, with proof of study.", ar: "للطلاب من 18 لـ 26 سنة في الدراسة بدوام كامل، مع إثبات الدراسة." },
    url: "https://pid.cz/jizdne-a-tarif/",
    checkedOn: CITY_COSTS_CHECKED_ON,
  },
  brno: {
    monthlyCzk: 275,
    yearlyCzk: 2375,
    operator: "DPMB (šalinkarta, zones 100 + 101)",
    note: { en: "Students 15 to 26.", ar: "للطلاب من 15 لـ 26 سنة." },
    url: "https://www.dpmb.cz/predplatni-jizdenka-salinkarta",
    checkedOn: CITY_COSTS_CHECKED_ON,
  },
  ostrava: {
    monthlyCzk: 275,
    yearlyCzk: 1600,
    operator: "ODIS (30-day pass, whole city of Ostrava)",
    note: {
      en: "Students 15 to 26. 275 Kč in the e-shop, 325 Kč at a ticket office.",
      ar: "للطلاب من 15 لـ 26 سنة. 275 كرونة من المتجر الإلكتروني و325 من شباك التذاكر.",
    },
    url: "https://www.odis.cz/jizdenky-pro-studenty-od-15-do-26-let",
    checkedOn: CITY_COSTS_CHECKED_ON,
  },
};

/** Ostrava is not in src/data/dorm-prices.ts yet; VŠB-TUO's list, in CZK per bed per night incl. VAT, basic rate at full occupancy. */
export const OSTRAVA_DORM = {
  university: { en: "VŠB – Technical University of Ostrava", ar: "جامعة أوسترافا التقنية (VŠB)" },
  double: [120, 175] as [number, number],
  single: [180, 250] as [number, number],
  validFrom: "2026-07-01",
  includes: {
    en: "The list says the price includes the furnished room, common areas, accommodation services and internet.",
    ar: "القائمة بتقول إن السعر شامل الأوضة بالعفش والأماكن المشتركة وخدمات السكن والإنترنت.",
  },
  url: "https://www.vsb.cz/ubytovani/en/student/pricelist/long-termaccommodation/",
  checkedOn: CITY_COSTS_CHECKED_ON,
};

type DormRange = { double: [number, number]; single: [number, number]; sources: { name: { en: string; ar: string }; url: string }[] };

const DORM_CITY: Record<string, CityKey> = { Prague: "prague", Brno: "brno" };

/** Lowest and highest nightly bed price per city across the official lists. */
export function dormNightly(): Record<CityKey, DormRange> {
  const out: Record<CityKey, DormRange> = {
    prague: { double: [Infinity, 0], single: [Infinity, 0], sources: [] },
    brno: { double: [Infinity, 0], single: [Infinity, 0], sources: [] },
    ostrava: { double: OSTRAVA_DORM.double, single: OSTRAVA_DORM.single, sources: [{ name: OSTRAVA_DORM.university, url: OSTRAVA_DORM.url }] },
  };
  for (const list of DORM_PRICES) {
    const city = DORM_CITY[list.city.en];
    if (!city) continue;
    const r = out[city];
    r.double = [Math.min(r.double[0], list.double[0]), Math.max(r.double[1], list.double[1])];
    if (list.single) r.single = [Math.min(r.single[0], list.single[0]), Math.max(r.single[1], list.single[1])];
    r.sources.push({ name: list.university, url: list.sourceUrl });
  }
  return out;
}

export const DORM_NIGHTS_PER_MONTH = NIGHTS_PER_MONTH;

export type NumbeoItem = "mealInexpensive" | "cappuccino" | "fitness" | "cinema" | "rentCentre" | "rentOutside" | "utilities85" | "mobilePlan" | "internet";

export type NumbeoCity = {
  /** Month the Numbeo page was titled with when read. */
  pageMonth: string;
  url: string;
  /** Average and, where Numbeo showed one, its range. Missing items are null. */
  items: Record<NumbeoItem, { avg: number; range?: [number, number] } | null>;
};

export const NUMBEO: Record<CityKey, NumbeoCity> = {
  prague: {
    pageMonth: "November 2026",
    url: "https://www.numbeo.com/cost-of-living/in/Prague",
    items: {
      mealInexpensive: { avg: 246.69, range: [180, 380] },
      cappuccino: { avg: 79.3, range: [50, 90] },
      fitness: { avg: 1490, range: [1000, 2490] },
      cinema: { avg: 290, range: [240, 350] },
      rentCentre: { avg: 26100, range: [18000, 36900] },
      rentOutside: { avg: 21187.29, range: [17000, 27000] },
      utilities85: { avg: 6178.04 },
      mobilePlan: { avg: 504.89 },
      internet: null,
    },
  },
  brno: {
    pageMonth: "September 2026",
    url: "https://www.numbeo.com/cost-of-living/in/Brno",
    items: {
      mealInexpensive: { avg: 200, range: [180, 300] },
      cappuccino: { avg: 76, range: [60, 90] },
      fitness: { avg: 1185, range: [400, 1590] },
      cinema: { avg: 280, range: [250, 309] },
      rentCentre: { avg: 21326.67, range: [18000, 25000] },
      rentOutside: { avg: 17400 },
      utilities85: { avg: 6445, range: [5500, 8500] },
      mobilePlan: { avg: 496, range: [300, 750] },
      internet: { avg: 413, range: [300, 500] },
    },
  },
  ostrava: {
    pageMonth: "July 2026",
    url: "https://www.numbeo.com/cost-of-living/in/Ostrava",
    items: {
      mealInexpensive: { avg: 230, range: [160, 260] },
      cappuccino: { avg: 69.11, range: [50, 85] },
      fitness: { avg: 1198, range: [800, 1600] },
      cinema: { avg: 200, range: [173, 240] },
      rentCentre: { avg: 15033 },
      rentOutside: { avg: 11414 },
      utilities85: null,
      mobilePlan: null,
      internet: null,
    },
  },
};

/**
 * Where a city has no Numbeo figure, the simulator borrows another city's and
 * says so. Mobile and internet tariffs are sold nationally, so Brno's figure
 * is a fair stand-in; utilities depend on the flat, so the borrowed figure is
 * flagged as a rough guide.
 */
export const NUMBEO_FALLBACK: Partial<Record<CityKey, Partial<Record<NumbeoItem, CityKey>>>> = {
  prague: { internet: "brno" },
  ostrava: { utilities85: "brno", mobilePlan: "brno", internet: "brno" },
};

export function numbeoValue(city: CityKey, item: NumbeoItem): { avg: number; range?: [number, number]; from: CityKey } | null {
  const own = NUMBEO[city].items[item];
  if (own) return { ...own, from: city };
  const alt = NUMBEO_FALLBACK[city]?.[item];
  const borrowed = alt ? NUMBEO[alt].items[item] : null;
  return borrowed && alt ? { ...borrowed, from: alt } : null;
}

/**
 * Health insurance: non-EU students need private comprehensive insurance; the
 * price depends on age, insurer and cover. This is the same community-reported
 * range the site has always used (src/data/costs.ts), not a quote.
 */
export const INSURANCE_MONTHLY_CZK: [number, number] = [1100, 1600];
