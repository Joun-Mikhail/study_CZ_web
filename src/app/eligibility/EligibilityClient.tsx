"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WHATSAPP_URL } from "@/config/contact";
import { motion, AnimatePresence } from "framer-motion";
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
  ClipboardCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "pass" | "warning" | "fail" | null;

interface FormData {
  nationality: string;
  age: string;
  studyLevel: string;
  gpa: string;
  hasHighSchoolDiploma: string;
  hasTranscript: string;
  hasPassport: string;
  passportExpiry: string;
  hasBirthCertificate: string;
  bankBalance: string;
  canShowFunding: string;
  hasHealthInsurance: string;
  targetSemester: string;
  monthsUntilDeadline: string;
  czechLanguage: string;
  englishLevel: string;
}

const initial: FormData = {
  nationality: "",
  age: "",
  studyLevel: "",
  gpa: "",
  hasHighSchoolDiploma: "yes",
  hasTranscript: "yes",
  hasPassport: "yes",
  passportExpiry: "",
  hasBirthCertificate: "yes",
  bankBalance: "",
  canShowFunding: "yes",
  hasHealthInsurance: "no",
  targetSemester: "",
  monthsUntilDeadline: "",
  czechLanguage: "none",
  englishLevel: "",
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
    { title: t.steps[0], icon: User },
    { title: t.steps[1], icon: GraduationCap },
    { title: t.steps[2], icon: FileText },
    { title: t.steps[3], icon: DollarSign },
    { title: t.steps[4], icon: Clock },
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
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
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
                {step === 0 && <Step0 form={form} set={set} t={t} />}
                {step === 1 && <Step1 form={form} set={set} t={t} />}
                {step === 2 && <Step2 form={form} set={set} t={t} />}
                {step === 3 && <Step3 form={form} set={set} t={t} />}
                {step === 4 && <Step4 form={form} set={set} t={t} />}
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
                  onClick={() => (step === 4 ? handleFinish() : setStep((s) => s + 1))}
                >
                  {step === 4 ? t.seeResults : t.next}
                  {step < 4 && <ArrowRight className="w-4 h-4 rtl:rotate-180" />}
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

// ── Step components ──────────────────────────────────────────────────────────

interface StepProps {
  form: FormData;
  set: (k: keyof FormData, v: string) => void;
  t: typeof en;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-text-primary mb-1.5">{children}</label>;
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

function Step0({ form, set, t }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel>{t.fields.nationality}</FieldLabel>
        <Input value={form.nationality} onChange={(v) => set("nationality", v)} placeholder={t.placeholders.nationality} />
      </div>
      <div>
        <FieldLabel>{t.fields.age}</FieldLabel>
        <Input value={form.age} onChange={(v) => set("age", v)} type="number" placeholder="18" />
      </div>
      <div>
        <FieldLabel>{t.fields.studyLevel}</FieldLabel>
        <RadioGroup
          value={form.studyLevel}
          onChange={(v) => set("studyLevel", v)}
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

function Step1({ form, set, t }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel>{t.fields.gpa}</FieldLabel>
        <Input value={form.gpa} onChange={(v) => set("gpa", v)} placeholder="3.0 / 4.0" />
      </div>
      <div>
        <FieldLabel>{t.fields.hasHighSchoolDiploma}</FieldLabel>
        <RadioGroup
          value={form.hasHighSchoolDiploma}
          onChange={(v) => set("hasHighSchoolDiploma", v)}
          options={[
            { value: "yes", label: t.options.yes },
            { value: "no", label: t.options.no },
            { value: "pending", label: t.options.pending },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.hasTranscript}</FieldLabel>
        <RadioGroup
          value={form.hasTranscript}
          onChange={(v) => set("hasTranscript", v)}
          options={[
            { value: "yes", label: t.options.yes },
            { value: "no", label: t.options.no },
          ]}
        />
      </div>
    </div>
  );
}

function Step2({ form, set, t }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel>{t.fields.hasPassport}</FieldLabel>
        <RadioGroup
          value={form.hasPassport}
          onChange={(v) => set("hasPassport", v)}
          options={[
            { value: "yes", label: t.options.yes },
            { value: "no", label: t.options.no },
          ]}
        />
      </div>
      {form.hasPassport === "yes" && (
        <div>
          <FieldLabel>{t.fields.passportExpiry}</FieldLabel>
          <Input value={form.passportExpiry} onChange={(v) => set("passportExpiry", v)} type="date" />
        </div>
      )}
      <div>
        <FieldLabel>{t.fields.hasBirthCertificate}</FieldLabel>
        <RadioGroup
          value={form.hasBirthCertificate}
          onChange={(v) => set("hasBirthCertificate", v)}
          options={[
            { value: "yes", label: t.options.yes },
            { value: "no", label: t.options.no },
          ]}
        />
      </div>
    </div>
  );
}

function Step3({ form, set, t }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel>{t.fields.bankBalance}</FieldLabel>
        <Input
          value={form.bankBalance}
          onChange={(v) => set("bankBalance", v)}
          type="number"
          placeholder="€5,000"
        />
      </div>
      <div>
        <FieldLabel>{t.fields.canShowFunding}</FieldLabel>
        <RadioGroup
          value={form.canShowFunding}
          onChange={(v) => set("canShowFunding", v)}
          options={[
            { value: "yes", label: t.options.yes },
            { value: "no", label: t.options.no },
            { value: "partial", label: t.options.partial },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.hasHealthInsurance}</FieldLabel>
        <RadioGroup
          value={form.hasHealthInsurance}
          onChange={(v) => set("hasHealthInsurance", v)}
          options={[
            { value: "yes", label: t.options.yes },
            { value: "no", label: t.options.no },
          ]}
        />
      </div>
    </div>
  );
}

function Step4({ form, set, t }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel>{t.fields.targetSemester}</FieldLabel>
        <RadioGroup
          value={form.targetSemester}
          onChange={(v) => set("targetSemester", v)}
          options={[
            { value: "winter2026", label: t.options.winter2026 },
            { value: "summer2027", label: t.options.summer2027 },
            { value: "winter2027", label: t.options.winter2027 },
            { value: "later", label: t.options.later },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.monthsUntilDeadline}</FieldLabel>
        <Input
          value={form.monthsUntilDeadline}
          onChange={(v) => set("monthsUntilDeadline", v)}
          type="number"
          placeholder="6"
        />
      </div>
      <div>
        <FieldLabel>{t.fields.englishLevel}</FieldLabel>
        <RadioGroup
          value={form.englishLevel}
          onChange={(v) => set("englishLevel", v)}
          options={[
            { value: "b2+", label: "B2+" },
            { value: "b1", label: "B1" },
            { value: "below", label: t.options.belowB1 },
            { value: "none", label: t.options.noEnglish },
          ]}
        />
      </div>
      <div>
        <FieldLabel>{t.fields.czechLanguage}</FieldLabel>
        <RadioGroup
          value={form.czechLanguage}
          onChange={(v) => set("czechLanguage", v)}
          options={[
            { value: "b1+", label: "B1+" },
            { value: "a1a2", label: "A1-A2" },
            { value: "none", label: t.options.noCzech },
          ]}
        />
      </div>
    </div>
  );
}

// ── Scoring ──────────────────────────────────────────────────────────────────

function scoreForm(form: FormData) {
  const categories: { key: string; status: Status; label: string; detail: string }[] = [];

  // Academics
  const gpaNum = parseFloat(form.gpa) || 0;
  const diplomaOk = form.hasHighSchoolDiploma === "yes";
  const transcriptOk = form.hasTranscript === "yes";
  if (diplomaOk && transcriptOk && gpaNum >= 2.5) {
    categories.push({ key: "academics", status: "pass", label: "", detail: "" });
  } else if (!diplomaOk && form.hasHighSchoolDiploma !== "pending") {
    categories.push({ key: "academics", status: "fail", label: "", detail: "" });
  } else {
    categories.push({ key: "academics", status: "warning", label: "", detail: "" });
  }

  // Documents
  const passportOk = form.hasPassport === "yes";
  const birthOk = form.hasBirthCertificate === "yes";
  const allDocs = passportOk && birthOk;
  if (allDocs) {
    categories.push({ key: "documents", status: "pass", label: "", detail: "" });
  } else if (!passportOk) {
    categories.push({ key: "documents", status: "fail", label: "", detail: "" });
  } else {
    categories.push({ key: "documents", status: "warning", label: "", detail: "" });
  }

  // Finances
  const balance = parseFloat(form.bankBalance) || 0;
  const fundingOk = form.canShowFunding === "yes";
  if (balance >= 4000 && fundingOk) {
    categories.push({ key: "finances", status: "pass", label: "", detail: "" });
  } else if (balance < 2000 || form.canShowFunding === "no") {
    categories.push({ key: "finances", status: "fail", label: "", detail: "" });
  } else {
    categories.push({ key: "finances", status: "warning", label: "", detail: "" });
  }

  // Timeline
  const months = parseInt(form.monthsUntilDeadline) || 0;
  if (months >= 4) {
    categories.push({ key: "timeline", status: "pass", label: "", detail: "" });
  } else if (months >= 2) {
    categories.push({ key: "timeline", status: "warning", label: "", detail: "" });
  } else {
    categories.push({ key: "timeline", status: "fail", label: "", detail: "" });
  }

  // Language
  const engOk = form.englishLevel === "b2+" || form.englishLevel === "b1";
  const czOk = form.czechLanguage === "b1+" || form.czechLanguage === "a1a2";
  if (form.englishLevel === "b2+" || form.czechLanguage === "b1+") {
    categories.push({ key: "language", status: "pass", label: "", detail: "" });
  } else if (engOk || czOk) {
    categories.push({ key: "language", status: "warning", label: "", detail: "" });
  } else {
    categories.push({ key: "language", status: "fail", label: "", detail: "" });
  }

  const passCount = categories.filter((c) => c.status === "pass").length;
  const failCount = categories.filter((c) => c.status === "fail").length;
  const pct = Math.round((passCount / categories.length) * 100);
  const overall: "ready" | "almost" | "notReady" =
    failCount === 0 && passCount >= 4 ? "ready" : failCount >= 2 ? "notReady" : "almost";

  return { categories, pct, overall };
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
  const { categories, pct, overall } = scoreForm(form);
  const catLabels = t.resultCategories;

  const statusIcon = (s: Status) => {
    if (s === "pass") return <CheckCircle2 className="w-5 h-5 text-green-400" />;
    if (s === "warning") return <AlertTriangle className="w-5 h-5 text-amber" />;
    return <XCircle className="w-5 h-5 text-red-400" />;
  };

  const overallColors = {
    ready: "text-green-400",
    almost: "text-amber",
    notReady: "text-red-400",
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
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
                  className={overallColors[overall]}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-3xl font-bold", overallColors[overall])}>{pct}%</span>
                <span className="text-xs text-text-muted">{t.readiness}</span>
              </div>
            </div>
            <p className={cn("font-semibold mt-3", overallColors[overall])}>
              {t.overallLabels[overall]}
            </p>
          </motion.div>

          {/* Category breakdown */}
          <div className="space-y-3 mb-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <GlassCard className="flex items-center gap-3">
                  {statusIcon(cat.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      {catLabels[cat.key as keyof typeof catLabels]?.title}
                    </p>
                    <p className="text-xs text-text-muted">
                      {catLabels[cat.key as keyof typeof catLabels]?.[cat.status as "pass" | "warning" | "fail"]}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* CTA paths */}
          <div className="space-y-3 mb-8">
            {overall === "ready" && (
              <GlassCard hoverEffect="glow" className="text-center">
                <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-1">{t.ctaReady.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{t.ctaReady.text}</p>
                <MagneticButton variant="primary" href="/services">
                  {t.ctaReady.button}
                </MagneticButton>
              </GlassCard>
            )}
            {overall === "almost" && (
              <GlassCard hoverEffect="glow" className="text-center">
                <AlertTriangle className="w-8 h-8 text-amber mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-1">{t.ctaAlmost.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{t.ctaAlmost.text}</p>
                <MagneticButton variant="primary" href={WHATSAPP_URL}>
                  <MessageCircle className="w-5 h-5" />
                  {t.ctaAlmost.button}
                </MagneticButton>
              </GlassCard>
            )}
            {overall === "notReady" && (
              <GlassCard hoverEffect="glow" className="text-center">
                <XCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-1">{t.ctaNotReady.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{t.ctaNotReady.text}</p>
                <MagneticButton variant="secondary" href={WHATSAPP_URL}>
                  <MessageCircle className="w-5 h-5" />
                  {t.ctaNotReady.button}
                </MagneticButton>
              </GlassCard>
            )}
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
  subtitle: "Answer a few questions and we'll tell you where you stand — free, instant, no sign-up.",
  steps: ["Basics", "Academics", "Documents", "Finances", "Timeline & Language"],
  back: "Back",
  next: "Next",
  seeResults: "See My Results",
  fields: {
    nationality: "Nationality",
    age: "Age",
    studyLevel: "What level are you applying for?",
    gpa: "GPA (approximate, any scale)",
    hasHighSchoolDiploma: "Do you have your high school diploma?",
    hasTranscript: "Do you have your official transcript?",
    hasPassport: "Do you have a valid passport?",
    passportExpiry: "Passport expiry date",
    hasBirthCertificate: "Do you have your birth certificate?",
    bankBalance: "Approximate bank balance (EUR)",
    canShowFunding: "Can you show proof of funding for at least one year?",
    hasHealthInsurance: "Do you already have health insurance for Czechia?",
    targetSemester: "Which semester are you targeting?",
    monthsUntilDeadline: "How many months until your deadline?",
    englishLevel: "English proficiency level",
    czechLanguage: "Czech language level",
  },
  placeholders: {
    nationality: "e.g. Egyptian, Jordanian, Iraqi...",
  },
  options: {
    yes: "Yes",
    no: "No",
    pending: "Pending",
    partial: "Partially",
    bachelor: "Bachelor's",
    master: "Master's",
    phd: "PhD",
    winter2026: "Winter 2026",
    summer2027: "Summer 2027",
    winter2027: "Winter 2027",
    later: "Later / Not sure",
    belowB1: "Below B1",
    noEnglish: "No English",
    noCzech: "No Czech",
  },
  resultsTitle: "Your Eligibility Assessment",
  resultsSubtitle: "Here's where you stand based on what you told us.",
  readiness: "readiness",
  overallLabels: {
    ready: "You're Ready to Apply!",
    almost: "Almost There — A Few Things to Fix",
    notReady: "Not Ready Yet — But You Can Get There",
  },
  resultCategories: {
    academics: {
      title: "Academic Background",
      pass: "Your grades and documents look good for admission.",
      warning: "Some academic items need attention — pending diploma or lower GPA.",
      fail: "Missing diploma or transcript may block your application.",
    },
    documents: {
      title: "Required Documents",
      pass: "All essential documents are ready.",
      warning: "Some documents are missing — you can still fix this in time.",
      fail: "You're missing critical documents (passport). Get this sorted first.",
    },
    finances: {
      title: "Financial Readiness",
      pass: "Your finances look sufficient for a student visa.",
      warning: "Your bank balance is borderline — consider showing more funding proof.",
      fail: "Insufficient funds or no proof of funding. This will likely cause a visa rejection.",
    },
    timeline: {
      title: "Timeline",
      pass: "You have enough time to prepare a strong application.",
      warning: "Tight timeline — start now and don't wait on anything.",
      fail: "Very little time left. You may need to target the next semester.",
    },
    language: {
      title: "Language Proficiency",
      pass: "Your language level qualifies you for programs.",
      warning: "Your level may limit program choices. Consider taking a test.",
      fail: "You'll need to improve your language skills or take a preparatory year.",
    },
  },
  ctaReady: {
    title: "You're in Great Shape",
    text: "Your profile is strong. The next step is making sure your documents and application are perfect — that's where I can help.",
    button: "See Services →",
  },
  ctaAlmost: {
    title: "You're Close — Let's Fix the Gaps",
    text: "A few things need attention, but nothing that can't be fixed. Message me and I'll tell you exactly what to do.",
    button: "Ask Me on WhatsApp",
  },
  ctaNotReady: {
    title: "Let's Build a Plan",
    text: "You're not ready to apply right now, but with the right plan, you can be ready for the next intake. I can help you figure out the steps.",
    button: "Let's Talk on WhatsApp",
  },
  startOver: "Start Over",
};

// ─── Arabic copy ────────────────────────────────────────────────────────────

const ar: typeof en = {
  title: "هل أنا مؤهل؟",
  subtitle: "جاوب على كام سؤال وهنقولك وضعك — مجاني، فوري، من غير تسجيل.",
  steps: ["الأساسيات", "الأكاديمي", "الأوراق", "المالية", "الوقت واللغة"],
  back: "رجوع",
  next: "التالي",
  seeResults: "شوف نتيجتي",
  fields: {
    nationality: "الجنسية",
    age: "العمر",
    studyLevel: "أنت بتقدم على أي مستوى؟",
    gpa: "المعدل التراكمي (تقريبي)",
    hasHighSchoolDiploma: "عندك شهادة الثانوية؟",
    hasTranscript: "عندك كشف الدرجات الرسمي؟",
    hasPassport: "عندك جواز سفر ساري؟",
    passportExpiry: "تاريخ انتهاء الجواز",
    hasBirthCertificate: "عندك شهادة الميلاد؟",
    bankBalance: "رصيد البنك التقريبي (يورو)",
    canShowFunding: "تقدر تثبت تمويل لسنة على الأقل؟",
    hasHealthInsurance: "عندك تأمين صحي للتشيك؟",
    targetSemester: "أي فصل دراسي مستهدف؟",
    monthsUntilDeadline: "كام شهر قبل الموعد النهائي؟",
    englishLevel: "مستوى الإنجليزي",
    czechLanguage: "مستوى التشيكي",
  },
  placeholders: {
    nationality: "مثلًا: مصري، أردني، عراقي...",
  },
  options: {
    yes: "أيوه",
    no: "لا",
    pending: "قريبًا",
    partial: "جزئيًا",
    bachelor: "بكالوريوس",
    master: "ماجستير",
    phd: "دكتوراه",
    winter2026: "شتاء 2026",
    summer2027: "صيف 2027",
    winter2027: "شتاء 2027",
    later: "بعدين / مش متأكد",
    belowB1: "أقل من B1",
    noEnglish: "مفيش إنجليزي",
    noCzech: "مفيش تشيكي",
  },
  resultsTitle: "تقييم أهليتك",
  resultsSubtitle: "ده وضعك حسب اللي قولتهولنا.",
  readiness: "جاهزية",
  overallLabels: {
    ready: "أنت جاهز تقدم!",
    almost: "قربت — كام حاجة محتاجة تتظبط",
    notReady: "لسه مش جاهز — بس تقدر توصل",
  },
  resultCategories: {
    academics: {
      title: "الخلفية الأكاديمية",
      pass: "درجاتك وأوراقك كويسة للقبول.",
      warning: "بعض الحاجات الأكاديمية محتاجة انتباه — شهادة معلقة أو معدل أقل.",
      fail: "شهادة أو كشف درجات ناقص ممكن يوقف طلبك.",
    },
    documents: {
      title: "الأوراق المطلوبة",
      pass: "كل الأوراق الأساسية جاهزة.",
      warning: "بعض الأوراق ناقصة — لسه تقدر تلحق.",
      fail: "ناقصك أوراق حرجة (جواز السفر). لازم تظبط ده الأول.",
    },
    finances: {
      title: "الجاهزية المالية",
      pass: "مواردك المالية كافية لفيزا الطالب.",
      warning: "رصيدك على الحد — حاول تبين تمويل أكتر.",
      fail: "رصيد غير كافي أو مفيش إثبات تمويل. ده ممكن يسبب رفض الفيزا.",
    },
    timeline: {
      title: "الجدول الزمني",
      pass: "عندك وقت كافي تجهز طلب قوي.",
      warning: "الوقت ضيق — ابدأ دلوقتي وماتستناش.",
      fail: "فاضل وقت قليل جدًا. ممكن تحتاج تستهدف الفصل الجاي.",
    },
    language: {
      title: "مستوى اللغة",
      pass: "مستواك اللغوي بيأهلك للبرامج.",
      warning: "مستواك ممكن يحد من اختياراتك. فكر تمتحن.",
      fail: "محتاج تحسن مستواك اللغوي أو تاخد سنة تحضيرية.",
    },
  },
  ctaReady: {
    title: "وضعك ممتاز",
    text: "ملفك قوي. الخطوة الجاية هي التأكد إن أوراقك وطلبك كامل — وده اللي أقدر أساعدك فيه.",
    button: "شوف الخدمات →",
  },
  ctaAlmost: {
    title: "قربت — يلا نظبط اللي ناقص",
    text: "كام حاجة محتاجة انتباه، بس مفيش حاجة ماتتصلحش. راسلني وهقولك بالظبط تعمل إيه.",
    button: "اسألني على واتساب",
  },
  ctaNotReady: {
    title: "يلا نعمل خطة",
    text: "مش جاهز تقدم دلوقتي، بس بخطة صح تقدر تكون جاهز للدفعة الجاية. أقدر أساعدك تعرف الخطوات.",
    button: "يلا نتكلم على واتساب",
  },
  startOver: "ابدأ من الأول",
};
