"use client";

import { track, trackToolStarted } from "@/components/umami";
import { useMemo, useState, useRef } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { EmailSignup } from "@/components/email-signup";
import { HelpLink } from "@/components/help-sheet";
import { buttonClasses } from "@/components/ui/magnetic-button";
import Link from "@/components/locale-link";
import { addProgrammeToJourney } from "@/lib/journey-store";
import { filterProgrammes, programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme, City } from "@/data/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Sparkles,
  ExternalLink,
  Euro,
  Clock,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CITY_AR } from "@/i18n/ar-metadata";
import Image from "next/image";

type BudgetBucket = "low" | "mid" | "high" | "any";
const budgetRanges: Record<Exclude<BudgetBucket, "any">, [number, number]> = {
  low: [0, 3000],
  mid: [3000, 8000],
  high: [8000, Infinity],
};

const budgetLabels: { key: BudgetBucket; en: string; ar: string }[] = [
  { key: "low", en: "Up to €3,000 / year", ar: "لحد 3,000 يورو في السنة" },
  { key: "mid", en: "€3,000 – €8,000 / year", ar: "3,000 – 8,000 يورو في السنة" },
  { key: "high", en: "€8,000+ / year", ar: "أكثر من 8,000 يورو في السنة" },
  { key: "any", en: "No limit / not sure yet", ar: "لا حد أقصى / غير متأكد بعد" },
];

const languageLabels: { key: "English" | "Czech" | "any"; en: string; ar: string }[] = [
  { key: "English", en: "English", ar: "إنجليزي" },
  { key: "Czech", en: "Czech", ar: "تشيكي" },
  { key: "any", en: "Either is fine", ar: "أي لغة تناسبني" },
];

const fieldLabels: { key: string; en: string; ar: string }[] = [
  { key: "any", en: "Any field", ar: "أي مجال" },
  { key: "Medicine", en: "Medicine", ar: "الطب" },
  { key: "Veterinary Medicine", en: "Veterinary Medicine", ar: "الطب البيطري" },
  { key: "Business", en: "Business", ar: "الأعمال" },
  { key: "Economics", en: "Economics", ar: "الاقتصاد" },
  { key: "Finance", en: "Finance", ar: "المالية" },
  { key: "Engineering", en: "Engineering", ar: "الهندسة" },
  { key: "IT", en: "IT / Computer Science", ar: "تكنولوجيا المعلومات" },
  { key: "Chemistry", en: "Chemistry", ar: "الكيمياء" },
  { key: "Social Sciences", en: "Social Sciences", ar: "العلوم الاجتماعية" },
  { key: "International Relations", en: "International Relations", ar: "العلاقات الدولية" },
  { key: "Agriculture", en: "Agriculture", ar: "الزراعة" },
  { key: "Development Studies", en: "Development Studies", ar: "دراسات التنمية" },
  { key: "Psychology", en: "Psychology", ar: "علم النفس" },
];

/** A matcher choice can cover more than one data field. */
const FIELD_MATCHES: Record<string, string[]> = { IT: ["IT", "Computer Science"] };

type MatchResult = {
  programme: Programme;
  universityName: string;
  city: City;
  score: number;
  reasons: { en: string; ar: string }[];
};

function computeMatches(
  field: string,
  budget: BudgetBucket,
  language: "English" | "Czech" | "any",
  city: string
): MatchResult[] {
  const hardFilters: Parameters<typeof filterProgrammes>[0] = {};
  if (language !== "any") hardFilters.language = language;
  if (budget !== "any") {
    const [, hi] = budgetRanges[budget];
    if (hi !== Infinity) hardFilters.maxTuition = hi;
  }
  if (city !== "any") hardFilters.city = city;

  const fields = FIELD_MATCHES[field] ?? [field];
  const eligible = filterProgrammes(hardFilters, universitiesV2).filter(
    (p) => field === "any" || fields.some((f) => p.field === f || p.subfield === f)
  );

  return eligible
    .map((prog) => {
      const uni = universitiesV2.find((u) => u.id === prog.universityId);
      if (!uni) return null;

      let score = 0;
      const reasons: { en: string; ar: string }[] = [];

      if (city !== "any") {
        reasons.push({ en: `Located in ${city}`, ar: `في ${CITY_AR[city] ?? city}` });
      }

      if (field !== "any") {
        score += 30;
        const label = fieldLabels.find((f) => f.key === field);
        reasons.push({
          en: `Matches your field: ${label?.en ?? field}`,
          ar: `يطابق مجالك: ${label?.ar ?? field}`,
        });
      }

      if (budget !== "any") {
        const [lo, hi] = budgetRanges[budget];
        const mid = hi === Infinity ? lo : (lo + hi) / 2;
        const distFromMid = Math.abs(prog.tuitionEurPerYear - mid);
        const range = hi === Infinity ? 10000 : hi - lo;
        score += Math.round(25 * Math.max(0, 1 - distFromMid / range));
        reasons.push({
          en: `€${prog.tuitionEurPerYear.toLocaleString()} per year fits your budget`,
          ar: `€${prog.tuitionEurPerYear.toLocaleString()} في السنة ضمن ميزانيتك`,
        });
      }

      reasons.push({
        en: `Taught in ${prog.language}`,
        ar: `التدريس بـ${prog.language === "English" ? "الإنجليزية" : "التشيكية"}`,
      });

      return {
        programme: prog,
        universityName: uni.name,
        city: uni.city,
        score,
        reasons,
      };
    })
    .filter((r): r is MatchResult => r !== null)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.programme.tuitionEurPerYear - b.programme.tuitionEurPerYear;
    });
}

const cityOptions = Array.from(new Set(universitiesV2.map((u) => u.city))).sort();

export default function MatcherPage() {
  const { t, locale } = useTranslation();
  const [step, setStep] = useState(0);
  const [city, setCity] = useState<string>("any");
  const [field, setField] = useState<string | null>(null);
  const [budget, setBudget] = useState<BudgetBucket | null>(null);
  const [language, setLanguage] = useState<"English" | "Czech" | "any" | null>(null);

  const results = useMemo(() => {
    if (step < 4) return [];
    return computeMatches(
      field || "any",
      budget || "any",
      language || "any",
      city
    );
  }, [step, field, budget, language, city]);

  const canGoNext = [
    true,
    field !== null,
    budget !== null,
    language !== null,
  ][step];

  const completed = useRef(false);

  const reset = () => {
    completed.current = false;
    setStep(0);
    setCity("any");
    setField(null);
    setBudget(null);
    setLanguage(null);
  };

  const stepFieldTitle = locale === "ar" ? "عايز تدرس إيه؟" : "What do you want to study?";

  const steps = [
    {
      title: t.matcher.stepCity,
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <OptionCard
            active={city === "any"}
            onClick={() => setCity("any")}
            label={t.matcher.anyCity}
          />
          {cityOptions.map((c) => (
            <OptionCard key={c} active={city === c} onClick={() => setCity(c)} label={locale === "ar" ? CITY_AR[c] ?? c : c} />
          ))}
        </div>
      ),
    },
    {
      title: stepFieldTitle,
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {fieldLabels.map((f) => (
            <OptionCard
              key={f.key}
              active={field === f.key}
              onClick={() => setField(f.key)}
              label={locale === "ar" ? f.ar : f.en}
            />
          ))}
        </div>
      ),
    },
    {
      title: t.matcher.stepBudget,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {budgetLabels.map((b) => (
            <OptionCard
              key={b.key}
              active={budget === b.key}
              onClick={() => setBudget(b.key)}
              label={locale === "ar" ? b.ar : b.en}
            />
          ))}
        </div>
      ),
    },
    {
      title: t.matcher.stepLanguage,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {languageLabels.map((l) => (
            <OptionCard
              key={l.key}
              active={language === l.key}
              onClick={() => setLanguage(l.key)}
              label={locale === "ar" ? l.ar : l.en}
            />
          ))}
        </div>
      ),
    },
  ];

  const totalSteps = steps.length + 1;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />

      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero image */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative w-full h-[130px] sm:h-[170px] rounded-2xl overflow-hidden">
            <Image
              src="/images/prague-architecture.jpg"
              alt="Prague river and bridge view"
              fill
              loading="eager"
              fetchPriority="high"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
        </div>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            {t.matcher.title}
          </h1>
          <p className="text-text-secondary leading-relaxed">{t.matcher.subtitle}</p>
          <p className="text-xs text-text-muted mt-2">
            {locale === "ar"
              ? `بيدور في ${programmes.length} برنامج اتأكدنا منهم من مواقع الجامعات نفسها.`
              : `Searches the ${programmes.length} programmes we've checked on each university's own website.`}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === step ? "w-8 bg-brand" : "w-1.5 bg-border-subtle"
              )}
            />
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {step < steps.length ? (
              <motion.div
                key={step}
                initial={{ x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <GlassCard hoverEffect="border">
                  <h2 className="text-lg font-semibold text-text-primary mb-5">
                    {steps[step].title}
                  </h2>
                  {steps[step].content}
                </GlassCard>

                <div className="flex items-center justify-between mt-6">
                  <MagneticButton
                    variant="ghost"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className={cn(step === 0 && "invisible")}
                  >
                    <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                    {t.matcher.back}
                  </MagneticButton>
                  <MagneticButton
                    variant="primary"
                    onClick={() => {
                      if (!canGoNext) return;
                      trackToolStarted("matcher");
                      if (step === steps.length - 1 && !completed.current) {
                        completed.current = true; // count a double tap once
                        track("tool_completed", { tool: "matcher", field: field || "any" });
                      }
                      // Clamp: a double tap during the animation must not skip a question.
                      setStep((s) => Math.min(step + 1, s + 1, steps.length));
                    }}
                    className={cn(!canGoNext && "opacity-50 pointer-events-none")}
                  >
                    {step === steps.length - 1 ? t.matcher.seeResults : t.matcher.next}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </MagneticButton>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    {t.matcher.resultsTitle}
                  </h2>
                  <p className="text-text-secondary text-sm">
                    {results.length > 0
                      ? `${results.length} ${locale === "ar" ? "برنامج مطابق" : "matching programmes"}`
                      : ""}
                  </p>
                </div>

                {results.length === 0 ? (
                  <p className="text-center text-text-muted py-10">{t.matcher.noResults}</p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {results.map((match, i) => (
                      <motion.div
                        key={match.programme.id}
                        initial={{ y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                      >
                        <MatchCard match={match} locale={locale} rank={i + 1} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {results.length > 0 && <MatcherPlan ids={results.slice(0, 5).map((m) => m.programme.id)} locale={locale} />}

                <GlassCard hoverEffect="border" className="text-center mb-4" href="/eligibility">
                  <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    {locale === "ar"
                      ? "لقيت برنامجك؟ يلا نشوف لو جاهز تقدم."
                      : "Found your programme? Let's check if you're ready to apply."}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    {locale === "ar"
                      ? "جاوب على كام سؤال في دقيقتين وشوف لو درجاتك وأوراقك ووقتك كويسين."
                      : "Take a 2-minute eligibility check to see if your grades, documents, and timeline are on track."}
                  </p>
                  <span className="text-sm font-medium text-brand">
                    {locale === "ar" ? "شوف لو تقدر تقدم (ببلاش) →" : "Check My Eligibility (Free) →"}
                  </span>
                </GlassCard>

                <EmailSignup source="matcher" programmeIds={results.slice(0, 5).map((m) => m.programme.id)} className="mt-6" />

                <div className="flex items-center justify-center gap-4 mt-6">
                  <MagneticButton variant="ghost" onClick={reset}>
                    {t.matcher.startOver}
                  </MagneticButton>
                  <MagneticButton variant="secondary" href="/deadlines">
                    {locale === "ar" ? "متتبع المواعيد" : "Deadline Tracker"}
                  </MagneticButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function MatchCard({
  match,
  locale,
  rank,
}: {
  match: MatchResult;
  locale: "en" | "ar";
  rank: number;
}) {
  const { programme: prog, universityName, city, reasons } = match;

  return (
    <GlassCard hoverEffect="glow" href={`/programmes/${prog.id}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand/10 text-brand text-xs font-bold border border-brand/20 shrink-0">
              {rank}
            </span>
            <h3 className="font-semibold text-text-primary text-sm truncate">
              {prog.name[locale] || prog.name.en}
            </h3>
          </div>
          {prog.faculty && (
            <p className="text-xs text-text-muted ms-8">{prog.faculty}</p>
          )}
        </div>
        <div className="flex gap-1.5 shrink-0">
          <span className="px-2 py-0.5 rounded-full bg-brand/10 text-brand text-[11px] font-medium border border-brand/20">
            {prog.degree}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-text-secondary ms-8 mb-2">
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3 h-3 text-text-muted" />
          {universityName}{locale === "ar" ? "، " : ", "}{locale === "ar" ? CITY_AR[city] ?? city : city}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary ms-8 mb-3">
        <span className="inline-flex items-center gap-1">
          <Euro className="w-3 h-3 text-brand/70" />
          €{prog.tuitionEurPerYear.toLocaleString()}/{locale === "ar" ? "سنة" : "yr"}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3 h-3 text-text-muted" />
          {prog.durationYears} {locale === "ar" ? "سنوات" : prog.durationYears === 1 ? "year" : "years"}
        </span>
        <span className="inline-flex items-center gap-1">
          <GraduationCap className="w-3 h-3 text-text-muted" />
          {locale === "ar" ? "امتحان قبول" : "Entrance exam"}
        </span>
      </div>

      <div className="ms-8 flex flex-wrap gap-1.5 mb-2">
        {reasons.map((r, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/5 text-success text-[10px] border border-success/10"
          >
            <ShieldCheck className="w-2.5 h-2.5" />
            {r[locale]}
          </span>
        ))}
      </div>

      <div className="ms-8 flex items-center justify-between">
        <VerifiedBadge
          date={prog.verification.lastVerified}
          sourceUrl={prog.verification.sourceUrl}
          label={locale === "ar" ? "تم التحقق:" : "Verified:"}
        />
        <span className="inline-flex items-center gap-1 text-xs text-brand">
          <ExternalLink className="w-3 h-3" />
          {locale === "ar" ? "التفاصيل" : "Details"}
        </span>
      </div>
    </GlassCard>
  );
}

function OptionCard({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-3 rounded-xl text-sm text-start border transition-colors",
        active
          ? "bg-brand/10 border-brand/50 text-text-primary font-medium"
          : "bg-surface border-border-subtle text-text-secondary hover:border-brand/30 hover:text-text-primary"
      )}
    >
      {label}
    </button>
  );
}

/** Keep the results, and one quiet offer: picking between them together. */
function MatcherPlan({ ids, locale }: { ids: string[]; locale: "en" | "ar" }) {
  const [saved, setSaved] = useState(false);
  const ar = locale === "ar";
  return (
    <div className="mb-6 space-y-3" data-source="matcher">
      {saved ? (
        <Link href="/my-journey" className={buttonClasses("secondary", "md", "w-full")}>
          <CheckCircle2 className="w-4 h-4 text-success" aria-hidden="true" />
          {ar ? "اتحفظوا. افتح رحلتي" : "Saved. Open My Journey"}
        </Link>
      ) : (
        <button
          type="button"
          className={buttonClasses("secondary", "md", "w-full")}
          onClick={() => {
            ids.forEach((id) => addProgrammeToJourney(id));
            setSaved(true);
            track("plan_saved", { tool: "matcher" });
          }}
        >
          <Bookmark className="w-4 h-4" aria-hidden="true" />
          {ar ? "احفظهم في رحلتي" : "Save these to My Journey"}
        </button>
      )}
      <p className="text-center text-sm text-text-secondary">
        <HelpLink service="consultation" source="matcher" className="font-medium text-brand hover:underline">
          {ar ? "محتار بينهم؟ يلا نختار مع بعض في 30 دقيقة." : "Not sure between these? Let's pick together in 30 minutes."}
        </HelpLink>
      </p>
    </div>
  );
}
