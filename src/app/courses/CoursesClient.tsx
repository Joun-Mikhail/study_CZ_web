"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WHATSAPP_URL, PAYMENT_LINKS } from "@/config/contact";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  CheckCircle2,
  MessageCircle,
  BookOpen,
  Video,
  FileText,
  Headphones,
  Users,
  RefreshCw,
  ChevronDown,
  Sparkles,
  Globe,
  MapPin,
  Coffee,
  Heart,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoursesClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;
  const [openModule, setOpenModule] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="max-w-3xl mx-auto text-center mb-16 relative">
          <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber/[0.06] rounded-full blur-[120px] pointer-events-none" />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/10 border border-amber/20 text-amber text-sm font-medium mb-6 relative z-10"
          >
            {t.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 relative z-10"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary leading-relaxed max-w-2xl mx-auto mb-6 relative z-10"
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10"
          >
            {/* TODO: Replace with live Stripe payment link */}
            <MagneticButton variant="primary" size="lg" href={PAYMENT_LINKS.course}>
              {t.heroCta}
            </MagneticButton>
            <MagneticButton variant="secondary" size="lg" href="#preview">
              {t.heroSecondaryCta}
            </MagneticButton>
          </motion.div>
        </section>

        {/* "Not a textbook" */}
        <section className="max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-amber/20 bg-amber/[0.03] px-6 sm:px-8 py-7"
          >
            <div className="absolute top-4 start-4 text-4xl text-amber/20 font-serif leading-none select-none">&ldquo;</div>
            <h2 className="text-lg font-semibold text-text-primary mb-3">{t.notTextbook.title}</h2>
            <p className="text-sm text-text-secondary leading-relaxed">{t.notTextbook.body}</p>
          </motion.div>
        </section>

        {/* What's included */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-6">{t.includedTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {t.included.map((item, i) => {
              const icons = [BookOpen, Video, FileText, Headphones, Users, RefreshCw];
              const Icon = icons[i] ?? BookOpen;
              return (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface/60 border border-border-subtle">
                  <Icon className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Modules accordion */}
        <section className="max-w-2xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-6">{t.modulesTitle}</h2>
          <div className="space-y-2">
            {t.modules.map((mod, i) => {
              const icons = [Globe, MapPin, Coffee, Heart, Briefcase];
              const Icon = icons[i] ?? Globe;
              return (
                <div key={i} className="rounded-xl border border-border-subtle bg-surface/60 overflow-hidden">
                  <button
                    onClick={() => setOpenModule(openModule === i ? null : i)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-start"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-amber" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-amber font-medium">{t.moduleLabel} {i + 1}</span>
                      <p className="text-sm font-medium text-text-primary">{mod.title}</p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-text-muted shrink-0 transition-transform duration-200",
                        openModule === i && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openModule === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4">
                          <p className="text-xs text-text-muted mb-2">{mod.subtitle}</p>
                          <ul className="space-y-1.5">
                            {mod.topics.map((topic, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber shrink-0 mt-0.5" />
                                <span className="text-xs">{topic}</span>
                              </li>
                            ))}
                          </ul>
                          {mod.trigger && (
                            <div className="mt-3 px-3 py-2 rounded-lg bg-amber/[0.04] border border-amber/15">
                              <p className="text-xs text-text-secondary italic">{mod.trigger}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bundle offers */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-6">{t.bundleTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.bundles.map((b, i) => (
              <GlassCard
                key={i}
                hoverEffect={i === 2 ? "glow" : "border"}
                className={cn(
                  "flex flex-col",
                  i === 2 && "border-amber/40 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
                )}
              >
                {i === 2 && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber text-midnight text-xs font-semibold mb-2 self-start">
                    {t.bestValue}
                  </span>
                )}
                <h3 className="font-semibold text-text-primary mb-1">{b.name}</h3>
                <p className="text-2xl font-bold text-amber mb-1">{b.price}</p>
                {b.save && <p className="text-xs text-green-400 mb-2">{b.save}</p>}
                <p className="text-xs text-text-muted mb-4 flex-1">{b.desc}</p>
                <MagneticButton
                  variant={i === 2 ? "primary" : "secondary"}
                  href={i === 0 ? PAYMENT_LINKS.course : i === 1 ? PAYMENT_LINKS.interviewPrep : PAYMENT_LINKS.fullPackageStep1}
                  className="w-full"
                  size="sm"
                >
                  {b.cta}
                </MagneticButton>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Free preview */}
        <section id="preview" className="max-w-2xl mx-auto mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-6">{t.previewTitle}</h2>
          <GlassCard hoverEffect="glow" className="text-center">
            <PlayCircle className="w-14 h-14 text-amber mx-auto mb-3" />
            <h3 className="font-semibold text-text-primary mb-1">{t.previewLesson}</h3>
            <p className="text-sm text-text-secondary mb-4">{t.previewDesc}</p>
            <MagneticButton variant="secondary" href={WHATSAPP_URL}>
              <MessageCircle className="w-4 h-4" />
              {t.previewCta}
            </MagneticButton>
          </GlassCard>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">{t.bottomCta.title}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            {/* TODO: Replace with live Stripe payment link */}
            <MagneticButton variant="primary" size="lg" href={PAYMENT_LINKS.course}>
              {t.bottomCta.primary}
            </MagneticButton>
            <MagneticButton variant="ghost" href="/qa">
              {t.bottomCta.secondary}
            </MagneticButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ─── English copy ───────────────────────────────────────────────────────────

const en = {
  badge: "€49 · Lifetime access",
  title: "Your First 90 Days in Czechia",
  subtitle:
    "Language, culture, embassy prep, and everything nobody tells you — taught in Arabic by a student who lives here.",
  heroCta: "Get the Course — €49",
  heroSecondaryCta: "Preview Module 1 Free →",
  notTextbook: {
    title: "This is NOT a Textbook Czech Course",
    body: "You won't memorize verb conjugation tables you'll never use. This is the course I wish someone gave me before I moved to Czechia. How to pass the embassy interview. How to survive your first week. How to order food without pointing at the menu. How to actually make Czech friends instead of spending 3 years only talking to other Arabs. Every lesson is built around a real situation you WILL face.",
  },
  includedTitle: "What's Included",
  included: [
    "5 modules, 35+ lessons",
    "Video lessons in Arabic with Czech on screen",
    "Downloadable cheat sheets for every lesson",
    "Audio versions for learning on the go",
    "Access to the student WhatsApp group",
    "Lifetime access — rewatch anytime, updates included",
  ],
  modulesTitle: "Course Modules",
  moduleLabel: "Module",
  modules: [
    {
      title: "Czechia Before You Arrive",
      subtitle: "Embassy interview prep + country knowledge",
      topics: [
        "What the embassy actually asks — and the answers that work",
        "Czech geography, politics, and culture basics (interview-ready)",
        "Understanding Czech education system vs. your country",
        "Your study plan explanation — how to sound prepared, not scripted",
        "Common embassy mistakes that get people rejected",
      ],
      trigger: "The embassy will ask you what you know about Czechia. Module 1 is your answer.",
    },
    {
      title: "Your First Week Survival Kit",
      subtitle: "Everything from airport to settled",
      topics: [
        "Airport to your accommodation — step by step",
        "Foreign police registration — what, where, when, documents",
        "SIM card, bank account, transport pass — the first-day checklist",
        "Your first grocery run — what to buy, where, how much",
        "Emergency Czech phrases you need immediately",
      ],
      trigger: null,
    },
    {
      title: "Daily Life Conversations",
      subtitle: "Restaurant, supermarket, transport, doctor, university",
      topics: [
        "Ordering food and drinks — real phrases, not textbook ones",
        "Supermarket and pharmacy — reading labels, asking for help",
        "Public transport — buying tickets, understanding announcements",
        "At the doctor — explaining symptoms, understanding instructions",
        "University admin — registration, ISIC card, library, exams",
      ],
      trigger: "Your Czech roommate will try to talk to you on day one. Module 3 is your answer.",
    },
    {
      title: "Understanding Czech People",
      subtitle: "Culture, making friends, avoiding common mistakes",
      topics: [
        "Why Czechs seem cold at first — and how they actually show friendship",
        "Social norms that are different from Arab culture",
        "How to make Czech friends (not just international students)",
        "Common cultural misunderstandings and how to avoid them",
        "Holidays, traditions, and social expectations",
      ],
      trigger: "You'll feel like an outsider for months unless someone explains how Czech social culture works. Module 4 is that explanation.",
    },
    {
      title: "Building Your Life Here",
      subtitle: "Work, money, travel, visa renewal",
      topics: [
        "Student jobs — what's legal, where to look, what pays well",
        "Managing your money — Czech banking, fees, sending money home",
        "Weekend trips — cheap travel to other European countries",
        "Visa renewal — timeline, documents, what's different the second time",
        "Long-term planning — staying after graduation, residence permit",
      ],
      trigger: null,
    },
  ],
  bundleTitle: "Choose Your Path",
  bundles: [
    {
      name: "Course Only",
      price: "€49",
      save: null,
      desc: "The full course — 5 modules, 35+ lessons, lifetime access.",
      cta: "Get the Course",
    },
    {
      name: "Course + Interview Prep",
      price: "€75",
      save: "Save €9",
      desc: "Best for students preparing for their embassy visit. Includes a live mock interview session.",
      cta: "Get the Bundle",
    },
    {
      name: "Full Application Package",
      price: "€350",
      save: "Course included FREE",
      desc: "Everything you need — from zero to visa. The course, interview prep, document review, and personal guidance.",
      cta: "Start My Application",
    },
  ],
  bestValue: "Best Value",
  previewTitle: "Free Preview",
  previewLesson: "Module 1, Lesson 1: What the Embassy Actually Asks",
  previewDesc: "Video coming soon — sign up to be notified when it's ready.",
  previewCta: "Notify Me on WhatsApp",
  bottomCta: {
    title: "Ready to Prepare Properly?",
    primary: "Get the Course — €49",
    secondary: "Or start with the free guides →",
  },
};

// ─── Arabic copy ────────────────────────────────────────────────────────────

const ar: typeof en = {
  badge: "49€ · وصول مدى الحياة",
  title: "أول 90 يوم في التشيك",
  subtitle: "لغة، ثقافة، تجهيز سفارة، وكل حاجة محدش بيقولهالك — بالعربي من طالب عايش هنا.",
  heroCta: "احصل على الكورس — 49€",
  heroSecondaryCta: "شوف الوحدة 1 مجانًا →",
  notTextbook: {
    title: "ده مش كورس تشيكي من كتاب",
    body: "مش هتحفظ جداول تصريف أفعال مش هتستخدمها. ده الكورس اللي كنت عايز حد يديهولي قبل ما أسافر التشيك. إزاي تعدي مقابلة السفارة. إزاي تعيش أول أسبوع. إزاي تطلب أكل من غير ما تشاور على المنيو. إزاي تعمل صحاب تشيك بدل ما تفضل 3 سنين بتتكلم مع عرب بس. كل درس مبني على موقف حقيقي هتواجهه.",
  },
  includedTitle: "إيه اللي جوه الكورس",
  included: [
    "5 وحدات، أكتر من 35 درس",
    "دروس فيديو بالعربي مع تشيكي على الشاشة",
    "ملخصات قابلة للتحميل لكل درس",
    "نسخ صوتية للتعلم وأنت ماشي",
    "دخول جروب واتساب الطلاب",
    "وصول مدى الحياة — اتفرج في أي وقت، التحديثات متضمنة",
  ],
  modulesTitle: "وحدات الكورس",
  moduleLabel: "الوحدة",
  modules: [
    {
      title: "التشيك قبل ما توصل",
      subtitle: "تجهيز مقابلة السفارة + معرفة عن البلد",
      topics: [
        "السفارة بتسأل إيه بالظبط — والإجابات اللي بتنفع",
        "جغرافيا وسياسة وثقافة التشيك (جاهز للمقابلة)",
        "فهم نظام التعليم التشيكي مقارنة ببلدك",
        "شرح خطتك الدراسية — إزاي تبان جاهز مش محفظ",
        "أخطاء السفارة الشائعة اللي بتسبب رفض",
      ],
      trigger: "السفارة هتسألك إيه تعرف عن التشيك. الوحدة 1 هي إجابتك.",
    },
    {
      title: "حقيبة النجاة لأول أسبوع",
      subtitle: "كل حاجة من المطار لحد ما تستقر",
      topics: [
        "من المطار لمكان سكنك — خطوة بخطوة",
        "تسجيل شرطة الأجانب — إيه وفين وإمتى والأوراق",
        "شريحة موبايل، حساب بنكي، اشتراك مواصلات — قائمة أول يوم",
        "أول مشوار سوبر ماركت — تشتري إيه ومنين وبكام",
        "جمل تشيكية طوارئ محتاجها فورًا",
      ],
      trigger: null,
    },
    {
      title: "محادثات الحياة اليومية",
      subtitle: "مطعم، سوبر ماركت، مواصلات، دكتور، جامعة",
      topics: [
        "طلب أكل وشرب — جمل حقيقية مش من كتاب",
        "سوبر ماركت وصيدلية — قراءة التسميات وطلب مساعدة",
        "مواصلات عامة — شراء تذاكر وفهم الإعلانات",
        "عند الدكتور — شرح الأعراض وفهم التعليمات",
        "إدارة الجامعة — التسجيل وكارت ISIC والمكتبة والامتحانات",
      ],
      trigger: "زميلك التشيكي في السكن هيحاول يتكلم معاك أول يوم. الوحدة 3 هي إجابتك.",
    },
    {
      title: "فهم الشعب التشيكي",
      subtitle: "ثقافة، صداقات، تجنب الأخطاء الشائعة",
      topics: [
        "ليه التشيك بيبانوا باردين في الأول — وإزاي بيبينوا الصداقة فعلًا",
        "عادات اجتماعية مختلفة عن الثقافة العربية",
        "إزاي تعمل صحاب تشيك (مش طلاب دوليين بس)",
        "سوء فهم ثقافي شائع وإزاي تتجنبه",
        "أعياد وتقاليد وتوقعات اجتماعية",
      ],
      trigger: "هتحس إنك غريب لشهور إلا لو حد شرحلك إزاي الثقافة الاجتماعية التشيكية شغالة. الوحدة 4 هي الشرح ده.",
    },
    {
      title: "بناء حياتك هنا",
      subtitle: "شغل، فلوس، سفر، تجديد الفيزا",
      topics: [
        "وظائف طلاب — إيه القانوني وتدور فين وإيه اللي بيدفع كويس",
        "إدارة فلوسك — بنوك تشيكية ورسوم وتحويل فلوس للبلد",
        "رحلات ويك إند — سفر رخيص لدول أوروبية تانية",
        "تجديد الفيزا — الجدول الزمني والأوراق وإيه المختلف المرة التانية",
        "تخطيط طويل المدى — البقاء بعد التخرج وتصريح الإقامة",
      ],
      trigger: null,
    },
  ],
  bundleTitle: "اختار طريقك",
  bundles: [
    {
      name: "الكورس لوحده",
      price: "49€",
      save: null,
      desc: "الكورس الكامل — 5 وحدات، أكتر من 35 درس، وصول مدى الحياة.",
      cta: "احصل على الكورس",
    },
    {
      name: "الكورس + تجهيز المقابلة",
      price: "75€",
      save: "وفر 9€",
      desc: "الأفضل للطلاب اللي بيجهزوا لمقابلة السفارة. يشمل جلسة مقابلة تجريبية حية.",
      cta: "احصل على الباقة",
    },
    {
      name: "الباقة الكاملة",
      price: "350€",
      save: "الكورس مجانًا",
      desc: "كل حاجة — من الصفر للفيزا. الكورس، تجهيز المقابلة، مراجعة الأوراق، وتوجيه شخصي.",
      cta: "ابدأ طلبي",
    },
  ],
  bestValue: "الأفضل قيمة",
  previewTitle: "معاينة مجانية",
  previewLesson: "الوحدة 1، الدرس 1: السفارة بتسأل إيه بالظبط",
  previewDesc: "الفيديو قريبًا — سجل عشان نبلغك لما يكون جاهز.",
  previewCta: "بلغني على واتساب",
  bottomCta: {
    title: "جاهز تجهز صح؟",
    primary: "احصل على الكورس — 49€",
    secondary: "أو ابدأ بالأدلة المجانية →",
  },
};
