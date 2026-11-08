/**
 * Prices a student month in Prague, Brno or Ostrava from sourced data:
 * official dorm price lists, official student transport fares, a Rohlik.cz
 * grocery basket, university canteen prices and an operator's phone tariff.
 * Health insurance is the one line without an official price (see
 * src/data/living/insurance.ts), and each line says whether it is official.
 */
import type { CityKey } from "@/data/costs";
import { DORM_PRICES, NIGHTS_PER_MONTH } from "@/data/dorm-prices";
import { CANTEENS } from "@/data/living/canteens";
import { FOOD_BASKET, HOUSEHOLD_BASKET, ROHLIK_CHECKED_ON, basketCzk } from "@/data/living/groceries";
import { HEALTH_INSURANCE } from "@/data/living/insurance";
import { PHONE_PLANS, PHONE_SOURCE } from "@/data/living/phone";
import { STUDENT_TRANSPORT } from "@/data/living/transport";

export type LifestyleOptions = {
  /** A bed in a shared (double) room, or a single room. */
  room: "shared" | "single";
  /** The cheapest bed in the city's dorm lists, or the middle of their range. */
  roomRate: "lowest" | "typical";
  /** A 12-month pass spread over the months, or one 30-day pass at a time. */
  transport: "longPass" | "month";
  /** Low or high end of the reported insurance range. */
  insurance: "low" | "high";
  phone: keyof typeof PHONE_PLANS;
  /** Canteen lunches a month, on top of cooking the full grocery basket. */
  canteenLunches: number;
};

export const LIFESTYLE_PRESETS = {
  budget: {
    room: "shared",
    roomRate: "lowest",
    transport: "longPass",
    insurance: "low",
    phone: "basic",
    canteenLunches: 0,
  },
  balanced: {
    room: "shared",
    roomRate: "typical",
    transport: "month",
    insurance: "high",
    phone: "more",
    canteenLunches: 10,
  },
} satisfies Record<string, LifestyleOptions>;

export type LifestyleKey = keyof typeof LIFESTYLE_PRESETS;

export type LineKey = "housing" | "food" | "canteen" | "transport" | "insurance" | "phone" | "household";

export type LineSource = { name: { en: string; ar: string }; url: string; checkedOn: string };

export type LivingLine = {
  key: LineKey;
  czk: number;
  /** False only for the reported insurance range. */
  official: boolean;
  sources: LineSource[];
  detail: {
    nightly?: number;
    nights?: number;
    meals?: number;
    perMeal?: number;
    passCzk?: number;
    passMonths?: number;
    plan?: string;
    items?: number;
  };
};

export type StudentMonth = { city: CityKey; lines: LivingLine[]; totalCzk: number };

const ROHLIK = { en: "Rohlik.cz prices", ar: "أسعار Rohlik.cz" };

/** Nightly price of a bed in the city's university dorms, per the options. */
export function dormNightly(city: CityKey, room: LifestyleOptions["room"], rate: LifestyleOptions["roomRate"]) {
  const lists = DORM_PRICES.filter((d) => d.cityKey === city && (room === "shared" || d.single));
  if (lists.length === 0) throw new Error(`No ${room} dorm prices for ${city}`);
  const ranges = lists.map((d) => (room === "shared" ? d.double : d.single!));
  const low = Math.min(...ranges.map((r) => r[0]));
  const high = Math.max(...ranges.map((r) => r[1]));
  return { nightly: rate === "lowest" ? low : (low + high) / 2, lists };
}

export function studentMonth(city: CityKey, options: LifestyleOptions): StudentMonth {
  const { nightly, lists } = dormNightly(city, options.room, options.roomRate);
  const pass = STUDENT_TRANSPORT[city];
  const canteen = CANTEENS[city];
  const plan = PHONE_PLANS[options.phone];
  const [insLow, insHigh] = HEALTH_INSURANCE.reportedMonthCzk;

  const lines: LivingLine[] = [
    {
      key: "housing",
      czk: Math.round(nightly * NIGHTS_PER_MONTH),
      official: true,
      sources: lists.map((d) => ({ name: d.university, url: d.sourceUrl, checkedOn: d.checkedOn })),
      detail: { nightly, nights: NIGHTS_PER_MONTH },
    },
    {
      key: "food",
      czk: Math.round(basketCzk(FOOD_BASKET)),
      official: true,
      sources: [{ name: ROHLIK, url: "https://www.rohlik.cz/", checkedOn: ROHLIK_CHECKED_ON }],
      detail: { items: FOOD_BASKET.length },
    },
    {
      key: "canteen",
      czk: Math.round(canteen.mealCzk * options.canteenLunches),
      official: true,
      sources: [{ name: canteen.operator, url: canteen.sourceUrl, checkedOn: canteen.checkedOn }],
      detail: { meals: options.canteenLunches, perMeal: canteen.mealCzk },
    },
    {
      key: "transport",
      czk: Math.round(options.transport === "month" ? pass.monthCzk : pass.longPass.czk / pass.longPass.months),
      official: true,
      sources: [{ name: { en: pass.network, ar: pass.network }, url: pass.sourceUrl, checkedOn: pass.checkedOn }],
      detail:
        options.transport === "month"
          ? { passCzk: pass.monthCzk, passMonths: 1 }
          : { passCzk: pass.longPass.czk, passMonths: pass.longPass.months },
    },
    {
      key: "insurance",
      czk: options.insurance === "low" ? insLow : insHigh,
      official: HEALTH_INSURANCE.official,
      sources: [{ name: { en: "PVZP (quote)", ar: "PVZP (عرض سعر)" }, url: HEALTH_INSURANCE.quoteUrl, checkedOn: HEALTH_INSURANCE.checkedOn }],
      detail: {},
    },
    {
      key: "phone",
      czk: plan.monthCzk,
      official: true,
      sources: [{ name: { en: PHONE_SOURCE.operator, ar: PHONE_SOURCE.operator }, url: PHONE_SOURCE.sourceUrl, checkedOn: PHONE_SOURCE.checkedOn }],
      detail: { plan: plan.name },
    },
    {
      key: "household",
      czk: Math.round(basketCzk(HOUSEHOLD_BASKET)),
      official: true,
      sources: [{ name: ROHLIK, url: "https://www.rohlik.cz/", checkedOn: ROHLIK_CHECKED_ON }],
      detail: { items: HOUSEHOLD_BASKET.length },
    },
  ];

  return { city, lines, totalCzk: lines.reduce((sum, l) => sum + l.czk, 0) };
}

/** Budget month to balanced month, in CZK. */
export function monthRange(city: CityKey): [number, number] {
  return [studentMonth(city, LIFESTYLE_PRESETS.budget).totalCzk, studentMonth(city, LIFESTYLE_PRESETS.balanced).totalCzk];
}

/** The newest check date across every source in a month. */
export function lastChecked(month: StudentMonth): string {
  return month.lines.flatMap((l) => l.sources.map((s) => s.checkedOn)).sort().at(-1)!;
}
