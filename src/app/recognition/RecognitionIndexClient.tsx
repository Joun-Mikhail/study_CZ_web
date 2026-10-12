"use client";

import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Landmark } from "lucide-react";

const en = {
  title: "Will my Czech degree be recognised at home?",
  subtitle:
    "Country-by-country guides to getting a Czech university degree recognised, built only from official ministry and embassy pages, each with the date it was checked.",
  guides: [
    { href: "/recognition/egypt", name: "Egypt", desc: "Equivalency by the Supreme Council of Universities: conditions, legalisation, fees, where to send it." },
    { href: "/recognition/jordan", name: "Jordan", desc: "Recognised Czech universities, the language and residence rules, documents and fees." },
    { href: "/recognition/saudi-arabia", name: "Saudi Arabia", desc: "Prior approval for self-funded study, classified universities, and the online equivalency service." },
  ],
  open: "Read the guide",
  soon: "A guide for Iraq is in preparation.",
};

const ar: typeof en = {
  title: "هل ستُعادَل شهادتي التشيكية في بلدي؟",
  subtitle: "أدلة لكل دولة عن معادلة شهادة الجامعة التشيكية، مبنية فقط على صفحات الوزارات والسفارات الرسمية، ومع كل دليل تاريخ مراجعته.",
  guides: [
    { href: "/recognition/egypt", name: "مصر", desc: "المعادلة عن طريق المجلس الأعلى للجامعات: الشروط، والتصديقات، والرسوم، وعنوان الإرسال." },
    { href: "/recognition/jordan", name: "الأردن", desc: "الجامعات التشيكية المعترف بها، وشرطا لغة الدراسة والإقامة، والوثائق، والرسوم." },
    { href: "/recognition/saudi-arabia", name: "السعودية", desc: "الموافقة المسبقة للدراسة على الحساب الخاص، والجامعات المصنفة، وخدمة المعادلة الإلكترونية." },
  ],
  open: "اقرأ الدليل",
  soon: "دليل العراق قيد الإعداد.",
};

export default function RecognitionIndexClient() {
  const { locale } = useTranslation();
  const t = locale === "ar" ? ar : en;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{t.title}</h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">{t.subtitle}</p>
          <div className="space-y-4 mb-6">
            {t.guides.map((g) => (
              <GlassCard key={g.href}>
                <div className="flex items-start gap-3">
                  <Landmark className="w-6 h-6 text-brand shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-text-primary">{g.name}</h2>
                    <p className="text-sm text-text-secondary leading-relaxed mt-1">{g.desc}</p>
                    <Link href={g.href} className="inline-flex items-center gap-1 text-sm text-brand font-medium mt-2 hover:underline">
                      {t.open}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          <p className="text-sm text-text-muted">{t.soon}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
