"use client";

import { ArrowRight, BadgeCheck, CalendarClock, Calculator, PiggyBank, Plane, Stethoscope } from "lucide-react";
import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";

type Guide = { href: string; icon: React.ElementType; title: { en: string; ar: string }; body: { en: string; ar: string } };

/**
 * The in-depth guides, linked from the home page. Search engines weigh links
 * from a site's strongest page, so these are the pages we most want found.
 */
const GUIDES: Guide[] = [
  {
    href: "/study/medicine-in-czech-republic",
    icon: Stethoscope,
    title: { en: "Studying medicine in Czechia", ar: "دراسة الطب في التشيك" },
    body: { en: "Fees and entrance exams at every English-taught medical faculty.", ar: "الرسوم وامتحانات القبول في كل كليات الطب اللي بتدرّس بالإنجليزي." },
  },
  {
    href: "/student-visa-egypt",
    icon: Plane,
    title: { en: "Czech student visa from Egypt", ar: "فيزا الدراسة في التشيك من مصر" },
    body: { en: "Documents, the money to show and the embassy appointment, from official sources.", ar: "الأوراق والمبلغ المطلوب وحجز معاد السفارة، من المصادر الرسمية." },
  },
  {
    href: "/what-it-costs",
    icon: Calculator,
    title: { en: "What studying in Czechia costs", ar: "تكاليف ومصاريف الدراسة في التشيك" },
    body: { en: "Tuition, living costs and a calculator for the whole degree.", ar: "الرسوم والمعيشة وحاسبة لتكلفة الدراسة كلها." },
  },
  {
    href: "/study/cheapest-programmes",
    icon: PiggyBank,
    title: { en: "Cheapest programmes in English", ar: "أرخص البرامج بالإنجليزي" },
    body: { en: "Every programme on the site, lowest yearly fee first.", ar: "كل البرامج اللي على الموقع، من الأرخص للأغلى." },
  },
  {
    href: "/recognition/egypt",
    icon: BadgeCheck,
    title: { en: "Is a Czech degree recognised in Egypt?", ar: "هل الشهادة التشيكية بتتعادل في مصر؟" },
    body: { en: "Equivalency step by step, from the Supreme Council of Universities' own pages.", ar: "المعادلة خطوة بخطوة، من صفحات المجلس الأعلى للجامعات نفسه." },
  },
  {
    href: "/deadlines",
    icon: CalendarClock,
    title: { en: "Application deadlines", ar: "مواعيد التقديم" },
    body: { en: "Each programme's deadline and the days left.", ar: "آخر معاد لكل برنامج والأيام الفاضلة." },
  },
];

export function PopularGuides() {
  const { locale } = useTranslation();
  const ar = locale === "ar";
  return (
    <section aria-labelledby="popular-guides" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
      <h2 id="popular-guides" className="text-3xl sm:text-4xl font-semibold text-text-primary mb-2">
        {ar ? "أهم الأدلة" : "Popular guides"}
      </h2>
      <p className="text-text-secondary mb-8 max-w-2xl">
        {ar
          ? "الأسئلة اللي بتتسأل كل يوم في الجروب، بإجابات كاملة ومصادر رسمية."
          : "The questions asked every day in the group, answered in full with official sources."}
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map(({ href, icon: Icon, title, body }) => (
          <li key={href}>
            <Link
              href={href}
              className="card-lift group flex h-full items-start gap-4 rounded-2xl border border-border-subtle bg-surface p-5"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-text-primary group-hover:text-brand transition-colors">
                  {title[ar ? "ar" : "en"]}
                </span>
                <span className="mt-1 block text-sm text-text-secondary leading-relaxed">{body[ar ? "ar" : "en"]}</span>
                {/* font-semibold like the home page's other card links. A weight
                    the rest of the server-rendered page doesn't use makes /ar/
                    fetch two more Arabic font files before the hero renders. */}
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  {ar ? "اقرأ الدليل" : "Read the guide"}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
