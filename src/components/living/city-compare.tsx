"use client";

import { MapPinned } from "lucide-react";
import { cn } from "@/lib/utils";
import { cities, type CityKey } from "@/data/costs";
import { SiteImage } from "@/components/site-image";
import { dormNightly, DORM_NIGHTS_PER_MONTH, STUDENT_TRANSPORT, CANTEEN_MEAL, RENT_MAP, flatRent } from "@/data/living/city-costs";
import { fmtCzk, roundEstimate, studentMonth, type MonthSettings } from "@/lib/living-calc";
import { BasisTag } from "./controls";
import { CITY_PHOTO } from "./student-month";
import { iso } from "./format";

type Locale = "en" | "ar";

const COPY = {
  en: {
    title: "Prague, Brno or Ostrava?",
    lead: "The same month, priced in each city with your settings from the simulator above.",
    yourMonth: "Your month here",
    cheapest: "Lowest",
    rows: {
      dormShared: "Dorm bed, shared room",
      dormOwn: "Dorm, own room",
      flat: "Furnished one-room flat, outside centre",
      meal: "Lunch at the university canteen",
      pass: "Student transport pass",
    },
    from: "from",
    perMonth: "a month",
    official: "Official",
    choose: (c: string) => `Use ${c}`,
    why: "Why can Prague come out cheapest? These totals use the cheapest bed on each university's official list, and the lowest dorm prices we found are in Prague (ČVUT). If you rent a flat instead, Prague is the most expensive of the three: switch \"Where you live\" above to see it.",
  },
  ar: {
    title: "براغ أم برنو أم أوسترافا؟",
    lead: "الشهر نفسه، محسوبًا في كل مدينة بالإعدادات التي اخترتها في الحاسبة أعلاه.",
    yourMonth: "شهرك هنا",
    cheapest: "الأقل",
    rows: {
      dormShared: "سرير في سكن جامعي، غرفة مشتركة",
      dormOwn: "سكن جامعي، غرفة خاصة",
      flat: "شقة مفروشة بغرفة واحدة خارج المركز",
      meal: "غداء في مطعم الجامعة",
      pass: "اشتراك المواصلات للطلاب",
    },
    from: "من",
    perMonth: "في الشهر",
    official: "رسمي",
    choose: (c: string) => `اختر ${c}`,
    why: "لماذا قد تظهر براغ الأرخص؟ هذه المجاميع تستخدم أرخص سرير في قائمة كل جامعة، وأقل أسعار السكن الجامعي التي وجدناها في براغ (ČVUT). أما إذا استأجرت شقة، فبراغ هي الأغلى بين المدن الثلاث: غيّر «مكان السكن» أعلاه لترى ذلك.",
  },
};

export function CityCompare({ locale, settings, city, onCity }: { locale: Locale; settings: MonthSettings; city: CityKey; onCity: (c: CityKey) => void }) {
  const t = COPY[locale];
  const dorm = dormNightly();
  const totals = Object.fromEntries(cities.map((c) => [c.key, roundEstimate(studentMonth(c.key, settings).totalCzk)])) as Record<CityKey, number>;
  const max = Math.max(...Object.values(totals));
  const min = Math.min(...Object.values(totals));

  return (
    <section id="compare" aria-labelledby="compare-title" className="scroll-mt-24">
      <p className="inline-flex items-center gap-2 rounded-full bg-sky-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-ink">
        <MapPinned className="h-4 w-4" aria-hidden="true" />
        {locale === "ar" ? "مقارنة المدن" : "City comparison"}
      </p>
      <h2 id="compare-title" className="mt-3 text-2xl sm:text-4xl font-bold text-text-primary">{t.title}</h2>
      <p className="mt-3 text-text-secondary">{t.lead}</p>
      {totals.prague === min && <p className="mt-2 max-w-3xl text-sm text-text-muted">{t.why}</p>}

      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {cities.map((c) => {
          const rent = RENT_MAP.cities[c.key].outside;
          const rows: { label: string; value: string; kind: "official"; range?: string }[] = [
            { label: t.rows.dormShared, value: `${t.from} ${iso(fmtCzk(dorm[c.key].double[0] * DORM_NIGHTS_PER_MONTH))}`, kind: "official" },
            { label: t.rows.dormOwn, value: `${t.from} ${iso(fmtCzk(dorm[c.key].single[0] * DORM_NIGHTS_PER_MONTH))}`, kind: "official" },
            {
              label: t.rows.flat,
              value: iso(fmtCzk(roundEstimate(flatRent(c.key, "outside")))),
              kind: "official",
              range: `${flatRent(c.key, "outside", rent.lowest).toLocaleString("en-US")}–${flatRent(c.key, "outside", rent.highest).toLocaleString("en-US")}`,
            },
            { label: t.rows.meal, value: iso(fmtCzk(CANTEEN_MEAL[c.key].mealCzk)), kind: "official" },
            { label: t.rows.pass, value: iso(fmtCzk(STUDENT_TRANSPORT[c.key].monthlyCzk)), kind: "official" },
          ];
          const active = c.key === city;
          return (
            <li key={c.key} className={cn("overflow-hidden rounded-3xl border bg-surface", active ? "border-brand ring-2 ring-brand/25" : "border-border-subtle")}>
              <div className="relative h-36">
                <SiteImage id={CITY_PHOTO[c.key]} sizes="(max-width: 768px) 100vw, 400px" whenNear />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="text-2xl font-bold text-white">{c.label[locale]}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-medium text-text-muted">{t.yourMonth}</p>
                <p className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-text-primary tabular-nums" dir="ltr">≈ {fmtCzk(totals[c.key])}</span>
                  {totals[c.key] === min && <span className="rounded-full bg-teal-soft px-2 py-0.5 text-[11px] font-semibold text-teal-ink">{t.cheapest}</span>}
                </p>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-bg-muted" aria-hidden="true">
                  <div className="grow-x h-full rounded-full bg-[var(--viz-1)]" style={{ transform: `scaleX(${totals[c.key] / max})` }} />
                </div>
                <dl className="mt-4 space-y-2.5 text-sm">
                  {rows.map((r) => (
                    <div key={r.label} className="flex items-start justify-between gap-3">
                      <dt className="text-text-secondary">
                        {r.label}
                        <span className="ms-1.5 align-middle"><BasisTag kind={r.kind}>{t.official}</BasisTag></span>
                      </dt>
                      <dd className="text-end">
                        <span className="block font-semibold text-text-primary tabular-nums whitespace-nowrap">{r.value}</span>
                        {r.range && <span className="block whitespace-nowrap text-[11px] text-text-muted tabular-nums" dir="ltr">{r.range}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
                {!active && (
                  <button type="button" onClick={() => onCity(c.key)} className="mt-4 min-h-10 w-full rounded-lg border border-border-subtle text-sm font-semibold text-text-secondary hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">
                    {t.choose(c.label[locale])}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
