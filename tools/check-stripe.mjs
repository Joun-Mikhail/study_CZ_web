#!/usr/bin/env node
// Checks every Stripe Payment Link in stripe-links.json against the prices in
// src/config/pricing.ts, through the Stripe API (read-only key, no SDK).
//
//   STRIPE_READ_KEY=rk_live_... node tools/check-stripe.mjs
//
// The key needs READ access to: Checkout Sessions, Payment Links, Prices,
// Products, Coupons, Promotion Codes. Nothing else.
// Exits 1 when any check fails, 2 when it can't run (no key, Stripe error).
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.stripe.com/v1";
// Pinned so the response shapes below (e.g. promotion_code.coupon) don't shift.
const STRIPE_VERSION = "2024-06-20";

/** Reads REGULAR_PRICES and LAUNCH_OFFER from pricing.ts without running it. */
export function readPricing(source) {
  const block = /export const REGULAR_PRICES = \{([\s\S]*?)\} as const;/.exec(source);
  if (!block) throw new Error("REGULAR_PRICES not found in pricing.ts");
  const regular = {};
  for (const m of block[1].matchAll(/^\s*(\w+):\s*([\d.]+),/gm)) regular[m[1]] = Number(m[2]);
  const offer = /export const LAUNCH_OFFER = \{([\s\S]*?)\} as const;/.exec(source);
  if (!offer) throw new Error("LAUNCH_OFFER not found in pricing.ts");
  const field = (name) => new RegExp(`${name}:\\s*("?)([^",\\n]+)\\1`).exec(offer[1])?.[2];
  return {
    regular,
    offer: {
      enabled: field("enabled") === "true",
      percentOff: Number(field("percentOff")),
      endsAt: field("endsAt"),
      promoCode: field("promoCode"),
    },
  };
}

/**
 * Pure checks. `links` is stripe-links.json's `links`; `stripe` holds what the
 * API returned: { paymentLinks: [{ id, url, active, currency, allow_promotion_codes,
 * automatic_tax, after_completion, lineItems: [{ price: { unit_amount, currency } }] }],
 * promotionCodes: [{ code, active, expires_at, coupon: { percent_off, valid, redeem_by } }] }.
 * Returns a list of human-readable problems (empty = all good).
 */
export function checkStripe({ links, regular, offer, stripe, now = Date.now() }) {
  const problems = [];
  const byUrl = new Map(stripe.paymentLinks.map((l) => [l.url, l]));
  const offerOn = offer.enabled && now <= Date.parse(offer.endsAt);

  for (const [key, entry] of Object.entries(links)) {
    const label = `${key} (${entry.url})`;
    const link = byUrl.get(entry.url);
    if (!link) {
      problems.push(`${label}: no Payment Link with this URL in the Stripe account`);
      continue;
    }
    if (!link.active) problems.push(`${label}: link is not active`);
    if ((link.currency ?? "").toLowerCase() !== "eur") problems.push(`${label}: currency is ${link.currency}, expected eur`);
    if (link.automatic_tax?.enabled) problems.push(`${label}: "Collect tax automatically" is on`);
    if (offerOn && entry.public && !link.allow_promotion_codes) {
      problems.push(`${label}: promotion codes are not allowed, but the launch offer is on`);
    }

    const expected = regular[key];
    if (expected === undefined) {
      problems.push(`${label}: no REGULAR_PRICES entry in pricing.ts`);
    } else if (link.lineItems.length !== 1) {
      problems.push(`${label}: expected 1 line item, found ${link.lineItems.length}`);
    } else {
      const price = link.lineItems[0].price ?? {};
      if (price.unit_amount !== Math.round(expected * 100)) {
        problems.push(`${label}: charges ${(price.unit_amount ?? 0) / 100} EUR, pricing.ts says ${expected}`);
      }
      if ((price.currency ?? "").toLowerCase() !== "eur") problems.push(`${label}: price currency is ${price.currency}`);
    }
    if (entry.priceEur !== undefined && entry.priceEur !== expected) {
      problems.push(`${label}: stripe-links.json says ${entry.priceEur} EUR, pricing.ts says ${expected}`);
    }

    if (entry.afterPaymentRedirect) {
      const done = link.after_completion ?? {};
      if (done.type !== "redirect" || done.redirect?.url !== entry.afterPaymentRedirect) {
        problems.push(`${label}: after payment should redirect to ${entry.afterPaymentRedirect}`);
      }
    }
  }

  if (offerOn) {
    const code = stripe.promotionCodes.find((p) => p.code.toUpperCase() === offer.promoCode.toUpperCase() && p.active);
    if (!code) {
      problems.push(`promotion code ${offer.promoCode}: no active code with this name`);
    } else {
      if (code.coupon?.percent_off !== offer.percentOff) {
        problems.push(`promotion code ${offer.promoCode}: ${code.coupon?.percent_off}% off, expected ${offer.percentOff}%`);
      }
      if (code.coupon && code.coupon.valid === false) problems.push(`promotion code ${offer.promoCode}: its coupon is no longer valid`);
      const ends = Math.min(code.expires_at ?? Infinity, code.coupon?.redeem_by ?? Infinity) * 1000;
      const dayMs = 24 * 60 * 60 * 1000;
      if (!Number.isFinite(ends) || Math.abs(ends - Date.parse(offer.endsAt)) > dayMs) {
        const shown = Number.isFinite(ends) ? new Date(ends).toISOString() : "never";
        problems.push(`promotion code ${offer.promoCode}: expires ${shown}, expected ${offer.endsAt} (±1 day)`);
      }
    }
  }
  return problems;
}

async function stripeGet(pathAndQuery, key) {
  const res = await fetch(`${API}${pathAndQuery}`, {
    headers: { Authorization: `Bearer ${key}`, "Stripe-Version": STRIPE_VERSION },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`Stripe ${pathAndQuery.split("?")[0]}: ${res.status} ${body.error?.message ?? ""}`.trim());
  }
  return res.json();
}

async function listAll(pathname, key, extra = "") {
  const items = [];
  let after = "";
  for (let page = 0; page < 20; page++) {
    const list = await stripeGet(`${pathname}?limit=100${extra}${after ? `&starting_after=${after}` : ""}`, key);
    items.push(...list.data);
    if (!list.has_more || list.data.length === 0) break;
    after = list.data[list.data.length - 1].id;
  }
  return items;
}

export async function fetchStripeState(urls, promoCode, key) {
  const all = await listAll("/payment_links", key);
  const wanted = all.filter((l) => urls.includes(l.url));
  const paymentLinks = [];
  for (const link of wanted) {
    const items = await stripeGet(`/payment_links/${link.id}/line_items?limit=10`, key);
    paymentLinks.push({ ...link, lineItems: items.data });
  }
  const promotionCodes = (await stripeGet(`/promotion_codes?code=${encodeURIComponent(promoCode)}&limit=10`, key)).data;
  return { paymentLinks, promotionCodes };
}

async function main() {
  const key = process.env.STRIPE_READ_KEY?.trim();
  if (!key) {
    console.error("check-stripe: STRIPE_READ_KEY is not set");
    process.exit(2);
  }
  const { links } = JSON.parse(readFileSync(path.join(ROOT, "stripe-links.json"), "utf8"));
  const { regular, offer } = readPricing(readFileSync(path.join(ROOT, "src/config/pricing.ts"), "utf8"));
  let stripe;
  try {
    stripe = await fetchStripeState(Object.values(links).map((l) => l.url), offer.promoCode, key);
  } catch (err) {
    console.error(`check-stripe: could not read Stripe: ${err.message}`);
    process.exit(2);
  }
  const problems = checkStripe({ links, regular, offer, stripe });
  if (problems.length === 0) {
    console.log(`check-stripe: all ${Object.keys(links).length} links match pricing.ts${offer.enabled ? `, ${offer.promoCode} OK` : ""}`);
    return;
  }
  console.log(`check-stripe: ${problems.length} problem(s)`);
  for (const p of problems) console.log(`- ${p}`);
  process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) await main();
