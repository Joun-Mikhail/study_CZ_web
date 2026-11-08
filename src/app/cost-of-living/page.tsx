"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "@/components/locale-link";
import { EmailSignup } from "@/components/email-signup";
import { cities, type CityKey } from "@/data/costs";
import { cityGuides } from "@/data/city-guides";
import { OFFICIAL } from "@/data/official-figures";
import { JOB_BY_ID, type JobRoleId } from "@/data/living/jobs";
import { WEEKS_PER_MONTH, DEPOSIT_RULE } from "@/data/living/work-rules";
import { numbeoValue } from "@/data/living/city-costs";
import { studentMonth, roundEstimate, fmtCzk, maxDeposit, LIFESTYLE_PRESETS, type Lifestyle, type MonthSettings } from "@/lib/living-calc";
import { trackToolStarted } from "@/components/umami";
import { LivingHero } from "@/components/living/living-hero";
import { WorkdayBasket } from "@/components/living/workday-basket";
import { EarningsSimulator, type EarningsState } from "@/components/living/earnings-simulator";
import { WorkRules } from "@/components/living/work-rules";
import { StudentMonth, SampleMonths } from "@/components/living/student-month";
import { CityCompare } from "@/components/living/city-compare";
import { SourcesPanel } from "@/components/living/sources-panel";
import { BudgetCheck } from "./budget-check";
import { ArrowRight, Landmark } from "lucide-react";

const COPY = {
  en: {
    cityGuide: "Living there: housing, transport and tips",
    housing: "Housing",
    transport: "Transport",
    tips: "Practical tips",
    oneTime: "One-time costs to plan for",
    proof: "Money you must show for the visa",
    proofSub: "a year, as a bank balance (Ministry of the Interior)",
    deposit: "Private rental deposit",
    depositSub: (rent: string, max: string) => `at most 3 months' rent by law: ${max} on a ${rent} flat`,
    tuition: "Tuition, visa fees and a whole degree",
    tuitionSub: "What studying in Czechia costs, with sources",
    budgetTitle: "Check your own budget",
    related: "Keep planning",
    links: [
      { href: "/what-it-costs/", label: "What a whole degree costs" },
      { href: "/student-housing/", label: "University dorm prices" },
      { href: "/work-while-studying/", label: "Work rules for students" },
      { href: "/scholarships/", label: "Scholarships" },
      { href: "/preparatory-year/", label: "Study free in Czech" },
      { href: "/arrival/", label: "Your first two weeks" },
    ],
  },
  ar: {
    cityGuide: "الحياة هناك: السكن والمواصلات ونصائح",
    housing: "السكن",
    transport: "المواصلات",
    tips: "نصائح عملية",
    oneTime: "تكاليف لمرة واحدة يجب التخطيط لها",
    proof: "المبلغ المطلوب إثباته للتأشيرة",
    proofSub: "للسنة، كرصيد في البنك (وزارة الداخلية)",
    deposit: "تأمين الشقة عند الإيجار الخاص",
    depositSub: (rent: string, max: string) => `بحد أقصى إيجار 3 أشهر قانونًا: ${max} لشقة إيجارها ${rent}`,
    tuition: "الرسوم الدراسية والتأشيرة وتكلفة الدراسة كاملة",
    tuitionSub: "كم تكلف الدراسة في التشيك، مع المصادر",
    budgetTitle: "راجع ميزانيتك",
    related: "أكمل التخطيط",
    links: [
      { href: "/what-it-costs/", label: "تكلفة الدراسة كاملة" },
      { href: "/student-housing/", label: "أسعار السكن الجامعي" },
      { href: "/work-while-studying/", label: "قواعد العمل للطلاب" },
      { href: "/scholarships/", label: "المنح الدراسية" },
      { href: "/preparatory-year/", label: "الدراسة مجانًا بالتشيكية" },
      { href: "/arrival/", label: "أول أسبوعين بعد الوصول" },
    ],
  },
};

export default function CostOfLivingPage() {
  const { locale } = useTranslation();
  const c = COPY[locale];
  const [city, setCity] = useState<CityKey>("brno");
  const [lifestyle, setLifestyle] = useState<Lifestyle | null>("balanced");
  const [settings, setSettings] = useState<MonthSettings>(LIFESTYLE_PRESETS.balanced);
  const [roleId, setRoleId] = useState<JobRoleId>("waiter");
  const [wage, setWage] = useState(JOB_BY_ID.waiter.typicalHourlyCzk);
  const [earn, setEarn] = useState<EarningsState>({ hoursPerShift: 5, shiftsPerWeek: 2, weeksPerMonth: WEEKS_PER_MONTH, contract: "dpp", declaration: true });

  const month = useMemo(() => studentMonth(city, settings), [city, settings]);
  const cityTotals = useMemo(
    () => Object.fromEntries(cities.map((x) => [x.key, roundEstimate(studentMonth(x.key, settings).totalCzk)])) as Record<CityKey, number>,
    [settings],
  );
  const guide = cityGuides[city];
  const rent = Math.round(numbeoValue(city, "rentOutside")?.avg ?? 0);

  const chooseCity = (k: CityKey) => {
    trackToolStarted("cost-of-living");
    setCity(k);
  };
  const chooseLifestyle = (l: Lifestyle) => {
    trackToolStarted("cost-of-living");
    setLifestyle(l);
    setSettings(LIFESTYLE_PRESETS[l]);
  };
  const changeSettings = (s: MonthSettings) => {
    setSettings(s);
    setLifestyle(null);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />

      <main id="main-content" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-16 sm:space-y-24">
          <div>
            <LivingHero locale={locale} city={city} onCity={chooseCity} wage={wage} />
          </div>

          <WorkdayBasket locale={locale} roleId={roleId} wage={wage} onRole={(id) => { setRoleId(id); setWage(JOB_BY_ID[id].typicalHourlyCzk); }} onWage={setWage} />

          <EarningsSimulator
            locale={locale}
            city={city}
            onCity={chooseCity}
            roleId={roleId}
            onRole={setRoleId}
            wage={wage}
            onWage={setWage}
            state={earn}
            onState={setEarn}
            monthCostCzk={roundEstimate(month.totalCzk)}
          />

          <WorkRules locale={locale} />

          <div className="space-y-8">
            <StudentMonth
              locale={locale}
              city={city}
              onCity={chooseCity}
              lifestyle={lifestyle}
              onLifestyle={chooseLifestyle}
              settings={settings}
              onSettings={changeSettings}
              month={month}
            />
            <SampleMonths
              locale={locale}
              city={city}
              onPick={(l) => {
                chooseLifestyle(l);
                document.getElementById("month")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          </div>

          <div className="space-y-6">
            <CityCompare locale={locale} settings={settings} city={city} onCity={chooseCity} />

            <GlassCard>
              <h3 className="font-sans text-lg font-semibold text-text-primary">
                {c.cityGuide}: {guide.name[locale]}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{guide.overview[locale]}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">{c.housing}</h4>
                  <p className="mt-1 text-sm text-text-secondary">{guide.housing[locale]}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">{c.transport}</h4>
                  <p className="mt-1 text-sm text-text-secondary">{guide.transport[locale]}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">{c.tips}</h4>
                  <ul className="mt-1 space-y-1 text-sm text-text-secondary">
                    {guide.tips[locale].map((tip) => (
                      <li key={tip}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>

          <section aria-labelledby="one-time-title">
            <h2 id="one-time-title" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-text-primary">
              <Landmark className="h-6 w-6 text-brand" aria-hidden="true" />
              {c.oneTime}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border-subtle bg-surface p-5">
                <p className="text-sm text-text-secondary">{c.proof}</p>
                <p className="mt-1 text-2xl font-bold text-text-primary tabular-nums" dir="ltr">{fmtCzk(OFFICIAL.proofOfFundsYearCzk.value)}</p>
                <p className="mt-1 text-xs text-text-muted">
                  <a href={OFFICIAL.proofOfFundsYearCzk.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">{c.proofSub}</a>
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-surface p-5">
                <p className="text-sm text-text-secondary">{c.deposit}</p>
                <p className="mt-1 text-2xl font-bold text-text-primary tabular-nums" dir="ltr">≤ {fmtCzk(roundEstimate(maxDeposit(rent)))}</p>
                <p className="mt-1 text-xs text-text-muted">
                  <a href={DEPOSIT_RULE.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                    {c.depositSub(fmtCzk(roundEstimate(rent)), fmtCzk(roundEstimate(maxDeposit(rent))))}
                  </a>
                </p>
              </div>
              <GlassCard href="/what-it-costs/" className="p-5">
                <p className="text-sm font-semibold text-text-primary">{c.tuition}</p>
                <p className="mt-1 text-sm text-text-secondary">{c.tuitionSub}</p>
                <ArrowRight className="mt-3 h-5 w-5 text-brand rtl:rotate-180" aria-hidden="true" />
              </GlassCard>
            </div>
          </section>

          <section aria-labelledby="budget-title" className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 id="budget-title" className="text-xl sm:text-2xl font-bold text-text-primary">{c.budgetTitle}</h2>
              <div className="mt-4">
                <BudgetCheck city={city} totalMin={cityTotals[city]} locale={locale} onCity={chooseCity} cityTotals={cityTotals} />
              </div>
            </div>
            <nav aria-labelledby="related-title">
              <h2 id="related-title" className="text-xl sm:text-2xl font-bold text-text-primary">{c.related}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-border-subtle bg-surface px-4 text-sm font-semibold text-text-primary hover:border-brand hover:text-brand">
                      {l.label}
                      <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <SourcesPanel locale={locale} />

          {/* Inside <main>, so the box belongs to a landmark (axe "region"). */}
          <div className="mx-auto max-w-3xl">
            <EmailSignup source="checklist" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
