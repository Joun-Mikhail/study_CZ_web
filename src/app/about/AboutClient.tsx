"use client";

import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { FACEBOOK_GROUP_URL, CONTACT_EMAIL } from "@/config/contact";
import Image from "next/image";
import {
  ShieldCheck,
  Users,
  BookOpen,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

const t = {
  en: {
    badge: "About this platform",
    title: "Study Czechia is not an agency.",
    subtitle:
      "It is an independent, student-built platform that helps Arabic-speaking students navigate Czech universities with free resources, honest information, and personal support if you want it.",
    notOfficialTitle: "Is this an official government website?",
    notOfficialBody:
      "No. Study Czechia is not affiliated with any Czech embassy, government ministry, or university. We provide guidance and link directly to official sources. For legal decisions, always rely on the relevant Czech authority.",
    notOfficialBadges: [
      "Not affiliated with Czech embassies",
      "Not affiliated with Czech universities",
      "Not a government website",
    ],
    storyTitle: "How it started",
    storyBody:
      "This started as a Facebook group where one student answered the same questions over and over for Arabic-speaking students trying to figure out Czech universities. The group grew to 12,000+ members. This website is the next step: the same free, honest answers, just easier to find.",
    whatWeDoTitle: "What we do",
    whatWeDo: [
      "Free guides on applications, visas, costs, and university selection",
      "Interactive tools: eligibility checker, university matcher, cost calculator",
      "A knowledge base of 50+ real student questions and answers",
      "Optional paid services: consultations, document reviews, full application support",
    ],
    whatWeDontTitle: "What we don't do",
    whatWeDont: [
      "We don't guarantee admission or visa approval. No one can.",
      "We don't fabricate data. Every figure is sourced or labelled as community experience",
      "We don't represent any university or government body",
      "We don't store personal data without explicit consent",
    ],
    verificationTitle: "How we verify information",
    verificationBody:
      "Important claims on this site are marked with a \"Last verified\" date and linked to their official source. When our information conflicts with an official source, follow the official source, and tell us so we can correct it.",
    officialSourcesTitle: "Official sources we reference",
    officialSources: [
      { name: "Czech Ministry of Interior", url: "https://www.mvcr.cz/mvcren/" },
      { name: "Czech Ministry of Education", url: "https://www.msmt.cz/?lang=2" },
      { name: "Study in the Czech Republic", url: "https://www.studyin.cz/" },
    ],
    contactTitle: "Contact",
    contactBody: "Questions, corrections, or feedback. We read everything.",
  },
  ar: {
    badge: "عن المنصة",
    title: "Study Czechia مش وكالة.",
    subtitle:
      "منصة مستقلة بناها طلاب، بتساعد الطلاب العرب يفهموا الجامعات التشيكية، بموارد مجانية، معلومات صادقة، ودعم شخصي اختياري.",
    notOfficialTitle: "هل ده موقع حكومي رسمي؟",
    notOfficialBody:
      "لا. Study Czechia مش تابع لأي سفارة تشيكية أو وزارة حكومية أو جامعة. إحنا بنقدم إرشاد وبنربط مباشرة بالمصادر الرسمية. في القرارات القانونية، دايما ارجع للجهة التشيكية المختصة.",
    notOfficialBadges: [
      "مش تابعين للسفارات التشيكية",
      "مش تابعين للجامعات التشيكية",
      "مش موقع حكومي",
    ],
    storyTitle: "إزاي بدأ",
    storyBody:
      "الموضوع بدأ كجروب فيسبوك طالب واحد كان بيجاوب على نفس الأسئلة كل مرة للطلاب العرب اللي بيحاولوا يفهموا الجامعات التشيكية. الجروب كبر لأكتر من 12,000 عضو. الموقع ده هو الخطوة الجاية: نفس الإجابات المجانية والصادقة، بس أسهل توصلها.",
    whatWeDoTitle: "إيه اللي بنعمله",
    whatWeDo: [
      "أدلة مجانية عن التقديمات والفيزا والتكاليف واختيار الجامعة",
      "أدوات تفاعلية: تقييم الأهلية، اختيار الجامعة، حاسبة التكاليف",
      "قاعدة معرفة بأكتر من 50 سؤال وإجابة من طلاب حقيقيين",
      "خدمات مدفوعة اختيارية: استشارات، مراجعة أوراق، دعم كامل في التقديم",
    ],
    whatWeDontTitle: "إيه اللي مش بنعمله",
    whatWeDont: [
      "مش بنضمن قبول أو موافقة فيزا. محدش يقدر يضمن ده.",
      "مش بنخترع بيانات. كل رقم مصدره موثق أو مكتوب إنه تجربة مجتمعية",
      "مش بنمثل أي جامعة أو جهة حكومية",
      "مش بنخزن بيانات شخصية من غير موافقة صريحة",
    ],
    verificationTitle: "إزاي بنتحقق من المعلومات",
    verificationBody:
      "المعلومات المهمة على الموقع متعلم عليها بتاريخ \"آخر تحقق\" ومربوطة بمصدرها الرسمي. لو معلوماتنا اتعارضت مع مصدر رسمي، اتبع المصدر الرسمي، وقولنا عشان نصلحها.",
    officialSourcesTitle: "المصادر الرسمية اللي بنرجعلها",
    officialSources: [
      { name: "وزارة الداخلية التشيكية", url: "https://www.mvcr.cz/mvcren/" },
      { name: "وزارة التعليم التشيكية", url: "https://www.msmt.cz/?lang=2" },
      { name: "الدراسة في التشيك", url: "https://www.studyin.cz/" },
    ],
    contactTitle: "تواصل",
    contactBody: "أسئلة، تصحيحات، أو ملاحظات. بنقرأ كل حاجة.",
  },
};

export default function AboutClient() {
  const { locale } = useTranslation();
  const l = t[locale] || t.en;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero image banner */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative w-full h-[200px] sm:h-[280px] rounded-2xl overflow-hidden">
            <Image
              src="/images/prague-old-town.jpg"
              alt="Charles Bridge in Prague at golden hour"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/20 to-transparent" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-medium text-amber mb-4">
            {l.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {l.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-12">
            {l.subtitle}
          </p>

          {/* Not official disclaimer */}
          <GlassCard hoverEffect="border" className="mb-8">
            <div className="flex items-start gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-amber shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  {l.notOfficialTitle}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {l.notOfficialBody}
                </p>
                <div className="flex flex-wrap gap-2">
                  {l.notOfficialBadges.map((badge) => (
                    <span
                      key={badge}
                      className="text-xs px-2.5 py-1 rounded-full border border-border-subtle text-text-muted"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Story */}
          <GlassCard className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-3">
              {l.storyTitle}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {l.storyBody}
            </p>
          </GlassCard>

          {/* What we do / don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-green-400" />
                <h2 className="text-base font-semibold text-text-primary">
                  {l.whatWeDoTitle}
                </h2>
              </div>
              <ul className="space-y-2">
                {l.whatWeDo.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-text-secondary">
                    <span className="text-green-400 shrink-0">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h2 className="text-base font-semibold text-text-primary">
                  {l.whatWeDontTitle}
                </h2>
              </div>
              <ul className="space-y-2">
                {l.whatWeDont.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-text-secondary">
                    <span className="text-red-400 shrink-0">&times;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Verification */}
          <GlassCard className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-3">
              {l.verificationTitle}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {l.verificationBody}
            </p>
            <h3 className="text-sm font-medium text-text-primary mb-2">
              {l.officialSourcesTitle}
            </h3>
            <ul className="space-y-2">
              {l.officialSources.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-amber transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {src.name}
                  </a>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Contact */}
          <GlassCard>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              {l.contactTitle}
            </h2>
            <p className="text-sm text-text-secondary mb-3">{l.contactBody}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-accent hover:text-amber transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
