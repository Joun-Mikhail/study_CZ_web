"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { universities } from "@/data/universities";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";

export default function SearchClient() {
  const { locale } = useTranslation();
  const isAr = locale === "ar";
  const params = useSearchParams();
  const q = (params?.get("q") || "").trim().toLowerCase();

  const results = q
    ? universities.filter((u) => {
        return (
          u.name.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          u.fields.join(" ").toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
        {isAr ? "نتائج البحث" : "Search Results"}
      </h1>

      {q && (
        <p className="text-text-muted mb-6 text-sm">
          {isAr ? `البحث عن: "${q}"` : `Showing results for "${q}"`}
          {results.length > 0 && ` (${results.length} ${isAr ? "نتيجة" : "found"})`}
        </p>
      )}

      {q === "" ? (
        <div className="text-center py-16">
          <Search className="w-10 h-10 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">
            {isAr ? "اكتب في خانة البحث للبحث عن جامعات." : "Use the search bar above to find universities."}
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-secondary mb-2">
            {isAr ? "مفيش نتائج." : "No results found."}
          </p>
          <p className="text-text-muted text-sm">
            {isAr ? "جرب كلمات بحث مختلفة." : "Try different search terms."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {results.map((u) => (
            <Link key={u.id} href={`/university/${u.id}`} className="no-underline">
              <GlassCard hoverEffect="border">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">{u.name}</h2>
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary mt-1">
                      <MapPin className="w-3.5 h-3.5 text-text-muted" />
                      {u.city}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-text-muted text-sm line-clamp-2">{u.blurb[locale] || u.blurb.en}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {u.fields.slice(0, 4).map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-xs border border-border-subtle">{f}</span>
                  ))}
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
