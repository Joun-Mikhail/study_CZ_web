"use client";

import { useTranslation } from "@/i18n/context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { TextReveal } from "@/components/ui/text-reveal";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { PragueSkyline } from "@/components/ui/prague-skyline";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionDivider } from "@/components/ui/section-divider";
import {
  GraduationCap,
  BarChart3,
  Compass,
  MessageCircleQuestion,
  ShieldAlert,
  Users,
  Briefcase,
  ClipboardCheck,
  BookOpen,
  Banknote,
  Award,
  Plane,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { FACEBOOK_GROUP_URL } from "@/config/contact";
import { VerifiedBadge } from "@/components/ui/verified-badge";

function FloatingShape({ className }: { className?: string }) {
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
      }}
    />
  );
}

export default function Home() {
  const { t, locale } = useTranslation();

  const bentoItems = [
    {
      key: "courses" as const,
      icon: GraduationCap,
      href: "/courses",
      hoverEffect: "glow" as const,
      accent: "from-amber/20 to-amber/5",
      gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    },
    {
      key: "cost" as const,
      icon: BarChart3,
      href: "/cost-of-living",
      hoverEffect: "lift" as const,
      accent: "from-info/20 to-info/5",
      gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
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
      key: "qa" as const,
      icon: MessageCircleQuestion,
      href: "/qa",
      hoverEffect: "glow" as const,
      accent: "from-purple-500/20 to-purple-500/5",
      gradient: "from-purple-500/10 via-violet-500/5 to-transparent",
    },
    {
      key: "services" as const,
      icon: Briefcase,
      href: "/services",
      hoverEffect: "border" as const,
      accent: "from-amber/20 to-amber/5",
      gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
    },
    {
      key: "eligibility" as const,
      icon: ClipboardCheck,
      href: "/eligibility",
      hoverEffect: "lift" as const,
      accent: "from-success/20 to-success/5",
      gradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
    },
  ];

  return (
    <div className="relative">
      <Navbar />
      <main id="main-content">

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/prague-cityscape.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/90 via-midnight/80 to-midnight" />
        </div>
        {/* Ambient glow effects */}
        <div className="absolute top-20 start-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-40 end-0 w-[500px] h-[500px] bg-info/[0.06] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        {/* Floating decorative shapes */}
        <FloatingShape className="top-32 start-[10%] w-3 h-3 bg-amber/30" />
        <FloatingShape className="top-48 end-[15%] w-2 h-2 bg-info/40" />
        <FloatingShape className="bottom-20 start-[20%] w-4 h-4 bg-success/20" />
        <FloatingShape className="top-60 end-[25%] w-2.5 h-2.5 bg-amber/20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/10 border border-amber/20 text-amber text-sm font-medium mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {locale === "en" ? "12,000+ community members" : "أكتر من 12,000 عضو في المجتمع"}
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            <TextReveal text={t.hero.title} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton variant="primary" size="lg" href="/university-matcher">
              <Compass className="w-5 h-5" />
              {t.hero.cta}
            </MagneticButton>
            <MagneticButton variant="secondary" size="lg" href="/eligibility">
              {t.hero.secondaryCta}
            </MagneticButton>
          </motion.div>
        </div>

        {/* Prague skyline silhouette */}
        <PragueSkyline className="absolute bottom-0 inset-x-0 w-full h-[120px] sm:h-[160px]" />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="flex justify-center mt-16 relative z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-border-subtle flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trust bar */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-text-muted text-sm"
        >
          {[
            { icon: Users, label: locale === "en" ? "12,000+ students helped" : "أكتر من 12,000 طالب ساعدناهم" },
            { icon: ShieldAlert, label: locale === "en" ? "No fabricated data" : "بدون بيانات مخترعة" },
            { icon: BookOpen, label: locale === "en" ? "100% free guides" : "أدلة مجانية 100%" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="flex items-center gap-2"
            >
              <item.icon className="w-4 h-4 text-amber/60" />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mb-12"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            const content = t.bento[item.key];
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
              >
                <GlassCard
                  hoverEffect={item.hoverEffect}
                  href={item.href}
                  className="h-full min-h-[180px] group relative overflow-hidden"
                  ariaLabel={content.title}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
                  {/* Decorative corner accent */}
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
                      <span className="inline-flex items-center gap-1 text-xs text-amber mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      </section>

      <SectionDivider />

      {/* Why Study in Czechia */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden gradient-mesh rounded-3xl mx-4 sm:mx-6 lg:mx-auto">
        <div className="absolute top-0 end-0 w-[300px] h-[300px] bg-amber/[0.04] rounded-full blur-[80px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            {t.whyCzechia.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { icon: BookOpen, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", ...t.whyCzechia.reasons[0] },
            { icon: Banknote, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", ...t.whyCzechia.reasons[1] },
            { icon: Award, color: "text-amber", bg: "bg-amber/10 border-amber/20", ...t.whyCzechia.reasons[2] },
            { icon: Plane, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", ...t.whyCzechia.reasons[3] },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <GlassCard hoverEffect="border" className="h-full">
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-11 h-11 rounded-xl ${item.bg} border flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Photo showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[
            { src: "/images/prague-old-town.jpg", alt: "Charles Bridge at golden hour in Prague", h: "h-[200px] sm:h-[280px]" },
            { src: "/images/students-studying.jpg", alt: "Students studying together in a university library", h: "h-[200px] sm:h-[280px]" },
            { src: "/images/students-group.jpg", alt: "Graduation celebration with cap toss", h: "h-[180px] sm:h-[240px]" },
            { src: "/images/prague-scenic.jpg", alt: "Prague Old Town Square aerial view", h: "h-[180px] sm:h-[240px]" },
          ].map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative ${photo.h} rounded-2xl overflow-hidden group`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
        <p className="text-center text-text-muted text-xs mt-4">
          {locale === "en" ? "Photos: Unsplash & Pexels (free license)" : "الصور: Unsplash و Pexels (ترخيص مجاني)"}
        </p>
      </section>

      <SectionDivider />

      {/* Czechia at a Glance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{t.glance.title}</h2>
          <VerifiedBadge
            date="2026-08-27"
            label={locale === "ar" ? "آخر تحديث:" : "Last updated:"}
            sourceUrl="https://www.studyin.cz/"
            className="mt-1"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { key: "universities", icon: Users, color: "text-amber" },
            { key: "programs", icon: BarChart3, color: "text-blue-400" },
            { key: "students", icon: Users, color: "text-emerald-400" },
            { key: "cost", icon: BarChart3, color: "text-purple-400" },
            { key: "safety", icon: ShieldAlert, color: "text-teal-400" },
            { key: "location", icon: Compass, color: "text-rose-400" },
          ].map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <GlassCard className="h-full group" hoverEffect="lift">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">{t.glance.labels[s.key as keyof typeof t.glance.labels]}</div>
                    <AnimatedCounter
                      value={t.glance.stats[s.key as keyof typeof t.glance.stats]}
                      className="text-lg font-semibold text-text-primary block"
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>


      <SectionDivider />

      {/* About the founder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard hoverEffect="border" className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center relative overflow-hidden gradient-mesh">
            <div className="absolute top-0 end-0 w-[200px] h-[200px] bg-amber/[0.05] rounded-full blur-[60px] pointer-events-none" />
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-white/5 border border-border-subtle flex items-center justify-center mx-auto md:mx-0 overflow-hidden ring-2 ring-amber/20 shadow-xl">
              <Image
                src="/images/john.jpg"
                alt="Joun"
                width={160}
                height={160}
                className="object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber mb-2">
                <Sparkles className="w-3 h-3" />
                {t.founder.badge}
              </span>
              <h2 className="text-xl font-bold text-text-primary mb-2">{t.founder.title}</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{t.founder.story}</p>
              <MagneticButton variant="secondary" size="sm" href={FACEBOOK_GROUP_URL}>
                {t.founder.cta}
              </MagneticButton>
            </div>
          </GlassCard>
        </motion.div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
