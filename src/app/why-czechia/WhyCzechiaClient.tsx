"use client";

import { useTranslation } from "@/i18n/context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionDivider } from "@/components/ui/section-divider";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { FACEBOOK_GROUP_URL, FOUNDER_NAME } from "@/config/contact";
import Link from "@/components/locale-link";
import {
  GraduationCap,
  BarChart3,
  Compass,
  ShieldAlert,
  Users,
  Briefcase,
  BookOpen,
  Banknote,
  Award,
  Plane,
  ArrowRight,
  Sparkles,
  Search,
  MapPin,
  TrendingDown,
} from "lucide-react";

/** Background on studying in Czechia, moved from the homepage to keep it short. */
export default function WhyCzechiaClient() {
  const { t, locale } = useTranslation();
  const copy = PAGE_COPY[locale];

  return (
    <div className="relative">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-24">
      <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-3">{copy.title}</h1>
        <p className="text-text-secondary leading-relaxed">{copy.intro}</p>
      </header>

      {/* Why Study in Czechia */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden">
        <div className="relative rounded-3xl p-8 sm:p-12 noise-overlay aurora-bg">

          <motion.div
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="motion-safe-fallback text-center mb-10 relative z-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              {t.whyCzechia.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
            {[
              { icon: BookOpen, color: "text-success", bg: "bg-emerald-500/10 border-emerald-500/20", ...t.whyCzechia.reasons[0] },
              { icon: Banknote, color: "text-info", bg: "bg-blue-500/10 border-blue-500/20", ...t.whyCzechia.reasons[1] },
              { icon: Award, color: "text-amber", bg: "bg-amber/10 border-amber/20", ...t.whyCzechia.reasons[2] },
              { icon: Plane, color: "text-violet-700 dark:text-violet-300", bg: "bg-purple-500/10 border-purple-500/20", ...t.whyCzechia.reasons[3] },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="motion-safe-fallback"
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
        </div>
      </section>

      {/* Photo showcase with parallax */}
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
              initial={{ scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`motion-safe-fallback relative ${photo.h} rounded-2xl overflow-hidden group`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Corner accent on hover */}
              <div className="absolute bottom-3 start-3 w-6 h-6 border-s-2 border-b-2 border-amber/0 group-hover:border-amber/40 transition-all duration-500 rounded-bl-lg" />
              <div className="absolute top-3 end-3 w-6 h-6 border-e-2 border-t-2 border-amber/0 group-hover:border-amber/40 transition-all duration-500 rounded-tr-lg" />
            </motion.div>
          ))}
        </div>
        <p className="text-center text-text-muted text-xs mt-4">
          {locale === "en" ? "Photos: Unsplash & Pexels (free license)" : "الصور: Unsplash و Pexels (ترخيص مجاني)"}
        </p>
      </section>

      <SectionDivider />

      {/* Browse by Interest */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="motion-safe-fallback text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            {locale === "en" ? "Browse by Interest" : "تصفح حسب الاهتمام"}
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            {locale === "en"
              ? "Explore verified programmes by field of study, city, or budget."
              : "استكشف البرامج الموثقة حسب مجال الدراسة أو المدينة أو الميزانية."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { href: "/study/medicine-in-czech-republic", label: locale === "en" ? "Medicine" : "الطب", icon: GraduationCap },
            { href: "/study/business-in-czech-republic", label: locale === "en" ? "Business" : "إدارة الأعمال", icon: Briefcase },
            { href: "/study/engineering-in-czech-republic", label: locale === "en" ? "Engineering" : "الهندسة", icon: BarChart3 },
            { href: "/study/it-in-czech-republic", label: locale === "en" ? "IT & Computer Science" : "تكنولوجيا المعلومات", icon: Compass },
            { href: "/study/economics-in-czech-republic", label: locale === "en" ? "Economics" : "الاقتصاد", icon: Banknote },
            { href: "/study/law-in-czech-republic", label: locale === "en" ? "Law" : "القانون", icon: BookOpen },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="motion-safe-fallback"
            >
              <Link href={item.href} className="block">
                <GlassCard hoverEffect="border" className="group card-shine">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-amber/5 border border-amber/20 flex items-center justify-center group-hover:bg-amber/10 group-hover:scale-105 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-amber" />
                    </div>
                    <span className="text-sm font-medium text-text-primary group-hover:text-amber transition-colors">{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-text-muted ms-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { href: "/study/in-prague", label: locale === "en" ? "Study in Prague" : "ادرس في براغ", icon: MapPin },
            { href: "/study/in-brno", label: locale === "en" ? "Study in Brno" : "ادرس في برنو", icon: MapPin },
            { href: "/study/in-olomouc", label: locale === "en" ? "Study in Olomouc" : "ادرس في أولوموتس", icon: MapPin },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="motion-safe-fallback"
            >
              <Link href={item.href} className="block">
                <GlassCard hoverEffect="lift" className="group card-shine">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-info/5 border border-info/20 flex items-center justify-center group-hover:bg-info/10 group-hover:scale-105 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-info" />
                    </div>
                    <span className="text-sm font-medium text-text-primary group-hover:text-info transition-colors">{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-text-muted ms-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="motion-safe-fallback"
          >
            <Link href="/study/cheapest-programmes" className="block">
              <GlassCard hoverEffect="glow" className="group card-shine">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-success/5 border border-success/20 flex items-center justify-center group-hover:bg-success/10 group-hover:scale-105 transition-all duration-300">
                    <TrendingDown className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-text-primary group-hover:text-success transition-colors block">
                      {locale === "en" ? "Cheapest Programmes" : "أرخص البرامج"}
                    </span>
                    <span className="text-xs text-text-muted">
                      {locale === "en" ? "Starting from €1,500 per year" : "تبدأ من 1,500€ في السنة"}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted ms-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </GlassCard>
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.06, duration: 0.4 }}
            className="motion-safe-fallback"
          >
            <Link href="/programmes" className="block">
              <GlassCard hoverEffect="glow" className="group card-shine">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-amber/5 border border-amber/20 flex items-center justify-center group-hover:bg-amber/10 group-hover:scale-105 transition-all duration-300">
                    <Search className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-text-primary group-hover:text-amber transition-colors block">
                      {locale === "en" ? "Browse All Programmes" : "تصفح كل البرامج"}
                    </span>
                    <span className="text-xs text-text-muted">
                      {locale === "en" ? "Search, filter & compare" : "ابحث وصفّي وقارن"}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted ms-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Czechia at a Glance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="motion-safe-fallback mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{t.glance.title}</h2>
          <VerifiedBadge
            date="2026-09-15"
            label={locale === "ar" ? "آخر تحديث:" : "Last updated:"}
            sourceUrl="https://www.studyin.cz/"
            className="mt-1"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { key: "universities", icon: Users, color: "text-amber" },
            { key: "programs", icon: BarChart3, color: "text-info" },
            { key: "students", icon: Users, color: "text-success" },
            { key: "cost", icon: BarChart3, color: "text-violet-700 dark:text-violet-300" },
            { key: "safety", icon: ShieldAlert, color: "text-success" },
            { key: "location", icon: Compass, color: "text-error" },
          ].map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="motion-safe-fallback"
            >
              <GlassCard className="h-full group card-shine" hoverEffect="lift">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center group-hover:scale-105 group-hover:border-amber/20 transition-all duration-300">
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
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="motion-safe-fallback"
        >
          <GlassCard hoverEffect="border" className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center relative overflow-hidden noise-overlay aurora-bg">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-white/5 border border-border-subtle flex items-center justify-center mx-auto md:mx-0 overflow-hidden ring-2 ring-amber/20 shadow-xl group">
              <span className="text-3xl font-bold text-amber/60 select-none" aria-hidden="true">J</span>
              <Image
                src="/images/john.jpg"
                alt={`${FOUNDER_NAME}, founder of Study Czechia`}
                width={384}
                height={384}
                quality={90}
                loading="lazy"
                className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
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

const PAGE_COPY = {
  en: {
    title: "Why study in Czechia",
    intro: "Tuition, cities, programmes and the numbers behind them, in one place.",
  },
  ar: {
    title: "ليه تدرس في التشيك",
    intro: "المصاريف والمدن والبرامج والأرقام اللي وراها، في مكان واحد.",
  },
} as const;
