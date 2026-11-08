/**
 * Arithmetic for the cost-of-living page. Pure functions only, so every
 * figure on the page can be tested (test/living-calc.test.ts).
 *
 * Money is added in haléře (1/100 Kč) to avoid floating-point drift, then
 * converted back to Kč.
 */
import type { CityKey } from "@/data/costs";
import { GROCERY_BY_ID, BASKET_PRESETS, type Basket, type GroceryItem } from "@/data/living/groceries";
import { DPP, DPC, INCOME_TAX, WEEKS_PER_MONTH, FX } from "@/data/living/work-rules";
import {
  STUDENT_TRANSPORT,
  dormNightly,
  DORM_NIGHTS_PER_MONTH,
  numbeoValue,
  INSURANCE_MONTHLY_CZK,
  type NumbeoItem,
} from "@/data/living/city-costs";

const toHal = (czk: number) => Math.round(czk * 100);
const fromHal = (hal: number) => hal / 100;

/* ------------------------------------------------------------------ basket */

export type BasketLine = { item: GroceryItem; qty: number; totalCzk: number };

/** Lines with a positive quantity, in catalogue order. Unknown ids are ignored. */
export function basketLines(basket: Basket): BasketLine[] {
  return Object.entries(basket)
    .filter(([id, qty]) => qty > 0 && GROCERY_BY_ID[id])
    .map(([id, qty]) => {
      const item = GROCERY_BY_ID[id];
      return { item, qty, totalCzk: fromHal(Math.round(toHal(item.priceCzk) * qty)) };
    });
}

export function basketTotal(basket: Basket): number {
  return fromHal(basketLines(basket).reduce((sum, l) => sum + toHal(l.totalCzk), 0));
}

export function basketItemCount(basket: Basket): number {
  return basketLines(basket).length;
}

/** Set one item's quantity, never below zero, rounded to the step to avoid 0.30000000004. */
export function setQty(basket: Basket, id: string, qty: number): Basket {
  const next = { ...basket };
  const clean = Math.max(0, Math.round(qty * 2) / 2);
  if (clean === 0) delete next[id];
  else next[id] = clean;
  return next;
}

/* -------------------------------------------------------------------- work */

export function shiftGross(hourlyCzk: number, hours: number): number {
  return fromHal(Math.round(toHal(hourlyCzk) * hours));
}

export function monthlyHours(hoursPerShift: number, shiftsPerWeek: number, weeksPerMonth = WEEKS_PER_MONTH): number {
  return hoursPerShift * shiftsPerWeek * weeksPerMonth;
}

export function monthlyGross(hourlyCzk: number, hoursPerShift: number, shiftsPerWeek: number, weeksPerMonth = WEEKS_PER_MONTH): number {
  return fromHal(Math.round(toHal(hourlyCzk) * monthlyHours(hoursPerShift, shiftsPerWeek, weeksPerMonth)));
}

/** Hours of work at `hourlyCzk` needed to earn `amountCzk`. Infinity for no wage. */
export function hoursToEarn(amountCzk: number, hourlyCzk: number): number {
  if (hourlyCzk <= 0) return Infinity;
  return amountCzk / hourlyCzk;
}

export type ShiftVsBasket = {
  earnedCzk: number;
  basketCzk: number;
  /** Positive: money left. Negative: shortfall. */
  remainingCzk: number;
  /** Share of the shift's pay the basket uses, 0–∞ (1.2 = 120 %). */
  shareOfPay: number;
  hoursNeeded: number;
};

export function compareShiftToBasket(hourlyCzk: number, hours: number, basket: Basket): ShiftVsBasket {
  const earnedCzk = shiftGross(hourlyCzk, hours);
  const basketCzk = basketTotal(basket);
  return {
    earnedCzk,
    basketCzk,
    remainingCzk: fromHal(toHal(earnedCzk) - toHal(basketCzk)),
    shareOfPay: earnedCzk > 0 ? basketCzk / earnedCzk : Infinity,
    hoursNeeded: hoursToEarn(basketCzk, hourlyCzk),
  };
}

/**
 * Cheapest preset basket that fits the budget, for the "a lower-cost basket"
 * suggestion. Returns null when even the cheapest does not fit.
 */
export function cheaperPresetThatFits(budgetCzk: number, exclude?: string) {
  const options = (Object.keys(BASKET_PRESETS) as (keyof typeof BASKET_PRESETS)[])
    .filter((id) => id !== exclude)
    .map((id) => ({ id, totalCzk: basketTotal(BASKET_PRESETS[id]) }))
    .sort((a, b) => a.totalCzk - b.totalCzk);
  const fitting = options.filter((o) => o.totalCzk <= budgetCzk);
  // The largest basket that still fits is the most useful suggestion.
  return fitting.length ? fitting[fitting.length - 1] : null;
}

/* ----------------------------------------------------------- tax estimate */

export type ContractType = "dpp" | "dpc" | "employment";

export type NetEstimate =
  | { kind: "estimate"; grossCzk: number; taxCzk: number; insuranceCzk: 0; netCzk: number; basis: "declaration" | "withholding" }
  /** The simulator can't estimate net pay reliably for this case and says why. */
  | { kind: "noEstimate"; reason: "aboveDppThreshold" | "notDpp" };

/**
 * Net pay for a DPP with one employer, below the monthly insurance threshold:
 * the one case the official rules settle without knowing more about the person.
 *
 * - Below 12,000 Kč a month from one employer, a DPP carries no social or
 *   health insurance (ČSSZ, 2026).
 * - With a signed tax declaration (prohlášení poplatníka), the employer
 *   deducts a 15 % advance and the 2,570 Kč monthly basic credit; on pay under
 *   the threshold the credit is larger than the advance, so tax is 0
 *   (Income Tax Act § 35ba, § 38h).
 * - Without a declaration, 15 % is withheld as final tax (§ 6 (4), § 36),
 *   rounded down to whole crowns. It can be claimed back in a tax return.
 */
export function estimateNet(contract: ContractType, monthlyGrossCzk: number, signedDeclaration: boolean): NetEstimate {
  if (contract !== "dpp") return { kind: "noEstimate", reason: "notDpp" };
  const gross = Math.round(monthlyGrossCzk);
  if (gross >= DPP.insuranceThresholdCzk) return { kind: "noEstimate", reason: "aboveDppThreshold" };
  const raw = gross * INCOME_TAX.rate;
  const taxCzk = signedDeclaration
    ? Math.max(0, Math.ceil(raw) - INCOME_TAX.basicCreditMonthCzk)
    : Math.floor(raw);
  return {
    kind: "estimate",
    grossCzk: gross,
    taxCzk,
    insuranceCzk: 0,
    netCzk: gross - taxCzk,
    basis: signedDeclaration ? "declaration" : "withholding",
  };
}

export type ScheduleCheck = {
  /** Hours a year at this pace, if kept up all year. */
  hoursPerYear: number;
  dppFitsYear: boolean;
  /** Months of this schedule before one employer's 300 DPP hours run out. */
  dppMonthsUntilCap: number;
  dpcAllowed: boolean;
  weeklyHours: number;
};

export function checkSchedule(hoursPerShift: number, shiftsPerWeek: number): ScheduleCheck {
  const weeklyHours = hoursPerShift * shiftsPerWeek;
  const hoursPerYear = weeklyHours * 52;
  const perMonth = monthlyHours(hoursPerShift, shiftsPerWeek);
  return {
    weeklyHours,
    hoursPerYear,
    dppFitsYear: hoursPerYear <= DPP.maxHoursPerYear,
    dppMonthsUntilCap: perMonth > 0 ? DPP.maxHoursPerYear / perMonth : Infinity,
    dpcAllowed: weeklyHours <= DPC.fullTimeHoursPerWeek * DPC.maxShareOfFullTime,
  };
}

/* ------------------------------------------------------ the student month */

export type Lifestyle = "budget" | "balanced" | "comfortable";
export type Housing = "dormDouble" | "dormSingle" | "flatOutside" | "flatCentre";

export type MonthSettings = {
  housing: Housing;
  groceries: keyof typeof BASKET_PRESETS;
  mealsOutPerWeek: number;
  coffeesPerWeek: number;
  gym: boolean;
  cinemaPerMonth: number;
  /** The visitor's own amounts, not data: clothes, toiletries, a night out. */
  personalCzk: number;
  travelCzk: number;
  /** Share of the month kept aside for surprises. */
  bufferShare: number;
  /**
   * Share of Numbeo's utilities figure (an 85 m² flat) a smaller flat uses.
   * An assumption the visitor can change; the page says so.
   */
  utilitiesShare: number;
};

/** Starting points for each lifestyle. Illustrative choices, clearly labelled on the page. */
export const LIFESTYLE_PRESETS: Record<Lifestyle, MonthSettings> = {
  budget: {
    housing: "dormDouble", groceries: "budgetWeek", mealsOutPerWeek: 1, coffeesPerWeek: 1,
    gym: false, cinemaPerMonth: 1, personalCzk: 500, travelCzk: 0, bufferShare: 0.05, utilitiesShare: 0.5,
  },
  balanced: {
    housing: "dormSingle", groceries: "cookingWeek", mealsOutPerWeek: 2, coffeesPerWeek: 3,
    gym: true, cinemaPerMonth: 2, personalCzk: 1000, travelCzk: 500, bufferShare: 0.1, utilitiesShare: 0.5,
  },
  comfortable: {
    housing: "flatOutside", groceries: "comfortWeek", mealsOutPerWeek: 4, coffeesPerWeek: 5,
    gym: true, cinemaPerMonth: 3, personalCzk: 2000, travelCzk: 1500, bufferShare: 0.1, utilitiesShare: 0.5,
  },
};

export type LineGroup = "housing" | "food" | "transport" | "bills" | "fun" | "personal";

export type MonthLine = {
  id: "housing" | "utilities" | "groceries" | "eatingOut" | "coffee" | "transport" | "phone" | "internet" | "insurance" | "gym" | "cinema" | "personal" | "travel" | "buffer";
  group: LineGroup;
  amountCzk: number;
  /** Where the number comes from. */
  basis: "official" | "retailer" | "numbeo" | "estimate" | "yours";
  /** Numbeo figure borrowed from another city. */
  borrowedFrom?: CityKey;
};

const nb = (city: CityKey, item: NumbeoItem) => numbeoValue(city, item);

export function housingMonthly(city: CityKey, housing: Housing): { amountCzk: number; basis: MonthLine["basis"] } {
  const dorm = dormNightly()[city];
  switch (housing) {
    case "dormDouble":
      return { amountCzk: dorm.double[0] * DORM_NIGHTS_PER_MONTH, basis: "official" };
    case "dormSingle":
      return { amountCzk: dorm.single[0] * DORM_NIGHTS_PER_MONTH, basis: "official" };
    case "flatOutside":
      return { amountCzk: Math.round(nb(city, "rentOutside")?.avg ?? 0), basis: "numbeo" };
    case "flatCentre":
      return { amountCzk: Math.round(nb(city, "rentCentre")?.avg ?? 0), basis: "numbeo" };
  }
}

export const isDorm = (h: Housing) => h === "dormDouble" || h === "dormSingle";

/** Round an estimate to the nearest 10 Kč: the page never shows "1,037.47" for a guess. */
const r10 = (n: number) => Math.round(n / 10) * 10;

export function studentMonth(city: CityKey, s: MonthSettings): { lines: MonthLine[]; totalCzk: number } {
  const lines: MonthLine[] = [];
  const h = housingMonthly(city, s.housing);
  lines.push({ id: "housing", group: "housing", amountCzk: r10(h.amountCzk), basis: h.basis });

  if (!isDorm(s.housing)) {
    const u = nb(city, "utilities85");
    // Numbeo's figure is for an 85 m² flat; a one-bedroom is roughly half that,
    // so the visitor picks the share (default 50 %, shown as an assumption).
    if (u && s.utilitiesShare > 0) lines.push({ id: "utilities", group: "bills", amountCzk: r10(u.avg * s.utilitiesShare), basis: "numbeo", borrowedFrom: u.from !== city ? u.from : undefined });
    const net = nb(city, "internet");
    if (net) lines.push({ id: "internet", group: "bills", amountCzk: r10(net.avg), basis: "numbeo", borrowedFrom: net.from !== city ? net.from : undefined });
  }

  lines.push({ id: "groceries", group: "food", amountCzk: r10(basketTotal(BASKET_PRESETS[s.groceries]) * WEEKS_PER_MONTH), basis: "retailer" });

  const meal = nb(city, "mealInexpensive");
  if (meal && s.mealsOutPerWeek > 0) lines.push({ id: "eatingOut", group: "food", amountCzk: r10(meal.avg * s.mealsOutPerWeek * WEEKS_PER_MONTH), basis: "numbeo" });

  const coffee = nb(city, "cappuccino");
  if (coffee && s.coffeesPerWeek > 0) lines.push({ id: "coffee", group: "food", amountCzk: r10(coffee.avg * s.coffeesPerWeek * WEEKS_PER_MONTH), basis: "numbeo" });

  lines.push({ id: "transport", group: "transport", amountCzk: STUDENT_TRANSPORT[city].monthlyCzk, basis: "official" });

  const phone = nb(city, "mobilePlan");
  if (phone) lines.push({ id: "phone", group: "bills", amountCzk: r10(phone.avg), basis: "numbeo", borrowedFrom: phone.from !== city ? phone.from : undefined });

  lines.push({ id: "insurance", group: "bills", amountCzk: Math.round((INSURANCE_MONTHLY_CZK[0] + INSURANCE_MONTHLY_CZK[1]) / 2), basis: "estimate" });

  const gym = nb(city, "fitness");
  if (s.gym && gym) lines.push({ id: "gym", group: "fun", amountCzk: r10(gym.avg), basis: "numbeo" });

  const cinema = nb(city, "cinema");
  if (cinema && s.cinemaPerMonth > 0) lines.push({ id: "cinema", group: "fun", amountCzk: r10(cinema.avg * s.cinemaPerMonth), basis: "numbeo" });

  if (s.personalCzk > 0) lines.push({ id: "personal", group: "personal", amountCzk: Math.round(s.personalCzk), basis: "yours" });
  if (s.travelCzk > 0) lines.push({ id: "travel", group: "transport", amountCzk: Math.round(s.travelCzk), basis: "yours" });

  const subtotal = lines.reduce((sum, l) => sum + l.amountCzk, 0);
  if (s.bufferShare > 0) lines.push({ id: "buffer", group: "personal", amountCzk: r10(subtotal * s.bufferShare), basis: "yours" });

  return { lines, totalCzk: lines.reduce((sum, l) => sum + l.amountCzk, 0) };
}

export function groupTotals(lines: MonthLine[]): { group: LineGroup; amountCzk: number }[] {
  const order: LineGroup[] = ["housing", "food", "transport", "bills", "fun", "personal"];
  return order
    .map((group) => ({ group, amountCzk: lines.filter((l) => l.group === group).reduce((s, l) => s + l.amountCzk, 0) }))
    .filter((g) => g.amountCzk > 0);
}

/** Share of `costCzk` covered by `incomeCzk`, as a whole percentage. */
export function coverage(incomeCzk: number, costCzk: number): number {
  if (costCzk <= 0) return 0;
  return Math.round((incomeCzk / costCzk) * 100);
}

/** One-time costs when renting privately: deposit of up to three months' rent (Civil Code § 2254). */
export function maxDeposit(monthlyRentCzk: number, months = 3): number {
  return monthlyRentCzk * months;
}

/* -------------------------------------------------------------- display */

/** "1,440 CZK". Western digits on both language versions (CLAUDE.md rule 5). */
export function fmtCzk(n: number, opts: { decimals?: boolean } = {}): string {
  const s = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: opts.decimals ? 2 : 0,
    maximumFractionDigits: opts.decimals ? 2 : 0,
  }).format(opts.decimals ? n : Math.round(n));
  return `${s} CZK`;
}

/** Totals built from estimates: nearest 100, so they don't look more exact than they are. */
export const roundEstimate = (n: number) => Math.round(n / 100) * 100;

export function toEur(czk: number): number {
  return czk / FX.czkPerEur;
}

export function fmtEur(czk: number): string {
  const eur = toEur(czk);
  return `€${new Intl.NumberFormat("en-US", { maximumFractionDigits: eur < 100 ? 1 : 0 }).format(eur)}`;
}

/** "9.5": hours with one decimal, dropping ".0". */
export function fmtHours(h: number): string {
  if (!Number.isFinite(h)) return "–";
  const v = Math.round(h * 10) / 10;
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

/** Days between an ISO date and now; used for the stale-data notice. */
export function daysSince(isoDate: string, now: Date): number {
  const then = new Date(`${isoDate}T00:00:00Z`).getTime();
  return Math.floor((now.getTime() - then) / 86_400_000);
}

/** Snapshot prices older than this get a "these may have changed" notice. */
export const STALE_AFTER_DAYS = 60;
