import { describe, expect, it } from "vitest";
import { cities } from "@/data/costs";
import { DORM_PRICES, NIGHTS_PER_MONTH } from "@/data/dorm-prices";
import { CANTEENS } from "@/data/living/canteens";
import { FOOD_BASKET, HOUSEHOLD_BASKET, basketCzk, rohlikUrl } from "@/data/living/groceries";
import { STUDENT_TRANSPORT } from "@/data/living/transport";
import { LIFESTYLE_PRESETS, dormNightly, lastChecked, monthRange, studentMonth } from "@/lib/living-calc";

const DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("student month", () => {
  for (const { key: city } of cities) {
    it(`adds up its lines and keeps budget at or below balanced (${city})`, () => {
      const budget = studentMonth(city, LIFESTYLE_PRESETS.budget);
      const balanced = studentMonth(city, LIFESTYLE_PRESETS.balanced);
      for (const m of [budget, balanced]) {
        expect(m.totalCzk).toBe(m.lines.reduce((s, l) => s + l.czk, 0));
        expect(new Set(m.lines.map((l) => l.key)).size).toBe(m.lines.length);
      }
      expect(budget.totalCzk).toBeLessThanOrEqual(balanced.totalCzk);
      expect(monthRange(city)).toEqual([budget.totalCzk, balanced.totalCzk]);
    });

    it(`prices housing from the city's official dorm lists (${city})`, () => {
      const lists = DORM_PRICES.filter((d) => d.cityKey === city);
      expect(lists.length).toBeGreaterThan(0);
      const lowest = Math.min(...lists.map((d) => d.double[0]));
      const housing = studentMonth(city, LIFESTYLE_PRESETS.budget).lines.find((l) => l.key === "housing")!;
      expect(housing.czk).toBe(Math.round(lowest * NIGHTS_PER_MONTH));
      expect(housing.sources.map((s) => s.url).sort()).toEqual(lists.map((d) => d.sourceUrl).sort());
      expect(dormNightly(city, "shared", "typical").nightly).toBeGreaterThanOrEqual(lowest);
    });

    it(`uses the official student fares (${city})`, () => {
      const pass = STUDENT_TRANSPORT[city];
      const line = (p: "budget" | "balanced") => studentMonth(city, LIFESTYLE_PRESETS[p]).lines.find((l) => l.key === "transport")!.czk;
      expect(line("budget")).toBe(Math.round(pass.longPass.czk / pass.longPass.months));
      expect(line("balanced")).toBe(pass.monthCzk);
    });

    it(`cites a dated https source on every line, and flags only insurance as unofficial (${city})`, () => {
      const m = studentMonth(city, LIFESTYLE_PRESETS.balanced);
      for (const line of m.lines) {
        expect(line.sources.length, line.key).toBeGreaterThan(0);
        for (const s of line.sources) {
          expect(s.url, line.key).toMatch(/^https:\/\//);
          expect(s.checkedOn, line.key).toMatch(DATE);
          expect(s.name.ar, line.key).toBeTruthy();
        }
      }
      expect(m.lines.filter((l) => !l.official).map((l) => l.key)).toEqual(["insurance"]);
      expect(lastChecked(m)).toMatch(DATE);
    });
  }

  it("prices the basket from whole products with positive quantities", () => {
    for (const item of [...FOOD_BASKET, ...HOUSEHOLD_BASKET]) {
      expect(item.packCzk, item.product).toBeGreaterThan(0);
      expect(item.packsPerMonth, item.product).toBeGreaterThan(0);
      expect(rohlikUrl(item)).toMatch(/^https:\/\/www\.rohlik\.cz\/\d+-[a-z0-9-]+$/);
      expect(item.label.ar, item.product).toBeTruthy();
    }
    const food = studentMonth("prague", LIFESTYLE_PRESETS.budget).lines.find((l) => l.key === "food")!;
    expect(food.czk).toBe(Math.round(basketCzk(FOOD_BASKET)));
  });

  it("adds canteen lunches only in the balanced month", () => {
    for (const { key: city } of cities) {
      const canteen = (p: "budget" | "balanced") => studentMonth(city, LIFESTYLE_PRESETS[p]).lines.find((l) => l.key === "canteen")!.czk;
      expect(canteen("budget")).toBe(0);
      expect(canteen("balanced")).toBe(CANTEENS[city].mealCzk * LIFESTYLE_PRESETS.balanced.canteenLunches);
    }
  });
});
