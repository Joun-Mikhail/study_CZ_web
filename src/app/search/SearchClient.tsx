"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "@/components/locale-link";
import { localizeHref } from "@/i18n/paths";
import { CITY_AR, DEGREE_VALUE_AR, FIELD_AR, LANGUAGE_AR } from "@/i18n/ar-metadata";
import { searchSite, universityOf, type PageResult } from "@/lib/site-search";
import { Search, MapPin, GraduationCap, FileText, CircleHelp } from "lucide-react";

/** Results that are plain pages (guides, services, Q&A answers): title plus one line of context. */
function PageResults({ id, heading, items, isAr, icon: Icon }: {
  id: string;
  heading: string;
  items: PageResult[];
  isAr: boolean;
  icon: typeof FileText;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-lg font-semibold text-text-primary mb-3">
        {heading} ({items.length})
      </h2>
      <div className="grid gap-3">
        {items.map((p) => (
          <Link key={p.href} href={p.href} className="no-underline">
            <GlassCard hoverEffect="border">
              <h3 className="flex items-start gap-2 text-base font-semibold text-text-primary">
                <Icon className="w-4 h-4 mt-1 shrink-0 text-text-muted" aria-hidden="true" />
                {isAr ? p.title.ar : p.title.en}
              </h3>
              <p className="mt-1 ps-6 text-text-muted text-sm line-clamp-2">{isAr ? p.description.ar : p.description.en}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Search box that reloads this page with ?q=, so results work without client routing. */
function SearchForm({ query, isAr }: { query: string; isAr: boolean }) {
  return (
    <form action={localizeHref("/search/", isAr ? "ar" : "en")} method="get" role="search" className="mb-6">
      <label htmlFor="site-search-q" className="sr-only">
        {isAr ? "ابحث" : "Search"}
      </label>
      <div className="relative">
        <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" aria-hidden="true" />
        <input
          // Remount when the URL query changes, so the box shows the current search.
          key={query}
          id="site-search-q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder={isAr ? "جامعة، برنامج، مدينة، تأشيرة، سكن..." : "University, programme, city, visa, housing..."}
          className="w-full ps-12 pe-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:border-brand focus:shadow-[0_0_0_4px_rgba(17,69,126,0.12)]"
          autoComplete="off"
        />
      </div>
    </form>
  );
}

export default function SearchClient() {
  const { locale } = useTranslation();
  const isAr = locale === "ar";
  const params = useSearchParams();
  const query = (params?.get("q") || "").trim();

  // Filtering is cheap, but memoise so typing elsewhere on the page doesn't redo it.
  const results = useMemo(() => searchSite(query), [query]);
  const total = results.universities.length + results.programmes.length + results.pages.length + results.qa.length;

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
        {isAr ? "نتائج البحث" : "Search Results"}
      </h1>

      <SearchForm query={query} isAr={isAr} />

      {query && (
        <p className="text-text-muted mb-6 text-sm" aria-live="polite">
          <bdi>{isAr ? `البحث عن: "${query}"` : `Showing results for "${query}"`}</bdi>
          {total > 0 && ` (${total} ${isAr ? "نتيجة" : "found"})`}
        </p>
      )}

      {query === "" ? (
        <div className="text-center py-16">
          <Search className="w-10 h-10 text-text-muted mx-auto mb-4" aria-hidden="true" />
          <p className="text-text-secondary">
            {isAr ? "اكتب اسم جامعة أو برنامج أو مدينة، أو موضوع زي التأشيرة أو السكن." : "Type a university, programme or city, or a topic like visa or housing."}
          </p>
        </div>
      ) : total === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-secondary mb-2">{isAr ? "مفيش نتائج." : "No results found."}</p>
          <p className="text-text-muted text-sm mb-6">
            {isAr
              ? "جرب اسم مدينة (برنو)، تخصص (الطب)، اسم جامعة أو موضوع (السكن)."
              : "Try a city (Brno), a field (Medicine), a university name or a topic (housing)."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/universities/" className="text-brand underline underline-offset-4">
              {isAr ? "كل الجامعات" : "All universities"}
            </Link>
            <Link href="/programmes/" className="text-brand underline underline-offset-4">
              {isAr ? "كل البرامج" : "All programmes"}
            </Link>
            <Link href="/qa/" className="text-brand underline underline-offset-4">
              {isAr ? "أسئلة وأجوبة" : "Q&A"}
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {results.universities.length > 0 && (
            <section aria-labelledby="results-universities">
              <h2 id="results-universities" className="text-lg font-semibold text-text-primary mb-3">
                {isAr ? "الجامعات" : "Universities"} ({results.universities.length})
              </h2>
              <div className="grid gap-4">
                {results.universities.map((u) => (
                  <Link key={u.id} href={`/university/${u.id}/`} className="no-underline">
                    <GlassCard hoverEffect="border">
                      <h3 className="text-lg font-semibold text-text-primary">{isAr ? u.nameAr ?? u.name : u.name}</h3>
                      <div className="flex items-center gap-1.5 text-sm text-text-secondary mt-1">
                        <MapPin className="w-3.5 h-3.5 text-text-muted" aria-hidden="true" />
                        {isAr ? CITY_AR[u.city] ?? u.city : u.city}
                      </div>
                      <p className="mt-2 text-text-muted text-sm line-clamp-2">{u.blurb[locale] || u.blurb.en}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {u.fields.slice(0, 4).map((f) => (
                          <span key={f} className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-xs border border-border-subtle">
                            {isAr ? FIELD_AR[f] ?? f : f}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.programmes.length > 0 && (
            <section aria-labelledby="results-programmes">
              <h2 id="results-programmes" className="text-lg font-semibold text-text-primary mb-3">
                {isAr ? "البرامج" : "Programmes"} ({results.programmes.length})
              </h2>
              <div className="grid gap-3">
                {results.programmes.map((p) => {
                  const uni = universityOf(p);
                  const uniName = uni ? (isAr ? uni.nameAr ?? uni.name : uni.name) : "";
                  const city = uni ? (isAr ? CITY_AR[uni.city] ?? uni.city : uni.city) : "";
                  const degree = isAr ? DEGREE_VALUE_AR[p.degree] ?? p.degree : p.degree;
                  const language = isAr ? LANGUAGE_AR[p.language] ?? p.language : p.language;
                  return (
                    <Link key={p.id} href={`/programmes/${p.id}/`} className="no-underline">
                      <GlassCard hoverEffect="border">
                        <h3 className="text-base font-semibold text-text-primary">{p.name[locale] || p.name.en}</h3>
                        <div className="flex items-center gap-1.5 text-sm text-text-secondary mt-1">
                          <GraduationCap className="w-3.5 h-3.5 text-text-muted shrink-0" aria-hidden="true" />
                          {[degree, language].join(" · ")}
                        </div>
                        {uni && (
                          <div className="flex items-center gap-1.5 text-sm text-text-muted mt-1">
                            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            {uniName}{isAr ? "، " : ", "}{city}
                          </div>
                        )}
                      </GlassCard>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <PageResults
            id="results-pages"
            heading={isAr ? "الصفحات والأدلة" : "Pages"}
            items={results.pages}
            isAr={isAr}
            icon={FileText}
          />
          <PageResults
            id="results-qa"
            heading={isAr ? "أسئلة وأجوبة" : "Q&A"}
            items={results.qa}
            isAr={isAr}
            icon={CircleHelp}
          />
        </div>
      )}
    </main>
  );
}
