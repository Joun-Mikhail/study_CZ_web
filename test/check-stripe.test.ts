import { readFileSync } from "node:fs";
import stripeLinks from "../stripe-links.json";
// @ts-expect-error -- plain .mjs tool without type declarations
import { checkStripe, readPricing } from "../tools/check-stripe.mjs";

const { regular, offer } = readPricing(readFileSync("src/config/pricing.ts", "utf8"));
const links = stripeLinks.links as Record<string, { url: string; public: boolean; priceEur?: number }>;
const BEFORE_END = Date.parse("2026-12-01T12:00:00Z");

function healthyStripe() {
  return {
    paymentLinks: Object.entries(links).map(([key, l]) => ({
      id: `plink_${key}`,
      url: l.url,
      active: true,
      currency: "eur",
      allow_promotion_codes: true,
      automatic_tax: { enabled: false },
      after_completion: { type: "hosted_confirmation" },
      lineItems: [{ price: { unit_amount: Math.round(regular[key] * 100), currency: "eur" } }],
    })),
    promotionCodes: [
      {
        code: "LAUNCH50",
        active: true,
        expires_at: Date.parse("2027-01-31T22:59:00Z") / 1000,
        coupon: { percent_off: 50, valid: true, redeem_by: Date.parse("2027-01-31T23:00:00Z") / 1000 },
      },
    ],
  };
}

const run = (stripe: ReturnType<typeof healthyStripe>, now = BEFORE_END, offerOverride = offer) =>
  checkStripe({ links, regular, offer: offerOverride, stripe, now }) as string[];

describe("readPricing", () => {
  it("reads prices and the offer from pricing.ts", () => {
    expect(regular.consultation).toBe(15);
    expect(regular.fullPackageStep2).toBe(200);
    expect(offer.promoCode).toBe("LAUNCH50");
    expect(offer.percentOff).toBe(50);
    expect(offer.endsAt).toBe("2027-01-31T23:59:59+01:00");
  });
});

describe("checkStripe", () => {
  it("passes when Stripe matches pricing.ts", () => {
    expect(run(healthyStripe(), BEFORE_END, { ...offer, enabled: true })).toEqual([]);
  });

  it("flags automatic tax, wrong amounts, inactive links and wrong currency", () => {
    const s = healthyStripe();
    s.paymentLinks[0].automatic_tax.enabled = true;
    s.paymentLinks[1].lineItems[0].price.unit_amount = 2000;
    s.paymentLinks[2].active = false;
    s.paymentLinks[3].currency = "czk";
    const problems = run(s);
    expect(problems.some((p) => p.includes("Collect tax automatically"))).toBe(true);
    expect(problems.some((p) => p.includes("charges 20 EUR"))).toBe(true);
    expect(problems.some((p) => p.includes("not active"))).toBe(true);
    expect(problems.some((p) => p.includes("currency is czk"))).toBe(true);
  });

  it("flags a missing link", () => {
    const s = healthyStripe();
    s.paymentLinks.pop();
    expect(run(s).some((p) => p.includes("no Payment Link with this URL"))).toBe(true);
  });

  it("checks promo codes only while the offer runs", () => {
    const s = healthyStripe();
    s.paymentLinks[0].allow_promotion_codes = false;
    s.promotionCodes = [];
    const on = { ...offer, enabled: true };
    const problems = run(s, BEFORE_END, on);
    expect(problems.some((p) => p.includes("promotion codes are not allowed"))).toBe(true);
    expect(problems.some((p) => p.includes("no active code"))).toBe(true);
    expect(run(s, Date.parse("2027-03-01T00:00:00Z"), on)).toEqual([]);
  });

  it("flags a wrong discount or end date on LAUNCH50", () => {
    const s = healthyStripe();
    s.promotionCodes[0].coupon.percent_off = 40;
    s.promotionCodes[0].expires_at = Date.parse("2027-03-01T00:00:00Z") / 1000;
    s.promotionCodes[0].coupon.redeem_by = Date.parse("2027-03-01T00:00:00Z") / 1000;
    const problems = run(s, BEFORE_END, { ...offer, enabled: true });
    expect(problems.some((p) => p.includes("40% off"))).toBe(true);
    expect(problems.some((p) => p.includes("expires 2027-03-01"))).toBe(true);
  });

  it("checks the after-payment redirect when one is configured", () => {
    const s = healthyStripe();
    const withRedirect = { ...links, course: { ...links.course, afterPaymentRedirect: "https://studyczechia.com/courses/welcome/?session_id={CHECKOUT_SESSION_ID}" } };
    const problems = checkStripe({ links: withRedirect, regular, offer, stripe: s, now: BEFORE_END }) as string[];
    expect(problems.some((p) => p.includes("after payment should redirect"))).toBe(true);
  });
});
