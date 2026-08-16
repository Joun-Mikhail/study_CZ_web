"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { University } from "@/data/universities";
import UniversityCorrectionForm from "./UniversityCorrectionForm";
import { Globe, Mail, BookOpen, GraduationCap } from "lucide-react";

export default function UniversityDetailClient({ uni }: { uni: University }) {
  const { t, locale } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">{uni.name}</h1>
      <p className="text-sm text-text-secondary mb-6">
        {uni.city}
        {uni.founded ? ` — ${t.university.established} ${uni.founded}` : ""}
      </p>

      <div className="mb-5">
        <h3 className="text-sm font-semibold text-text-primary mb-1.5 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber" />
          {t.university.overviewLabel}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">{uni.blurb[locale] || uni.blurb.en}</p>
      </div>

      <div className="mb-5">
        <h3 className="text-sm font-semibold text-text-primary mb-1.5 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-amber" />
          {t.university.programsLabel}
        </h3>
        {uni.programs && uni.programs.length > 0 ? (
          <ul className="space-y-2">
            {uni.programs.map((p, i) => (
              <li key={i} className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">{p.name[locale] || p.name.en}</span>
                <span className="text-xs text-text-muted ml-2">· {p.degree} · {p.language}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-text-secondary">{uni.fields.join(", ")}</p>
        )}
      </div>

      <div className="mb-4 space-y-2 text-sm">
        <div className="text-text-secondary">
          <span className="font-medium text-text-primary">{t.university.languagesLabel}:</span> {uni.languages.join(", ")}
        </div>
        {uni.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-amber" />
            <a href={uni.website} target="_blank" rel="noreferrer" className="text-amber hover:underline text-sm">{t.university.websiteLabel}</a>
          </div>
        )}
        {uni.contactEmail && (
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-amber" />
            <a href={`mailto:${uni.contactEmail}`} className="text-amber hover:underline text-sm">{t.university.contactLabel}: {uni.contactEmail}</a>
          </div>
        )}
      </div>

      <UniversityCorrectionForm uniId={uni.id} />
    </div>
  );
}
