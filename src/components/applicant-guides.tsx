"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";

/**
 * Links from programme, university and study pages to the Egypt guides.
 * Most visitors are Egyptian, and these guides answer what a programme page
 * cannot (visa, school certificate, recognition), yet they were linked from
 * only a handful of pages outside the footer.
 */
const LINKS = [
  { href: "/study-in-czechia-from-egypt/", en: "Studying in Czechia from Egypt: every step", ar: "الدراسة في التشيك للمصريين: كل الخطوات" },
  { href: "/student-visa-egypt/", en: "Student visa from Egypt", ar: "فيزا الدراسة من مصر" },
  { href: "/thanaweya-amma-czech-university/", en: "Applying with Thanaweya Amma", ar: "التقديم بالثانوية العامة" },
  { href: "/recognition/egypt/", en: "Degree recognition in Egypt", ar: "معادلة الشهادة في مصر" },
  { href: "/official-sources/", en: "Official sources", ar: "المصادر الرسمية" },
];

export function ApplicantGuides({ className = "" }: { className?: string }) {
  const { locale } = useTranslation();
  const ar = locale === "ar";
  return (
    <nav aria-labelledby="applicant-guides" className={`mt-10 rounded-2xl border border-border-subtle bg-bg-subtle p-5 ${className}`}>
      <h2 id="applicant-guides" className="text-base font-semibold text-text-primary mb-1">
        {ar ? "بتقدّم من مصر؟" : "Applying from Egypt?"}
      </h2>
      <p className="text-sm text-text-secondary leading-relaxed mb-3">
        {ar
          ? "صفحة البرنامج بتقولك الرسوم والمواعيد. الأدلة دي بتكمّل الباقي: الفيزا، وشهادتك، والمعادلة."
          : "A programme page gives you fees and deadlines. These guides cover the rest: the visa, your school certificate and recognition back home."}
      </p>
      <ul className="flex flex-wrap gap-2">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex items-center px-3 py-1.5 rounded-full border border-border-subtle bg-surface text-sm text-text-secondary hover:text-brand hover:border-brand/40 transition-colors"
            >
              {ar ? l.ar : l.en}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
