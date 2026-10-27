"use client";

import React from "react";
import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import { ProgrammeSourceBadge } from "@/components/ui/programme-source-badge";
import { feeReviewedOn, feeVerified } from "@/lib/fee-source";
import { getDeadlineStatus } from "@/data/programmes";
import type { Programme, UniversityV2, DeadlineStatus } from "@/data/types";
import { SaveProgrammeButton } from "@/components/ui/save-programme-button";
import { EmailSignup } from "@/components/email-signup";
import { HelpLink } from "@/components/help-sheet";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CITY_AR, DEGREE_VALUE_AR, FIELD_AR, LANGUAGE_AR } from "@/i18n/ar-metadata";
import {
  GraduationCap,
  MapPin,
  Clock,
  Euro,
  FileText,
  ExternalLink,
  BookOpen,
  Building2,
  ShieldCheck,
  CalendarDays,
  ClipboardList,
  Globe,
  AlertCircle,
  GitCompareArrows,
  Info,
} from "lucide-react";


const COPY = {
  en: {
    deadline: (d: string) => `Deadline: ${d}`,
    deadlineVerified: "Deadline verified",
    deadlineNotVerified: "Deadline not verified",
    deadlinePassed: "Deadline passed",
    rolling: "Rolling admissions",
    deadlineNotPublished: "End of February (General Deadline)",
    czechia: "Czech Republic",
    public: "Public",
    private: "Private",
    keyFacts: "Key Facts",
    degree: "Degree",
    language: "Language",
    duration: "Duration",
    years: (n: number) => `${n} year${n > 1 ? "s" : ""}`,
    tuition: "Tuition",
    perYear: "/ year",
    applicationFee: "Application fee",
    applicationDeadline: "Application deadline",
    notPublished: "End of February (General Deadline). The university hasn't confirmed its own date yet.",
    applicationsOpen: "Applications open",
    entranceExam: "Entrance exam",
    yes: "Yes",
    examDate: "Exam date",
    field: "Field",
    application: "Application",
    languageRequirement: "Language requirement",
    requiredDocuments: "Required documents",
    checkOfficial: "Check the official programme page for application requirements and required documents.",
    visitOfficial: "Visit official programme page",
    trustTitle: "Data Sources & Verification",
    officialSource: "Official university source",
    officialSourceText: "All information on this page comes from the university's official website.",
    feeRecheckTitle: "Fee being re-checked",
    feeRecheckText:
      "We have not yet matched this fee to the university's own fee page. Check the fee on the university's website before you apply or pay.",
    sourceReviewed: "Source last reviewed:",
    lastVerified: "Last verified:",
    verifiedBy: (who: "studyczechia" | "community") =>
      `Verified by ${who === "studyczechia" ? "Study Czechia" : "a community contributor"}.`,
    source: "Source",
    disclaimer:
      "Universities may update their programmes, fees, or deadlines at any time. Always confirm details on the official programme page before applying.",
    apply: "Apply / Visit official programme",
    compare: "Compare with others",
    database: (n: number) => `Our database is growing, currently covering ${n} programmes.`,
  },
  ar: {
    deadline: (d: string) => `آخر موعد: ${d}`,
    deadlineVerified: "آخر موعد مؤكَّد",
    deadlineNotVerified: "آخر موعد غير مؤكَّد",
    deadlinePassed: "انتهى موعد التقديم",
    rolling: "التقديم مفتوح طوال العام",
    deadlineNotPublished: "نهاية فبراير (الموعد العام)",
    czechia: "التشيك",
    public: "حكومية",
    private: "خاصة",
    keyFacts: "أهم المعلومات",
    degree: "الدرجة",
    language: "لغة الدراسة",
    duration: "المدة",
    years: (n: number) => (n === 1 ? "سنة واحدة" : n === 2 ? "سنتان" : `${n} سنوات`),
    tuition: "الرسوم الدراسية",
    perYear: "في السنة",
    applicationFee: "رسوم التقديم",
    applicationDeadline: "آخر موعد للتقديم",
    notPublished: "نهاية فبراير (الموعد العام). لم تؤكد الجامعة موعدها بعد.",
    applicationsOpen: "بداية التقديم",
    entranceExam: "امتحان القبول",
    yes: "نعم",
    examDate: "موعد الامتحان",
    field: "المجال",
    application: "التقديم",
    languageRequirement: "شرط اللغة",
    requiredDocuments: "الأوراق المطلوبة",
    checkOfficial: "راجع صفحة البرنامج الرسمية لمعرفة شروط التقديم والأوراق المطلوبة.",
    visitOfficial: "صفحة البرنامج الرسمية",
    trustTitle: "مصادر البيانات والتحقق",
    officialSource: "مصدر رسمي من الجامعة",
    officialSourceText: "كل المعلومات في هذه الصفحة مأخوذة من الموقع الرسمي للجامعة.",
    feeRecheckTitle: "نراجع الرسوم حاليًا",
    feeRecheckText:
      "لم نطابق هذه الرسوم بعد مع صفحة الرسوم في موقع الجامعة. تأكد من الرسوم على موقع الجامعة قبل التقديم أو الدفع.",
    sourceReviewed: "آخر مراجعة للمصدر:",
    lastVerified: "آخر تحقق:",
    verifiedBy: (who: "studyczechia" | "community") =>
      who === "studyczechia" ? "تحقق منها فريق Study Czechia." : "تحقق منها أحد أفراد المجتمع.",
    source: "المصدر",
    disclaimer:
      "قد تغيّر الجامعات برامجها أو رسومها أو مواعيدها في أي وقت. تأكد دائمًا من التفاصيل في صفحة البرنامج الرسمية قبل التقديم.",
    apply: "قدّم / صفحة البرنامج الرسمية",
    compare: "قارن مع برامج أخرى",
    database: (n: number) => `قاعدة بياناتنا تكبر باستمرار، وتضم الآن ${n} برنامجًا.`,
  },
};

type Copy = (typeof COPY)["en"];

function DeadlineBadge({ status, date, c }: { status: DeadlineStatus; date?: string; c: Copy }) {
  const map: Record<DeadlineStatus, { label: string; cls: string }> = {
    verified: { label: date ? c.deadline(date) : c.deadlineVerified, cls: "bg-success/15 text-success" },
    "not-verified": { label: c.deadlineNotVerified, cls: "bg-warning/15 text-warning" },
    passed: { label: c.deadlinePassed, cls: "bg-error/15 text-error" },
    rolling: { label: c.rolling, cls: "bg-accent/15 text-accent" },
    "not-published": { label: c.deadlineNotPublished, cls: "bg-text-muted/15 text-text-muted" },
  };
  const { label, cls } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${cls}`}>
      <CalendarDays className="w-4 h-4" />
      {label}
    </span>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <GlassCard className="mb-6">
      <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-accent" />
        {title}
      </h2>
      {children}
    </GlassCard>
  );
}

function Row({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon?: React.ElementType }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border-subtle last:border-0">
      {Icon && <Icon className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />}
      <span className="text-sm text-text-muted w-28 sm:w-36 shrink-0">{label}</span>
      <span className="text-sm text-text-primary min-w-0 break-words">{value}</span>
    </div>
  );
}

type Props = {
  programme: Programme;
  university: UniversityV2 | null;
  /** How many programmes the database holds, for the notice at the bottom. */
  total: number;
};

export default function ProgrammeDetailClient({ programme: p, university: uni, total }: Props) {
  const { locale } = useTranslation();
  const ar = locale === "ar";
  const c: Copy = ar ? COPY.ar : COPY.en;
  const reviewedOn = feeReviewedOn(p);
  const deadlineStatus = getDeadlineStatus(p);
  const name = ar && p.name.ar ? p.name.ar : p.name.en;
  const uniName = uni?.name ?? p.universityId;
  const value = (v: string) => (ar ? DEGREE_VALUE_AR[v] ?? LANGUAGE_AR[v] ?? v : v);
  const city = uni ? (ar ? CITY_AR[uni.city] ?? uni.city : uni.city) : c.czechia;
  const field = ar ? FIELD_AR[p.field] ?? p.field : p.field;
  const money = (n: number) => n.toLocaleString("en-US");

  return (
    <div>
      <Breadcrumbs items={[{ label: ar ? "البرامج" : "Programmes", href: "/programmes" }, { label: name }]} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-accent/15 text-accent">
            {value(p.degree)}
          </span>
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-surface-raised text-text-secondary">
            {value(p.language)}
          </span>
          <DeadlineBadge status={deadlineStatus} date={p.applicationDeadline} c={c} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{name}</h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-text-secondary text-sm">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            <Link href={`/university/${uni?.id ?? p.universityId}`} className="hover:text-accent transition-colors underline underline-offset-2">
              {uniName}
            </Link>
          </span>
          {p.faculty && (
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {p.faculty}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {city}
            {uni ? ` · ${uni.type === "private" ? c.private : c.public}` : ""}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <ProgrammeSourceBadge programme={p} locale={locale} />
          <SaveProgrammeButton programmeId={p.id} locale={locale} size="md" />
        </div>
      </div>

      {deadlineStatus !== "passed" && deadlineStatus !== "rolling" && (
        <EmailSignup source="deadline" programmeIds={[p.id]} compact className="mb-8" />
      )}

      {deadlineStatus === "verified" && <DeadlineSoonOffer deadline={p.applicationDeadline} programmeId={p.id} ar={ar} />}

      {/* ── Key Facts ─────────────────────────────────────────── */}
      <Section title={c.keyFacts} icon={ClipboardList}>
        <Row icon={GraduationCap} label={c.degree} value={value(p.degree)} />
        <Row icon={Globe} label={c.language} value={value(p.language)} />
        <Row icon={Clock} label={c.duration} value={c.years(p.durationYears)} />
        <Row icon={Euro} label={c.tuition} value={
          <span>
            €{money(p.tuitionEurPerYear)} {c.perYear}
            {p.tuitionCzkPerYear && <span className="text-text-muted ms-1">(CZK {money(p.tuitionCzkPerYear)})</span>}
            {p.tuitionNote && <span className="text-text-muted ms-1">({p.tuitionNote})</span>}
          </span>
        } />
        {p.applicationFeeEur !== undefined && (
          <Row icon={Euro} label={c.applicationFee} value={`€${p.applicationFeeEur}`} />
        )}
        <Row icon={CalendarDays} label={c.applicationDeadline} value={
          p.applicationDeadline
            ? `${p.applicationDeadline}${p.applicationDeadlineRound ? ` (${p.applicationDeadlineRound})` : ""}`
            : p.deadlineType === "rolling" ? c.rolling : c.notPublished
        } />
        {p.applicationOpenDate && (
          <Row icon={CalendarDays} label={c.applicationsOpen} value={p.applicationOpenDate} />
        )}
        <Row icon={FileText} label={c.entranceExam} value={
          <span>
            {c.yes}
            {p.entranceExamDetails && (
              <span className="text-text-muted block mt-0.5">
                {ar && p.entranceExamDetails.ar ? p.entranceExamDetails.ar : p.entranceExamDetails.en}
              </span>
            )}
          </span>
        } />
        {p.entranceExamDate && (
          <Row icon={CalendarDays} label={c.examDate} value={p.entranceExamDate} />
        )}
        <Row icon={GraduationCap} label={c.field} value={field + (p.subfield ? `${ar ? "، " : ", "}${ar ? FIELD_AR[p.subfield] ?? p.subfield : p.subfield}` : "")} />
      </Section>

      {/* ── Application ───────────────────────────────────────── */}
      <Section title={c.application} icon={FileText}>
        {p.languageRequirement && (
          <Row icon={Globe} label={c.languageRequirement} value={p.languageRequirement} />
        )}
        {p.requiredDocuments && p.requiredDocuments.length > 0 && (
          <div className="mb-3">
            <h3 className="text-sm font-medium text-text-secondary mb-2 flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4" />
              {c.requiredDocuments}
            </h3>
            <ul className="list-disc list-inside text-sm text-text-primary space-y-1 ps-2">
              {p.requiredDocuments.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>
        )}
        {(!p.requiredDocuments || p.requiredDocuments.length === 0) && !p.languageRequirement && (
          <p className="text-sm text-text-muted">{c.checkOfficial}</p>
        )}
        <div className="mt-4 pt-4 border-t border-border-subtle">
          <a
            href={p.programmeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-background font-medium text-sm hover:bg-accent/90 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {c.visitOfficial}
          </a>
        </div>
      </Section>

      {/* ── Trust ─────────────────────────────────────────────── */}
      <Section title={c.trustTitle} icon={ShieldCheck}>
        <div className="space-y-3 text-sm">
          {feeVerified(p) ? (
            <>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-success mt-0.5 shrink-0" />
                <div>
                  <span className="text-text-primary font-medium">{c.officialSource}</span>
                  <p className="text-text-muted mt-0.5">{c.officialSourceText}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarDays className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <span className="text-text-primary font-medium">
                    {c.lastVerified} {p.verification.lastVerified}
                  </span>
                  <p className="text-text-muted mt-0.5">{c.verifiedBy(p.verification.verifiedBy)}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
                <div>
                  <span className="text-text-primary font-medium">{c.feeRecheckTitle}</span>
                  <p className="text-text-muted mt-0.5">{c.feeRecheckText}</p>
                </div>
              </div>
              {/* A date only where a recorded review of this source exists; it never confirms the fee. */}
              {reviewedOn && (
                <div className="flex items-start gap-2">
                  <CalendarDays className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-text-primary font-medium">
                    {c.sourceReviewed} <span dir="ltr">{reviewedOn}</span>
                  </span>
                </div>
              )}
            </>
          )}
          <div className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div className="min-w-0">
              <span className="text-text-primary font-medium">{c.source}</span>
              <p className="text-text-muted mt-0.5">
                <a
                  href={p.verification.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="underline underline-offset-2 hover:text-text-secondary break-all"
                >
                  {p.verification.sourceUrl}
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-border-subtle">
            <AlertCircle className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
            <p className="text-text-muted text-xs">{c.disclaimer}</p>
          </div>
        </div>
      </Section>

      {/* ── CTAs ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        <a
          href={p.programmeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-background font-semibold hover:bg-accent/90 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          {c.apply}
        </a>
        <Link
          href={`/programmes/compare?ids=${p.id}`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border-subtle text-text-secondary font-medium text-sm hover:border-accent/40 hover:text-accent transition-colors"
        >
          <GitCompareArrows className="w-4 h-4" />
          {c.compare}
        </Link>
      </div>

      {/* ── Database notice ───────────────────────────────────── */}
      <p className="text-xs text-text-muted mt-8 text-center">{c.database(total)}</p>
    </div>
  );
}

/**
 * Only when a verified deadline is under 8 weeks away: the one moment a
 * document check really helps. Days are counted after mount, so the static
 * HTML never carries a stale number. docs/JOURNEY.md, 2.5.
 */
function DeadlineSoonOffer({ deadline, programmeId, ar }: { deadline?: string; programmeId: string; ar: boolean }) {
  const [days, setDays] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (!deadline) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the date is only known in the browser
    setDays(Math.ceil((new Date(deadline).getTime() - Date.now()) / 86_400_000));
  }, [deadline]);
  if (days === null || days < 0 || days >= 56) return null;
  return (
    <div className="mb-8 rounded-2xl border border-border-subtle bg-surface-raised p-4 text-sm">
      <HelpLink service="documentReview" source={`programme:${programmeId}`} className="font-medium text-brand hover:underline">
        {ar
          ? `فاضل ${days} يوم على آخر ميعاد. تحب أراجع أوراقك قبل ما تقدم؟`
          : `${days} days to the deadline. Want me to check your documents before you submit?`}
      </HelpLink>
    </div>
  );
}
