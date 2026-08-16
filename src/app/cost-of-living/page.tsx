"use client";

import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { cities, costCategories, totalRange, oneTimeCosts, type CityKey } from "@/data/costs";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";
import { Info, Briefcase, Calculator } from "lucide-react";
import { cityGuides } from "@/data/city-guides";

function useChartColors() {
  const [colors, setColors] = useState({
    grid: "rgba(255,255,255,0.06)",
    axis: "rgba(255,255,255,0.1)",
    tick: "#94a3b8",
    label: "#f8fafc",
    tooltipBg: "#1e293b",
    tooltipBorder: "rgba(255,255,255,0.1)",
    cursor: "rgba(245,158,11,0.06)",
    bar: "#f59e0b",
  });

  useEffect(() => {
    function read() {
      const s = getComputedStyle(document.documentElement);
      setColors({
        grid: s.getPropertyValue("--chart-grid").trim() || colors.grid,
        axis: s.getPropertyValue("--chart-axis").trim() || colors.axis,
        tick: s.getPropertyValue("--chart-tick").trim() || colors.tick,
        label: s.getPropertyValue("--chart-label").trim() || colors.label,
        tooltipBg: s.getPropertyValue("--chart-tooltip-bg").trim() || colors.tooltipBg,
        tooltipBorder: s.getPropertyValue("--chart-tooltip-border").trim() || colors.tooltipBorder,
        cursor: s.getPropertyValue("--chart-cursor").trim() || colors.cursor,
        bar: s.getPropertyValue("--color-amber")?.trim() || "#f59e0b",
      });
    }
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return colors;
}

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

  const chartColors = useChartColors();
  const [totalMin, totalMax] = totalRange(city);
  const monthlyEarnings = hoursPerWeek * hourlyWage * WEEKS_PER_MONTH;
  const shortfall = totalMin - monthlyEarnings;

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            {t.cost.title}
          </h1>
          <p className="text-text-secondary leading-relaxed">{t.cost.subtitle}</p>
        </div>

        {/* City tabs */}
        <div className="max-w-xl mx-auto flex justify-center gap-2 mb-10">
          {cities.map((c) => (
            <button
              key={c.key}
              onClick={() => setCity(c.key)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors",
                city === c.key
                  ? "bg-amber text-midnight border-amber"
                  : "bg-surface text-text-secondary border-border-subtle hover:text-text-primary hover:border-amber/30"
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard hoverEffect="border" className="h-full">
              <div className="h-[340px] w-full" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fill: chartColors.tick, fontSize: 12 }}
                      axisLine={{ stroke: chartColors.axis }}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={150}
                      tick={{ fill: chartColors.label, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: chartColors.cursor }}
                      contentStyle={{
                        background: chartColors.tooltipBg,
                        border: `1px solid ${chartColors.tooltipBorder}`,
                        borderRadius: 12,
                        color: chartColors.label,
                      }}
                      formatter={(value) => [formatCzk(Number(value)), locale === "ar" ? "متوسط / شهر" : "avg / month"]}
                    />
                    <Bar dataKey="avg" fill={chartColors.bar} radius={[0, 8, 8, 0]} barSize={22} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>

          {/* Total + disclaimer */}
          <div className="flex flex-col gap-6">
            <GlassCard hoverEffect="glow">
              <p className="text-sm text-text-secondary mb-1">{t.cost.totalLabel}</p>
              <p className="text-3xl font-bold text-amber">
                {formatCzk(totalMin)} – {formatCzk(totalMax)}
              </p>
            </GlassCard>

            <GlassCard className="flex gap-3 items-start">
              <Info className="w-5 h-5 text-info shrink-0 mt-0.5" />
              <p className="text-sm text-text-secondary leading-relaxed">{t.cost.disclaimer}</p>
            </GlassCard>
          </div>
        </div>

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
              <Briefcase className="w-5 h-5 text-amber" />
              <h2 className="text-lg font-semibold text-text-primary">{t.cost.workingTitle}</h2>
            </div>
            <ul className="space-y-3">
              {t.cost.workingPoints.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-text-secondary leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0 mt-2" />
                  {point}
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard hoverEffect="border">
            <div className="flex items-center gap-2.5 mb-5">
              <Calculator className="w-5 h-5 text-amber" />
              <h2 className="text-lg font-semibold text-text-primary">{t.cost.calcTitle}</h2>
            </div>

            <div className="space-y-4 mb-5">
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-text-secondary">{t.cost.calcHoursLabel}</span>
                  <span className="font-medium text-text-primary">{hoursPerWeek}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-amber"
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-text-secondary">{t.cost.calcWageLabel}</span>
                  <span className="font-medium text-text-primary">{hourlyWage}</span>
                </div>
                <input
                  type="range"
                  min={120}
                  max={220}
                  step={10}
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full accent-amber"
                />
              </div>
            </div>

            <div className="rounded-xl bg-midnight-light/60 border border-border-subtle p-4">
              <p className="text-xs text-text-muted mb-1">{t.cost.calcEarningsLabel}</p>
              <p className="text-2xl font-bold text-amber mb-2">{formatCzk(monthlyEarnings)}</p>
              <p className="text-xs text-text-muted mb-3">
                {t.cost.calcVsCosts}: {formatCzk(totalMin)} – {formatCzk(totalMax)}
              </p>
              <p className={cn("text-sm font-medium", shortfall > 0 ? "text-amber" : "text-success")}>
                {shortfall > 0
                  ? `${t.cost.calcShortfall} ${formatCzk(shortfall)}`
                  : t.cost.calcCovered}
              </p>
            </div>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
