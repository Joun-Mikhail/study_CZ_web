"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { motion } from "framer-motion";
import {
  Calendar,
  Filter,
  ExternalLink,
  Clock,
  AlertTriangle,
  ShieldCheck,
  ShieldQuestion,
  Info,
  ChevronDown,
  X,
  Euro,
  GraduationCap,
} from "lucide-react";
import { programmes, filterProgrammes, PROGRAMME_FIELDS, getDeadlineStatus } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme, DeadlineStatus } from "@/data/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

const labels = {
  en: {
    title: "Deadline Tracker",
    subtitle: "Track application deadlines for English-taught programmes at Czech universities. Only verified deadlines from official sources are shown.",
    filters: "Filters",
    clearFilters: "Clear filters",
    degree: "Degree",
    field: "Field",
    city: "City",
    university: "University",
    maxTuition: "Max tuition",
    allDegrees: "All degrees",
    allFields: "All fields",
    allCities: "All cities",
    allUniversities: "All universities",
    perYear: "/yr",
    programme: "Programme",
    universityLabel: "University",
    deadline: "Deadline",
    tuition: "Tuition",
    status: "Status",
    statusVerified: "Verified",
    statusNotVerified: "Not yet verified",
    statusPassed: "Passed",
    statusRolling: "Rolling admissions",
    statusNotPublished: "Not published yet",
    noResults: "No programmes match your filters.",
    noDeadlinesYet: "We're building our deadline database from official university sources. No deadlines have been verified yet. Check back soon, or visit each university's admissions page directly.",
    deadlineNotice: "Deadlines without verification are not displayed. We only show dates confirmed from official university websites.",
    checkOfficialPage: "Check official page",
    eligibilityCta: "Check my eligibility",
    browseUnis: "Browse universities",
    showingCount: "programmes",
    entranceExam: "Entrance exam",
    noEntranceExam: "No entrance exam",
    daysLeft: "days left",
    verified: "Verified",
    urgentWarning: "Under 30 days",
  },
  ar: {
    title: "متتبع المواعيد",
    subtitle: "تتبع مواعيد التقديم للبرامج بالإنجليزية في الجامعات التشيكية. فقط المواعيد المتحقق منها من مصادر رسمية تظهر.",
    filters: "الفلاتر",
    clearFilters: "مسح الفلاتر",
    degree: "الدرجة",
    field: "المجال",
    city: "المدينة",
    university: "الجامعة",
    maxTuition: "الرسوم القصوى",
    allDegrees: "كل الدرجات",
    allFields: "كل المجالات",
    allCities: "كل المدن",
    allUniversities: "كل الجامعات",
    perYear: "/سنة",
    programme: "البرنامج",
    universityLabel: "الجامعة",
    deadline: "آخر موعد",
    tuition: "الرسوم",
    status: "الحالة",
    statusVerified: "تم التحقق",
    statusNotVerified: "لم يتم التحقق بعد",
    statusPassed: "انتهى",
    statusRolling: "قبول مستمر",
    statusNotPublished: "لم يُنشر بعد",
    noResults: "لا يوجد برامج تطابق الفلاتر.",
    noDeadlinesYet: "بنبني قاعدة بيانات المواعيد من مصادر الجامعات الرسمية. لسه ما تم التحقق من أي مواعيد. ارجع قريبًا، أو زور صفحة القبول لكل جامعة مباشرة.",
    deadlineNotice: "المواعيد بدون تحقق ما بتظهر. بنعرض بس التواريخ المؤكدة من المواقع الرسمية.",
    checkOfficialPage: "شوف الصفحة الرسمية",
    eligibilityCta: "اعرف لو مؤهل",
    browseUnis: "تصفح الجامعات",
    showingCount: "برنامج",
    entranceExam: "امتحان قبول",
    noEntranceExam: "بدون امتحان قبول",
    daysLeft: "يوم متبقي",
    verified: "تم التحقق",
    urgentWarning: "أقل من 30 يوم",
  },
};

function StatusBadge({ status, locale }: { status: DeadlineStatus; locale: "en" | "ar" }) {
  const l = labels[locale] || labels.en;
  const config: Record<DeadlineStatus, { label: string; icon: React.ReactNode; className: string }> = {
    verified: {
      label: l.statusVerified,
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      className: "bg-success/10 text-success border-success/20",
    },
    "not-verified": {
      label: l.statusNotVerified,
      icon: <ShieldQuestion className="w-3.5 h-3.5" />,
      className: "bg-white/5 text-text-muted border-border-subtle",
    },
    passed: {
      label: l.statusPassed,
      icon: <Clock className="w-3.5 h-3.5" />,
      className: "bg-white/5 text-text-muted border-border-subtle opacity-60",
    },
    rolling: {
      label: l.statusRolling,
      icon: <Info className="w-3.5 h-3.5" />,
      className: "bg-info/10 text-info border-info/20",
    },
    "not-published": {
      label: l.statusNotPublished,
      icon: <ShieldQuestion className="w-3.5 h-3.5" />,
      className: "bg-white/5 text-text-muted border-border-subtle",
    },
  };
  const c = config[status];
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border", c.className)}>
      {c.icon}
      {c.label}
    </span>
  );
}

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

function ProgrammeDeadlineCard({ prog, uni, status, locale }: {
  prog: Programme;
  uni: (typeof universitiesV2)[number] | undefined;
  status: DeadlineStatus;
  locale: "en" | "ar";
}) {
  const l = labels[locale] || labels.en;
  const daysLeft = prog.applicationDeadline
    ? Math.ceil((new Date(prog.applicationDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "rounded-xl border border-border-subtle bg-white/[0.02] p-4 space-y-3",
        status === "passed" && "opacity-50"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-medium text-text-primary text-sm truncate">
            {prog.name[locale] || prog.name.en}
          </h3>
          {prog.faculty && (
            <p className="text-xs text-text-muted mt-0.5 truncate">{prog.faculty}</p>
          )}
          <a
            href={`/programmes/${prog.id}`}
            className="text-xs text-amber hover:underline mt-0.5 inline-block"
          >
            {uni?.name || prog.universityId}
            {uni && <span className="text-text-muted">, {uni.city}</span>}
          </a>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <div className="flex gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-amber/10 text-amber text-[11px] font-medium border border-amber/20">
              {prog.degree}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-[11px] border border-border-subtle">
              {prog.language}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <span className="inline-flex items-center gap-1">
            <Euro className="w-3 h-3 text-amber/70" />
            €{prog.tuitionEurPerYear.toLocaleString()}{l.perYear}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-text-muted" />
            {prog.durationYears} {locale === "ar" ? "سنوات" : prog.durationYears === 1 ? "year" : "years"}
          </span>
          {prog.entranceExam ? (
            <span className="inline-flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-text-muted" />
              {l.entranceExam}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-success/80">
              <GraduationCap className="w-3 h-3" />
              {l.noEntranceExam}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border-subtle/50">
        <div className="flex items-center gap-3">
          <StatusBadge status={status} locale={locale} />
          {status === "verified" && prog.applicationDeadline && (
            <span className="text-sm font-medium text-text-primary">
              {prog.applicationDeadline}
            </span>
          )}
          {status === "verified" && daysLeft !== null && daysLeft >= 0 && (
            <span className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold",
              isUrgent ? "text-red-400" : "text-text-secondary"
            )}>
              {isUrgent && <AlertTriangle className="w-3.5 h-3.5" />}
              {daysLeft} {l.daysLeft}
            </span>
          )}
          {status === "rolling" && (
            <span className="text-xs text-info">{l.statusRolling}</span>
          )}
        </div>
        <a
          href={prog.programmeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-amber hover:underline shrink-0"
        >
          {l.checkOfficialPage}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {status === "verified" && (
        <VerifiedBadge
          date={prog.verification.lastVerified}
          sourceUrl={prog.verification.sourceUrl}
          label={locale === "ar" ? "تم التحقق:" : "Verified:"}
        />
      )}
    </motion.div>
  );
}

export default function DeadlinesClient() {
  const { locale } = useTranslation();
  const l = labels[locale] || labels.en;

  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [city, setCity] = useState("");
  const [university, setUniversity] = useState("");
  const [maxTuition, setMaxTuition] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const hasFilters = degree || field || city || university || maxTuition;

  const cities = useMemo(() => {
    const set = new Set(universitiesV2.map((u) => u.city));
    return Array.from(set).sort();
  }, []);

  const universityOptions = useMemo(() => {
    return universitiesV2
      .map((u) => ({ value: u.id, label: u.name }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const filtered = useMemo(() => {
    const matched = filterProgrammes(
      {
        degree: degree || undefined,
        field: field || undefined,
        city: city || undefined,
        universityId: university || undefined,
        maxTuition: maxTuition ? Number(maxTuition) : undefined,
      },
      universitiesV2
    );
    return matched
      .map((p) => ({
        prog: p,
        uni: universitiesV2.find((u) => u.id === p.universityId),
        status: getDeadlineStatus(p),
      }))
      .sort((a, b) => {
        const order: Record<DeadlineStatus, number> = {
          verified: 0,
          rolling: 1,
          "not-published": 2,
          "not-verified": 3,
          passed: 4,
        };
        const statusDiff = order[a.status] - order[b.status];
        if (statusDiff !== 0) return statusDiff;
        if (a.status === "verified" && b.status === "verified" && a.prog.applicationDeadline && b.prog.applicationDeadline) {
          return new Date(a.prog.applicationDeadline).getTime() - new Date(b.prog.applicationDeadline).getTime();
        }
        return a.prog.name.en.localeCompare(b.prog.name.en);
      });
  }, [degree, field, city, university, maxTuition]);

  const hasVerifiedDeadlines = filtered.some((f) => f.status === "verified");

  return (
    <>
      <Navbar />
      <Breadcrumb />
      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero banner */}
          <div className="relative w-full h-[130px] sm:h-[170px] rounded-2xl overflow-hidden mb-6">
            <Image
              src="/images/prague-cityscape.jpg"
              alt="Prague Charles Bridge aerial view"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/30 to-transparent" />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">{l.title}</h1>
            <p className="text-base text-text-secondary max-w-2xl">{l.subtitle}</p>
          </motion.div>

          <div className="rounded-xl border border-amber/20 bg-amber/5 p-4 mb-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber shrink-0 mt-0.5" />
            <p className="text-sm text-text-secondary">{l.deadlineNotice}</p>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-amber transition-colors"
            >
              <Filter className="w-4 h-4" />
              {l.filters}
              <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
            </button>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
              >
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
                  value={university}
                  onChange={setUniversity}
                  placeholder={l.allUniversities}
                  options={universityOptions}
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
              </motion.div>
            )}

            {hasFilters && (
              <button
                onClick={() => { setDegree(""); setField(""); setCity(""); setUniversity(""); setMaxTuition(""); }}
                className="mt-2 inline-flex items-center gap-1 text-xs text-text-muted hover:text-amber transition-colors"
              >
                <X className="w-3 h-3" />
                {l.clearFilters}
              </button>
            )}
          </div>

          <p className="text-xs text-text-muted mb-4">
            {filtered.length} {l.showingCount}
          </p>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-border-subtle bg-surface/60 p-8 text-center space-y-6"
            >
              <Calendar className="w-12 h-12 text-text-muted mx-auto" />
              <p className="text-text-muted text-lg max-w-lg mx-auto">
                {hasFilters ? l.noResults : l.noDeadlinesYet}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <MagneticButton variant="secondary" href="/universities">
                  {l.browseUnis}
                </MagneticButton>
                <MagneticButton variant="primary" href="/eligibility">
                  {l.eligibilityCta}
                </MagneticButton>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filtered.map(({ prog, uni, status }) => (
                <ProgrammeDeadlineCard
                  key={prog.id}
                  prog={prog}
                  uni={uni}
                  status={status}
                  locale={locale}
                />
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <MagneticButton variant="secondary" href="/universities">
              {l.browseUnis}
            </MagneticButton>
            <MagneticButton variant="primary" href="/eligibility">
              {l.eligibilityCta}
            </MagneticButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
