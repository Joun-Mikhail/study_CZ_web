"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WHATSAPP_URL, PAYMENT_LINKS } from "@/config/contact";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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

type Status = "pass" | "warning" | "fail";

interface FormData {
  firstName: string;
  country: string;
  whatsapp: string;
  email: string;
  highestEducation: string;
  gpa: string;
  targetLevel: string;
  apostille: string;
  translation: string;
  passportValid: string;
  proofOfFunds: string;
  fundingSource: string;
  startWhen: string;
  appliedBefore: string;
  englishCert: string;
  czechPrep: string;
}

const initial: FormData = {
  firstName: "",
  country: "",
  whatsapp: "",
  email: "",
  highestEducation: "",
  gpa: "",
  targetLevel: "",
  apostille: "",
  translation: "",
  passportValid: "",
  proofOfFunds: "",
  fundingSource: "",
  startWhen: "",
  appliedBefore: "",
  englishCert: "",
  czechPrep: "",
};

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

  const handleFinish = () => setShowResults(true);
  const reset = () => {
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
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
          </div>
        </div>
        <div className="max-w-2xl mx-auto text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
                        ? "bg-amber/20 border-amber text-amber"
                        : i < step
                        ? "bg-amber border-amber text-midnight"
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
              initial={{ opacity: 0, x: 24 }}
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
                  onClick={() => (step === 3 ? handleFinish() : setStep((s) => s + 1))}
                >
                  {step === 3 ? t.seeResults : t.next}
                  {step < 3 && <ArrowRight className="w-4 h-4 rtl:rotate-180" />}
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
      className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/50 transition-colors"
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
      className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface text-text-primary text-sm focus:outline-none focus:border-amber/50 transition-colors appearance-none"
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
              ? "bg-amber/10 border-amber/50 text-text-primary font-medium"
              : "bg-surface border-border-subtle text-text-secondary hover:border-amber/30"
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

// ── Scoring ──────────────────────────────────────────────────────────────────

interface ScoredCategory {
  key: string;
  status: Status;
  score: number;
}

function scoreForm(form: FormData): { categories: ScoredCategory[]; pct: number; total: number } {
  const categories: ScoredCategory[] = [];

  // Academics: education completed + grade
  const gpaText = form.gpa.replace(",", ".").replace("%", "");
  const gpaNum = parseFloat(gpaText) || 0;
  const hasEducation = form.highestEducation !== "";
  if (hasEducation && gpaNum > 0 && (gpaNum >= 60 || (gpaNum < 10 && gpaNum >= 2.5))) {
    categories.push({ key: "academics", status: "pass", score: 2 });
  } else if (gpaNum > 0 && gpaNum < 60 && gpaNum >= 10) {
    categories.push({ key: "academics", status: "warning", score: 1 });
  } else if (gpaNum > 0 && gpaNum < 2.5 && gpaNum < 10) {
    categories.push({ key: "academics", status: "warning", score: 1 });
  } else {
    categories.push({ key: "academics", status: hasEducation ? "warning" : "fail", score: hasEducation ? 1 : 0 });
  }

  // Documents
  const apostilleOk = form.apostille === "yes";
  const translationOk = form.translation === "english" || form.translation === "czech";
  const passportOk = form.passportValid === "yes";
  if (apostilleOk && translationOk && passportOk) {
    categories.push({ key: "documents", status: "pass", score: 2 });
  } else if (form.apostille === "unknown" || form.passportValid === "no") {
    categories.push({ key: "documents", status: "fail", score: 0 });
  } else {
    categories.push({ key: "documents", status: "warning", score: 1 });
  }

  // Finances
  if (form.proofOfFunds === "available") {
    categories.push({ key: "finances", status: "pass", score: 2 });
  } else if (form.proofOfFunds === "canArrange") {
    categories.push({ key: "finances", status: "warning", score: 1 });
  } else {
    categories.push({ key: "finances", status: "fail", score: 0 });
  }

  // Timeline
  const nonPassCount = categories.filter((c) => c.status !== "pass").length;
  const failCount = categories.filter((c) => c.status === "fail").length;
  if (form.startWhen === "nextYear" || form.startWhen === "exploring") {
    categories.push({ key: "timeline", status: "pass", score: 2 });
  } else if (form.startWhen === "thisSemester" && failCount >= 2) {
    categories.push({ key: "timeline", status: "fail", score: 0 });
  } else if (form.startWhen === "thisSemester" && nonPassCount > 0) {
    categories.push({ key: "timeline", status: "warning", score: 1 });
  } else {
    categories.push({ key: "timeline", status: "pass", score: 2 });
  }

  // Language
  if (form.englishCert === "yes" || form.englishCert === "notRequired") {
    categories.push({ key: "language", status: "pass", score: 2 });
  } else if (form.englishCert === "plan") {
    categories.push({ key: "language", status: "warning", score: 1 });
  } else {
    categories.push({ key: "language", status: "fail", score: 0 });
  }

  const total = categories.reduce((sum, c) => sum + c.score, 0);
  const pct = Math.round((total / 10) * 100);

  return { categories, pct, total };
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
    if (s === "pass") return <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />;
    if (s === "warning") return <AlertTriangle className="w-5 h-5 text-amber shrink-0" />;
    return <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
  };

  const pctColor = pct >= 80 ? "text-green-400" : pct >= 50 ? "text-amber" : "text-red-400";
  const strokeColor = pct >= 80 ? "text-green-400" : pct >= 50 ? "text-amber" : "text-red-400";

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
                  initial={{ opacity: 0, x: -16 }}
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
                            className="flex items-center gap-2 text-sm text-text-primary hover:text-amber transition-colors"
                          >
                            <BookOpen className="w-4 h-4 text-green-400" />
                            {advice.freeLabel}
                          </Link>
                          <Link
                            href={advice.paidLink}
                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-amber transition-colors"
                          >
                            <Briefcase className="w-4 h-4 text-amber" />
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

          {/* Three CTA paths */}
          <div className="space-y-3 mb-8">
            <Link
              href="/qa"
              className="block w-full px-5 py-3.5 rounded-2xl border border-border-subtle text-center text-sm text-text-secondary hover:text-text-primary hover:border-amber/30 transition-colors"
            >
              {t.ctaPaths.selfLabel}
              <span className="block text-xs text-text-muted mt-0.5">{t.ctaPaths.selfSub}</span>
            </Link>
            <Link
              href="/services"
              className="block w-full px-5 py-3.5 rounded-2xl border border-amber/30 bg-amber/5 text-center text-sm text-text-primary hover:bg-amber/10 transition-colors"
            >
              {t.ctaPaths.specificLabel}
              <span className="block text-xs text-text-muted mt-0.5">{t.ctaPaths.specificSub}</span>
            </Link>
            <a
              href={PAYMENT_LINKS.fullPackageStep1}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-5 py-3.5 rounded-2xl bg-amber text-midnight text-center text-sm font-medium hover:bg-amber/90 transition-colors"
            >
              {t.ctaPaths.fullLabel}
              <span className="block text-xs text-midnight/70 mt-0.5">{t.ctaPaths.fullSub}</span>
            </a>
          </div>

          {/* Optional contact — send report via WhatsApp */}
          <div className="rounded-2xl border border-border-subtle bg-surface/50 p-5 mb-6">
            <p className="text-sm font-medium text-text-primary mb-1">{t.sendReportTitle}</p>
            <p className="text-xs text-text-muted mb-3">{t.sendReportDesc}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
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

// ─── English copy ───────────────────────────────────────────────────────────

const en = {
  title: "Am I Eligible?",
  subtitle: "Answer a few questions and we'll tell you where you stand —free, instant, no sign-up.",
  steps: ["Academics", "Documents", "Finances", "Timeline & Language"],
  back: "Back",
  next: "Next",
  seeResults: "See My Results",
  fields: {
    firstName: "First name",
    country: "Country",
    whatsapp: "WhatsApp number (optional)",
    email: "Email (optional)",
    highestEducation: "Highest completed education",
    gpa: "Overall grade or GPA",
    targetLevel: "Target program level",
    apostille: "Have you apostilled your diploma/transcripts?",
    translation: "Have you had documents officially translated?",
    passportValid: "Valid passport, expiring more than 18 months from now?",
    proofOfFunds: "Can you show proof of roughly EUR 5,500/year in a bank account?",
    fundingSource: "How are you funding your studies?",
    startWhen: "When do you want to start?",
    appliedBefore: "Applied to a Czech university before?",
    englishCert: "English certificate",
    czechPrep: "Czech language preparation",
  },
  placeholders: {
    firstName: "Your first name",
    country: "Select your country...",
    gpa: "e.g. 85%, 3.2 GPA",
  },
  helpers: {
    whatsapp: "So we can send your results if you want",
    email: "For your eligibility report",
    gpa: "Approximate is fine —e.g. 85%, 3.2 GPA",
  },
  options: {
    yes: "Yes",
    no: "No",
    dontKnow: "I don't know what that means",
    notSure: "Not sure",
    translatedEn: "Yes, English",
    translatedCs: "Yes, Czech",
    expiringSoon: "Expiring soon",
    availableNow: "Yes, available now",
    canArrange: "I can arrange it",
    noOrUnsure: "No / not sure",
    family: "Family support",
    savings: "Savings",
    scholarship: "Scholarship",
    workStudy: "Work + study",
    notSureYet: "Not sure yet",
    thisSemester: "This coming semester",
    nextYear: "Next academic year",
    exploring: "Exploring, no rush",
    yesAccepted: "Yes, accepted",
    yesRejected: "Yes, rejected",
    firstTime: "No, first time",
    planToTake: "Plan to take one",
    notRequired: "Not required",
    courseTaken: "Course taken",
    selfStudy: "Some self-study",
    noneYet: "None yet",
    highschool: "High school",
    bachelor: "Bachelor's",
    master: "Master's",
    phd: "PhD",
  },
  resultsTitle: "Your Eligibility Assessment",
  resultsSubtitle: "Here's where you stand based on what you told us.",
  readiness: "readiness",
  resultCategories: {
    academics: {
      title: "Academic Background",
      pass: "Your grades and education meet admission requirements.",
      warning: "Grade may limit program options —consider preparatory year.",
      fail: "Missing education details may block your application.",
      advice: {
        warning: {
          detail: "A lower GPA does not disqualify you, but it narrows your university choices. A preparatory year can strengthen your profile significantly.",
          freeLink: "/preparatory-year",
          freeLabel: "Read the free Preparatory Year guide",
          paidLink: "/services",
          paidLabel: "Or get a consultation —EUR 15",
        },
        fail: {
          detail: "Without confirming your education level and grades, universities cannot assess your application. Gather your transcripts and diploma first.",
          freeLink: "/application-guide",
          freeLabel: "Read the free Application Guide",
          paidLink: "/services",
          paidLabel: "Or get your documents reviewed —EUR 25",
        },
      },
    },
    documents: {
      title: "Required Documents",
      pass: "All essential documents are ready.",
      warning: "Some documents still need attention —you can fix this in time.",
      fail: "Critical document gaps could block your application.",
      advice: {
        warning: {
          detail: "Missing apostille or translation can delay your application by weeks. In Egypt, apostille requires legalization from the Ministry of Foreign Affairs and then the Czech embassy —typically 4-8 weeks.",
          freeLink: "/application-guide",
          freeLabel: "Read our free apostille and document guide",
          paidLink: "/services",
          paidLabel: "Or get your full document package reviewed —EUR 25",
        },
        fail: {
          detail: "The embassy does not tell you what is wrong —they just say \"rejected.\" You will not know which document killed your application unless someone checks before you submit.",
          freeLink: "/application-guide",
          freeLabel: "Read the free Application Guide",
          paidLink: "/services",
          paidLabel: "Or get your full document package reviewed —EUR 25",
        },
      },
    },
    finances: {
      title: "Financial Readiness",
      pass: "Your finances look sufficient for a student visa.",
      warning: "You say you can arrange funds —start now, it takes time.",
      fail: "Insufficient funds or no proof. This will likely cause a visa rejection.",
      advice: {
        warning: {
          detail: "The Czech embassy requires bank statements showing approximately EUR 5,500 per year. Start gathering this proof now —last-minute transfers raise red flags.",
          freeLink: "/cost-of-living",
          freeLabel: "Use the free Cost of Living Calculator",
          paidLink: "/services",
          paidLabel: "Or book a consultation —EUR 15",
        },
        fail: {
          detail: "Without proof of financial support, your visa will almost certainly be rejected. This is one of the most common reasons for denial.",
          freeLink: "/cost-of-living",
          freeLabel: "Use the free Cost of Living Calculator",
          paidLink: "/services",
          paidLabel: "Or book a consultation —EUR 15",
        },
      },
    },
    timeline: {
      title: "Timeline",
      pass: "You have enough time to prepare a strong application.",
      warning: "Tight timeline —start immediately and do not wait on anything.",
      fail: "Very little time left. You may need to target the next intake.",
      advice: {
        warning: {
          detail: "Rushing an application leads to mistakes. Apostille alone can take 4-8 weeks. If any of your documents are not ready, start today.",
          freeLink: "/application-guide",
          freeLabel: "Read the step-by-step Application Guide",
          paidLink: "/services",
          paidLabel: "Or get full application assistance —EUR 150 to start",
        },
        fail: {
          detail: "With this timeline and outstanding gaps, applying this semester risks a rejection that goes on your record. Targeting the next intake gives you time to build a strong application.",
          freeLink: "/application-guide",
          freeLabel: "Read the free Application Guide",
          paidLink: "/services",
          paidLabel: "Or let me plan your timeline —EUR 15 consultation",
        },
      },
    },
    language: {
      title: "Language Proficiency",
      pass: "Your language qualifications look good.",
      warning: "Plan to get certified —some programs require proof.",
      fail: "Unclear language status could limit your options.",
      advice: {
        warning: {
          detail: "Most English-taught programs require IELTS 5.5-6.5 or equivalent. Book your test soon —slots fill up and results take weeks.",
          freeLink: "/qa",
          freeLabel: "Check language requirements in the Q&A",
          paidLink: "/services",
          paidLabel: "Or book a consultation —EUR 15",
        },
        fail: {
          detail: "Without knowing whether you need a language certificate, you risk applying to programs you are not eligible for. Check requirements for your target program.",
          freeLink: "/qa",
          freeLabel: "Check language requirements in the Q&A",
          paidLink: "/services",
          paidLabel: "Or book a consultation —EUR 15",
        },
      },
    },
  },
  ctaPaths: {
    selfLabel: "I'll handle it myself",
    selfSub: "Great —use our free guides and the Facebook community.",
    specificLabel: "I need help with specific things",
    specificSub: "Book just the services you need.",
    fullLabel: "I want someone to guide me through everything —Start with EUR 150",
    fullSub: "I'll build your complete plan.",
  },
  sendReportTitle: "Want this report sent to you?",
  sendReportDesc: "Message us on WhatsApp and we'll discuss your results and next steps. Free, no pressure.",
  whatsappButton: "Message me on WhatsApp",
  startOver: "Start Over",
};

// ─── Arabic copy ────────────────────────────────────────────────────────────

const ar: typeof en = {
  title: "أقدر أقدم؟",
  subtitle: "جاوب على كام سؤال وهنقولك وضعك — ببلاش وفي ثواني من غير تسجيل.",
  steps: ["الدراسة", "الأوراق", "الفلوس", "الوقت واللغة"],
  back: "رجوع",
  next: "التالي",
  seeResults: "شوف نتيجتي",
  fields: {
    firstName: "الاسم الأول",
    country: "البلد",
    whatsapp: "رقم واتساب (اختياري)",
    email: "البريد الإلكتروني (اختياري)",
    highestEducation: "أعلى شهادة عندك",
    gpa: "مجموعك أو معدلك",
    targetLevel: "عايز تدرس إيه",
    apostille: "عملت تصديق رسمي (أبوستيل) لشهادتك وكشف الدرجات؟",
    translation: "ترجمت أوراقك ترجمة معتمدة؟",
    passportValid: "جوازك ساري لأكتر من 18 شهر؟",
    proofOfFunds: "تقدر تبين إن في حسابك حوالي 5,500 يورو في السنة؟",
    fundingSource: "هتصرف على دراستك إزاي؟",
    startWhen: "عايز تبدأ امتى؟",
    appliedBefore: "قدمت على جامعة تشيكية قبل كده؟",
    englishCert: "شهادة إنجليزي",
    czechPrep: "تحضير اللغة التشيكية",
  },
  placeholders: {
    firstName: "اسمك الأول",
    country: "اختر بلدك...",
    gpa: "مثلا: 85%، 3.2",
  },
  helpers: {
    whatsapp: "عشان نبعتلك النتيجة لو حبيت",
    email: "عشان نبعتلك النتيجة",
    gpa: "تقريبي كفاية —مثلا 85%، 3.2",
  },
  options: {
    yes: "أيوه",
    no: "لا",
    dontKnow: "مش عارف يعني إيه ده",
    notSure: "مش متأكد",
    translatedEn: "أيوه، إنجليزي",
    translatedCs: "أيوه، تشيكي",
    expiringSoon: "قرب يخلص",
    availableNow: "أيوه، متاح دلوقتي",
    canArrange: "أقدر أرتبه",
    noOrUnsure: "لا / مش متأكد",
    family: "دعم عائلي",
    savings: "مدخرات",
    scholarship: "منحة",
    workStudy: "شغل + دراسة",
    notSureYet: "مش متأكد لسه",
    thisSemester: "الفصل الجاي",
    nextYear: "السنة الدراسية الجاية",
    exploring: "بستكشف، مش مستعجل",
    yesAccepted: "أيوه، اتقبلت",
    yesRejected: "أيوه، اترفضت",
    firstTime: "لا، أول مرة",
    planToTake: "ناوي أمتحن",
    notRequired: "مش مطلوبة",
    courseTaken: "خدت كورس",
    selfStudy: "شوية دراسة ذاتية",
    noneYet: "لسه مبدأتش",
    highschool: "ثانوية عامة",
    bachelor: "بكالوريوس",
    master: "ماجستير",
    phd: "دكتوراه",
  },
  resultsTitle: "شوف وضعك",
  resultsSubtitle: "دي نتيجتك حسب اللي قولتهولنا.",
  readiness: "جاهزية",
  resultCategories: {
    academics: {
      title: "الدراسة والشهادات",
      pass: "درجاتك كويسة وبتستوفي شروط القبول.",
      warning: "مجموعك ممكن يقلل اختياراتك — فكّر في سنة تحضيرية.",
      fail: "معلومات الشهادة ناقصة وده ممكن يوقف طلبك.",
      advice: {
        warning: {
          detail: "معدل أقل مش بيشيلك، بس بيقلل اختياراتك. السنة التحضيرية ممكن تقوي ملفك بشكل كبير.",
          freeLink: "/preparatory-year",
          freeLabel: "اقرأ دليل السنة التحضيرية المجاني",
          paidLink: "/services",
          paidLabel: "أو احجز استشارة —15 يورو",
        },
        fail: {
          detail: "من غير ما تأكد مستواك التعليمي ودرجاتك، الجامعات مش هتقدر تقيّم طلبك. جمّع كشف الدرجات والشهادة الأول.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم المجاني",
          paidLink: "/services",
          paidLabel: "أو خلي أوراقك تتراجع —25 يورو",
        },
      },
    },
    documents: {
      title: "الأوراق المطلوبة",
      pass: "كل الأوراق الأساسية جاهزة.",
      warning: "بعض الأوراق لسه محتاجة انتباه —تقدر تلحق.",
      fail: "نواقص حرجة في الأوراق ممكن توقف طلبك.",
      advice: {
        warning: {
          detail: "التصديق أو الترجمة الناقصة ممكن تأخر طلبك أسابيع. في مصر، التصديق (الأبوستيل) محتاج تروح الخارجية وبعدين السفارة التشيكية — عادة 4-8 أسابيع.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل الأوراق والتصديقات المجاني",
          paidLink: "/services",
          paidLabel: "أو خلي كل أوراقك تتراجع —25 يورو",
        },
        fail: {
          detail: "السفارة مش بتقولك إيه الغلط —بس بتقول \"مرفوض\". مش هتعرف أي ورقة وقعتك غير لما حد يراجع قبل ما تقدم.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم المجاني",
          paidLink: "/services",
          paidLabel: "أو خلي كل أوراقك تتراجع —25 يورو",
        },
      },
    },
    finances: {
      title: "الوضع المادي",
      pass: "فلوسك كفاية لفيزا الطالب.",
      warning: "بتقول تقدر ترتبه — ابدأ دلوقتي لإن بياخد وقت.",
      fail: "مفيش فلوس كفاية أو مفيش إثبات. ده غالبا بيسبب رفض الفيزا.",
      advice: {
        warning: {
          detail: "السفارة التشيكية بتطلب كشوفات حساب بتوضح حوالي 5,500 يورو في السنة. ابدأ تجمع الإثبات ده دلوقتي —التحويلات اللي في آخر لحظة بترفع علامات استفهام.",
          freeLink: "/cost-of-living",
          freeLabel: "استخدم حاسبة تكلفة المعيشة المجانية",
          paidLink: "/services",
          paidLabel: "أو احجز استشارة —15 يورو",
        },
        fail: {
          detail: "من غير إثبات دعم مالي، فيزتك هتترفض تقريبا. ده من أكتر أسباب الرفض شيوعا.",
          freeLink: "/cost-of-living",
          freeLabel: "استخدم حاسبة تكلفة المعيشة المجانية",
          paidLink: "/services",
          paidLabel: "أو احجز استشارة —15 يورو",
        },
      },
    },
    timeline: {
      title: "الوقت",
      pass: "عندك وقت كافي تجهز طلب قوي.",
      warning: "الوقت ضيق —ابدأ فورا وماتستناش حاجة.",
      fail: "فاضل وقت قليل جدا. ممكن تحتاج تستهدف الدفعة الجاية.",
      advice: {
        warning: {
          detail: "الاستعجال في التقديم بيجيب أخطاء. التصديق (الأبوستيل) لوحده ممكن ياخد 4-8 أسابيع. لو أي ورق مش جاهز، ابدأ النهارده.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم خطوة بخطوة",
          paidLink: "/services",
          paidLabel: "أو خد مساعدة كاملة في التقديم —ابدأ ب 150 يورو",
        },
        fail: {
          detail: "بالجدول الزمني ده والنواقص اللي عندك، التقديم الفصل ده بيخاطر برفض هيتسجل في ملفك. استهداف الدفعة الجاية هيديك وقت تبني طلب قوي.",
          freeLink: "/application-guide",
          freeLabel: "اقرأ دليل التقديم المجاني",
          paidLink: "/services",
          paidLabel: "أو خليني أخطط جدولك —استشارة 15 يورو",
        },
      },
    },
    language: {
      title: "مستوى اللغة",
      pass: "مستوى لغتك كويس.",
      warning: "خطط تمتحن —بعض البرامج بتطلب إثبات.",
      fail: "وضع اللغة مش واضح وده ممكن يحد من اختياراتك.",
      advice: {
        warning: {
          detail: "معظم البرامج بالإنجليزي بتطلب IELTS 5.5-6.5 أو ما يعادله. احجز امتحانك بدري —الأماكن بتخلص والنتايج بتاخد أسابيع.",
          freeLink: "/qa",
          freeLabel: "شوف متطلبات اللغة في الأسئلة الشائعة",
          paidLink: "/services",
          paidLabel: "أو احجز استشارة —15 يورو",
        },
        fail: {
          detail: "من غير ما تعرف لو محتاج شهادة لغة ولا لا، ممكن تقدم على برامج مش مؤهل ليها. تحقق من متطلبات البرنامج اللي مستهدفه.",
          freeLink: "/qa",
          freeLabel: "شوف متطلبات اللغة في الأسئلة الشائعة",
          paidLink: "/services",
          paidLabel: "أو احجز استشارة —15 يورو",
        },
      },
    },
  },
  ctaPaths: {
    selfLabel: "هتعمل كل حاجة بنفسي",
    selfSub: "تمام —استخدم الأدلة المجانية ومجتمع فيسبوك.",
    specificLabel: "محتاج مساعدة في حاجات معينة",
    specificSub: "احجز بس الخدمات اللي محتاجها.",
    fullLabel: "عايز حد يمشيني في كل حاجة —ابدأ ب 150 يورو",
    fullSub: "هبنيلك خطة كاملة.",
  },
  sendReportTitle: "عايز التقرير ده يتبعتلك؟",
  sendReportDesc: "راسلنا على واتساب وهنناقش نتيجتك والخطوات الجاية. مجاني، من غير ضغط.",
  whatsappButton: "راسلني على واتساب",
  startOver: "ابدأ من الأول",
};
