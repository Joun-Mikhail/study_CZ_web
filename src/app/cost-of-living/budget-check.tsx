"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Bookmark } from "lucide-react";
import Link from "@/components/locale-link";
import { GlassCard } from "@/components/ui/glass-card";
import { HelpLink } from "@/components/help-sheet";
import { buttonClasses } from "@/components/ui/magnetic-button";
import { track } from "@/components/umami";
import { cities, totalRange, type CityKey } from "@/data/costs";
import { saveBudgetToJourney } from "@/lib/journey-store";

/**
 * "Your monthly budget": shows the gap to a realistic month honestly, the
 * free ways to close it first, and only then a call. No gap, no offer.
 * docs/JOURNEY.md, 2.5.
 */
const COPY = {
  en: {
    label: "Your monthly budget (CZK)",
    hint: "Optional. It stays in your browser.",
    gap: (gap: string, city: string) => `Your budget is about ${gap} a month short of the lower end of a realistic month in ${city}. Ways to close it:`,
    cheaper: (city: string, total: string) => `Look at ${city}: a realistic month starts around ${total}.`,
    prep: "A preparatory year, then a Czech-taught degree, which is tuition-free at public universities",
    scholarships: "Scholarships",
    work: "Part-time work: see the calculator below",
    call: "Want to go through your numbers together? A 30-minute call.",
    covered: (city: string) => `Your budget covers a realistic month in ${city}.`,
    save: "Save my budget to My Journey",
    saved: "Saved. Open My Journey",
  },
  ar: {
    label: "ميزانيتك في الشهر (بالكرونة)",
    hint: "اختياري، ومتخزن في المتصفح بتاعك بس.",
    gap: (gap: string, city: string) => `ميزانيتك ناقصة حوالي ${gap} في الشهر عن أقل تكلفة واقعية في ${city}. ودي طرق تسد الفرق:`,
    cheaper: (city: string, total: string) => `بص على ${city}: الشهر الواقعي بيبدأ من حوالي ${total}.`,
    prep: "سنة تحضيرية وبعدها دراسة بالتشيكي، ودي ببلاش في الجامعات الحكومية",
    scholarships: "المنح",
    work: "شغل بارت تايم: شوف الحاسبة تحت",
    call: "عايز نراجع أرقامك مع بعض؟ مكالمة 30 دقيقة.",
    covered: (city: string) => `ميزانيتك بتغطي شهر واقعي في ${city}.`,
    save: "احفظ ميزانيتي في رحلتي",
    saved: "اتحفظت. افتح رحلتي",
  },
};

const fmt = (n: number) => `${new Intl.NumberFormat("en-US").format(Math.round(n))} CZK`;

export function BudgetCheck({
  city,
  totalMin,
  locale,
  onCity,
}: {
  city: CityKey;
  totalMin: number;
  locale: "en" | "ar";
  onCity: (c: CityKey) => void;
}) {
  const c = COPY[locale];
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);
  const completed = useRef(false);
  const budget = Number(value.replace(/[^\d]/g, "")) || 0;
  const cityName = cities.find((x) => x.key === city)?.label[locale] ?? city;
  const gap = totalMin - budget;
  const cheapest = cities
    .map((x) => ({ ...x, min: totalRange(x.key)[0] }))
    .filter((x) => x.key !== city && x.min < totalMin)
    .sort((a, b) => a.min - b.min)[0];

  return (
    <GlassCard data-source="cost-of-living">
      <label htmlFor="monthly-budget" className="block text-sm font-semibold text-text-primary mb-1">
        {c.label}
      </label>
      <input
        id="monthly-budget"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        onBlur={() => {
          if (budget > 0 && !completed.current) {
            completed.current = true;
            track("tool_completed", { tool: "cost-of-living" });
          }
        }}
        placeholder="15000"
        className="w-full min-h-12 rounded-xl border border-border-subtle bg-bg px-4 text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
        aria-describedby="monthly-budget-hint"
      />
      <p id="monthly-budget-hint" className="text-xs text-text-muted mt-1">
        {c.hint}
      </p>

      {budget > 0 && (
        <div className="mt-4 space-y-3" aria-live="polite">
          {gap > 0 ? (
            <>
              <p className="text-sm font-medium text-text-primary">{c.gap(fmt(gap), cityName)}</p>
              <ul className="space-y-2 text-sm">
                {cheapest && (
                  <li>
                    <button type="button" onClick={() => onCity(cheapest.key)} className="text-start text-brand hover:underline">
                      {c.cheaper(cheapest.label[locale], fmt(cheapest.min))}
                    </button>
                  </li>
                )}
                <li>
                  <Link href="/preparatory-year" className="text-brand hover:underline">{c.prep}</Link>
                </li>
                <li>
                  <Link href="/scholarships" className="text-brand hover:underline">{c.scholarships}</Link>
                </li>
                <li>
                  <a href="#work-calculator" className="text-brand hover:underline">{c.work}</a>
                </li>
              </ul>
              <HelpLink service="consultation" source="cost-of-living:gap" className="inline-block text-sm text-text-secondary hover:text-brand underline underline-offset-2">
                {c.call}
              </HelpLink>
            </>
          ) : (
            <p className="flex items-center gap-2 text-sm font-medium text-success">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              {c.covered(cityName)}
            </p>
          )}
          {saved ? (
            <Link href="/my-journey" className={buttonClasses("secondary", "sm", "w-full")}>
              {c.saved}
            </Link>
          ) : (
            <button
              type="button"
              className={buttonClasses("secondary", "sm", "w-full")}
              onClick={() => {
                saveBudgetToJourney(cityName, budget);
                setSaved(true);
                track("plan_saved", { tool: "cost-of-living" });
              }}
            >
              <Bookmark className="w-4 h-4" aria-hidden="true" />
              {c.save}
            </button>
          )}
        </div>
      )}
    </GlassCard>
  );
}
