"use client";

import { useTranslation } from "@/i18n/context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { TextReveal } from "@/components/ui/text-reveal";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";
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
} from "lucide-react";
import { FACEBOOK_GROUP_URL } from "@/config/contact";

export default function Home() {
  const { t, locale } = useTranslation();

  const bentoItems = [
    {
      key: "courses" as const,
      icon: GraduationCap,
      href: "/courses",
      hoverEffect: "glow" as const,
      accent: "from-amber/20 to-amber/5",
    },
    {
      key: "cost" as const,
      icon: BarChart3,
      href: "/cost-of-living",
      hoverEffect: "lift" as const,
      accent: "from-info/20 to-info/5",
    },
    {
      key: "matcher" as const,
      icon: Compass,
      href: "/university-matcher",
      hoverEffect: "border" as const,
      accent: "from-success/20 to-success/5",
    },
    {
      key: "qa" as const,
      icon: MessageCircleQuestion,
      href: "/qa",
      hoverEffect: "glow" as const,
      accent: "from-purple-500/20 to-purple-500/5",
    },
    {
      key: "services" as const,
      icon: Briefcase,
      href: "/services",
      hoverEffect: "border" as const,
      accent: "from-amber/20 to-amber/5",
    },
    {
      key: "eligibility" as const,
      icon: ClipboardCheck,
      href: "/eligibility",
      hoverEffect: "lift" as const,
      accent: "from-success/20 to-success/5",
    },
  ];

  return (
    <div className="relative">
      <Navbar />
      <main id="main-content">

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-20 start-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 end-0 w-[400px] h-[400px] bg-info/[0.05] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/10 border border-amber/20 text-amber text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            {locale === "en" ? "10,500+ students helped" : "ساعدنا أكثر من 10,500 طالب"}
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
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
            <MagneticButton variant="secondary" size="lg" href="/qa">
              {t.hero.secondaryCta}
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            const content = t.bento[item.key];
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.15, duration: 0.5 }}
              >
                <GlassCard
                  hoverEffect={item.hoverEffect}
                  href={item.href}
                  className="h-full min-h-[180px] group"
                  ariaLabel={content.title}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center group-hover:border-amber/30 transition-colors">
                      <Icon className="w-6 h-6 text-amber" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary mb-1.5">
                        {content.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {content.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why Study in Czechia */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl font-semibold text-text-primary mb-6"
        >
          {t.whyCzechia.title}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: BookOpen, ...t.whyCzechia.reasons[0] },
            { icon: Banknote, ...t.whyCzechia.reasons[1] },
            { icon: Award, ...t.whyCzechia.reasons[2] },
            { icon: Plane, ...t.whyCzechia.reasons[3] },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            >
              <GlassCard hoverEffect="border" className="h-full">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-amber" />
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

      {/* Czechia at a Glance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold text-text-primary">{t.glance.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { key: "universities", icon: Users, value: t.glance.stats.universities },
            { key: "programs", icon: BarChart3, value: t.glance.stats.programs },
            { key: "students", icon: Users, value: t.glance.stats.students },
            { key: "cost", icon: BarChart3, value: t.glance.stats.cost },
            { key: "safety", icon: ShieldAlert, value: t.glance.stats.safety },
            { key: "location", icon: Compass, value: t.glance.stats.location },
          ].map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
            >
              <GlassCard className="h-full">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">{t.glance.labels[s.key as keyof typeof t.glance.labels]}</div>
                    <div className="text-lg font-semibold text-text-primary">{s.value}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>


      {/* About the founder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <GlassCard hoverEffect="border" className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-border-subtle flex items-center justify-center mx-auto md:mx-0 overflow-hidden">
            <Image
              src="/images/john.jpg"
              alt="Joun"
              width={80}
              height={80}
              className="object-cover w-full h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
          <div>
            <span className="inline-block text-xs font-medium text-amber mb-2">{t.founder.badge}</span>
            <h2 className="text-xl font-semibold text-text-primary mb-2">{t.founder.title}</h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">{t.founder.story}</p>
            <MagneticButton variant="secondary" size="sm" href={FACEBOOK_GROUP_URL}>
              {t.founder.cta}
            </MagneticButton>
          </div>
        </GlassCard>
      </section>
      </main>

      <Footer />
    </div>
  );
}
