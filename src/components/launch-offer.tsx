"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Clock } from "lucide-react";
import {
  LAUNCH_OFFER,
  OFFER_ACTIVE,
  OFFER_END_LABEL,
  PROMO_PARAM,
  REGULAR_PRICES,
  eur,
  isOfferActiveAt,
  priceOf,
  type PriceKey,
} from "@/config/pricing";
import { cn } from "@/lib/utils";

type Locale = "en" | "ar";

/** Time left until the real end date, filled in after mount (no SSR mismatch). */
function useTimeLeft(): number | null {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = Date.parse(LAUNCH_OFFER.endsAt);
    const tick = () => setLeft(end - Date.now());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (left === null || left <= 0) return null;
  return left;
}

function formatLeft(ms: number, locale: Locale): string {
  const hours = Math.floor(ms / 3_600_000);
  const days = Math.floor(hours / 24);
  if (locale === "ar") {
    if (days >= 2) return `باقي ${days} يوم`;
    return `باقي ${Math.max(hours, 1)} ساعة`;
  }
  if (days >= 2) return `${days} days left`;
  return `${Math.max(hours, 1)} hours left`;
}

/** "Launch offer: 50% off until 31 January 2027 · 112 days left" */
export function OfferBadge({ locale, className }: { locale: Locale; className?: string }) {
  const left = useTimeLeft();
  if (!OFFER_ACTIVE) return null;
  const text =
    locale === "ar"
      ? `عرض الإطلاق: خصم ${LAUNCH_OFFER.percentOff}% لحد ${OFFER_END_LABEL.ar}`
      : `Launch offer: ${LAUNCH_OFFER.percentOff}% off until ${OFFER_END_LABEL.en}`;
  return (
    <span
      data-launch-offer
      className={cn(
        "inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-1.5 rounded-full bg-brand text-bg text-sm font-semibold",
        className
      )}
    >
      <span>{text}</span>
      {left !== null && (
        <span className="inline-flex items-center gap-1 font-medium opacity-80">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          {formatLeft(left, locale)}
        </span>
      )}
    </span>
  );
}

/**
 * Current price, with the regular price crossed out while the offer runs.
 * The data-* attributes let <OfferExpiryGuard /> restore the regular price
 * in the browser if this static page outlives the offer.
 */
export function PriceTag({
  k,
  locale,
  className,
  regularClassName,
}: {
  k: PriceKey;
  locale: Locale;
  className?: string;
  regularClassName?: string;
}) {
  const regular = eur(REGULAR_PRICES[k], locale);
  const current = eur(priceOf(k), locale);
  const reduced = current !== regular;
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={className} data-price-current data-price-regular-value={regular}>
        {current}
      </span>
      {reduced && (
        <s data-launch-offer className={cn("text-sm text-text-muted font-normal", regularClassName)}>
          {regular}
        </s>
      )}
    </span>
  );
}

/**
 * Safety net for a static site: if this build happened during the offer but
 * the end date has now passed, drop the promo code from Stripe links, show
 * regular prices and hide offer badges — even before the next rebuild.
 */
export function OfferExpiryGuard() {
  const pathname = usePathname();
  useEffect(() => {
    if (!OFFER_ACTIVE || isOfferActiveAt(Date.now())) return;
    const apply = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href*="buy.stripe.com"]').forEach((a) => {
        try {
          const url = new URL(a.href);
          if (url.searchParams.has(PROMO_PARAM)) {
            url.searchParams.delete(PROMO_PARAM);
            a.href = url.toString();
          }
        } catch {}
      });
      document.querySelectorAll<HTMLElement>("[data-price-current]").forEach((el) => {
        const regular = el.dataset.priceRegularValue;
        if (regular && el.textContent !== regular) el.textContent = regular;
      });
      document.querySelectorAll<HTMLElement>("[data-launch-offer]").forEach((el) => {
        el.style.display = "none";
      });
    };
    apply();
    const id = window.setTimeout(apply, 500);
    return () => window.clearTimeout(id);
  }, [pathname]);
  return null;
}
