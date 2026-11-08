"use client";

import { ArrowDown, BedDouble, TramFront, Briefcase, Milk, ShieldCheck, ShoppingBasket } from "lucide-react";
import { cities, type CityKey } from "@/data/costs";
import { SiteImage } from "@/components/site-image";
import { BASKET_PRESETS, GROCERY_BY_ID, GROCERY_CHECKED_ON } from "@/data/living/groceries";
import { JOB_BY_ID, hourlyRange } from "@/data/living/jobs";
import { STUDENT_TRANSPORT, dormNightly, DORM_NIGHTS_PER_MONTH } from "@/data/living/city-costs";
import { basketTotal, fmtCzk, fmtHours, roundEstimate, studentMonth, LIFESTYLE_PRESETS, type Lifestyle } from "@/lib/living-calc";
import { MonthBar, CITY_PHOTO } from "./student-month";
import { fmtDate } from "./format";

type Locale = "en" | "ar";

const COPY = {
  en: {
    eyebrow: (d: string) => `Prices checked ${d}`,
    title: "Cost of living in Czechia for students",
    subtitle: "What a student month really costs in Prague, Brno and Ostrava, what a part-time job pays, and what a day's wage buys in a Czech supermarket. Real prices, every one linked to its source.",
    jump: { workday: "The 8-hour challenge", earn: "Student jobs and pay", month: "Build your month", compare: "Compare cities" },
    preview: "Live preview",
    previewCity: "City",
    lifestyles: { budget: "Budget", balanced: "Balanced", comfortable: "Comfortable" } satisfies Record<Lifestyle, string>,
    aMonth: "a month",
    basket: (hours: string) => `The big shop costs ${hours} hours of waiter work`,
    tiles: {
      dorm: "Dorm bed, from",
      dormSub: (c: string) => `a month in ${c}, official price list`,
      pass: "Student transport pass",
      passSub: (c: string) => `a month in ${c}`,
      waiter: "Waiter, brigade ads",
      waiterSub: "gross per hour, Prague · Brno · Ostrava",
      milk: "1 litre of milk",
      milkSub: "Rohlik.cz shelf price",
    },
  },
  ar: {
    eyebrow: (d: string) => `الأسعار تمت مراجعتها في ${d}`,
    title: "تكلفة المعيشة في التشيك للطلاب",
    subtitle: "كم يكلف شهر الطالب فعلًا في براغ وبرنو وأوسترافا، وكم يدفع العمل الجزئي، وماذا يشتري أجر يوم واحد في سوبر ماركت تشيكي. أسعار حقيقية، وكل رقم مرتبط بمصدره.",
    jump: { workday: "تحدّي الثماني ساعات", earn: "وظائف الطلاب وأجورها", month: "ابنِ شهرك", compare: "قارن المدن" },
    preview: "معاينة مباشرة",
    previewCity: "المدينة",
    lifestyles: { budget: "اقتصادي", balanced: "متوازن", comfortable: "مريح" } satisfies Record<Lifestyle, string>,
    aMonth: "في الشهر",
    basket: (hours: string) => `المشتريات الكبيرة تساوي ${hours} ساعة من عمل الجرسون`,
    tiles: {
      dorm: "سرير في سكن جامعي، من",
      dormSub: (c: string) => `في الشهر في ${c}، حسب قائمة الأسعار الرسمية`,
      pass: "اشتراك المواصلات للطلاب",
      passSub: (c: string) => `في الشهر في ${c}`,
      waiter: "جرسون، إعلانات عمل مؤقت",
      waiterSub: "إجمالي في الساعة، براغ · برنو · أوسترافا",
      milk: "لتر لبن",
      milkSub: "سعر الرف في Rohlik.cz",
    },
  },
};

export function LivingHero({ locale, city, onCity, wage }: { locale: Locale; city: CityKey; onCity: (c: CityKey) => void; wage: number }) {
  const t = COPY[locale];
  const cityName = cities.find((c) => c.key === city)!.label[locale];
  const waiter = hourlyRange(JOB_BY_ID.waiter)!;
  const big = basketTotal(BASKET_PRESETS.bigShop);
  const dorm = dormNightly()[city];

  return (
    <>
      <div className="surface-ink relative overflow-hidden rounded-[32px] bg-ink">
        <div className="absolute inset-0">
          {/* Behind a dark overlay at 60 % opacity, so phones get a small file. */}
          <SiteImage key={city} id={CITY_PHOTO[city]} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 100vw, 1200px" priority className="opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30 rtl:bg-gradient-to-l" />
        </div>
        <div className="relative grid gap-8 p-5 sm:p-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
          {/* The column reserves the height it reaches in whichever font is taller (fallback in
              Arabic, the web font in English at 1024–1279 px), measured at those widths, so the
              hero doesn't change height when fonts load (CLS). Content sits at the bottom. */}
          <div className="sm:flex sm:flex-col sm:items-start sm:justify-end sm:rtl:min-h-[22.7rem] lg:max-xl:ltr:min-h-[28.4rem]">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
              <ShieldCheck className="h-4 w-4 text-[#5eead4]" aria-hidden="true" />
              {t.eyebrow(fmtDate(GROCERY_CHECKED_ON, locale))}
            </p>
            <h1 className="mt-4 text-3xl sm:text-5xl font-bold leading-[1.1] text-white">{t.title}</h1>
            {/* Arabic phones: reserve the height this paragraph takes in the fallback font (one line
                more than IBM Plex Arabic), so the preview card doesn't jump when the web font arrives. */}
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-white/85 max-sm:rtl:min-h-[8.2rem]">{t.subtitle}</p>
            <nav aria-label={locale === "ar" ? "أقسام الصفحة" : "On this page"} className="mt-6">
              {/* Two fixed columns on phones: how many rows the chips need must not depend on the font. */}
              <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {(Object.keys(t.jump) as (keyof typeof t.jump)[]).map((k, i) => (
                  <li key={k}>
                    <a
                      href={`#${k}`}
                      className={
                        i === 0
                          ? "flex h-full min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-3 text-center text-sm font-bold text-ink sm:inline-flex sm:px-4 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          : "flex h-full min-h-11 items-center justify-center rounded-full border border-white/30 px-3 text-center text-sm font-semibold text-white sm:inline-flex sm:px-4 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      }
                    >
                      {t.jump[k]}
                      {i === 0 && <ArrowDown className="h-4 w-4" aria-hidden="true" />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Live preview: the same calculation as the simulator below. */}
          <div className="rounded-3xl border border-white/15 bg-ink/70 p-5 backdrop-blur-md sm:max-lg:rtl:min-h-[20rem]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{t.preview}</p>
              <fieldset>
                <legend className="sr-only">{t.previewCity}</legend>
                <div className="flex gap-1 rounded-full bg-white/10 p-1">
                  {cities.map((c) => (
                    <label key={c.key} className="cursor-pointer">
                      <input type="radio" name="hero-city" className="peer sr-only" checked={city === c.key} onChange={() => onCity(c.key)} />
                      <span className="block rounded-full px-3 py-1.5 text-xs font-semibold text-white/80 peer-checked:bg-white peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-white">
                        {c.label[locale]}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
            <ul className="mt-4 space-y-3">
              {(["budget", "balanced", "comfortable"] as const).map((l) => {
                const m = studentMonth(city, LIFESTYLE_PRESETS[l]);
                return (
                  <li key={l}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold text-white">{t.lifestyles[l]}</span>
                      <span className="text-lg font-bold text-white tabular-nums" dir="ltr">
                        ≈ {fmtCzk(roundEstimate(m.totalCzk))}
                        <span className="ms-1 text-xs font-medium text-white/70">{t.aMonth}</span>
                      </span>
                    </div>
                    <div className="mt-1.5"><MonthBar lines={m.lines} locale={locale} tall={false} /></div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 flex gap-2 border-t border-white/15 pt-3 text-sm text-white/85">
              <ShoppingBasket className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>
                {t.basket(fmtHours(big / wage))} <span className="tabular-nums" dir="ltr">({fmtCzk(big)} ÷ {wage} CZK/h)</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Headline figures */}
      <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { icon: BedDouble, label: t.tiles.dorm, value: fmtCzk(dorm.double[0] * DORM_NIGHTS_PER_MONTH), sub: t.tiles.dormSub(cityName), tone: "bg-sky-soft text-sky-ink" },
          { icon: TramFront, label: t.tiles.pass, value: fmtCzk(STUDENT_TRANSPORT[city].monthlyCzk), sub: t.tiles.passSub(cityName), tone: "bg-teal-soft text-teal-ink" },
          { icon: Briefcase, label: t.tiles.waiter, value: `${waiter[0]}–${waiter[1]} CZK`, sub: t.tiles.waiterSub, tone: "bg-gold-soft text-gold-ink" },
          { icon: Milk, label: t.tiles.milk, value: fmtCzk(GROCERY_BY_ID.milk.priceCzk, { decimals: true }), sub: t.tiles.milkSub, tone: "bg-violet-soft text-violet-ink" },
        ].map((s) => (
          <li key={s.label} className="rounded-2xl border border-border-subtle bg-surface p-4">
            <span className={`inline-grid h-9 w-9 place-items-center rounded-xl ${s.tone}`} aria-hidden="true">
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xs font-medium text-text-muted">{s.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary tabular-nums" dir="ltr">{s.value}</p>
            <p className="text-xs text-text-muted leading-snug">{s.sub}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
