"use client";

import { localizeHref } from "@/i18n/paths";
import { useState, useMemo } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { feeVerified } from "@/lib/fee-source";
import { SaveProgrammeButton } from "@/components/ui/save-programme-button";
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
import { filterProgrammes, PROGRAMME_FIELDS, getDeadlineStatus, usualDeadline } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme, DeadlineStatus } from "@/data/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SiteImage } from "@/components/site-image";
import { cityName, photoForUniversity, yearsLabel } from "@/components/card-photo";
import { DEGREE_VALUE_AR, LANGUAGE_AR } from "@/i18n/ar-metadata";

const labels = {
  en: {
    title: "Czech University Application Deadlines",
    subtitle: "Track application deadlines for English-taught programmes at Czech universities. Where a university hasn't published its own date yet, we show the general Czech deadline: the end of February.",
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
    perYear: " per year",
    programme: "Programme",
    universityLabel: "University",
    deadline: "Deadline",
    tuition: "Tuition",
    status: "Status",
    statusVerified: "Verified",
    statusNotVerified: "Not yet verified",
    statusPassed: "Passed",
    statusRolling: "Rolling admissions",
    statusNotPublished: "General deadline",
    endOfFebruary: "End of February",
    noResults: "No programmes match your filters.",
    noDeadlinesYet: "We're building our deadline database from official university sources. No deadlines have been verified yet. Check back soon, or visit each university's admissions page directly.",
    deadlineNotice: "Most Czech universities close applications at the end of February. Dates marked \"General deadline\" are not yet confirmed by the university, so check the official page before you apply. Every programme has an entrance exam.",
    checkOfficialPage: "Check official page",
    eligibilityCta: "Check my eligibility",
    browseUnis: "Browse universities",
    showingCount: "programmes",
    entranceExam: "Entrance exam",
    daysLeft: "days left",
    verified: "Verified",
    urgentWarning: "Under 30 days",
  },
  ar: {
    title: "مواعيد التقديم في جامعات التشيك",
    subtitle: "تابع مواعيد التقديم للبرامج بالإنجليزي في جامعات التشيك. لو الجامعة لسه منزلتش ميعادها، بنعرضلك الموعد العام في التشيك: نهاية فبراير.",
    filters: "فلتر",
    clearFilters: "امسح الفلتر",
    degree: "الدرجة",
    field: "المجال",
    city: "المدينة",
    university: "الجامعة",
    maxTuition: "أعلى مصاريف",
    allDegrees: "كل الدرجات",
    allFields: "كل المجالات",
    allCities: "كل المدن",
    allUniversities: "كل الجامعات",
    perYear: " في السنة",
    programme: "البرنامج",
    universityLabel: "الجامعة",
    deadline: "آخر موعد",
    tuition: "المصاريف",
    status: "الحالة",
    statusVerified: "متأكد",
    statusNotVerified: "لسه ماتأكدناش",
    statusPassed: "فات",
    statusRolling: "قبول مفتوح",
    statusNotPublished: "الموعد العام",
    endOfFebruary: "نهاية فبراير",
    noResults: "مفيش برامج مطابقة للفلتر ده.",
    noDeadlinesYet: "بنبني قاعدة بيانات المواعيد من مصادر الجامعات الرسمية. لسه ماتأكدنا من أي مواعيد. ارجع قريب، أو روح لصفحة القبول بتاعة كل جامعة.",
    deadlineNotice: "أغلب جامعات التشيك بتقفل التقديم نهاية فبراير. المواعيد المكتوب عليها \"الموعد العام\" الجامعة لسه ما أكدتهاش، فاتأكد من الصفحة الرسمية قبل ما تقدم. كل البرامج فيها امتحان قبول.",
    checkOfficialPage: "شوف الصفحة الرسمية",
    eligibilityCta: "شوف لو تقدر تقدم",
    browseUnis: "شوف الجامعات",
    showingCount: "برنامج",
    entranceExam: "امتحان قبول",
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
        className="w-full appearance-none rounded-lg border border-border-subtle bg-surface/60 px-3 py-2 pe-8 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-brand/40"
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
  // Programmes without their own date count down to the general end-of-February deadline.
  const deadline = status === "verified" ? prog.applicationDeadline : status === "not-published" ? usualDeadline() : undefined;
  const daysLeft = deadline
    // eslint-disable-next-line react-hooks/purity -- days left is meant to reflect the current date
    ? Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 30;

  const photo = photoForUniversity(prog.universityId);

  return (
    <motion.div
      initial={{ y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "motion-safe-fallback card-lift group flex gap-3 sm:gap-4 rounded-2xl border border-border-subtle bg-surface p-4",
        status === "passed" && "opacity-50"
      )}
    >
      <div className="relative w-16 h-16 sm:w-24 sm:h-24 shrink-0 overflow-hidden rounded-xl bg-bg-subtle">
        {photo && <SiteImage id={photo} sizes="96px" decorative whenNear className="card-photo-img" />}
        <span aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl" />
        <span aria-hidden="true" className="card-photo-shine" />
      </div>

      <div className="min-w-0 flex-1 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-semibold text-text-primary text-sm sm:text-base leading-snug group-hover:text-brand transition-colors">
            {prog.name[locale] || prog.name.en}
          </h2>
          {prog.faculty && (
            <p className="text-xs text-text-muted mt-0.5 truncate">{prog.faculty}</p>
          )}
          <a
            href={localizeHref(`/programmes/${prog.id}/`, locale)}
            className="text-xs text-brand hover:underline mt-0.5 inline-block"
            dir="auto"
          >
            {(locale === "ar" && uni?.nameAr?.split(" (")[0]) || uni?.name || prog.universityId}
            {uni && <span className="text-text-muted">{locale === "ar" ? "، " : ", "}{cityName(uni.city, locale)}</span>}
          </a>
        </div>
        <div className="shrink-0">
          <SaveProgrammeButton programmeId={prog.id} locale={locale} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-text-secondary">
          <span className="px-2 py-0.5 rounded-full bg-brand/10 text-brand text-[11px] font-medium border border-brand/20">
            {locale === "ar" ? DEGREE_VALUE_AR[prog.degree] ?? prog.degree : prog.degree}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-bg-subtle text-text-secondary text-[11px] border border-border-subtle">
            {locale === "ar" ? LANGUAGE_AR[prog.language] ?? prog.language : prog.language}
          </span>
          <span className="inline-flex items-center gap-1">
            <Euro className="w-3 h-3 text-brand/70" />
            <span dir="ltr">{prog.tuitionEurPerYear.toLocaleString("en-US")}</span>{l.perYear}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-text-muted" />
            {yearsLabel(prog.durationYears, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-text-muted" />
            {l.entranceExam}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border-subtle/50">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <StatusBadge status={status} locale={locale} />
          {status === "verified" && prog.applicationDeadline && (
            <span className="text-sm font-medium text-text-primary">
              {prog.applicationDeadline}
            </span>
          )}
          {status === "not-published" && deadline && (
            <span className="text-sm font-medium text-text-primary">
              {l.endOfFebruary} {deadline.slice(0, 4)}
            </span>
          )}
          {(status === "verified" || status === "not-published") && daysLeft !== null && daysLeft >= 0 && (
            <span className={cn(
              "inline-flex items-center gap-1.5 text-xs font-semibold",
              isUrgent ? "text-error" : "text-text-secondary"
            )}>
              <DaysRing days={daysLeft} urgent={isUrgent} />
              {isUrgent && <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />}
              {l.daysLeft}
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
          className="inline-flex items-center gap-1 text-xs text-brand hover:underline shrink-0"
        >
          {l.checkOfficialPage}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {status === "verified" && feeVerified(prog) && (
        <VerifiedBadge
          date={prog.verification.lastVerified}
          sourceUrl={prog.verification.sourceUrl}
          label={locale === "ar" ? "تم التحقق:" : "Verified:"}
        />
      )}
      </div>
    </motion.div>
  );
}

/** Ring around the days-left number: full at six months or more, emptying as the deadline nears. */
function DaysRing({ days, urgent }: { days: number; urgent: boolean }) {
  const r = 17;
  const c = 2 * Math.PI * r;
  const share = Math.min(Math.max(days, 0), 180) / 180;
  return (
    <span className="relative inline-flex items-center justify-center w-11 h-11 shrink-0">
      <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="20" cy="20" r={r} fill="none" strokeWidth="3" className="stroke-border-subtle" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - share)}
          className={cn("days-ring", urgent ? "stroke-error" : "stroke-brand")}
          style={{ "--ring": `${c}` } as React.CSSProperties}
        />
      </svg>
      {/* Solid disc under the number, so its contrast can be measured. */}
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-surface text-[13px] font-bold text-text-primary" dir="ltr">
        {days}
      </span>
    </span>
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
      <main id="main-content" className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero banner */}
          <div className="relative w-full h-[130px] sm:h-[170px] rounded-2xl overflow-hidden mb-6">
            <Image
              src="/images/study/notebook.jpg"
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent" />
          </div>
          <motion.div initial={{ y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">{l.title}</h1>
            <p className="text-base text-text-secondary max-w-2xl">{l.subtitle}</p>
          </motion.div>

          <div className="rounded-xl border border-brand/20 bg-brand/5 p-4 mb-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
            <p className="text-sm text-text-secondary">{l.deadlineNotice}</p>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-brand transition-colors"
            >
              <Filter className="w-4 h-4" />
              {l.filters}
              <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
            </button>

            {showFilters && (
              <motion.div
                initial={{ height: 0 }}
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
                className="mt-2 inline-flex items-center gap-1 text-xs text-text-muted hover:text-brand transition-colors"
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
              initial={false}
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
