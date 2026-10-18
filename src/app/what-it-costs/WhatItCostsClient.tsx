"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import { Calculator, CalendarCheck, ExternalLink, GraduationCap, Plane, Utensils } from "lucide-react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import Link from "@/components/locale-link";
import type { CityKey } from "@/data/costs";
import {
  OFFICIAL,
  accommodationDepositCzk,
  degreeTotalEur,
  englishTuition,
  livingByCity,
  medicineTuition,
  toEur,
} from "@/lib/study-costs";

type Locale = "en" | "ar";

const n = (v: number) => v.toLocaleString("en-US");
const eur = (v: number, l: Locale) => (l === "ar" ? `${n(v)}€` : `€${n(v)}`);
const czk = (v: number, l: Locale) => (l === "ar" ? `${n(v)} كرونة` : `${n(v)} CZK`);
const czkRange = ([lo, hi]: readonly [number, number], l: Locale) => `${n(lo)} – ${n(hi)} ${l === "ar" ? "كرونة" : "CZK"}`;
const egp = (v: number, l: Locale) => (l === "ar" ? `${n(v)} جنيه` : `${n(v)} EGP`);

const t = {
  en: {
    title: "What studying in Czechia costs in 2027",
    subtitle:
      "Tuition from the programmes on this site, visa costs from the embassy's own pages, and living costs from students who live here. Each figure says where it comes from.",
    checked: "Official figures checked on 18 October 2026. Fees change, so open the source before you pay.",
    source: "Source",
    tuitionTitle: "Tuition per year",
    czechFree: "Taught in Czech at a public university",
    free: "Free",
    englishBachelor: "Taught in English, bachelor's",
    englishMaster: "Taught in English, master's",
    medicine: "General Medicine in English",
    typical: (v: string) => `half cost ${v} or less`,
    tuitionNote: (count: number, date: string) =>
      `From the ${count} English-taught programmes on this site, each checked against the university's own page on ${date} or later.`,
    cheapest: "Cheapest programmes",
    medicineGuide: "Medicine fees and exams",
    livingTitle: "Living costs per month",
    livingNote:
      "Dorm room, food, transport with the student discount, health insurance, phone and small extras. These are averages reported by students, not official figures: your own costs depend on your housing.",
    calculatorLink: "Work out your own budget",
    visaTitle: "Visa and one-off costs",
    proof: "Money you must show for a one-year visa",
    proofNote: "It stays yours: you show it in your account, you don't pay it.",
    visaFee: "Visa fee at the embassy in Cairo",
    visaFeeNote: (d: string) => `Valid from ${d}; it follows the monthly exchange rate.`,
    superleg: "Embassy superlegalisation, per document",
    deposit: "Housing deposit",
    depositNote: "Reported by students; dormitories and landlords set their own.",
    visaGuide: "Student visa from Egypt, step by step",
    degreeTitle: "A whole degree, roughly",
    degreeIntro: "Tuition plus living costs for every year of the degree, assuming fees stay the same. Flights and one-off costs are not included.",
    tuitionLabel: "Tuition",
    yearsLabel: "Years",
    cityLabel: "City",
    result: (years: number) => `Tuition and living for ${years} ${years === 1 ? "year" : "years"}`,
    options: {
      cheapBachelor: "Cheapest English bachelor's",
      typicalBachelor: "Typical English bachelor's",
      typicalMaster: "Typical English master's",
      cheapMedicine: "Cheapest General Medicine",
      topMedicine: "Most expensive General Medicine",
    },
    perYear: "a year",
    closing:
      "Most agencies won't publish these numbers, because if you know what things actually cost you might realise you can do this yourself. You can. Everything on this site is free, and Czech public universities accept direct applications.",
  },
  ar: {
    title: "تكاليف الدراسة في التشيك 2027",
    subtitle:
      "الرسوم الدراسية من البرامج الموجودة على الموقع، وتكاليف الفيزا من صفحات السفارة نفسها، وتكاليف المعيشة من طلاب عايشين هنا. كل رقم مكتوب جنبه مصدره.",
    checked: "راجعنا الأرقام الرسمية يوم 18 أكتوبر 2026. الرسوم بتتغير، فافتح المصدر قبل ما تدفع.",
    source: "المصدر",
    tuitionTitle: "الرسوم الدراسية في السنة",
    czechFree: "الدراسة بالتشيكي في جامعة حكومية",
    free: "مجانًا",
    englishBachelor: "بالإنجليزي، بكالوريوس",
    englishMaster: "بالإنجليزي، ماجستير",
    medicine: "الطب العام بالإنجليزي",
    typical: (v: string) => `نصهم بـ${v} أو أقل`,
    tuitionNote: (count: number, date: string) =>
      `من ${count} برنامج بالإنجليزي على الموقع، كل واحد اتراجع على صفحة الجامعة نفسها يوم ${date} أو بعده.`,
    cheapest: "أرخص البرامج",
    medicineGuide: "مصاريف الطب وامتحاناته",
    livingTitle: "تكاليف المعيشة في الشهر",
    livingNote:
      "غرفة في السكن الجامعي، أكل، مواصلات بخصم الطلبة، تأمين صحي، موبايل ومصاريف صغيرة. دي متوسطات من الطلبة، مش أرقام رسمية: مصاريفك الفعلية بتعتمد على سكنك.",
    calculatorLink: "احسب ميزانيتك بنفسك",
    visaTitle: "الفيزا والمصاريف اللي بتدفعها مرة واحدة",
    proof: "المبلغ اللي لازم تثبته لفيزا سنة",
    proofNote: "الفلوس دي بتفضل بتاعتك: بتثبت إنها في حسابك، مش بتدفعها.",
    visaFee: "رسوم الفيزا في السفارة بالقاهرة",
    visaFeeNote: (d: string) => `سارية من ${d}، وبتتغير مع سعر الصرف كل شهر.`,
    superleg: "تصديق السفارة، للورقة الواحدة",
    deposit: "تأمين السكن",
    depositNote: "حسب كلام الطلبة؛ كل سكن وكل صاحب شقة بيحدد المبلغ بتاعه.",
    visaGuide: "فيزا الدراسة من مصر خطوة بخطوة",
    degreeTitle: "تكلفة الدراسة كلها تقريبًا",
    degreeIntro: "الرسوم الدراسية ومصاريف المعيشة لكل سنين الدراسة، على فرض إن الرسوم ثابتة. الطيران والمصاريف اللي بتدفعها مرة واحدة مش محسوبة.",
    tuitionLabel: "الرسوم",
    yearsLabel: "عدد السنين",
    cityLabel: "المدينة",
    result: (years: number) => `الرسوم والمعيشة لمدة ${years === 1 ? "سنة" : years === 2 ? "سنتين" : `${years} سنين`}`,
    options: {
      cheapBachelor: "أرخص بكالوريوس بالإنجليزي",
      typicalBachelor: "بكالوريوس بالإنجليزي (متوسط)",
      typicalMaster: "ماجستير بالإنجليزي (متوسط)",
      cheapMedicine: "أرخص طب عام",
      topMedicine: "أغلى طب عام",
    },
    perYear: "في السنة",
    closing:
      "أغلب الوكالات مش هتنشر الأرقام دي، لأن لو عرفت التكلفة الحقيقية ممكن تكتشف إنك تقدر تعمل كل ده لوحدك. وفعلًا تقدر. كل حاجة على الموقع ده مجانية، والجامعات الحكومية التشيكية بتقبل طلبات مباشرة.",
  },
};

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-brand underline underline-offset-2 whitespace-nowrap"
    >
      {label}
      <ExternalLink className="w-3 h-3" aria-hidden="true" />
    </a>
  );
}

function Row({ label, value, note }: { label: string; value: string; note?: React.ReactNode }) {
  return (
    <div className="py-3 border-b border-border-subtle last:border-0">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-text-secondary">{label}</span>
        <span className="font-semibold text-text-primary text-end shrink-0" dir="ltr">
          {value}
        </span>
      </div>
      {note && <p className="text-xs text-text-muted mt-1">{note}</p>}
    </div>
  );
}

function Card({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6">
      <h2 className="flex items-center gap-3 text-lg font-semibold text-text-primary mb-2">
        <span className="p-2 rounded-xl bg-brand/10 border border-brand/20">
          <Icon className="w-5 h-5 text-brand" aria-hidden="true" />
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function WhatItCostsClient() {
  const { locale } = useTranslation();
  const l: Locale = locale === "ar" ? "ar" : "en";
  const c = t[l];

  const tuition = useMemo(() => englishTuition(), []);
  const medicine = useMemo(() => medicineTuition(), []);
  const living = useMemo(() => livingByCity(), []);

  const presets = useMemo(() => {
    const list = [
      { key: "cheapBachelor", fee: tuition.bachelor.min, years: 3 },
      { key: "typicalBachelor", fee: tuition.bachelor.median, years: 3 },
      { key: "typicalMaster", fee: tuition.master.median, years: 2 },
    ];
    if (medicine) {
      list.push({ key: "cheapMedicine", fee: medicine.min, years: medicine.years });
      list.push({ key: "topMedicine", fee: medicine.max, years: medicine.years });
    }
    return list as { key: keyof typeof t.en.options; fee: number; years: number }[];
  }, [tuition, medicine]);

  const [presetKey, setPresetKey] = useState<string>("typicalBachelor");
  const preset = presets.find((p) => p.key === presetKey) ?? presets[0];
  const [years, setYears] = useState<number>(preset.years);
  const [city, setCity] = useState<CityKey>("brno");
  const total = degreeTotalEur(preset.fee, years, city);
  const ids = { tuition: useId(), years: useId(), city: useId() };

  const selectClass =
    "w-full rounded-xl border border-border-subtle bg-bg px-3 py-2.5 text-sm text-text-primary focus-visible:outline-2 focus-visible:outline-brand";

  return (
    <>
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative w-full h-[160px] sm:h-[220px] rounded-2xl overflow-hidden mb-8">
            <Image
              src="/images/study/laptop-top.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-ink/10" />
          </div>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">{c.title}</h1>
            <p className="text-lg text-text-secondary mb-4">{c.subtitle}</p>
            <p className="flex items-start gap-2 text-sm text-text-muted">
              <CalendarCheck className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              {c.checked}
            </p>
          </header>

          <div className="space-y-6">
            <Card icon={GraduationCap} title={c.tuitionTitle}>
              <Row
                label={c.czechFree}
                value={c.free}
                note={<SourceLink href={OFFICIAL.czechFree.url} label={c.source} />}
              />
              <Row
                label={c.englishBachelor}
                value={`${eur(tuition.bachelor.min, l)} – ${eur(tuition.bachelor.max, l)}`}
                note={c.typical(eur(tuition.bachelor.median, l))}
              />
              <Row
                label={c.englishMaster}
                value={`${eur(tuition.master.min, l)} – ${eur(tuition.master.max, l)}`}
                note={c.typical(eur(tuition.master.median, l))}
              />
              {medicine && (
                <Row
                  label={c.medicine}
                  value={`${eur(medicine.min, l)} – ${eur(medicine.max, l)}`}
                  note={
                    <Link href="/study/medicine-in-czech-republic" className="text-brand underline underline-offset-2">
                      {c.medicineGuide}
                    </Link>
                  }
                />
              )}
              <p className="text-xs text-text-muted mt-3">
                {c.tuitionNote(tuition.all.count, tuition.lastVerified)}{" "}
                <Link href="/study/cheapest-programmes" className="text-brand underline underline-offset-2">
                  {c.cheapest}
                </Link>
              </p>
            </Card>

            <Card icon={Utensils} title={c.livingTitle}>
              {living.map((city) => (
                <Row
                  key={city.key}
                  label={city.label[l]}
                  value={czkRange(city.monthlyCzk, l)}
                  note={`≈ ${eur(toEur(city.monthlyCzk[0]), l)} – ${eur(toEur(city.monthlyCzk[1]), l)}`}
                />
              ))}
              <p className="text-xs text-text-muted mt-3">
                {c.livingNote}{" "}
                <Link href="/cost-of-living" className="text-brand underline underline-offset-2">
                  {c.calculatorLink}
                </Link>
              </p>
            </Card>

            <Card icon={Plane} title={c.visaTitle}>
              <Row
                label={c.proof}
                value={czk(OFFICIAL.proofOfFundsYearCzk.value, l)}
                note={
                  <>
                    {c.proofNote} <SourceLink href={OFFICIAL.proofOfFundsYearCzk.url} label={c.source} />
                  </>
                }
              />
              <Row
                label={c.visaFee}
                value={egp(OFFICIAL.visaFeeCairoEgp.value, l)}
                note={
                  <>
                    {c.visaFeeNote(OFFICIAL.visaFeeCairoEgp.validFrom[l])}{" "}
                    <SourceLink href={OFFICIAL.visaFeeCairoEgp.url} label={c.source} />
                  </>
                }
              />
              <Row
                label={c.superleg}
                value={egp(OFFICIAL.superlegalisationCairoEgp.value, l)}
                note={<SourceLink href={OFFICIAL.superlegalisationCairoEgp.url} label={c.source} />}
              />
              <Row
                label={c.deposit}
                value={czkRange(accommodationDepositCzk, l)}
                note={c.depositNote}
              />
              <p className="text-sm mt-3">
                <Link href="/student-visa-egypt" className="font-medium text-brand hover:underline">
                  {c.visaGuide}
                </Link>
              </p>
            </Card>

            <Card icon={Calculator} title={c.degreeTitle}>
              <p className="text-sm text-text-secondary mb-4">{c.degreeIntro}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label htmlFor={ids.tuition} className="block text-xs font-medium text-text-muted mb-1">
                    {c.tuitionLabel}
                  </label>
                  <select
                    id={ids.tuition}
                    className={selectClass}
                    value={preset.key}
                    onChange={(e) => {
                      const next = presets.find((p) => p.key === e.target.value) ?? presets[0];
                      setPresetKey(next.key);
                      setYears(next.years);
                    }}
                  >
                    {presets.map((p) => (
                      <option key={p.key} value={p.key}>
                        {c.options[p.key]}: {eur(p.fee, l)} {c.perYear}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={ids.years} className="block text-xs font-medium text-text-muted mb-1">
                    {c.yearsLabel}
                  </label>
                  <select id={ids.years} className={selectClass} value={years} onChange={(e) => setYears(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5, 6].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={ids.city} className="block text-xs font-medium text-text-muted mb-1">
                    {c.cityLabel}
                  </label>
                  <select id={ids.city} className={selectClass} value={city} onChange={(e) => setCity(e.target.value as CityKey)}>
                    {living.map((ct) => (
                      <option key={ct.key} value={ct.key}>
                        {ct.label[l]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-brand/[0.06] border border-brand/20 p-4" aria-live="polite">
                <p className="text-xs text-text-muted">{c.result(years)}</p>
                <p className="text-2xl font-bold text-text-primary mt-1" dir="ltr">
                  {eur(total[0], l)} – {eur(total[1], l)}
                </p>
              </div>
            </Card>
          </div>

          <blockquote className="mt-12 border-s-4 border-accent ps-6 py-4 text-text-secondary italic">{c.closing}</blockquote>
        </div>
      </main>
      <Footer />
    </>
  );
}
