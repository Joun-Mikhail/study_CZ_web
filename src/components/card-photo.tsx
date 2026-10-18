"use client";

import type { ReactNode } from "react";
import { SiteImage } from "@/components/site-image";
import { universityImage, type ImageId } from "@/data/images";
import { universitiesV2 } from "@/data/universities-v2";
import { CITY_AR } from "@/i18n/ar-metadata";
import { cn } from "@/lib/utils";

/** A university's building photo, else its city's (both from the image registry). */
export function photoForUniversity(universityId: string): ImageId | undefined {
  const uni = universitiesV2.find((u) => u.id === universityId);
  return universityImage(universityId, uni?.city);
}

/** Dark pill for the bottom of a photo (city, year): white on solid navy. */
export function PhotoTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
      {children}
    </span>
  );
}

/** "3 years" / "3 سنوات", with the Arabic dual and singular. */
export function yearsLabel(n: number, locale: "en" | "ar"): string {
  if (locale === "ar") return n === 1 ? "سنة" : n === 2 ? "سنتين" : n <= 10 ? `${n} سنوات` : `${n} سنة`;
  return `${n} ${n === 1 ? "year" : "years"}`;
}

export function cityName(city: string, locale: "en" | "ar"): string {
  return locale === "ar" ? CITY_AR[city] ?? city : city;
}

/**
 * Pill that sits on a photo: navy text on solid white. Solid (not see-through)
 * so contrast checkers can measure it; text straight on a photo can't be.
 */
export function PhotoPill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-ink shadow-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Photo strip across the top of a card. The photo is decorative (the card's
 * text names the place), loads only when near the viewport, and on hover
 * eases in a little while a light sheen crosses it (both off with reduced
 * motion). `children` are laid over the photo: a top row and a bottom row.
 * Pass negative margins in `className` to bleed to the card's edges.
 */
export function CardPhoto({
  id,
  className,
  height = "h-32",
  top,
  bottom,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px",
}: {
  id?: ImageId;
  className?: string;
  height?: string;
  top?: ReactNode;
  bottom?: ReactNode;
  sizes?: string;
}) {
  return (
    <div className={cn("card-photo relative overflow-hidden", height, className)}>
      {id ? (
        <SiteImage id={id} sizes={sizes} decorative whenNear className="card-photo-img" />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 bg-mesh" />
      )}
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/5" />
      <span aria-hidden="true" className="card-photo-shine" />
      {(top || bottom) && (
        <div className="absolute inset-0 flex flex-col justify-between p-3">
          <div className="flex items-start justify-between gap-2">{top}</div>
          <div className="flex items-end justify-between gap-2 text-white">{bottom}</div>
        </div>
      )}
    </div>
  );
}
