"use client";

import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StageRouter } from "@/components/stage-router";
import { CityStrip, type CityCard } from "@/components/city-strip";
import { JourneyGlobe } from "@/components/journey-globe";
import { SiteImage } from "@/components/site-image";
import { TexturedBackground } from "@/components/textured-background";
import { SectionReveal } from "@/components/section-reveal";
import { EligibilityArt, MatcherArt, CostArt, GuideArt } from "@/components/illustrations";
import { CountUp } from "@/components/ui/count-up";
import { WaitlistSignup } from "@/components/waitlist-signup";
import { EmailSignup } from "@/components/email-signup";
import { OfferBadge, PriceTag } from "@/components/launch-offer";
import { price } from "@/config/pricing";
import { COMMUNITY_SIZE, COMMUNITY_SIZE_AR } from "@/config/contact";
import { ArrowRight, BookOpen, MapPin, MessageCircle, Users } from "lucide-react";

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

  // Each tool keeps the colour its illustration is drawn in.
  const tasks: ToolCardProps[] = [
    { href: "/eligibility", art: EligibilityArt, theme: THEMES.forest, title: t.bento.eligibility.title, body: t.bento.eligibility.description },
    { href: "/university-matcher", art: MatcherArt, theme: THEMES.plum, title: t.bento.matcher.title, body: t.bento.matcher.description },
    { href: "/cost-of-living", art: CostArt, theme: THEMES.gold, title: t.bento.cost.title, body: t.bento.cost.description },
    { href: "/application-guide", art: GuideArt, theme: THEMES.clay, title: c.guideTitle, body: c.guideBody },
  ];

  const lowest = ar ? `${n(facts.lowestTuition)}€` : `€${n(facts.lowestTuition)}`;
  const stats = [
    { value: n(facts.programmeCount), label: c.statProgrammes },
    { value: n(facts.universityCount), label: c.statUniversities },
    { value: lowest, label: c.statLowest },
    { value: ar ? "0€" : "€0", label: c.statCzech },
  ];
  // The same true figures, short, for the hero.
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
          <TexturedBackground variant="hero" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 md:pt-48 md:pb-28 lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16">
            <div className="max-w-2xl">
              <p className="eyebrow rise flex items-center gap-4 text-[#e6ad94] mb-7">
                <span aria-hidden="true" className="h-px w-10 bg-[#c67b5c]" />
                {c.eyebrow}
              </p>
              <h1 className="rise text-[2.6rem] leading-[1.06] rtl:leading-[1.45] sm:text-6xl lg:text-[4.25rem] text-[#f5f3f0] mb-7" style={{ "--d": "80ms" } as CSSProperties}>
                {t.hero.title}
              </h1>
              <p className="rise text-lg sm:text-xl leading-relaxed text-[#f5f3f0]/80 max-w-xl mb-10" style={{ "--d": "160ms" } as CSSProperties}>
                {t.hero.subtitle}
              </p>
              <div className="rise flex flex-col sm:flex-row gap-3" style={{ "--d": "240ms" } as CSSProperties}>
                <Link
                  href="/eligibility"
                  className="btn-solid inline-flex min-h-13 items-center justify-center lg:whitespace-nowrap rounded-md px-7 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f3f0]"
                >
                  {c.heroCta}
                </Link>
                <Link
                  href="/programmes"
                  className="group btn-fill inline-flex min-h-13 items-center justify-center gap-2 lg:whitespace-nowrap rounded-md border border-[#f5f3f0]/35 px-7 text-base font-medium text-[#f5f3f0] transition-colors duration-300 hover:border-[#f5f3f0]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f3f0]"
                >
                  {c.heroSecondary}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-4 text-sm text-[#f5f3f0]/70">{c.heroNote}</p>

              {/* True figures from our own data, set like a table of contents. */}
              <dl className="rise mt-14 grid grid-cols-3 border-t border-[#f5f3f0]/15 pt-6 max-w-lg" style={{ "--d": "320ms" } as CSSProperties}>
                {heroStats.map((s, i) => (
                  <div key={s.label} className={`grid content-start ${i > 0 ? "border-s border-[#f5f3f0]/15 ps-4 sm:ps-6" : "pe-4"}`}>
                    <dt className="row-start-2 mt-1 text-xs leading-snug text-[#f5f3f0]/70">{s.label}</dt>
                    <dd className="row-start-1 font-display text-2xl sm:text-3xl text-[#f5f3f0] tabular-nums" dir="ltr">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <HeroFigure caption={c.heroCzech} />
          </div>
        </section>

        {/* ── Start here: the four free tools ──────────────────── */}
        <section aria-labelledby="start-here" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
          <SectionReveal className="mb-10 sm:mb-14 grid gap-4 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <p className="eyebrow text-brand mb-4">{c.startHere}</p>
              <h2 id="start-here" className="text-3xl sm:text-[2.75rem] leading-tight text-text-primary">
                {c.toolsTitle}
              </h2>
            </div>
            <p className="text-text-secondary leading-relaxed max-w-xl lg:justify-self-end">{c.toolsBody}</p>
          </SectionReveal>
          <SectionReveal delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {tasks.map((task, i) => (
              <ToolCard key={task.href} {...task} index={i} cta={c.open} />
            ))}
          </SectionReveal>
        </section>

        {/* ── 3D: from your city to Czechia ───────────────────── */}
        <SectionReveal className="pt-20 sm:pt-28">
          <JourneyGlobe />
        </SectionReveal>

        {/* ── Where are you right now? (has its own entrance) ─── */}
        <div className="pt-16 sm:pt-20">
          <StageRouter />
        </div>

        {/* Renders nothing until a form is configured, so it keeps its own spacing. */}
        <WaitlistSignup className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" />

        {/* ── Where students live (has its own entrance) ───────── */}
        <CityStrip cities={facts.cities} />

        {/* ── Facts, from our own data ─────────────────────────── */}
        <section aria-labelledby="facts" className="relative isolate overflow-hidden border-y border-border-subtle">
          <TexturedBackground variant="section" />
          <SectionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="eyebrow text-brand mb-4">{c.factsEyebrow}</p>
              <h2 id="facts" className="text-3xl sm:text-[2.75rem] leading-tight text-text-primary mb-4">
                {c.factsTitle}
              </h2>
              <p className="text-text-secondary leading-relaxed">{c.factsBody}</p>
            </div>
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-10">
              {stats.map((s) => (
                <div key={s.label} className="grid content-start border-t border-border-subtle pt-6">
                  <dt className="row-start-2 mt-2 text-sm leading-snug text-text-secondary">{s.label}</dt>
                  <dd className="row-start-1 font-display text-4xl sm:text-5xl text-text-primary tabular-nums" dir="ltr">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <Link href="/programmes" className="mt-12 inline-flex items-center gap-2 font-medium text-brand">
              <span className="link-rule">{c.factsLink}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </SectionReveal>
        </section>

        {/* ── Course and personal help, on a charcoal band ─────── */}
        <section aria-labelledby="help" className="surface-ink relative isolate overflow-hidden">
          <TexturedBackground variant="dark" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <SectionReveal className="max-w-2xl mb-12">
              <p className="eyebrow text-[#e6ad94] mb-4">{c.helpEyebrow}</p>
              <h2 id="help" className="text-3xl sm:text-[2.75rem] leading-tight text-[#f5f3f0] mb-4">
                {c.helpTitle}
              </h2>
              <p className="text-[#f5f3f0]/80 leading-relaxed">{c.helpBody}</p>
            </SectionReveal>
            <SectionReveal delay={0.1} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#f5f3f0]/12 bg-[#f5f3f0]/[0.03]">
                <div className="relative h-48 sm:h-56">
                  <SiteImage id="study-desk-flatlay" sizes="(max-width: 1024px) 100vw, 600px" whenNear decorative className="saturate-[0.8]" />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <p className="eyebrow text-[#dcc29c] mb-4">{c.courseBadge}</p>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#f5f3f0] mb-3">{t.bento.courses.title}</h3>
                  <p className="text-[#f5f3f0]/80 leading-relaxed mb-8">{t.bento.courses.description}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[#f5f3f0]/12 pt-6">
                    <PriceTag k="course" locale={locale} className="font-display text-2xl text-[#f5f3f0]" />
                    <MagneticButton variant="primary" href="/courses">
                      {c.courseCta}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" strokeWidth={1.75} aria-hidden="true" />
                    </MagneticButton>
                  </div>
                </div>
              </article>

              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#f5f3f0]/12 bg-[#f5f3f0]/[0.03]">
                <div className="relative h-48 sm:h-56">
                  <SiteImage id="study-laptop-notes" sizes="(max-width: 1024px) 100vw, 600px" whenNear decorative className="saturate-[0.8]" />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <OfferBadge locale={locale} className="mb-5 self-start" />
                  <h3 className="font-display text-2xl sm:text-3xl text-[#f5f3f0] mb-3">{c.servicesTitle}</h3>
                  <p className="text-[#f5f3f0]/80 leading-relaxed mb-8">{c.servicesBody}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#f5f3f0]/12 pt-6">
                    <MagneticButton variant="primary" href="/services">
                      {ar ? `شوف الخدمات — تبدأ من ${price("consultation", "ar")}` : `See services — from ${price("consultation")}`}
                    </MagneticButton>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-[#f5f3f0]">
                      <MessageCircle className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                      <span className="link-rule">{c.askFirst}</span>
                    </Link>
                  </div>
                </div>
              </article>
            </SectionReveal>

            <ul className="mt-12 flex flex-col sm:flex-row sm:flex-wrap gap-x-10 gap-y-3 text-sm text-[#f5f3f0]/80">
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#c9a77a] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <SectionReveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <EmailSignup source="checklist" />
        </SectionReveal>

        <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center text-sm text-text-secondary">
          {c.more}{" "}
          <Link href="/why-czechia" className="text-brand hover:underline underline-offset-4">{c.moreWhy}</Link>
          {" · "}
          <Link href="/qa" className="text-brand hover:underline underline-offset-4">{c.moreQa}</Link>
          {" · "}
          <Link href="/for-parents" className="text-brand hover:underline underline-offset-4">{c.moreParents}</Link>
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
    heroCzech: "€0 tuition when you study in Czech",
    startHere: "Start here",
    toolsTitle: "Four free tools to plan your studies",
    toolsBody: "Check whether you can apply, find programmes that fit your grades and budget, see what a month really costs, and follow every step to your visa.",
    open: "Start",
    guideTitle: "Application Guide",
    guideBody: "Every step from choosing a programme to your visa, in order.",
    factsEyebrow: "From our own data",
    factsTitle: "Czechia in numbers",
    factsBody: "Counted from the programmes and universities on this site, each with its fee and official source.",
    statProgrammes: "programmes with verified fees",
    statUniversities: "universities and faculties",
    statLowest: "lowest yearly tuition in English on our list",
    statCzech: "tuition at public universities when you study in Czech",
    factsLink: "Browse every programme",
    helpEyebrow: "Course and personal help",
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
    startHere: "ابدأ من هنا",
    toolsTitle: "أربع أدوات مجانية تخطط بيها دراستك",
    toolsBody: "اعرف إذا كنت تقدر تقدم، ولاقي برامج تناسب درجاتك وميزانيتك، وشوف الشهر بيتكلف كام فعلًا، وامشي خطوة بخطوة لحد الفيزا.",
    open: "ابدأ",
    guideTitle: "دليل التقديم",
    guideBody: "كل الخطوات من اختيار البرنامج لحد الفيزا، بالترتيب.",
    factsEyebrow: "من بياناتنا",
    factsTitle: "التشيك بالأرقام",
    factsBody: "محسوبة من البرامج والجامعات اللي على الموقع، وكل برنامج معاه رسومه ومصدره الرسمي.",
    statProgrammes: "برنامج برسوم متأكدين منها",
    statUniversities: "جامعة وكلية",
    statLowest: "أقل رسوم سنوية لبرنامج بالإنجليزي عندنا",
    statCzech: "رسوم الجامعات الحكومية لو درست بالتشيكي",
    factsLink: "تصفح كل البرامج",
    helpEyebrow: "كورس ومساعدة شخصية",
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

/** Muted tool colours: static class strings so Tailwind keeps them. */
type Theme = { soft: string; ink: string };
const THEMES = {
  forest: { soft: "bg-teal-soft", ink: "text-teal-ink" },
  plum: { soft: "bg-violet-soft", ink: "text-violet-ink" },
  gold: { soft: "bg-gold-soft", ink: "text-gold-ink" },
  clay: { soft: "bg-coral-soft", ink: "text-coral-ink" },
} satisfies Record<string, Theme>;

type ToolCardProps = {
  href: string;
  art: ComponentType<{ className?: string }>;
  theme: Theme;
  title: string;
  body: string;
};

/**
 * A tool, set like an entry in a printed guide: its number, a quiet
 * illustration, title and one line. Hairline border that warms on hover or
 * focus. The whole card is one link.
 */
function ToolCard({ href, art: Art, theme, title, body, cta, index }: ToolCardProps & { cta: string; index: number }) {
  return (
    <Link href={href} className="card-quiet group flex h-full flex-col overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
      <div className={`flex h-28 sm:h-36 items-center justify-center ${theme.soft}`}>
        <Art className="h-20 sm:h-28 w-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-6">
        <p className={`font-display text-sm tabular-nums mb-3 ${theme.ink}`} dir="ltr">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="text-xl text-text-primary mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-text-secondary mb-6">{body}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-text-primary">
          <span className="link-rule">{cta}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/**
 * Desktop only: two study photos set square, like plates in a book, with a
 * true figure as the caption. The photos are lazy and low-priority, so the
 * hero background stays the page's main image; on phones the figure is
 * display:none, so its photos are never requested.
 */
function HeroFigure({ caption }: { caption: string }) {
  return (
    <div aria-hidden="true" className="relative hidden lg:block h-[480px]">
      <div className="absolute top-0 end-0 w-[72%] h-[72%] overflow-hidden rounded-sm border border-[#f5f3f0]/20">
        <SiteImage id="study-karolinum-graduation" sizes="400px" decorative className="saturate-[0.85]" />
      </div>
      <div className="absolute bottom-0 start-0 w-[48%] h-[46%] overflow-hidden rounded-sm border-4 border-[#1c1a18]">
        <SiteImage id="study-group-study" sizes="260px" decorative className="saturate-[0.85]" />
      </div>
      <p className="absolute bottom-6 end-0 w-[44%] border-t border-[#c67b5c] pt-3 text-sm leading-snug text-[#f5f3f0]/80">
        {caption}
      </p>
    </div>
  );
}
