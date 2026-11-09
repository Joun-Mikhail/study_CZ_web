"use client";

import { Wallet, BedDouble, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CityKey } from "@/data/costs";
import { cities } from "@/data/costs";
import { SiteImage } from "@/components/site-image";
import type { ImageId } from "@/data/images";
import { basketTotal, fmtCzk, fmtEur, groupTotals, isDorm, roundEstimate, studentMonth, LIFESTYLE_PRESETS, type Housing, type Lifestyle, type LineGroup, type MonthLine, type MonthSettings } from "@/lib/living-calc";
import { BASKET_PRESETS, type BasketPresetId } from "@/data/living/groceries";
import { CANTEEN_MEAL, STUDENT_TRANSPORT } from "@/data/living/city-costs";
import { DEPOSIT_RULE } from "@/data/living/work-rules";
import { RangeField, Segmented, BasisTag } from "./controls";
import { iso } from "./format";

type Locale = "en" | "ar";

export const CITY_PHOTO: Record<CityKey, ImageId> = { prague: "city-prague", brno: "city-brno", ostrava: "city-ostrava" };

export const GROUP_COLOR: Record<LineGroup, string> = {
  housing: "var(--viz-1)",
  food: "var(--viz-2)",
  transport: "var(--viz-3)",
  bills: "var(--viz-4)",
  personal: "var(--viz-6)",
};

export const GROUP_LABEL: Record<Locale, Record<LineGroup, string>> = {
  en: { housing: "Housing", food: "Food", transport: "Getting around", bills: "Bills & insurance", personal: "Personal & buffer" },
  ar: { housing: "السكن", food: "الأكل", transport: "المواصلات", bills: "الفواتير والتأمين", personal: "مصاريف شخصية واحتياطي" },
};

const LINE_LABEL: Record<Locale, Record<MonthLine["id"], string>> = {
  en: {
    housing: "Rent", utilities: "Utilities (energy, water)", groceries: "Groceries, cooking at home", canteen: "University canteen lunches",
    transport: "Student transport pass", phone: "Mobile plan", insurance: "Health insurance",
    personal: "Clothes, toiletries, coffee, sport, going out", travel: "Trips and travel", buffer: "Emergency buffer",
  },
  ar: {
    housing: "الإيجار", utilities: "المرافق (كهرباء وتدفئة ومياه)", groceries: "البقالة والطبخ في البيت", canteen: "الغداء في مطعم الجامعة",
    transport: "اشتراك المواصلات للطلاب", phone: "باقة الموبايل", insurance: "التأمين الصحي",
    personal: "ملابس ومستلزمات شخصية وقهوة ورياضة وخروجات", travel: "رحلات وسفر", buffer: "احتياطي للطوارئ",
  },
};

const BASIS_LABEL: Record<Locale, Record<MonthLine["basis"], string>> = {
  en: { official: "Official price", retailer: "Supermarket prices", statistics: "Official statistics", estimate: "Estimate", yours: "Your choice" },
  ar: { official: "سعر رسمي", retailer: "أسعار سوبر ماركت", statistics: "إحصاء رسمي", estimate: "تقدير", yours: "اختيارك" },
};

const COPY = {
  en: {
    eyebrow: "Your student month",
    title: "Build a realistic month, line by line",
    lead: "Choose a city and a way of living, then change anything: where you live, canteen lunches, your own spending. Every line says where its number comes from.",
    city: "City",
    lifestyle: "Lifestyle",
    lifestyles: { budget: "Budget", balanced: "Balanced", comfortable: "Comfortable" } satisfies Record<Lifestyle, string>,
    lifestyleHint: {
      budget: "Shared dorm room, cooking almost every day.",
      balanced: "Own dorm room, two canteen lunches a week.",
      comfortable: "Own furnished flat, four canteen lunches a week, trips.",
    } satisfies Record<Lifestyle, string>,
    housing: "Where you live",
    housings: { dormDouble: "Dorm, shared room", dormSingle: "Dorm, own room", flatOutside: "Own flat, outside centre", flatCentre: "Own flat, city centre" } satisfies Record<Housing, string>,
    groceries: "Weekly groceries",
    groceryNames: { budgetWeek: "Budget week", cookingWeek: "Home cooking", comfortWeek: "Comfortable", bigShop: "The big shop" } satisfies Record<BasketPresetId, string>,
    canteen: "University canteen lunches a week",
    personal: "Clothes, toiletries, coffee, sport, going out (your estimate)",
    travel: "Trips and travel a month (your estimate)",
    buffer: "Emergency buffer",
    total: "Estimated month",
    perYear: (y: string) => `About ${y} a year`,
    breakdown: "Where the money goes",
    linesTitle: "Every line",
    dormNote: "Dorm price: the cheapest bed of that type on the university lists, × 30 nights. Ask the dorm what is included; VŠB-TUO in Ostrava says its price includes internet.",
    flatNote: (months: number) => `Renting privately: expect a deposit, which by law can't exceed ${months} months' rent. Rent is the Ministry of Finance rent map's figure for a furnished one-room flat (1+kk or 1+1), not an offer; utilities are the Czech Statistical Office's average per person in a rented flat.`,
    insuranceNote: "Health insurance: a range other students report (1,100–1,600 Kč a month); the real price depends on your age, insurer and cover. Get a quote before you budget.",
    canteenNote: (price: string, note: string) => `Canteen lunch: ${price}, the student price. ${note}`,
    profiles: "Three sample months",
    profilesNote: "Illustrative scenarios built from the figures above, not real students.",
  },
  ar: {
    eyebrow: "شهرك كطالب",
    title: "ابنِ شهرًا واقعيًا، بندًا بندًا",
    lead: "اختر مدينة وأسلوب حياة، ثم غيّر ما تريد: مكان السكن، ووجبات مطعم الجامعة، ومصاريفك الشخصية. كل بند يوضح مصدر رقمه.",
    city: "المدينة",
    lifestyle: "أسلوب الحياة",
    lifestyles: { budget: "اقتصادي", balanced: "متوازن", comfortable: "مريح" } satisfies Record<Lifestyle, string>,
    lifestyleHint: {
      budget: "غرفة مشتركة في السكن الجامعي، وطبخ في البيت كل يوم تقريبًا.",
      balanced: "غرفة خاصة في السكن الجامعي، ووجبتا غداء أسبوعيًا في مطعم الجامعة.",
      comfortable: "شقة خاصة مفروشة، وأربع وجبات غداء أسبوعيًا في مطعم الجامعة، ورحلات.",
    } satisfies Record<Lifestyle, string>,
    housing: "مكان السكن",
    housings: { dormDouble: "سكن جامعي، غرفة مشتركة", dormSingle: "سكن جامعي، غرفة خاصة", flatOutside: "شقة خاصة خارج المركز", flatCentre: "شقة خاصة في المركز" } satisfies Record<Housing, string>,
    groceries: "البقالة الأسبوعية",
    groceryNames: { budgetWeek: "أسبوع اقتصادي", cookingWeek: "طبخ في البيت", comfortWeek: "مريح", bigShop: "المشتريات الكبيرة" } satisfies Record<BasketPresetId, string>,
    canteen: "وجبات الغداء في مطعم الجامعة أسبوعيًا",
    personal: "ملابس ومستلزمات شخصية وقهوة ورياضة وخروجات (تقديرك)",
    travel: "رحلات وسفر شهريًا (تقديرك)",
    buffer: "احتياطي للطوارئ",
    total: "تقدير الشهر",
    perYear: (y: string) => `حوالي ${y} في السنة`,
    breakdown: "أين تذهب الأموال",
    linesTitle: "كل البنود",
    dormNote: "سعر السكن الجامعي: أرخص سرير من هذا النوع في قوائم الجامعات × 30 ليلة. اسأل إدارة السكن عما يشمله السعر؛ جامعة VŠB-TUO في أوسترافا تذكر أن سعرها يشمل الإنترنت.",
    flatNote: (months: number) => `عند الإيجار الخاص: توقّع تأمينًا لا يجوز قانونًا أن يتجاوز إيجار ${months} أشهر. الإيجار هنا رقم خريطة الإيجارات الصادرة عن وزارة المالية لشقة مفروشة بغرفة واحدة (\u20681+kk\u2069 أو \u20681+1\u2069)، وليس عرضًا فعليًا؛ والمرافق متوسط مكتب الإحصاء التشيكي للفرد في شقة مستأجرة.`,
    insuranceNote: "التأمين الصحي: نطاق يذكره طلاب آخرون (1,100–1,600 كرونة في الشهر)، والسعر الحقيقي يعتمد على عمرك وشركة التأمين ونوع التغطية. اطلب عرض سعر قبل وضع ميزانيتك.",
    canteenNote: (price: string, note: string) => `وجبة الغداء في مطعم الجامعة: ${price}، سعر الطلاب. ${note}`,
    profiles: "ثلاثة أشهر نموذجية",
    profilesNote: "سيناريوهات توضيحية مبنية على الأرقام أعلاه، وليست لطلاب حقيقيين.",
  },
};

export function MonthBar({ lines, locale, tall = true }: { lines: MonthLine[]; locale: Locale; tall?: boolean }) {
  const groups = groupTotals(lines);
  const total = groups.reduce((s, g) => s + g.amountCzk, 0) || 1;
  return (
    <div>
      <div className={cn("flex w-full gap-[2px] overflow-hidden", tall ? "h-7 rounded" : "h-2.5 rounded-full")} aria-hidden="true">
        {groups.map((g) => {
          const share = g.amountCzk / total;
          return (
            <div
              key={g.group}
              className={cn("seg flex items-center justify-center overflow-hidden", tall && "rounded")}
              style={{ flexGrow: share, flexBasis: 0, background: GROUP_COLOR[g.group] }}
              title={`${GROUP_LABEL[locale][g.group]}: ${fmtCzk(g.amountCzk)}`}
            >
              {tall && share > 0.09 && (
                <span className="text-[11px] font-bold tabular-nums" style={{ color: GROUP_COLOR[g.group].replace(")", "-text)") }}>
                  {Math.round(share * 100)}%
                </span>
              )}
            </div>
          );
        })}
      </div>
      {tall && (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary">
          {groups.map((g) => (
            <li key={g.group} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: GROUP_COLOR[g.group] }} aria-hidden="true" />
              {GROUP_LABEL[locale][g.group]}
              <span className="font-semibold text-text-primary tabular-nums" dir="ltr">{fmtCzk(g.amountCzk)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function StudentMonth({
  locale,
  city,
  onCity,
  lifestyle,
  onLifestyle,
  settings,
  onSettings,
  month,
}: {
  locale: Locale;
  city: CityKey;
  onCity: (c: CityKey) => void;
  lifestyle: Lifestyle | null;
  onLifestyle: (l: Lifestyle) => void;
  settings: MonthSettings;
  onSettings: (s: MonthSettings) => void;
  month: { lines: MonthLine[]; totalCzk: number };
}) {
  const t = COPY[locale];
  const set = (patch: Partial<MonthSettings>) => onSettings({ ...settings, ...patch });
  const cityLabel = (c: CityKey) => cities.find((x) => x.key === c)!.label[locale];
  const total = roundEstimate(month.totalCzk);

  return (
    <section id="month" aria-labelledby="month-title" className="scroll-mt-24">
      <p className="inline-flex items-center gap-2 rounded-full bg-violet-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-ink">
        <Wallet className="h-4 w-4" aria-hidden="true" />
        {t.eyebrow}
      </p>
      <h2 id="month-title" className="mt-3 text-2xl sm:text-4xl font-bold text-text-primary leading-tight">{t.title}</h2>
      <p className="mt-3 max-w-3xl text-text-secondary leading-relaxed">{t.lead}</p>

      {/* City: photo cards that act as radio buttons */}
      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-medium text-text-secondary">{t.city}</legend>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {cities.map((c) => (
            <label key={c.key} className="group relative block cursor-pointer overflow-hidden rounded-2xl">
              <input type="radio" name="month-city" value={c.key} checked={city === c.key} onChange={() => onCity(c.key)} className="peer sr-only" />
              <span className="relative block h-20 sm:h-28">
                <SiteImage id={CITY_PHOTO[c.key]} sizes="(max-width: 640px) 33vw, 320px" decorative whenNear />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-2 sm:p-3 text-sm sm:text-base font-semibold text-white">{c.label[locale]}</span>
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-inset peer-checked:ring-4 peer-checked:ring-gold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand" />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4">
        <Segmented<Lifestyle>
          legend={t.lifestyle}
          value={lifestyle ?? ("" as Lifestyle)}
          onChange={onLifestyle}
          options={(["budget", "balanced", "comfortable"] as const).map((l) => ({ value: l, label: t.lifestyles[l] }))}
        />
        {lifestyle && <p className="mt-2 text-sm text-text-muted">{t.lifestyleHint[lifestyle]}</p>}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Controls */}
        <div className="space-y-5 rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6">
          <div>
            <label htmlFor="month-housing" className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <BedDouble className="h-4 w-4" aria-hidden="true" />
              {t.housing}
            </label>
            <select
              id="month-housing"
              value={settings.housing}
              onChange={(e) => set({ housing: e.target.value as Housing })}
              className="mt-1 w-full min-h-11 rounded-xl border border-border-subtle bg-bg px-3 text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
            >
              {(Object.keys(t.housings) as Housing[]).map((h) => (
                <option key={h} value={h}>{t.housings[h]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="month-groceries" className="text-sm font-medium text-text-secondary">{t.groceries}</label>
            <select
              id="month-groceries"
              value={settings.groceries}
              onChange={(e) => set({ groceries: e.target.value as BasketPresetId })}
              className="mt-1 w-full min-h-11 rounded-xl border border-border-subtle bg-bg px-3 text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
            >
              {(["budgetWeek", "cookingWeek", "comfortWeek"] as const).map((g) => (
                <option key={g} value={g}>
                  {t.groceryNames[g]} · {fmtCzk(basketTotal(BASKET_PRESETS[g]))}
                </option>
              ))}
            </select>
          </div>
          <RangeField label={t.canteen} value={settings.canteenMealsPerWeek} min={0} max={10} onChange={(v) => set({ canteenMealsPerWeek: v })} display={String(settings.canteenMealsPerWeek)} color="var(--viz-2)" />
          <RangeField label={t.personal} value={settings.personalCzk} min={0} max={5000} step={100} onChange={(v) => set({ personalCzk: v })} display={fmtCzk(settings.personalCzk)} color="var(--viz-6)" />
          <RangeField label={t.travel} value={settings.travelCzk} min={0} max={5000} step={100} onChange={(v) => set({ travelCzk: v })} display={fmtCzk(settings.travelCzk)} color="var(--viz-3)" />
          <Segmented
            legend={t.buffer}
            size="sm"
            value={String(settings.bufferShare)}
            onChange={(v) => set({ bufferShare: Number(v) })}
            options={["0", "0.05", "0.1", "0.15"].map((v) => ({ value: v, label: `${Math.round(Number(v) * 100)}%` }))}
          />
        </div>

        {/* Result */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-ink p-5 sm:p-6 text-white surface-ink" aria-live="polite">
            <p className="text-sm font-medium text-white/80">{t.total} · {cityLabel(city)}</p>
            <p className="mt-1 text-4xl sm:text-5xl font-bold tabular-nums" dir="ltr">≈ {fmtCzk(total)}</p>
            <p className="mt-1 text-sm text-white/75">
              <bdi>≈ {fmtEur(total)}</bdi> · {t.perYear(iso(fmtCzk(roundEstimate(total * 12))))}
            </p>
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">{t.breakdown}</p>
              <MonthBar lines={month.lines} locale={locale} />
            </div>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface p-5">
            <h3 className="font-sans text-base font-semibold text-text-primary">{t.linesTitle}</h3>
            <table className="mt-3 w-full text-sm">
              <caption className="sr-only">{t.linesTitle}</caption>
              <tbody>
                {month.lines.map((l) => (
                  <tr key={l.id} className="border-t border-border-subtle first:border-t-0">
                    <th scope="row" className="py-2 pe-3 text-start font-medium text-text-primary">
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: GROUP_COLOR[l.group] }} aria-hidden="true" />
                        {LINE_LABEL[locale][l.id]}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-1.5 ps-4.5">
                        <BasisTag kind={l.basis}>{BASIS_LABEL[locale][l.basis]}</BasisTag>
                      </span>
                    </th>
                    <td className="py-2 text-end align-top font-semibold text-text-primary tabular-nums whitespace-nowrap" dir="ltr">{fmtCzk(l.amountCzk)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-2 text-xs text-text-muted leading-relaxed">
            <li className="flex gap-2"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{isDorm(settings.housing) ? t.dormNote : t.flatNote(DEPOSIT_RULE.maxMonthsRent)}</li>
            <li className="flex gap-2"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{t.insuranceNote}</li>
            <li className="flex gap-2"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{t.canteenNote(iso(fmtCzk(CANTEEN_MEAL[city].mealCzk)), CANTEEN_MEAL[city].note[locale])}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Three sample months (illustrative), each built from the same figures as the simulator. */
export function SampleMonths({ locale, city, onPick }: { locale: Locale; city: CityKey; onPick: (l: Lifestyle) => void }) {
  const t = COPY[locale];
  const cityName = cities.find((x) => x.key === city)!.label[locale];
  const meal = CANTEEN_MEAL[city].mealCzk;
  const story: Record<Locale, Record<Lifestyle, (n: { rent: string; food: string; meal: string; pass: string }) => string[]>> = {
    en: {
      budget: (n) => [`Shares a dorm room: ${n.rent} a month.`, `Cooks the budget week at home: ${n.food} a week in groceries.`, `One canteen lunch a week, ${n.meal} each.`, `Student pass ${n.pass}; walks when the weather is good.`],
      balanced: (n) => [`Own room in a dorm: ${n.rent}.`, `Home-cooking groceries: ${n.food} a week.`, `Two canteen lunches a week; coffee, sport and films come out of personal spending.`, `Saves 10 % for surprises.`],
      comfortable: (n) => [`Rents a furnished one-room flat: about ${n.rent} plus utilities.`, `Bigger weekly shop: ${n.food}.`, `Four canteen lunches a week, ${n.meal} each.`, `A trip most months.`],
    },
    ar: {
      budget: (n) => [`غرفة مشتركة في السكن الجامعي: ${n.rent} في الشهر.`, `يطبخ "الأسبوع الاقتصادي" في البيت: ${n.food} في الأسبوع للبقالة.`, `وجبة غداء واحدة أسبوعيًا في مطعم الجامعة، ${n.meal} للوجبة.`, `اشتراك طلاب ${n.pass}، ويمشي عندما يسمح الطقس.`],
      balanced: (n) => [`غرفة خاصة في السكن الجامعي: ${n.rent}.`, `بقالة للطبخ في البيت: ${n.food} في الأسبوع.`, `وجبتا غداء أسبوعيًا في مطعم الجامعة؛ والقهوة والرياضة والأفلام من المصاريف الشخصية.`, `يدّخر 10 % للطوارئ.`],
      comfortable: (n) => [`يستأجر شقة مفروشة بغرفة واحدة: حوالي ${n.rent} إضافة إلى المرافق.`, `مشتريات أسبوعية أكبر: ${n.food}.`, `أربع وجبات غداء أسبوعيًا في مطعم الجامعة، ${n.meal} للوجبة.`, `رحلة في أغلب الشهور.`],
    },
  };
  return (
    <section aria-labelledby="profiles-title">
      <h3 id="profiles-title" className="font-sans text-lg font-semibold text-text-primary">{t.profiles} · {cityName}</h3>
      <p className="text-xs text-text-muted">{t.profilesNote}</p>
      <ul className="mt-3 grid gap-3 md:grid-cols-3">
        {(["budget", "balanced", "comfortable"] as const).map((l, i) => {
          const s = LIFESTYLE_PRESETS[l];
          const lines = studentMonth(city, s).lines;
          const rent = lines.find((x) => x.id === "housing")!.amountCzk;
          const n = {
            rent: iso(fmtCzk(rent)),
            food: iso(fmtCzk(basketTotal(BASKET_PRESETS[s.groceries]))),
            meal: iso(fmtCzk(meal)),
            pass: iso(fmtCzk(STUDENT_TRANSPORT[city].monthlyCzk)),
          };
          const total = roundEstimate(lines.reduce((a, b) => a + b.amountCzk, 0));
          return (
            <li key={l} className="flex flex-col rounded-2xl border border-border-subtle bg-surface p-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: `var(--viz-${[1, 3, 5][i]})` }} aria-hidden="true" />
                {t.lifestyles[l]}
              </p>
              <p className="mt-1 text-2xl font-bold text-text-primary tabular-nums" dir="ltr">≈ {fmtCzk(total)}</p>
              <div className="mt-2"><MonthBar lines={lines} locale={locale} tall={false} /></div>
              <ul className="mt-3 space-y-1.5 text-sm text-text-secondary">
                {story[locale][l](n).map((x) => <li key={x}>{x}</li>)}
              </ul>
              <button type="button" onClick={() => onPick(l)} className="mt-auto pt-3 text-start text-sm font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand rounded">
                {locale === "ar" ? "افتح هذا الشهر في الحاسبة" : "Open this month in the simulator"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
