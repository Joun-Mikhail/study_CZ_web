"use client";

import { useMemo } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GlassCard } from "@/components/ui/glass-card";
import { SaveProgrammeButton } from "@/components/ui/save-programme-button";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { programmes, filterProgrammes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme } from "@/data/types";
import {
  GraduationCap,
  Euro,
  Clock,
  MapPin,
  FileText,
  ExternalLink,
  Building2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function ProgrammeRow({ prog, locale }: { prog: Programme; locale: "en" | "ar" }) {
  const uni = universitiesV2.find((u) => u.id === prog.universityId);
  return (
    <GlassCard className="group" hoverEffect="border">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/programmes/${prog.id}`} className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-text-primary group-hover:text-amber transition-colors">
            {prog.name[locale] || prog.name.en}
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            {uni?.name} {prog.faculty ? `· ${prog.faculty}` : ""}
          </p>
        </Link>
        <SaveProgrammeButton programmeId={prog.id} locale={locale} />
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <GraduationCap className="w-3 h-3 text-amber/70" />
          {prog.degree}
        </span>
        <span className="inline-flex items-center gap-1">
          <Euro className="w-3 h-3 text-amber/70" />
          €{prog.tuitionEurPerYear.toLocaleString()}/{locale === "ar" ? "سنة" : "yr"}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3 h-3 text-text-muted" />
          {prog.durationYears} {locale === "ar" ? "سنوات" : prog.durationYears === 1 ? "year" : "years"}
        </span>
        {prog.entranceExam && (
          <span className="inline-flex items-center gap-1">
            <FileText className="w-3 h-3 text-text-muted" />
            {locale === "ar" ? "امتحان قبول" : "Entrance exam"}
          </span>
        )}
      </div>
      {prog.applicationDeadline && (
        <p className="text-xs font-medium text-amber mt-2">
          {locale === "ar" ? "آخر موعد:" : "Deadline:"} {prog.applicationDeadline}
        </p>
      )}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle">
        <VerifiedBadge
          date={prog.verification.lastVerified}
          sourceUrl={prog.verification.sourceUrl}
          label={locale === "ar" ? "تم التحقق:" : "Verified:"}
        />
        <Link
          href={`/programmes/${prog.id}`}
          className="text-xs text-amber hover:underline inline-flex items-center gap-1"
        >
          {locale === "ar" ? "التفاصيل" : "Details"} <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </GlassCard>
  );
}

type Props = {
  type: "field" | "city";
  value: string;
  slug: string;
};

export default function StudyPageClient({ type, value, slug }: Props) {
  const { locale } = useTranslation();

  const uniLookup = useMemo(
    () => universitiesV2.map((u) => ({ id: u.id, city: u.city, type: u.type, name: u.name })),
    []
  );

  const filtered = useMemo(() => {
    if (type === "field") return filterProgrammes({ field: value }, uniLookup);
    return filterProgrammes({ city: value }, uniLookup);
  }, [type, value, uniLookup]);

  const heading =
    type === "field"
      ? locale === "ar"
        ? `دراسة ${value} في جمهورية التشيك`
        : `Study ${value} in Czech Republic`
      : locale === "ar"
      ? `الدراسة في ${value}`
      : `Study in ${value}`;

  const description =
    type === "field"
      ? locale === "ar"
        ? `${filtered.length} برنامج ${value} موثق متاح باللغة الإنجليزية في الجامعات التشيكية.`
        : `${filtered.length} verified ${value} programme${filtered.length !== 1 ? "s" : ""} taught in English at Czech universities.`
      : locale === "ar"
      ? `${filtered.length} برنامج متاح في ${value}.`
      : `${filtered.length} programme${filtered.length !== 1 ? "s" : ""} available in ${value}.`;

  const unisInScope = useMemo(() => {
    const ids = [...new Set(filtered.map((p) => p.universityId))];
    return ids.map((id) => universitiesV2.find((u) => u.id === id)!).filter(Boolean);
  }, [filtered]);

  const tuitionRange = useMemo(() => {
    if (filtered.length === 0) return null;
    const fees = filtered.map((p) => p.tuitionEurPerYear);
    return { min: Math.min(...fees), max: Math.max(...fees) };
  }, [filtered]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <Breadcrumbs
          items={[
            { label: locale === "ar" ? "البرامج" : "Programmes", href: "/programmes" },
            { label: heading },
          ]}
        />

        <div className="relative w-full h-[120px] sm:h-[160px] rounded-2xl overflow-hidden mb-6">
          <Image
            src="/images/university-campus.jpg"
            alt={heading}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/30 to-transparent" />
          <div className="absolute bottom-4 start-4 z-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{heading}</h1>
            <p className="text-xs text-white/70 mt-1">{description}</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <GlassCard className="text-center py-3">
            <div className="text-2xl font-bold text-amber">{filtered.length}</div>
            <div className="text-xs text-text-muted">
              {locale === "ar" ? "برامج" : "Programmes"}
            </div>
          </GlassCard>
          <GlassCard className="text-center py-3">
            <div className="text-2xl font-bold text-text-primary">{unisInScope.length}</div>
            <div className="text-xs text-text-muted">
              {locale === "ar" ? "جامعات" : "Universities"}
            </div>
          </GlassCard>
          {tuitionRange && (
            <GlassCard className="text-center py-3 col-span-2 sm:col-span-1">
              <div className="text-lg font-bold text-text-primary">
                €{tuitionRange.min.toLocaleString()} – €{tuitionRange.max.toLocaleString()}
              </div>
              <div className="text-xs text-text-muted">
                {locale === "ar" ? "نطاق الرسوم / سنة" : "Tuition range / yr"}
              </div>
            </GlassCard>
          )}
        </div>

        {/* Universities in this scope */}
        {unisInScope.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-3">
              {type === "field"
                ? locale === "ar"
                  ? `جامعات تقدم ${value}`
                  : `Universities offering ${value}`
                : locale === "ar"
                ? `جامعات في ${value}`
                : `Universities in ${value}`}
            </h2>
            <div className="flex flex-wrap gap-2">
              {unisInScope.map((u) => (
                <Link
                  key={u.id}
                  href={`/university/${u.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-border-subtle text-xs text-text-secondary hover:text-amber hover:border-amber/30 transition-colors"
                >
                  <Building2 className="w-3 h-3" />
                  {u.name}
                  <span className="text-text-muted">· {u.city}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Programme list */}
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          {locale === "ar" ? "كل البرامج" : "All Programmes"}
        </h2>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <ProgrammeRow key={p.id} prog={p} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <GraduationCap className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-sm text-text-secondary">
              {locale === "ar"
                ? "لا توجد برامج حاليًا في هذا التصنيف. قاعدة بياناتنا تنمو."
                : "No programmes in this category yet. Our database is growing."}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <MagneticButton variant="primary" size="md" href="/programmes">
            <GraduationCap className="w-4 h-4" />
            {locale === "ar" ? "تصفح كل البرامج" : "Browse All Programmes"}
          </MagneticButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}
