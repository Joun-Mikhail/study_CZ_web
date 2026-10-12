"use client";

import { track } from "@/components/umami";
import { useState, useRef } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WHATSAPP_URL, PAYMENT_LINKS, whatsappWithContext } from "@/config/contact";
import { EmailSignup } from "@/components/email-signup";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/components/locale-link";
import {
  User,
  GraduationCap,
  FileText,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { en, ar, initial, scoreForm, type FormData, type Status } from "./eligibility-logic";


export default function EligibilityClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [showResults, setShowResults] = useState(false);

  const set = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const stepDefs = [
    { title: t.steps[0], icon: GraduationCap },
    { title: t.steps[1], icon: FileText },
    { title: t.steps[2], icon: DollarSign },
    { title: t.steps[3], icon: Clock },
  ];

  const lastStep = stepDefs.length - 1;
  // A double tap on "Next" during the step animation used to run past the
  // last step and crash the page; never move more than one step per render.
  const goNext = () => setStep((s) => Math.min(step + 1, s + 1, lastStep));

  const finished = useRef(false);
  const handleFinish = () => {
    if (finished.current) return; // count a double tap once
    finished.current = true;
    setShowResults(true);
    track("eligibility_completed");
  };
  const reset = () => {
    finished.current = false;
    setForm(initial);
    setStep(0);
    setShowResults(false);
  };

  if (showResults) {
    return <ResultsView form={form} t={t} locale={locale} onReset={reset} />;
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero image */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative w-full h-[140px] sm:h-[180px] rounded-2xl overflow-hidden mb-6">
            <Image
              src="/images/prague-bridge.jpg"
              alt="Prague panoramic rooftops view"
              fill
              loading="eager"
              fetchPriority="high"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
        </div>
        <div className="max-w-2xl mx-auto text-center mb-8">
          <motion.div
            initial={{ y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              {t.title}
            </h1>
            <p className="text-text-secondary leading-relaxed">{t.subtitle}</p>
          </motion.div>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-1">
            {stepDefs.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center border transition-colors",
                      i === step
                        ? "bg-brand/20 border-brand text-brand"
                        : i < step
                        ? "bg-brand border-brand text-bg"
                        : "bg-surface border-border-subtle text-text-muted"
                    )}
                  >
                    {i < step ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-[10px] text-text-muted text-center leading-tight hidden sm:block">
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              <GlassCard hoverEffect="border">
                <h2 className="text-lg font-semibold text-text-primary mb-5">
                  {stepDefs[step].title}
                </h2>
                {step === 0 && <StepAcademics form={form} set={set} t={t} />}
                {step === 1 && <StepDocuments form={form} set={set} t={t} />}
                {step === 2 && <StepFinances form={form} set={set} t={t} />}
                {step === 3 && <StepTimeline form={form} set={set} t={t} />}
              </GlassCard>

              <div className="flex items-center justify-between mt-6">
                <MagneticButton
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={cn(step === 0 && "invisible")}
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  {t.back}
                </MagneticButton>
                <MagneticButton
                  variant="primary"
                  onClick={() => (step === lastStep ? handleFinish() : goNext())}
                >
                  {step === lastStep ? t.seeResults : t.next}
                  {step < lastStep && <ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                </MagneticButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ── Shared form components ──────────────────────────────────────────────────

interface StepProps {
  form: FormData;
  set: (k: keyof FormData, v: string) => void;
  t: typeof en;
  locale?: string;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-text-primary mb-1.5">{children}</label>;
}

function FieldHelper({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-text-muted mt-1">{children}</p>;
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand/50 transition-colors"
    />
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface text-text-primary text-sm focus:outline-none focus:border-brand/50 transition-colors appearance-none"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm border transition-colors",
            value === o.value
              ? "bg-brand/10 border-brand/50 text-text-primary font-medium"
              : "bg-surface border-border-subtle text-text-secondary hover:border-brand/30"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ── Step components ──────────────────────────────────────────────────────────

function StepAcademics({ form, set, t }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel>{t.fields.highestEducation}</FieldLabel>
        <RadioGroup
          value={form.highestEducation}
          onChange={(v) => set("highestEducation", v)}
          options={[
            { value: "highschool", label: t.options.highschool },
            { value: "bachelor", label: t.options.bachelor },
            { value: "master", label: t.options.master },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.gpa}</FieldLabel>
        <Input value={form.gpa} onChange={(v) => set("gpa", v)} placeholder={t.placeholders.gpa} />
        <FieldHelper>{t.helpers.gpa}</FieldHelper>
      </div>
      <div>
        <FieldLabel>{t.fields.targetLevel}</FieldLabel>
        <RadioGroup
          value={form.targetLevel}
          onChange={(v) => set("targetLevel", v)}
          options={[
            { value: "bachelor", label: t.options.bachelor },
            { value: "master", label: t.options.master },
            { value: "phd", label: t.options.phd },
          ]}
        />
      </div>
    </div>
  );
}

function StepDocuments({ form, set, t }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel>{t.fields.apostille}</FieldLabel>
        <RadioGroup
          value={form.apostille}
          onChange={(v) => set("apostille", v)}
          options={[
            { value: "yes", label: t.options.yes },
            { value: "no", label: t.options.no },
            { value: "unknown", label: t.options.dontKnow },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.translation}</FieldLabel>
        <RadioGroup
          value={form.translation}
          onChange={(v) => set("translation", v)}
          options={[
            { value: "english", label: t.options.translatedEn },
            { value: "czech", label: t.options.translatedCs },
            { value: "no", label: t.options.no },
            { value: "unsure", label: t.options.notSure },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.passportValid}</FieldLabel>
        <RadioGroup
          value={form.passportValid}
          onChange={(v) => set("passportValid", v)}
          options={[
            { value: "yes", label: t.options.yes },
            { value: "no", label: t.options.no },
            { value: "expiring", label: t.options.expiringSoon },
          ]}
        />
      </div>
    </div>
  );
}

function StepFinances({ form, set, t }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel>{t.fields.proofOfFunds}</FieldLabel>
        <RadioGroup
          value={form.proofOfFunds}
          onChange={(v) => set("proofOfFunds", v)}
          options={[
            { value: "available", label: t.options.availableNow },
            { value: "canArrange", label: t.options.canArrange },
            { value: "no", label: t.options.noOrUnsure },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.fundingSource}</FieldLabel>
        <RadioGroup
          value={form.fundingSource}
          onChange={(v) => set("fundingSource", v)}
          options={[
            { value: "family", label: t.options.family },
            { value: "savings", label: t.options.savings },
            { value: "scholarship", label: t.options.scholarship },
            { value: "work", label: t.options.workStudy },
          ]}
        />
      </div>
    </div>
  );
}

function StepTimeline({ form, set, t }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel>{t.fields.startWhen}</FieldLabel>
        <RadioGroup
          value={form.startWhen}
          onChange={(v) => set("startWhen", v)}
          options={[
            { value: "thisSemester", label: t.options.thisSemester },
            { value: "nextYear", label: t.options.nextYear },
            { value: "exploring", label: t.options.exploring },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.appliedBefore}</FieldLabel>
        <RadioGroup
          value={form.appliedBefore}
          onChange={(v) => set("appliedBefore", v)}
          options={[
            { value: "accepted", label: t.options.yesAccepted },
            { value: "rejected", label: t.options.yesRejected },
            { value: "no", label: t.options.firstTime },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.englishCert}</FieldLabel>
        <RadioGroup
          value={form.englishCert}
          onChange={(v) => set("englishCert", v)}
          options={[
            { value: "yes", label: t.options.yes },
            { value: "plan", label: t.options.planToTake },
            { value: "notRequired", label: t.options.notRequired },
            { value: "unsure", label: t.options.notSure },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.czechPrep}</FieldLabel>
        <RadioGroup
          value={form.czechPrep}
          onChange={(v) => set("czechPrep", v)}
          options={[
            { value: "course", label: t.options.courseTaken },
            { value: "selfStudy", label: t.options.selfStudy },
            { value: "none", label: t.options.noneYet },
          ]}
        />
      </div>
    </div>
  );
}

// ── Results ──────────────────────────────────────────────────────────────────

function ResultsView({
  form,
  t,
  locale,
  onReset,
}: {
  form: FormData;
  t: typeof en;
  locale: string;
  onReset: () => void;
}) {
  const { categories, pct, total } = scoreForm(form);
  const [expanded, setExpanded] = useState<string | null>(null);

  const statusIcon = (s: Status) => {
    if (s === "pass") return <CheckCircle2 className="w-5 h-5 text-success shrink-0" />;
    if (s === "warning") return <AlertTriangle className="w-5 h-5 text-brand shrink-0" />;
    return <XCircle className="w-5 h-5 text-error shrink-0" />;
  };

  const pctColor = pct >= 80 ? "text-success" : pct >= 50 ? "text-brand" : "text-error";
  const strokeColor = pct >= 80 ? "text-success" : pct >= 50 ? "text-brand" : "text-error";

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{t.resultsTitle}</h1>
            <p className="text-text-secondary">{t.resultsSubtitle}</p>
          </motion.div>

          {/* Circle indicator */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-white/5"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(pct / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                  strokeLinecap="round"
                  className={strokeColor}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-3xl font-bold", pctColor)}>{pct}%</span>
                <span className="text-xs text-text-muted">{t.readiness}</span>
              </div>
            </div>
          </motion.div>

          {/* Category breakdown with expandable cards */}
          <div className="space-y-3 mb-8">
            {categories.map((cat, i) => {
              const catInfo = t.resultCategories[cat.key as keyof typeof t.resultCategories];
              const isExpanded = expanded === cat.key;
              const advice = cat.status !== "pass" ? catInfo?.advice?.[cat.status] : undefined;
              return (
                <motion.div
                  key={cat.key}
                  initial={{ x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <div
                    className="rounded-2xl border border-border-subtle bg-surface/50 backdrop-blur-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setExpanded(isExpanded ? null : cat.key)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-start"
                    >
                      {statusIcon(cat.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary">
                          {catInfo?.title}
                        </p>
                        <p className="text-xs text-text-muted truncate">
                          {catInfo?.[cat.status as keyof typeof catInfo] as string}
                        </p>
                      </div>
                      {(cat.status === "warning" || cat.status === "fail") && (
                        isExpanded
                          ? <ChevronUp className="w-4 h-4 text-text-muted shrink-0" />
                          : <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
                      )}
                    </button>
                    {isExpanded && advice && (
                      <div className="px-4 pb-4 border-t border-border-subtle">
                        <p className="text-sm text-text-secondary mt-3 mb-3">{advice.detail}</p>
                        <div className="space-y-2">
                          <Link
                            href={advice.freeLink}
                            className="flex items-center gap-2 text-sm text-text-primary hover:text-brand transition-colors"
                          >
                            <BookOpen className="w-4 h-4 text-success" />
                            {advice.freeLabel}
                          </Link>
                          <Link
                            href={advice.paidLink}
                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand transition-colors"
                          >
                            <Briefcase className="w-4 h-4 text-brand" />
                            {advice.paidLabel}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <EmailSignup
            source="eligibility"
            answers={{ ...form, firstName: "", country: "", whatsapp: "", email: "" }}
            className="mb-6"
          />

          {/* Three CTA paths */}
          <div className="space-y-3 mb-8">
            <Link
              href="/qa"
              className="block w-full px-5 py-3.5 rounded-2xl border border-border-subtle text-center text-sm text-text-secondary hover:text-text-primary hover:border-brand/30 transition-colors"
            >
              {t.ctaPaths.selfLabel}
              <span className="block text-xs text-text-muted mt-0.5">{t.ctaPaths.selfSub}</span>
            </Link>
            <Link
              href="/services"
              className="block w-full px-5 py-3.5 rounded-2xl border border-brand/30 bg-brand/5 text-center text-sm text-text-primary hover:bg-brand/10 transition-colors"
            >
              {t.ctaPaths.specificLabel}
              <span className="block text-xs text-text-muted mt-0.5">{t.ctaPaths.specificSub}</span>
            </Link>
            <a
              href={PAYMENT_LINKS.fullPackageStep1}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-5 py-3.5 rounded-2xl bg-brand text-bg text-center text-sm font-medium hover:bg-brand/90 transition-colors"
            >
              {t.ctaPaths.fullLabel}
              <span className="block text-xs text-bg/70 mt-0.5">{t.ctaPaths.fullSub}</span>
            </a>
          </div>


          {/* Optional contact — send report via WhatsApp */}
          <div className="rounded-2xl border border-border-subtle bg-surface/50 p-5 mb-6">
            <p className="text-sm font-medium text-text-primary mb-1">{t.sendReportTitle}</p>
            <p className="text-xs text-text-muted mb-3">{t.sendReportDesc}</p>
            <a
              href={whatsappWithContext("my eligibility results")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-success hover:text-success transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t.whatsappButton}
            </a>
          </div>

          <div className="text-center">
            <MagneticButton variant="ghost" onClick={onReset}>
              <RotateCcw className="w-4 h-4" />
              {t.startOver}
            </MagneticButton>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

