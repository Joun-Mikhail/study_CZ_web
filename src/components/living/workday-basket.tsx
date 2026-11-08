"use client";

import { useMemo, useRef, useState } from "react";
import { ExternalLink, RotateCcw, ShoppingBasket, Sparkles, Info, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  GROCERIES,
  BASKET_PRESETS,
  GROCERY_CHECKED_ON,
  stepFor,
  type Basket,
  type BasketPresetId,
  type GroceryCategory,
} from "@/data/living/groceries";
import { JOB_ROLES, JOB_BY_ID, hourlyRange, type JobRoleId } from "@/data/living/jobs";
import { MIN_WAGE_2026 } from "@/data/living/work-rules";
import {
  basketLines,
  compareShiftToBasket,
  cheaperPresetThatFits,
  setQty,
  fmtCzk,
  fmtHours,
  fmtEur,
} from "@/lib/living-calc";
import { trackToolStarted } from "@/components/umami";
import { GroceryArt } from "./grocery-art";
import { RangeField, Stepper } from "./controls";
import { fmtDate, iso } from "./format";

type Locale = "en" | "ar";

const COPY = {
  en: {
    eyebrow: "The one-workday challenge",
    title: "What can 8 hours of work buy you in Czechia?",
    lead: "Pick a student job and a wage, then fill a basket with real products at real Czech supermarket prices. We add it up honestly: if a day's pay doesn't cover the shop, you'll see by how much.",
    shiftTitle: "Your shift",
    job: "Job",
    wage: "Hourly pay (gross)",
    hours: "Hours worked",
    hoursUnit: (h: string) => `${h} h`,
    wageHint: (min: string) => `Legal minimum in 2026: ${min} an hour. Ads quote gross pay; tips aren't included.`,
    earned: "You earn, before tax",
    earnedNote: "Gross pay. On a small DPP job with a signed tax declaration, net pay is usually the same; see the earnings section.",
    receiptTitle: "Your basket",
    receiptEmpty: "Your basket is empty. Add something below.",
    total: "Basket total",
    paid: "Shift pay",
    left: "Left over",
    short: "Short by",
    share: (p: string) => `${p} of the shift's pay`,
    hoursNeeded: (h: string) => `${h} hours of work to pay for it`,
    presets: "Start from",
    presetNames: {
      bigShop: "The big shop",
      cookingWeek: "A week of home cooking",
      budgetWeek: "A budget week",
      comfortWeek: "A comfortable week",
    } satisfies Record<BasketPresetId, string>,
    clear: "Empty basket",
    all: "All",
    categories: { protein: "Meat & eggs", dairy: "Dairy", grains: "Bread & grains", produce: "Fruit & veg", pantry: "Pantry" } satisfies Record<GroceryCategory, string>,
    perUnit: { kg: "/kg", l: "/l", egg: "/egg" },
    add: (n: string) => `Add ${n}`,
    remove: (n: string) => `Remove one ${n}`,
    view: "View product",
    personalOffer: (p: string) => `Rohlík showed some visitors ${p}. We use the regular price.`,
    fitTitle: "A basket that fits this shift",
    fitBody: (name: string, total: string, hours: string) => `“${name}” costs ${total}, about ${hours} hours of work.`,
    fitAction: "Use this basket",
    fitNone: "Even the budget week costs more than this shift pays. Try more hours or a higher wage.",
    sourceNote: (date: string) =>
      `Regular shelf prices from Rohlik.cz, an online supermarket, checked on ${date}. These are snapshots, not live prices. Rohlík has a minimum order and may charge delivery; discount supermarkets such as Lidl, Kaufland, Penny or Albert can be cheaper in store. Pictures are our own illustrations of each item; the link opens the real product.`,
    srSummary: (total: string, share: string) => `Basket total ${total}, ${share} of the shift's pay.`,
    mobileBar: (total: string, pay: string) => `${total} of ${pay}`,
    adRange: (job: string) => `${job}, in the ads we checked:`,
  },
  ar: {
    eyebrow: "تحدّي يوم شغل واحد",
    title: "تقدر تشتري إيه بمرتب يوم شغل في التشيك؟",
    lead: "اختر وظيفة طلابية وأجرًا بالساعة، ثم املأ سلة بمنتجات حقيقية بأسعار سوبر ماركت تشيكي حقيقية. نحسب المجموع بأمانة: إذا لم يكفِ أجر اليوم ثمن المشتريات، سترى الفرق بالضبط.",
    shiftTitle: "ورديتك",
    job: "الوظيفة",
    wage: "الأجر بالساعة (إجمالي)",
    hours: "عدد ساعات العمل",
    hoursUnit: (h: string) => `${h} ساعة`,
    wageHint: (min: string) => `الحد الأدنى القانوني في 2026: ${min} في الساعة. الإعلانات تذكر الأجر الإجمالي، والبقشيش غير محسوب.`,
    earned: "تكسب قبل الضريبة",
    earnedNote: "أجر إجمالي. في عمل صغير بعقد DPP مع توقيع إقرار الضريبة، يكون الصافي غالبًا هو نفسه؛ راجع قسم الدخل.",
    receiptTitle: "سلتك",
    receiptEmpty: "السلة فارغة. أضف منتجات من الأسفل.",
    total: "مجموع السلة",
    paid: "أجر الوردية",
    left: "المتبقي",
    short: "ينقصك",
    share: (p: string) => `${p} من أجر الوردية`,
    hoursNeeded: (h: string) => `${h} ساعة عمل لتغطية ثمنها`,
    presets: "ابدأ من",
    presetNames: {
      bigShop: "المشتريات الكبيرة",
      cookingWeek: "أسبوع طبخ في البيت",
      budgetWeek: "أسبوع اقتصادي",
      comfortWeek: "أسبوع مريح",
    } satisfies Record<BasketPresetId, string>,
    clear: "تفريغ السلة",
    all: "الكل",
    categories: { protein: "لحوم وبيض", dairy: "ألبان", grains: "خبز وحبوب", produce: "خضار وفاكهة", pantry: "مواد أساسية" } satisfies Record<GroceryCategory, string>,
    perUnit: { kg: "/كجم", l: "/لتر", egg: "/بيضة" },
    add: (n: string) => `أضف ${n}`,
    remove: (n: string) => `احذف وحدة من ${n}`,
    view: "صفحة المنتج",
    personalOffer: (p: string) => `ظهر لبعض الزوار سعر ${p}. نحن نستخدم السعر العادي.`,
    fitTitle: "سلة تناسب هذه الوردية",
    fitBody: (name: string, total: string, hours: string) => `«${name}» تكلف ${total}، أي حوالي ${hours} ساعة عمل.`,
    fitAction: "استخدم هذه السلة",
    fitNone: "حتى الأسبوع الاقتصادي يكلف أكثر من أجر هذه الوردية. جرّب ساعات أكثر أو أجرًا أعلى.",
    sourceNote: (date: string) =>
      `أسعار الرف العادية من Rohlik.cz، وهو سوبر ماركت إلكتروني، تمت مراجعتها في ${date}. هذه لقطة للأسعار وليست أسعارًا مباشرة. لدى Rohlík حد أدنى للطلب وقد يفرض رسوم توصيل، وقد تكون محلات الخصم مثل Lidl وKaufland وPenny وAlbert أرخص في المتجر. الصور رسوم توضيحية من عندنا لكل منتج، والرابط يفتح المنتج الحقيقي.`,
    srSummary: (total: string, share: string) => `مجموع السلة ${total}، أي ${share} من أجر الوردية.`,
    mobileBar: (total: string, pay: string) => `${total} من ${pay}`,
    adRange: (job: string) => `${job} في الإعلانات التي راجعناها:`,
  },
};

const PRESET_ORDER: BasketPresetId[] = ["bigShop", "cookingWeek", "budgetWeek", "comfortWeek"];
const CATEGORIES: GroceryCategory[] = ["protein", "dairy", "grains", "produce", "pantry"];
const TILE: Record<GroceryCategory, string> = {
  protein: "bg-coral-soft",
  dairy: "bg-sky-soft",
  grains: "bg-gold-soft",
  produce: "bg-teal-soft",
  pantry: "bg-violet-soft",
};

const pct = (x: number) => `${Math.round(x * 100)}%`;

export function WorkdayBasket({
  locale,
  roleId,
  wage,
  onRole,
  onWage,
}: {
  locale: Locale;
  roleId: JobRoleId;
  wage: number;
  onRole: (id: JobRoleId) => void;
  onWage: (n: number) => void;
}) {
  const t = COPY[locale];
  const [hours, setHours] = useState(8);
  const [basket, setBasket] = useState<Basket>(BASKET_PRESETS.bigShop);
  const [preset, setPreset] = useState<BasketPresetId | null>("bigShop");
  const [category, setCategory] = useState<GroceryCategory | "all">("all");
  const started = useRef(false);

  const touch = () => {
    if (!started.current) {
      started.current = true;
      trackToolStarted("cost-of-living");
    }
  };

  const r = compareShiftToBasket(wage, hours, basket);
  const lines = basketLines(basket);
  const fit = useMemo(
    () => (r.remainingCzk < 0 ? cheaperPresetThatFits(r.earnedCzk, preset ?? undefined) : null),
    [r.remainingCzk, r.earnedCzk, preset],
  );
  const shown = category === "all" ? GROCERIES : GROCERIES.filter((g) => g.category === category);
  const over = r.remainingCzk < 0;
  const fill = Math.min(1, Number.isFinite(r.shareOfPay) ? r.shareOfPay : 1);
  const role = JOB_BY_ID[roleId];
  const adRange = hourlyRange(role);

  const applyPreset = (id: BasketPresetId) => {
    touch();
    setBasket(BASKET_PRESETS[id]);
    setPreset(id);
  };
  const change = (id: string, qty: number) => {
    touch();
    setBasket((b) => setQty(b, id, qty));
    setPreset(null);
  };

  const qtyLabel = (id: string, q: number) => {
    const item = GROCERIES.find((g) => g.id === id)!;
    if (item.byWeight) {
      const kg = item.id === "tomatoes" ? q * 0.5 : q;
      return `${kg} ${locale === "ar" ? "كجم" : "kg"}`;
    }
    return `${q}×`;
  };

  return (
    <section id="workday" aria-labelledby="workday-title" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-[28px] border border-border-subtle bg-gradient-to-br from-gold-soft via-surface to-coral-soft p-4 sm:p-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-coral-ink">
            <ShoppingBasket className="h-4 w-4" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h2 id="workday-title" className="mt-3 text-2xl sm:text-4xl font-bold text-text-primary leading-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">{t.lead}</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          {/* Shift + receipt */}
          <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-sm">
              <h3 className="font-sans text-base font-semibold text-text-primary">{t.shiftTitle}</h3>
              <div className="mt-3 space-y-3">
                <div>
                  <label htmlFor="workday-job" className="text-sm font-medium text-text-secondary">
                    {t.job}
                  </label>
                  <select
                    id="workday-job"
                    value={roleId}
                    onChange={(e) => {
                      touch();
                      onRole(e.target.value as JobRoleId);
                    }}
                    className="mt-1 w-full min-h-11 rounded-xl border border-border-subtle bg-bg px-3 text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    {JOB_ROLES.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.name[locale]}
                      </option>
                    ))}
                  </select>
                </div>
                <RangeField
                  label={t.wage}
                  value={wage}
                  min={135}
                  max={300}
                  step={5}
                  onChange={(v) => {
                    touch();
                    onWage(v);
                  }}
                  display={`${wage} CZK/h`}
                  hint={t.wageHint(iso(`${MIN_WAGE_2026.hourlyCzk} CZK`))}
                />
                <RangeField
                  label={t.hours}
                  value={hours}
                  min={1}
                  max={12}
                  step={0.5}
                  onChange={(v) => {
                    touch();
                    setHours(v);
                  }}
                  display={t.hoursUnit(fmtHours(hours))}
                  color="var(--color-coral)"
                />
              </div>
              <div className="mt-4 rounded-xl bg-bg-subtle p-4">
                <p className="text-xs font-medium text-text-muted">{t.earned}</p>
                <p className="text-3xl font-bold text-text-primary tabular-nums" dir="ltr">
                  {fmtCzk(r.earnedCzk)}
                </p>
                <p className="text-xs text-text-muted" dir="ltr">
                  ≈ {fmtEur(r.earnedCzk)}
                </p>
                <p className="mt-2 text-xs text-text-muted leading-relaxed">{t.earnedNote}</p>
              </div>
              {adRange && (
                <p className="mt-2 text-xs text-text-muted">
                  {t.adRange(role.name[locale])}{" "}
                  <span className="font-semibold text-text-secondary tabular-nums" dir="ltr">
                    {adRange[0]}–{adRange[1]} CZK/h
                  </span>
                </p>
              )}
            </div>

            {/* The till receipt */}
            <div className="receipt rounded-sm px-5 py-7 shadow-[0_18px_40px_-24px_rgba(11,31,58,0.55)]" aria-labelledby="receipt-title">
              <div className="flex items-center justify-between">
                <h3 id="receipt-title" className="font-mono text-sm font-bold uppercase tracking-widest">
                  {t.receiptTitle}
                </h3>
                <span className="font-mono text-xs opacity-70">
                  {fmtDate(GROCERY_CHECKED_ON, locale)}
                </span>
              </div>
              <div className="receipt-rule my-3" />
              {lines.length === 0 ? (
                <p className="font-mono text-sm opacity-80">{t.receiptEmpty}</p>
              ) : (
                <ul tabIndex={0} aria-label={t.receiptTitle} className="max-h-56 space-y-1 overflow-y-auto pe-1 font-mono text-[13px] focus-visible:outline-2 focus-visible:outline-brand">
                  {lines.map((l) => (
                    <li key={l.item.id} className="flex items-baseline justify-between gap-2">
                      <span className="min-w-0 truncate">
                        <bdi>{qtyLabel(l.item.id, l.qty)}</bdi> {l.item.name[locale]}
                      </span>
                      <span className="shrink-0 tabular-nums" dir="ltr">
                        {l.totalCzk.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="receipt-rule my-3" />
              <dl className="space-y-1 font-mono text-sm">
                <div className="flex justify-between font-bold text-base">
                  <dt>{t.total}</dt>
                  <dd className="tabular-nums" dir="ltr">{fmtCzk(r.basketCzk)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{t.paid}</dt>
                  <dd className="tabular-nums" dir="ltr">{fmtCzk(r.earnedCzk)}</dd>
                </div>
                <div className={cn("flex justify-between font-bold", over ? "text-rose-ink" : "text-teal-ink")}>
                  <dt>{over ? t.short : t.left}</dt>
                  <dd className="tabular-nums" dir="ltr">{fmtCzk(Math.abs(r.remainingCzk))}</dd>
                </div>
              </dl>
              <div className="mt-4" aria-hidden="true">
                <div className="h-3 overflow-hidden rounded-full bg-[var(--receipt-rule)]">
                  <div
                    className={cn("grow-x h-full rounded-full", over ? "bg-rose-ink" : "bg-teal-ink")}
                    style={{ transform: `scaleX(${fill})` }}
                  />
                </div>
              </div>
              <p className="mt-2 font-mono text-xs">
                {t.share(Number.isFinite(r.shareOfPay) ? pct(r.shareOfPay) : "–")} · {t.hoursNeeded(fmtHours(r.hoursNeeded))}
              </p>
              <p className="sr-only" aria-live="polite">
                {t.srSummary(iso(fmtCzk(r.basketCzk)), Number.isFinite(r.shareOfPay) ? pct(r.shareOfPay) : "–")}
              </p>
            </div>

            {over && (
              <div className="rounded-2xl border border-teal/40 bg-teal-soft p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-teal-ink">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {t.fitTitle}
                </p>
                {fit ? (
                  <>
                    <p className="mt-1 text-sm text-text-primary">
                      {t.fitBody(t.presetNames[fit.id], iso(fmtCzk(fit.totalCzk)), fmtHours(fit.totalCzk / wage))}
                    </p>
                    <button
                      type="button"
                      onClick={() => applyPreset(fit.id)}
                      className="mt-2 inline-flex min-h-10 items-center rounded-lg bg-teal-ink px-4 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:text-bg"
                    >
                      {t.fitAction}
                    </button>
                  </>
                ) : (
                  <p className="mt-1 text-sm text-text-primary">{t.fitNone}</p>
                )}
              </div>
            )}
          </div>

          {/* Products */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-text-secondary">{t.presets}</span>
              {PRESET_ORDER.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={preset === id}
                  onClick={() => applyPreset(id)}
                  className={cn(
                    "min-h-10 rounded-full border px-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    preset === id ? "border-brand bg-brand text-bg" : "border-border-subtle bg-surface text-text-secondary hover:border-brand hover:text-text-primary",
                  )}
                >
                  {t.presetNames[id]}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  touch();
                  setBasket({});
                  setPreset(null);
                }}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-text-secondary hover:text-text-primary focus-visible:outline-2 focus-visible:outline-brand"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {t.clear}
              </button>
            </div>

            <div role="group" aria-label={locale === "ar" ? "تصفية حسب النوع" : "Filter by type"} className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
              {(["all", ...CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "shrink-0 min-h-9 rounded-lg px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-brand",
                    category === c ? "bg-text-primary text-bg" : "bg-surface/70 text-text-secondary hover:text-text-primary",
                  )}
                >
                  {c === "all" ? t.all : t.categories[c]}
                </button>
              ))}
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-3">
              {shown.map((g) => {
                const q = basket[g.id] ?? 0;
                const step = stepFor(g);
                return (
                  <li
                    key={g.id}
                    className={cn(
                      "flex flex-col rounded-2xl border bg-surface p-3 transition-[border-color,box-shadow]",
                      q > 0 ? "border-brand/60 shadow-[0_8px_20px_-14px_rgba(17,69,126,0.6)]" : "border-border-subtle",
                    )}
                  >
                    <div className="flex gap-3">
                      <div className={cn("relative grid h-20 w-20 shrink-0 place-items-center rounded-xl", TILE[g.category])}>
                        <GroceryArt id={g.id} className={cn("h-16 w-16", q > 0 && "pop")} key={q > 0 ? "in" : "out"} />
                        {q > 0 && (
                          <span className="absolute -top-1.5 -end-1.5 grid min-h-6 min-w-6 place-items-center rounded-full bg-brand px-1 text-xs font-bold text-bg tabular-nums">
                            {qtyLabel(g.id, q)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-sans text-sm font-semibold leading-snug text-text-primary">{g.name[locale]}</h3>
                        <p className="mt-0.5 text-xs text-text-muted">{g.pack[locale]}</p>
                        <p className="mt-1 text-base font-bold text-text-primary tabular-nums" dir="ltr">
                          {fmtCzk(g.priceCzk, { decimals: true })}
                        </p>
                        <p className="text-xs text-text-muted tabular-nums" dir="ltr">
                          {g.unitPrice.czk.toFixed(2)} CZK{t.perUnit[g.unitPrice.per]}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] leading-snug text-text-muted" lang="cs">
                      {g.product}
                    </p>
                    {g.offerSeen && (
                      <p className="mt-1 flex items-start gap-1 text-[11px] leading-snug text-gold-ink">
                        <Tag className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                        {t.personalOffer(iso(`${g.offerSeen.priceCzk.toFixed(2)} CZK (${g.offerSeen.label})`))}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <a
                        href={g.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
                      >
                        {g.retailer}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        <span className="sr-only">
                          {" "}
                          {t.view}: {g.name[locale]}
                        </span>
                      </a>
                      <Stepper
                        value={q}
                        onDec={() => change(g.id, q - step)}
                        onInc={() => change(g.id, q + step)}
                        labelDec={t.remove(g.name[locale])}
                        labelInc={t.add(g.name[locale])}
                        display={q > 0 ? qtyLabel(g.id, q) : "0"}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 flex gap-2 text-xs leading-relaxed text-text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {t.sourceNote(fmtDate(GROCERY_CHECKED_ON, locale))}
            </p>
          </div>
        </div>

        {/* Phones: keep the running total in view while scrolling the products. */}
        <div className="sticky bottom-3 z-20 mt-4 lg:hidden" aria-hidden="true">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-ink px-4 py-3 text-white shadow-lg">
            <span className="text-sm font-semibold tabular-nums">
              {t.mobileBar(iso(fmtCzk(r.basketCzk)), iso(fmtCzk(r.earnedCzk)))}
            </span>
            <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold tabular-nums text-ink", over ? "bg-[#fda4af]" : "bg-[#5eead4]")} dir="ltr">
              {Number.isFinite(r.shareOfPay) ? pct(r.shareOfPay) : "–"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
