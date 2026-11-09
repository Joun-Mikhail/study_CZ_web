"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Clock, Database, AlertTriangle } from "lucide-react";
import { GROCERY_CHECKED_ON } from "@/data/living/groceries";
import { JOBS_CHECKED_ON } from "@/data/living/jobs";
import { CITY_COSTS_CHECKED_ON, STUDENT_TRANSPORT, OSTRAVA_DORM, CANTEEN_MEAL, PHONE_PLAN, RENT_MAP, RENTED_FLAT_UTILITIES } from "@/data/living/city-costs";
import { DORM_PRICES } from "@/data/dorm-prices";
import { RULES_CHECKED_ON, FX } from "@/data/living/work-rules";
import { daysSince, STALE_AFTER_DAYS } from "@/lib/living-calc";
import { fmtDate } from "./format";

type Locale = "en" | "ar";

const COPY = {
  en: {
    title: "Where every number comes from",
    lead: "Prices here are snapshots we checked by hand, not live feeds. Each group has its date; follow the links to see today's figures.",
    stale: (d: number) => `Some of these figures were checked ${d} days ago. Prices and ads may have changed; open the sources before you decide.`,
    groups: {
      groceries: "Supermarket prices",
      jobs: "Job ads and pay",
      housing: "University dorm prices",
      transport: "Student transport passes",
      canteens: "University canteens",
      flats: "Private flats: rent and utilities",
      phone: "Mobile plan",
      rules: "Minimum wage, contracts, tax",
      fx: "Exchange rate",
    },
    groceriesBody: "Regular shelf prices on each product's page on Rohlik.cz. Personal discounts we saw are noted, never used.",
    jobsBody: "Pracomat.cz's daily summary of live ads for each job and city, plus single ads on JenPráce.cz, Pracomat.cz and Jobs.cz.",
    housingBody: "Each university's own price list, per bed per night, × 30 nights.",
    transportBody: "Each operator's price list for students.",
    canteensBody: "The student price of a lunch, from each university's own menu or notice.",
    flatsBody: (release: string, year: number) => `Rent: the Ministry of Finance rent map (${release}) for a furnished one-room flat (1+kk or 1+1) of the region's median size, without energy or water. Utilities: the Czech Statistical Office's ${year} average per person in a rented flat.`,
    phoneBody: (plan: string) => `The operator's own price list: prepaid plan ${plan}.`,
    rulesBody: "MPSV, ČSSZ, the Labour Code and the Income Tax Act.",
    fxBody: (r: string, d: string) => `Czech National Bank rate of ${d}: 1 EUR = ${r} CZK. Euro figures are for orientation only.`,
    checked: "Checked",
    howTitle: "How we keep this current",
    how: [
      "Supermarket prices and job ads are re-checked by hand and the date above updates with them. Czech supermarkets don't publish a public price feed or API we may use, and we don't scrape shops or bypass their protections, so prices are never shown as live.",
      "Official figures (minimum wage, contract limits, tax credit, transport fares) change mostly in January; we review them then.",
      "Each figure lives in one data file with its source link and date, and automated tests check the data before the site is built.",
    ],
  },
  ar: {
    title: "من أين يأتي كل رقم",
    lead: "الأسعار هنا لقطات راجعناها يدويًا، وليست بيانات مباشرة. لكل مجموعة تاريخها، وتتيح الروابط رؤية أرقام اليوم.",
    stale: (d: number) => `بعض هذه الأرقام تمت مراجعتها قبل ${d} يومًا. قد تكون الأسعار والإعلانات تغيرت، فافتح المصادر قبل أن تقرر.`,
    groups: {
      groceries: "أسعار السوبر ماركت",
      jobs: "إعلانات الوظائف والأجور",
      housing: "أسعار السكن الجامعي",
      transport: "اشتراكات المواصلات للطلاب",
      canteens: "مطاعم الجامعات",
      flats: "الشقق الخاصة: الإيجار والمرافق",
      phone: "باقة الموبايل",
      rules: "الحد الأدنى للأجور والعقود والضريبة",
      fx: "سعر الصرف",
    },
    groceriesBody: "أسعار الرف العادية في صفحة كل منتج على Rohlik.cz. الخصومات الشخصية التي ظهرت لنا مذكورة، ولا نستخدمها في الحساب.",
    jobsBody: "ملخص Pracomat.cz اليومي للإعلانات المنشورة لكل وظيفة ومدينة، إضافة إلى إعلانات منفردة على JenPráce.cz وPracomat.cz وJobs.cz.",
    housingBody: "قائمة أسعار كل جامعة، للسرير في الليلة × 30 ليلة.",
    transportBody: "قائمة أسعار الطلاب لدى كل شركة نقل.",
    canteensBody: "سعر وجبة الغداء للطلاب، من قائمة أو إعلان كل جامعة.",
    flatsBody: (release: string, year: number) => `الإيجار: خريطة الإيجارات الصادرة عن وزارة المالية (${release}) لشقة مفروشة بغرفة واحدة (\u20681+kk\u2069 أو \u20681+1\u2069) بالمساحة الوسيطة في الإقليم، بدون الطاقة والمياه. المرافق: متوسط مكتب الإحصاء التشيكي لعام ${year} للفرد في شقة مستأجرة.`,
    phoneBody: (plan: string) => `قائمة أسعار الشركة نفسها: الباقة المدفوعة مسبقًا ${plan}.`,
    rulesBody: "وزارة العمل MPSV، وإدارة الضمان الاجتماعي ČSSZ، وقانون العمل، وقانون ضريبة الدخل.",
    fxBody: (r: string, d: string) => `سعر البنك الوطني التشيكي بتاريخ ${d}: 1 يورو = ${r} كرونة. أرقام اليورو للتوضيح فقط.`,
    checked: "تاريخ المراجعة",
    howTitle: "كيف نحدّث هذه الأرقام",
    how: [
      "نعيد مراجعة أسعار السوبر ماركت وإعلانات الوظائف يدويًا، ويتغير التاريخ أعلاه معها. السوبر ماركت التشيكية لا تنشر واجهة أسعار عامة يمكننا استخدامها، ونحن لا نجمع بيانات المتاجر آليًا ولا نتجاوز حمايتها، لذلك لا نعرض الأسعار كأنها مباشرة.",
      "الأرقام الرسمية (الحد الأدنى للأجور وحدود العقود والخصم الضريبي وأسعار المواصلات) تتغير غالبًا في يناير، ونراجعها حينها.",
      "كل رقم موجود في ملف بيانات واحد مع رابط مصدره وتاريخه، واختبارات آلية تفحص البيانات قبل بناء الموقع.",
    ],
  },
};

export function SourcesPanel({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const oldest = [GROCERY_CHECKED_ON, JOBS_CHECKED_ON, CITY_COSTS_CHECKED_ON].sort()[0];
  // Computed after hydration so the static HTML and the first client render match.
  const [age, setAge] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the clock once, after hydration
    setAge(daysSince(oldest, new Date()));
  }, [oldest]);

  const groups: { key: keyof typeof t.groups; body: string; date: string; links: { label: string; url: string }[] }[] = [
    { key: "groceries", body: t.groceriesBody, date: GROCERY_CHECKED_ON, links: [{ label: "Rohlik.cz", url: "https://www.rohlik.cz/" }] },
    { key: "jobs", body: t.jobsBody, date: JOBS_CHECKED_ON, links: [{ label: "Pracomat.cz", url: "https://www.pracomat.cz/" }, { label: "JenPráce.cz", url: "https://www.jenprace.cz/brigady/brno" }, { label: "Jobs.cz", url: "https://www.jobs.cz/" }] },
    {
      key: "housing",
      body: t.housingBody,
      date: CITY_COSTS_CHECKED_ON,
      links: [...DORM_PRICES.map((d) => ({ label: d.university[locale], url: d.sourceUrl })), { label: OSTRAVA_DORM.university[locale], url: OSTRAVA_DORM.url }],
    },
    { key: "transport", body: t.transportBody, date: CITY_COSTS_CHECKED_ON, links: Object.values(STUDENT_TRANSPORT).map((s) => ({ label: s.operator, url: s.url })) },
    { key: "canteens", body: t.canteensBody, date: CITY_COSTS_CHECKED_ON, links: Object.values(CANTEEN_MEAL).map((c) => ({ label: c.operator[locale], url: c.url })) },
    {
      key: "flats",
      body: t.flatsBody(RENT_MAP.release[locale], RENTED_FLAT_UTILITIES.year),
      date: CITY_COSTS_CHECKED_ON,
      links: [
        { label: locale === "ar" ? "وزارة المالية: خريطة الإيجارات" : "Ministry of Finance: rent map", url: RENT_MAP.page },
        { label: locale === "ar" ? "مكتب الإحصاء التشيكي (ČSÚ)" : "Czech Statistical Office (ČSÚ)", url: RENTED_FLAT_UTILITIES.url },
      ],
    },
    { key: "phone", body: t.phoneBody(PHONE_PLAN.plan), date: PHONE_PLAN.checkedOn, links: [{ label: PHONE_PLAN.operator, url: PHONE_PLAN.url }] },
    {
      key: "rules",
      body: t.rulesBody,
      date: RULES_CHECKED_ON,
      links: [
        { label: "MPSV", url: "https://mpsv.gov.cz/web/cz/minimalni-mzda" },
        { label: "ČSSZ", url: "https://www.cssz.gov.cz/-/prehled-nejdulezitejsich-udaju-pro-socialni-zabezpeceni-v-roce-2026" },
        { label: "Zákoník práce", url: "https://www.zakonyprolidi.cz/cs/2006-262" },
        { label: "Zákon o daních z příjmů", url: "https://www.zakonyprolidi.cz/cs/1992-586" },
      ],
    },
    { key: "fx", body: t.fxBody(String(FX.czkPerEur), fmtDate(FX.date, locale)), date: FX.date, links: [{ label: "ČNB", url: FX.url }] },
  ];

  return (
    <section id="sources" aria-labelledby="sources-title" className="scroll-mt-24">
      <h2 id="sources-title" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-text-primary">
        <Database className="h-6 w-6 text-brand" aria-hidden="true" />
        {t.title}
      </h2>
      <p className="mt-2 max-w-3xl text-text-secondary">{t.lead}</p>
      {age !== null && age > STALE_AFTER_DAYS && (
        <p role="status" className="mt-3 flex gap-2 rounded-xl border border-warning/40 bg-gold-soft p-3 text-sm text-gold-ink">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {t.stale(age)}
        </p>
      )}
      <ul className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <li key={g.key} className="rounded-2xl border border-border-subtle bg-surface p-4">
            <h3 className="font-sans text-sm font-semibold text-text-primary">{t.groups[g.key]}</h3>
            <p className="mt-1 text-sm text-text-secondary leading-relaxed">{g.body}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {t.checked}: {fmtDate(g.date, locale)}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
              {g.links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center gap-1 py-1 text-brand hover:underline">
                    {l.label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-2xl bg-bg-subtle p-5">
        <h3 className="font-sans text-base font-semibold text-text-primary">{t.howTitle}</h3>
        <ul className="mt-2 space-y-2 text-sm text-text-secondary leading-relaxed">
          {t.how.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
