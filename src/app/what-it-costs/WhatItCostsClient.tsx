"use client";

import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Clock, GraduationCap, Home, FileText, Plane, Shield, Utensils } from "lucide-react";
import costsData from "../../../content/costs.json";

type RangeData = { min: number | null; max: number | null; note?: string };

function formatRange(data: RangeData, currency: string): string {
  if (data.min === null && data.max === null) return "--";
  if (data.min !== null && data.max !== null) {
    if (data.min === data.max) return `${data.min.toLocaleString()} ${currency}`;
    return `${data.min.toLocaleString()} - ${data.max.toLocaleString()} ${currency}`;
  }
  if (data.min !== null) return `${data.min.toLocaleString()}+ ${currency}`;
  return `up to ${data.max!.toLocaleString()} ${currency}`;
}

function formatSingle(value: number | null, currency: string): string {
  if (value === null) return "--";
  return `${value.toLocaleString()} ${currency}`;
}

const t = {
  en: {
    badge: "Last verified:",
    badgeEmpty: "Data being compiled",
    title: "What Studying in Czechia Actually Costs",
    subtitle: "Real numbers. No guesses. Every figure here comes from official sources or direct experience.",
    tuitionTitle: "Tuition Fees (per year)",
    czechPublic: "Czech-taught public university",
    englishPublic: "English-taught public university",
    privateUni: "Private university",
    appFeesTitle: "Application Fees",
    appFeesLabel: "Per application",
    docCostsTitle: "Document Costs",
    country: "Country",
    apostille: "Apostille",
    translation: "Translation",
    note: "Note",
    visaTitle: "Visa & Proof of Funds",
    visaFee: "Long-term visa fee",
    financialProof: "Required bank balance (proof of funds)",
    insuranceTitle: "Health Insurance (per year)",
    insuranceLabel: "Comprehensive student insurance",
    livingTitle: "Monthly Living Costs",
    city: "City",
    dorm: "Dorm",
    rent: "Private rent",
    food: "Food",
    transport: "Transport",
    total: "Total / month",
    closing: "Most agencies won't publish these numbers, because if you know what things actually cost you might realise you can do this yourself. You can. Everything on this site is free, and Czech public universities accept direct applications.",
    noData: "This data is being compiled from verified sources. Check back soon.",
  },
  ar: {
    badge: "اخر تحقق:",
    badgeEmpty: "البيانات قيد التجميع",
    title: "تكلفة الدراسة في التشيك الحقيقية",
    subtitle: "ارقام حقيقية. بدون تخمين. كل رقم هنا من مصادر رسمية او تجربة مباشرة.",
    tuitionTitle: "الرسوم الدراسية (سنويا)",
    czechPublic: "جامعة حكومية بالتشيكي",
    englishPublic: "جامعة حكومية بالانجليزي",
    privateUni: "جامعة خاصة",
    appFeesTitle: "رسوم التقديم",
    appFeesLabel: "لكل طلب",
    docCostsTitle: "تكاليف الوثائق",
    country: "البلد",
    apostille: "ابوستيل",
    translation: "ترجمة",
    note: "ملاحظة",
    visaTitle: "التاشيرة واثبات القدرة المالية",
    visaFee: "رسوم تاشيرة طويلة الامد",
    financialProof: "الرصيد البنكي المطلوب (اثبات مالي)",
    insuranceTitle: "التامين الصحي (سنويا)",
    insuranceLabel: "تامين طلابي شامل",
    livingTitle: "تكاليف المعيشة الشهرية",
    city: "المدينة",
    dorm: "سكن جامعي",
    rent: "ايجار خاص",
    food: "اكل",
    transport: "مواصلات",
    total: "اجمالي / شهر",
    closing: "اغلب الوكالات مش هتنشر الارقام دي، لان لو عرفت التكلفة الحقيقية ممكن تكتشف انك تقدر تعمل كل ده لوحدك. وفعلا تقدر. كل حاجة على الموقع ده مجانية، والجامعات الحكومية التشيكية بتقبل طلبات مباشرة.",
    noData: "البيانات قيد التجميع من مصادر موثقة. ارجع قريب.",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function DataRow({ label, value }: { label: string; value: string }) {
  const isEmpty = value === "--";
  return (
    <div className="flex justify-between items-center py-3 border-b border-border-subtle last:border-0">
      <span className="text-text-secondary">{label}</span>
      <span className={isEmpty ? "text-text-muted italic" : "font-semibold text-text-primary"}>
        {value}
      </span>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl border border-border-subtle bg-surface/60 backdrop-blur-sm p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-accent/10">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

export default function WhatItCostsClient() {
  const { locale } = useTranslation();
  const l = t[locale] || t.en;
  const c = costsData;

  const hasData = c.lastVerified !== "";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Verified badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-6"
          >
            <Clock className="w-4 h-4 text-text-muted" />
            <span className="text-sm text-text-muted">
              {c.lastVerified ? `${l.badge} ${c.lastVerified}` : l.badgeEmpty}
            </span>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{l.title}</h1>
            <p className="text-lg text-text-secondary">{l.subtitle}</p>
          </motion.div>

          {!hasData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-border-subtle bg-surface/60 p-8 text-center"
            >
              <p className="text-text-muted text-lg">{l.noData}</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Tuition */}
              <SectionCard icon={GraduationCap} title={l.tuitionTitle}>
                <DataRow label={l.czechPublic} value={formatRange(c.tuition.czechTaughtPublic, c.currency)} />
                <DataRow label={l.englishPublic} value={formatRange(c.tuition.englishTaughtPublic, c.currency)} />
                <DataRow label={l.privateUni} value={formatRange(c.tuition.private, c.currency)} />
              </SectionCard>

              {/* Application fees */}
              <SectionCard icon={FileText} title={l.appFeesTitle}>
                <DataRow label={l.appFeesLabel} value={formatRange(c.applicationFees, c.currency)} />
              </SectionCard>

              {/* Document costs */}
              {c.documentCosts.some((d) => d.country !== "") && (
                <SectionCard icon={FileText} title={l.docCostsTitle}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-text-muted border-b border-border-subtle">
                          <th className="text-start py-2 font-medium">{l.country}</th>
                          <th className="text-start py-2 font-medium">{l.apostille}</th>
                          <th className="text-start py-2 font-medium">{l.translation}</th>
                          <th className="text-start py-2 font-medium">{l.note}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {c.documentCosts
                          .filter((d) => d.country !== "")
                          .map((d) => (
                            <tr key={d.country} className="border-b border-border-subtle last:border-0">
                              <td className="py-2 text-text-primary">{d.country}</td>
                              <td className="py-2 text-text-secondary">{formatSingle(d.apostille, c.currency)}</td>
                              <td className="py-2 text-text-secondary">{formatSingle(d.translation, c.currency)}</td>
                              <td className="py-2 text-text-muted text-xs">{d.note || "--"}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>
              )}

              {/* Visa & proof of funds */}
              <SectionCard icon={Plane} title={l.visaTitle}>
                <DataRow label={l.visaFee} value={formatSingle(c.visaFee, c.currency)} />
                <DataRow label={l.financialProof} value={formatSingle(c.financialProofRequired, c.currency)} />
              </SectionCard>

              {/* Insurance */}
              <SectionCard icon={Shield} title={l.insuranceTitle}>
                <DataRow label={l.insuranceLabel} value={formatRange(c.insurance, c.currency)} />
              </SectionCard>

              {/* Living costs */}
              {c.livingCosts.some((lc) => lc.city !== "") && (
                <SectionCard icon={Utensils} title={l.livingTitle}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-text-muted border-b border-border-subtle">
                          <th className="text-start py-2 font-medium">{l.city}</th>
                          <th className="text-start py-2 font-medium">{l.dorm}</th>
                          <th className="text-start py-2 font-medium">{l.rent}</th>
                          <th className="text-start py-2 font-medium">{l.food}</th>
                          <th className="text-start py-2 font-medium">{l.transport}</th>
                          <th className="text-start py-2 font-medium">{l.total}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {c.livingCosts
                          .filter((lc) => lc.city !== "")
                          .map((lc) => (
                            <tr key={lc.city} className="border-b border-border-subtle last:border-0">
                              <td className="py-2 font-medium text-text-primary">{lc.city}</td>
                              <td className="py-2 text-text-secondary">{formatSingle(lc.dormMonthly, c.currency)}</td>
                              <td className="py-2 text-text-secondary">{formatSingle(lc.privateRentMonthly, c.currency)}</td>
                              <td className="py-2 text-text-secondary">{formatSingle(lc.foodMonthly, c.currency)}</td>
                              <td className="py-2 text-text-secondary">{formatSingle(lc.transportMonthly, c.currency)}</td>
                              <td className="py-2 font-semibold text-text-primary">{formatSingle(lc.totalMonthly, c.currency)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>
              )}
            </div>
          )}

          {/* Closing block */}
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 border-s-4 border-accent ps-6 py-4 text-text-secondary italic"
          >
            {l.closing}
          </motion.blockquote>
        </div>
      </main>
      <Footer />
    </>
  );
}
