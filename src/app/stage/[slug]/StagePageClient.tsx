"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { stages, type StageSlug } from "@/data/stages";
import { qaEntries } from "@/data/qa";

export default function StagePageClient({ slug }: { slug: StageSlug }) {
  const { locale } = useTranslation();
  const config = stages[slug];
  const qaItems = qaEntries.filter((e) => config.qaIds.includes(e.id));

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-3">
              {config.h1[locale]}
            </h1>
            <p className="text-text-secondary leading-relaxed max-w-xl mx-auto">
              {config.intro[locale]}
            </p>
          </div>

          {/* Free tools & guides */}
          {config.tools.length > 0 && (
            <section className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-border-subtle bg-surface/50 hover:border-amber/30 hover:bg-surface transition-colors"
                  >
                    <span className="text-sm font-medium text-text-primary">
                      {tool.label[locale]}
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-amber transition-colors rtl:rotate-180 shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Relevant Q&A */}
          {qaItems.length > 0 && (
            <section className="mb-12">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                {locale === "ar" ? "أسئلة شائعة عن ده" : "Common questions at this stage"}
              </h2>
              <div className="space-y-3">
                {qaItems.map((entry) => (
                  <GlassCard key={entry.id} hoverEffect="border">
                    <p className="text-sm font-semibold text-text-primary mb-1.5">
                      {entry.q[locale]}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {entry.a[locale]}
                    </p>
                  </GlassCard>
                ))}
              </div>
              <div className="text-center mt-4">
                <Link href="/qa" className="text-sm text-amber hover:text-amber/80 transition-colors">
                  {locale === "ar" ? "شوف كل الأسئلة والأجوبة ←" : "See all Q&A →"}
                </Link>
              </div>
            </section>
          )}

          {/* Paid next step */}
          {config.paidService && (
            <section>
              <GlassCard hoverEffect="glow" className="text-center">
                <ShieldAlert className="w-8 h-8 text-amber mx-auto mb-3" />
                <p className="text-xs text-text-muted mb-2">
                  {locale === "ar" ? "لو لسه واقف عند ده" : "If you're still stuck here"}
                </p>
                <h2 className="text-xl font-bold text-text-primary mb-2">
                  {config.paidService.title[locale]}
                </h2>
                <p className="text-sm text-amber font-medium mb-5">
                  {config.paidService.fearTrigger[locale]}
                </p>
                <MagneticButton variant="primary" size="lg" href={config.paidService.href}>
                  {config.paidService.cta[locale]}
                </MagneticButton>
                {config.paidService.postButton[locale] && (
                  <p className="text-xs text-text-muted mt-3">
                    {config.paidService.postButton[locale]}
                  </p>
                )}
              </GlassCard>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
