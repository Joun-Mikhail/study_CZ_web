import stripeConfig from "../stripe-links.json";
import {
  LAUNCH_OFFER,
  OFFER_ACTIVE,
  PROMO_PARAM,
  REGULAR_PRICES,
  checkoutLink,
  czk,
  eur,
  fullPackageTotal,
  isOfferActiveAt,
  priceOf,
  type PriceKey,
} from "@/config/pricing";

const keys = Object.keys(REGULAR_PRICES) as PriceKey[];

describe("launch offer maths", () => {
  it("halves every regular price while active", () => {
    expect(priceOf("consultation", true)).toBe(7.5);
    expect(priceOf("documentReview", true)).toBe(12.5);
    expect(priceOf("arrivalSupport", true)).toBe(14.5);
    expect(priceOf("interviewPrep", true)).toBe(19.5);
    expect(priceOf("course", true)).toBe(24.5);
    expect(priceOf("fullPackageStep1", true)).toBe(75);
    expect(priceOf("fullPackageStep2", true)).toBe(100);
  });

  it("charges the regular price when the offer is off", () => {
    for (const k of keys) expect(priceOf(k, false)).toBe(REGULAR_PRICES[k]);
  });

  it("totals both Full Journey steps", () => {
    expect(fullPackageTotal(false)).toBe(350);
    expect(fullPackageTotal(true)).toBe(175);
  });

  it("keeps site prices in line with stripe-links.json", () => {
    const links = stripeConfig.links as Record<string, { priceEur: number }>;
    for (const k of keys) expect(links[k]?.priceEur).toBe(REGULAR_PRICES[k]);
  });
});

describe("offer dates", () => {
  it("ends at 23:59:59 Prague time (CET) on 31 January 2027", () => {
    expect(new Date(LAUNCH_OFFER.endsAt).toISOString()).toBe("2027-01-31T22:59:59.000Z");
  });

  it("is never active while the offer is switched off", () => {
    expect(LAUNCH_OFFER.enabled).toBe(false);
    expect(isOfferActiveAt(Date.parse("2026-12-01T12:00:00Z"))).toBe(false);
    expect(OFFER_ACTIVE).toBe(false);
  });
});

describe("checkoutLink", () => {
  it("returns the plain Stripe URL when the offer is off", () => {
    expect(checkoutLink("consultation")).toBe(stripeConfig.links.consultation.url);
    expect(checkoutLink("course")).not.toContain(PROMO_PARAM);
  });

  it("refuses to render the private step 2 link", () => {
    expect(() => checkoutLink("fullPackageStep2")).toThrow(/not public/);
  });

  it("only uses buy.stripe.com URLs", () => {
    for (const entry of Object.values(stripeConfig.links)) {
      expect(entry.url).toMatch(/^https:\/\/buy\.stripe\.com\/[A-Za-z0-9]+$/);
    }
  });
});

describe("formatting", () => {
  it("formats euros per locale", () => {
    expect(eur(15)).toBe("€15");
    expect(eur(7.5)).toBe("€7.50");
    expect(eur(7.5, "ar")).toBe("7.50€");
  });

  it("rounds crowns to 5 Kč", () => {
    expect(czk(15)).toBe("≈ 375 Kč");
    expect(czk(7.5)).toBe("≈ 190 Kč");
  });
});
