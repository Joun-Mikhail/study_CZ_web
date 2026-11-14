"use client";

import Link from "@/components/locale-link";
import { GlassCard } from "@/components/ui/glass-card";
import { PROGRAMME_FIELDS } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { fieldToSlug, cityToSlug, degreeToSlug, studyPageIndexable } from "@/lib/seo-utils";
import { CITY_AR, DEGREE_VALUE_AR, FIELD_AR } from "@/i18n/ar-metadata";
import { ApplicantGuides } from "@/components/applicant-guides";
import {
  GraduationCap,
  MapPin,
  TrendingDown,
  ArrowRight,
} from "lucide-react";

type Props = {
  locale: "en" | "ar";
  exclude?: { type: "field" | "city" | "degree" | "intent"; value: string };
};

export function SeoCrosslinks({ locale, exclude }: Props) {
  const ar = locale === "ar";

  // Every field and city hub that has programmes, so each one is linked from
  // every other study page; empty (noindexed) hubs are left out.
  const fields = PROGRAMME_FIELDS.filter(
    (f) => studyPageIndexable(fieldToSlug(f)) && !(exclude?.type === "field" && exclude.value === f)
  );

  const cities = [...new Set(universitiesV2.map((u) => u.city))].filter(
    (c) => studyPageIndexable(cityToSlug(c)) && !(exclude?.type === "city" && exclude.value === c)
  );

  return (
    <div className="mt-12 pt-8 border-t border-border-subtle">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        {locale === "ar" ? "اكتشف المزيد" : "Discover More"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Intent pages */}
        {exclude?.type !== "intent" || exclude.value !== "cheapest" ? (
          <Link href="/study/cheapest-programmes" className="group">
            <GlassCard className="flex items-center gap-3 py-3" hoverEffect="border">
              <TrendingDown className="w-5 h-5 text-success shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary group-hover:text-brand transition-colors">
                  {locale === "ar" ? "أرخص البرامج" : "Cheapest Programmes"}
                </p>
                <p className="text-xs text-text-muted">
                  {locale === "ar" ? "مرتب حسب الرسوم" : "Sorted by tuition"}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors" />
            </GlassCard>
          </Link>
        ) : null}
      </div>

      {/* Degree links */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wider">
          {locale === "ar" ? "حسب الدرجة" : "By Degree"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {(["Bachelor", "Master"] as const)
            .filter((d) => !(exclude?.type === "degree" && exclude.value === d))
            .map((d) => (
              <Link
                key={d}
                href={`/study/${degreeToSlug(d)}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-border-subtle text-xs text-text-secondary hover:text-brand hover:border-brand/30 transition-colors"
              >
                <GraduationCap className="w-3 h-3" />
                {ar ? DEGREE_VALUE_AR[d] : d}
              </Link>
            ))}
        </div>
      </div>

      {/* Field links */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wider">
          {locale === "ar" ? "حسب المجال" : "By Field"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {fields.map((f) => (
            <Link
              key={f}
              href={`/study/${fieldToSlug(f)}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-border-subtle text-xs text-text-secondary hover:text-brand hover:border-brand/30 transition-colors"
            >
              <GraduationCap className="w-3 h-3" />
              {ar ? FIELD_AR[f] ?? f : f}
            </Link>
          ))}
        </div>
      </div>

      {/* City links */}
      <div>
        <h3 className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wider">
          {locale === "ar" ? "حسب المدينة" : "By City"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {cities.map((c) => (
            <Link
              key={c}
              href={`/study/${cityToSlug(c)}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-border-subtle text-xs text-text-secondary hover:text-brand hover:border-brand/30 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              {ar ? CITY_AR[c] ?? c : c}
            </Link>
          ))}
        </div>
      </div>

      <ApplicantGuides />
    </div>
  );
}
