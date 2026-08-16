"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WHATSAPP_URL, PAYMENT_LINKS, INSTAPAY_HANDLE, PRICING } from "@/config/contact";
import { motion } from "framer-motion";
import { PlayCircle, CheckCircle2, MessageCircle, CreditCard, Smartphone, Copy, Check, Video } from "lucide-react";

export default function CoursesClient() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyInstapay = async () => {
    try {
      await navigator.clipboard.writeText(INSTAPAY_HANDLE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard failures
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/10 border border-amber/20 text-amber text-sm font-medium mb-6"
          >
            {t.courses.badge}
          </motion.span>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t.courses.title}
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-xl mx-auto">
            {t.courses.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
          <div className="flex flex-col gap-8">
            <div>
              <GlassCard className="aspect-video flex items-center justify-center bg-midnight-light/60">
                <div className="text-center">
                  <PlayCircle className="w-14 h-14 text-amber mx-auto mb-3" />
                  <p className="text-sm font-medium text-text-primary mb-1">{t.courses.freeLessonTitle}</p>
                  <p className="text-xs text-text-muted">{t.courses.freeLessonDesc}</p>
                </div>
              </GlassCard>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-4">{t.courses.formatTitle}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {t.courses.format.map((f, i) => {
                  const icons = [Video, PlayCircle, MessageCircle];
                  const Icon = icons[i] ?? Video;
                  return (
                    <div key={f.title} className="p-4 rounded-xl border border-border-subtle bg-surface/60">
                      <Icon className="w-5 h-5 text-amber mb-2" />
                      <p className="font-medium text-text-primary text-sm mb-0.5">{f.title}</p>
                      <p className="text-xs text-text-secondary">{f.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-4">{t.courses.curriculumTitle}</h2>
              <div className="space-y-3">
                {t.courses.curriculum.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex gap-3 p-4 rounded-xl border border-border-subtle bg-surface/60"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-text-primary text-sm mb-0.5">{item.title}</p>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <GlassCard hoverEffect="glow" className="sticky top-24">
              <h3 className="font-semibold text-text-primary mb-1">{t.courses.priceTitle}</h3>
              <p className="text-xs text-text-muted mb-1">{t.courses.priceLabel}</p>
              <p className="text-3xl font-bold text-amber mb-4">{PRICING.courseCzk.toLocaleString()} CZK</p>
              <p className="text-sm text-text-secondary mb-6">{t.courses.priceNote}</p>
              <MagneticButton variant="primary" size="lg" href={WHATSAPP_URL} className="w-full">
                <MessageCircle className="w-5 h-5" />
                {t.courses.priceCta}
              </MagneticButton>
            </GlassCard>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-14">
          <h2 className="text-lg font-semibold text-text-primary mb-5 text-center">{t.courses.payment.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <GlassCard hoverEffect="lift">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5 text-amber" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1.5">{t.courses.payment.intlLabel}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">{t.courses.payment.intlDesc}</p>
              <MagneticButton variant="primary" href={PAYMENT_LINKS.courseCzk} className="w-full">
                <CreditCard className="w-4 h-4" />
                {t.courses.payment.intlCta}
              </MagneticButton>
            </GlassCard>

            <GlassCard hoverEffect="lift">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5 text-amber" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1.5">{t.courses.payment.arabLabel}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{t.courses.payment.arabDesc}</p>

              <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-midnight-light/60 border border-border-subtle mb-4">
                <div>
                  <p className="text-xs text-text-muted mb-0.5">{t.courses.payment.instapayHint}</p>
                  <p dir="ltr" className="text-sm font-medium text-text-primary text-start">{INSTAPAY_HANDLE}</p>
                </div>
                <button onClick={copyInstapay} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary border border-border-subtle hover:border-amber/30 transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? t.courses.payment.copied : t.courses.payment.copy}
                </button>
              </div>

              <MagneticButton variant="secondary" href={WHATSAPP_URL} className="w-full">
                <MessageCircle className="w-4 h-4" />
                {t.courses.payment.confirmCta}
              </MagneticButton>
            </GlassCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
