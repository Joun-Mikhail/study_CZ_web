"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { universityPrograms, otherUniversities, privatePrograms, usefulLinks } from "@/data/preparatory-programs";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, BookOpen, Clock, Shield, Users, Home, Award,
  ChevronDown, ChevronRight, Mail, Globe, ExternalLink, AlertTriangle,
  Lightbulb, MapPin, Filter, Building2, Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/translations";
import Image from "next/image";

const whyIcons = [GraduationCap, BookOpen, Award, Shield, Globe, Users, Home];

export default function PreparatoryYearPage() {
  const { t, locale } = useTranslation();
  const [cityFilter, setCityFilter] = useState("all");
  const [langFilter, setLangFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cities = useMemo(() => {
    const set = new Set(universityPrograms.map((p) => p.city));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return universityPrograms.filter((p) => {
      if (cityFilter !== "all" && p.city !== cityFilter) return false;
      if (langFilter === "czech" && p.language === "english") return false;
      if (langFilter === "english" && p.language === "czech") return false;
      return true;
    });
  }, [cityFilter, langFilter]);

  const brnoPrograms = universityPrograms.filter((p) => p.city === "Brno");

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>

      {/* Hero banner */}
      <section className="pt-28 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full h-[140px] sm:h-[190px] rounded-2xl overflow-hidden">
            <Image
              src="/images/prague-scenic.jpg"
              alt="Aerial view of Prague Old Town"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/10 border border-amber/20 text-amber text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              {locale === "ar" ? "السنة التحضيرية" : "Foundation Year"}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t.prep.title}
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {t.prep.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Do a Preparatory Year */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>{t.prep.whyTitle}</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.prep.why.map((item, i) => {
              const Icon = whyIcons[i] || GraduationCap;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <GlassCard className="h-full">
                    <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-amber" />
                    </div>
                    <h3 className="font-semibold text-text-primary text-sm mb-1.5">{item.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Types of Programs */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>{t.prep.typesTitle}</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.prep.types.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="h-full" hoverEffect="lift">
                  <h3 className="font-semibold text-text-primary mb-3">{type.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Clock className="w-3.5 h-3.5 text-amber shrink-0" />
                      {type.duration}
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <BookOpen className="w-3.5 h-3.5 text-amber shrink-0" />
                      {type.intensity}
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Shield className="w-3.5 h-3.5 text-amber shrink-0" />
                      {locale === "ar" ? "تأشيرة:" : "Visa:"} {type.visa}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-text-muted leading-relaxed">{type.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* University Programs & Pricing */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>{t.prep.programsTitle}</SectionHeading>
          <p className="text-xs text-text-muted text-center mb-6 -mt-4">{t.prep.programsNote}</p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-text-muted" />
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-border-subtle bg-transparent text-sm text-text-secondary focus:outline-none focus:border-amber/50"
              >
                <option value="all">{t.prep.filterCity}</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-border-subtle bg-transparent text-sm text-text-secondary focus:outline-none focus:border-amber/50"
            >
              <option value="all">{t.prep.filterLang}</option>
              <option value="czech">{t.prep.filterCzech}</option>
              <option value="english">{t.prep.filterEnglish}</option>
            </select>
          </div>

          <div className="space-y-6">
            {filtered.map((prog) => (
              <ProgramCard key={prog.id} prog={prog} locale={locale} t={t} />
            ))}
          </div>

          {/* Other Public Universities */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{t.prep.otherTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {otherUniversities.map((u) => (
                <a
                  key={u.name}
                  href={u.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle bg-surface/60 hover:border-amber/30 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-amber shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{u.name}</p>
                    <p className="text-xs text-text-muted">{u.city}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-text-muted ms-auto" />
                </a>
              ))}
            </div>
          </div>

          {/* Private Programs */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-text-primary mb-3">{t.prep.privateTitle}</h3>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber/5 border border-amber/20 mb-5">
              <AlertTriangle className="w-4 h-4 text-amber shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-relaxed">{t.prep.privateWarning}</p>
            </div>
            <div className="space-y-4">
              {privatePrograms.map((prog) => (
                <ProgramCard key={prog.id} prog={prog} locale={locale} t={t} isPrivate />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Enrollment */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionHeading>{t.prep.stepsTitle}</SectionHeading>
          <div className="relative">
            <div className="absolute start-5 top-0 bottom-0 w-px bg-border-subtle" />
            <div className="space-y-6">
              {t.prep.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: locale === "ar" ? 16 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="relative flex gap-4 items-start"
                >
                  <div className="relative z-10 w-10 h-10 rounded-full bg-amber/10 border border-amber/30 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-amber">{i + 1}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed pt-2.5">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visa & Residence */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>{t.prep.visaTitle}</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <GlassCard hoverEffect="border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-500" />
                </div>
                <h3 className="font-semibold text-text-primary text-sm">
                  {locale === "ar" ? "غرض \"دراسة\" ✓" : "Purpose: \"Study\" ✓"}
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{t.prep.visaStudy}</p>
            </GlassCard>
            <GlassCard hoverEffect="border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-amber" />
                </div>
                <h3 className="font-semibold text-text-primary text-sm">
                  {locale === "ar" ? "غرض \"أخرى\" ⚠" : "Purpose: \"Other\" ⚠"}
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{t.prep.visaOther}</p>
            </GlassCard>
          </div>

          <GlassCard>
            <h4 className="font-semibold text-text-primary text-sm mb-3">{t.prep.visaDocs}</h4>
            <ul className="space-y-2">
              {t.prep.visaDocsList.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <ChevronRight className="w-3.5 h-3.5 text-amber shrink-0 mt-0.5 rtl:rotate-180" />
                  {doc}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-text-muted">{t.prep.visaProcessing}</p>
            <div className="mt-3 p-3 rounded-lg bg-amber/5 border border-amber/20">
              <p className="text-xs text-text-secondary">{t.prep.visaEu}</p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Brno-Specific Options */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>{t.prep.brnoTitle}</SectionHeading>
          <p className="text-sm text-text-secondary text-center mb-6 -mt-4">{t.prep.brnoSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {brnoPrograms.map((prog) => (
              <GlassCard key={prog.id} hoverEffect="lift" className="h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#d42127]" />
                  <h3 className="font-semibold text-text-primary text-sm">{prog.university}</h3>
                </div>
                {prog.note && (
                  <p className="text-xs text-text-muted leading-relaxed mb-3">{prog.note[locale]}</p>
                )}
                <div className="space-y-2 flex-1">
                  {prog.programs.map((p, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-surface/60 border border-border-subtle">
                      <p className="text-xs font-medium text-text-primary">{p.name[locale]}</p>
                      <div className="flex items-center gap-3 mt-1">
                        {p.priceEur && (
                          <span className="text-xs font-semibold text-amber">€{p.priceEur.toLocaleString()}</span>
                        )}
                        {p.priceCzk && (
                          <span className="text-xs text-text-muted">{p.priceCzk.toLocaleString()} CZK</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href={prog.website.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber hover:underline"
                >
                  <Globe className="w-3 h-3" />
                  {prog.website.label}
                </a>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Tips & Advice */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>{t.prep.tipsTitle}</SectionHeading>
          <div className="space-y-3">
            {t.prep.tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-amber/20 bg-amber/5"
              >
                <Lightbulb className="w-5 h-5 text-amber shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary text-sm mb-0.5">{tip.title}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionHeading>{t.prep.faqTitle}</SectionHeading>
          <div className="space-y-2">
            {t.prep.faq.map((item, i) => (
              <div key={i} className="rounded-xl border border-border-subtle overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-start"
                >
                  <span className="text-sm font-medium text-text-primary">{item.q}</span>
                  <ChevronDown className={cn("w-4 h-4 text-text-muted shrink-0 transition-transform", openFaq === i && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-text-secondary leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.prep.faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      {/* Useful Links */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>{t.prep.linksTitle}</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {usefulLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border-subtle bg-surface/60 hover:border-amber/30 transition-colors group"
              >
                <ExternalLink className="w-4 h-4 text-amber shrink-0" />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{link.label[locale]}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-text-primary text-center mb-8">{children}</h2>
  );
}

function ProgramCard({
  prog,
  locale,
  t,
  isPrivate,
}: {
  prog: (typeof universityPrograms)[number];
  locale: Locale;
  t: any;
  isPrivate?: boolean;
}) {
  return (
    <GlassCard hoverEffect="border">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-text-primary">{prog.university}</h3>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-3 h-3 text-text-muted" />
            <span className="text-xs text-text-muted">{prog.city}</span>
            {isPrivate && (
              <span className="px-2 py-0.5 rounded-full bg-amber/10 text-amber text-[10px] font-medium border border-amber/20">
                {locale === "ar" ? "خاص" : "Private"}
              </span>
            )}
          </div>
        </div>
        <Languages className="w-5 h-5 text-amber shrink-0" />
      </div>

      {prog.note && (
        <p className="text-xs text-text-muted leading-relaxed mb-3">{prog.note[locale]}</p>
      )}

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-xs min-w-[400px]">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-start text-text-muted font-medium py-2 px-2">
                {locale === "ar" ? "البرنامج" : "Program"}
              </th>
              {prog.programs.some((p) => p.intensity) && (
                <th className="text-start text-text-muted font-medium py-2 px-2">
                  {locale === "ar" ? "الكثافة" : "Intensity"}
                </th>
              )}
              <th className="text-end text-text-muted font-medium py-2 px-2">{t.prep.priceEur}</th>
              <th className="text-end text-text-muted font-medium py-2 px-2">{t.prep.priceCzk}</th>
            </tr>
          </thead>
          <tbody>
            {prog.programs.map((p, i) => (
              <tr key={i} className="border-b border-border-subtle/50 last:border-0">
                <td className="py-2 px-2 text-text-primary font-medium">{p.name[locale]}</td>
                {prog.programs.some((pp) => pp.intensity) && (
                  <td className="py-2 px-2 text-text-secondary">{p.intensity || "—"}</td>
                )}
                <td className="py-2 px-2 text-end font-semibold text-amber">
                  {p.priceEur ? `€${p.priceEur.toLocaleString()}` : p.priceNote || "—"}
                </td>
                <td className="py-2 px-2 text-end text-text-secondary">
                  {p.priceCzk ? p.priceCzk.toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-border-subtle">
        {prog.contact.email && (
          <a href={`mailto:${prog.contact.email}`} className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-amber transition-colors">
            <Mail className="w-3 h-3" />
            {prog.contact.email}
          </a>
        )}
        <a href={prog.website.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-amber hover:underline">
          <Globe className="w-3 h-3" />
          {prog.website.label}
        </a>
      </div>
    </GlassCard>
  );
}
