import { DORM_PRICES } from "@/data/dorm-prices";

describe("dorm prices", () => {
  it.each(DORM_PRICES.map((d) => [d.id, d]))("%s has ordered ranges, a source and a check date", (_id, d) => {
    for (const r of [d.single, d.double]) {
      if (!r) continue;
      expect(r[0]).toBeGreaterThan(0);
      expect(r[0]).toBeLessThanOrEqual(r[1]);
    }
    expect(d.sourceUrl).toMatch(/^https:\/\//);
    expect(d.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(d.university.ar && d.city.ar && d.validFrom.ar && d.conditions.ar).toBeTruthy();
  });
});
