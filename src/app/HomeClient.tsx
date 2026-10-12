"use client";

import Image from "next/image";
import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StageRouter } from "@/components/stage-router";
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
} from "lucide-react";

/** Figures computed from the site's own data at build time (see page.tsx). */
export type HomeFacts = {
  programmeCount: number;
  universityCount: number;
  lowestTuition: number;
};

const n = (x: number) => x.toLocaleString("en-US");

export default function HomeClient({ facts }: { facts: HomeFacts }) {
  const { t, locale } = useTranslation();
  const c = HOME_COPY[locale];
  const ar = locale === "ar";

  const tasks = [
    { href: "/eligibility", icon: ClipboardCheck, title: t.bento.eligibility.title, body: t.bento.eligibility.description },
    { href: "/university-matcher", icon: Compass, title: t.bento.matcher.title, body: t.bento.matcher.description },
    { href: "/cost-of-living", icon: BarChart3, title: t.bento.cost.title, body: t.bento.cost.description },
    { href: "/application-guide", icon: FileText, title: c.guideTitle, body: c.guideBody },
  ];

  const stats = [
    { value: n(facts.programmeCount), label: c.statProgrammes },
    { value: n(facts.universityCount), label: c.statUniversities },
    { value: ar ? `${n(facts.lowestTuition)}€` : `€${n(facts.lowestTuition)}`, label: c.statLowest },
    { value: ar ? "0€" : "€0", label: c.statCzech },
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
            src="/images/prague-cityscape.jpg"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b1f3a] via-[#0b1f3a]/85 to-[#0b1f3a]/45 md:bg-gradient-to-r md:rtl:bg-gradient-to-l md:from-[#0b1f3a] md:via-[#0b1f3a]/80 md:to-[#0b1f3a]/15"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32 sm:pt-36 md:pt-44 md:pb-44">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-sm font-semibold tracking-wide text-white/85 mb-5">
                <span aria-hidden="true" className="inline-block w-8 h-[3px] rounded-full bg-[#f2545b]" />
                {c.eyebrow}
              </p>
              <h1 className="text-[2.5rem] leading-[1.08] rtl:leading-[1.35] sm:text-5xl lg:text-6xl font-semibold text-white mb-5">
                {t.hero.title}
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-white/85 max-w-xl mb-8">{t.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/eligibility"
                  className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xl bg-white px-7 text-base font-semibold text-[#0b1f3a] shadow-sm transition-colors hover:bg-[#e8eff8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ClipboardCheck className="w-5 h-5" aria-hidden="true" />
                  {c.heroCta}
                </Link>
                <Link
                  href="/programmes"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/40 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {c.heroSecondary}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-4 text-sm text-white/70">{c.heroNote}</p>
            </div>
          </div>
        </section>

        {/* ── Start here: task cards over the hero ─────────────── */}
        <section aria-labelledby="start-here" className="relative z-10 -mt-20 md:-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="start-here" className="sr-only">
            {c.startHere}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tasks.map(({ href, icon: Icon, title, body }) => (
              <GlassCard key={href} href={href} ariaLabel={title} className="h-full p-5 sm:p-6 shadow-[0_18px_40px_-24px_rgba(11,31,58,0.45)]">
                <div className="flex h-full gap-4 sm:flex-col sm:gap-0">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand sm:mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary sm:mb-4">{body}</p>
                    <span className="mt-auto hidden items-center gap-1.5 text-sm font-semibold text-brand sm:inline-flex">
                      {c.open}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ── Where are you right now? ─────────────────────────── */}
        <div className="pt-16 sm:pt-20">
          <StageRouter />
        </div>

        <WaitlistSignup className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" />

        {/* ── Facts, from our own data ─────────────────────────── */}
        <section aria-labelledby="facts" className="border-y border-border-subtle bg-bg-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="max-w-2xl mb-10">
              <h2 id="facts" className="text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
                {c.factsTitle}
              </h2>
              <p className="text-text-secondary leading-relaxed">{c.factsBody}</p>
            </div>
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {stats.map((s) => (
                <div key={s.label} className="grid content-start border-s-2 border-brand ps-4">
                  <dt className="row-start-2 text-sm leading-snug text-text-secondary mt-1">{s.label}</dt>
                  <dd className="row-start-1 font-display text-3xl sm:text-4xl font-semibold text-text-primary tabular-nums" dir="ltr">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Link href="/programmes" className="mt-10 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline underline-offset-4">
              {c.factsLink}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ── Course and personal help ─────────────────────────── */}
        <section aria-labelledby="help" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 id="help" className="text-3xl sm:text-4xl font-semibold text-text-primary mb-3 max-w-2xl">
            {c.helpTitle}
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-2xl mb-10">{c.helpBody}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <GlassCard className="flex flex-col p-7 sm:p-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand mb-3">
                <GraduationCap className="w-4 h-4" aria-hidden="true" />
                {c.courseBadge}
              </span>
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-2">{t.bento.courses.title}</h3>
              <p className="text-text-secondary leading-relaxed mb-6">{t.bento.courses.description}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                <PriceTag k="course" locale={locale} className="text-2xl font-bold text-text-primary" />
                <MagneticButton variant="primary" href="/courses">
                  {c.courseCta}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </MagneticButton>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col p-7 sm:p-8 bg-brand/[0.04]">
              <OfferBadge locale={locale} className="mb-4 self-start" />
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-2">{c.servicesTitle}</h3>
              <p className="text-text-secondary leading-relaxed mb-6">{c.servicesBody}</p>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                <MagneticButton variant="primary" href="/services">
                  {ar ? `شوف الخدمات — تبدأ من ${price("consultation", "ar")}` : `See services — from ${price("consultation")}`}
                </MagneticButton>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline underline-offset-4">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {c.askFirst}
                </Link>
              </div>
            </GlassCard>
          </div>

          <ul className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3 text-sm text-text-secondary">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <EmailSignup source="checklist" />
        </div>

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
