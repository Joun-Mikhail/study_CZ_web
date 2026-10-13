"use client";

import { Fragment, useState, type CSSProperties, type ComponentType } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Magnetic } from "@/components/ui/magnetic";
import { TiltCard } from "@/components/ui/tilt-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StageRouter } from "@/components/stage-router";
import { CityStrip, type CityCard } from "@/components/city-strip";
import { JourneyGlobe } from "@/components/journey-globe";
import { SiteImage } from "@/components/site-image";
import { AnimatedBackground } from "@/components/animated-background";
import { SectionReveal } from "@/components/section-reveal";
import { EligibilityArt, MatcherArt, CostArt, GuideArt } from "@/components/illustrations";
import { CountUp } from "@/components/ui/count-up";
import { WaitlistSignup } from "@/components/waitlist-signup";
import { EmailSignup } from "@/components/email-signup";
import { OfferBadge, PriceTag } from "@/components/launch-offer";
import { price } from "@/config/pricing";
import { COMMUNITY_SIZE, COMMUNITY_SIZE_AR } from "@/config/contact";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Compass,
  FileText,
  GraduationCap,
  MapPin,
  MessageCircle,
  Users,
  type LucideProps,
} from "lucide-react";

/** Figures computed from the site's own data at build time (see page.tsx). */
export type HomeFacts = {
  programmeCount: number;
  universityCount: number;
  lowestTuition: number;
  cities: CityCard[];
};

const n = (x: number) => x.toLocaleString("en-US");

export default function HomeClient({ facts }: { facts: HomeFacts }) {
  const { t, locale } = useTranslation();
  const c = HOME_COPY[locale];
  const ar = locale === "ar";

  // One accent per tool: blue, purple, orange, green.
  const tasks: ToolCardProps[] = [
    { href: "/eligibility", icon: ClipboardCheck, art: EligibilityArt, theme: THEMES.blue, title: t.bento.eligibility.title, body: t.bento.eligibility.description, cta: c.open },
    { href: "/university-matcher", icon: Compass, art: MatcherArt, theme: THEMES.purple, title: t.bento.matcher.title, body: t.bento.matcher.description, cta: c.open },
    { href: "/cost-of-living", icon: BarChart3, art: CostArt, theme: THEMES.orange, title: t.bento.cost.title, body: t.bento.cost.description, cta: c.open },
    { href: "/application-guide", icon: FileText, art: GuideArt, theme: THEMES.green, title: c.guideTitle, body: c.guideBody, cta: c.open },
  ];
  const statColors = ["from-electric to-orchid", "from-orchid to-magenta", "from-gold to-coral", "from-jade to-electric"];

  const lowest = ar ? `${n(facts.lowestTuition)}€` : `€${n(facts.lowestTuition)}`;
  const stats = [
    { value: n(facts.programmeCount), label: c.statProgrammes },
    { value: n(facts.universityCount), label: c.statUniversities },
    { value: lowest, label: c.statLowest },
    { value: ar ? "0€" : "€0", label: c.statCzech },
  ];
  // The same true figures, short, for the glass tiles in the hero.
  const heroStats = [
    { value: n(facts.programmeCount), label: c.heroStatProgrammes },
    { value: n(facts.universityCount), label: c.heroStatUniversities },
    { value: lowest, label: c.heroStatLowest },
  ];

  const trust = [
    { icon: Users, label: ar ? `أكتر من ${COMMUNITY_SIZE_AR} عضو في جروب الفيسبوك` : `${COMMUNITY_SIZE} Facebook group members` },
    { icon: MapPin, label: ar ? "عايش في التشيك من 2023" : "Living in Czechia since 2023" },
    { icon: BookOpen, label: ar ? "7 أدوات مجانية، بدون حائط دفع" : "7 free tools, no paywall" },
  ];

  return (
    <div className="relative">
      <Navbar />
      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="surface-ink relative isolate overflow-hidden">
          <Image
            src="/images/study/reading-room.jpg"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          {/* Royal → purple → magenta wash with drifting colour light. */}
          <AnimatedBackground variant="hero" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32 sm:pt-36 md:pt-44 md:pb-44 lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12">
            <div className="max-w-2xl">
              <p className="glass-dark inline-flex items-center gap-3 rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide mb-6">
                <span aria-hidden="true" className="inline-block w-6 h-[3px] rounded-full bg-gradient-to-r rtl:bg-gradient-to-l from-gold via-coral to-magenta" />
                {c.eyebrow}
              </p>
              <HeroTitle text={t.hero.title} />
              <p className="blur-in text-lg sm:text-xl leading-relaxed text-white/90 max-w-xl mb-8">{t.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Magnetic className="w-full sm:w-auto">
                  <span className="pop-in flex w-full">
                  <Link
                    href="/eligibility"
                    className="group inline-flex w-full min-h-14 items-center justify-center gap-2.5 lg:whitespace-nowrap rounded-xl bg-white px-7 text-base font-semibold text-[#0b1f3a] shadow-[0_10px_40px_-10px_rgba(139,92,246,0.7)] transition-shadow duration-300 hover:shadow-[0_14px_50px_-8px_rgba(236,72,153,0.75)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <ClipboardCheck className="w-5 h-5 text-[#7c3aed]" aria-hidden="true" />
                    {c.heroCta}
                  </Link>
                  </span>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <span className="pop-in flex w-full [--i:1]">
                  <Link
                    href="/programmes"
                    className="group btn-fill glass-dark inline-flex w-full min-h-14 items-center justify-center gap-2 lg:whitespace-nowrap rounded-xl px-7 text-base font-semibold text-white transition-colors hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {c.heroSecondary}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden="true" />
                  </Link>
                  </span>
                </Magnetic>
              </div>
              <p className="mt-4 text-sm text-white/75">{c.heroNote}</p>

              {/* Glass tiles: true figures from our own data. */}
              <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 max-w-lg">
                {heroStats.map((s, i) => (
                  <div key={s.label} className="glass-dark pop-in grid content-start rounded-2xl px-3 py-3 sm:px-4" style={{ "--i": i + 2 } as CSSProperties}>
                    <dt className="row-start-2 text-[11px] sm:text-xs leading-snug text-white/80">{s.label}</dt>
                    <dd className="row-start-1 font-display text-xl sm:text-2xl text-white tabular-nums" dir="ltr">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <HeroCollage ar={ar} />
          </div>
          <ScrollHint label={c.scrollHint} />
        </section>

        {/* ── Start here: tool cards over the hero ─────────────── */}
        <section id="start-here-cards" aria-labelledby="start-here" className="relative z-10 -mt-20 md:-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="start-here" className="sr-only">
            {c.startHere}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {tasks.map((task, i) => (
              <ToolCard key={task.href} {...task} index={i} />
            ))}
          </div>
        </section>

        {/* ── 3D: from your city to Czechia ───────────────────── */}
        <SectionReveal className="pt-16 sm:pt-20">
          <JourneyGlobe />
        </SectionReveal>

        {/* ── Where are you right now? (has its own entrance) ─── */}
        <div className="pt-16 sm:pt-20">
          <StageRouter />
        </div>

        {/* Renders nothing until a form is configured, so it keeps its own spacing. */}
        <SectionReveal>
          <WaitlistSignup className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" />
        </SectionReveal>

        {/* ── Where students live (has its own entrance) ───────── */}
        <CityStrip cities={facts.cities} />

        {/* ── Facts, from our own data ─────────────────────────── */}
        <section aria-labelledby="facts" className="relative isolate overflow-hidden border-y border-border-subtle">
          <AnimatedBackground variant="section" />
          <SectionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-2xl mb-10">
              <h2 id="facts" className="text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
                {c.factsTitle}
              </h2>
              <p className="text-text-secondary leading-relaxed">{c.factsBody}</p>
            </div>
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {stats.map((s, i) => (
                <div key={s.label} className="glass relative grid content-start overflow-hidden rounded-2xl p-4 sm:p-6 shadow-[0_12px_32px_-20px_rgba(11,31,58,0.35)]">
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r rtl:bg-gradient-to-l ${statColors[i]}`} />
                  <dt className="row-start-2 text-sm leading-snug text-text-secondary mt-1">{s.label}</dt>
                  <dd className="row-start-1 font-display text-3xl sm:text-4xl font-semibold text-text-primary tabular-nums" dir="ltr">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <Link href="/programmes" className="mt-10 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline underline-offset-4">
              {c.factsLink}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </SectionReveal>
        </section>

        {/* ── Course and personal help, on a deep colour band ──── */}
        <section aria-labelledby="help" className="surface-ink relative isolate overflow-hidden">
          <AnimatedBackground variant="dark" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <SectionReveal>
              <h2 id="help" className="text-3xl sm:text-4xl font-semibold text-white text-glow mb-3 max-w-2xl">
                {c.helpTitle}
              </h2>
              <p className="text-white/85 leading-relaxed max-w-2xl mb-10">{c.helpBody}</p>
            </SectionReveal>
            <SectionReveal className="grid grid-cols-1 lg:grid-cols-2 gap-6" itemClassName="h-full" delay={0.1} stagger={0.15}>
              <TiltCard className="h-full rounded-3xl">
                <div className="glass-dark flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-8 pt-0 sm:pt-0">
                  <div className="relative -mx-7 sm:-mx-8 mb-6 h-44 sm:h-52">
                    <SiteImage id="study-desk-flatlay" sizes="(max-width: 1024px) 100vw, 600px" whenNear decorative />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/85 via-[#1e1b4b]/10 to-transparent" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5eead4] mb-3">
                    <GraduationCap className="w-4 h-4" aria-hidden="true" />
                    {c.courseBadge}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">{t.bento.courses.title}</h3>
                  <p className="text-white/85 leading-relaxed mb-6">{t.bento.courses.description}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                    <PriceTag k="course" locale={locale} className="text-2xl font-bold text-white" />
                    <MagneticButton variant="primary" href="/courses">
                      {c.courseCta}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                    </MagneticButton>
                  </div>
                </div>
              </TiltCard>

              <TiltCard className="h-full rounded-3xl">
                <div className="glass-dark flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-8 pt-0 sm:pt-0">
                  <div className="relative -mx-7 sm:-mx-8 mb-6 h-44 sm:h-52">
                    <SiteImage id="study-laptop-notes" sizes="(max-width: 1024px) 100vw, 600px" whenNear decorative />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/85 via-[#1e1b4b]/10 to-transparent" />
                  </div>
                  <OfferBadge locale={locale} className="pulse-ring mb-4 self-start" />
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">{c.servicesTitle}</h3>
                  <p className="text-white/85 leading-relaxed mb-6">{c.servicesBody}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <MagneticButton variant="primary" href="/services">
                      {ar ? `شوف الخدمات — تبدأ من ${price("consultation", "ar")}` : `See services — from ${price("consultation")}`}
                    </MagneticButton>
                    <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:underline underline-offset-4">
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      {c.askFirst}
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </SectionReveal>

            <ul className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3 text-sm text-white/85">
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <SectionReveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <EmailSignup source="checklist" />
        </SectionReveal>

        <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-center text-sm text-text-secondary">
          {c.more}{" "}
          <Link href="/why-czechia" className="text-brand hover:underline">{c.moreWhy}</Link>
          {" · "}
          <Link href="/qa" className="text-brand hover:underline">{c.moreQa}</Link>
          {" · "}
          <Link href="/for-parents" className="text-brand hover:underline">{c.moreParents}</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

const HOME_COPY = {
  en: {
    eyebrow: "Independent guide for Arabic-speaking students",
    heroCta: "Can I study in Czechia? 5-minute check",
    heroSecondary: "Browse programmes",
    heroNote: "Free, no sign-up.",
    heroStatProgrammes: "programmes",
    heroStatUniversities: "universities",
    heroStatLowest: "lowest tuition a year",
    heroCzech: "€0 tuition in Czech",
    scrollHint: "Scroll to the tools",
    startHere: "Start here",
    open: "Start",
    guideTitle: "Application Guide",
    guideBody: "Every step from choosing a programme to your visa, in order.",
    factsTitle: "Czechia in numbers",
    factsBody: "Counted from the programmes and universities on this site, each with its fee and official source.",
    statProgrammes: "programmes with verified fees",
    statUniversities: "universities and faculties",
    statLowest: "lowest yearly tuition in English on our list",
    statCzech: "tuition at public universities when you study in Czech",
    factsLink: "Browse every programme",
    helpTitle: "Prefer some help along the way?",
    helpBody: "The guides and tools are free and always will be. When you want a person to look at your own situation, there's a course and a few personal services.",
    courseBadge: "Pre-order · opens 1 January 2027",
    courseCta: "See the course",
    servicesTitle: "Want me personally in your corner?",
    servicesBody: "I review your actual documents, prepare you for your embassy interview, and answer on WhatsApp when something goes wrong.",
    askFirst: "Ask me first",
    more: "More:",
    moreWhy: "Why Czechia",
    moreQa: "Questions & answers",
    moreParents: "For parents",
  },
  ar: {
    eyebrow: "دليل مستقل للطلاب العرب",
    heroCta: "أقدر أدرس في التشيك؟ اختبار 5 دقايق",
    heroSecondary: "تصفح البرامج",
    heroNote: "مجاني ومن غير تسجيل.",
    heroStatProgrammes: "برنامج",
    heroStatUniversities: "جامعة",
    heroStatLowest: "أقل رسوم في السنة",
    heroCzech: "0€ رسوم لو درست بالتشيكي",
    scrollHint: "انزل للأدوات",
    startHere: "ابدأ من هنا",
    open: "ابدأ",
    guideTitle: "دليل التقديم",
    guideBody: "كل الخطوات من اختيار البرنامج لحد الفيزا، بالترتيب.",
    factsTitle: "التشيك بالأرقام",
    factsBody: "محسوبة من البرامج والجامعات اللي على الموقع، وكل برنامج معاه رسومه ومصدره الرسمي.",
    statProgrammes: "برنامج برسوم متأكدين منها",
    statUniversities: "جامعة وكلية",
    statLowest: "أقل رسوم سنوية لبرنامج بالإنجليزي عندنا",
    statCzech: "رسوم الجامعات الحكومية لو درست بالتشيكي",
    factsLink: "تصفح كل البرامج",
    helpTitle: "محتاج مساعدة في الطريق؟",
    helpBody: "الأدلة والأدوات مجانية وهتفضل مجانية. ولو عايز حد يبص على وضعك أنت بالتحديد، فيه كورس وكام خدمة شخصية.",
    courseBadge: "حجز مسبق · بيفتح 1 يناير 2027",
    courseCta: "شوف الكورس",
    servicesTitle: "عايز حد يقف جنبك شخصيًا؟",
    servicesBody: "براجع أوراقك الحقيقية، وأجهزك لمقابلة السفارة، وأرد عليك على واتساب لما حاجة تحصل.",
    askFirst: "اسألني الأول",
    more: "كمان:",
    moreWhy: "ليه التشيك",
    moreQa: "أسئلة وأجوبة",
    moreParents: "لأولياء الأمور",
  },
} as const;

/**
 * Colour themes for the tool cards: static class strings so Tailwind keeps
 * them. `vars` recolours the card's illustration and its rotating border
 * (the illustrations draw with the teal/violet/gold/coral tokens).
 */
type Theme = { soft: string; fill: string; ink: string; glow: string; vars: CSSProperties };
const THEMES = {
  blue: {
    soft: "bg-electric-soft",
    fill: "bg-electric",
    ink: "text-electric-ink",
    glow: "shadow-[0_28px_60px_-24px_rgba(59,130,246,0.65)]",
    vars: {
      "--color-teal": "var(--color-electric)",
      "--color-teal-soft": "var(--color-electric-soft)",
      "--gb-1": "var(--color-electric)",
      "--gb-2": "var(--color-sky)",
      "--gb-3": "var(--color-orchid)",
    } as CSSProperties,
  },
  purple: {
    soft: "bg-violet-soft",
    fill: "bg-violet",
    ink: "text-violet-ink",
    glow: "shadow-[0_28px_60px_-24px_rgba(139,92,246,0.65)]",
    vars: { "--gb-1": "var(--color-orchid)", "--gb-2": "var(--color-magenta)", "--gb-3": "var(--color-electric)" } as CSSProperties,
  },
  orange: {
    soft: "bg-gold-soft",
    fill: "bg-coral",
    ink: "text-coral-ink",
    glow: "shadow-[0_28px_60px_-24px_rgba(249,115,22,0.6)]",
    vars: { "--gb-1": "var(--color-gold)", "--gb-2": "var(--color-coral)", "--gb-3": "var(--color-magenta)" } as CSSProperties,
  },
  green: {
    soft: "bg-jade-soft",
    fill: "bg-emerald-600",
    ink: "text-jade-ink",
    glow: "shadow-[0_28px_60px_-24px_rgba(16,185,129,0.6)]",
    vars: {
      "--color-coral": "var(--color-jade)",
      "--color-coral-soft": "var(--color-jade-soft)",
      "--gb-1": "var(--color-jade)",
      "--gb-2": "var(--color-teal)",
      "--gb-3": "var(--color-electric)",
    } as CSSProperties,
  },
} satisfies Record<string, Theme>;

type ToolCardProps = {
  href: string;
  icon: ComponentType<LucideProps>;
  art: ComponentType<{ className?: string }>;
  theme: Theme;
  title: string;
  body: string;
  cta: string;
};

const cardVariants: Variants = {
  rest: { y: 0 },
  active: { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } },
};
const iconVariants: Variants = {
  rest: { y: 0, rotate: 0 },
  active: { y: [0, -9, 0, -4, 0], rotate: [0, -8, 6, 0, 0], transition: { duration: 0.7, ease: "easeOut" } },
};
const artVariants: Variants = {
  rest: { scale: 1 },
  active: { scale: 1.06, transition: { type: "spring", stiffness: 260, damping: 18 } },
};

/**
 * A tool card: rotating gradient border in its own colour, lifts and glows
 * on hover or keyboard focus, and its icon gives a little bounce. The whole
 * card is one link. It pops in after the hero (CSS, so it's visible before
 * the app starts).
 */
function ToolCard({ href, icon: Icon, art: Art, theme, title, body, cta, index }: ToolCardProps & { index: number }) {
  const [active, setActive] = useState(false);
  return (
    <div className="pop-in h-full" style={{ "--i": index + 3 } as CSSProperties}>
      <motion.div
        variants={cardVariants}
        initial={false}
        animate={active ? "active" : "rest"}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={theme.vars}
        className={`gradient-border h-full overflow-hidden rounded-2xl bg-surface transition-shadow duration-300 ${
          active ? theme.glow : "shadow-[0_18px_40px_-24px_rgba(11,31,58,0.45)]"
        }`}
      >
        <Link href={href} className="group flex h-full flex-col rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
          <div className={`relative flex h-24 sm:h-32 items-center justify-center ${theme.soft}`}>
            <motion.span variants={artVariants} className="inline-flex">
              <Art className="h-20 sm:h-28 w-auto" />
            </motion.span>
            <motion.span
              variants={iconVariants}
              className={`absolute start-4 -bottom-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${theme.fill} text-white shadow-md ring-4 ring-surface`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </motion.span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col p-5 pt-8 sm:p-6 sm:pt-9">
            <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary mb-4">{body}</p>
            <span className={`mt-auto inline-flex items-center gap-1.5 text-sm font-semibold ${theme.ink}`}>
              {cta}
              <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

/**
 * The hero heading, word by word: each word rises into place a moment after
 * the one before (CSS, so it runs before hydration and never holds back the
 * largest paint), and one light gradient runs across the whole line.
 */
function HeroTitle({ text }: { text: string }) {
  const words = text.split(" ");
  const count = words.length;
  return (
    <h1 className="text-[2.5rem] leading-[1.1] rtl:leading-[1.4] sm:text-5xl lg:text-6xl font-semibold mb-5 drop-shadow-[0_0_28px_rgba(139,92,246,0.45)]">
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            className="word-rise text-gradient-vivid"
            style={{ "--i": i, "--n": count, "--p": count > 1 ? `${(i / (count - 1)) * 100}%` : "0%" } as CSSProperties}
          >
            {word}
          </span>
          {i < count - 1 && " "}
        </Fragment>
      ))}
    </h1>
  );
}

/** A mouse with a rolling wheel that bounces gently: "there's more below". */
function ScrollHint({ label }: { label: string }) {
  return (
    <a
      href="#start-here-cards"
      className="scroll-hint absolute inset-x-0 mx-auto bottom-[5.5rem] md:bottom-[7.25rem] flex w-fit flex-col items-center gap-1 rounded-full p-1 text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="flex h-9 w-6 justify-center rounded-full border-2 border-current pt-1.5">
        <span className="scroll-hint-wheel block h-2 w-1 rounded-full bg-current" />
      </span>
    </a>
  );
}

/**
 * Desktop only: a floating collage of study photos with a true figure on a
 * glass badge. The photos are lazy and low-priority, so the hero background
 * stays the page's main image; on phones the collage is display:none, so its
 * lazy photos are never requested.
 */
function HeroCollage({ ar }: { ar: boolean }) {
  const c = HOME_COPY[ar ? "ar" : "en"];
  return (
    <div aria-hidden="true" className="relative hidden lg:block h-[460px]">
      <div className="hero-float absolute top-0 end-0 w-[62%] h-[58%] overflow-hidden rounded-3xl border-4 border-white/80 shadow-[0_30px_60px_-20px_rgba(76,29,149,0.8)] rotate-2">
        <SiteImage id="study-karolinum-graduation" sizes="360px" decorative />
      </div>
      <div className="hero-float absolute bottom-0 start-0 w-[58%] h-[52%] overflow-hidden rounded-3xl border-4 border-white/80 shadow-[0_30px_60px_-20px_rgba(30,58,138,0.8)] -rotate-3 [animation-delay:-3s]">
        <SiteImage id="study-group-study" sizes="340px" decorative />
      </div>
      <div className="hero-float absolute bottom-8 end-4 w-[34%] h-[34%] overflow-hidden rounded-2xl border-4 border-white/80 shadow-[0_30px_60px_-20px_rgba(131,24,67,0.8)] rotate-6 [animation-delay:-6s]">
        <SiteImage id="study-graduate-smile" sizes="200px" decorative />
      </div>
      <span className="glass-dark animate-float absolute top-[46%] start-[2%] rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
        <span className="me-1.5 inline-block h-2 w-2 rounded-full bg-gold align-middle" />
        {c.heroCzech}
      </span>
      {/* Decorative sparkles. */}
      <span className="animate-float absolute top-4 start-[12%] h-3 w-3 rounded-full bg-magenta shadow-[0_0_18px_4px_rgba(236,72,153,0.6)] [animation-delay:-2s]" />
      <span className="animate-float absolute bottom-[42%] end-[-2%] h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_16px_4px_rgba(245,158,11,0.6)] [animation-delay:-4s]" />
    </div>
  );
}
