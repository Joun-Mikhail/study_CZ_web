"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";
import Link from "@/components/locale-link";
import { DPP, DPC, MIN_WAGE_2026, WORK_ACCESS, INCOME_TAX } from "@/data/living/work-rules";
import { fmtDate } from "./format";

type Locale = "en" | "ar";

const n = (v: number) => v.toLocaleString("en-US");

const COPY = {
  en: {
    title: "Can you work, and on which contract?",
    access:
      "Full-time students of an accredited Czech university programme have free access to the labour market: no separate work permit, only a valid residence permit. Other residence purposes can carry restrictions, so check yours before you start.",
    accessLink: "Working while studying: the official rules",
    cards: [
      {
        name: "DPP · dohoda o provedení práce",
        lines: [
          `Up to ${DPP.maxHoursPerYear} hours a year with each employer.`,
          `Below ${n(DPP.insuranceThresholdCzk)} Kč a month from one employer: no social or health insurance.`,
          `Tax: 15 %, minus the ${n(INCOME_TAX.basicCreditMonthCzk)} Kč monthly credit if you sign the declaration with that employer.`,
        ],
      },
      {
        name: "DPČ · dohoda o pracovní činnosti",
        lines: [
          "Up to half of a full-time week (20 hours) on average.",
          `Insurance applies from ${n(DPC.insuranceThresholdCzk)} Kč a month.`,
          "Common for regular part-time shifts.",
        ],
      },
      {
        name: "Employment contract · pracovní smlouva",
        lines: [
          `Full or part-time hours, at least the minimum wage (${MIN_WAGE_2026.hourlyCzk} Kč an hour in 2026).`,
          "Tax and insurance are deducted every month.",
          "Most ads paid this way on the day we checked were full-time.",
        ],
      },
    ],
    checked: (d: string) => `Checked against the official sources on ${d}. Rules change each January.`,
    sources: "Sources",
  },
  ar: {
    title: "هل يمكنك العمل، وبأي عقد؟",
    access:
      "طلاب الدوام الكامل في برنامج جامعي تشيكي معتمد لهم حرية الوصول إلى سوق العمل: لا يحتاجون تصريح عمل منفصلًا، بل تصريح إقامة ساريًا فقط. أغراض الإقامة الأخرى قد تحمل قيودًا، فتأكد من وضعك قبل أن تبدأ.",
    accessLink: "العمل أثناء الدراسة: القواعد الرسمية",
    cards: [
      {
        name: "DPP · dohoda o provedení práce",
        lines: [
          `حتى ${DPP.maxHoursPerYear} ساعة في السنة لدى كل صاحب عمل.`,
          `أقل من ${n(DPP.insuranceThresholdCzk)} كرونة في الشهر من صاحب عمل واحد: بلا تأمينات اجتماعية أو صحية.`,
          `الضريبة 15 %، ويُطرح منها خصم شهري ${n(INCOME_TAX.basicCreditMonthCzk)} كرونة إذا وقّعت الإقرار لدى صاحب العمل.`,
        ],
      },
      {
        name: "DPČ · dohoda o pracovní činnosti",
        lines: [
          "حتى نصف أسبوع العمل الكامل (20 ساعة) في المتوسط.",
          `تُستحق التأمينات من ${n(DPC.insuranceThresholdCzk)} كرونة في الشهر.`,
          "شائع للورديات المنتظمة بدوام جزئي.",
        ],
      },
      {
        name: "عقد عمل · pracovní smlouva",
        lines: [
          `دوام كامل أو جزئي، بأجر لا يقل عن الحد الأدنى (${MIN_WAGE_2026.hourlyCzk} كرونة في الساعة في 2026).`,
          "تُخصم الضريبة والتأمينات كل شهر.",
          "أغلب الإعلانات بهذا العقد يوم مراجعتنا كانت بدوام كامل.",
        ],
      },
    ],
    checked: (d: string) => `راجعنا هذه المعلومات على المصادر الرسمية في ${d}. القواعد تتغير كل يناير.`,
    sources: "المصادر",
  },
};

const SOURCES = [
  { label: { en: "Ministry of the Interior: free access to the labour market", ar: "وزارة الداخلية: حرية الوصول إلى سوق العمل" }, url: WORK_ACCESS.url },
  { label: { en: "Labour Code §§ 75–76 (DPP, DPČ)", ar: "قانون العمل، المادتان 75 و76 (DPP وDPČ)" }, url: "https://www.zakonyprolidi.cz/cs/2006-262" },
  { label: { en: "ČSSZ: key figures for 2026", ar: "إدارة الضمان الاجتماعي ČSSZ: أرقام 2026" }, url: DPP.insuranceUrl },
  { label: { en: "Income Tax Act § 35ba", ar: "قانون ضريبة الدخل، المادة 35ba" }, url: INCOME_TAX.url },
  { label: { en: "MPSV: minimum wage 2026", ar: "وزارة العمل MPSV: الحد الأدنى للأجور 2026" }, url: MIN_WAGE_2026.url },
];

export function WorkRules({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <section aria-labelledby="rules-title" className="rounded-[28px] border border-border-subtle bg-bg-subtle p-5 sm:p-8">
      <h2 id="rules-title" className="text-xl sm:text-2xl font-bold text-text-primary">{t.title}</h2>
      <p className="mt-3 max-w-3xl flex gap-2 text-text-secondary leading-relaxed">
        <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
        <span>
          {t.access}{" "}
          <Link href="/work-while-studying/" className="font-medium text-brand hover:underline">{t.accessLink}</Link>
        </span>
      </p>
      <ul className="mt-5 grid gap-3 md:grid-cols-3">
        {t.cards.map((c) => (
          <li key={c.name} className="rounded-2xl border border-border-subtle bg-surface p-4">
            <h3 className="font-sans text-base font-semibold text-text-primary" lang={c.name.includes("·") ? undefined : "cs"}>{c.name}</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-text-secondary">
              {c.lines.map((l) => (
                <li key={l} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-text-muted">{t.checked(fmtDate(DPP.checkedOn, locale))}</p>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs" aria-label={t.sources}>
        {SOURCES.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center gap-1 py-1 text-brand hover:underline">
              {s.label[locale]}
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
