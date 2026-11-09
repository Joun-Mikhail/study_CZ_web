import type { CityKey } from "@/data/costs";
import { DORM_PRICES, NIGHTS_PER_MONTH } from "@/data/dorm-prices";

/**
 * City-level prices for the student-month simulator. Every figure comes from
 * the body that sets or measures it, with the date we checked it:
 *
 * - student transport passes and university dorm beds: the operator's price list;
 * - university canteen lunches: the university's own menu or notice;
 * - the phone plan: the operator's price list;
 * - private flat rent: the Ministry of Finance rent map (cenová mapa nájemného);
 * - utilities in a rented flat: the Czech Statistical Office household budget survey.
 *
 * Health insurance is the one figure without an official price (see below).
 */

export const CITY_COSTS_CHECKED_ON = "2026-11-08";

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

/** Student price of a hot lunch at a university canteen (menza), CZK. A student card is needed; guests pay more. */
export const CANTEEN_MEAL: Record<CityKey, Sourced<{ mealCzk: number; operator: { en: string; ar: string }; note: { en: string; ar: string } }>> = {
  prague: {
    mealCzk: 88,
    operator: { en: "Charles University canteens", ar: "مطاعم جامعة تشارلز" },
    note: {
      en: "Cheapest student main dish on the menu for 9 November 2026; the others cost up to 105 Kč. Soup is extra.",
      ar: "أرخص طبق رئيسي للطلاب في قائمة 9 نوفمبر 2026، والباقي حتى 105 كرونات. الشوربة بسعر إضافي.",
    },
    url: "https://kam-septim-fe.is.cuni.cz/menu?canteen=1&date=2026-11-09&view=day",
    checkedOn: CITY_COSTS_CHECKED_ON,
  },
  brno: {
    mealCzk: 85,
    operator: { en: "Masaryk University canteens", ar: "مطاعم جامعة ماساريك" },
    note: {
      en: "The student menu price, unchanged from the spring 2026 semester. Soup is sold separately.",
      ar: "سعر وجبة الطلاب، بدون تغيير منذ فصل ربيع 2026. الشوربة تُباع منفصلة.",
    },
    url: "https://www.skm.muni.cz/en/news/changes-to-the-student-dining-offer",
    checkedOn: CITY_COSTS_CHECKED_ON,
  },
  ostrava: {
    mealCzk: 40,
    operator: { en: "VŠB – Technical University of Ostrava canteen", ar: "مطعم جامعة أوسترافا التقنية (VŠB)" },
    note: {
      en: "VŠB's own page says “approximately 40 CZK” and gives no date; current prices are shown only after logging in, so expect more.",
      ar: "صفحة الجامعة نفسها تقول «حوالي 40 كرونة» بدون تاريخ، والأسعار الحالية تظهر بعد تسجيل الدخول بس، فتوقّع أكتر.",
    },
    url: "https://www.vsb.cz/en/study/study-at-vsb-tuo/catering",
    checkedOn: CITY_COSTS_CHECKED_ON,
  },
};

/** A prepaid mobile plan from the operator's own price list (PDF dated 29 April 2026). The same price applies everywhere in Czechia. */
export const PHONE_PLAN: Sourced<{ monthlyCzk: number; operator: string; plan: string; includes: { en: string; ar: string } }> = {
  monthlyCzk: 350,
  operator: "Kaktus (T-Mobile)",
  plan: "NEŘEŠTO za 350",
  includes: { en: "10 GB, then unlimited at 2 Mb/s; 100 minutes or texts", ar: "10 جيجا ثم غير محدود بسرعة 2 ميجابت؛ 100 دقيقة أو رسالة" },
  url: "https://www.mujkaktus.cz/cenik",
  checkedOn: CITY_COSTS_CHECKED_ON,
};

/**
 * Private rent from the Ministry of Finance rent map (cenová mapa nájemného,
 * Act 151/1997 and Decree 456/2024), August 2026 release, built on offers up to
 * 30 June 2026. Figures are CZK per m² a month for the "reference flat" of size
 * category 1 (1+kk or 1+1): unfurnished, older than five years, rent only,
 * without energy or water. The map adds 30 Kč/m² for a furnished flat, and gives
 * the median size of a rented 1+kk/1+1 in each region.
 *
 * "Centre" is the historic-centre cadastral area. "Outside centre" is the median
 * of the reference rents of all the city's cadastral areas.
 */
export const RENT_MAP = {
  url: "https://mf.gov.cz/assets/attachments/2026-08-15_Cenova-mapa.xlsx",
  page: "https://mf.gov.cz/cenova-mapa-najemneho",
  release: { en: "August 2026", ar: "أغسطس 2026" },
  furnishedPerM2: 30,
  checkedOn: CITY_COSTS_CHECKED_ON,
  cities: {
    prague: { sizeM2: 35, centre: { area: "Nové Město", perM2: 496 }, outside: { perM2: 424, areas: 112, lowest: 314, highest: 624 } },
    brno: { sizeM2: 34, centre: { area: "Město Brno", perM2: 402 }, outside: { perM2: 368.5, areas: 48, lowest: 296, highest: 425 } },
    ostrava: { sizeM2: 36, centre: { area: "Moravská Ostrava", perM2: 245 }, outside: { perM2: 224, areas: 39, lowest: 176, highest: 287 } },
  } satisfies Record<CityKey, { sizeM2: number; centre: { area: string; perM2: number }; outside: { perM2: number; areas: number; lowest: number; highest: number } }>,
};

/** Monthly rent for a furnished one-room flat (1+kk or 1+1) of the region's median size. */
export function flatRent(city: CityKey, where: "centre" | "outside", perM2 = RENT_MAP.cities[city][where].perM2): number {
  const c = RENT_MAP.cities[city];
  return Math.round((perM2 + RENT_MAP.furnishedPerM2) * c.sizeM2);
}

/**
 * Energy, water and other housing services per person in a rented flat, from
 * the Czech Statistical Office's household budget survey for 2024 (published
 * 29 August 2025), table 2, "pronajatý" column: 04.5 electricity, gas and other
 * fuels plus 04.4 water and other services. A national average, not a bill.
 */
export const RENTED_FLAT_UTILITIES = {
  energyYearCzk: 15955,
  waterServicesYearCzk: 2341,
  year: 2024,
  url: "https://csu.gov.cz/docs/107508/b82bf8e4-01a0-8649-8adb-f1c514269ff3/16006625.pdf?version=1.1",
  checkedOn: CITY_COSTS_CHECKED_ON,
};

export const rentedFlatUtilitiesMonthly = () =>
  Math.round((RENTED_FLAT_UTILITIES.energyYearCzk + RENTED_FLAT_UTILITIES.waterServicesYearCzk) / 12);

/**
 * Health insurance: non-EU students need private comprehensive insurance; the
 * price depends on age, insurer and cover. This is the same community-reported
 * range the site has always used (src/data/costs.ts), not a quote.
 */
export const INSURANCE_MONTHLY_CZK: [number, number] = [1100, 1600];
