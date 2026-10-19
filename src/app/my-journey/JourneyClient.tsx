"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton, buttonClasses } from "@/components/ui/magnetic-button";
import { HelpLink } from "@/components/help-sheet";
import { EmailSignup } from "@/components/email-signup";
import { track } from "@/components/umami";
import { whatsappWithText } from "@/config/contact";
import { stageOrder, type StageSlug } from "@/data/stages";
import { STAGE_LABELS, nextStep, journeySummary, eligibilityForm, type NextStep } from "@/lib/journey-plan";
import { scoreForm, topRisks, verdictFor, en as eligEn, ar as eligAr } from "@/app/eligibility/eligibility-logic";
import { cn } from "@/lib/utils";
import {
  loadJourney,
  toggleChecklistItem,
  removeProgrammeFromJourney,
  getJourneyProgress,
  getDaysUntilDeadline,
  setJourneyStage,
  type JourneyData,
  type SavedProgramme,
} from "@/lib/journey-store";
import { getProgrammeById } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import {
  Bookmark,
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  Trash2,
  GraduationCap,
  Compass,
  ArrowRight,
  BookOpen,
  MessageCircle,
  Euro,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "@/components/locale-link";
import Image from "next/image";

function ProgressRing({ percent, size = 56 }: { percent: number; size?: number }) {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;
  const color = percent >= 80 ? "#22c55e" : percent >= 40 ? "#f59e0b" : "#64748b";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-surface-raised" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          className="ring-fill transition-all duration-700 ease-out"
          style={{ "--ring": `${circ}` } as React.CSSProperties}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text-primary">
        {percent}%
      </span>
    </div>
  );
}

function DeadlineBadge({ deadline, locale }: { deadline: string | undefined; locale: "en" | "ar" }) {
  const days = getDaysUntilDeadline(deadline);
  if (days === null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-text-muted">
        <Clock className="w-3 h-3" />
        {locale === "ar" ? "لم يُعلن الموعد" : "Deadline not published"}
      </span>
    );
  }
  if (days < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-error">
        <AlertTriangle className="w-3 h-3" />
        {locale === "ar" ? "انتهى الموعد" : "Deadline passed"}
      </span>
    );
  }
  if (days <= 14) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-error font-medium">
        <AlertTriangle className="w-3 h-3" />
        {days} {locale === "ar" ? "يوم متبقي!" : days === 1 ? "day left!" : "days left!"}
      </span>
    );
  }
  if (days <= 30) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-brand font-medium">
        <Clock className="w-3 h-3" />
        {days} {locale === "ar" ? "يوم متبقي" : "days left"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-success">
      <Clock className="w-3 h-3" />
      {days} {locale === "ar" ? "يوم متبقي" : "days left"}
    </span>
  );
}

function ProgrammeJourneyCard({
  saved,
  locale,
  onToggle,
  onRemove,
}: {
  saved: SavedProgramme;
  locale: "en" | "ar";
  onToggle: (programmeId: string, itemId: string) => void;
  onRemove: (programmeId: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const prog = getProgrammeById(saved.programmeId);
  if (!prog) return null;
  const uni = universitiesV2.find((u) => u.id === prog.universityId);
  const progress = getJourneyProgress(saved);
  const days = getDaysUntilDeadline(prog.applicationDeadline);

  return (
    <GlassCard className="relative overflow-hidden">
      {days !== null && days <= 14 && days >= 0 && (
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-red-500 via-brand to-red-500" />
      )}
      <div className="flex items-start gap-4">
        <ProgressRing percent={progress} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                href={`/programmes/${prog.id}`}
                className="text-base font-semibold text-text-primary hover:text-brand transition-colors"
              >
                {prog.name[locale] || prog.name.en}
              </Link>
              <p className="text-xs text-text-secondary mt-0.5">
                {uni?.name} · {prog.degree} · {prog.language}
              </p>
            </div>
            <button
              onClick={() => onRemove(saved.programmeId)}
              className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors"
              aria-label={locale === "ar" ? "إزالة" : "Remove"}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <DeadlineBadge deadline={prog.applicationDeadline} locale={locale} />
            <span className="inline-flex items-center gap-1 text-xs text-text-muted">
              <Euro className="w-3 h-3" />
              €{prog.tuitionEurPerYear.toLocaleString()} {locale === "ar" ? "في السنة" : "per year"}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary mt-3 transition-colors"
      >
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        {locale === "ar" ? "قائمة المهام" : "Checklist"} ({saved.checklist.filter((c) => c.done).length}/{saved.checklist.length})
      </button>

      {expanded && (
        <div className="mt-3 space-y-1.5">
          {saved.checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => onToggle(saved.programmeId, item.id)}
              className={`flex items-center gap-2.5 w-full text-start px-2.5 py-1.5 rounded-lg transition-colors text-sm ${
                item.done
                  ? "text-text-muted line-through bg-white/[0.02]"
                  : "text-text-secondary hover:bg-white/[0.04]"
              }`}
            >
              {item.done ? (
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-text-muted shrink-0" />
              )}
              {item.label[locale] || item.label.en}
            </button>
          ))}
        </div>
      )}

    </GlassCard>
  );
}

function JourneySkeleton({ locale }: { locale: "en" | "ar" }) {
  return (
    <div className="text-center py-16">
      <p className="text-sm text-text-muted">
        {locale === "ar" ? "بنحمّل رحلتك..." : "Loading your journey..."}
      </p>
    </div>
  );
}

function EmptyJourney({ locale }: { locale: "en" | "ar" }) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-border-subtle flex items-center justify-center mx-auto mb-6">
        <Bookmark className="w-10 h-10 text-text-muted" />
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2">
        {locale === "ar" ? "رحلتك تبدأ هنا" : "Your journey starts here"}
      </h2>
      <p className="text-sm text-text-secondary max-w-md mx-auto mb-8">
        {locale === "ar"
          ? "احفظ البرامج اللي تعجبك وتابع تقدمك في التقديم. كل شي يُحفظ في متصفحك."
          : "Save programmes you're interested in and track your application progress. Everything is stored in your browser."}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <MagneticButton variant="primary" size="md" href="/programmes">
          <GraduationCap className="w-4 h-4" />
          {locale === "ar" ? "تصفح البرامج" : "Browse Programmes"}
        </MagneticButton>
        <MagneticButton variant="secondary" size="md" href="/university-matcher">
          <Compass className="w-4 h-4" />
          {locale === "ar" ? "ابحث عن برنامجك" : "Find Your Match"}
        </MagneticButton>
      </div>
    </div>
  );
}

// ── The hub ──────────────────────────────────────────────────────────────────
// Everything the visitor has done on the site, in one place: where they are,
// their next step, their eligibility plan, their programmes. No account:
// localStorage, plus an optional email once Brevo is on. docs/JOURNEY.md, 2.6.

const HUB = {
  en: {
    title: "My Journey",
    intro: "Everything you've saved on this site, in one place. It stays in this browser; nothing is sent anywhere.",
    stageQ: "Where are you now?",
    nextTitle: "Your next step",
    diy: "Do it yourself",
    withJohn: "Do it with John",
    planTitle: "Your eligibility plan",
    planUpdate: "Update my answers",
    noPlan: "You haven't checked your eligibility yet.",
    risksNone: "Nothing stands in your way.",
    budgetTitle: "Your budget",
    budgetPerMonth: "a month in",
    progTitle: "Your programmes",
    noProgs: "No programmes saved yet. Save them from any programme page or the matcher.",
    send: "Send my plan to John",
    sendHint: "Opens WhatsApp with a short summary. Nothing is sent until you press send.",
    johnHelp: {
      consultation: "A 30-minute call with me",
      documentReview: "I check your documents",
      interviewPrep: "A mock interview with me",
      arrivalSupport: "Your arrival plan with me",
      fullPackage: "The Full Journey with me",
    },
  },
  ar: {
    title: "رحلتي",
    intro: "كل اللي حفظته على الموقع في مكان واحد. متخزن في المتصفح ده بس، ومفيش حاجة بتتبعت لأي حد.",
    stageQ: "إنت فين دلوقتي؟",
    nextTitle: "خطوتك الجاية",
    diy: "اعملها بنفسك",
    withJohn: "اعملها مع جون",
    planTitle: "خطة الأهلية بتاعتك",
    planUpdate: "عدّل إجاباتي",
    noPlan: "لسه ماشفتش وضعك في اختبار الأهلية.",
    risksNone: "مفيش حاجة واقفة قدامك.",
    budgetTitle: "ميزانيتك",
    budgetPerMonth: "في الشهر في",
    progTitle: "برامجك",
    noProgs: "لسه ماحفظتش برامج. احفظها من أي صفحة برنامج أو من مطابق البرامج.",
    send: "ابعت خطتي لجون",
    sendHint: "هيفتح واتساب بملخص قصير. مفيش حاجة بتتبعت غير لما تدوس إرسال.",
    johnHelp: {
      consultation: "مكالمة 30 دقيقة معايا",
      documentReview: "أراجعلك أوراقك",
      interviewPrep: "مقابلة تجريبية معايا",
      arrivalSupport: "خطة وصولك معايا",
      fullPackage: "الرحلة الكاملة معايا",
    },
  },
};

function NextStepCard({ step, locale }: { step: NextStep; locale: "en" | "ar" }) {
  const h = HUB[locale];
  return (
    <section aria-labelledby="next-step" className="mb-8 rounded-2xl border border-brand/30 bg-brand/[0.04] p-5 sm:p-6" data-source={`journey:${step.id}`}>
      <p id="next-step" className="text-xs font-semibold uppercase tracking-wide text-brand mb-1.5">
        {h.nextTitle}
      </p>
      <h2 className="text-xl font-bold text-text-primary mb-4">{step.title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {step.diy && (
          <Link href={step.diy.href} className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface p-4 hover:border-brand transition-colors">
            <BookOpen className="w-5 h-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              <span className="block text-xs text-text-muted">{h.diy}</span>
              <span className="block text-sm font-semibold text-text-primary">{step.diy.label}</span>
            </span>
          </Link>
        )}
        {step.john && (
          <HelpLink
            service={step.john}
            source={`journey:${step.id}`}
            className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface p-4 hover:border-brand transition-colors"
          >
            <Image src="/images/john.jpg" alt="" width={32} height={32} sizes="32px" className="w-8 h-8 rounded-full object-cover shrink-0" />
            <span>
              <span className="block text-xs text-text-muted">{h.withJohn}</span>
              <span className="block text-sm font-semibold text-text-primary">{h.johnHelp[step.john]}</span>
            </span>
          </HelpLink>
        )}
      </div>
      {step.extra && (
        <Link href={step.extra.href} className="mt-3 inline-flex items-center gap-1 text-sm text-brand hover:underline">
          {step.extra.label}
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
        </Link>
      )}
    </section>
  );
}

function StagePicker({ value, onChange, locale }: { value?: StageSlug; onChange: (s: StageSlug) => void; locale: "en" | "ar" }) {
  return (
    <fieldset className="mb-6">
      <legend className="text-sm font-semibold text-text-primary mb-2">{HUB[locale].stageQ}</legend>
      <div className="flex flex-wrap gap-2">
        {stageOrder.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={value === s}
            onClick={() => onChange(s)}
            className={cn(
              "min-h-10 px-3.5 py-2 rounded-full border text-sm transition-colors",
              value === s ? "border-brand bg-brand text-bg font-medium" : "border-border-subtle bg-surface text-text-secondary hover:border-brand hover:text-brand"
            )}
          >
            {STAGE_LABELS[s][locale]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function EligibilityPlan({ journey, locale }: { journey: JourneyData; locale: "en" | "ar" }) {
  const h = HUB[locale];
  const form = eligibilityForm(journey);
  if (!form) {
    return (
      <GlassCard className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-1">{h.planTitle}</h2>
        <p className="text-sm text-text-secondary mb-3">{h.noPlan}</p>
        <Link href="/eligibility" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
          {locale === "ar" ? "اختبار الأهلية" : "The eligibility check"}
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </GlassCard>
    );
  }
  const copy = locale === "ar" ? eligAr : eligEn;
  const { categories, pct } = scoreForm(form);
  const verdict = verdictFor(categories);
  const risks = topRisks(categories);
  return (
    <GlassCard className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <ProgressRing percent={pct} />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-text-primary">{h.planTitle}</h2>
          <p className="text-sm text-text-secondary">{copy.plan.verdicts[verdict]}</p>
        </div>
      </div>
      {risks.length === 0 ? (
        <p className="text-sm text-text-secondary">{h.risksNone}</p>
      ) : (
        <ul className="space-y-3">
          {risks.map((r) => {
            const info = copy.resultCategories[r.key as keyof typeof copy.resultCategories];
            const advice = info.advice[r.status];
            return (
              <li key={r.key} className="border-t border-border-subtle pt-3">
                <p className="text-sm font-semibold text-text-primary">{info.title}</p>
                <p className="text-xs text-text-muted mb-1.5">{info[r.status]}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                  {advice && (
                    <Link href={advice.freeLink} className="text-text-primary hover:text-brand">
                      <span className="text-text-muted">{h.diy}:</span> {advice.freeLabel}
                    </Link>
                  )}
                  {r.service && (
                    <HelpLink service={r.service} source={`journey:${r.key}`} className="text-brand hover:underline">
                      {h.withJohn}
                    </HelpLink>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <Link href="/eligibility" className="mt-4 inline-block text-xs text-text-muted hover:text-brand underline underline-offset-2">
        {h.planUpdate}
      </Link>
    </GlassCard>
  );
}

export default function JourneyClient() {
  const { locale } = useTranslation();
  const h = HUB[locale];
  const [journey, setJourney] = useState<JourneyData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only state after mount so the static HTML hydrates cleanly
    setJourney(loadJourney());
    setNow(Date.now());
    setLoaded(true);
  }, []);

  const handleToggle = useCallback((programmeId: string, itemId: string) => {
    setJourney({ ...toggleChecklistItem(programmeId, itemId) });
  }, []);

  const handleRemove = useCallback((programmeId: string) => {
    setJourney({ ...removeProgrammeFromJourney(programmeId) });
  }, []);

  const handleStage = useCallback((stage: StageSlug) => {
    setJourney({ ...setJourneyStage(stage) });
  }, []);

  const saved = journey?.savedProgrammes || [];
  const step = loaded ? nextStep(journey, locale, getProgrammeById, now) : null;
  const eligibilityAnswers = eligibilityForm(journey);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <Breadcrumbs items={[{ label: h.title }]} />

        <div className="relative w-full h-[120px] sm:h-[160px] rounded-2xl overflow-hidden mb-6">
          <Image
            src="/images/study/reading-outdoors.jpg"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent" />
          <div className="absolute bottom-4 start-4 z-10 rounded-xl bg-ink px-4 py-3 shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{h.title}</h1>
          </div>
        </div>
        <p className="text-sm text-text-secondary mb-6">{h.intro}</p>

        {!loaded || !step ? (
          <JourneySkeleton locale={locale} />
        ) : (
          <>
            <StagePicker value={journey?.stage} onChange={handleStage} locale={locale} />
            <NextStepCard step={step} locale={locale} />
            <EligibilityPlan journey={journey ?? initialJourneyShape()} locale={locale} />

            {journey?.budget && (
              <GlassCard className="mb-8">
                <h2 className="text-lg font-semibold text-text-primary mb-1">{h.budgetTitle}</h2>
                <p className="text-sm text-text-secondary">
                  {journey.budget.monthlyCzk.toLocaleString("en-US")} Kč {h.budgetPerMonth} {journey.budget.city}
                </p>
              </GlassCard>
            )}

            <section aria-labelledby="my-programmes" className="mb-8">
              <h2 id="my-programmes" className="text-lg font-semibold text-text-primary mb-3">
                {h.progTitle}
              </h2>
              {saved.length === 0 ? (
                <EmptyJourney locale={locale} />
              ) : (
                <>
                  <div className="space-y-4">
                    {saved.map((s) => (
                      <ProgrammeJourneyCard key={s.programmeId} saved={s} locale={locale} onToggle={handleToggle} onRemove={handleRemove} />
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <MagneticButton variant="secondary" size="md" href="/programmes">
                      <GraduationCap className="w-4 h-4" />
                      {locale === "ar" ? "أضف المزيد من البرامج" : "Add More Programmes"}
                    </MagneticButton>
                  </div>
                </>
              )}
            </section>

            <section className="space-y-3">
              <a
                href={whatsappWithText(journeySummary(journey, locale, getProgrammeById))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("plan_sent_whatsapp", { tool: "journey" })}
                className={buttonClasses("primary", "md", "w-full")}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {h.send}
              </a>
              <p className="text-xs text-text-muted text-center">{h.sendHint}</p>
              {eligibilityAnswers ? (
                <EmailSignup source="eligibility" answers={{ ...eligibilityAnswers, firstName: "", country: "", whatsapp: "", email: "" }} />
              ) : saved.length > 0 ? (
                <EmailSignup source="matcher" programmeIds={saved.slice(0, 5).map((s) => s.programmeId)} />
              ) : null}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function initialJourneyShape(): JourneyData {
  return { version: 1, name: "", savedProgrammes: [], eligibilityDone: false, updatedAt: "" };
}
