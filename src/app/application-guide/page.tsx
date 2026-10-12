"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { EmailSignup } from "@/components/email-signup";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { guideSteps } from "@/data/guide";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  FileCheck,
  GraduationCap,
  Languages,
  BookOpen,
  Wallet,
  Search,
  Landmark,
  FileText,
  Stamp,
  ShieldCheck,
  PenLine,
  House,
  MailCheck,
  Building2,
  FileSignature,
  MessagesSquare,
  BadgeCheck,
  PlaneLanding,
  type LucideIcon,
} from "lucide-react";

const STEP_ICONS: Record<string, LucideIcon> = {
  major: GraduationCap,
  language: Languages,
  "language-czech-path": BookOpen,
  budget: Wallet,
  research: Search,
  bank: Landmark,
  documents: FileText,
  authenticate: Stamp,
  "criminal-record": ShieldCheck,
  "apply-exams": PenLine,
  housing: House,
  acceptance: MailCheck,
  "embassy-legalize": Building2,
  "visa-apply": FileSignature,
  interview: MessagesSquare,
  "post-approval": BadgeCheck,
  arrival: PlaneLanding,
};
import Image from "next/image";
import { ContextualCTA } from "@/components/contextual-cta";

export default function ApplicationGuidePage() {
  const { t, locale } = useTranslation();
  const [activeId, setActiveId] = useState(guideSteps[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Breadcrumb />

      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Hero banner */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="relative w-full h-[140px] sm:h-[190px] rounded-2xl overflow-hidden">
            <Image
              src="/images/prague-old-town.jpg"
              alt="Prague at golden hour"
              fill
              loading="eager"
              fetchPriority="high"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{t.guide.title}</h1>
          <p className="text-text-secondary leading-relaxed">{t.guide.subtitle}</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {/* Sticky progress tracker */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              {guideSteps.map((step, i) => (
                <a
                  key={step.id}
                  href={`#${step.id}`}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                    activeId === step.id
                      ? "bg-brand/10 text-brand font-medium"
                      : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  <span
                    className={cn(
                      "w-5 h-5 shrink-0 rounded-full text-[11px] flex items-center justify-center border",
                      activeId === step.id ? "border-brand text-brand" : "border-border-subtle"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="truncate">{step.title[locale].replace(/^[\d.0-9]+\.?\s*/u, "")}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* Steps */}
          <div className="space-y-10">
            {guideSteps.map((step, i) => {
              const Icon = STEP_ICONS[step.id] ?? FileText;
              return (
              <div key={step.id} className="relative ps-14 sm:ps-16">
                {/* Timeline: an icon per step, joined by a line down the start edge. */}
                <span
                  aria-hidden="true"
                  className="reveal absolute start-0 top-0 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl bg-brand text-bg shadow-[0_8px_20px_-10px_rgba(17,69,126,0.7)] ring-4 ring-bg"
                >
                  <Icon className="h-5 w-5" />
                </span>
                {i < guideSteps.length - 1 && (
                  <span aria-hidden="true" className="absolute start-5 sm:start-[22px] top-12 -bottom-10 w-0.5 rounded-full bg-brand/15" />
                )}
                <section
                  id={step.id}
                  ref={(el) => {
                    sectionRefs.current[step.id] = el;
                  }}
                  className="scroll-mt-24"
                >
                  <h2 className="text-xl font-semibold text-text-primary mb-3">{step.title[locale]}</h2>
                  <p className="text-text-secondary leading-relaxed mb-4">{step.body[locale]}</p>
                  {step.tip && (
                    <div className="flex gap-3 items-start rounded-xl border border-brand/20 bg-brand/[0.05] px-4 py-3">
                      <Lightbulb className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      <p className="text-sm text-text-secondary">
                        <span className="font-medium text-brand">{t.guide.tipLabel}: </span>
                        {step.tip[locale]}
                      </p>
                    </div>
                  )}
                </section>
                {step.id === "authenticate" && <ContextualCTA service="documentCheck" />}
              </div>
              );
            })}

            <EmailSignup source="checklist" variant="guide" placement="application-guide" />

            {/* Next step: turn the guide into a plan */}
            <GlassCard hoverEffect="glow" className="text-center">
              <FileCheck className="w-7 h-7 text-brand mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary mb-1.5">{t.guide.ctaTitle}</h3>
              <p className="text-sm text-text-secondary mb-5">{t.guide.ctaSubtitle}</p>
              <MagneticButton variant="primary" href="/eligibility">
                {t.guide.ctaButton}
              </MagneticButton>
            </GlassCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
