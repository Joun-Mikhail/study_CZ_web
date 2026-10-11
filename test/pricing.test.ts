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
  it("halves every regular price except step 2 while active", () => {
    expect(priceOf("consultation", true)).toBe(7.5);
    expect(priceOf("documentReview", true)).toBe(12.5);
    expect(priceOf("arrivalSupport", true)).toBe(14.5);
    expect(priceOf("interviewPrep", true)).toBe(19.5);
    expect(priceOf("course", true)).toBe(24.5);
    expect(priceOf("fullPackageStep1", true)).toBe(75);
    // Step 2 is paid after acceptance, usually after the offer ends.
    expect(priceOf("fullPackageStep2", true)).toBe(200);
  });

  it("charges the regular price when the offer is off", () => {
    for (const k of keys) expect(priceOf(k, false)).toBe(REGULAR_PRICES[k]);
  });

  it("totals both Full Journey steps", () => {
    expect(fullPackageTotal(false)).toBe(350);
    expect(fullPackageTotal(true)).toBe(275);
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

  it("runs until the end date and not a second longer", () => {
    expect(isOfferActiveAt(Date.parse("2026-12-01T12:00:00Z"), true)).toBe(true);
    expect(isOfferActiveAt(Date.parse("2027-01-31T22:59:59Z"), true)).toBe(true);
    expect(isOfferActiveAt(Date.parse("2027-01-31T23:00:00Z"), true)).toBe(false);
  });

  it("is never active while switched off", () => {
    expect(isOfferActiveAt(Date.parse("2026-12-01T12:00:00Z"), false)).toBe(false);
  });

  it("matches the build-time flag", () => {
    expect(OFFER_ACTIVE).toBe(isOfferActiveAt(Date.now()));
  });
});

describe("checkoutLink", () => {
  it("returns the plain Stripe URL when the offer is off", () => {
    expect(checkoutLink("consultation", false)).toBe(stripeConfig.links.consultation.url);
    expect(checkoutLink("course", false)).not.toContain(PROMO_PARAM);
  });

  it("pre-fills the launch code while the offer runs", () => {
    expect(checkoutLink("consultation", true)).toBe(
      `${stripeConfig.links.consultation.url}?${PROMO_PARAM}=${LAUNCH_OFFER.promoCode}`
    );
  });

  it("refuses to render the private step 2 link", () => {
    expect(() => checkoutLink("fullPackageStep2")).toThrow(/not public/);
    expect(() => checkoutLink("fullPackageStep2", false)).toThrow(/not public/);
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
