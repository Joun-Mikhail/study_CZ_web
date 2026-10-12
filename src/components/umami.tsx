"use client";

import Script from "next/script";
import { useEffect } from "react";
import stripeConfig from "../../stripe-links.json";

/**
 * Cookieless analytics (Umami). No cookie banner needed, nothing personal is
 * stored. Set NEXT_PUBLIC_UMAMI_WEBSITE_ID on Netlify to switch it on.
 *
 * Clicks on Stripe and WhatsApp links are tracked automatically, so no button
 * needs its own tracking code. Tools call track() when a student finishes.
 */
const STRIPE_PRODUCT_BY_URL = new Map<string, string>(
  Object.entries(stripeConfig.links).map(([key, entry]) => [entry.url, key])
);

type UmamiWindow = Window & {
  umami?: { track: (event: string, data?: Record<string, string | number>) => void };
};

export function track(event: string, data?: Record<string, string | number>) {
  try {
    (window as UmamiWindow).umami?.track(event, data);
  } catch {}
}

const startedTools = new Set<string>();

/** First real interaction with a tool; counted once per page load. */
export function trackToolStarted(tool: string) {
  if (startedTools.has(tool)) return;
  startedTools.add(tool);
  track("tool_started", { tool });
}

export default function Umami() {
  const id = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  useEffect(() => {
    if (!id) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      // Help-sheet triggers are Stripe links only as a no-JS fallback; with JS
      // they open the sheet (help_sheet_open), so they aren't a checkout click.
      if (!link || link.getAttribute("aria-haspopup") === "dialog") return;
      const href = link.href;
      const page = window.location.pathname;
      // `data-source` on the link or a parent names the tool or section the
      // click came from (e.g. "eligibility:documents"); otherwise the page.
      const source = (link.closest("[data-source]") as HTMLElement | null)?.dataset.source ?? page;
      if (href.includes("buy.stripe.com")) {
        const base = href.split("?")[0];
        track("checkout_click", { product: STRIPE_PRODUCT_BY_URL.get(base) ?? "unknown", page, source });
      } else if (href.includes("wa.me/")) {
        track("whatsapp_click", { page });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [id]);

  if (!id) return null;
  return <Script src="https://cloud.umami.is/script.js" data-website-id={id} strategy="afterInteractive" />;
}
