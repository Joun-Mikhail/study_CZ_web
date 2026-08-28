"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PAYMENT_LINKS, WHATSAPP_URL } from "@/config/contact";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Shield,
  Clock,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Target,
  Mic,
  FileText,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function InterviewPrepClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero image */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative w-full h-[180px] sm:h-[240px] rounded-2xl overflow-hidden">
            <Image
              src="/images/prague-bridge.jpg"
              alt="Charles Bridge in Prague"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-midnight/20 to-transparent" />
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {t.hero.title}
            </h1>
            <p className="text-lg text-amber font-medium mb-4">
              {t.hero.subtitle}
            </p>
            <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto mb-8">
              {t.hero.body}
            </p>
            <MagneticButton variant="primary" size="lg" href={PAYMENT_LINKS.interviewPrep}>
              {t.hero.cta}
            </MagneticButton>
            <p className="text-xs text-text-muted mt-3">{t.hero.micro}</p>
          </motion.div>
        </section>

        {/* What actually happens */}
        <section className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
              {t.timeline.heading}
            </h2>
            <div className="space-y-4">
              {t.timeline.steps.map((step, i) => (
                <GlassCard key={i} hoverEffect="border">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-amber" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-amber font-medium mb-1">{step.time}</p>
                      <h3 className="text-sm font-semibold text-text-primary mb-1">{step.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </section>

        {/* What the officer is actually testing */}
        <section className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-text-primary mb-2 text-center">
              {t.testing.heading}
            </h2>
            <p className="text-text-muted text-sm text-center mb-6">{t.testing.sub}</p>
            <div className="space-y-3">
              {t.testing.questions.map((q, i) => (
                <QuestionCard key={i} question={q.question} testing={q.testing} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Most common failure */}
        <section className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="rounded-2xl border border-amber/20 bg-amber/5 p-6 sm:p-8">
              <div className="flex gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber shrink-0 mt-0.5" />
                <h2 className="text-lg font-bold text-text-primary">{t.failure.heading}</h2>
              </div>
              <p className="text-text-secondary leading-relaxed">{t.failure.body}</p>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
            {t.faq.heading}
          </h2>
          <div className="space-y-3">
            {t.faq.items.map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard hoverEffect="glow" className="text-center">
              <Shield className="w-8 h-8 text-amber mx-auto mb-3" />
              <h2 className="text-xl font-bold text-text-primary mb-2">{t.finalCta.title}</h2>
              <p className="text-sm text-text-secondary mb-5">{t.finalCta.body}</p>
              <MagneticButton variant="primary" size="lg" href={PAYMENT_LINKS.interviewPrep}>
                {t.finalCta.cta}
              </MagneticButton>
              <p className="text-xs text-text-muted mt-3">{t.finalCta.micro}</p>
              <div className="mt-4 pt-4 border-t border-border-subtle">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.finalCta.whatsapp}
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function QuestionCard({ question, testing }: { question: string; testing: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface/50 backdrop-blur-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-start"
      >
        <Target className="w-4 h-4 text-amber shrink-0" />
        <span className="flex-1 text-sm font-medium text-text-primary">{question}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-text-muted shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border-subtle">
          <p className="text-sm text-text-secondary mt-3 leading-relaxed">{testing}</p>
        </div>
      )}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface/50 backdrop-blur-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-start"
      >
        <span className="flex-1 text-sm font-medium text-text-primary">{question}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-text-muted shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border-subtle">
          <p className="text-sm text-text-secondary mt-3 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

// ─── English copy ───────────────────────────────────────────────────────────

const en = {
  hero: {
    title: "Embassy Interview Prep",
    subtitle: "A list of questions isn't preparation.",
    body: "Reading fifteen questions on paper and being asked them by a person are not the same experience. You don't find out you freeze on question six by reading it. You find out when someone asks you.",
    cta: "Book My Mock Interview -- EUR 39",
    micro: "Session scheduled within 48 hours of booking",
  },
  timeline: {
    heading: "What Actually Happens",
    steps: [
      {
        icon: Users,
        time: "Minutes 0-5",
        title: "Your situation",
        desc: "Program, university, timeline, funding. I need to understand your profile before the mock starts.",
      },
      {
        icon: Mic,
        time: "Minutes 5-35",
        title: "The mock interview",
        desc: "Real questions, real order, real follow-ups. I don't stop to help you -- same as the real one. You'll feel the pressure, and that's the point.",
      },
      {
        icon: Target,
        time: "Minutes 35-45",
        title: "The debrief",
        desc: "Where you were strong, where you cracked, what to change. Specific feedback, not general advice.",
      },
      {
        icon: FileText,
        time: "After the session",
        title: "Written cheat sheet + ongoing support",
        desc: "15 most common questions with model answers. WhatsApp open until your interview date for last-minute questions.",
      },
    ],
  },
  testing: {
    heading: "What the Officer Is Actually Testing",
    sub: "It's not a quiz. Every question has a purpose behind it.",
    questions: [
      {
        question: "\"Why Czechia?\"",
        testing: "They're testing whether you chose deliberately or applied everywhere. A memorised paragraph about Prague Castle doesn't work. They want to hear a specific reason that connects to your life.",
      },
      {
        question: "\"Why this program?\"",
        testing: "They're testing whether your academic history connects to your stated plan. If you studied engineering and are applying for philosophy, you need a story that makes sense.",
      },
      {
        question: "\"How will you support yourself?\"",
        testing: "They're testing whether your financial story is coherent, not just whether you have the money. A sudden large deposit the week before your interview raises more questions than it answers.",
      },
      {
        question: "\"What will you do after graduating?\"",
        testing: "They're testing immigration intent. They want to hear a plan that includes returning home or a legitimate reason to stay -- not an open-ended \"I'll see what happens.\"",
      },
      {
        question: "\"What do you know about the Czech Republic?\"",
        testing: "They're testing genuine interest versus a memorised paragraph. Mentioning something specific about the city you'll live in or the culture you've read about goes further than Wikipedia facts about population and GDP.",
      },
    ],
  },
  failure: {
    heading: "The Most Common Failure",
    body: "The single most common reason capable students get rejected isn't documents. It's an unclear study plan. If you can't explain in two sentences why this program, in this country, connects to what you've studied and what you want to do -- that's the gap. And it's fixable in one session.",
  },
  faq: {
    heading: "Common Questions",
    items: [
      {
        q: "How far before my interview should we do this?",
        a: "At least two weeks. You want time to practise what we fix and let it settle. Cramming the day before helps, but two weeks is where the real confidence comes from.",
      },
      {
        q: "What if my interview is in three days?",
        a: "Message me on WhatsApp. I'll fit you in if I can. It's not ideal, but even a last-minute session catches the biggest gaps.",
      },
      {
        q: "Is this in Arabic or English?",
        a: "Your choice. We can also practise in English if your interview will be conducted in English -- some consulates do this.",
      },
      {
        q: "Which embassies do you know?",
        a: "Cairo, Amman, Beirut and others. Questions are broadly consistent across consulates, and I update the question bank from students who've just been through their interviews.",
      },
    ],
  },
  finalCta: {
    title: "Don't Walk In Unprepared",
    body: "Students get rejected not because of their documents, but because of one answer in a ten-minute interview. A 45-minute session can change that.",
    cta: "Book My Mock Interview -- EUR 39",
    micro: "Secure payment via Stripe. Full refund if the session doesn't happen.",
    whatsapp: "Not sure? Ask me on WhatsApp first -- no pressure",
  },
};

// ─── Arabic copy ────────────────────────────────────────────────────────────

const ar: typeof en = {
  hero: {
    title: "تحضير مقابلة السفارة",
    subtitle: "قايمة أسئلة مش تحضير.",
    body: "قراءة 15 سؤال على ورق وإن حد يسألك وجها لوجه تجربتين مختلفين تماما. مش هتعرف إنك بتتلخبط في السؤال السادس إلا لما حد يسألك.",
    cta: "احجز مقابلة تجريبية -- 39 يورو",
    micro: "الجلسة بتتحدد خلال 48 ساعة من الحجز",
  },
  timeline: {
    heading: "إيه اللي بيحصل فعلا",
    steps: [
      {
        icon: Users,
        time: "الدقايق 0-5",
        title: "وضعك",
        desc: "البرنامج، الجامعة، الجدول الزمني، التمويل. محتاج أفهم ملفك قبل ما نبدأ.",
      },
      {
        icon: Mic,
        time: "الدقايق 5-35",
        title: "المقابلة التجريبية",
        desc: "أسئلة حقيقية، ترتيب حقيقي، أسئلة متابعة حقيقية. مش هوقف أساعدك -- زي الحقيقية بالظبط.",
      },
      {
        icon: Target,
        time: "الدقايق 35-45",
        title: "التقييم",
        desc: "فين كنت قوي، فين اتلخبطت، إيه اللي محتاج يتغير. ملاحظات محددة، مش نصايح عامة.",
      },
      {
        icon: FileText,
        time: "بعد الجلسة",
        title: "ملخص مكتوب + دعم مستمر",
        desc: "أكتر 15 سؤال شيوعا مع إجابات نموذجية. واتساب مفتوح لحد يوم مقابلتك.",
      },
    ],
  },
  testing: {
    heading: "إيه اللي الضابط بيختبره فعلا",
    sub: "مش كويز. كل سؤال وراه هدف.",
    questions: [
      {
        question: "\"ليه التشيك؟\"",
        testing: "بيختبروا لو اخترت بقصد ولا قدمت في كل حتة. فقرة محفوظة عن قلعة براغ مش هتنفع. عايزين يسمعوا سبب محدد يتربط بحياتك.",
      },
      {
        question: "\"ليه البرنامج ده؟\"",
        testing: "بيختبروا لو تاريخك الأكاديمي متربط بخطتك. لو درست هندسة وبتقدم على فلسفة، محتاج قصة منطقية.",
      },
      {
        question: "\"هتصرف على نفسك إزاي؟\"",
        testing: "بيختبروا لو قصتك المالية متماسكة، مش بس لو عندك الفلوس. إيداع كبير مفاجئ قبل المقابلة بأسبوع بيثير أسئلة أكتر ما بيجاوب.",
      },
      {
        question: "\"هتعمل إيه بعد التخرج؟\"",
        testing: "بيختبروا نية الهجرة. عايزين يسمعوا خطة تشمل الرجوع أو سبب مشروع للبقاء -- مش \"هشوف الأمور\".",
      },
      {
        question: "\"تعرف إيه عن التشيك؟\"",
        testing: "بيختبروا الاهتمام الحقيقي ولا فقرة محفوظة. ذكر حاجة محددة عن المدينة اللي هتعيش فيها أحسن من معلومات ويكيبيديا عن عدد السكان.",
      },
    ],
  },
  failure: {
    heading: "أكتر سبب شائع للرفض",
    body: "أكتر سبب شائع لرفض طلاب مؤهلين مش الأوراق. ده خطة دراسية مش واضحة. لو ماتقدرش تشرح في جملتين ليه البرنامج ده، في البلد دي، متربط باللي درسته واللي عايز تعمله -- دي الفجوة. وممكن تتصلح في جلسة واحدة.",
  },
  faq: {
    heading: "أسئلة شائعة",
    items: [
      {
        q: "قبل مقابلتي بقد إيه لازم نعمل ده؟",
        a: "أسبوعين على الأقل. محتاج وقت تتدرب على اللي هنصلحه وتخليه يستقر. المراجعة قبلها بيوم بتفيد، بس أسبوعين هي اللي بتجيب الثقة الحقيقية.",
      },
      {
        q: "لو مقابلتي بعد 3 أيام؟",
        a: "راسلني على واتساب. هحاول ألاقيلك وقت. مش مثالي، بس حتى جلسة آخر لحظة بتمسك أكبر الأخطاء.",
      },
      {
        q: "الجلسة بالعربي ولا بالإنجليزي؟",
        a: "اختيارك. ممكن كمان نتدرب بالإنجليزي لو مقابلتك هتكون بالإنجليزي -- بعض القنصليات بتعمل كده.",
      },
      {
        q: "أي سفارات بتعرفها؟",
        a: "القاهرة، عمان، بيروت وغيرهم. الأسئلة متشابهة بشكل عام، وبحدث بنك الأسئلة من طلاب لسه عاملين مقابلاتهم.",
      },
    ],
  },
  finalCta: {
    title: "ماتدخلش مش مستعد",
    body: "الطلاب بيترفضوا مش بسبب أوراقهم، بس بسبب إجابة واحدة في مقابلة عشر دقايق. جلسة 45 دقيقة ممكن تغير ده.",
    cta: "احجز مقابلة تجريبية -- 39 يورو",
    micro: "دفع آمن عبر Stripe. استرداد كامل لو الجلسة ماتمتش.",
    whatsapp: "مش متأكد؟ اسألني على واتساب الأول -- من غير أي ضغط",
  },
};
