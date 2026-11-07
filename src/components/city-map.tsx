"use client";

import { useState } from "react";
import { ArrowRight, MapPin, X } from "lucide-react";
import Link from "@/components/locale-link";
import { SiteImage } from "@/components/site-image";
import { useTranslation } from "@/i18n/context";
import { CZ_MAP, CITY_COORDS, project } from "@/data/czech-map";
import { CITY_IMAGE } from "@/data/images";
import { CITY_AR } from "@/i18n/ar-metadata";
import { cityToSlug } from "@/lib/seo-utils";
import { cn } from "@/lib/utils";

/** The SVG's viewBox size (it starts at -24, -34), for placing HTML labels over it. */
const VIEW_W = CZ_MAP.width + 48;
const VIEW_H = CZ_MAP.height + 58;

export type MapCity = {
  name: string;
  programmes: number;
  /** Dorm rent range in CZK, only where costs.ts has a sourced figure. */
  rent?: [number, number];
};

/**
 * Interactive map of the university cities: SVG, no WebGL, no library.
 * Dot size shows the number of programmes; each city is a button that opens
 * a card with its photo, programmes, rent (where known) and its page. The map
 * itself never mirrors in Arabic (geography doesn't flip).
 */
export function CityMap({ cities, className }: { cities: MapCity[]; className?: string }) {
  const { locale } = useTranslation();
  const ar = locale === "ar";
  const [sel, setSel] = useState<string | null>(null);
  const city = cities.find((c) => c.name === sel);
  const name = (n: string) => (ar ? CITY_AR[n] ?? n : n);
  const max = Math.max(...cities.map((c) => c.programmes), 1);

  return (
    <div className={cn("relative rounded-3xl border border-border-subtle bg-surface p-3 sm:p-6", className)}>
      <div className="relative">
      <svg
        viewBox={`-24 -34 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-auto"
        role="group"
        aria-label={ar ? "خريطة مدن الجامعات في التشيك" : "Map of Czech university cities"}
      >
        <path d={CZ_MAP.path} className="fill-brand/[0.07] stroke-brand/45" strokeWidth="2" strokeLinejoin="round" />
        {cities.map((c) => {
          const coords = CITY_COORDS[c.name];
          if (!coords) return null;
          const [x, y] = project(coords[0], coords[1]);
          const r = 6 + Math.sqrt(c.programmes / max) * 14;
          const active = sel === c.name;
          const label = `${name(c.name)}: ${c.programmes} ${ar ? "برنامج" : c.programmes === 1 ? "programme" : "programmes"}`;
          return (
            <g key={c.name}>
              <circle cx={x} cy={y} r={r + 9} className="map-pulse fill-brand/15" aria-hidden="true" />
              <circle
                cx={x}
                cy={y}
                r={r}
                tabIndex={0}
                role="button"
                aria-label={label}
                aria-pressed={active}
                onClick={() => setSel(active ? null : c.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSel(active ? null : c.name);
                  }
                }}
                className={cn(
                  "cursor-pointer stroke-surface transition-[fill] duration-150 outline-none focus-visible:stroke-brand",
                  active ? "fill-accent-red" : "fill-brand hover:fill-brand-hover"
                )}
                strokeWidth="3"
              />
            </g>
          );
        })}
      </svg>
      {/* City names as HTML over the map, not SVG text: contrast checkers
          treat anything inside an SVG as an image and can't measure it. The
          circles above are the accessible buttons; these just echo the name. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {cities.map((c) => {
          const coords = CITY_COORDS[c.name];
          if (!coords || !(c.programmes >= max / 4 || sel === c.name)) return null;
          const [x, y] = project(coords[0], coords[1]);
          const r = 6 + Math.sqrt(c.programmes / max) * 14;
          return (
            <span
              key={c.name}
              onClick={() => setSel(sel === c.name ? null : c.name)}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-full cursor-pointer whitespace-nowrap rounded-lg bg-surface px-2 py-0.5 text-xs sm:text-sm font-semibold text-text-primary"
              style={{ left: `${((x + 24) / VIEW_W) * 100}%`, top: `${((y - r - 4 + 34) / VIEW_H) * 100}%` }}
            >
              {name(c.name)}
            </span>
          );
        })}
      </div>
      </div>

      <p className="mt-2 text-xs text-text-muted text-center">
        {ar ? "دوس على مدينة عشان تشوف تفاصيلها. حجم الدايرة على قد عدد البرامج." : "Tap a city for details. Bigger dots, more programmes."}
      </p>

      {city && (
        <div
          className="map-card relative mt-3 sm:mt-0 sm:absolute sm:end-6 sm:bottom-6 sm:w-80 overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-xl"
          role="dialog"
          aria-label={name(city.name)}
        >
          {CITY_IMAGE[city.name] && (
            <div className="relative h-28">
              <SiteImage id={CITY_IMAGE[city.name]} sizes="320px" decorative />
            </div>
          )}
          <button
            type="button"
            onClick={() => setSel(null)}
            aria-label={ar ? "إغلاق" : "Close"}
            className="absolute top-2 end-2 rounded-full bg-surface/90 p-1.5 text-text-secondary hover:text-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="p-4">
            <p className="flex items-center gap-1.5 font-semibold text-text-primary mb-1">
              <MapPin className="w-4 h-4 text-accent-red" aria-hidden="true" />
              {name(city.name)}
            </p>
            <p className="text-sm text-text-secondary">
              {city.programmes} {ar ? "برنامج" : city.programmes === 1 ? "programme" : "programmes"}
            </p>
            {city.rent && (
              <p className="text-sm text-text-secondary" dir="auto">
                {ar ? "سكن جامعي:" : "Dorm room:"}{" "}
                <span dir="ltr">
                  {city.rent[0].toLocaleString("en-US")}–{city.rent[1].toLocaleString("en-US")} Kč
                </span>{" "}
                {ar ? "في الشهر" : "a month"}
              </p>
            )}
            <Link href={`/study/${cityToSlug(city.name)}`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              {ar ? `ادرس في ${name(city.name)}` : `Study in ${city.name}`}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
