"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { FadeIn } from "@/components/ui/fade-in";
import { SaveProgrammeButton } from "@/components/ui/save-programme-button";
import Link from "next/link";
import {
  Search,
  GraduationCap,
  Euro,
  MapPin,
  Clock,
  ExternalLink,
  X,
  ChevronDown,
  Building2,
  BookOpen,
  Filter,
  GitCompareArrows,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { filterProgrammes, getDeadlineStatus, PROGRAMME_FIELDS } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme, DeadlineStatus } from "@/data/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "programmes" | "universities";

type UniInfo = (typeof universitiesV2)[number];

const labels = {
  en: {
    programmes: "Programmes",
    universities: "Universities",
    search: "Search programmes, universities, fields...",
    searchUni: "Search universities...",
    allDegrees: "All degrees",
    allFields: "All fields",
    allCities: "All cities",
    allTypes: "Public & Private",
    allExam: "Any exam status",
    allDeadlines: "Any deadline status",
    maxTuition: "Max tuition",
    publicUni: "Public",
    privateUni: "Private",
    noExam: "No entrance exam",
    hasExam: "Entrance exam",
    clearFilters: "Clear all filters",
    filters: "Filters",
    perYear: " per year",
    noResults: "No programmes match your filters.",
    noResultsHint: "Try increasing your tuition limit, selecting \"Either language\", or removing the city filter.",
    noUniResults: "No universities match your filters.",
    showing: "programmes",
    showingUnis: "universities",
    entranceExam: "Entrance exam",
    noEntranceExam: "Exam required",
    verified: "Verified",
    notSure: "Not sure which programme fits you?",
    tryMatcher: "Try Programme Matcher",
    matcherHint: "Answer a few questions and get matched to specific programmes.",
    viewProgramme: "View programme",
    est: "est.",
    deadlineVerified: "Deadline verified",
    deadlineNotVerified: "Deadline not yet verified",
    deadlinePassed: "Deadline passed",
    deadlineRolling: "Rolling admissions",
    deadlineNotPublished: "Deadline not published",
  },
  ar: {
    programmes: "البرامج",
    universities: "الجامعات",
    search: "ابحث عن برامج، جامعات، تخصصات...",
    searchUni: "ابحث عن جامعات...",
    allDegrees: "كل الدرجات",
    allFields: "كل المجالات",
    allCities: "كل المدن",
    allTypes: "حكومي وخاص",
    allExam: "أي حالة امتحان",
    allDeadlines: "أي حالة موعد",
    maxTuition: "أعلى مصاريف",
    publicUni: "حكومي",
    privateUni: "خاص",
    noExam: "بدون امتحان قبول",
    hasExam: "امتحان قبول",
    clearFilters: "امسح الفلتر",
    filters: "فلتر",
    perYear: " في السنة",
    noResults: "مفيش برامج مطابقة للفلتر ده.",
    noResultsHint: "جرّب تزود حد المصاريف، أو تختار \"أي لغة\"، أو تشيل فلتر المدينة.",
    noUniResults: "مفيش جامعات مطابقة للفلتر ده.",
    showing: "برنامج",
    showingUnis: "جامعة",
    entranceExam: "امتحان قبول",
    noEntranceExam: "بدون امتحان",
    verified: "تم التحقق",
    notSure: "مش متأكد أي برنامج يناسبك؟",
    tryMatcher: "جرّب مطابقة البرامج",
    matcherHint: "جاوب على كم سؤال واحصل على برامج تناسبك.",
    viewProgramme: "عرض البرنامج",
    est: "تأسست",
    deadlineVerified: "الموعد متحقق",
    deadlineNotVerified: "الموعد لم يتم التحقق منه",
    deadlinePassed: "الموعد انتهى",
    deadlineRolling: "قبول مستمر",
    deadlineNotPublished: "الموعد لم يُنشر",
  },
};

const deadlineStatusLabel: Record<DeadlineStatus, { en: string; ar: string }> = {
  verified: { en: "Deadline verified", ar: "الموعد متحقق" },
  "not-verified": { en: "Not yet verified", ar: "لم يتم التحقق" },
  passed: { en: "Deadline passed", ar: "الموعد انتهى" },
  rolling: { en: "Rolling admissions", ar: "قبول مستمر" },
  "not-published": { en: "Not published yet", ar: "لم يُنشر بعد" },
};

const deadlineStatusColor: Record<DeadlineStatus, string> = {
  verified: "text-success bg-success/10 border-success/20",
  "not-verified": "text-text-muted bg-white/5 border-border-subtle",
  passed: "text-text-muted bg-white/5 border-border-subtle opacity-60",
  rolling: "text-info bg-info/10 border-info/20",
  "not-published": "text-text-muted bg-white/5 border-border-subtle",
};

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-border-subtle bg-surface/60 px-3 py-2 pe-8 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-amber/40"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
    </div>
  );
}

function ProgrammeCard({
  prog,
  uni,
  locale,
  isComparing,
  onToggleCompare,
}: {
  prog: Programme;
  uni: UniInfo | undefined;
  locale: "en" | "ar";
  isComparing?: boolean;
  onToggleCompare?: (id: string) => void;
}) {
  const l = labels[locale] || labels.en;
  const status = getDeadlineStatus(prog);

  return (
    <GlassCard hoverEffect="lift" className={cn("group relative card-shine p-5 h-full flex flex-col overflow-hidden", isComparing && "ring-2 ring-accent")}>
      {/* Decorative corner element */}
      <div className="absolute top-0 end-0 w-16 h-16 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <circle cx="48" cy="16" r="40" stroke="currentColor" strokeWidth="0.5" className="text-amber" />
        </svg>
      </div>

      <div className="flex items-start justify-between gap-2">
        <Link href={`/programmes/${prog.id}`} className="font-semibold text-text-primary text-[15px] leading-snug group-hover:text-amber transition-colors duration-300">
          {prog.name[locale] || prog.name.en}
        </Link>
        <div className="flex items-center gap-1 shrink-0">
          <SaveProgrammeButton programmeId={prog.id} locale={locale} />
          {onToggleCompare && (
            <button
              onClick={() => onToggleCompare(prog.id)}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                isComparing ? "bg-accent/15 text-accent" : "text-text-muted hover:text-accent hover:bg-accent/10"
              )}
              aria-label={isComparing ? "Remove from compare" : "Add to compare"}
            >
              <GitCompareArrows className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      {uni && (
        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-text-secondary">
          <Building2 className="w-3.5 h-3.5 text-text-muted shrink-0" />
          <span className="truncate">{uni.name}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="px-2 py-0.5 rounded-full bg-amber/10 text-amber text-[11px] font-medium border border-amber/20">
          {prog.degree}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-[11px] border border-border-subtle">
          {prog.language}
        </span>
        {uni && (
          <span className="inline-flex items-center gap-1 text-[11px] text-text-muted">
            <MapPin className="w-3 h-3" />
            {uni.city}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <Euro className="w-3 h-3 text-amber/70" />
          €{prog.tuitionEurPerYear.toLocaleString()}{l.perYear}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3 h-3 text-text-muted" />
          {prog.durationYears} {locale === "ar" ? "سنوات" : prog.durationYears === 1 ? "year" : "years"}
        </span>
        <span className="inline-flex items-center gap-1">
          <GraduationCap className="w-3 h-3 text-text-muted" />
          {prog.entranceExam ? l.entranceExam : l.noEntranceExam}
        </span>
      </div>

      <div className="mt-2">
        <span className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border",
          deadlineStatusColor[status]
        )}>
          {deadlineStatusLabel[status][locale]}
        </span>
      </div>

      <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between">
        <VerifiedBadge
          date={prog.verification.lastVerified}
          sourceUrl={prog.verification.sourceUrl}
          label={locale === "ar" ? "تم التحقق:" : "Verified:"}
        />
        <Link href={`/programmes/${prog.id}`} className="inline-flex items-center gap-1 text-xs text-amber hover:underline opacity-0 group-hover:opacity-100 transition-all duration-300">
          {l.viewProgramme}
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </GlassCard>
  );
}

function UniversityCard({
  uni,
  locale,
  programmeCount,
}: {
  uni: UniInfo;
  locale: "en" | "ar";
  programmeCount: number;
}) {
  const l = labels[locale] || labels.en;

  return (
    <Link href={`/university/${uni.id}`} className="no-underline">
      <GlassCard hoverEffect="lift" className="group relative card-shine p-5 h-full flex flex-col overflow-hidden">
        {/* Decorative gradient corner */}
        <div className="absolute top-0 end-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-full h-full bg-gradient-to-bl from-amber/5 to-transparent rounded-bl-full" />
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-text-primary leading-snug group-hover:text-amber transition-colors duration-300">{uni.name}</h3>
          <span className={cn(
            "shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
            uni.type === "public"
              ? "bg-success/10 text-success border-success/20"
              : "bg-amber/10 text-amber border-amber/20"
          )}>
            {uni.type === "public" ? (locale === "ar" ? "حكومي" : "Public") : (locale === "ar" ? "خاص" : "Private")}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber/70" />
            {uni.city}
          </span>
          {uni.founded && (
            <span className="text-text-muted text-xs">{l.est} {uni.founded}</span>
          )}
        </div>

        <p className="mt-2.5 text-text-muted text-sm line-clamp-2 flex-grow">
          {uni.blurb[locale] || uni.blurb.en}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {uni.fields.slice(0, 4).map((f) => (
            <span key={f} className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-[11px] border border-border-subtle">{f}</span>
          ))}
          {uni.fields.length > 4 && (
            <span className="px-2 py-0.5 text-[11px] text-text-muted">+{uni.fields.length - 4}</span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between">
          {programmeCount > 0 ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-amber">
              <GraduationCap className="w-3.5 h-3.5" />
              {programmeCount} {locale === "ar" ? "برنامج مسجل" : programmeCount === 1 ? "programme" : "programmes"}
            </span>
          ) : (
            <span className="text-xs text-text-muted">
              {locale === "ar" ? "البرامج قريبًا" : "Programmes coming soon"}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-amber opacity-0 group-hover:opacity-100 transition-all duration-300">
            {locale === "ar" ? "التفاصيل" : "View details"}
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}

export default function UniversityListClient() {
  const { locale } = useTranslation();
  const l = labels[locale] || labels.en;

  const [mode, setMode] = useState<ViewMode>("programmes");
  const [search, setSearch] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [language, setLanguage] = useState("");
  const [city, setCity] = useState("");
  const [uniType, setUniType] = useState("");
  const [examFilter, setExamFilter] = useState("");
  const [deadlineFilter, setDeadlineFilter] = useState("");
  const [maxTuition, setMaxTuition] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  function toggleCompare(id: string) {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      const c = params.get("city");
      const f = params.get("field");
      const m = params.get("mode");
      if (q) setSearch(q);
      if (c) setCity(c);
      if (f) setField(f);
      if (m === "universities") setMode("universities");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (search) url.searchParams.set("q", search);
      else url.searchParams.delete("q");
      if (city) url.searchParams.set("city", city);
      else url.searchParams.delete("city");
      if (field) url.searchParams.set("field", field);
      else url.searchParams.delete("field");
      if (mode !== "programmes") url.searchParams.set("mode", mode);
      else url.searchParams.delete("mode");
      window.history.replaceState({}, "", url.toString());
    } catch {}
  }, [search, city, field, mode]);

  const cities = useMemo(() => {
    const set = new Set(universitiesV2.map((u) => u.city));
    return Array.from(set).sort();
  }, []);

  const hasFilters = search || degree || field || language || city || uniType || examFilter || deadlineFilter || maxTuition;

  const clearFilters = () => {
    setSearch("");
    setDegree("");
    setField("");
    setLanguage("");
    setCity("");
    setUniType("");
    setExamFilter("");
    setDeadlineFilter("");
    setMaxTuition("");
  };

  // Programme view
  const filteredProgrammes = useMemo(() => {
    if (mode !== "programmes") return [];
    return filterProgrammes(
      {
        search: search || undefined,
        degree: degree || undefined,
        field: field || undefined,
        language: language || undefined,
        city: city || undefined,
        universityType: (uniType as "public" | "private") || undefined,
        entranceExam: examFilter === "no" ? false : examFilter === "yes" ? true : undefined,
        deadlineStatus: (deadlineFilter as DeadlineStatus) || undefined,
        maxTuition: maxTuition ? Number(maxTuition) : undefined,
      },
      universitiesV2
    ).sort((a, b) => {
      return a.tuitionEurPerYear - b.tuitionEurPerYear;
    });
  }, [mode, search, degree, field, language, city, uniType, examFilter, deadlineFilter, maxTuition]);

  // University view
  const filteredUniversities = useMemo(() => {
    if (mode !== "universities") return [];
    const term = search.trim().toLowerCase();
    return universitiesV2.filter((u) => {
      if (term) {
        const hay = `${u.name} ${u.city} ${u.fields.join(" ")}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      if (city && u.city !== city) return false;
      if (uniType && u.type !== uniType) return false;
      if (field && !u.fields.map((f) => f.toLowerCase()).includes(field.toLowerCase())) return false;
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [mode, search, city, uniType, field]);

  const programmeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const u of universitiesV2) {
      counts[u.id] = filterProgrammes({ universityId: u.id }, universitiesV2).length;
    }
    return counts;
  }, []);

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero banner */}
      <FadeIn>
        <div className="relative w-full h-[160px] sm:h-[220px] rounded-2xl overflow-hidden mb-8">
          <Image
            src="/images/university-campus.jpg"
            alt="University graduation celebration"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/40 to-midnight/10" />
          <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
          <div className="absolute -bottom-6 start-1/3 w-40 h-20 bg-amber/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-4 start-5 sm:start-8 end-5 sm:end-8 z-10 flex items-end justify-between">
            <div>
              <p className="text-xs text-white/60 mb-1">
                {locale === "ar" ? "استكشف" : "Explore"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                {mode === "programmes" ? l.programmes : l.universities}
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber" />
              <span className="text-xs text-white/80">
                {mode === "programmes"
                  ? `${filteredProgrammes.length} ${l.showing}`
                  : `${filteredUniversities.length} ${l.showingUnis}`}
              </span>
            </div>
          </div>
        </div>
      </FadeIn>
      {/* Mode toggle */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-border-subtle w-fit mb-6">
        <button
          onClick={() => setMode("programmes")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            mode === "programmes"
              ? "bg-amber/10 text-amber border border-amber/30"
              : "text-text-secondary hover:text-text-primary border border-transparent"
          )}
        >
          <GraduationCap className="w-4 h-4 inline-block me-1.5 -mt-0.5" />
          {l.programmes}
        </button>
        <button
          onClick={() => setMode("universities")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            mode === "universities"
              ? "bg-amber/10 text-amber border border-amber/30"
              : "text-text-secondary hover:text-text-primary border border-transparent"
          )}
        >
          <Building2 className="w-4 h-4 inline-block me-1.5 -mt-0.5" />
          {l.universities}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 group">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-amber transition-colors duration-200" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={mode === "programmes" ? l.search : l.searchUni}
          className="w-full rounded-xl ps-10 pe-4 py-3 border border-border-subtle bg-surface/60 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-amber/40 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)] transition-all duration-200"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-amber transition-colors"
        >
          <Filter className="w-4 h-4" />
          {l.filters}
          <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
        </button>

        <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {mode === "programmes" && (
              <FilterSelect
                value={degree}
                onChange={setDegree}
                placeholder={l.allDegrees}
                options={[
                  { value: "Bachelor", label: "Bachelor" },
                  { value: "Master", label: "Master" },
                  { value: "PhD", label: "PhD" },
                ]}
              />
            )}
            <FilterSelect
              value={field}
              onChange={setField}
              placeholder={l.allFields}
              options={PROGRAMME_FIELDS.map((f) => ({ value: f, label: f }))}
            />
            <FilterSelect
              value={city}
              onChange={setCity}
              placeholder={l.allCities}
              options={cities.map((c) => ({ value: c, label: c }))}
            />
            <FilterSelect
              value={uniType}
              onChange={setUniType}
              placeholder={l.allTypes}
              options={[
                { value: "public", label: l.publicUni },
                { value: "private", label: l.privateUni },
              ]}
            />
            {mode === "programmes" && (
              <>
                <FilterSelect
                  value={language}
                  onChange={setLanguage}
                  placeholder={locale === "ar" ? "كل اللغات" : "All languages"}
                  options={[
                    { value: "English", label: "English" },
                    { value: "Czech", label: "Czech" },
                  ]}
                />
                <FilterSelect
                  value={maxTuition}
                  onChange={setMaxTuition}
                  placeholder={l.maxTuition}
                  options={[
                    { value: "2000", label: `≤ €2,000${l.perYear}` },
                    { value: "4000", label: `≤ €4,000${l.perYear}` },
                    { value: "6000", label: `≤ €6,000${l.perYear}` },
                    { value: "10000", label: `≤ €10,000${l.perYear}` },
                    { value: "15000", label: `≤ €15,000${l.perYear}` },
                  ]}
                />
                <FilterSelect
                  value={examFilter}
                  onChange={setExamFilter}
                  placeholder={l.allExam}
                  options={[
                    { value: "no", label: l.noExam },
                    { value: "yes", label: l.hasExam },
                  ]}
                />
                <FilterSelect
                  value={deadlineFilter}
                  onChange={setDeadlineFilter}
                  placeholder={l.allDeadlines}
                  options={[
                    { value: "verified", label: locale === "ar" ? "متحقق" : "Verified" },
                    { value: "rolling", label: locale === "ar" ? "قبول مستمر" : "Rolling" },
                    { value: "not-published", label: locale === "ar" ? "لم يُنشر" : "Not published" },
                  ]}
                />
              </>
            )}
          </div>
          </motion.div>
        )}
        </AnimatePresence>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="mt-2 inline-flex items-center gap-1 text-xs text-text-muted hover:text-amber transition-colors"
          >
            <X className="w-3 h-3" />
            {l.clearFilters}
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-xs text-text-muted mb-4">
        {mode === "programmes"
          ? `${filteredProgrammes.length} ${l.showing}`
          : `${filteredUniversities.length} ${l.showingUnis}`}
      </p>

      {/* Results */}
      {mode === "programmes" ? (
        filteredProgrammes.length === 0 ? (
          <div className="rounded-2xl border border-border-subtle bg-surface/60 p-8 text-center space-y-3">
            <GraduationCap className="w-12 h-12 text-text-muted mx-auto" />
            <p className="text-text-muted text-lg">{l.noResults}</p>
            <p className="text-text-muted text-sm max-w-md mx-auto">{l.noResultsHint}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProgrammes.map((prog) => (
              <ProgrammeCard
                key={prog.id}
                prog={prog}
                uni={universitiesV2.find((u) => u.id === prog.universityId)}
                locale={locale}
                isComparing={compareIds.includes(prog.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        )
      ) : (
        filteredUniversities.length === 0 ? (
          <div className="rounded-2xl border border-border-subtle bg-surface/60 p-8 text-center space-y-3">
            <Building2 className="w-12 h-12 text-text-muted mx-auto" />
            <p className="text-text-muted text-lg">{l.noUniResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUniversities.map((uni) => (
              <UniversityCard
                key={uni.id}
                uni={uni}
                locale={locale}
                programmeCount={programmeCounts[uni.id] || 0}
              />
            ))}
          </div>
        )
      )}

      {/* Matcher CTA */}
      <FadeIn>
        <div className="relative mt-12 text-center border border-border-subtle rounded-2xl p-8 bg-white/[0.02] overflow-hidden">
          <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
          <div className="absolute top-0 start-1/2 -translate-x-1/2 w-60 h-20 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber/10 mb-4">
              <Sparkles className="w-6 h-6 text-amber" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {l.notSure}
            </h3>
            <p className="text-text-muted text-sm mb-5 max-w-md mx-auto">
              {l.matcherHint}
            </p>
            <Link
              href="/university-matcher"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber/10 text-amber border border-amber/20 text-sm font-medium hover:bg-amber/20 hover:border-amber/40 transition-all duration-300"
            >
              <GraduationCap className="w-4 h-4" />
              {l.tryMatcher}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Floating compare bar */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:start-1/2 sm:-translate-x-1/2 z-40 max-w-lg w-full">
          <div className="rounded-2xl border border-accent/30 bg-surface/95 backdrop-blur-md shadow-xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <GitCompareArrows className="w-4 h-4 text-accent shrink-0" />
              <span className="text-sm text-text-primary font-medium truncate">
                {compareIds.length} {locale === "ar" ? "برنامج للمقارنة" : `programme${compareIds.length > 1 ? "s" : ""} selected`}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setCompareIds([])}
                className="px-3 py-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                {locale === "ar" ? "مسح" : "Clear"}
              </button>
              <Link
                href={`/programmes/compare?ids=${compareIds.join(",")}`}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent text-background text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                {locale === "ar" ? "قارن" : "Compare"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
