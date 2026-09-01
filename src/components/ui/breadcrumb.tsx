"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { ChevronRight, Home } from "lucide-react";

const pathNames: Record<string, { en: string; ar: string }> = {
  universities: { en: "Universities", ar: "الجامعات" },
  "university-matcher": { en: "Programme Matcher", ar: "مطابق البرامج" },
  "cost-of-living": { en: "Cost of Living", ar: "تكاليف المعيشة" },
  "application-guide": { en: "Application Guide", ar: "دليل التقديم" },
  qa: { en: "Q&A", ar: "أسئلة وأجوبة" },
  services: { en: "Services", ar: "الخدمات" },
  courses: { en: "Language Course", ar: "كورس اللغة" },
  eligibility: { en: "Eligibility", ar: "الأهلية" },
  scholarships: { en: "Scholarships", ar: "المنح الدراسية" },
  "preparatory-year": { en: "Preparatory Year", ar: "السنة التحضيرية" },
  deadlines: { en: "Deadlines", ar: "المواعيد النهائية" },
  about: { en: "About", ar: "عن الموقع" },
  contact: { en: "Contact", ar: "تواصل معنا" },
  "what-it-costs": { en: "What It Costs", ar: "التكاليف" },
  "questions-to-ask": { en: "Questions to Ask", ar: "أسئلة مهمة" },
  programmes: { en: "Programmes", ar: "البرامج" },
  compare: { en: "Compare", ar: "مقارنة" },
  learn: { en: "Course Dashboard", ar: "لوحة الكورس" },
  quiz: { en: "Quiz", ar: "الاختبار" },
};

const SITE_URL = "https://studyczechia.com";

export function Breadcrumb() {
  const pathname = usePathname();
  const { locale } = useTranslation();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const breadcrumbItems = [
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `${SITE_URL}/` },
    ...segments.map((segment, i) => ({
      name: pathNames[segment]?.[locale] || segment.replace(/-/g, " "),
      url: `${SITE_URL}/${segments.slice(0, i + 1).join("/")}/`,
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center gap-1.5 text-xs text-text-muted flex-wrap">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-text-secondary transition-colors">
            <Home className="w-3 h-3" />
            <span>{locale === "ar" ? "الرئيسية" : "Home"}</span>
          </Link>
        </li>
        {segments.map((segment, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const name = pathNames[segment]?.[locale] || segment.replace(/-/g, " ");
          const isLast = i === segments.length - 1;

          return (
            <li key={href} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-text-muted/50" />
              {isLast ? (
                <span className="text-text-secondary font-medium capitalize">{name}</span>
              ) : (
                <Link href={href} className="hover:text-text-secondary transition-colors capitalize">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
