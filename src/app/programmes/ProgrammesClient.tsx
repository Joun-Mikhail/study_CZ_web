"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GlassCard } from "@/components/ui/glass-card";
import { SaveProgrammeButton } from "@/components/ui/save-programme-button";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { FadeIn } from "@/components/ui/fade-in";
import {
  programmes,
  filterProgrammes,
  PROGRAMME_FIELDS,
  type ProgrammeFilterOpts,
} from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme, City } from "@/data/types";
import {
  Search,
  SlidersHorizontal,
  GraduationCap,
  Euro,
  Clock,
  FileText,
  ExternalLink,
  X,
  Bookmark,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CITIES: City[] = [
  "Prague", "Brno", "Olomouc", "Ostrava", "Plzeň",
  "Hradec Králové", "Liberec", "Pardubice", "Zlín",
  "České Budějovice", "Opava", "Jihlava",
];

const TUITION_RANGES = [
  { label: "Under €3,000", max: 3000 },
  { label: "Under €5,000", max: 5000 },
  { label: "Under €8,000", max: 8000 },
  { label: "Under €12,000", max: 12000 },
];

function ProgrammeCard({ prog, locale, index }: { prog: Programme; locale: "en" | "ar"; index: number }) {
  const uni = universitiesV2.find((u) => u.id === prog.universityId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.4 }}
    >
      <GlassCard className="group relative card-shine overflow-hidden" hoverEffect="border">
        <div className="absolute top-0 end-0 w-20 h-20 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <circle cx="60" cy="20" r="50" stroke="currentColor" strokeWidth="0.5" className="text-amber" />
            <circle cx="60" cy="20" r="30" stroke="currentColor" strokeWidth="0.5" className="text-amber" />
          </svg>
        </div>

        <div className="flex items-start justify-between gap-3">
          <Link href={`/programmes/${prog.id}`} className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-text-primary group-hover:text-amber transition-colors duration-300">
              {prog.name[locale] || prog.name.en}
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              {uni?.name} {prog.faculty ? `· ${prog.faculty}` : ""}
            </p>
          </Link>
          <SaveProgrammeButton programmeId={prog.id} locale={locale} />
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-2 py-0.5 rounded-full bg-amber/10 text-amber text-[11px] font-medium border border-amber/20">
            {prog.degree}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-[11px] border border-border-subtle">
            {prog.language}
          </span>
          {uni && (
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-[11px] border border-border-subtle">
              {uni.city}
            </span>
          )}
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
            className="text-xs text-amber hover:underline inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
          >
            {locale === "ar" ? "التفاصيل" : "Details"}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function ProgrammesClient({
  initialField,
  initialCity,
  initialDegree,
}: {
  initialField?: string;
  initialCity?: string;
  initialDegree?: string;
}) {
  const { locale } = useTranslation();
  const [search, setSearch] = useState("");
  const [field, setField] = useState(initialField || "");
  const [city, setCity] = useState(initialCity || "");
  const [degree, setDegree] = useState(initialDegree || "");
  const [maxTuition, setMaxTuition] = useState<number | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(!!(initialField || initialCity || initialDegree));

  const uniLookup = useMemo(
    () => universitiesV2.map((u) => ({ id: u.id, city: u.city, type: u.type, name: u.name })),
    []
  );

  const filtered = useMemo(() => {
    const opts: ProgrammeFilterOpts = {};
    if (field) opts.field = field;
    if (city) opts.city = city;
    if (degree) opts.degree = degree;
    if (maxTuition) opts.maxTuition = maxTuition;
    if (search) opts.search = search;
    return filterProgrammes(opts, uniLookup);
  }, [field, city, degree, maxTuition, search, uniLookup]);

  const activeFilters = [field, city, degree, maxTuition].filter(Boolean).length;

  const clearFilters = () => {
    setField("");
    setCity("");
    setDegree("");
    setMaxTuition(undefined);
    setSearch("");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <Breadcrumbs items={[{ label: locale === "ar" ? "البرامج" : "Programmes" }]} />

        <div className="relative w-full h-[120px] sm:h-[160px] rounded-2xl overflow-hidden mb-6">
          <Image
            src="/images/university-campus.jpg"
            alt="University campus"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/30 to-transparent" />
          <div className="absolute bottom-4 start-4 z-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {locale === "ar" ? "استكشف البرامج" : "Explore Programmes"}
            </h1>
            <p className="text-xs text-white/70 mt-1">
              {locale === "ar"
                ? `قاعدة بياناتنا تنمو — حاليًا ${programmes.length} برنامج موثق`
                : `Our database is growing — currently covering ${programmes.length} verified programmes`}
            </p>
          </div>
        </div>

        {/* Search + filter bar */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1 group">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-amber pointer-events-none transition-colors duration-200" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={locale === "ar" ? "ابحث عن برنامج أو جامعة..." : "Search programmes or universities..."}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-white/5 border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber/40 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)] transition-all duration-200"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
              showFilters || activeFilters > 0
                ? "bg-amber/10 text-amber border-amber/30"
                : "bg-white/5 text-text-secondary border-border-subtle hover:border-amber/30"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFilters > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber text-white text-[10px] font-bold">
                {activeFilters}
              </span>
            )}
          </button>
          <Link
            href="/my-journey"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 border border-border-subtle text-sm text-text-secondary hover:text-amber hover:border-amber/30 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">{locale === "ar" ? "رحلتي" : "My Journey"}</span>
          </Link>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-xl bg-white/[0.02] border border-border-subtle backdrop-blur-sm">
            <div>
              <label className="text-xs text-text-muted mb-1 block">
                {locale === "ar" ? "المجال" : "Field"}
              </label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-subtle text-sm text-text-primary focus:outline-none focus:border-amber/40"
              >
                <option value="">{locale === "ar" ? "الكل" : "All fields"}</option>
                {PROGRAMME_FIELDS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">
                {locale === "ar" ? "المدينة" : "City"}
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-subtle text-sm text-text-primary focus:outline-none focus:border-amber/40"
              >
                <option value="">{locale === "ar" ? "الكل" : "All cities"}</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">
                {locale === "ar" ? "الدرجة" : "Degree"}
              </label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-subtle text-sm text-text-primary focus:outline-none focus:border-amber/40"
              >
                <option value="">{locale === "ar" ? "الكل" : "All degrees"}</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">
                {locale === "ar" ? "الرسوم" : "Tuition"}
              </label>
              <select
                value={maxTuition || ""}
                onChange={(e) => setMaxTuition(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-subtle text-sm text-text-primary focus:outline-none focus:border-amber/40"
              >
                <option value="">{locale === "ar" ? "أي سعر" : "Any price"}</option>
                {TUITION_RANGES.map((r) => (
                  <option key={r.max} value={r.max}>{r.label}</option>
                ))}
              </select>
            </div>
            {activeFilters > 0 && (
              <button
                onClick={clearFilters}
                className="col-span-2 sm:col-span-4 text-xs text-text-muted hover:text-amber flex items-center gap-1 justify-center"
              >
                <X className="w-3 h-3" /> {locale === "ar" ? "امسح الفلتر" : "Clear all filters"}
              </button>
            )}
          </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-sm text-text-muted mb-4">
          {locale === "ar"
            ? `${filtered.length} برنامج`
            : `${filtered.length} programme${filtered.length !== 1 ? "s" : ""}`}
          {activeFilters > 0 || search
            ? (locale === "ar" ? " (بعد الفلتر)" : " (filtered)")
            : ""}
        </p>

        {/* Programme grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((prog, i) => (
              <ProgrammeCard key={prog.id} prog={prog} locale={locale} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <GraduationCap className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {locale === "ar" ? "مفيش نتايج" : "No programmes found"}
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              {locale === "ar"
                ? "جرب تغيّر الفلتر أو تدور بكلمات تانية."
                : "Try adjusting your filters or search terms."}
            </p>
            <button onClick={clearFilters} className="text-sm text-amber hover:underline">
              {locale === "ar" ? "امسح الفلتر" : "Clear filters"}
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
