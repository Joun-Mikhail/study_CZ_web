"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { BedDouble, CalendarCheck, ExternalLink } from "lucide-react";
import { DORM_PRICES, NIGHTS_PER_MONTH } from "@/data/dorm-prices";

const n = (v: number) => v.toLocaleString("en-US");
const range = ([lo, hi]: [number, number]) => (lo === hi ? n(lo) : `${n(lo)}–${n(hi)}`);

const en = {
  title: "Student housing in Czechia: university dorm prices",
  subtitle:
    "What a bed in a university dormitory costs in Prague and Brno, copied from each university's own price list. Prices are per bed per night, including VAT.",
  checked: "Checked against the official price lists on 7 November 2026. Prices change, so open the source before you book.",
  single: "Single room",
  double: "Bed in a double room",
  perNight: "CZK a night",
  czk: "CZK",
  month: `about ${NIGHTS_PER_MONTH} nights`,
  validFrom: "Valid from",
  source: "Official price list",
  privateTitle: "Renting privately",
  privateBody: "Private flats and rooms are not covered here because there is no official price list. Our cost-of-living page shows the ranges students report.",
  privateLink: "Cost of living",
  nextTitle: "Next steps",
  links: [
    { href: "/cost-of-living", label: "Monthly cost of living" },
    { href: "/student-visa-egypt", label: "Proof of accommodation for the visa" },
    { href: "/arrival", label: "Your first weeks" },
  ],
};

const ar: typeof en = {
  title: "السكن الطلابي في التشيك: أسعار السكن الجامعي",
  subtitle:
    "كم يكلف السرير في السكن الجامعي في براغ وبرنو، منقولًا من قائمة أسعار كل جامعة. الأسعار للسرير في الليلة، شاملة ضريبة القيمة المضافة.",
  checked: "راجعنا الأسعار على القوائم الرسمية بتاريخ 7 نوفمبر 2026. الأسعار تتغير، لذا افتح المصدر قبل الحجز.",
  single: "غرفة فردية",
  double: "سرير في غرفة مزدوجة",
  perNight: "كرونة في الليلة",
  czk: "كرونة",
  month: `نحو ${NIGHTS_PER_MONTH} ليلة`,
  validFrom: "سارية من",
  source: "قائمة الأسعار الرسمية",
  privateTitle: "الإيجار الخاص",
  privateBody: "الشقق والغرف الخاصة غير مشمولة هنا لأنه لا توجد قائمة أسعار رسمية لها. صفحة تكاليف المعيشة عندنا فيها النطاقات التي يذكرها الطلاب.",
  privateLink: "تكاليف المعيشة",
  nextTitle: "الخطوات التالية",
  links: [
    { href: "/cost-of-living", label: "تكاليف المعيشة الشهرية" },
    { href: "/student-visa-egypt", label: "إثبات السكن للتأشيرة" },
    { href: "/arrival", label: "أول أسابيع لك هناك" },
  ],
};

export default function HousingClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{t.title}</h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-4">{t.subtitle}</p>
            <p className="flex items-start gap-2 text-sm text-text-muted">
              <CalendarCheck className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              {t.checked}
            </p>
          </header>

          <div className="space-y-4 mb-8">
            {DORM_PRICES.map((d) => (
              <GlassCard key={d.id}>
                <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
                  {d.university[locale]}
                  <span className="text-sm font-normal text-text-muted">· {d.city[locale]}</span>
                </h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {d.single && (
                    <div>
                      <dt className="text-sm text-text-muted">{t.single}</dt>
                      <dd className="text-base font-semibold text-text-primary">
                        <bdi dir="ltr">{range(d.single)}</bdi> {t.perNight}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-text-muted">{t.double}</dt>
                    <dd className="text-base font-semibold text-text-primary">
                      <bdi dir="ltr">{range(d.double)}</bdi> {t.perNight}
                      <span className="block text-sm font-normal text-text-secondary">
                        <bdi dir="ltr">{range([d.double[0] * NIGHTS_PER_MONTH, d.double[1] * NIGHTS_PER_MONTH])}</bdi> {t.czk} / {t.month}
                      </span>
                    </dd>
                  </div>
                </dl>
                <p className="text-sm text-text-secondary leading-relaxed mt-3">{d.conditions[locale]}</p>
                <p className="text-sm text-text-muted mt-2">
                  {t.validFrom}: {d.validFrom[locale]} ·{" "}
                  <a href={d.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-brand hover:underline">
                    {t.source}
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-2">{t.privateTitle}</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t.privateBody}{" "}
              <Link href="/cost-of-living" className="font-medium text-brand hover:underline">
                {t.privateLink}
              </Link>
            </p>
          </GlassCard>

          <nav aria-labelledby="housing-next">
            <h2 id="housing-next" className="text-base font-semibold text-text-primary mb-2">{t.nextTitle}</h2>
            <ul className="flex flex-wrap gap-2">
              {t.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-border-subtle text-sm text-text-secondary hover:text-brand hover:border-brand/40 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
}
