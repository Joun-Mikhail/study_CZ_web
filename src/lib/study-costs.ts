import { programmes } from "@/data/programmes";
import { cities, oneTimeCosts, totalRange, type CityKey } from "@/data/costs";
import { MEDICAL_DEGREES, feeRange, medicineRows } from "@/lib/medicine-guide";

/** Same rough rate the rest of the site uses (see czk() in src/config/pricing.ts). */
export const CZK_PER_EUR = 25;

export const toEur = (czk: number) => Math.round(czk / CZK_PER_EUR);

export { OFFICIAL } from "@/data/official-figures";

export type TuitionStats = { count: number; min: number; median: number; max: number };

function stats(fees: number[]): TuitionStats {
  const sorted = [...fees].sort((a, b) => a - b);
  return { count: sorted.length, min: sorted[0], median: sorted[Math.floor(sorted.length / 2)], max: sorted[sorted.length - 1] };
}

/**
 * Yearly tuition (EUR) of the English-taught programmes on the site, from src/data/programmes.ts.
 * General Medicine and Dentistry are long "Master" degrees with their own row, so the
 * bachelor's and master's figures leave them out.
 */
export function englishTuition(): { all: TuitionStats; bachelor: TuitionStats; master: TuitionStats; lastVerified: string } {
  const english = programmes.filter((p) => p.language === "English");
  const general = english.filter((p) => !(p.field === "Medicine" && MEDICAL_DEGREES.includes(p.name.en)));
  return {
    all: stats(english.map((p) => p.tuitionEurPerYear)),
    bachelor: stats(general.filter((p) => p.degree === "Bachelor").map((p) => p.tuitionEurPerYear)),
    master: stats(general.filter((p) => p.degree === "Master").map((p) => p.tuitionEurPerYear)),
    lastVerified: english.map((p) => p.verification.lastVerified).sort()[0],
  };
}

export function medicineTuition() {
  return feeRange(medicineRows(), "General Medicine");
}

/** Monthly living cost per city (CZK), the same community-reported figures as the cost-of-living calculator. */
export function livingByCity(): { key: CityKey; label: { en: string; ar: string }; monthlyCzk: [number, number] }[] {
  return cities.map((c) => ({ key: c.key, label: c.label, monthlyCzk: totalRange(c.key) }));
}

export const accommodationDepositCzk = oneTimeCosts.accommodationDeposit;

/** Tuition plus living for a whole degree, in EUR, as a [low, high] range. Fees assumed unchanged. */
export function degreeTotalEur(tuitionPerYearEur: number, years: number, city: CityKey): [number, number] {
  const [lowCzk, highCzk] = totalRange(city);
  const tuition = tuitionPerYearEur * years;
  return [tuition + toEur(lowCzk * 12 * years), tuition + toEur(highCzk * 12 * years)];
}
