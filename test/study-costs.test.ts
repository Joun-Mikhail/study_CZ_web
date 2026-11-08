import { describe, expect, it } from "vitest";
import { cities } from "@/data/costs";
import { LIFESTYLE_PRESETS, monthRange, studentMonth } from "@/lib/living-calc";
import { CZK_PER_EUR, OFFICIAL, degreeTotalEur, englishTuition, livingByCity, toEur } from "@/lib/study-costs";

describe("study costs", () => {
  it("summarises English tuition in order", () => {
    const { all, bachelor, master } = englishTuition();
    for (const s of [all, bachelor, master]) {
      expect(s.count).toBeGreaterThan(0);
      expect(s.min).toBeLessThanOrEqual(s.median);
      expect(s.median).toBeLessThanOrEqual(s.max);
    }
    expect(bachelor.count + master.count).toBeLessThanOrEqual(all.count);
  });

  it("uses the sourced budget and balanced months as each city's living range", () => {
    const living = livingByCity();
    expect(living.map((c) => c.key)).toEqual(cities.map((c) => c.key));
    for (const c of living) {
      expect(c.monthlyCzk).toEqual([
        studentMonth(c.key, LIFESTYLE_PRESETS.budget).totalCzk,
        studentMonth(c.key, LIFESTYLE_PRESETS.balanced).totalCzk,
      ]);
      expect(c.monthlyCzk[0]).toBeLessThanOrEqual(c.monthlyCzk[1]);
    }
  });

  it("adds tuition and twelve months of living per year", () => {
    const [lowCzk, highCzk] = monthRange("brno");
    expect(degreeTotalEur(3000, 3, "brno")).toEqual([9000 + toEur(lowCzk * 36), 9000 + toEur(highCzk * 36)]);
    expect(toEur(CZK_PER_EUR * 10)).toBe(10);
  });

  it("keeps a source for every official figure", () => {
    for (const fig of Object.values(OFFICIAL)) {
      expect(fig.url).toMatch(/^https:\/\/(studyin\.gov\.cz|frs\.gov\.cz|ipc\.gov\.cz|mzv\.gov\.cz)\//);
      expect(fig.checked).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
