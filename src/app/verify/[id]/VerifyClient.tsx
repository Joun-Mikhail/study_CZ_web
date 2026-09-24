"use client";

import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Certificate } from "@/data/certificates";

const copy = {
  en: {
    validBadge: "Valid Certificate",
    student: "Student",
    course: "Course",
    completed: "Completion Date",
    certId: "Certificate ID",
    issuer: "Issued by",
    disclaimer:
      "This is a completion certificate, not an official qualification and not a language certificate.",
    notFoundTitle: "Certificate Not Found",
    notFoundBody:
      "The certificate ID you entered does not match any record in our system. Please double-check the ID and try again.",
  },
  ar: {
    validBadge: "شهادة صالحة",
    student: "الطالب",
    course: "الكورس",
    completed: "تاريخ الإتمام",
    certId: "رقم الشهادة",
    issuer: "صادرة من",
    disclaimer:
      "شهادة إتمام دورة — ليست مؤهلاً رسمياً ولا شهادة لغة معتمدة.",
    notFoundTitle: "الشهادة غير موجودة",
    notFoundBody:
      "رقم الشهادة اللي دخلته مش موجود في نظامنا. تأكد من الرقم وحاول تاني.",
  },
} as const;

export default function VerifyClient({
  id,
  cert,
}: {
  id: string;
  cert: Certificate | null;
}) {
  const { locale } = useTranslation();
  const t = copy[locale];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          <Breadcrumb />

          {cert ? (
            <GlassCard className="mt-8 p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
                <span className="text-lg font-semibold text-green-400">
                  {t.validBadge}
                </span>
              </div>

              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-text-muted">{t.student}</dt>
                  <dd className="text-text-primary font-medium mt-0.5">
                    {cert.studentName}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted">{t.course}</dt>
                  <dd className="text-text-primary font-medium mt-0.5">
                    {cert.courseTitle[locale]}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted">{t.completed}</dt>
                  <dd className="text-text-primary font-medium mt-0.5">
                    {cert.completionDate}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted">{t.certId}</dt>
                  <dd className="text-text-primary font-mono text-xs mt-0.5">
                    {cert.uniqueId}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted">{t.issuer}</dt>
                  <dd className="text-text-primary font-medium mt-0.5">
                    {cert.issuerName}
                  </dd>
                </div>
              </dl>

              <p className="mt-6 pt-4 border-t border-border-subtle text-xs text-text-muted leading-relaxed">
                {t.disclaimer}
              </p>
            </GlassCard>
          ) : (
            <GlassCard className="mt-8 p-8 text-center">
              <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h1 className="text-lg font-semibold text-text-primary mb-2">
                {t.notFoundTitle}
              </h1>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                {t.notFoundBody}
              </p>
              <p className="text-xs text-text-muted font-mono">{id}</p>
            </GlassCard>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
