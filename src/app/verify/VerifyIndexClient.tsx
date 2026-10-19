"use client";

import { localizeHref } from "@/i18n/paths";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { ShieldCheck } from "lucide-react";

const copy = {
  en: {
    title: "Verify a Certificate",
    body: "Enter the certificate ID printed on the document to check its authenticity.",
    placeholder: "Certificate ID",
    button: "Verify",
  },
  ar: {
    title: "تحقق من شهادة",
    body: "أدخل رقم الشهادة المطبوع على الوثيقة للتحقق من صحتها.",
    placeholder: "رقم الشهادة",
    button: "تحقق",
  },
} as const;

export default function VerifyIndexClient() {
  const { locale } = useTranslation();
  const t = copy[locale];
  const router = useRouter();
  const [certId, setCertId] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = certId.trim();
    if (trimmed) router.push(localizeHref(`/verify/${encodeURIComponent(trimmed)}`, locale));
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          <Breadcrumb />

          <GlassCard className="mt-8 p-8 text-center">
            <ShieldCheck className="w-12 h-12 text-brand mx-auto mb-4" />
            <h1 className="text-lg font-semibold text-text-primary mb-2">
              {t.title}
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              {t.body}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder={t.placeholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand/50 transition-colors text-center font-mono"
              />
              <button
                type="submit"
                disabled={!certId.trim()}
                className="w-full px-5 py-2.5 rounded-xl bg-brand text-bg text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t.button}
              </button>
            </form>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </>
  );
}
