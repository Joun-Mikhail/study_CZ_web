import { describe, expect, it } from "vitest";
import { totalRange } from "@/data/costs";
import { CZK_PER_EUR, OFFICIAL, degreeTotalEur, englishTuition, toEur } from "@/lib/study-costs";

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

  it("adds tuition and twelve months of living per year", () => {
    const [lowCzk, highCzk] = totalRange("brno");
    expect(degreeTotalEur(3000, 3, "brno")).toEqual([9000 + toEur(lowCzk * 36), 9000 + toEur(highCzk * 36)]);
    expect(toEur(CZK_PER_EUR * 10)).toBe(10);
  });

  it("keeps a source for every official figure", () => {
    for (const fig of Object.values(OFFICIAL)) {
      expect(fig.url).toMatch(/^https:\/\/(studyin\.gov\.cz|frs\.gov\.cz|mzv\.gov\.cz)\//);
      expect(fig.checked).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
