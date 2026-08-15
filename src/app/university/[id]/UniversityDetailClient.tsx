"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { University } from "@/data/universities";
import UniversityCorrectionForm from "./UniversityCorrectionForm";

export default function UniversityDetailClient({ uni }: { uni: University }) {
  const { t, locale } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{uni.name}</h3>
      <p className="text-sm text-text-secondary mb-3">{uni.city} — {uni.founded ? `Established ${uni.founded}` : ""}</p>

      <div className="mb-4">
        <p className="text-text-primary font-medium">{t.university.overviewLabel}</p>
        <p className="text-text-secondary mt-1">{uni.blurb[locale] || uni.blurb.en}</p>
      </div>

      <div className="mb-4">
        <p className="text-text-primary font-medium">{t.university.programsLabel}</p>
        {uni.programs && uni.programs.length > 0 ? (
          <ul className="text-text-secondary mt-1 space-y-2">
            {uni.programs.map((p, i) => (
              <li key={i}>
                <div className="font-medium">{p.name[locale] || p.name.en} <span className="text-xs text-text-muted">· {p.degree} · {p.language}</span></div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-text-secondary mt-1">{uni.fields.join(", ")}</p>
        )}
      </div>

      <div className="mb-4 text-sm text-text-muted">
        <div><strong>{t.university.languagesLabel}:</strong> {uni.languages.join(", ")}</div>
        {uni.website && (
          <div className="mt-2">
            <a href={uni.website} target="_blank" rel="noreferrer" className="text-amber hover:underline">{t.university.websiteLabel}</a>
          </div>
        )}
        {uni.contactEmail && (
          <div className="mt-2">
            <a href={`mailto:${uni.contactEmail}`} className="text-amber hover:underline">{t.university.contactLabel}: {uni.contactEmail}</a>
          </div>
        )}
      </div>
      <UniversityCorrectionForm uniId={uni.id} />
    </div>
  );
}
