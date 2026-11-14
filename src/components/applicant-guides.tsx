"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";

type Guide = { href: string; en: string; ar: string };

const HUB: Guide = { href: "/study-in-czechia-from-egypt/", en: "Studying in Czechia from Egypt: every step", ar: "الدراسة في التشيك للمصريين: كل الخطوات" };
const VISA: Guide = { href: "/student-visa-egypt/", en: "Student visa from Egypt", ar: "فيزا الدراسة من مصر" };
const THANAWEYA: Guide = { href: "/thanaweya-amma-czech-university/", en: "Applying with Thanaweya Amma", ar: "التقديم بالثانوية العامة" };
const RECOGNITION: Guide = { href: "/recognition/egypt/", en: "Will this degree be recognised in Egypt?", ar: "هل الشهادة دي بتتعادل في مصر؟" };

const INTRO = {
  programme: {
    en: "This page covers the programme's fee, exam and deadline. For the steps that depend on where you apply from, use the Egypt guides.",
    ar: "الصفحة دي فيها رسوم البرنامج وامتحانه ومعاده. الخطوات اللي بتعتمد على إنك بتقدّم من مصر موجودة في أدلة مصر.",
  },
  university: {
    en: "Admission is decided by the university. The visa, your school certificate and recognition back home are separate steps.",
    ar: "القبول قرار الجامعة. الفيزا وشهادتك والمعادلة في مصر خطوات تانية.",
  },
  scholarships: {
    en: "Which scholarships are open to Egyptians, and what the visa asks you to show, is in the Egypt guides.",
    ar: "المنح المتاحة للمصريين، والمبلغ اللي الفيزا بتطلب تثبته، موجودين في أدلة مصر.",
  },
};

/**
 * Links from programme, university and scholarship pages to the Egypt guides.
 * Most visitors are Egyptian, and those guides answer what these pages cannot
 * (visa, school certificate, recognition), yet they were linked from only a
 * handful of pages outside the footer. The links depend on the page: a
 * Bachelor's applicant needs the school-certificate guide, a Master's
 * applicant does not.
 */
export function ApplicantGuides({
  context,
  degree,
  className = "",
}: {
  context: keyof typeof INTRO;
  degree?: "Bachelor" | "Master" | string;
  className?: string;
}) {
  const { locale } = useTranslation();
  const ar = locale === "ar";
  const links =
    context === "scholarships"
      ? [HUB, VISA]
      : degree === "Bachelor"
        ? [HUB, THANAWEYA, VISA]
        : degree
          ? [HUB, VISA, RECOGNITION]
          : [HUB, THANAWEYA, VISA, RECOGNITION];
  return (
    <nav aria-labelledby="applicant-guides" className={`mt-10 rounded-2xl border border-border-subtle bg-bg-subtle p-5 ${className}`}>
      <h2 id="applicant-guides" className="text-base font-semibold text-text-primary mb-1">
        {ar ? "بتقدّم من مصر؟" : "Applying from Egypt?"}
      </h2>
      <p className="text-sm text-text-secondary leading-relaxed mb-3">{INTRO[context][ar ? "ar" : "en"]}</p>
      <ul className="flex flex-wrap gap-2">
        {links.map((l) => (
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
