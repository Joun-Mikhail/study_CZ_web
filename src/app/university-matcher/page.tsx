"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { universities, type University } from "@/data/universities";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Sparkles, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

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

const cityOptions = Array.from(new Set(universities.map((u) => u.city)));

export default function MatcherPage() {
  const { t, locale } = useTranslation();
  const [step, setStep] = useState(0);
  const [city, setCity] = useState<string | "any">("any");
  const [budget, setBudget] = useState<BudgetBucket | null>(null);
  const [language, setLanguage] = useState<"English" | "Czech" | "any" | null>(null);

  const results: University[] = useMemo(() => {
    if (step < 3) return [];
    return universities.filter((u) => {
      const cityMatch = city === "any" || u.city === city;
      const budgetMatch =
        !budget ||
        budget === "any" ||
        (u.tuitionEurPerYear[0] <= budgetRanges[budget][1] &&
          u.tuitionEurPerYear[1] >= budgetRanges[budget][0]);
      const langMatch =
        !language || language === "any" || u.languages.includes(language);
      return cityMatch && budgetMatch && langMatch;
    });
  }, [step, city, budget, language]);

  const canGoNext = [true, budget !== null, language !== null][step];

  const reset = () => {
    setStep(0);
    setCity("any");
    setBudget(null);
    setLanguage(null);
  };

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
            <OptionCard key={c} active={city === c} onClick={() => setCity(c)} label={c} />
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

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            {t.matcher.title}
          </h1>
          <p className="text-text-secondary leading-relaxed">{t.matcher.subtitle}</p>
        </div>

        {/* progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === step ? "w-8 bg-amber" : "w-1.5 bg-border-subtle"
              )}
            />
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {step < 3 ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
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
                    onClick={() => canGoNext && setStep((s) => s + 1)}
                    className={cn(!canGoNext && "opacity-50 pointer-events-none")}
                  >
                    {step === 2 ? t.matcher.seeResults : t.matcher.next}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </MagneticButton>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    {t.matcher.resultsTitle}
                  </h2>
                  <p className="text-text-secondary text-sm">{t.matcher.resultsSubtitle}</p>
                </div>

                {results.length === 0 ? (
                  <p className="text-center text-text-muted py-10">{t.matcher.noResults}</p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {results.map((uni, i) => (
                      <motion.div
                        key={uni.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                      >
                        <GlassCard hoverEffect="glow" href={`/university/${uni.id}`}>
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-semibold text-text-primary">{uni.name}</h3>
                            <span className="shrink-0 inline-flex items-center gap-1 text-xs text-text-muted">
                              <MapPin className="w-3.5 h-3.5" />
                              {uni.city}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed mb-3">
                            {uni.blurb[locale]}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="px-2.5 py-1 rounded-full bg-amber/10 text-amber border border-amber/20">
                              €{uni.tuitionEurPerYear[0].toLocaleString()}–{uni.tuitionEurPerYear[1].toLocaleString()}/yr
                            </span>
                            {uni.fields.slice(0, 3).map((f) => (
                              <span
                                key={f}
                                className="px-2.5 py-1 rounded-full bg-white/5 text-text-secondary border border-border-subtle"
                              >
                                {f}
                              </span>
                            ))}
                            <span className="ml-auto inline-flex items-center gap-1 text-amber">
                              <ExternalLink className="w-3 h-3" />
                              {locale === "ar" ? "التفاصيل" : "Details"}
                            </span>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                )}

                <GlassCard hoverEffect="glow" className="text-center mb-6">
                  <Sparkles className="w-6 h-6 text-amber mx-auto mb-3" />
                  <h3 className="font-semibold text-text-primary mb-1">{t.matcher.ctaTitle}</h3>
                  <p className="text-sm text-text-secondary mb-4">{t.matcher.ctaSubtitle}</p>
                  <MagneticButton variant="primary" href="/courses">
                    {t.matcher.ctaButton}
                  </MagneticButton>
                </GlassCard>

                <div className="text-center">
                  <MagneticButton variant="ghost" onClick={reset}>
                    {t.matcher.startOver}
                  </MagneticButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
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
          ? "bg-amber/10 border-amber/50 text-text-primary font-medium"
          : "bg-surface border-border-subtle text-text-secondary hover:border-amber/30 hover:text-text-primary"
      )}
    >
      {label}
    </button>
  );
}
