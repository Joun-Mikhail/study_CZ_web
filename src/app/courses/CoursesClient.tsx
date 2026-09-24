"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WHATSAPP_URL, PAYMENT_LINKS, whatsappWithContext } from "@/config/contact";
import { motion } from "framer-motion";
import Image from "next/image";
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
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: replace with actual delivery date once confirmed
const DELIVERY_DATE = "TBD";

export default function CoursesClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showDashboardLink, setShowDashboardLink] = useState(false);

  useEffect(() => {
    try {
      setShowDashboardLink(localStorage.getItem("studycz_access") === "true");
    } catch {}
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />

      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Already purchased banner */}
        {showDashboardLink && (
          <div className="max-w-3xl mx-auto mb-4">
            <a
              href="/courses/learn"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/15 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              {locale === "ar" ? "عندك الكورس بالفعل — روح للوحة التحكم" : "You already have the course — Go to Dashboard →"}
            </a>
          </div>
        )}

        {/* Hero */}
        <section className="max-w-3xl mx-auto text-center mb-16 relative overflow-hidden rounded-3xl py-2">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/prague-scenic.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight/85 via-midnight/80 to-midnight/90" />
          </div>
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
            viewport={{ once: true, margin: "-50px" }}
            className="motion-safe-fallback relative rounded-2xl border border-amber/20 bg-amber/[0.03] px-6 sm:px-8 py-7"
          >
            <div aria-hidden="true" className="absolute top-4 start-4 text-4xl text-amber/20 font-serif leading-none select-none pointer-events-none">&ldquo;</div>
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
                  <div
                    className={cn(
                      "grid transition-all duration-200 ease-in-out",
                      openModule === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Choose Your Path — two cards */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-6">{t.bundleTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.bundles.map((b, i) => (
              <GlassCard
                key={i}
                hoverEffect={i === 1 ? "glow" : "border"}
                className={cn(
                  "flex flex-col",
                  i === 1 && "border-amber/40 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
                )}
              >
                {i === 1 && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber text-midnight text-xs font-semibold mb-2 self-start">
                    {t.bestValue}
                  </span>
                )}
                <h3 className="font-semibold text-text-primary mb-1">{b.name}</h3>
                <p className="text-2xl font-bold text-amber mb-1">{b.price}</p>
                {b.save && <p className="text-xs text-green-400 mb-2">{b.save}</p>}
                <p className="text-xs text-text-muted mb-4 flex-1">{b.desc}</p>
                <MagneticButton
                  variant={i === 1 ? "primary" : "secondary"}
                  href={i === 0 ? PAYMENT_LINKS.course : PAYMENT_LINKS.fullPackageStep1}
                  className="w-full"
                  size="sm"
                >
                  {b.cta}
                </MagneticButton>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Delivery guarantee */}
        <section className="max-w-2xl mx-auto mb-16">
          <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.04] p-6 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-primary mb-1">{t.guarantee.title.replace("[DATE]", DELIVERY_DATE)}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{t.guarantee.body}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-6">{t.faqTitle}</h2>
          <div className="space-y-2">
            {t.faq.map((item, i) => (
              <div key={i} className="rounded-xl border border-border-subtle bg-surface/60 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-start"
                >
                  <p className="flex-1 text-sm font-medium text-text-primary">{item.q}</p>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-text-muted shrink-0 transition-transform duration-200",
                      openFaq === i && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-200 ease-in-out",
                    openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free preview — Module 1 Lesson 1 outline */}
        <section id="preview" className="max-w-2xl mx-auto mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-6">{t.previewTitle}</h2>
          <GlassCard hoverEffect="glow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center shrink-0">
                <PlayCircle className="w-5 h-5 text-amber" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{t.previewLesson}</h3>
                <p className="text-xs text-text-muted">{t.previewSubtitle}</p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <p className="text-sm text-text-secondary">{t.previewIntro}</p>

              {t.previewQuestions.map((q, i) => (
                <div key={i} className="rounded-xl border border-border-subtle bg-surface/40 p-4">
                  <p className="text-sm font-medium text-text-primary mb-1">{q.question}</p>
                  <p className="text-xs text-text-muted mb-2">{q.testing}</p>
                  <p className="text-xs text-text-secondary">{q.insight}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-muted text-center mb-4">{t.previewOutro}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <MagneticButton variant="primary" href={PAYMENT_LINKS.course}>
                {t.previewBuyCta}
              </MagneticButton>
              <MagneticButton variant="secondary" href={whatsappWithContext("the First 90 Days course")}>
                <MessageCircle className="w-4 h-4" />
                {t.previewCta}
              </MagneticButton>
            </div>
          </GlassCard>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">{t.bottomCta.title}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            <MagneticButton variant="primary" size="lg" href={PAYMENT_LINKS.course}>
              {t.bottomCta.primary}
            </MagneticButton>
            <MagneticButton variant="ghost" href="/qa">
              {t.bottomCta.secondary}
            </MagneticButton>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp button */}
      <a
        href={whatsappWithContext("the First 90 Days course")}
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

// ─── English copy ───────────────────────────────────────────────────────────

const en = {
  badge: "€49 · Lifetime access",
  title: "Your First 90 Days in Czechia",
  subtitle:
    "Language, culture, embassy prep, and everything nobody tells you. Taught in Arabic by a student who lives here.",
  heroCta: "Get the Course (€49)",
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
    "Lifetime access, rewatch anytime, updates included",
  ],
  modulesTitle: "Course Modules",
  moduleLabel: "Module",
  modules: [
    {
      title: "Czechia Before You Arrive",
      subtitle: "Embassy interview prep + country knowledge",
      topics: [
        "What the embassy actually asks, and the answers that work",
        "Czech geography, politics, and culture basics (interview-ready)",
        "Understanding Czech education system vs. your country",
        "Your study plan explanation: how to sound prepared, not scripted",
        "Common embassy mistakes that get people rejected",
      ],
      trigger: "The embassy will ask you what you know about Czechia. Module 1 is your answer.",
    },
    {
      title: "Your First Week Survival Kit",
      subtitle: "Everything from airport to settled",
      topics: [
        "Airport to your accommodation, step by step",
        "Foreign police registration: what, where, when, documents",
        "SIM card, bank account, transport pass (the first-day checklist)",
        "Your first grocery run: what to buy, where, how much",
        "Emergency Czech phrases you need immediately",
      ],
      trigger: null,
    },
    {
      title: "Daily Life Conversations",
      subtitle: "Restaurant, supermarket, transport, doctor, university",
      topics: [
        "Ordering food and drinks with real phrases, not textbook ones",
        "Supermarket and pharmacy: reading labels, asking for help",
        "Public transport: buying tickets, understanding announcements",
        "At the doctor: explaining symptoms, understanding instructions",
        "University admin: registration, ISIC card, library, exams",
      ],
      trigger: "Your Czech roommate will try to talk to you on day one. Module 3 is your answer.",
    },
    {
      title: "Understanding Czech People",
      subtitle: "Culture, making friends, avoiding common mistakes",
      topics: [
        "Why Czechs seem cold at first, and how they actually show friendship",
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
        "Student jobs: what is legal, where to look, what pays well",
        "Managing your money: Czech banking, fees, sending money home",
        "Weekend trips and cheap travel to other European countries",
        "Visa renewal: timeline, documents, what is different the second time",
        "Long-term planning: staying after graduation, residence permit",
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
      desc: "The full course: 5 modules, 35+ lessons, lifetime access.",
      cta: "Get the Course",
    },
    {
      name: "Full Application Package",
      price: "€350",
      save: "Course included FREE",
      desc: "Everything from zero to visa. Course included free, plus interview prep, document review, and personal guidance throughout.",
      cta: "Start My Application",
    },
  ],
  bestValue: "Best Value",
  guarantee: {
    title: "Pre-sale guarantee: delivered by [DATE] or full refund",
    body: "This course is currently in production. By purchasing now at the founding price, you are locking in the lowest price it will ever be. If the full course content is not delivered by the date above, you will receive a complete refund — no questions asked.",
  },
  faqTitle: "Common Questions",
  faq: [
    {
      q: "When will the full course be ready?",
      a: "The course is currently being recorded. The target delivery date is shown in the guarantee banner above. All pre-sale buyers get access to modules as they are completed, and the full course will be delivered by the stated date or you get a full refund.",
    },
    {
      q: "What if I buy now and it's not delivered on time?",
      a: "You get a full refund, no questions asked. The delivery guarantee is a real commitment, not marketing.",
    },
    {
      q: "Is this course in Arabic or Czech?",
      a: "The lessons are taught in Arabic. Czech words, phrases, and on-screen text appear alongside so you learn them in context — not from a textbook.",
    },
    {
      q: "I already use the free guides on this site. Why would I pay for this?",
      a: "The free guides cover facts: deadlines, documents, costs. The course covers situations: what to say at the embassy, how to survive your first week, how to order food, how to make Czech friends. They are completely different.",
    },
    {
      q: "Do I get a certificate?",
      a: "This is planned but not yet confirmed. We will update this page once the details are finalized.",
    },
    {
      q: "Can I get a refund after the course is delivered?",
      a: "The pre-sale guarantee covers delivery. Once the course is delivered and you have access to the full content, refunds are handled on a case-by-case basis — message us on WhatsApp.",
    },
  ],
  previewTitle: "Free Preview",
  previewLesson: "Module 1, Lesson 1: What the Embassy Actually Asks",
  previewSubtitle: "A look at what this lesson covers",
  previewIntro: "The embassy interview is where most students fail. Not because they are unqualified, but because they do not understand what the officer is really testing. Here are real questions from Czech embassy interviews:",
  previewQuestions: [
    {
      question: "\"Why did you choose the Czech Republic?\"",
      testing: "What the officer is testing:",
      insight: "They want to hear a specific reason, not a generic answer. \"Good education\" is not enough. They need to believe you researched this country specifically and have a real reason to be here rather than somewhere else.",
    },
    {
      question: "\"What will you study and at which university?\"",
      testing: "What the officer is testing:",
      insight: "They are checking whether you actually know your own study plan. They will ask follow-up questions. If you cannot name your faculty, program duration, or language of instruction, they assume someone else filled out your application.",
    },
    {
      question: "\"How will you support yourself financially?\"",
      testing: "What the officer is testing:",
      insight: "They need to know you will not become a financial burden. They want to see proof and hear a clear plan, whether it is family support, a scholarship, or personal savings. Vague answers raise red flags.",
    },
    {
      question: "\"Do you plan to return to your country after your studies?\"",
      testing: "What the officer is testing:",
      insight: "This is the question that catches people off guard. They are assessing immigration risk. The course teaches you how to answer honestly while demonstrating ties to your home country.",
    },
  ],
  previewOutro: "The full lesson covers 12+ questions with model answers, common mistakes, and what to do if you get a question you did not prepare for.",
  previewBuyCta: "Get the Full Course (€49)",
  previewCta: "Ask Me on WhatsApp",
  bottomCta: {
    title: "Ready to Prepare Properly?",
    primary: "Get the Course (€49)",
    secondary: "Or start with the free guides →",
  },
  whatsappTooltip: "Not sure if this is for you? Ask me, no pressure.",
};

// ─── Arabic copy ────────────────────────────────────────────────────────────

const ar: typeof en = {
  badge: "49€ · وصول مدى الحياة",
  title: "أول 90 يوم في التشيك",
  subtitle: "لغة، ثقافة، تجهيز سفارة، وكل حاجة محدش بيقولهالك. بالعربي من طالب عايش هنا.",
  heroCta: "احصل على الكورس (49€)",
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
    "وصول مدى الحياة. اتفرج في أي وقت، التحديثات متضمنة",
  ],
  modulesTitle: "وحدات الكورس",
  moduleLabel: "الوحدة",
  modules: [
    {
      title: "التشيك قبل ما توصل",
      subtitle: "تجهيز مقابلة السفارة + معرفة عن البلد",
      topics: [
        "السفارة بتسأل إيه بالظبط والإجابات اللي بتنفع",
        "جغرافيا وسياسة وثقافة التشيك (جاهز للمقابلة)",
        "فهم نظام التعليم التشيكي مقارنة ببلدك",
        "شرح خطتك الدراسية: إزاي تبان جاهز مش محفظ",
        "أخطاء السفارة الشائعة اللي بتسبب رفض",
      ],
      trigger: "السفارة هتسألك إيه تعرف عن التشيك. الوحدة 1 هي إجابتك.",
    },
    {
      title: "حقيبة النجاة لأول أسبوع",
      subtitle: "كل حاجة من المطار لحد ما تستقر",
      topics: [
        "من المطار لمكان سكنك، خطوة بخطوة",
        "تسجيل شرطة الأجانب: إيه وفين وإمتى والأوراق",
        "شريحة موبايل، حساب بنكي، اشتراك مواصلات. قائمة أول يوم",
        "أول مشوار سوبر ماركت: تشتري إيه ومنين وبكام",
        "جمل تشيكية طوارئ محتاجها فورًا",
      ],
      trigger: null,
    },
    {
      title: "محادثات الحياة اليومية",
      subtitle: "مطعم، سوبر ماركت، مواصلات، دكتور، جامعة",
      topics: [
        "طلب أكل وشرب: جمل حقيقية مش من كتاب",
        "سوبر ماركت وصيدلية: قراءة التسميات وطلب مساعدة",
        "مواصلات عامة: شراء تذاكر وفهم الإعلانات",
        "عند الدكتور: شرح الأعراض وفهم التعليمات",
        "إدارة الجامعة: التسجيل وكارت ISIC والمكتبة والامتحانات",
      ],
      trigger: "زميلك التشيكي في السكن هيحاول يتكلم معاك أول يوم. الوحدة 3 هي إجابتك.",
    },
    {
      title: "فهم الشعب التشيكي",
      subtitle: "ثقافة، صداقات، تجنب الأخطاء الشائعة",
      topics: [
        "ليه التشيك بيبانوا باردين في الأول وإزاي بيبينوا الصداقة فعلًا",
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
        "وظائف طلاب: إيه القانوني وتدور فين وإيه اللي بيدفع كويس",
        "إدارة فلوسك: بنوك تشيكية ورسوم وتحويل فلوس للبلد",
        "رحلات ويك إند: سفر رخيص لدول أوروبية تانية",
        "تجديد الفيزا: الجدول الزمني والأوراق وإيه المختلف المرة التانية",
        "تخطيط طويل المدى: البقاء بعد التخرج وتصريح الإقامة",
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
      desc: "الكورس الكامل: 5 وحدات، أكتر من 35 درس، وصول مدى الحياة.",
      cta: "احصل على الكورس",
    },
    {
      name: "الباقة الكاملة",
      price: "350€",
      save: "الكورس مجانًا",
      desc: "كل حاجة من الصفر للفيزا. الكورس مجانا، مع تجهيز المقابلة، مراجعة الأوراق، وتوجيه شخصي.",
      cta: "ابدأ طلبي",
    },
  ],
  bestValue: "الأفضل قيمة",
  guarantee: {
    title: "ضمان ما قبل البيع: التسليم بحلول [DATE] أو استرداد كامل",
    body: "الكورس ده لسه في مرحلة الإنتاج. بشرائك دلوقتي بالسعر التأسيسي، أنت بتضمن أقل سعر هيتعرض بيه. لو المحتوى الكامل للكورس ما اتسلّمش في الموعد المحدد فوق، هترجع لك فلوسك بالكامل — من غير أي أسئلة.",
  },
  faqTitle: "أسئلة شائعة",
  faq: [
    {
      q: "امتى الكورس الكامل هيكون جاهز؟",
      a: "الكورس لسه بيتسجل. الموعد المستهدف للتسليم موجود في بانر الضمان فوق. كل اللي اشتروا بسعر ما قبل البيع هيوصلهم الوحدات أول ما تتسلم، والكورس الكامل هيتسلم في الموعد المحدد أو هترجع لك فلوسك.",
    },
    {
      q: "لو اشتريت دلوقتي والكورس ما اتسلمش في الوقت؟",
      a: "هترجع لك فلوسك بالكامل، من غير أي أسئلة. ضمان التسليم ده التزام حقيقي، مش تسويق.",
    },
    {
      q: "الكورس بالعربي ولا بالتشيكي؟",
      a: "الدروس بالعربي. الكلمات والجمل والنصوص التشيكية بتظهر جنبها عشان تتعلمها في السياق — مش من كتاب.",
    },
    {
      q: "أنا أصلاً بستخدم الأدلة المجانية على الموقع. ليه أدفع؟",
      a: "الأدلة المجانية بتغطي معلومات: مواعيد، وثائق، تكاليف. الكورس بيغطي مواقف: تقول إيه في السفارة، إزاي تعدي أول أسبوع، إزاي تطلب أكل، إزاي تكوّن صداقات مع التشيك. دول حاجتين مختلفين تماماً.",
    },
    {
      q: "هاخد شهادة؟",
      a: "ده مخطط له بس لسه ما اتأكدش. هنحدّث الصفحة دي أول ما التفاصيل تتحدد.",
    },
    {
      q: "أقدر أسترجع فلوسي بعد ما الكورس يتسلم؟",
      a: "ضمان ما قبل البيع بيغطي التسليم. بعد ما الكورس يتسلم ويكون عندك المحتوى الكامل، الاسترداد بيتعامل معاه حالة بحالة — كلمنا على واتساب.",
    },
  ],
  previewTitle: "معاينة مجانية",
  previewLesson: "الوحدة 1، الدرس 1: السفارة بتسأل إيه بالظبط",
  previewSubtitle: "نظرة على محتوى الدرس",
  previewIntro: "مقابلة السفارة هي المكان اللي أغلب الطلاب بيفشلوا فيه. مش عشان مش مؤهلين، لكن عشان مش فاهمين الأوفيسر بيختبر إيه بالظبط. دي أسئلة حقيقية من مقابلات السفارة التشيكية:",
  previewQuestions: [
    {
      question: "\"ليه اخترت التشيك؟\"",
      testing: "الأوفيسر بيختبر إيه:",
      insight: "عايز يسمع سبب محدد، مش إجابة عامة. \"التعليم كويس\" مش كفاية. لازم يصدق إنك بحثت عن البلد دي بالذات وعندك سبب حقيقي تكون هنا مش في مكان تاني.",
    },
    {
      question: "\"هتدرس إيه وفي أنهي جامعة؟\"",
      testing: "الأوفيسر بيختبر إيه:",
      insight: "بيتأكد إنك فعلًا عارف خطتك الدراسية. هيسأل أسئلة متابعة. لو مش قادر تقول اسم الكلية أو مدة البرنامج أو لغة الدراسة، هيفترض إن حد تاني ملّا الطلب بدالك.",
    },
    {
      question: "\"هتصرف على نفسك إزاي ماديًا؟\"",
      testing: "الأوفيسر بيختبر إيه:",
      insight: "محتاج يعرف إنك مش هتبقى عبء مادي. عايز يشوف إثبات ويسمع خطة واضحة، سواء دعم عائلي أو منحة أو مدخرات شخصية. الإجابات الغامضة بترفع علامات حمراء.",
    },
    {
      question: "\"بتخطط ترجع بلدك بعد الدراسة؟\"",
      testing: "الأوفيسر بيختبر إيه:",
      insight: "ده السؤال اللي بيمسك الناس على حين غرة. بيقيّم مخاطر الهجرة. الكورس بيعلمك إزاي تجاوب بصراحة وفي نفس الوقت تثبت ارتباطك ببلدك.",
    },
  ],
  previewOutro: "الدرس الكامل بيغطي أكتر من 12 سؤال مع إجابات نموذجية وأخطاء شائعة وإيه تعمل لو جالك سؤال مكنتش متحضر له.",
  previewBuyCta: "احصل على الكورس الكامل (49€)",
  previewCta: "اسألني على واتساب",
  bottomCta: {
    title: "جاهز تجهز صح؟",
    primary: "احصل على الكورس (49€)",
    secondary: "أو ابدأ بالأدلة المجانية →",
  },
  whatsappTooltip: "مش متأكد إن ده ليك؟ اسألني، من غير ضغط.",
};
