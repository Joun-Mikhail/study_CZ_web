"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Question {
  q: { en: string; ar: string };
  why: { en: string; ar: string };
}

const questions: Question[] = [
  {
    q: {
      en: "Has the person advising me ever been to the Czech Republic?",
      ar: "هل الشخص اللي بينصحني زار التشيك قبل كده؟",
    },
    why: {
      en: "Not the company, the specific person handling my file. Someone who's never seen the country can't tell you which dorm to avoid or how the foreign police office works.",
      ar: "مش الشركة، الشخص اللي ماسك ملفي بالتحديد. حد عمره ما شاف البلد مش هيعرف يقولك أي سكن تتجنبه أو شرطة الأجانب بتشتغل ازاي.",
    },
  },
  {
    q: {
      en: "Is this person full-time, and will they still handle my case in six months?",
      ar: "هل الشخص ده شغال فول تايم، ولسه هيتابع ملفي بعد 6 شهور؟",
    },
    why: {
      en: "Applications take months. If your advisor is seasonal, you may be reassigned to someone starting from zero.",
      ar: "الطلبات بتاخد شهور. لو المستشار بتاعك موسمي، ممكن يحولوك لحد بيبدأ من الصفر.",
    },
  },
  {
    q: {
      en: 'What exactly does "interview preparation" include?',
      ar: '"تجهيز المقابلة" يعني ايه بالظبط؟',
    },
    why: {
      en: "Ask specifically: a live mock interview with a person, or a document of questions? These are completely different products.",
      ar: "اسأل بالتحديد: مقابلة تجريبية لايف مع شخص، ولا ورقة فيها اسئلة؟ دول منتجين مختلفين تماما.",
    },
  },
  {
    q: {
      en: "What is the total cost in writing, including everything?",
      ar: "ايه التكلفة الاجمالية مكتوبة، شاملة كل حاجة؟",
    },
    why: {
      en: "Ask what is not included. Translation? Apostille? Application fees? Visa fee?",
      ar: "اسأل ايه اللي مش مشمول. ترجمة؟ ابوستيل؟ رسوم تقديم؟ رسوم تأشيرة؟",
    },
  },
  {
    q: {
      en: "Can you show me the tuition and deadline for my program right now?",
      ar: "تقدر تورينى الرسوم الدراسية والديدلاين لبرنامجى دلوقتى؟",
    },
    why: {
      en: "Anyone with real data can pull this up in a minute.",
      ar: "أي حد عنده بيانات حقيقية يقدر يجيبلك الرقم في دقيقة.",
    },
  },
  {
    q: {
      en: "What is your refund policy, in writing?",
      ar: "ايه سياسة الاسترداد بتاعتكم، مكتوبة؟",
    },
    why: {
      en: "If it's vague or nonexistent, understand what you're agreeing to.",
      ar: "لو غامضة او مش موجودة، افهم انت موافق على ايه.",
    },
  },
  {
    q: {
      en: "Do you help me after I arrive?",
      ar: "بتساعدوني بعد ما أوصل؟",
    },
    why: {
      en: "Most stop at the airport, which is exactly when you need help most.",
      ar: "أغلبهم بيقفوا عند المطار، وده بالظبط لما بتحتاج مساعدة اكتر.",
    },
  },
  {
    q: {
      en: "Can I do this myself without you?",
      ar: "أقدر أعمل ده لوحدي من غيركم؟",
    },
    why: {
      en: "The honest answer is yes. Anyone who says an agency is required is not being straight with you.",
      ar: "الإجابة الصريحة هي أيوه. أي حد بيقول لازم وكالة مش بيكلمك بصراحة.",
    },
  },
];

const t = {
  en: {
    title: "Before You Pay Any Agency, Ask These 8 Questions",
    intro:
      "I'm not going to tell you which agency to use. I'm going to give you the questions I wish someone had given me before I paid anyone. Ask these of any agency, including me. If someone can't answer clearly, that tells you what you need to know.",
    closing:
      "If you're wondering how I'd answer: I'm a student living in Brno, I do live mock interviews, my prices are on the site, I refund within 48 hours, I support you for 30 days after you land, and yes, you can absolutely do this without me. The free guides here are for exactly that.",
  },
  ar: {
    title: "قبل ما تدفع لأي وكالة، اسأل الـ 8 أسئلة دول",
    intro:
      "مش هقولك تستخدم أنهي وكالة. هديك الأسئلة اللي كنت اتمنى حد يديهالي قبل ما ادفع لحد. اسأل أي وكالة، بما فيهم أنا. لو حد مش قادر يجاوب بوضوح، ده بيقولك كل اللي محتاج تعرفه.",
    closing:
      "لو بتسأل ازاي انا هجاوب: انا طالب عايش في برنو، بعمل مقابلات تجريبية لايف، اسعاري على الموقع، برجع الفلوس خلال 48 ساعة، بساعدك 30 يوم بعد ما توصل، وأيوه، تقدر تعمل كل ده لوحدك. الأدلة المجانية هنا عشان كده بالظبط.",
  },
};

function QuestionCard({ question, index, locale }: { question: Question; index: number; locale: "en" | "ar" }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-2xl border border-border-subtle bg-surface/60 backdrop-blur-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
            {index + 1}
          </span>
          <span className="font-medium text-text-primary">{question.q[locale]}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 shrink-0 text-text-muted transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="px-5 pb-4 ps-16 text-text-secondary">{question.why[locale]}</p>
      </div>
    </motion.div>
  );
}

export default function QuestionsToAskClient() {
  const { locale } = useTranslation();
  const l = t[locale] || t.en;

  return (
    <>
      <Navbar />
      <Breadcrumb />
      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Hero banner */}
          <div className="relative w-full h-[130px] sm:h-[170px] rounded-2xl overflow-hidden mb-8">
            <Image
              src="/images/students-group.jpg"
              alt="Students discussing together"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
          </div>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">{l.title}</h1>
            <blockquote className="border-s-4 border-accent ps-6 py-3 text-text-secondary italic text-lg">
              {l.intro}
            </blockquote>
          </motion.div>

          {/* Questions */}
          <div className="space-y-4 mb-12">
            {questions.map((q, i) => (
              <QuestionCard key={i} question={q} index={i} locale={locale} />
            ))}
          </div>

          {/* Closing */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-s-4 border-accent ps-6 py-4 text-text-secondary italic"
          >
            {l.closing}
          </motion.blockquote>
        </div>
      </main>
      <Footer />
    </>
  );
}
