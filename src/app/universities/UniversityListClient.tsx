"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";

type Univ = {
  id: string;
  name: string;
  city: string;
  fields: string[];
  founded?: string | number;
  blurb?: { en?: string; ar?: string };
};

export default function UniversityListClient({
  initialList,
  initialQ,
  cities,
  fields,
}: {
  initialList: Univ[];
  initialQ?: string;
  cities: string[];
  fields: string[];
}) {
  const { locale } = useTranslation();
  const isAr = locale === "ar";
  const [q, setQ] = useState(initialQ || "");
  const [city, setCity] = useState<string>("");
  const [field, setField] = useState<string>("");
  const [sort, setSort] = useState<"name" | "founded">("name");
  const [page, setPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get("q");
      const cityParam = params.get("city");
      const fieldParam = params.get("field");
      if (qParam && qParam !== q) setQ(qParam);
      if (cityParam && cityParam !== city) setCity(cityParam);
      if (fieldParam && fieldParam !== field) setField(fieldParam);
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (q) url.searchParams.set("q", q);
      else url.searchParams.delete("q");
      if (city) url.searchParams.set("city", city);
      else url.searchParams.delete("city");
      if (field) url.searchParams.set("field", field);
      else url.searchParams.delete("field");
      window.history.replaceState({}, "", url.toString());
    } catch (e) {
      // ignore
    }
  }, [q, city, field]);

  const filtered = useMemo(() => {
    const term = (q || "").trim().toLowerCase();
    let items = initialList.filter((u) => {
      if (term) {
        const hay = `${u.name} ${u.city} ${u.fields.join(" ")}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      if (city && u.city !== city) return false;
      if (field && !u.fields.map((f) => f.toLowerCase()).includes(field.toLowerCase())) return false;
      return true;
    });

    items.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      const af = a.founded ? Number(a.founded) : 0;
      const bf = b.founded ? Number(b.founded) : 0;
      return bf - af;
    });

    return items;
  }, [initialList, q, city, field, sort]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder={isAr ? "ابحث بالاسم، المدينة، التخصص..." : "Search by name, city, field..."}
            className="rounded-lg px-3 py-2 border border-border-subtle bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber/50"
          />
        </div>

        <div className="flex items-center gap-3">
          <select value={city} onChange={(e) => { setCity(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm">
            <option value="">{isAr ? "كل المدن" : "All cities"}</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select value={field} onChange={(e) => { setField(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm">
            <option value="">{isAr ? "كل التخصصات" : "All fields"}</option>
            {fields.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="px-3 py-2 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm">
            <option value="name">{isAr ? "ترتيب: الاسم" : "Sort: Name"}</option>
            <option value="founded">{isAr ? "ترتيب: سنة التأسيس" : "Sort: Founded"}</option>
          </select>
        </div>
      </div>

      <p className="text-text-muted mb-4">
        {total} {isAr ? "جامعة" : "universities"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map((u) => (
          <Link key={u.id} href={`/university/${u.id}`} className="no-underline">
            <GlassCard hoverEffect="lift" className="p-4 h-full">
              <h2 className="text-lg font-semibold text-text-primary">{u.name}</h2>
              <div className="text-sm text-text-secondary mt-1">{u.city} {u.founded ? `— ${u.founded}` : ""}</div>
              <p className="mt-2 text-text-muted text-sm line-clamp-3">{u.blurb?.[locale] || u.blurb?.en}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {u.fields.slice(0, 4).map((f) => (
                  <span key={f} className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-xs border border-border-subtle">{f}</span>
                ))}
                {u.fields.length > 4 && (
                  <span className="px-2 py-0.5 text-xs text-text-muted">+{u.fields.length - 4}</span>
                )}
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 disabled:opacity-40 border border-border-subtle rounded-xl text-sm text-text-secondary hover:text-text-primary hover:border-amber/30 transition-colors"
            >
              {isAr ? "السابق" : "Previous"}
            </button>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="px-4 py-2 border border-border-subtle rounded-xl text-sm text-text-secondary hover:text-text-primary hover:border-amber/30 disabled:opacity-40 transition-colors"
            >
              {isAr ? "التالي" : "Next"}
            </button>
          </div>
          <div className="text-sm text-text-muted">
            {isAr ? `صفحة ${page} من ${pages}` : `Page ${page} of ${pages}`}
          </div>
        </div>
      )}
    </main>
  );
}
