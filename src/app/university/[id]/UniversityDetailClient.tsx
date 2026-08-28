"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { University } from "@/data/universities";
import { getProgrammesByUniversity } from "@/data/programmes";
import { getUniversityV2 } from "@/data/compat";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import UniversityCorrectionForm from "./UniversityCorrectionForm";
import { Globe, Mail, BookOpen, GraduationCap, Euro, Clock, FileText, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Programme } from "@/data/types";

function TrustLabel({ level, locale }: { level: string; locale: "en" | "ar" }) {
  const labels: Record<string, { en: string; ar: string; color: string }> = {
    official: { en: "Official source", ar: "مصدر رسمي", color: "text-success" },
    university: { en: "University source", ar: "مصدر جامعي", color: "text-info" },
    secondary: { en: "Secondary source", ar: "مصدر ثانوي", color: "text-amber" },
    community: { en: "Community data", ar: "بيانات المجتمع", color: "text-text-muted" },
  };
  const l = labels[level] || labels.community;
  return <span className={`text-xs ${l.color}`}>{l[locale]}</span>;
}

function ProgrammeCard({ prog, locale }: { prog: Programme; locale: "en" | "ar" }) {
  return (
    <div className="rounded-xl border border-border-subtle bg-white/[0.02] p-4 space-y-2.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-medium text-text-primary text-sm">
            {prog.name[locale] || prog.name.en}
          </h4>
          {prog.faculty && (
            <p className="text-xs text-text-muted mt-0.5">{prog.faculty}</p>
          )}
        </div>
        <div className="flex gap-1.5 shrink-0">
          <span className="px-2 py-0.5 rounded-full bg-amber/10 text-amber text-[11px] font-medium border border-amber/20">
            {prog.degree}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-[11px] border border-border-subtle">
            {prog.language}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-text-secondary">
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

      {prog.entranceExamDetails && (
        <p className="text-xs text-text-muted">
          {prog.entranceExamDetails[locale] || prog.entranceExamDetails.en}
        </p>
      )}

      {prog.applicationDeadline && (
        <p className="text-xs font-medium text-amber">
          {locale === "ar" ? "آخر موعد:" : "Deadline:"} {prog.applicationDeadline}
        </p>
      )}

      <div className="flex items-center justify-between pt-1">
        <VerifiedBadge
          date={prog.verification.lastVerified}
          sourceUrl={prog.verification.sourceUrl}
          label={locale === "ar" ? "تم التحقق:" : "Verified:"}
        />
        <a
          href={prog.programmeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-amber hover:underline"
        >
          {locale === "ar" ? "الصفحة الرسمية" : "Official page"}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default function UniversityDetailClient({ uni }: { uni: University }) {
  const { t, locale } = useTranslation();
  const uniV2 = getUniversityV2(uni.id);
  const progs = getProgrammesByUniversity(uni.id);

  return (
    <div>
      {/* University hero banner */}
      <div className="relative w-full h-[120px] sm:h-[160px] rounded-2xl overflow-hidden mb-6">
        <Image
          src="/images/prague-bridge.jpg"
          alt={`${uni.name} in ${uni.city}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/30 to-transparent" />
        <div className="absolute bottom-3 start-4 z-10">
          <span className="text-xs text-white/70">{uni.city}</span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 mb-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{uni.name}</h1>
        {uniV2 && (
          <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
            uniV2.type === "public"
              ? "bg-success/10 text-success border-success/20"
              : "bg-info/10 text-info border-info/20"
          }`}>
            {uniV2.type === "public"
              ? (locale === "ar" ? "حكومية" : "Public")
              : (locale === "ar" ? "خاصة" : "Private")}
          </span>
        )}
      </div>
      <p className="text-sm text-text-secondary mb-2">
        {uni.city}
        {uni.founded ? `, ${t.university.established} ${uni.founded}` : ""}
      </p>
      {uniV2 && (
        <VerifiedBadge
          date={uniV2.verification.lastVerified}
          sourceUrl={uniV2.verification.sourceUrl}
          label={locale === "ar" ? "تم التحقق:" : "Verified:"}
          className="mb-5"
        />
      )}

      <div className="mb-5">
        <h3 className="text-sm font-semibold text-text-primary mb-1.5 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber" />
          {t.university.overviewLabel}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">{uni.blurb[locale] || uni.blurb.en}</p>
      </div>

      {/* Programme cards (V2) or legacy list */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-amber" />
          {locale === "ar" ? "البرامج المتاحة بالإنجليزية" : "Available English-Taught Programmes"}
          {progs.length > 0 && (
            <span className="text-xs font-normal text-text-muted">({progs.length})</span>
          )}
        </h3>
        {progs.length > 0 ? (
          <div className="space-y-3">
            {progs.map((p) => (
              <ProgrammeCard key={p.id} prog={p} locale={locale} />
            ))}
          </div>
        ) : uni.programs && uni.programs.length > 0 ? (
          <ul className="space-y-2">
            {uni.programs.map((p, i) => (
              <li key={i} className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">{p.name[locale] || p.name.en}</span>
                <span className="text-xs text-text-muted ml-2">· {p.degree} · {p.language}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-border-subtle bg-white/[0.02] p-4">
            <p className="text-sm text-text-muted">
              {locale === "ar"
                ? "بنبني قاعدة بيانات البرامج من المواقع الرسمية. في الوقت الحالي، شوف البرامج على الموقع الرسمي للجامعة."
                : "We're building our programme database from official sources. For now, check programmes on the university's official website."}
            </p>
            {uni.website && (
              <a
                href={uni.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-sm text-amber hover:underline"
              >
                {locale === "ar" ? "الموقع الرسمي" : "Official website"}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>

      <div className="mb-4 space-y-2 text-sm">
        <div className="text-text-secondary">
          <span className="font-medium text-text-primary">{t.university.languagesLabel}:</span> {uni.languages.join(", ")}
        </div>
        {(uniV2?.website || uni.website) && (
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-amber" />
            <a href={uniV2?.website || uni.website} target="_blank" rel="noreferrer" className="text-amber hover:underline text-sm">
              {t.university.websiteLabel}
            </a>
          </div>
        )}
        {uniV2?.admissionsUrl && (
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-amber" />
            <a href={uniV2.admissionsUrl} target="_blank" rel="noreferrer" className="text-amber hover:underline text-sm">
              {locale === "ar" ? "صفحة القبول" : "Admissions page"}
            </a>
          </div>
        )}
        {(uniV2?.contactEmail || uni.contactEmail) && (
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-amber" />
            <a href={`mailto:${uniV2?.contactEmail || uni.contactEmail}`} className="text-amber hover:underline text-sm">
              {t.university.contactLabel}: {uniV2?.contactEmail || uni.contactEmail}
            </a>
          </div>
        )}
      </div>

      <UniversityCorrectionForm uniId={uni.id} />
    </div>
  );
}
