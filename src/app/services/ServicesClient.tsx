"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WHATSAPP_URL, PAYMENT_LINKS, FACEBOOK_GROUP_URL } from "@/config/contact";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Phone,
  FileSearch,
  Mic,
  MapPin,
  Rocket,
  Lightbulb,
  AlertTriangle,
  Target,
  Home,
  MessageCircle,
  Lock,
  ChevronDown,
  Users,
  Globe,
  Shield,
  ShieldAlert,
  Star,
  Award,
  BookOpen,
  Compass,
  Calculator,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const services = [
  {
    key: "consultation" as const,
    icon: Phone,
    triggerIcon: Lightbulb,
    price: "€15",
    priceSub: "(≈ 375 Kc)",
    paymentLink: PAYMENT_LINKS.consultation,
    featured: false,
  },
  {
    key: "documentReview" as const,
    icon: FileSearch,
    triggerIcon: AlertTriangle,
    price: "€25",
    priceSub: "(≈ 625 Kc)",
    paymentLink: PAYMENT_LINKS.documentReview,
    featured: false,
  },
  {
    key: "interviewPrep" as const,
    icon: Mic,
    triggerIcon: Target,
    price: "€39",
    priceSub: "(≈ 975 Kc)",
    paymentLink: "/interview-prep",
    featured: false,
  },
  {
    key: "arrivalSupport" as const,
    icon: MapPin,
    triggerIcon: Home,
    price: "€29",
    priceSub: "(≈ 725 Kc)",
    paymentLink: PAYMENT_LINKS.arrivalSupport,
    featured: false,
  },
  {
    key: "fullPackage" as const,
    icon: Rocket,
    triggerIcon: Lightbulb,
    price: "€350",
    priceSub: "(payable in 2 steps: €150 + €200)",
    paymentLink: PAYMENT_LINKS.fullPackageStep1,
    featured: true,
  },
];

const freeResources = [
  { icon: Compass, key: "matcher" as const },
  { icon: BookOpen, key: "guide" as const },
  { icon: Calculator, key: "costCalc" as const },
  { icon: GraduationCap, key: "scholarships" as const },
  { icon: BookOpen, key: "prepYear" as const },
  { icon: HelpCircle, key: "qaBase" as const },
  { icon: Users, key: "community" as const },
];

export default function ServicesClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />

      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* SECTION 1: Hero */}
        <section className="max-w-3xl mx-auto text-center mb-16 relative rounded-3xl py-4 overflow-hidden">
          {/* Hero background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/students-group.jpg"
              alt="International students celebrating together"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight/85 via-midnight/75 to-midnight/90" />
          </div>
          <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber/[0.06] rounded-full blur-[120px] pointer-events-none" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-5 relative z-10"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-8 relative z-10"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 relative z-10"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              href="#paid-services"
              onClick={() => {
                document.getElementById("paid-services")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t.hero.cta}
            </MagneticButton>
            <MagneticButton variant="secondary" size="lg" href={WHATSAPP_URL}>
              <MessageCircle className="w-5 h-5" />
              {t.hero.whatsappCta}
            </MagneticButton>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10"
          >
            {t.hero.trustBar.map((item, i) => {
              const icons = [Users, Award, MapPin, Globe];
              const Icon = icons[i] ?? Users;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-surface/60 border border-border-subtle"
                >
                  <Icon className="w-4 h-4 text-amber shrink-0" />
                  <span className="text-xs text-text-secondary leading-tight">{item}</span>
                </div>
              );
            })}
          </motion.div>
        </section>

        {/* SECTION 2: Free vs Personal framing */}
        <section className="max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="motion-safe-fallback relative rounded-2xl border border-amber/20 bg-amber/[0.03] px-6 sm:px-8 py-7"
          >
            <div className="absolute top-4 start-4 text-4xl text-amber/20 font-serif leading-none select-none">&ldquo;</div>
            <h2 className="text-lg font-semibold text-text-primary mb-4">{t.framing.title}</h2>
            {t.framing.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-text-secondary leading-relaxed mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </motion.div>
        </section>

        {/* SECTION 3: Free tier card */}
        <section className="max-w-5xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="motion-safe-fallback"
          >
            <div className="rounded-2xl border border-dashed border-border-subtle bg-surface/40 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary text-lg">{t.freeTier.title}</h3>
                  <p className="text-sm text-text-secondary">{t.freeTier.subtitle}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {freeResources.map((res) => {
                  const Icon = res.icon;
                  return (
                    <div key={res.key} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
                      <span>{t.freeTier.items[res.key]}</span>
                    </div>
                  );
                })}
              </div>
              <MagneticButton variant="secondary" href="/qa">
                {t.freeTier.cta}
              </MagneticButton>
            </div>
          </motion.div>
        </section>

        {/* Price anchor block */}
        <section className="max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="motion-safe-fallback text-center text-sm text-text-secondary"
          >
            <p className="font-semibold text-text-primary mb-1">{t.priceAnchor.bold}</p>
            <p>{t.priceAnchor.sub}</p>
          </motion.div>
        </section>

        {/* SECTION 4: Paid service cards */}
        <section id="paid-services" className="max-w-5xl mx-auto mb-16 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {services.slice(0, 3).map((svc, i) => (
              <ServiceCard key={svc.key} svc={svc} t={t} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.slice(3).map((svc, i) => (
              <ServiceCard key={svc.key} svc={svc} t={t} index={i + 3} />
            ))}
          </div>
        </section>

        {/* SECTION 5: About me */}
        <section className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="motion-safe-fallback"
          >
            <GlassCard hoverEffect="border" className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start">
              <div className="w-[220px] h-[220px] rounded-2xl bg-white/5 border border-border-subtle flex items-center justify-center mx-auto md:mx-0 overflow-hidden ring-2 ring-amber/20 shadow-xl">
                <Image
                  src="/images/john.jpg"
                  alt="Joun, founder of Study Czechia"
                  width={220}
                  height={220}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-16 h-16 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg></div>';
                  }}
                />
              </div>
              <div>
                {t.about.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm text-text-secondary leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* SECTION 6: Comparison table */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-6">
            {t.comparison.title}
          </h2>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-start p-3 text-text-muted font-medium"></th>
                  <th className="text-start p-3 text-text-secondary font-medium">{t.comparison.agencyHeader}</th>
                  <th className="text-start p-3 text-amber font-semibold bg-amber/[0.04] rounded-t-xl border-t border-x border-amber/20">
                    {t.comparison.usHeader}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.comparison.rows.map((row, i) => (
                  <tr key={i} className="border-t border-border-subtle">
                    <td className="p-3 text-text-secondary font-medium">{row.label}</td>
                    <td className="p-3 text-text-muted">{row.agency}</td>
                    <td className="p-3 text-text-primary bg-amber/[0.04] border-x border-amber/20 last:rounded-b-xl last:border-b">
                      {row.us}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {t.comparison.rows.map((row, i) => (
              <div key={i} className="rounded-xl border border-border-subtle bg-surface/60 p-4">
                <p className="text-xs text-text-muted font-medium mb-2">{row.label}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-text-muted mb-1">{t.comparison.agencyHeader}</p>
                    <p className="text-sm text-text-secondary">{row.agency}</p>
                  </div>
                  <div className="bg-amber/[0.04] rounded-lg p-2 border border-amber/20">
                    <p className="text-xs text-amber mb-1">{t.comparison.usHeader}</p>
                    <p className="text-sm text-text-primary">{row.us}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: Testimonials */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-6">
            {t.testimonials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <GlassCard key={i} className="flex flex-col justify-between">
                <p className="text-sm text-text-secondary italic leading-relaxed mb-4">
                  {t.testimonials.placeholder}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-border-subtle flex items-center justify-center">
                    <Users className="w-4 h-4 text-text-muted" />
                  </div>
                  <span>{t.testimonials.comingSoon}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Scam warning */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="flex items-start gap-3 rounded-2xl border border-amber/25 bg-amber/[0.06] px-5 py-4">
            <ShieldAlert className="w-5 h-5 text-amber shrink-0 mt-0.5" />
            <p className="text-sm text-text-secondary leading-relaxed">{t.scamWarning}</p>
          </div>
        </section>

        {/* SECTION 8: FAQ */}
        <section className="max-w-2xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-6">
            {t.faq.title}
          </h2>
          <div className="space-y-2">
            {t.faq.items.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border-subtle bg-surface/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-start"
                >
                  <span className="text-sm font-medium text-text-primary">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-text-muted shrink-0 transition-transform duration-200",
                      openFaq === i && "rotate-180"
                    )}
                  />
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
                      <p className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Security notice */}
        <section className="max-w-2xl mx-auto mb-12">
          <div className="flex items-start gap-3 px-5 py-4 rounded-xl border border-border-subtle bg-surface/40 text-sm text-text-muted">
            <Shield className="w-5 h-5 shrink-0 mt-0.5 text-text-muted" />
            <p>{t.securityNotice}</p>
          </div>
        </section>

        {/* SECTION 9: Final CTA */}
        <section className="max-w-xl mx-auto text-center mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-2">{t.finalCta.title}</h2>
          <p className="text-sm text-text-secondary mb-5">{t.finalCta.subtitle}</p>
          <MagneticButton variant="primary" size="lg" href={WHATSAPP_URL}>
            <MessageCircle className="w-5 h-5" />
            {t.finalCta.button}
          </MagneticButton>
        </section>
      </main>

      {/* Floating WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 end-6 z-50 group"
        aria-label="WhatsApp"
      >
        <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        <div className="absolute bottom-full end-0 mb-2 px-3 py-1.5 rounded-lg bg-surface border border-border-subtle text-xs text-text-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {t.whatsappTooltip}
        </div>
      </a>

      <Footer />
    </div>
  );
}

function ServiceCard({
  svc,
  t,
  index,
}: {
  svc: (typeof services)[number];
  t: typeof en;
  index: number;
}) {
  const content = t.services[svc.key];
  const Icon = svc.icon;
  const TriggerIcon = svc.triggerIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="motion-safe-fallback"
    >
      <div
        className={cn(
          "relative rounded-2xl border bg-surface/80 backdrop-blur-sm p-6 h-full flex flex-col transition-shadow hover:shadow-lg",
          svc.featured
            ? "border-amber/40 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
            : "border-border-subtle"
        )}
      >
        {svc.featured && (
          <div className="absolute -top-3 start-4 px-3 py-1 rounded-full bg-amber text-midnight text-xs font-semibold">
            {t.bestValue}
          </div>
        )}

        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-amber" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{content.title}</h3>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-amber">{svc.price}</span>
              {svc.priceSub && (
                <span className="text-xs text-text-muted">{svc.priceSub}</span>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs text-text-muted italic mb-3">{content.fearTrigger}</p>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">{content.description}</p>

        <ul className="space-y-1.5 mb-4 flex-1">
          {content.included.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber shrink-0 mt-0.5" />
              <span className="text-xs">{item}</span>
            </li>
          ))}
        </ul>

        {svc.key === "fullPackage" && "paymentStructure" in content && (
          <div className="rounded-xl bg-white/[0.03] border border-border-subtle p-3 mb-4">
            <p className="text-xs font-medium text-text-primary mb-1">{(content as any).paymentStructure?.header}</p>
            {(content as any).paymentStructure?.steps.map((step: string, i: number) => (
              <p key={i} className="text-xs text-text-secondary">{step}</p>
            ))}
          </div>
        )}

        <div className="flex items-start gap-2 rounded-lg bg-amber/[0.04] border border-amber/15 px-3 py-2 mb-4">
          <TriggerIcon className="w-3.5 h-3.5 text-amber shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary leading-relaxed">{content.triggerLine}</p>
        </div>

        <MagneticButton
          variant={svc.featured ? "primary" : "secondary"}
          href={svc.paymentLink}
          className="w-full"
        >
          {content.cta}
        </MagneticButton>

        <p className="text-center text-xs text-text-muted mt-2">{content.postButton}</p>
      </div>
    </motion.div>
  );
}

// ─── English copy ───────────────────────────────────────────────────────────

const en = {
  hero: {
    title: "Don't Let a Preventable Mistake Cost You a Year",
    subtitle:
      "Every year, students get rejected, not because they aren't qualified, but because of a document mistake, a wrong university choice, or an embassy interview they weren't ready for. I've been through the entire process myself. I can help you avoid what others learn the hard way.",
    trustBar: [
      "12,000+ students in our community",
      "Hundreds of applications guided",
      "Based in Brno, Czech Republic",
      "Egyptian student, been through it all",
    ],
    cta: "See Services & Pricing",
    whatsappCta: "Ask Me First",
  },
  framing: {
    title:
      "Everything You Need to Apply on Your Own Is Free. If You Want Me Personally. That's Below.",
    paragraphs: [
      "I built this site so any Arabic-speaking student can navigate Czech universities without paying anyone. The guides, the university matcher, the Q&A, the cost calculator, the Facebook community, all free, all staying free.",
      "But some students want more than a guide. They want someone to sit with them, review their actual documents, prepare them for their specific embassy interview, and be on the other end of a WhatsApp message when something goes wrong.",
      "That takes my personal time, hours per student. That's what the services below are for. And they cost a fraction of what agencies in Egypt, Jordan, or Iraq charge for worse help.",
    ],
  },
  freeTier: {
    title: "Do It Yourself: Free",
    subtitle: "Most students start here. Many finish here too, and that's completely fine.",
    items: {
      matcher: "Programme Matcher: personalized recommendations in 2 minutes",
      guide: "Full Application Guide: step-by-step, nothing hidden",
      costCalc: "Cost of Living Calculator: Prague, Brno, Ostrava",
      scholarships: "Scholarship Database: updated regularly",
      prepYear: "Preparatory Year Guide: with real prices from real institutions",
      qaBase: "Q&A Knowledge Base: visa, documents, housing, everything",
      community: "Facebook Community: 12,000+ students helping each other",
    },
    cta: "Explore Free Resources →",
  },
  services: {
    consultation: {
      title: "Ask Me Anything: 30 Minutes",
      fearTrigger: "The answer that takes you 3 weeks of forum scrolling takes me 3 minutes.",
      description:
        "A focused call about YOUR specific situation. Not generic advice. I'll look at what you're dealing with and tell you exactly what to do next. Most students book this when they're stuck on something specific, like which university to pick, whether their documents look right, or what to expect at the embassy.",
      included: [
        "30-minute video or voice call (your choice)",
        "I review your situation before the call (send me details via WhatsApp)",
        "Written summary after the call so you don't forget anything",
        "48 hours of follow-up on WhatsApp for quick questions",
      ],
      triggerLine:
        "One wrong assumption about your visa documents can delay your application by 6 months. A 30-minute call can prevent that.",
      cta: "Book a Call (€15)",
      postButton: "🔒 Secure payment via Stripe · Full refund if the call doesn't happen",
    },
    documentReview: {
      title: "Document Check: Before You Submit",
      fearTrigger:
        "I've seen students rejected for a missing apostille, a wrong date format, or a translation that used the wrong legal term. Don't be that student.",
      description:
        "You send me everything you're planning to submit: university application, visa documents, translations, bank statements. I go through every page the way the embassy officer will and tell you what's wrong, what's missing, and what could get flagged. A €25 review can save you from a rejection that costs you an entire semester.",
      included: [
        "Full review of your complete document package",
        "Detailed written report: what's correct, what needs fixing, what's missing",
        "Priority checklist: fix these first, these can wait",
        "Specific guidance on translations, apostilles, and formatting",
        "One follow-up round: fix the issues, send back, I confirm you're good",
      ],
      triggerLine:
        "The embassy doesn't tell you what's wrong, they just say 'rejected.' You won't know which document killed your application unless someone checks before you submit.",
      cta: "Get My Documents Reviewed (€25)",
      postButton: "🔒 Secure payment via Stripe · Send documents via WhatsApp or email",
    },
    interviewPrep: {
      title: "Embassy Interview Prep: Don't Walk In Unprepared",
      fearTrigger: "The interview lasts 10 minutes. The wrong answer lasts 6 months.",
      description:
        "I've coached dozens of students through embassy interviews in Cairo, Amman, Beirut, and other consulates. I know what they ask, what trips people up, and which answers actually work. We'll do a full mock interview together. I'll ask you the actual questions in the same order with the same follow-ups. Then I'll tell you exactly where you're weak and how to fix it. You'll walk into that interview knowing what's coming.",
      included: [
        "45-minute mock interview session (video call)",
        "Real questions from real embassy interviews (updated regularly)",
        "Feedback on your answers, body language, and confidence",
        "Written cheat sheet: the 15 most common questions + ideal answers",
        "Specific coaching on YOUR weak points",
        "WhatsApp support until your interview date",
      ],
      triggerLine:
        "Last year, a student was rejected because he couldn't explain his study plan clearly. His grades were perfect. His documents were perfect. He just wasn't ready for question 6.",
      cta: "See How It Works →",
      postButton: "",
    },
    arrivalSupport: {
      title: "Landed in Czechia? I've Got You.",
      fearTrigger:
        "Your first 2 weeks will be overwhelming. Bank account, foreign police, insurance, transport, phone, and everything is in Czech.",
      description:
        "You just landed. You don't speak Czech. Every sign is confusing. You need to register at the foreign police within 3 days but you don't know where it is or what to bring. Your university sent you 4 emails in Czech and you have no idea what they say. I've been through all of this. I live here. I'll give you a complete first-week plan and be available on WhatsApp to answer every question you're afraid to ask.",
      included: [
        'Personalized "First 2 Weeks" checklist for your specific city',
        "Foreign police registration walkthrough (what to bring, where to go)",
        "Bank account setup guidance (which bank, what documents)",
        "Czech SIM card recommendation (best plan for students)",
        "Transport pass setup",
        "Health insurance verification",
        "14 days of WhatsApp support, ask me anything, anytime",
      ],
      triggerLine:
        "A student last semester missed his foreign police deadline because nobody told him it was 3 business days, not 3 calendar days. He spent 2 months fixing it.",
      cta: "Get My Arrival Plan (€29)",
      postButton: "🔒 Secure payment via Stripe",
    },
    fullPackage: {
      title: "Full Journey: From Zero to Visa",
      fearTrigger:
        "For students who don't want to figure it out alone. I'll be with you from your first question to your first day in Czechia.",
      description:
        "This is everything. We start from wherever you are, even if you haven't picked a country yet, and I walk you through every step until you have your visa and a plan for your first week. You're not buying a service. You're getting someone who's been through this, speaks your language, lives here, and will answer your WhatsApp at midnight when you're panicking about a deadline. Most agencies charge €1,500–€3,000 and they're sitting in Cairo googling the same things you are. I'm in Brno, 20 minutes from the foreign police office.",
      included: [
        "University & program selection (based on your grades, budget, and goals)",
        "Full document preparation guidance",
        "Translation coordination (what needs apostille, what needs official translation, where to get it done right)",
        "Complete visa application walkthrough",
        "Embassy interview prep (mock interview included)",
        "Housing guidance for your first months",
        '"First Week in Czechia" plan: SIM card, bank account, transport pass, foreign police registration, insurance, everything',
        "Direct WhatsApp access to me throughout the process",
        "30 days of support after you arrive in Czechia",
        '"Your First 90 Days in Czechia" course, included free',
      ],
      triggerLine:
        "Students who go through this process alone spend an average of 3 months longer figuring things out, and many apply to the wrong program or miss a deadline they didn't know existed.",
      cta: "Start My Application (€150)",
      postButton:
        "🔒 Secure payment via Stripe · Also available via InstaPay 🇪🇬 · Not sure yet? Message me on WhatsApp first, no pressure.",
      paymentStructure: {
        header: "💳 Pay in 2 steps:",
        steps: [
          "Step 1: €150, starts the process (university selection + document plan)",
          "Step 2: €200, after documents are reviewed, before visa submission",
          "Total: €350 (agencies charge €1,500+ for less)",
        ],
      },
    },
  },
  about: {
    paragraphs: [
      "I'm John, an Egyptian student in my final year at Brno University of Technology. I went through the entire Czech university application process myself. The confusing research, the piles of documents, the stressful embassy interview, those first weeks of being completely lost in a country where I didn't speak the language.",
      "I started a Facebook group to answer questions for other Arabic-speaking students. It grew to 12,000+ members. This website is the next step, putting everything I've learned into one place so you don't have to go through what I went through.",
      "The free resources are for everyone. The paid services are for students who want me personally in their corner.",
    ],
  },
  comparison: {
    title: "Why Students Choose Us Over Traditional Agencies",
    agencyHeader: "Typical Agency",
    usHeader: "Study in Czechia",
    rows: [
      { label: "Where they're based", agency: "In your country, never been to Czechia", us: "In Brno, Czech Republic, living here now" },
      { label: "Their experience", agency: "Read about the process online", us: "Went through the entire process personally" },
      { label: "Language", agency: "Arabic only", us: "Arabic, English, and Czech" },
      { label: "Price for full support", agency: "€1,500 – €3,000", us: "€350 (payable in 2 steps)" },
      { label: "Free resources included", agency: "None, everything behind a paywall", us: "Full website, guides, tools, community" },
      { label: "Post-arrival help", agency: "None, their job ends at the airport", us: "30 days of support after you land" },
      { label: "Embassy interview prep", agency: "Generic tips from a PDF", us: "Live mock interview with real questions" },
      { label: "Refund if not satisfied", agency: "Almost never", us: "Message within 48 hours, full refund" },
      { label: "Community", agency: "You're a client number", us: "Join 12,000+ students helping each other" },
    ],
  },
  testimonials: {
    title: "Students Who Were in Your Exact Situation",
    placeholder: `"Testimonials coming soon, we're collecting stories from students in our community."`,
    comingSoon: "Coming soon",
  },
  scamWarning:
    "We never ask for payment through unofficial WhatsApp numbers or DMs claiming to be us. All paid services are booked through this website only.",
  faq: {
    title: "Common Questions",
    items: [
      {
        q: "Why should I pay when the guides are free?",
        a: "The guides teach you the process. The services are me personally reviewing YOUR specific documents, YOUR specific situation, and answering YOUR specific questions. It's the difference between reading a medical textbook and seeing a doctor. The textbook is free. The doctor's time isn't.",
      },
      {
        q: "How is this different from an agency?",
        a: "Agencies in Egypt or Jordan sell you a package and disappear. They've never been to Czechia. They don't know which foreign police office is less crowded on Tuesdays. They can't tell you which dorm to avoid. I live here. I went through this. And I cost a fraction of what they charge.",
      },
      {
        q: "What if I pay and I'm not satisfied?",
        a: "Message me within 48 hours of any service and I'll refund you completely. No questions, no forms, no waiting. I'd rather give your money back than have an unhappy student in the community.",
      },
      {
        q: "Is it safe to pay online?",
        a: "Payments are processed by Stripe, the same company that handles payments for Amazon, Google, and Shopify. I never see your card number. If you're in Egypt and prefer InstaPay, that works too, just message me on WhatsApp.",
      },
      {
        q: "Can I just message you on WhatsApp for free?",
        a: "Of course, and I answer questions in the Facebook group every day for free. But if you need me to spend 2 hours reviewing your documents or 45 minutes doing a mock interview, that's what the paid services are for. Quick questions? Always free. Deep personal work? That's the service.",
      },
      {
        q: "I found a cheaper agency. Why not use them?",
        a: "Ask them three questions: Have you personally been to Czechia? Can you do a mock embassy interview with real questions? Will you help me after I land? If the answer to any of these is no, you're paying for a middleman who Googles things for you.",
      },
      {
        q: "What if my visa gets rejected even after using your service?",
        a: "I help you build the strongest possible application, but I can't guarantee embassy decisions. Nobody can. Anyone who promises a 'guaranteed visa' is lying to you. What I can tell you is that students I've worked with have a much higher approval rate because we catch the mistakes that cause most rejections.",
      },
    ],
  },
  priceAnchor: {
    bold: "Most agencies charge $800-$3,000 for application support.",
    sub: "Mine is €350, paid in two steps. Not because it's less work, because I'm one student who lives here, not an office with overheads in four cities.",
  },
  securityNotice:
    "We never ask for payment through unofficial WhatsApp numbers or DMs claiming to be us. All paid services are booked through this website only.",
  finalCta: {
    title: "Not sure where to start?",
    subtitle:
      "Message me on WhatsApp. Tell me your situation. I'll tell you honestly whether you need a paid service or if the free guides are enough.",
    button: "Message on WhatsApp",
  },
  bestValue: "Best Value",
  whatsappTooltip: "Not sure which service? Ask me, no pressure.",
};

// ─── Arabic copy ────────────────────────────────────────────────────────────

const ar: typeof en = {
  hero: {
    title: "ماتخليش غلطة ممكن تتفاديها تكلفك سنة كاملة",
    subtitle:
      "كل سنة، طلاب بيترفضوا. مش عشان مش مؤهلين، بس عشان غلطة في ورقة، أو اختيار جامعة غلط، أو مقابلة سفارة ماكانوش جاهزين ليها. أنا عديت العملية كلها بنفسي. أقدر أساعدك تتفادى اللي غيرك اتعلموه بالطريقة الصعبة.",
    trustBar: [
      "أكتر من 12,000 طالب في مجتمعنا",
      "مئات الطلبات اتوجهت",
      "مقيم في برنو، جمهورية التشيك",
      "طالب مصري، عديت التجربة كلها",
    ],
    cta: "شوف الخدمات والأسعار",
    whatsappCta: "اسألني الأول",
  },
  framing: {
    title: "كل اللي محتاجه عشان تقدم لوحدك مجاني. لو عايزني أنا شخصيًا، ده تحت.",
    paragraphs: [
      "أنا بنيت الموقع ده عشان أي طالب عربي يقدر يتعامل مع الجامعات التشيكية من غير ما يدفع لحد. الأدلة، اختيار الجامعة، الأسئلة والأجوبة، حاسبة التكاليف، جروب الفيسبوك. كله مجاني وهيفضل مجاني.",
      "بس فيه طلاب عايزين أكتر من دليل. عايزين حد يقعد معاهم، يراجع أوراقهم، يجهزهم لمقابلة السفارة، ويرد على رسائلهم على واتساب لما حاجة تغلط.",
      "ده بياخد وقتي الشخصي. ساعات لكل طالب. ده اللي الخدمات تحت دي عشانه. وبتكلف جزء صغير من اللي المكاتب في مصر أو الأردن أو العراق بتاخده على مساعدة أقل.",
    ],
  },
  freeTier: {
    title: "اعملها بنفسك: مجانًا",
    subtitle: "معظم الطلاب بيبدأوا هنا. وكتير بيخلصوا هنا كمان. وده تمام خالص.",
    items: {
      matcher: "اختيار الجامعة: ترشيحات مخصصة في دقيقتين",
      guide: "دليل التقديم الكامل: خطوة بخطوة، مفيش حاجة مخبية",
      costCalc: "حاسبة تكاليف المعيشة: براغ، برنو، أوسترافا",
      scholarships: "قاعدة بيانات المنح: بتتحدث بانتظام",
      prepYear: "دليل السنة التحضيرية: بأسعار حقيقية من مؤسسات حقيقية",
      qaBase: "أسئلة وأجوبة: فيزا، أوراق، سكن، كل حاجة",
      community: "جروب الفيسبوك: أكتر من 12,000 طالب بيساعدوا بعض",
    },
    cta: "استكشف الموارد المجانية →",
  },
  services: {
    consultation: {
      title: "اسألني أي حاجة: 30 دقيقة",
      fearTrigger: "الإجابة اللي بتاخد منك 3 أسابيع بحث في المنتديات بتاخد مني 3 دقايق.",
      description: "مكالمة مركزة عن وضعك أنت تحديدًا. مش نصايح عامة. هبص على وضعك وهقولك بالظبط تعمل إيه. معظم الطلاب بيحجزوا لما بيكونوا واقفين عند حاجة معينة.",
      included: [
        "مكالمة فيديو أو صوت 30 دقيقة (اختيارك)",
        "براجع وضعك قبل المكالمة (ابعتلي التفاصيل على واتساب)",
        "ملخص مكتوب بعد المكالمة. عشان ماتنساش حاجة",
        "48 ساعة متابعة على واتساب لأسئلة سريعة",
      ],
      triggerLine: "افتراض غلط واحد عن أوراق الفيزا ممكن يأخر طلبك 6 شهور. مكالمة 30 دقيقة ممكن تمنع ده.",
      cta: "احجز مكالمة (15€)",
      postButton: "🔒 دفع آمن عبر Stripe · استرداد كامل لو المكالمة ماتمتش",
    },
    documentReview: {
      title: "مراجعة الأوراق: قبل ما تقدم",
      fearTrigger: "شفت طلاب اترفضوا بسبب ابوستيل ناقص، أو تاريخ بصيغة غلط، أو ترجمة استخدمت مصطلح قانوني غلط. ماتكونش الطالب ده.",
      description: "ابعتلي كل حاجة ناوي تقدمها. طلب الجامعة، أوراق الفيزا، الترجمات، كشف الحساب. براجع كل صفحة زي ما موظف السفارة هيعمل. مراجعة بـ 25€ ممكن تنقذك من رفض بيكلفك فصل كامل.",
      included: [
        "مراجعة كاملة لكل الأوراق",
        "تقرير مكتوب مفصل: الصحيح، اللي محتاج تعديل، الناقص",
        "قائمة أولويات: صلح دول الأول، دول يستنوا",
        "توجيه خاص للترجمات والابوستيل والتنسيق",
        "جولة متابعة: صلح المشاكل، ابعت تاني، بأكدلك إن كله تمام",
      ],
      triggerLine: 'السفارة مش بتقولك إيه الغلط. بس بتقول "مرفوض." مش هتعرف أي ورقة وقعت طلبك غير لما حد يراجع قبل ما تقدم.',
      cta: "راجع أوراقي (25€)",
      postButton: "🔒 دفع آمن عبر Stripe · ابعت الأوراق على واتساب أو إيميل",
    },
    interviewPrep: {
      title: "تجهيز مقابلة السفارة: ماتروحش من غير تحضير",
      fearTrigger: "المقابلة بتاخد 10 دقايق. الإجابة الغلط بتكلفك 6 شهور.",
      description: "دربت عشرات الطلاب على مقابلات السفارة في القاهرة وعمان وبيروت. بعرف الأسئلة والفخاخ والإجابات الصح. هنعمل مقابلة تجريبية كاملة مع بعض. هتدخل المقابلة وأنت عارف ايه الجاي.",
      included: [
        "جلسة مقابلة تجريبية 45 دقيقة (فيديو)",
        "أسئلة حقيقية من مقابلات سفارة حقيقية",
        "تعليق على إجاباتك ولغة جسدك وثقتك",
        "ورقة مكتوبة: أكتر 15 سؤال شائع + الإجابات المثالية",
        "تدريب خاص على نقاط ضعفك أنت",
        "دعم واتساب لحد موعد مقابلتك",
      ],
      triggerLine: "السنة اللي فاتت، طالب اترفض عشان ماعرفش يشرح خطته الدراسية بوضوح. درجاته كانت ممتازة. أوراقه كانت كاملة. بس ماكانش جاهز للسؤال رقم 6.",
      cta: "شوف التفاصيل →",
      postButton: "",
    },
    arrivalSupport: {
      title: "وصلت التشيك؟ أنا معاك.",
      fearTrigger: "أول أسبوعين هيكونوا صعبين. حساب بنكي، شرطة الأجانب، تأمين، مواصلات، موبايل. وكل حاجة بالتشيكي.",
      description: "لسه واصل. مش بتتكلم تشيكي. كل لافتة محيرة. أنا عديت كل ده. أنا ساكن هنا. هديك خطة كاملة لأول أسبوع وهكون متاح على واتساب أجاوب على كل سؤال.",
      included: [
        `قائمة "أول أسبوعين" مخصصة لمدينتك`,
        "شرح تسجيل شرطة الأجانب (إيه تجيب، تروح فين)",
        "توجيه فتح حساب بنكي (أي بنك، أي أوراق)",
        "توصية شريحة موبايل (أحسن باقة للطلاب)",
        "إعداد اشتراك المواصلات",
        "تحقق من التأمين الصحي",
        "14 يوم دعم واتساب. اسأل أي حاجة، في أي وقت",
      ],
      triggerLine: "طالب الفصل اللي فات فاته موعد شرطة الأجانب عشان ماحدش قاله إنه 3 أيام عمل، مش 3 أيام عادية. قعد شهرين يصلحها.",
      cta: "احصل على خطة وصولي (29€)",
      postButton: "🔒 دفع آمن عبر Stripe",
    },
    fullPackage: {
      title: "الرحلة الكاملة: من الصفر للفيزا",
      fearTrigger: "للطلاب اللي مش عايزين يعملوها لوحدهم. هكون معاك من أول سؤال لأول يوم في التشيك.",
      description: "ده كل حاجة. بنبدأ من أي مكان أنت فيه، حتى لو لسه مااخترتش بلد، وبمشي معاك كل خطوة لحد ما تاخد الفيزا. مش بتشتري خدمة. بتجيب شخص عدى التجربة، بيتكلم لغتك وساكن هنا. المكاتب بتاخد 1,500€–3,000€. أنا في برنو، 20 دقيقة من شرطة الأجانب.",
      included: [
        "اختيار الجامعة والتخصص (حسب درجاتك وميزانيتك وأهدافك)",
        "توجيه كامل لتجهيز الأوراق",
        "تنسيق الترجمات (إيه محتاج ابوستيل، إيه محتاج ترجمة رسمية)",
        "شرح كامل لطلب الفيزا",
        "تجهيز مقابلة السفارة (مقابلة تجريبية متضمنة)",
        "توجيه سكن لأول شهور",
        `خطة "أول أسبوع": شريحة، بنك، مواصلات، شرطة الأجانب، تأمين. كل حاجة`,
        "تواصل مباشر معايا على واتساب طول العملية",
        "30 يوم دعم بعد وصولك التشيك",
        `كورس "أول 90 يوم في التشيك". مجانًا`,
      ],
      triggerLine: "الطلاب اللي بيعملوا العملية لوحدهم بياخدوا في المتوسط 3 شهور أكتر. وكتير بيقدموا على البرنامج الغلط أو بيفوتهم موعد ماكانوش يعرفوا بيه.",
      cta: "ابدأ طلبي (150€)",
      postButton: "🔒 دفع آمن عبر Stripe · متاح كمان بـ InstaPay 🇪🇬 · مش متأكد؟ راسلني على واتساب الأول. من غير ضغط.",
      paymentStructure: {
        header: "💳 ادفع على خطوتين:",
        steps: [
          "الخطوة 1: 150€، بتبدأ العملية (اختيار الجامعة + خطة الأوراق)",
          "الخطوة 2: 200€، بعد مراجعة الأوراق، قبل تقديم الفيزا",
          "الإجمالي: 350€ (المكاتب بتاخد 1,500€+ على أقل)",
        ],
      },
    },
  },
  about: {
    paragraphs: [
      "أنا جون، طالب مصري في السنة الأخيرة في جامعة برنو التقنية. عديت عملية التقديم للجامعات التشيكية كلها بنفسي. البحث المحير، فوضى الأوراق، ضغط مقابلة السفارة، أول أسابيع ضايع تمامًا في بلد مابعرفش لغته.",
      "بدأت جروب فيسبوك عشان أجاوب على أسئلة الطلاب العرب. كبر لأكتر من 12,000 عضو. الموقع ده الخطوة التالية. كل اللي اتعلمته في مكان واحد عشان ماتعديش اللي أنا عديته.",
      "الموارد المجانية للجميع. الخدمات المدفوعة للطلاب اللي عايزيني أنا شخصيًا في جانبهم.",
    ],
  },
  comparison: {
    title: "ليه الطلاب بيختارونا عن المكاتب التقليدية",
    agencyHeader: "وكالة عادية",
    usHeader: "Study in Czechia",
    rows: [
      { label: "مكانهم", agency: "في بلدك. عمرهم ماراحوا التشيك", us: "في برنو، التشيك. ساكن هنا دلوقتي" },
      { label: "خبرتهم", agency: "قريوا عن العملية أونلاين", us: "عديت العملية كلها بنفسي" },
      { label: "اللغة", agency: "عربي بس", us: "عربي، إنجليزي، وتشيكي" },
      { label: "سعر الدعم الكامل", agency: "1,500€ – 3,000€", us: "350€ (على خطوتين)" },
      { label: "موارد مجانية", agency: "مفيش، كل حاجة بفلوس", us: "موقع كامل، أدلة، أدوات، مجتمع" },
      { label: "دعم بعد الوصول", agency: "مفيش، شغلهم بيخلص في المطار", us: "30 يوم دعم بعد وصولك" },
      { label: "تجهيز مقابلة السفارة", agency: "نصايح عامة من PDF", us: "مقابلة تجريبية حية بأسئلة حقيقية" },
      { label: "استرداد", agency: "تقريبًا مستحيل", us: "راسل خلال 48 ساعة، استرداد كامل" },
      { label: "المجتمع", agency: "أنت رقم عميل", us: "انضم لأكتر من 12,000 طالب بيساعدوا بعض" },
    ],
  },
  testimonials: {
    title: "طلاب كانوا في نفس موقفك بالظبط",
    placeholder: `"التجارب قريبًا. بنجمع قصص من طلاب في مجتمعنا."`,
    comingSoon: "قريبًا",
  },
  scamWarning: "إحنا مش بنطلب فلوس على أي رقم واتساب غير رسمي أو رسايل خاصة بتدعي إنها منّا. كل الخدمات المدفوعة بتتحجز من الموقع ده بس.",
  faq: {
    title: "أسئلة شائعة",
    items: [
      { q: "ليه أدفع والأدلة مجانية؟", a: "الأدلة بتعلمك العملية. الخدمات هي أنا شخصيًا براجع أوراقك أنت ووضعك أنت وبجاوب أسئلتك أنت. الفرق بين إنك تقرأ كتاب طب وإنك تروح لدكتور." },
      { q: "إيه الفرق بينكم وبين مكتب؟", a: "المكاتب في مصر أو الأردن بيبيعوك باكيج وبيختفوا. عمرهم ماراحوا التشيك. أنا ساكن هنا. عديت التجربة. وبكلف جزء صغير من سعرهم." },
      { q: "لو دفعت ومش راضي؟", a: "راسلني خلال 48 ساعة وهرجعلك فلوسك كلها. بدون أسئلة، بدون نماذج، بدون انتظار." },
      { q: "الدفع أونلاين آمن؟", a: "المدفوعات بتتعالج عن طريق Stripe. نفس الشركة اللي بتشتغل مع Amazon و Google. مش بشوف رقم كارتك. لو في مصر وتفضل InstaPay، برضو تمام. راسلني على واتساب." },
      { q: "أقدر أراسلك على واتساب بلاش؟", a: "طبعًا. وبجاوب أسئلة في جروب الفيسبوك كل يوم بالمجان. بس لو محتاج ساعتين مراجعة أوراق أو 45 دقيقة مقابلة تجريبية، ده اللي الخدمات عشانه." },
      { q: "لقيت مكتب أرخص. ليه ماستخدمهمش؟", a: "اسألهم 3 أسئلة: راحوا التشيك قبل كده؟ يقدروا يعملوا مقابلة تجريبية بأسئلة حقيقية؟ هيساعدوك بعد ما توصل؟ لو الإجابة لأ على أي واحد، بتدفع لوسيط بيعملك Google." },
      { q: "لو الفيزا اترفضت رغم الخدمة؟", a: `بساعدك تبني أقوى طلب ممكن، بس مش بضمن قرارات السفارة. محدش يقدر. أي حد يوعدك ب"فيزا مضمونة" بيكدب عليك. الطلاب اللي اشتغلت معاهم عندهم معدل قبول أعلى بكتير عشان بنمسك الأخطاء اللي بتسبب معظم الرفض.` },
    ],
  },
  priceAnchor: {
    bold: "اغلب الوكالات بتاخد $800-$3,000 على دعم التقديم.",
    sub: "عندي €350، على خطوتين. مش عشان الشغل أقل، عشان أنا طالب عايش هنا، مش مكتب بمصاريف في 4 مدن.",
  },
  securityNotice:
    "احنا عمرنا ما بنطلب دفع من خلال ارقام واتساب غير رسمية او رسائل بتدعي انها مننا. كل الخدمات المدفوعة بتتحجز من الموقع ده بس.",
  finalCta: {
    title: "مش متأكد تبدأ منين؟",
    subtitle: "راسلني على واتساب. قولي وضعك. هقولك بصراحة لو محتاج خدمة مدفوعة ولا الأدلة المجانية كفاية.",
    button: "راسل على واتساب",
  },
  bestValue: "الأفضل قيمة",
  whatsappTooltip: "مش متأكد من أي خدمة؟ اسألني. من غير ضغط.",
};
