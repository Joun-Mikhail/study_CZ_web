"use client";

import { ExternalLink, Briefcase, AlertTriangle, CheckCircle2, Languages, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CityKey } from "@/data/costs";
import { cities } from "@/data/costs";
import { JOB_ROLES, JOB_BY_ID, UNPRICED_ROLES, JOBS_CHECKED_ON, hourlyRange, type JobRoleId } from "@/data/living/jobs";
import { DPP, DPC, INCOME_TAX, MIN_WAGE_2026 } from "@/data/living/work-rules";
import {
  shiftGross,
  monthlyGross,
  monthlyHours,
  estimateNet,
  checkSchedule,
  coverage,
  fmtCzk,
  fmtEur,
  fmtHours,
  roundEstimate,
  type ContractType,
} from "@/lib/living-calc";
import { RangeField, Segmented, BasisTag } from "./controls";
import { fmtDate, iso } from "./format";

type Locale = "en" | "ar";

const COPY = {
  en: {
    eyebrow: "Work while you study",
    title: "How much can you earn while studying?",
    lead: "Real hourly pay from Czech job ads we checked, by city. Use it to plan a schedule, then see how far it goes against your month.",
    marketTitle: (city: string) => `Advertised pay in ${city}`,
    marketNote: (date: string) => `Gross pay per hour, from job ads live on ${date}. Ads change every week; open the links to see today's offers.`,
    perHour: "CZK/h gross",
    oneAd: "Based on a single ad: not a market average.",
    ads: (n: number) => `${n} ${n === 1 ? "ad" : "ads"} on the job board that day, average`,
    noCity: (city: string) => `No ${city} ad with hourly pay that day. Figures from other cities:`,
    seeAds: (n: number) => `See ${n} ${n === 1 ? "ad" : "ads"}`,
    monthly: "a month",
    noPay: "No hourly pay we could check",
    simTitle: "Plan your schedule",
    city: "City",
    job: "Job",
    wage: "Hourly pay (gross)",
    hoursPerShift: "Hours per shift",
    shiftsPerWeek: "Shifts per week",
    weeks: "Weeks you work in a month",
    weeksAll: "Every week",
    perShift: "Per shift",
    perMonth: "Per month",
    hoursMonth: (h: string) => `${h} hours a month`,
    gross: "gross",
    contract: "Contract",
    contracts: { dpp: "DPP", dpc: "DPČ", employment: "Employment" },
    declaration: "I'll sign the tax declaration (prohlášení poplatníka) with this employer",
    netTitle: "Estimated take-home pay",
    netDeclaration: "No tax: your 2,570 Kč monthly tax credit is larger than the 15 % advance, and a DPP under 12,000 Kč a month carries no insurance.",
    netWithholding: "15 % is withheld as tax because there's no signed declaration. You can usually claim it back in a tax return.",
    noNetAbove: `From ${DPP.insuranceThresholdCzk.toLocaleString("en-US")} Kč a month with one employer, social and health insurance apply to the whole DPP pay. The result depends on your insurance situation, so we don't estimate it: ask the employer for a payslip example.`,
    noNetOther: "For a DPČ or an employment contract, tax and insurance depend on details we can't see here. Ask the employer for a gross-to-net example before you sign.",
    coverTitle: "Against your month",
    cover: (p: number, city: string, total: string) => `Your gross pay would cover about ${p}% of the estimated ${total} month in ${city} you set below.`,
    hoursForMonth: (h: string) => `About ${h} hours of this work a month would cover all of it.`,
    checks: "Contract limits for this schedule",
    dppOk: (h: number) => `About ${h} hours a year: within the DPP limit of 300 hours a year per employer.`,
    dppOver: (m: string) => `A DPP allows 300 hours a year per employer: at this pace you'd reach it in about ${m} months.`,
    dpcOk: "Within the DPČ limit of half a full-time week (20 hours) on average.",
    dpcOver: "More than 20 hours a week: above the DPČ limit, so this would need an employment contract.",
    minWage: (min: string) => `Below the 2026 minimum wage of ${min} an hour.`,
    otherRoles: "Other student jobs",
    sources: "Sources",
    labourCode: "Labour Code",
  },
  ar: {
    eyebrow: "العمل أثناء الدراسة",
    title: "كم يمكن أن تكسب أثناء الدراسة؟",
    lead: "أجور حقيقية بالساعة من إعلانات وظائف تشيكية راجعناها، حسب المدينة. استخدمها لتخطيط جدولك، ثم انظر إلى أي حد تغطي مصاريف شهرك.",
    marketTitle: (city: string) => `الأجر المُعلَن في ${city}`,
    marketNote: (date: string) => `الأجر الإجمالي بالساعة من إعلانات كانت منشورة في ${date}. الإعلانات تتغير كل أسبوع، فافتح الروابط لترى عروض اليوم.`,
    perHour: "كرونة/ساعة إجمالي",
    oneAd: "مبني على إعلان واحد فقط، وليس متوسط السوق.",
    ads: (n: number) => `${n} ${n === 1 ? "إعلان" : "إعلانات"} على موقع الوظائف في ذلك اليوم، والمتوسط`,
    noCity: (city: string) => `لم نجد إعلانًا بأجر بالساعة في ${city} في ذلك اليوم. أرقام من مدن أخرى:`,
    seeAds: (n: number) => `اعرض ${n} ${n === 1 ? "إعلان" : "إعلانات"}`,
    monthly: "في الشهر",
    noPay: "لم نجد أجرًا بالساعة يمكن التحقق منه",
    simTitle: "خطّط لجدولك",
    city: "المدينة",
    job: "الوظيفة",
    wage: "الأجر بالساعة (إجمالي)",
    hoursPerShift: "ساعات الوردية",
    shiftsPerWeek: "ورديات في الأسبوع",
    weeks: "أسابيع العمل في الشهر",
    weeksAll: "كل أسبوع",
    perShift: "في الوردية",
    perMonth: "في الشهر",
    hoursMonth: (h: string) => `${h} ساعة في الشهر`,
    gross: "إجمالي",
    contract: "نوع العقد",
    contracts: { dpp: "DPP", dpc: "DPČ", employment: "عقد عمل" },
    declaration: "سأوقّع إقرار الضريبة (prohlášení poplatníka) لدى صاحب العمل هذا",
    netTitle: "الصافي المتوقع",
    netDeclaration: "لا ضريبة: الخصم الضريبي الشهري 2,570 كرونة أكبر من دفعة الضريبة 15 %، وعقد DPP تحت 12,000 كرونة في الشهر لا يخضع للتأمينات.",
    netWithholding: "تُخصم 15 % ضريبةً لأنك لم توقّع الإقرار. ويمكنك عادةً استردادها بتقديم إقرار ضريبي سنوي.",
    noNetAbove: `من ${DPP.insuranceThresholdCzk.toLocaleString("en-US")} كرونة في الشهر لدى صاحب عمل واحد، تُستحق التأمينات الاجتماعية والصحية على كامل أجر DPP. النتيجة تعتمد على وضعك التأميني، لذلك لا نقدّرها: اطلب من صاحب العمل مثالًا لقسيمة الراتب.`,
    noNetOther: "في عقد DPČ أو عقد العمل، تعتمد الضريبة والتأمينات على تفاصيل لا نراها هنا. اطلب من صاحب العمل مثالًا من الإجمالي إلى الصافي قبل التوقيع.",
    coverTitle: "مقارنةً بمصاريف شهرك",
    cover: (p: number, city: string, total: string) => `أجرك الإجمالي سيغطي حوالي ${p}% من شهر تقديري بتكلفة ${total} في ${city}، كما ضبطته في الأسفل.`,
    hoursForMonth: (h: string) => `حوالي ${h} ساعة من هذا العمل في الشهر تكفي لتغطيته كله.`,
    checks: "حدود العقود لهذا الجدول",
    dppOk: (h: number) => `حوالي ${h} ساعة في السنة: ضمن حد DPP البالغ 300 ساعة سنويًا لدى كل صاحب عمل.`,
    dppOver: (m: string) => `عقد DPP يسمح بـ 300 ساعة في السنة لدى صاحب العمل الواحد، وبهذا المعدل ستصل إليها في حوالي ${m} أشهر.`,
    dpcOk: "ضمن حد DPČ: نصف أسبوع العمل الكامل (20 ساعة) في المتوسط.",
    dpcOver: "أكثر من 20 ساعة في الأسبوع: فوق حد DPČ، فيلزم عقد عمل.",
    minWage: (min: string) => `أقل من الحد الأدنى للأجور في 2026 وهو ${min} في الساعة.`,
    otherRoles: "وظائف طلابية أخرى",
    sources: "المصادر",
    labourCode: "قانون العمل",
  },
};

/** One colour per job, on the card's top edge only (no text on it). */
const ROLE_STRIPE: Record<JobRoleId, string> = {
  waiter: "border-border-subtle border-t-coral",
  barista: "border-border-subtle border-t-gold",
  supermarket: "border-border-subtle border-t-teal",
  warehouse: "border-border-subtle border-t-sky",
  fastFood: "border-border-subtle border-t-rose",
  catering: "border-border-subtle border-t-violet",
  reception: "border-border-subtle border-t-[var(--color-brand-light)]",
  cleaning: "border-border-subtle border-t-teal-ink",
};

export type EarningsState = {
  hoursPerShift: number;
  shiftsPerWeek: number;
  weeksPerMonth: number;
  contract: ContractType;
  declaration: boolean;
};

export function EarningsSimulator({
  locale,
  city,
  onCity,
  roleId,
  onRole,
  wage,
  onWage,
  state,
  onState,
  monthCostCzk,
}: {
  locale: Locale;
  city: CityKey;
  onCity: (c: CityKey) => void;
  roleId: JobRoleId;
  onRole: (r: JobRoleId) => void;
  wage: number;
  onWage: (n: number) => void;
  state: EarningsState;
  onState: (s: EarningsState) => void;
  monthCostCzk: number;
}) {
  const t = COPY[locale];
  const cityName = cities.find((c) => c.key === city)!.label[locale];
  const { hoursPerShift, shiftsPerWeek, weeksPerMonth, contract, declaration } = state;
  const set = (patch: Partial<EarningsState>) => onState({ ...state, ...patch });

  const perShift = shiftGross(wage, hoursPerShift);
  const perMonth = monthlyGross(wage, hoursPerShift, shiftsPerWeek, weeksPerMonth);
  const hours = monthlyHours(hoursPerShift, shiftsPerWeek, weeksPerMonth);
  const net = estimateNet(contract, perMonth, declaration);
  const schedule = checkSchedule(hoursPerShift, shiftsPerWeek);
  const covered = coverage(perMonth, monthCostCzk);
  const belowMin = wage < MIN_WAGE_2026.hourlyCzk;

  return (
    <section id="earn" aria-labelledby="earn-title" className="scroll-mt-24 rounded-[28px] border border-teal/25 bg-gradient-to-br from-teal-soft via-surface to-sky-soft p-4 sm:p-8">
      <p className="inline-flex items-center gap-2 rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-ink">
        <Briefcase className="h-4 w-4" aria-hidden="true" />
        {t.eyebrow}
      </p>
      <h2 id="earn-title" className="mt-3 text-2xl sm:text-4xl font-bold text-text-primary leading-tight">
        {t.title}
      </h2>
      <p className="mt-3 max-w-3xl text-text-secondary leading-relaxed">{t.lead}</p>

      {/* Market: what ads pay in the chosen city */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
        <h3 className="font-sans text-lg font-semibold text-text-primary">{t.marketTitle(cityName)}</h3>
        <Segmented
          legend={t.city}
          hideLegend
          size="sm"
          value={city}
          onChange={onCity}
          options={cities.map((c) => ({ value: c.key, label: c.label[locale] }))}
        />
      </div>
      <p className="mt-1 text-xs text-text-muted">{t.marketNote(fmtDate(JOBS_CHECKED_ON, locale))}</p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {JOB_ROLES.map((j) => {
          const local = hourlyRange(j, city);
          const any = hourlyRange(j);
          const range = local ?? any;
          const market = j.market.find((m) => m.city === city);
          const ads = j.ads.filter((a) => a.city === city);
          const shownAds = ads.length ? ads : j.ads;
          const monthlyAd = shownAds.find((a) => a.monthlyCzk && !a.hourlyCzk);
          const active = j.id === roleId;
          return (
            <li key={j.id} className={cn("flex flex-col rounded-2xl border border-t-4 bg-surface p-4", ROLE_STRIPE[j.id], active ? "ring-2 ring-teal/40" : "")}>
              <button
                type="button"
                onClick={() => {
                  onRole(j.id);
                  onWage(j.typicalHourlyCzk);
                }}
                aria-pressed={active}
                className="text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded-lg"
              >
                <span className="block font-sans text-sm font-semibold text-text-primary">{j.name[locale]}</span>
                {range ? (
                  <span className="mt-1 block text-2xl font-bold text-text-primary tabular-nums" dir="ltr">
                    {range[0] === range[1] ? range[0] : `${range[0]}–${range[1]}`}
                    <span className="ms-1 text-xs font-medium text-text-muted">{t.perHour}</span>
                  </span>
                ) : monthlyAd?.monthlyCzk ? (
                  <span className="mt-1 block text-lg font-bold text-text-primary tabular-nums" dir="ltr">
                    {monthlyAd.monthlyCzk[0].toLocaleString("en-US")}–{fmtCzk(monthlyAd.monthlyCzk[1])}
                    <span className="ms-1 text-xs font-medium text-text-muted">{t.monthly}</span>
                  </span>
                ) : (
                  <span className="mt-1 block text-sm text-text-muted">{t.noPay}</span>
                )}
              </button>
              {!local && !ads.length && shownAds.length > 0 && (
                <p className="mt-1 text-xs text-gold-ink">
                  {t.noCity(cityName)} {Array.from(new Set(shownAds.map((a) => cities.find((x) => x.key === a.city)!.label[locale]))).join(", ")}
                </p>
              )}
              {market && (
                <p className="mt-1 text-xs text-text-muted">
                  {market.adCount === 1 ? (
                    <span className="text-gold-ink">{t.oneAd}</span>
                  ) : (
                    <>
                      {t.ads(market.adCount)}{" "}
                      <span className="font-semibold text-text-secondary tabular-nums" dir="ltr">
                        {market.averageCzk} CZK
                      </span>
                    </>
                  )}{" "}
                  <a href={market.source.url} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">
                    ({market.source.name})
                  </a>
                </p>
              )}
              {j.language && active && (
                <p className="mt-2 flex gap-1.5 text-xs text-text-secondary">
                  <Languages className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {j.language[locale]}
                </p>
              )}
              {shownAds.length > 0 && (
                <details className="mt-auto pt-3 text-xs">
                  <summary className="cursor-pointer font-medium text-brand">{t.seeAds(shownAds.length)}</summary>
                  <ul className="mt-2 space-y-2">
                    {shownAds.map((a) => (
                      <li key={a.url}>
                        <a href={a.url} target="_blank" rel="noopener noreferrer" className="group inline-flex gap-1 text-text-secondary hover:text-brand">
                          <span lang="cs" className="underline-offset-2 group-hover:underline">{a.title}</span>
                          <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                        </a>
                        <span className="block text-text-muted" dir="ltr">
                          {a.employer} ·{" "}
                          {a.hourlyCzk
                            ? `${a.hourlyCzk[0] === a.hourlyCzk[1] ? a.hourlyCzk[0] : `${a.hourlyCzk[0]}–${a.hourlyCzk[1]}`} CZK/h`
                            : a.monthlyCzk
                              ? `${a.monthlyCzk[0].toLocaleString("en-US")}–${a.monthlyCzk[1].toLocaleString("en-US")} CZK/month`
                              : ""}
                        </span>
                        {a.note && <span className="block text-text-muted">{a.note[locale]}</span>}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          );
        })}
      </ul>

      <details className="mt-3 rounded-2xl border border-border-subtle bg-surface p-4">
        <summary className="cursor-pointer text-sm font-semibold text-text-primary">{t.otherRoles}</summary>
        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {UNPRICED_ROLES.map((r) => (
            <li key={r.id} className="text-sm">
              <p className="font-semibold text-text-primary">{r.name[locale]}</p>
              <p className="mt-1 text-text-secondary leading-relaxed">{r.note[locale]}</p>
            </li>
          ))}
        </ul>
      </details>

      {/* Simulator */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6">
          <h3 className="font-sans text-lg font-semibold text-text-primary">{t.simTitle}</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="earn-job" className="text-sm font-medium text-text-secondary">{t.job}</label>
              <select
                id="earn-job"
                value={roleId}
                onChange={(e) => {
                  const id = e.target.value as JobRoleId;
                  onRole(id);
                  onWage(JOB_BY_ID[id].typicalHourlyCzk);
                }}
                className="mt-1 w-full min-h-11 rounded-xl border border-border-subtle bg-bg px-3 text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
              >
                {JOB_ROLES.map((j) => (
                  <option key={j.id} value={j.id}>{j.name[locale]}</option>
                ))}
              </select>
            </div>
            <RangeField label={t.wage} value={wage} min={135} max={300} step={5} onChange={onWage} display={`${wage} CZK/h`} color="var(--color-teal-ink)" />
            {belowMin && <p className="text-xs text-error">{t.minWage(iso(`${MIN_WAGE_2026.hourlyCzk} CZK`))}</p>}
            <RangeField label={t.hoursPerShift} value={hoursPerShift} min={2} max={12} step={0.5} onChange={(v) => set({ hoursPerShift: v })} display={fmtHours(hoursPerShift)} color="var(--color-teal-ink)" />
            <RangeField label={t.shiftsPerWeek} value={shiftsPerWeek} min={1} max={6} onChange={(v) => set({ shiftsPerWeek: v })} display={String(shiftsPerWeek)} color="var(--color-teal-ink)" />
            <Segmented
              legend={t.weeks}
              size="sm"
              value={String(weeksPerMonth)}
              onChange={(v) => set({ weeksPerMonth: Number(v) })}
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: String(52 / 12), label: t.weeksAll },
              ]}
            />
            <Segmented<ContractType>
              legend={t.contract}
              size="sm"
              value={contract}
              onChange={(v) => set({ contract: v })}
              options={(["dpp", "dpc", "employment"] as const).map((c) => ({ value: c, label: t.contracts[c] }))}
            />
            {contract === "dpp" && (
              <label className="flex min-h-11 items-start gap-3 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  checked={declaration}
                  onChange={(e) => set({ declaration: e.target.checked })}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-teal-ink)]"
                />
                {t.declaration}
              </label>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-ink p-4 text-white">
              <p className="text-xs font-medium text-white/75">{t.perShift}</p>
              <p className="text-2xl sm:text-3xl font-bold tabular-nums" dir="ltr">{fmtCzk(perShift)}</p>
              <p className="text-xs text-white/75">{t.gross}</p>
            </div>
            <div className="rounded-2xl bg-teal-ink p-4 text-white dark:text-bg">
              <p className="text-xs font-medium opacity-80">{t.perMonth}</p>
              <p className="text-2xl sm:text-3xl font-bold tabular-nums" dir="ltr">{fmtCzk(roundEstimate(perMonth))}</p>
              <p className="text-xs opacity-80" dir="ltr">
                {t.gross} · ≈ {fmtEur(perMonth)} · {t.hoursMonth(fmtHours(hours))}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface p-5" aria-live="polite">
            <h3 className="font-sans text-base font-semibold text-text-primary">{t.netTitle}</h3>
            {net.kind === "estimate" ? (
              <>
                <p className="mt-1 text-3xl font-bold text-text-primary tabular-nums" dir="ltr">
                  {fmtCzk(net.netCzk)}
                </p>
                <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                  {net.basis === "declaration" ? t.netDeclaration : t.netWithholding}
                </p>
                <p className="mt-2 text-xs text-text-muted" dir="ltr">
                  {fmtCzk(net.grossCzk)} − {fmtCzk(net.taxCzk)} ({Math.round(INCOME_TAX.rate * 100)}%)
                </p>
              </>
            ) : (
              <p className="mt-2 flex gap-2 text-sm text-text-secondary leading-relaxed">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-hidden="true" />
                {net.reason === "aboveDppThreshold" ? t.noNetAbove : t.noNetOther}
              </p>
            )}
            <p className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <a href={DPP.insuranceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center"><BasisTag kind="official">ČSSZ 2026</BasisTag></a>
              <a href={INCOME_TAX.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center"><BasisTag kind="official">{locale === "ar" ? "قانون ضريبة الدخل" : "Income Tax Act"}</BasisTag></a>
            </p>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface p-5">
            <h3 className="font-sans text-base font-semibold text-text-primary">{t.coverTitle}</h3>
            <p className="mt-1 text-sm text-text-secondary">{t.cover(covered, cityName, iso(fmtCzk(monthCostCzk)))}</p>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-teal-soft" role="img" aria-label={`${covered}%`}>
              <div className="grow-x h-full rounded-full bg-teal-ink" style={{ transform: `scaleX(${Math.min(1, covered / 100)})` }} />
            </div>
            <p className="mt-2 text-xs text-text-muted">{t.hoursForMonth(fmtHours(Math.ceil(monthCostCzk / Math.max(wage, 1))))}</p>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface p-5">
            <h3 className="font-sans text-base font-semibold text-text-primary">{t.checks}</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {(contract === "dpp" || contract === "dpc") && (
                <li className="flex gap-2">
                  {contract === "dpp" ? (
                    schedule.dppFitsYear ? (
                      <><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" /><span className="text-text-secondary">{t.dppOk(Math.round(schedule.hoursPerYear))}</span></>
                    ) : (
                      <><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" /><span className="text-text-secondary">{t.dppOver(fmtHours(schedule.dppMonthsUntilCap))}</span></>
                    )
                  ) : schedule.dpcAllowed ? (
                    <><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" /><span className="text-text-secondary">{t.dpcOk}</span></>
                  ) : (
                    <><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" /><span className="text-text-secondary">{t.dpcOver}</span></>
                  )}
                </li>
              )}
              <li className="flex flex-wrap gap-2 text-[11px]">
                <a href={DPP.labourCodeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center"><BasisTag kind="official">{t.labourCode} § 75</BasisTag></a>
                <a href={DPC.labourCodeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center"><BasisTag kind="official">{t.labourCode} § 76</BasisTag></a>
                <a href={MIN_WAGE_2026.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center"><BasisTag kind="official">MPSV</BasisTag></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
