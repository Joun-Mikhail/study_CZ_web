"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import {
  Stethoscope,
  Laptop,
  Briefcase,
  FlaskConical,
  Hammer,
  Scale,
  TreePine,
  BookOpen,
  GraduationCap,
  Euro,
  MapPin,
  X,
} from "lucide-react";

type Univ = {
  id: string;
  name: string;
  city: string;
  fields: string[];
  tuitionEurPerYear?: [number, number];
  degreeLevels?: string[];
  founded?: string | number;
  blurb?: { en?: string; ar?: string };
};

const fieldCategories = [
  { key: "Medicine", icon: Stethoscope, en: "Medicine & Health", ar: "الطب والصحة", matchFields: ["Medicine", "Health Sciences"] },
  { key: "IT", icon: Laptop, en: "IT & Computer Science", ar: "تكنولوجيا المعلومات", matchFields: ["IT"] },
  { key: "Business", icon: Briefcase, en: "Business & Economics", ar: "الأعمال والاقتصاد", matchFields: ["Business", "Finance", "Economics", "Logistics"] },
  { key: "Engineering", icon: Hammer, en: "Engineering", ar: "الهندسة", matchFields: ["Engineering", "Architecture", "Robotics", "Mining", "Transport"] },
  { key: "Sciences", icon: FlaskConical, en: "Natural Sciences", ar: "العلوم الطبيعية", matchFields: ["Sciences", "Chemistry", "Biochemistry", "Biology", "Food Science"] },
  { key: "Law", icon: Scale, en: "Law & Social Sciences", ar: "القانون والعلوم الاجتماعية", matchFields: ["Law", "Social Sciences", "International Relations", "Media"] },
  { key: "Agriculture", icon: TreePine, en: "Agriculture & Environment", ar: "الزراعة والبيئة", matchFields: ["Agriculture", "Environmental Science", "Forestry", "Fisheries"] },
  { key: "Humanities", icon: BookOpen, en: "Humanities & Arts", ar: "الآداب والفنون", matchFields: ["Humanities", "Education", "Art", "Design", "Textiles"] },
];

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
  const [category, setCategory] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [sort, setSort] = useState<"name" | "founded" | "tuition">("name");
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

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of fieldCategories) {
      counts[cat.key] = initialList.filter((u) =>
        u.fields.some((f) => cat.matchFields.map((m) => m.toLowerCase()).includes(f.toLowerCase()))
      ).length;
    }
    return counts;
  }, [initialList]);

  const filtered = useMemo(() => {
    const term = (q || "").trim().toLowerCase();
    const activeCat = fieldCategories.find((c) => c.key === category);

    let items = initialList.filter((u) => {
      if (term) {
        const hay = `${u.name} ${u.city} ${u.fields.join(" ")}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      if (city && u.city !== city) return false;
      if (field && !u.fields.map((f) => f.toLowerCase()).includes(field.toLowerCase())) return false;
      if (activeCat && !u.fields.some((f) => activeCat.matchFields.map((m) => m.toLowerCase()).includes(f.toLowerCase()))) return false;
      if (degree && !(u.degreeLevels || []).includes(degree)) return false;
      return true;
    });

    items.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "tuition") {
        const at = a.tuitionEurPerYear ? a.tuitionEurPerYear[0] : 0;
        const bt = b.tuitionEurPerYear ? b.tuitionEurPerYear[0] : 0;
        return at - bt;
      }
      const af = a.founded ? Number(a.founded) : 0;
      const bf = b.founded ? Number(b.founded) : 0;
      return bf - af;
    });

    return items;
  }, [initialList, q, city, field, category, degree, sort]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  const hasActiveFilters = q || city || field || category || degree;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Browse by Study Field */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          {isAr ? "تصفح حسب التخصص" : "Browse by Study Field"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {fieldCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = category === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setCategory(isActive ? "" : cat.key);
                  setField("");
                  setPage(1);
                }}
                className={`group flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? "border-amber/60 bg-amber/10 text-amber"
                    : "border-border-subtle bg-white/[0.02] text-text-secondary hover:border-amber/30 hover:bg-white/[0.04]"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-amber" : "text-text-muted group-hover:text-amber/70"} transition-colors`} />
                <span className="text-sm font-medium text-center leading-tight">{isAr ? cat.ar : cat.en}</span>
                <span className={`text-xs ${isActive ? "text-amber/70" : "text-text-muted"}`}>
                  {categoryCounts[cat.key]} {isAr ? "جامعة" : "unis"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder={isAr ? "ابحث بالاسم، المدينة، التخصص..." : "Search by name, city, field..."}
            className="rounded-lg px-3 py-2 border border-border-subtle bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select value={city} onChange={(e) => { setCity(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm">
            <option value="">{isAr ? "كل المدن" : "All cities"}</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select value={field} onChange={(e) => { setField(e.target.value); setCategory(""); setPage(1); }} className="px-3 py-2 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm">
            <option value="">{isAr ? "كل التخصصات" : "All fields"}</option>
            {fields.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <select value={degree} onChange={(e) => { setDegree(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm">
            <option value="">{isAr ? "كل المستويات" : "All degrees"}</option>
            <option value="Bachelor">{isAr ? "بكالوريوس" : "Bachelor"}</option>
            <option value="Master">{isAr ? "ماجستير" : "Master"}</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="px-3 py-2 rounded-lg border border-border-subtle bg-transparent text-text-secondary text-sm">
            <option value="name">{isAr ? "ترتيب: الاسم" : "Sort: Name"}</option>
            <option value="founded">{isAr ? "ترتيب: سنة التأسيس" : "Sort: Founded"}</option>
            <option value="tuition">{isAr ? "ترتيب: الرسوم" : "Sort: Tuition"}</option>
          </select>
        </div>
      </div>

      {/* Active filters summary + clear */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-text-muted text-sm">
          {total} {isAr ? "جامعة" : total === 1 ? "university" : "universities"}
          {category && (
            <span className="inline-flex items-center gap-1 mx-1.5 px-2 py-0.5 rounded-full bg-amber/10 text-amber text-xs border border-amber/20">
              {isAr ? fieldCategories.find((c) => c.key === category)?.ar : fieldCategories.find((c) => c.key === category)?.en}
              <button onClick={() => setCategory("")} className="hover:text-amber/70"><X className="w-3 h-3" /></button>
            </span>
          )}
        </p>
        {hasActiveFilters && (
          <button
            onClick={() => { setQ(""); setCity(""); setField(""); setCategory(""); setDegree(""); setPage(1); }}
            className="text-xs text-text-muted hover:text-amber transition-colors"
          >
            {isAr ? "مسح الفلاتر" : "Clear all filters"}
          </button>
        )}
      </div>

      {/* University cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map((u) => (
          <Link key={u.id} href={`/university/${u.id}`} className="no-underline">
            <GlassCard hoverEffect="lift" className="p-5 h-full flex flex-col">
              <h2 className="text-lg font-semibold text-text-primary leading-snug">{u.name}</h2>

              <div className="flex items-center gap-3 mt-2 text-sm text-text-secondary">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-text-muted" />
                  {u.city}
                </span>
                {u.founded && (
                  <span className="text-text-muted">est. {u.founded}</span>
                )}
              </div>

              {u.tuitionEurPerYear && (
                <div className="flex items-center gap-1.5 mt-2 text-sm">
                  <Euro className="w-3.5 h-3.5 text-amber/70" />
                  <span className="text-text-secondary">
                    {u.tuitionEurPerYear[0].toLocaleString()}&ndash;{u.tuitionEurPerYear[1].toLocaleString()} EUR/{isAr ? "سنة" : "yr"}
                  </span>
                </div>
              )}

              <p className="mt-2 text-text-muted text-sm line-clamp-2 flex-grow">{u.blurb?.[locale] || u.blurb?.en}</p>

              {/* Degree badges */}
              {u.degreeLevels && u.degreeLevels.length > 0 && (
                <div className="flex items-center gap-1.5 mt-3">
                  <GraduationCap className="w-3.5 h-3.5 text-text-muted" />
                  {u.degreeLevels.map((d) => (
                    <span key={d} className="px-2 py-0.5 rounded-full bg-amber/10 text-amber text-[11px] font-medium border border-amber/20">
                      {isAr ? (d === "Bachelor" ? "بكالوريوس" : "ماجستير") : d}
                    </span>
                  ))}
                </div>
              )}

              {/* Field tags */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
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

      {/* Pagination */}
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

      {/* CTA between results */}
      {total > 0 && (
        <div className="mt-12 text-center border border-border-subtle rounded-2xl p-8 bg-white/[0.02]">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {isAr ? "لا تعرف أي جامعة تناسبك؟" : "Not sure which university fits you?"}
          </h3>
          <p className="text-text-muted text-sm mb-4">
            {isAr
              ? "جرّب أداة المطابقة المجانية — أجب عن 3 أسئلة واحصل على توصيات مخصصة."
              : "Try the free matcher tool -- answer 3 questions and get personalized recommendations."}
          </p>
          <Link
            href="/university-matcher"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber/10 text-amber border border-amber/20 text-sm font-medium hover:bg-amber/20 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            {isAr ? "جرّب أداة المطابقة" : "Try University Matcher"}
          </Link>
        </div>
      )}
    </main>
  );
}
