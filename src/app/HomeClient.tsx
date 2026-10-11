"use client";

import { useTranslation } from "@/i18n/context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { TextReveal } from "@/components/ui/text-reveal";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { PragueSkyline } from "@/components/ui/prague-skyline";
import { StageRouter } from "@/components/stage-router";
import { WaitlistSignup } from "@/components/waitlist-signup";
import { COMMUNITY_SIZE, COMMUNITY_SIZE_AR } from "@/config/contact";
import { EmailSignup } from "@/components/email-signup";
import { OfferBadge, PriceTag } from "@/components/launch-offer";
import { price } from "@/config/pricing";
import {
  GraduationCap,
  BarChart3,
  Compass,
  ShieldAlert,
  Users,
  ClipboardCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "@/components/locale-link";
import { useRef } from "react";

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.05, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function HomeClient() {
  const { t, locale } = useTranslation();
  const copy = HOME_COPY[locale];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const bentoItems = [
    {
      key: "eligibility" as const,
      icon: ClipboardCheck,
      href: "/eligibility",
      hoverEffect: "lift" as const,
      accent: "from-success/20 to-success/5",
      gradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
    },
    {
      key: "matcher" as const,
      icon: Compass,
      href: "/university-matcher",
      hoverEffect: "border" as const,
      accent: "from-success/20 to-success/5",
      gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
    },
    {
      key: "cost" as const,
      icon: BarChart3,
      href: "/cost-of-living",
      hoverEffect: "lift" as const,
      accent: "from-info/20 to-info/5",
      gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
    },
  ];

  return (
    <div className="relative">
      <Navbar />
      <main id="main-content">

      {/* Hero */}
      <section ref={heroRef} className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden sm:min-h-[90vh] flex flex-col justify-center">
        {/* Hero background image with parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src="/images/prague-cityscape.jpg"
            alt="Aerial view of Prague cityscape with Vltava river and historic bridges"
            fill
            className="object-cover object-center scale-110"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/90 via-midnight/75 to-midnight" />
        </motion.div>

        {/* Noise texture */}
        <div className="absolute inset-0 z-[1] noise-overlay opacity-50" />

        {/* Ambient glow effects */}
        <div className="absolute top-20 start-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-40 end-0 w-[500px] h-[500px] bg-info/[0.06] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        {/* Floating decorative shapes */}
        <FloatingShape className="top-32 start-[10%] w-3 h-3 bg-amber/30" delay={0} />
        <FloatingShape className="top-48 end-[15%] w-2 h-2 bg-info/40" delay={1.5} />
        <FloatingShape className="bottom-20 start-[20%] w-4 h-4 bg-success/20" delay={3} />
        <FloatingShape className="top-60 end-[25%] w-2.5 h-2.5 bg-amber/20" delay={0.8} />
        <FloatingShape className="top-40 start-[5%] w-2 h-2 bg-purple-400/20" delay={2} />
        <FloatingShape className="bottom-40 end-[10%] w-3 h-3 bg-info/20" delay={4} />

        <motion.div className="max-w-4xl mx-auto text-center relative z-10" style={{ opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/10 border border-amber/20 text-amber text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {locale === "en" ? `${COMMUNITY_SIZE} community members` : `أكتر من ${COMMUNITY_SIZE_AR} عضو في المجتمع`}
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            <TextReveal text={t.hero.title} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-3"
          >
            <MagneticButton variant="primary" size="lg" href="/eligibility">
              <ClipboardCheck className="w-5 h-5" />
              {copy.heroCta}
            </MagneticButton>
            <p className="text-sm text-text-secondary">{copy.heroNote}</p>
          </motion.div>
        </motion.div>

        {/* Prague skyline silhouette */}
        <PragueSkyline className="absolute bottom-0 inset-x-0 w-full h-[120px] sm:h-[160px]" />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="hidden sm:flex justify-center mt-16 relative z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], height: [4, 8, 4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 rounded-full bg-amber/60"
            />
          </motion.div>
        </motion.div>
      </section>

      <StageRouter />

      <WaitlistSignup className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" />

      {/* Trust bar */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="motion-safe-fallback grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Users, label: locale === "en" ? `${COMMUNITY_SIZE} Facebook group members` : `أكتر من ${COMMUNITY_SIZE_AR} عضو في جروب الفيسبوك` },
            { icon: ShieldAlert, label: locale === "en" ? "Living in Czechia since 2023" : "عايش في التشيك من 2023" },
            { icon: BookOpen, label: locale === "en" ? "7 free tools, no paywall" : "7 أدوات مجانية، بدون حائط دفع" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 * i }}
              className="motion-safe-fallback flex items-center gap-3 px-4 py-3 rounded-xl bg-surface/40 border border-border-subtle backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-amber" />
              </div>
              <span className="text-sm text-text-secondary">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-24">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="motion-safe-fallback text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            {locale === "en" ? "Everything you need in one place" : "كل اللي محتاجه في مكان واحد"}
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            {locale === "en"
              ? "Free tools and guides built by students who have done it before you."
              : "أدوات وأدلة مجانية من طلاب عدوا التجربة دي قبلك."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            const content = t.bento[item.key];
            return (
              <motion.div
                key={item.key}
                initial={{ y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <GlassCard
                  hoverEffect={item.hoverEffect}
                  href={item.href}
                  className="h-full sm:min-h-[180px] group relative overflow-hidden card-shine"
                  ariaLabel={content.title}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
                  <div className="absolute top-0 end-0 w-24 h-24 pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                      <circle cx="80" cy="20" r="60" stroke="currentColor" strokeWidth="0.5" className="text-amber" />
                      <circle cx="80" cy="20" r="40" stroke="currentColor" strokeWidth="0.5" className="text-amber" />
                      <circle cx="80" cy="20" r="20" stroke="currentColor" strokeWidth="0.5" className="text-amber" />
                    </svg>
                  </div>
                  <div className="flex items-start gap-4 relative z-[1]">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center group-hover:border-amber/30 group-hover:bg-amber/5 transition-all duration-300">
                      <Icon className="w-6 h-6 text-amber group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary mb-1.5 group-hover:text-amber transition-colors duration-300">
                        {content.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {content.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-amber mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                        {locale === "en" ? "Explore" : "استكشف"}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
        <p className="text-center text-sm text-text-secondary mt-6">
          {copy.more}{" "}
          <Link href="/why-czechia" className="text-amber hover:underline">{copy.moreWhy}</Link>
          {" · "}
          <Link href="/qa" className="text-amber hover:underline">{copy.moreQa}</Link>
          {" · "}
          <Link href="/programmes" className="text-amber hover:underline">{copy.moreProgrammes}</Link>
        </p>
      </section>

      {/* Course */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <GlassCard hoverEffect="border" className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-6 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              {copy.courseBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">{t.bento.courses.title}</h2>
            <p className="text-sm text-text-secondary leading-relaxed">{t.bento.courses.description}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <PriceTag k="course" locale={locale} className="text-2xl font-bold text-amber" />
            <MagneticButton variant="primary" href="/courses">
              {copy.courseCta}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </MagneticButton>
          </div>
        </GlassCard>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <EmailSignup source="checklist" />
      </div>

      {/* Services CTA band */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="motion-safe-fallback rounded-2xl border border-amber/20 bg-gradient-to-br from-amber/[0.08] to-amber/[0.02] p-8 sm:p-10 text-center"
        >
          <OfferBadge locale={locale} className="mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
            {locale === "en"
              ? "Want me personally in your corner?"
              : "عايز حد يقف جنبك شخصيًا؟"}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto mb-6 leading-relaxed">
            {locale === "en"
              ? "The guides are free and always will be. If you want someone to review your actual documents, prep you for your specific embassy interview, and answer your WhatsApp when something goes wrong — that's what the services are for."
              : "الأدلة مجانية وهتفضل مجانية دايمًا. لكن لو عايز حد يراجع مستنداتك الحقيقية، ويجهزك لمقابلة السفارة بالتحديد، ويرد عليك على الواتساب لما حاجة تحصل — دي وظيفة الخدمات المدفوعة."}
          </p>
          <MagneticButton variant="primary" size="lg" href="/services">
            {locale === "en" ? `See Services — from ${price("consultation")}` : `شوف الخدمات — تبدأ من ${price("consultation", "ar")}`}
          </MagneticButton>
        </motion.div>
      </section>

      </main>

      <Footer />
    </div>
  );
}

const HOME_COPY = {
  en: {
    heroCta: "Can I study in Czechia? 5-minute check",
    heroNote: "Free, no sign-up",
    more: "More:",
    moreWhy: "Why Czechia",
    moreQa: "Questions & answers",
    moreProgrammes: "All programmes",
    courseBadge: "Pre-order · opens 1 January 2027",
    courseCta: "See the course",
  },
  ar: {
    heroCta: "أقدر أدرس في التشيك؟ اختبار 5 دقايق",
    heroNote: "مجاني ومن غير تسجيل",
    more: "كمان:",
    moreWhy: "ليه التشيك",
    moreQa: "أسئلة وأجوبة",
    moreProgrammes: "كل البرامج",
    courseBadge: "حجز مسبق · بيفتح 1 يناير 2027",
    courseCta: "شوف الكورس",
  },
} as const;
