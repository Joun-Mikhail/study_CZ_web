"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "@/components/locale-link";
import { cities, oneTimeCosts, type CityKey } from "@/data/costs";
import { motion } from "framer-motion";
import { EmailSignup } from "@/components/email-signup";
import { cn } from "@/lib/utils";
import {
  Info,
  Briefcase,
  Calculator,
  BedDouble,
  ShoppingBasket,
  UtensilsCrossed,
  TramFront,
  HeartPulse,
  Smartphone,
  Sparkles,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { cityGuides } from "@/data/city-guides";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { SiteImage } from "@/components/site-image";
import { CITY_IMAGE } from "@/data/images";
import { BudgetCheck } from "./budget-check";
import { trackToolStarted } from "@/components/umami";
import { LIFESTYLE_PRESETS, lastChecked, monthRange, studentMonth, type LifestyleKey, type LineKey, type LivingLine } from "@/lib/living-calc";
import { CANTEENS } from "@/data/living/canteens";
import { FOOD_BASKET, HOUSEHOLD_BASKET, rohlikUrl, type BasketItem } from "@/data/living/groceries";
import { HEALTH_INSURANCE } from "@/data/living/insurance";

const LINE_ICONS: Record<LineKey, LucideIcon> = {
  housing: BedDouble,
  food: ShoppingBasket,
  canteen: UtensilsCrossed,
  transport: TramFront,
  insurance: HeartPulse,
  phone: Smartphone,
  household: Sparkles,
};

function formatCzk(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n)) + " CZK";
}

const num = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);
const [INS_LOW, INS_HIGH] = HEALTH_INSURANCE.reportedMonthCzk;

const COPY = {
  en: {
    lifestyleLabel: "Choose a month",
    lifestyles: {
      budget: { name: "Budget month", hint: "Cheapest dorm bed, a 12-month pass, cooking every meal." },
      balanced: { name: "Balanced month", hint: "A mid-priced dorm bed, a monthly pass, 10 canteen lunches." },
    } as Record<LifestyleKey, { name: string; hint: string }>,
    perItem: "This month, by item",
    thisMonth: "This month",
    labels: {
      housing: "Dorm bed in a shared room",
      food: "Groceries, cooking at home",
      canteen: "Lunches at the university canteen",
      transport: "Student transport pass",
      insurance: "Health insurance",
      phone: "Mobile plan",
      household: "Toiletries and cleaning",
    } as Record<LineKey, string>,
    detail: (l: LivingLine): string => {
      const d = l.detail;
      switch (l.key) {
        case "housing":
          return `${num(d.nightly!)} CZK a night × ${d.nights} nights, from the official price lists`;
        case "food":
          return `${d.items} products for a month, at Rohlik.cz prices`;
        case "canteen":
          return d.meals ? `${d.meals} lunches × ${num(d.perMeal!)} CZK, the student price` : "None: you cook every meal";
        case "transport":
          return d.passMonths === 1 ? `${num(d.passCzk!)} CZK for 30 days` : `${num(d.passCzk!)} CZK for ${d.passMonths} months, spread over the year`;
        case "insurance":
          return `Not an official price: students report ${num(INS_LOW)} to ${num(INS_HIGH)} CZK a month`;
        case "phone":
          return `Kaktus prepaid plan “${d.plan}”`;
        case "household":
          return `${d.items} products, at Rohlik.cz prices`;
      }
    },
    over26: "Student fares end on your 26th birthday. After that a monthly pass costs the full fare.",
    sourcesTitle: "Where each number comes from",
    checkedOn: "checked",
    canteenNote: "Canteen",
    insuranceNote:
      "Students from outside the EU need comprehensive health insurance for a stay longer than 90 days. PVZP, the main insurer, publishes no price list, so this line shows what students report. Ask PVZP for an exact quote for your age and plan.",
    basketTitle: "The grocery basket",
    basketIntro:
      "Regular prices on Rohlik.cz, an online supermarket that delivers in all three cities, without member discounts or delivery fees. The quantities are our assumption for one person cooking at home, about 2,300 kcal a day. “1/4 ×” means one pack lasts four months.",
    householdTitle: "Toiletries and cleaning",
    perMonth: "a month",
    packs: (n: number) => (n >= 1 ? `${num(n)} × ` : `1/${Math.round(1 / n)} × `),
  },
  ar: {
    lifestyleLabel: "اختار نوع الشهر",
    lifestyles: {
      budget: { name: "شهر اقتصادي", hint: "أرخص سرير في السكن، واشتراك مواصلات 12 شهر، وطبخ كل الوجبات." },
      balanced: { name: "شهر متوازن", hint: "سرير بسعر متوسط، واشتراك مواصلات شهري، و10 وجبات غدا في مطعم الجامعة." },
    } as Record<LifestyleKey, { name: string; hint: string }>,
    perItem: "الشهر ده، بند بند",
    thisMonth: "الشهر ده",
    labels: {
      housing: "سرير في غرفة مشتركة في السكن الجامعي",
      food: "البقالة، والطبخ في البيت",
      canteen: "الغدا في مطعم الجامعة",
      transport: "اشتراك المواصلات للطلاب",
      insurance: "التأمين الصحي",
      phone: "باقة الموبايل",
      household: "أدوات النظافة الشخصية والتنظيف",
    } as Record<LineKey, string>,
    detail: (l: LivingLine): string => {
      const d = l.detail;
      switch (l.key) {
        case "housing":
          return `${num(d.nightly!)} كرونة في الليلة × ${d.nights} ليلة، من قوائم الأسعار الرسمية`;
        case "food":
          return `${d.items} منتج لمدة شهر، بأسعار Rohlik.cz`;
        case "canteen":
          return d.meals ? `${d.meals} وجبات غدا × ${num(d.perMeal!)} كرونة، سعر الطلاب` : "ولا وجبة: بتطبخ كل أكلك";
        case "transport":
          return d.passMonths === 1 ? `${num(d.passCzk!)} كرونة لمدة 30 يوم` : `${num(d.passCzk!)} كرونة لمدة ${d.passMonths} شهر، مقسومة على السنة`;
        case "insurance":
          return `مش سعر رسمي: الطلاب بيقولوا من ${num(INS_LOW)} لـ ${num(INS_HIGH)} كرونة في الشهر`;
        case "phone":
          return `باقة كارت Kaktus: \u2068${d.plan}\u2069`;
        case "household":
          return `${d.items} منتجات، بأسعار Rohlik.cz`;
      }
    },
    over26: "خصم الطلاب في المواصلات بيخلص يوم عيد ميلادك الـ26. بعدها الاشتراك الشهري بالسعر الكامل.",
    sourcesTitle: "كل رقم جاي منين",
    checkedOn: "تمت المراجعة",
    canteenNote: "مطعم الجامعة",
    insuranceNote:
      "الطلاب من خارج الاتحاد الأوروبي لازم يكون معاهم تأمين صحي شامل لو الإقامة أكتر من 90 يوم. شركة PVZP، أكبر شركة للتأمين ده، مش بتنشر قائمة أسعار، عشان كده البند ده من كلام الطلاب. اطلب من PVZP سعر مضبوط لسنك ونوع التأمين.",
    basketTitle: "سلة البقالة",
    basketIntro:
      "الأسعار العادية على Rohlik.cz، سوبرماركت أونلاين بيوصل في المدن التلاتة، من غير خصومات أعضاء ومن غير مصاريف التوصيل. الكميات دي افتراض مننا لشخص واحد بيطبخ في البيت، حوالي 2,300 سعر حراري في اليوم. «1/4 ×» معناها إن العبوة بتكفي 4 شهور.",
    householdTitle: "أدوات النظافة الشخصية والتنظيف",
    perMonth: "في الشهر",
    packs: (n: number) => (n >= 1 ? `${num(n)} × ` : `1/${Math.round(1 / n)} × `),
  },
};

const WEEKS_PER_MONTH = 4.33;

function BasketList({ items, locale, c }: { items: BasketItem[]; locale: "en" | "ar"; c: (typeof COPY)["en"] }) {
  return (
    <ul className="divide-y divide-border-subtle text-sm">
      {items.map((item) => (
        <li key={item.id} className="flex items-baseline justify-between gap-3 py-2">
          <a href={rohlikUrl(item)} target="_blank" rel="noopener noreferrer" className="text-text-primary underline underline-offset-2 hover:text-brand">
            {item.label[locale]} <span className="text-text-muted" dir="ltr">({item.pack})</span>
          </a>
          <span className="shrink-0 text-text-secondary tabular-nums">
            {c.packs(item.packsPerMonth)}
            <bdi dir="ltr">{num(item.packCzk)} CZK</bdi>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function CostOfLivingPage() {
  const { t, locale } = useTranslation();
  const c = COPY[locale];
  const [city, setCity] = useState<CityKey>("prague");
  const [lifestyle, setLifestyle] = useState<LifestyleKey>("balanced");
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyWage, setHourlyWage] = useState(140);

  const month = useMemo(() => studentMonth(city, LIFESTYLE_PRESETS[lifestyle]), [city, lifestyle]);
  const [totalMin, totalMax] = useMemo(() => monthRange(city), [city]);
  const checked = useMemo(() => lastChecked(studentMonth(city, LIFESTYLE_PRESETS.balanced)), [city]);
  const lineMax = Math.max(...month.lines.map((l) => l.czk), 1);
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
              id={CITY_IMAGE[cities.find((ct) => ct.key === city)?.label.en ?? "Prague"] ?? "prague-architecture"}
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
              date={checked}
              label={locale === "ar" ? "آخر تحديث:" : "Last updated:"}
            />
          </div>
        </div>

        {/* City tabs */}
        <div className="max-w-xl mx-auto flex justify-center gap-2 mb-6">
          {cities.map((ct) => (
            <button
              key={ct.key}
              type="button"
              aria-pressed={city === ct.key}
              onClick={() => { trackToolStarted("cost-of-living"); setCity(ct.key); }}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors",
                city === ct.key
                  ? "bg-brand text-bg border-brand"
                  : "bg-surface text-text-secondary border-border-subtle hover:text-text-primary hover:border-brand/30"
              )}
            >
              {ct.label[locale]}
            </button>
          ))}
        </div>

        {/* Lifestyle */}
        <fieldset className="max-w-xl mx-auto mb-10">
          <legend className="sr-only">{c.lifestyleLabel}</legend>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(LIFESTYLE_PRESETS) as LifestyleKey[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={lifestyle === key}
                onClick={() => { trackToolStarted("cost-of-living"); setLifestyle(key); }}
                className={cn(
                  "rounded-xl border p-3 text-start transition-colors",
                  lifestyle === key
                    ? "border-brand bg-brand/10"
                    : "border-border-subtle bg-surface hover:border-brand/30"
                )}
              >
                <span className="block text-sm font-semibold text-text-primary">{c.lifestyles[key].name}</span>
                <span className="mt-0.5 block text-xs text-text-secondary leading-snug">{c.lifestyles[key].hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* Breakdown */}
          <motion.div
            key={`${city}-${lifestyle}`}
            initial={{ y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard hoverEffect="border" className="h-full">
              {/* Plain HTML bars: every label and figure is real text that
                  screen readers and contrast checkers can read. */}
              <p className="text-xs font-medium text-text-muted mb-4">{c.perItem}</p>
              <ul className="space-y-4" data-testid="month-lines">
                {month.lines.map((line) => {
                  const Icon = LINE_ICONS[line.key];
                  return (
                    <li key={line.key} data-line={line.key}>
                      <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 font-medium text-text-primary">
                          <Icon className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                          {c.labels[line.key]}
                        </span>
                        <span className="shrink-0 font-semibold text-text-primary tabular-nums" dir="ltr">
                          {formatCzk(line.czk)}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-bg-subtle" aria-hidden="true">
                        <div
                          className={cn("stage-progress h-full rounded-full", line.official ? "bg-brand" : "bg-text-muted")}
                          style={{ width: `${Math.max((line.czk / lineMax) * 100, 2)}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-text-muted">{c.detail(line)}</p>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-border-subtle pt-4">
                <span className="text-sm font-semibold text-text-primary">{c.thisMonth}</span>
                <span className="text-xl font-bold text-brand tabular-nums" dir="ltr" data-testid="month-total">
                  {formatCzk(month.totalCzk)}
                </span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Range + disclaimer */}
          <div className="flex flex-col gap-6">
            <GlassCard hoverEffect="glow">
              <p className="text-sm text-text-secondary mb-1">{t.cost.totalLabel}</p>
              <p className="text-3xl font-bold text-brand" dir="ltr" data-testid="month-range">
                {formatCzk(totalMin)} – {formatCzk(totalMax)}
              </p>
            </GlassCard>

            <BudgetCheck city={city} totalMin={totalMin} locale={locale} onCity={setCity} />

            <GlassCard className="flex gap-3 items-start">
              <Info className="w-5 h-5 text-info shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm text-text-secondary leading-relaxed">
                <p>{t.cost.disclaimer}</p>
                <p>{c.over26}</p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Sources */}
        <section className="max-w-5xl mx-auto mt-10" aria-labelledby="living-sources">
          <h2 id="living-sources" className="text-xl font-semibold text-text-primary mb-4">{c.sourcesTitle}</h2>
          <GlassCard>
            <ul className="space-y-3 text-sm">
              {month.lines.map((line) => (
                <li key={line.key}>
                  <p className="font-medium text-text-primary">{c.labels[line.key]}</p>
                  <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    {line.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand underline underline-offset-2">
                          {s.name[locale]}
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>{" "}
                        <span className="text-xs text-text-muted">({c.checkedOn} <bdi dir="ltr">{s.checkedOn}</bdi>)</span>
                      </li>
                    ))}
                  </ul>
                  {line.key === "canteen" && <p className="mt-1 text-xs text-text-muted">{CANTEENS[city].note[locale]}</p>}
                  {line.key === "insurance" && <p className="mt-1 text-xs text-text-muted">{c.insuranceNote}</p>}
                </li>
              ))}
            </ul>
          </GlassCard>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <GlassCard>
              <h3 className="text-base font-semibold text-text-primary mb-1">{c.basketTitle}</h3>
              <p className="text-xs text-text-muted mb-3 leading-relaxed">{c.basketIntro}</p>
              <BasketList items={FOOD_BASKET} locale={locale} c={c} />
            </GlassCard>
            <GlassCard>
              <h3 className="text-base font-semibold text-text-primary mb-3">{c.householdTitle}</h3>
              <BasketList items={HOUSEHOLD_BASKET} locale={locale} c={c} />
            </GlassCard>
          </div>
        </section>

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
          <p className="text-sm mt-4">
            <Link href="/what-it-costs/" className="font-medium text-brand hover:underline">
              {t.cost.fullCostLink}
            </Link>
          </p>
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
