"use client";

import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WHATSAPP_URL, PAYMENT_LINKS } from "@/config/contact";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Phone, FileSearch, GraduationCap } from "lucide-react";

const tierIcons = [Phone, FileSearch, GraduationCap];
const tierPaymentLinks = [PAYMENT_LINKS.quickConsultCzk, PAYMENT_LINKS.documentReviewCzk, PAYMENT_LINKS.fullAssistanceEur];

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{t.services.title}</h1>
          <p className="text-text-secondary leading-relaxed">{t.services.subtitle}</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.services.tiers.map((tier, i) => {
            const Icon = tierIcons[i] ?? Phone;
            return (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <GlassCard hoverEffect={i === 1 ? "glow" : "lift"} className="h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-amber" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{tier.title}</h3>
                  <p className="text-2xl font-bold text-amber mb-3">{tier.price}</p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">{tier.desc}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton variant={i === 1 ? "primary" : "secondary"} href={tierPaymentLinks[i]} className="w-full">
                    {tier.cta}
                  </MagneticButton>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-sm text-text-secondary mb-3">{t.services.altPaymentNote}</p>
          <MagneticButton variant="ghost" size="sm" href={WHATSAPP_URL}>
            <MessageCircle className="w-4 h-4" />
            {t.services.altPaymentCta}
          </MagneticButton>
        </div>
      </main>

      <Footer />
    </div>
  );
}
