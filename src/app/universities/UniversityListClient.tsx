"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import { VerifiedBadge } from "@/components/ui/verified-badge";
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
} from "lucide-react";
import { filterProgrammes, getDeadlineStatus, PROGRAMME_FIELDS } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme, DeadlineStatus } from "@/data/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    perYear: "/yr",
    noResults: "No programmes match your filters.",
    noResultsHint: "Try increasing your tuition limit, selecting \"Either language\", or removing the city filter.",
    noUniResults: "No universities match your filters.",
    showing: "programmes",
    showingUnis: "universities",
    entranceExam: "Entrance exam",
    noEntranceExam: "No exam",
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
    maxTuition: "الرسوم القصوى",
    publicUni: "حكومي",
    privateUni: "خاص",
    noExam: "بدون امتحان قبول",
    hasExam: "امتحان قبول",
    clearFilters: "مسح كل الفلاتر",
    filters: "الفلاتر",
    perYear: "/سنة",
    noResults: "لا يوجد برامج تطابق الفلاتر.",
    noResultsHint: "جرّب تزيد حد الرسوم، أو تختار \"أي لغة\"، أو تشيل فلتر المدينة.",
    noUniResults: "لا يوجد جامعات تطابق الفلاتر.",
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
    <GlassCard hoverEffect="lift" className={cn("p-5 h-full flex flex-col", isComparing && "ring-2 ring-accent")}>
      <div className="flex items-start justify-between gap-2">
        <Link href={`/programmes/${prog.id}`} className="font-semibold text-text-primary text-[15px] leading-snug hover:text-accent transition-colors">
          {prog.name[locale] || prog.name.en}
        </Link>
        {onToggleCompare && (
          <button
            onClick={() => onToggleCompare(prog.id)}
            className={cn(
              "shrink-0 p-1.5 rounded-lg transition-colors",
              isComparing ? "bg-accent/15 text-accent" : "text-text-muted hover:text-accent hover:bg-accent/10"
            )}
            aria-label={isComparing ? "Remove from compare" : "Add to compare"}
          >
            <GitCompareArrows className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {uni && (
        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-text-secondary">
          <Building2 className="w-3.5 h-3.5 text-text-muted shrink-0" />
          <span className="truncate">{uni.name}</span>
        </div>
      )}
      <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
        {uni && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {uni.city}
          </span>
        )}
        {uni && (
          <span>{uni.type === "public" ? (locale === "ar" ? "حكومي" : "Public") : (locale === "ar" ? "خاص" : "Private")}</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <BookOpen className="w-3 h-3 text-text-muted" />
          {prog.language === "English" ? "🇬🇧" : "🇨🇿"} {prog.language}
        </span>
        <span className="inline-flex items-center gap-1">
          <GraduationCap className="w-3 h-3 text-text-muted" />
          {prog.degree}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3 h-3 text-text-muted" />
          {prog.durationYears} {locale === "ar" ? "سنوات" : prog.durationYears === 1 ? "year" : "years"}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <Euro className="w-3 h-3 text-amber/70" />
          €{prog.tuitionEurPerYear.toLocaleString()}{l.perYear}
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

      <div className="mt-auto pt-3 flex items-center justify-between">
        <VerifiedBadge
          date={prog.verification.lastVerified}
          sourceUrl={prog.verification.sourceUrl}
          label={locale === "ar" ? "تم التحقق:" : "Verified:"}
        />
        <Link href={`/programmes/${prog.id}`} className="inline-flex items-center gap-1 text-xs text-amber hover:underline underline-offset-2">
          <ExternalLink className="w-3 h-3" />
          {l.viewProgramme}
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
      <GlassCard hoverEffect="lift" className="p-5 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-text-primary leading-snug">{uni.name}</h3>

        <div className="flex items-center gap-3 mt-2 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-text-muted" />
            {uni.city}
          </span>
          <span>{uni.type === "public" ? (locale === "ar" ? "حكومي" : "Public") : (locale === "ar" ? "خاص" : "Private")}</span>
          {uni.founded && (
            <span className="text-text-muted">{l.est} {uni.founded}</span>
          )}
        </div>

        <p className="mt-2 text-text-muted text-sm line-clamp-2 flex-grow">
          {uni.blurb[locale] || uni.blurb.en}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {uni.fields.slice(0, 4).map((f) => (
            <span key={f} className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-xs border border-border-subtle">{f}</span>
          ))}
          {uni.fields.length > 4 && (
            <span className="px-2 py-0.5 text-xs text-text-muted">+{uni.fields.length - 4}</span>
          )}
        </div>

        {programmeCount > 0 && (
          <div className="mt-2 text-xs text-amber">
            {programmeCount} {locale === "ar" ? "برنامج مسجل" : programmeCount === 1 ? "listed programme" : "listed programmes"}
          </div>
        )}
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
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero banner */}
      <div className="relative w-full h-[160px] sm:h-[220px] rounded-2xl overflow-hidden mb-8">
        <Image
          src="/images/university-campus.jpg"
          alt="University graduation celebration"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/40 to-transparent" />
        <div className="absolute bottom-4 start-5 sm:start-8 z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
            {mode === "programmes" ? l.programmes : l.universities}
          </h1>
        </div>
      </div>
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
      <div className="relative mb-4">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={mode === "programmes" ? l.search : l.searchUni}
          className="w-full rounded-xl ps-10 pe-4 py-3 border border-border-subtle bg-surface/60 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-1 focus:ring-amber/40"
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

        {showFilters && (
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
        )}

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
      <div className="mt-12 text-center border border-border-subtle rounded-2xl p-8 bg-white/[0.02]">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {l.notSure}
        </h3>
        <p className="text-text-muted text-sm mb-4">
          {l.matcherHint}
        </p>
        <Link
          href="/university-matcher"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber/10 text-amber border border-amber/20 text-sm font-medium hover:bg-amber/20 transition-colors"
        >
          <GraduationCap className="w-4 h-4" />
          {l.tryMatcher}
        </Link>
      </div>

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
