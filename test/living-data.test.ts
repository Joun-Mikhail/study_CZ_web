import { GROCERIES, BASKET_PRESETS, GROCERY_BY_ID, GROCERY_CHECKED_ON } from "@/data/living/groceries";
import { JOB_ROLES, UNPRICED_ROLES, JOBS_CHECKED_ON } from "@/data/living/jobs";
import { STUDENT_TRANSPORT, NUMBEO, OSTRAVA_DORM, dormNightly } from "@/data/living/city-costs";
import { MIN_WAGE_2026, DPP, INCOME_TAX, FX } from "@/data/living/work-rules";

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const https = (u: string) => expect(u, u).toMatch(/^https:\/\/[^\s]+$/);

describe("grocery source data", () => {
  it("every item has a dated, linked, positive price and both languages", () => {
    expect(GROCERIES.length).toBeGreaterThanOrEqual(20);
    for (const g of GROCERIES) {
      expect(g.priceCzk, g.id).toBeGreaterThan(0);
      expect(g.unitPrice.czk, g.id).toBeGreaterThan(0);
      expect(g.checkedOn, g.id).toMatch(ISO);
      expect(g.url, g.id).toMatch(/^https:\/\/www\.rohlik\.cz\/\d+-/);
      expect(g.name.en.trim(), g.id).not.toBe("");
      expect(g.name.ar, g.id).toMatch(/[؀-ۿ]/);
      expect(g.pack.ar, g.id).toMatch(/[؀-ۿ]/);
      // Prices are stored with at most two decimals, as shops show them.
      expect(Math.round(g.priceCzk * 100) / 100, g.id).toBe(g.priceCzk);
    }
  });

  it("ids and product links are unique", () => {
    expect(new Set(GROCERIES.map((g) => g.id)).size).toBe(GROCERIES.length);
    expect(new Set(GROCERIES.map((g) => g.url)).size).toBe(GROCERIES.length);
  });

  it("an offer is always below the regular price and never used as the price", () => {
    for (const g of GROCERIES) {
      if (!g.offerSeen) continue;
      expect(g.offerSeen.priceCzk, g.id).toBeLessThan(g.priceCzk);
      if (g.offerSeen.until) expect(g.offerSeen.until).toMatch(ISO);
    }
  });

  it("presets only use real items", () => {
    for (const [name, basket] of Object.entries(BASKET_PRESETS)) {
      for (const [id, qty] of Object.entries(basket)) {
        expect(GROCERY_BY_ID[id], `${name}.${id}`).toBeDefined();
        expect(qty, `${name}.${id}`).toBeGreaterThan(0);
      }
    }
  });

  it("the big shop covers every item in the brief", () => {
    const brief = ["chicken", "milk", "eggs", "rice", "pasta", "potatoes", "sugar", "salt", "oil", "yogurt", "bread", "cheese", "apples", "bananas", "tomatoes", "coffee"];
    for (const id of brief) expect(BASKET_PRESETS.bigShop[id], id).toBeGreaterThan(0);
    expect(BASKET_PRESETS.bigShop.chicken).toBe(3); // 3 kg
    expect(BASKET_PRESETS.bigShop.milk).toBe(12); // 12 l
    expect(BASKET_PRESETS.bigShop.eggs * 10).toBe(30); // 30 eggs
    expect(BASKET_PRESETS.bigShop.rice).toBe(2); // 2 kg
    expect(BASKET_PRESETS.bigShop.pasta * 0.5).toBe(2); // 2 kg
  });

  it("check date is a real date", () => {
    expect(GROCERY_CHECKED_ON).toMatch(ISO);
    expect(Number.isNaN(new Date(GROCERY_CHECKED_ON).getTime())).toBe(false);
  });
});

describe("job source data", () => {
  it("every ad links to a job board and has a gross pay figure", () => {
    for (const role of JOB_ROLES) {
      expect(role.ads.length + role.market.length, role.id).toBeGreaterThan(0);
      for (const ad of role.ads) {
        expect(ad.url, ad.title).toMatch(/^https:\/\/www\.(jenprace|pracomat|jobs)\.cz\//);
        expect(Boolean(ad.hourlyCzk || ad.monthlyCzk), ad.title).toBe(true);
        if (ad.hourlyCzk) {
          expect(ad.hourlyCzk[0]).toBeLessThanOrEqual(ad.hourlyCzk[1]);
          // No ad below the legal minimum wage, nothing absurdly high.
          expect(ad.hourlyCzk[0], ad.title).toBeGreaterThanOrEqual(MIN_WAGE_2026.hourlyCzk);
          expect(ad.hourlyCzk[1], ad.title).toBeLessThan(500);
        }
        if (ad.postedOn) expect(ad.postedOn).toMatch(ISO);
      }
      for (const m of role.market) {
        expect(m.averageCzk).toBeGreaterThanOrEqual(m.hourlyCzk[0]);
        expect(m.averageCzk).toBeLessThanOrEqual(m.hourlyCzk[1]);
        expect(m.adCount).toBeGreaterThan(0);
        https(m.source.url);
      }
      expect(role.typicalHourlyCzk).toBeGreaterThanOrEqual(MIN_WAGE_2026.hourlyCzk);
    }
  });

  it("the waiter default sits inside the advertised range, not at 200 by assumption", () => {
    const waiter = JOB_ROLES.find((r) => r.id === "waiter")!;
    const lows = waiter.market.map((m) => m.hourlyCzk[0]);
    const highs = waiter.market.map((m) => m.hourlyCzk[1]);
    expect(waiter.typicalHourlyCzk).toBeGreaterThanOrEqual(Math.min(...lows));
    expect(waiter.typicalHourlyCzk).toBeLessThanOrEqual(Math.max(...highs));
  });

  it("unpriced roles carry no number in place of data", () => {
    for (const r of UNPRICED_ROLES) {
      expect(r.note.en.length).toBeGreaterThan(40);
      expect(r.note.ar).toMatch(/[؀-ۿ]/);
    }
    expect(JOBS_CHECKED_ON).toMatch(ISO);
  });
});

describe("city and rules data", () => {
  it("transport passes are official and dated", () => {
    for (const t of Object.values(STUDENT_TRANSPORT)) {
      expect(t.monthlyCzk).toBeGreaterThan(0);
      expect(t.yearlyCzk).toBeGreaterThan(t.monthlyCzk);
      expect(t.checkedOn).toMatch(ISO);
      https(t.url);
    }
  });

  it("dorm ranges are ordered and include Ostrava", () => {
    const d = dormNightly();
    for (const [city, r] of Object.entries(d)) {
      expect(r.double[0], city).toBeLessThanOrEqual(r.double[1]);
      expect(r.single[0], city).toBeLessThanOrEqual(r.single[1]);
      expect(Number.isFinite(r.double[0]), city).toBe(true);
      expect(r.sources.length, city).toBeGreaterThan(0);
    }
    https(OSTRAVA_DORM.url);
  });

  it("Numbeo ranges contain their averages", () => {
    for (const [city, c] of Object.entries(NUMBEO)) {
      https(c.url);
      for (const [item, v] of Object.entries(c.items)) {
        if (!v?.range) continue;
        expect(v.avg, `${city}.${item}`).toBeGreaterThanOrEqual(v.range[0]);
        expect(v.avg, `${city}.${item}`).toBeLessThanOrEqual(v.range[1]);
      }
    }
  });

  it("rules match the official 2026 figures", () => {
    expect(MIN_WAGE_2026.hourlyCzk).toBe(134.4);
    expect(DPP.insuranceThresholdCzk).toBe(12000);
    expect(DPP.maxHoursPerYear).toBe(300);
    expect(INCOME_TAX.basicCreditMonthCzk * 12).toBe(INCOME_TAX.basicCreditYearCzk);
    expect(FX.date).toMatch(ISO);
    expect(FX.czkPerEur).toBeGreaterThan(20);
  });
});
