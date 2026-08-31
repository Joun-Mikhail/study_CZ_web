"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { University } from "@/data/universities";
import { getProgrammesByUniversity } from "@/data/programmes";
import { getUniversityV2 } from "@/data/compat";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeIn } from "@/components/ui/fade-in";
import { SaveProgrammeButton } from "@/components/ui/save-programme-button";
import UniversityCorrectionForm from "./UniversityCorrectionForm";
import {
  Globe, Mail, BookOpen, GraduationCap, Euro, Clock, FileText,
  ExternalLink, ArrowRight, MapPin, Calendar, Building2, Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Programme } from "@/data/types";

function ProgrammeCard({ prog, locale, index }: { prog: Programme; locale: "en" | "ar"; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.06, 0.5), duration: 0.4 }}
    >
      <GlassCard className="group relative card-shine overflow-hidden" hoverEffect="border">
        <div className="absolute top-0 end-0 w-16 h-16 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="48" cy="16" r="40" stroke="currentColor" strokeWidth="0.5" className="text-amber" />
          </svg>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <Link href={`/programmes/${prog.id}`} className="block">
              <h4 className="font-medium text-text-primary text-sm group-hover:text-amber transition-colors duration-300">
                {prog.name[locale] || prog.name.en}
              </h4>
            </Link>
            {prog.faculty && (
              <p className="text-xs text-text-muted mt-0.5">{prog.faculty}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="px-2 py-0.5 rounded-full bg-amber/10 text-amber text-[11px] font-medium border border-amber/20">
              {prog.degree}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-[11px] border border-border-subtle">
              {prog.language}
            </span>
            <SaveProgrammeButton programmeId={prog.id} locale={locale} />
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-text-secondary">
          <span className="inline-flex items-center gap-1">
            <Euro className="w-3 h-3 text-amber/70" />
            €{prog.tuitionEurPerYear.toLocaleString()} {locale === "ar" ? "في السنة" : "per year"}
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

        {prog.entranceExamDetails && (
          <p className="text-xs text-text-muted mt-2">
            {prog.entranceExamDetails[locale] || prog.entranceExamDetails.en}
          </p>
        )}

        {prog.applicationDeadline && (
          <p className="text-xs font-medium text-amber mt-2 inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {locale === "ar" ? "آخر موعد:" : "Deadline:"} {prog.applicationDeadline}
          </p>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle">
          <VerifiedBadge
            date={prog.verification.lastVerified}
            sourceUrl={prog.verification.sourceUrl}
            label={locale === "ar" ? "تم التحقق:" : "Verified:"}
          />
          <div className="flex items-center gap-3">
            <Link
              href={`/programmes/${prog.id}`}
              className="inline-flex items-center gap-1 text-xs text-amber hover:underline opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              {locale === "ar" ? "التفاصيل" : "Details"}
              <ArrowRight className="w-3 h-3" />
            </Link>
            <a
              href={prog.programmeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary"
            >
              {locale === "ar" ? "الصفحة الرسمية" : "Official page"}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function QuickStat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-border-subtle">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber/10 shrink-0">
        <Icon className="w-4 h-4 text-amber" />
      </div>
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-sm font-medium text-text-primary">{value}</p>
      </div>
    </div>
  );
}

export default function UniversityDetailClient({ uni }: { uni: University }) {
  const { t, locale } = useTranslation();
  const uniV2 = getUniversityV2(uni.id);
  const progs = getProgrammesByUniversity(uni.id);

  const tuitionRange = uni.tuitionEurPerYear;
  const tuitionText = tuitionRange[0] === tuitionRange[1]
    ? `€${tuitionRange[0].toLocaleString()}`
    : `€${tuitionRange[0].toLocaleString()} – €${tuitionRange[1].toLocaleString()}`;

  return (
    <div>
      {/* Hero banner with parallax-like gradient */}
      <FadeIn>
        <div className="relative w-full h-[160px] sm:h-[200px] rounded-2xl overflow-hidden mb-6">
          <Image
            src="/images/prague-bridge.jpg"
            alt={`${uni.name} in ${uni.city}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/40 to-midnight/10" />
          <div className="absolute inset-0 noise-overlay opacity-[0.03]" />

          {/* Decorative glow */}
          <div className="absolute -bottom-8 start-1/4 w-40 h-20 bg-amber/20 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute bottom-4 start-4 end-4 z-10">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-xs text-white/70">{uni.city}</span>
                  {uni.founded && (
                    <>
                      <span className="text-white/30">·</span>
                      <span className="text-xs text-white/70">
                        {t.university.established} {uni.founded}
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">{uni.name}</h1>
              </div>
              {uniV2 && (
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm ${
                  uniV2.type === "public"
                    ? "bg-success/20 text-success border-success/30"
                    : uniV2.type === "state"
                    ? "bg-info/20 text-info border-info/30"
                    : "bg-amber/20 text-amber border-amber/30"
                }`}>
                  {uniV2.type === "public"
                    ? (locale === "ar" ? "حكومية" : "Public")
                    : uniV2.type === "state"
                    ? (locale === "ar" ? "حكومية" : "State")
                    : (locale === "ar" ? "خاصة" : "Private")}
                </span>
              )}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Verification badge */}
      {uniV2 && (
        <FadeIn delay={0.1}>
          <VerifiedBadge
            date={uniV2.verification.lastVerified}
            sourceUrl={uniV2.verification.sourceUrl}
            label={locale === "ar" ? "تم التحقق:" : "Verified:"}
            className="mb-5"
          />
        </FadeIn>
      )}

      {/* Quick stats grid */}
      <FadeIn delay={0.15}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <QuickStat
            icon={MapPin}
            label={locale === "ar" ? "المدينة" : "City"}
            value={uni.city}
          />
          <QuickStat
            icon={Euro}
            label={locale === "ar" ? "الرسوم/السنة" : "Tuition/year"}
            value={tuitionText}
          />
          <QuickStat
            icon={GraduationCap}
            label={locale === "ar" ? "البرامج" : "Programmes"}
            value={progs.length > 0 ? `${progs.length} ${locale === "ar" ? "برنامج" : "listed"}` : (locale === "ar" ? "قريبًا" : "Coming soon")}
          />
          <QuickStat
            icon={Building2}
            label={locale === "ar" ? "النوع" : "Type"}
            value={uniV2?.type === "public" ? (locale === "ar" ? "حكومية" : "Public") : (locale === "ar" ? "خاصة" : "Private")}
          />
        </div>
      </FadeIn>

      {/* Overview section */}
      <FadeIn delay={0.2}>
        <GlassCard className="mb-6">
          <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber" />
            {t.university.overviewLabel}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">{uni.blurb[locale] || uni.blurb.en}</p>

          {/* Quick links */}
          <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-border-subtle">
            {(uniV2?.website || uni.website) && (
              <a href={uniV2?.website || uni.website} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber hover:underline">
                <Globe className="w-3.5 h-3.5" />
                {t.university.websiteLabel}
              </a>
            )}
            {uniV2?.admissionsUrl && (
              <a href={uniV2.admissionsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber hover:underline">
                <FileText className="w-3.5 h-3.5" />
                {locale === "ar" ? "صفحة القبول" : "Admissions"}
              </a>
            )}
            {(uniV2?.contactEmail || uni.contactEmail) && (
              <a href={`mailto:${uniV2?.contactEmail || uni.contactEmail}`}
                className="inline-flex items-center gap-1.5 text-xs text-amber hover:underline">
                <Mail className="w-3.5 h-3.5" />
                {uniV2?.contactEmail || uni.contactEmail}
              </a>
            )}
          </div>
        </GlassCard>
      </FadeIn>

      {/* Programme cards */}
      <FadeIn delay={0.25}>
        <div className="mb-6">
          <h3 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber/10">
              <GraduationCap className="w-4 h-4 text-amber" />
            </div>
            {locale === "ar" ? "البرامج المتاحة بالإنجليزية" : "English-Taught Programmes"}
            {progs.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber/10 text-amber text-xs font-medium border border-amber/20">
                {progs.length}
              </span>
            )}
          </h3>
          {progs.length > 0 ? (
            <div className="space-y-3">
              {progs.map((p, i) => (
                <ProgrammeCard key={p.id} prog={p} locale={locale} index={i} />
              ))}
            </div>
          ) : uni.programs && uni.programs.length > 0 ? (
            <div className="space-y-2">
              {uni.programs.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.3 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-border-subtle hover:border-amber/20 transition-colors"
                >
                  <div>
                    <span className="font-medium text-text-primary text-sm">{p.name[locale] || p.name.en}</span>
                    <div className="flex gap-1.5 mt-1">
                      <span className="px-1.5 py-0.5 rounded bg-amber/10 text-amber text-[10px] font-medium">{p.degree}</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-text-muted text-[10px]">{p.language}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
                </motion.div>
              ))}
            </div>
          ) : (
            <GlassCard className="relative overflow-hidden">
              <div className="absolute top-0 end-0 w-24 h-24 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-bl from-amber/5 to-transparent rounded-bl-full" />
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber/10 shrink-0">
                  <Sparkles className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">
                    {locale === "ar"
                      ? "بنبني قاعدة بيانات البرامج من المواقع الرسمية. في الوقت الحالي، شوف البرامج على الموقع الرسمي للجامعة."
                      : "We're building our programme database from official sources. For now, check programmes on the university's official website."}
                  </p>
                  {uni.website && (
                    <a
                      href={uni.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-amber/10 text-sm text-amber hover:bg-amber/20 transition-colors"
                    >
                      {locale === "ar" ? "الموقع الرسمي" : "Visit official website"}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </FadeIn>

      {/* Additional info */}
      <FadeIn delay={0.3}>
        <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-border-subtle">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
            <div>
              <span className="font-medium text-text-primary">{t.university.languagesLabel}:</span>{" "}
              {uni.languages.join(", ")}
            </div>
            {uni.fields && uni.fields.length > 0 && (
              <div>
                <span className="font-medium text-text-primary">{locale === "ar" ? "المجالات:" : "Fields:"}</span>{" "}
                {uni.fields.slice(0, 5).join(", ")}
                {uni.fields.length > 5 && ` +${uni.fields.length - 5}`}
              </div>
            )}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.35}>
        <UniversityCorrectionForm uniId={uni.id} />
      </FadeIn>
    </div>
  );
}
