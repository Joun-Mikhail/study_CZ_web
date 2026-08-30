"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { PROGRAMME_FIELDS } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { fieldToSlug, cityToSlug } from "@/lib/seo-utils";
import {
  GraduationCap,
  MapPin,
  TrendingDown,
  FileX,
  ArrowRight,
} from "lucide-react";

type Props = {
  locale: "en" | "ar";
  exclude?: { type: "field" | "city" | "intent"; value: string };
};

export function SeoCrosslinks({ locale, exclude }: Props) {
  const cities = [...new Set(universitiesV2.map((u) => u.city))];

  const popularFields = PROGRAMME_FIELDS.slice(0, 6).filter(
    (f) => !(exclude?.type === "field" && exclude.value === f)
  );

  const popularCities = cities.slice(0, 5).filter(
    (c) => !(exclude?.type === "city" && exclude.value === c)
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
                <p className="text-sm font-medium text-text-primary group-hover:text-amber transition-colors">
                  {locale === "ar" ? "أرخص البرامج" : "Cheapest Programmes"}
                </p>
                <p className="text-xs text-text-muted">
                  {locale === "ar" ? "مرتب حسب الرسوم" : "Sorted by tuition"}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-amber transition-colors" />
            </GlassCard>
          </Link>
        ) : null}
        {exclude?.type !== "intent" || exclude.value !== "no-exam" ? (
          <Link href="/study/no-entrance-exam" className="group">
            <GlassCard className="flex items-center gap-3 py-3" hoverEffect="border">
              <FileX className="w-5 h-5 text-accent shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary group-hover:text-amber transition-colors">
                  {locale === "ar" ? "بدون امتحان قبول" : "No Entrance Exam"}
                </p>
                <p className="text-xs text-text-muted">
                  {locale === "ar" ? "تقديم بالمستندات فقط" : "Document-based admission"}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-amber transition-colors" />
            </GlassCard>
          </Link>
        ) : null}
      </div>

      {/* Field links */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wider">
          {locale === "ar" ? "حسب المجال" : "By Field"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularFields.map((f) => (
            <Link
              key={f}
              href={`/study/${fieldToSlug(f)}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-border-subtle text-xs text-text-secondary hover:text-amber hover:border-amber/30 transition-colors"
            >
              <GraduationCap className="w-3 h-3" />
              {f}
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
          {popularCities.map((c) => (
            <Link
              key={c}
              href={`/study/${cityToSlug(c)}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-border-subtle text-xs text-text-secondary hover:text-amber hover:border-amber/30 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
