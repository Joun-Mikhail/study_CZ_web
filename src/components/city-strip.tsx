"use client";

import { ArrowRight, MapPin } from "lucide-react";
import Link from "@/components/locale-link";
import { SiteImage } from "@/components/site-image";
import { useTranslation } from "@/i18n/context";
import { CITY_IMAGE } from "@/data/images";
import { CITY_AR } from "@/i18n/ar-metadata";

export type CityCard = { name: string; slug: string; programmes: number };

/** "Where students live": university cities with their photo and programme count. */
export function CityStrip({ cities }: { cities: CityCard[] }) {
  const { locale } = useTranslation();
  const ar = locale === "ar";
  return (
    <section aria-labelledby="cities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="reveal flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h2 id="cities" className="text-3xl sm:text-4xl text-text-primary mb-2">
            {ar ? "الطلاب بيعيشوا فين" : "Where students live"}
          </h2>
          <p className="text-text-secondary">
            {ar
              ? `${cities.length} ${cities.length <= 10 ? "مدن" : "مدينة"} ليها برامج على الموقع. اختار مدينة وشوف برامجها.`
              : `${cities.length} cities with programmes on this site. Pick one to see them.`}
          </p>
        </div>
        <Link href="/universities" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
          {ar ? "كل الجامعات" : "All universities"}
          <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
      <ul className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 sm:overflow-visible sm:gap-4">
        {cities.map((c) => (
          <li key={c.slug} className="reveal snap-start shrink-0 w-[44%] sm:w-auto">
            <Link
              href={`/study/${c.slug}`}
              className="card-lift group block h-full overflow-hidden rounded-2xl border border-border-subtle bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <SiteImage
                  id={CITY_IMAGE[c.name]}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                  className="transition-transform duration-500 ease-out group-hover:scale-105"
                  decorative
                  whenNear
                />
              </div>
              <div className="p-3">
                <p className="flex items-center gap-1 font-semibold text-text-primary">
                  <MapPin className="w-3.5 h-3.5 text-accent-red shrink-0" aria-hidden="true" />
                  {ar ? CITY_AR[c.name] ?? c.name : c.name}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {c.programmes} {ar ? "برنامج" : c.programmes === 1 ? "programme" : "programmes"}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
