"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { cities, costCategories, totalRange, oneTimeCosts, type CityKey } from "@/data/costs";
import { motion } from "framer-motion";
import { EmailSignup } from "@/components/email-signup";
import { cn } from "@/lib/utils";
import {
  Info,
  Briefcase,
  Calculator,
  BedDouble,
  ShoppingBasket,
  TramFront,
  HeartPulse,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  dorm: BedDouble,
  food: ShoppingBasket,
  transport: TramFront,
  insurance: HeartPulse,
  phone: Smartphone,
  misc: Sparkles,
};
import { cityGuides } from "@/data/city-guides";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { SiteImage } from "@/components/site-image";
import { CITY_IMAGE } from "@/data/images";
import { BudgetCheck } from "./budget-check";
import { trackToolStarted } from "@/components/umami";

function formatCzk(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n)) + " CZK";
}

const WEEKS_PER_MONTH = 4.33;

export default function CostOfLivingPage() {
  const { t, locale } = useTranslation();
  const [city, setCity] = useState<CityKey>("prague");
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyWage, setHourlyWage] = useState(140);

  const chartData = useMemo(
    () =>
      costCategories.map((cat) => {
        const [min, max] = cat.monthlyCzk[city];
        return {
          name: cat.label[locale],
          avg: Math.round((min + max) / 2),
          min,
          max,
        };
      }),
    [city, locale]
  );

  const chartMax = Math.max(...chartData.map((r) => r.avg), 1);
  const [totalMin, totalMax] = totalRange(city);
  const monthlyEarnings = hoursPerWeek * hourlyWage * WEEKS_PER_MONTH;
  const shortfall = totalMin - monthlyEarnings;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />

      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero banner */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="relative w-full h-[140px] sm:h-[190px] rounded-2xl overflow-hidden">
            <SiteImage
              key={city}
              id={CITY_IMAGE[cities.find((c) => c.key === city)?.label.en ?? "Prague"] ?? "prague-architecture"}
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            {t.cost.title}
          </h1>
          <p className="text-text-secondary leading-relaxed">{t.cost.subtitle}</p>
          <div className="mt-3 flex justify-center">
            <VerifiedBadge
              date="2026-08-27"
              label={locale === "ar" ? "آخر تحديث:" : "Last updated:"}
            />
          </div>
        </div>

        {/* City tabs */}
        <div className="max-w-xl mx-auto flex justify-center gap-2 mb-10">
          {cities.map((c) => (
            <button
              key={c.key}
              onClick={() => { trackToolStarted("cost-of-living"); setCity(c.key); }}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors",
                city === c.key
                  ? "bg-brand text-bg border-brand"
                  : "bg-surface text-text-secondary border-border-subtle hover:text-text-primary hover:border-brand/30"
              )}
            >
              {c.label[locale]}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* Chart */}
          <motion.div
            key={city}
            initial={{ y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard hoverEffect="border" className="h-full">
              {/* Plain HTML bars: every label and figure is real text that
                  screen readers and contrast checkers can read (chart text
                  drawn inside an SVG can't be contrast-checked). */}
              <p className="text-xs font-medium text-text-muted mb-4">
                {locale === "ar" ? "متوسط الشهر لكل بند" : "Average per month, by item"}
              </p>
              <ul className="space-y-4">
                {chartData.map((row) => (
                  <li key={row.name}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-medium text-text-primary">{row.name}</span>
                      <span className="shrink-0 font-semibold text-text-primary tabular-nums" dir="ltr">
                        {formatCzk(row.avg)}
                      </span>
                    </div>
                    <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-bg-subtle" aria-hidden="true">
                      <div
                        className="stage-progress h-full rounded-full bg-brand"
                        style={{ width: `${Math.max((row.avg / chartMax) * 100, 2)}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-text-muted tabular-nums" dir="ltr">
                      {formatCzk(row.min)} – {formatCzk(row.max)}
                    </p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>

          {/* Total + disclaimer */}
          <div className="flex flex-col gap-6">
            <GlassCard hoverEffect="glow">
              <p className="text-sm text-text-secondary mb-1">{t.cost.totalLabel}</p>
              <p className="text-3xl font-bold text-brand" dir="ltr">
                {formatCzk(totalMin)} – {formatCzk(totalMax)}
              </p>
            </GlassCard>

            <BudgetCheck city={city} totalMin={totalMin} locale={locale} onCity={setCity} />

            <GlassCard className="flex gap-3 items-start">
              <Info className="w-5 h-5 text-info shrink-0 mt-0.5" />
              <p className="text-sm text-text-secondary leading-relaxed">{t.cost.disclaimer}</p>
            </GlassCard>
          </div>
        </div>

        {/* Each category with its icon and this city's range */}
        <ul className="max-w-5xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" aria-label={locale === "ar" ? "التكاليف الشهرية حسب البند" : "Monthly costs by category"}>
          {costCategories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.key] ?? Sparkles;
            const [min, max] = cat.monthlyCzk[city];
            return (
              <li key={cat.key} className="reveal rounded-2xl border border-border-subtle bg-surface p-4">
                <span className="mb-2 inline-grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-sm font-medium text-text-primary leading-snug">{cat.label[locale]}</p>
                <p className="mt-1 text-xs text-text-muted tabular-nums" dir="ltr">
                  {formatCzk(min)} – {formatCzk(max)}
                </p>
              </li>
            );
          })}
        </ul>

        {/* One-time costs */}
        <div className="max-w-5xl mx-auto mt-10">
          <h2 className="text-xl font-semibold text-text-primary mb-4">{t.cost.oneTimeTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GlassCard hoverEffect="lift">
              <p className="text-sm text-text-secondary mb-2">{t.cost.accommodationDeposit}</p>
              <p className="text-lg font-semibold text-text-primary">
                {formatCzk(oneTimeCosts.accommodationDeposit[0])} – {formatCzk(oneTimeCosts.accommodationDeposit[1])}
              </p>
            </GlassCard>
            <GlassCard hoverEffect="lift">
              <p className="text-sm text-text-secondary mb-2">{t.cost.minBankBalance}</p>
              <p className="text-lg font-semibold text-text-primary">
                {formatCzk(oneTimeCosts.minBankBalance)}
              </p>
            </GlassCard>
            <GlassCard hoverEffect="lift">
              <p className="text-sm text-text-secondary mb-2">{t.cost.tuitionRange}</p>
              <p className="text-lg font-semibold text-text-primary">
                {formatCzk(oneTimeCosts.tuitionEnglishPerYear[0])} – {formatCzk(oneTimeCosts.tuitionEnglishPerYear[1])}
              </p>
            </GlassCard>
          </div>
        </div>

        {/* City guide for selected city */}
        <div className="max-w-5xl mx-auto mt-10">
          <h2 className="text-xl font-semibold text-text-primary mb-4">{t.cost.cityGuideTitle}</h2>
          <GlassCard>
            <h3 className="text-lg font-semibold mb-2">{cityGuides[city].name[locale]}</h3>
            <p className="text-sm text-text-secondary mb-3">{cityGuides[city].overview[locale]}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">{t.cost.housingLabel}</h4>
                <p className="text-sm text-text-secondary">{cityGuides[city].housing[locale]}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">{t.cost.transportLabel}</h4>
                <p className="text-sm text-text-secondary">{cityGuides[city].transport[locale]}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">{t.cost.tipsLabel}</h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  {cityGuides[city].tips[locale].map((tip, i) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Working in Czechia + budget calculator */}
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard hoverEffect="border">
            <div className="flex items-center gap-2.5 mb-4">
              <Briefcase className="w-5 h-5 text-brand" />
              <h2 className="text-lg font-semibold text-text-primary">{t.cost.workingTitle}</h2>
            </div>
            <ul className="space-y-3">
              {t.cost.workingPoints.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-text-secondary leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-2" />
                  {point}
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard hoverEffect="border">
            <div className="flex items-center gap-2.5 mb-5">
              <Calculator className="w-5 h-5 text-brand" />
              <h2 id="work-calculator" className="text-lg font-semibold text-text-primary scroll-mt-24">{t.cost.calcTitle}</h2>
            </div>

            <div className="space-y-4 mb-5">
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-text-secondary">{t.cost.calcHoursLabel}</span>
                  <span className="font-medium text-text-primary">{hoursPerWeek}</span>
                </div>
                <input
                  type="range"
                  aria-label={t.cost.calcHoursLabel}
                  min={0}
                  max={30}
                  value={hoursPerWeek}
                  onChange={(e) => { trackToolStarted("cost-of-living"); setHoursPerWeek(Number(e.target.value)); }}
                  className="w-full accent-brand"
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-text-secondary">{t.cost.calcWageLabel}</span>
                  <span className="font-medium text-text-primary">{hourlyWage}</span>
                </div>
                <input
                  type="range"
                  aria-label={t.cost.calcWageLabel}
                  min={120}
                  max={220}
                  step={10}
                  value={hourlyWage}
                  onChange={(e) => { trackToolStarted("cost-of-living"); setHourlyWage(Number(e.target.value)); }}
                  className="w-full accent-brand"
                />
              </div>
            </div>

            <div className="rounded-xl bg-bg-subtle/60 border border-border-subtle p-4">
              <p className="text-xs text-text-muted mb-1">{t.cost.calcEarningsLabel}</p>
              <p className="text-2xl font-bold text-brand mb-2">{formatCzk(monthlyEarnings)}</p>
              <p className="text-xs text-text-muted mb-3">
                {t.cost.calcVsCosts}: <span dir="ltr">{formatCzk(totalMin)} – {formatCzk(totalMax)}</span>
              </p>
              <p className={cn("text-sm font-medium", shortfall > 0 ? "text-brand" : "text-success")}>
                {shortfall > 0
                  ? `${t.cost.calcShortfall} ${formatCzk(shortfall)}`
                  : t.cost.calcCovered}
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Inside <main>, so the box belongs to a landmark (axe "region"). */}
        <div className="max-w-3xl mx-auto mt-12">
          <EmailSignup source="checklist" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
