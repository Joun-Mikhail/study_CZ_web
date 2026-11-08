import {
  basketTotal,
  basketLines,
  setQty,
  shiftGross,
  monthlyGross,
  monthlyHours,
  hoursToEarn,
  compareShiftToBasket,
  cheaperPresetThatFits,
  estimateNet,
  checkSchedule,
  studentMonth,
  groupTotals,
  housingMonthly,
  coverage,
  maxDeposit,
  fmtCzk,
  fmtHours,
  fmtEur,
  roundEstimate,
  daysSince,
  LIFESTYLE_PRESETS,
} from "@/lib/living-calc";
import { BASKET_PRESETS, GROCERY_BY_ID } from "@/data/living/groceries";
import { STUDENT_TRANSPORT, dormNightly } from "@/data/living/city-costs";
import { WEEKS_PER_MONTH } from "@/data/living/work-rules";

describe("basket arithmetic", () => {
  it("adds line totals exactly, without floating-point drift", () => {
    // 3 × 16.90 = 50.70 exactly (floats would give 50.699999…)
    expect(basketTotal({ milk: 3 })).toBe(50.7);
    expect(basketTotal({ milk: 12, eggs: 3 })).toBe(12 * 16.9 + 3 * 59.9);
    expect(basketTotal({})).toBe(0);
  });

  it("prices the brief's big shop from item prices, not a typed total", () => {
    const manual = Object.entries(BASKET_PRESETS.bigShop).reduce(
      (sum, [id, qty]) => sum + Math.round(GROCERY_BY_ID[id].priceCzk * 100) * qty,
      0,
    ) / 100;
    expect(basketTotal(BASKET_PRESETS.bigShop)).toBe(manual);
    // Pin the current snapshot so a data change is noticed in review.
    expect(basketTotal(BASKET_PRESETS.bigShop)).toBe(1703.9);
  });

  it("ignores unknown items and zero quantities", () => {
    expect(basketLines({ milk: 0, unicorn: 4, eggs: 1 }).map((l) => l.item.id)).toEqual(["eggs"]);
  });

  it("never lets a quantity go below zero and removes empty lines", () => {
    expect(setQty({ milk: 1 }, "milk", -1)).toEqual({});
    expect(setQty({}, "chicken", 0.5)).toEqual({ chicken: 0.5 });
    expect(setQty({}, "chicken", 0.1 + 0.2)).toEqual({ chicken: 0.5 });
  });

  it("weekly presets are cheaper than the big shop and ordered by size", () => {
    const t = (id: keyof typeof BASKET_PRESETS) => basketTotal(BASKET_PRESETS[id]);
    expect(t("budgetWeek")).toBeLessThan(t("cookingWeek"));
    expect(t("cookingWeek")).toBeLessThan(t("comfortWeek"));
    expect(t("comfortWeek")).toBeLessThan(t("bigShop"));
  });
});

describe("a shift of work", () => {
  it("multiplies wage by hours", () => {
    expect(shiftGross(180, 8)).toBe(1440);
    expect(shiftGross(164, 7.5)).toBe(1230);
    expect(shiftGross(0, 8)).toBe(0);
  });

  it("shows the shortfall honestly when the basket costs more than the shift", () => {
    const r = compareShiftToBasket(180, 8, BASKET_PRESETS.bigShop);
    expect(r.earnedCzk).toBe(1440);
    expect(r.basketCzk).toBe(1703.9);
    expect(r.remainingCzk).toBe(-263.9);
    expect(r.shareOfPay).toBeCloseTo(1.1833, 3);
    expect(r.hoursNeeded).toBeCloseTo(9.466, 2);
  });

  it("shows money left when it fits", () => {
    const r = compareShiftToBasket(200, 8, BASKET_PRESETS.budgetWeek);
    expect(r.remainingCzk).toBeGreaterThan(0);
    expect(r.shareOfPay).toBeLessThan(1);
  });

  it("hours to earn: infinity without a wage", () => {
    expect(hoursToEarn(100, 0)).toBe(Infinity);
    expect(hoursToEarn(1440, 180)).toBe(8);
  });

  it("suggests the largest preset that fits, or none", () => {
    const fits = cheaperPresetThatFits(1440, "bigShop");
    expect(fits).not.toBeNull();
    expect(fits!.totalCzk).toBeLessThanOrEqual(1440);
    expect(cheaperPresetThatFits(10)).toBeNull();
  });
});

describe("monthly earnings", () => {
  it("uses 52/12 weeks a month", () => {
    expect(monthlyHours(5, 2)).toBeCloseTo(10 * WEEKS_PER_MONTH, 10);
    expect(monthlyGross(180, 5, 2)).toBe(Math.round(180 * 10 * (52 / 12) * 100) / 100);
    expect(monthlyGross(200, 8, 1, 4)).toBe(6400);
  });
});

describe("net pay estimate (DPP)", () => {
  it("below 12,000 Kč with a signed declaration: no tax, no insurance", () => {
    const e = estimateNet("dpp", 11999, true);
    expect(e).toEqual({ kind: "estimate", grossCzk: 11999, taxCzk: 0, insuranceCzk: 0, netCzk: 11999, basis: "declaration" });
  });

  it("below 12,000 Kč without a declaration: 15 % withheld, rounded down", () => {
    const e = estimateNet("dpp", 6235, false);
    expect(e.kind).toBe("estimate");
    if (e.kind === "estimate") {
      expect(e.taxCzk).toBe(935); // 935.25 → 935
      expect(e.netCzk).toBe(5300);
    }
  });

  it("refuses to guess at or above the threshold, or for other contracts", () => {
    expect(estimateNet("dpp", 12000, true)).toEqual({ kind: "noEstimate", reason: "aboveDppThreshold" });
    expect(estimateNet("dpc", 3000, true)).toEqual({ kind: "noEstimate", reason: "notDpp" });
    expect(estimateNet("employment", 30000, true)).toEqual({ kind: "noEstimate", reason: "notDpp" });
  });
});

describe("contract limits", () => {
  it("flags schedules that would pass 300 DPP hours a year", () => {
    expect(checkSchedule(5, 1).dppFitsYear).toBe(true); // 260 h
    expect(checkSchedule(8, 2).dppFitsYear).toBe(false); // 832 h
    expect(checkSchedule(8, 2).dppMonthsUntilCap).toBeCloseTo(300 / (16 * WEEKS_PER_MONTH), 5);
  });

  it("DPČ allows up to 20 hours a week on average", () => {
    expect(checkSchedule(5, 4).dpcAllowed).toBe(true);
    expect(checkSchedule(8, 3).dpcAllowed).toBe(false);
  });
});

describe("the student month", () => {
  it("dorm rent comes from the cheapest official bed × 30 nights", () => {
    const dorm = dormNightly();
    expect(housingMonthly("prague", "dormDouble").amountCzk).toBe(dorm.prague.double[0] * 30);
    expect(housingMonthly("brno", "dormSingle").amountCzk).toBe(dorm.brno.single[0] * 30);
    expect(housingMonthly("ostrava", "dormDouble")).toEqual({ amountCzk: 3600, basis: "official" });
  });

  it("totals equal the sum of their lines, and groups sum to the total", () => {
    for (const city of ["prague", "brno", "ostrava"] as const) {
      for (const life of ["budget", "balanced", "comfortable"] as const) {
        const m = studentMonth(city, LIFESTYLE_PRESETS[life]);
        expect(m.totalCzk).toBe(m.lines.reduce((s, l) => s + l.amountCzk, 0));
        expect(groupTotals(m.lines).reduce((s, g) => s + g.amountCzk, 0)).toBe(m.totalCzk);
        expect(m.lines.find((l) => l.id === "transport")!.amountCzk).toBe(STUDENT_TRANSPORT[city].monthlyCzk);
      }
    }
  });

  it("lifestyles get more expensive in every city", () => {
    for (const city of ["prague", "brno", "ostrava"] as const) {
      const t = (l: keyof typeof LIFESTYLE_PRESETS) => studentMonth(city, LIFESTYLE_PRESETS[l]).totalCzk;
      expect(t("budget")).toBeLessThan(t("balanced"));
      expect(t("balanced")).toBeLessThan(t("comfortable"));
    }
  });

  it("adds utilities and internet only for a private flat, and marks borrowed figures", () => {
    const dorm = studentMonth("ostrava", { ...LIFESTYLE_PRESETS.budget });
    expect(dorm.lines.some((l) => l.id === "utilities")).toBe(false);
    const flat = studentMonth("ostrava", { ...LIFESTYLE_PRESETS.comfortable });
    expect(flat.lines.find((l) => l.id === "utilities")?.borrowedFrom).toBe("brno");
    expect(flat.lines.find((l) => l.id === "phone")?.borrowedFrom).toBe("brno");
  });

  it("utilities follow the chosen share of Numbeo's 85 m² figure", () => {
    const half = studentMonth("brno", { ...LIFESTYLE_PRESETS.comfortable, utilitiesShare: 0.5 });
    const full = studentMonth("brno", { ...LIFESTYLE_PRESETS.comfortable, utilitiesShare: 1 });
    expect(half.lines.find((l) => l.id === "utilities")!.amountCzk).toBe(3220); // 6,445 × 0.5 → nearest 10
    expect(full.lines.find((l) => l.id === "utilities")!.amountCzk).toBe(6450);
  });

  it("changing one habit changes the total by exactly that line", () => {
    const base = LIFESTYLE_PRESETS.balanced;
    const a = studentMonth("brno", { ...base, bufferShare: 0 });
    const b = studentMonth("brno", { ...base, bufferShare: 0, gym: false });
    const gym = a.lines.find((l) => l.id === "gym")!.amountCzk;
    expect(a.totalCzk - b.totalCzk).toBe(gym);
  });
});

describe("helpers", () => {
  it("coverage and deposit", () => {
    expect(coverage(6000, 12000)).toBe(50);
    expect(coverage(5000, 0)).toBe(0);
    expect(maxDeposit(15000)).toBe(45000);
  });

  it("formats money and hours without false precision", () => {
    expect(fmtCzk(1703.9)).toBe("1,704 CZK");
    expect(fmtCzk(16.9, { decimals: true })).toBe("16.90 CZK");
    expect(fmtHours(9.4661)).toBe("9.5");
    expect(fmtHours(8)).toBe("8");
    expect(fmtHours(Infinity)).toBe("–");
    expect(roundEstimate(16382)).toBe(16400);
    expect(fmtEur(24345)).toBe("€1,000");
  });

  it("counts days since a check date", () => {
    expect(daysSince("2026-11-08", new Date("2027-01-08T12:00:00Z"))).toBe(61);
  });
});
