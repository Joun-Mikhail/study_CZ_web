import stripeConfig from "../../stripe-links.json";

/**
 * Launch offer: 50% off every paid product until a real end date.
 *
 * EU price-indication rules (Omnibus Directive) require the crossed-out
 * "regular" price to be a price actually charged in the 30 days before the
 * reduction — REGULAR_PRICES below are those prices. The end date must be
 * real: when it passes, the offer switches off on its own (build time AND in
 * the browser via <OfferExpiryGuard />), and the Stripe coupon behind
 * LAUNCH50 stops redeeming on the same date.
 *
 * `enabled` must stay false until the Stripe side is ready:
 *   1. A 50% coupon (duration: once, redeem by the end date below)
 *   2. A promotion code `LAUNCH50` on that coupon
 *   3. "Allow promotion codes" turned on for every payment link
 * Otherwise the site would show half prices while Stripe charges full ones.
 */
export const LAUNCH_OFFER = {
  enabled: false,
  percentOff: 50,
  /** Last moment the offer is valid, Prague time. */
  endsAt: "2026-12-31T23:59:59+01:00",
  promoCode: "LAUNCH50",
} as const;

export const OFFER_END_LABEL = { en: "31 December 2026", ar: "31 ديسمبر 2026" } as const;

/** Prices actually charged before the launch offer (EUR). */
export const REGULAR_PRICES = {
  consultation: 15,
  documentReview: 25,
  arrivalSupport: 29,
  interviewPrep: 39,
  course: 49,
  fullPackageStep1: 150,
  fullPackageStep2: 200,
} as const;

export type PriceKey = keyof typeof REGULAR_PRICES;

const BUILT_AT = Number(process.env.NEXT_PUBLIC_BUILT_AT) || Date.now();

export function isOfferActiveAt(time: number): boolean {
  return LAUNCH_OFFER.enabled && time <= Date.parse(LAUNCH_OFFER.endsAt);
}

/** Whether the offer was live when this static site was built. */
export const OFFER_ACTIVE = isOfferActiveAt(BUILT_AT);

function discounted(amount: number): number {
  return Math.round(amount * (100 - LAUNCH_OFFER.percentOff)) / 100;
}

export function priceOf(key: PriceKey, active: boolean = OFFER_ACTIVE): number {
  const regular = REGULAR_PRICES[key];
  return active ? discounted(regular) : regular;
}

export function fullPackageTotal(active: boolean = OFFER_ACTIVE): number {
  return priceOf("fullPackageStep1", active) + priceOf("fullPackageStep2", active);
}

/** "€7.50" in English, "7.50€" in Arabic — matches the site's existing style. */
export function eur(amount: number, locale: "en" | "ar" = "en"): string {
  const n = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return locale === "ar" ? `${n}€` : `€${n}`;
}

/** Display price for a product at build time, e.g. price("course") → "€24.50". */
export function price(key: PriceKey, locale: "en" | "ar" = "en"): string {
  return eur(priceOf(key), locale);
}

export function regularPrice(key: PriceKey, locale: "en" | "ar" = "en"): string {
  return eur(REGULAR_PRICES[key], locale);
}

/** Approximate Czech-crown value, rounded to 5 Kč (1 EUR ≈ 25 Kč). */
export function czk(amount: number): string {
  return `≈ ${Math.round((amount * 25) / 5) * 5} Kč`;
}

type StripeLinkKey = keyof typeof stripeConfig.links;

function baseStripeLink(key: StripeLinkKey): string {
  const entry = stripeConfig.links[key];
  if (!entry.public) {
    throw new Error(`Stripe link "${key}" is not public and must not be rendered on the site`);
  }
  return entry.url;
}

export const PROMO_PARAM = "prefilled_promo_code";

/** Stripe payment link, with the launch code pre-filled while the offer runs. */
export function checkoutLink(key: StripeLinkKey): string {
  const base = baseStripeLink(key);
  return OFFER_ACTIVE ? `${base}?${PROMO_PARAM}=${LAUNCH_OFFER.promoCode}` : base;
}
