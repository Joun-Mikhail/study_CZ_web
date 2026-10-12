"use client";

import Link from "@/components/locale-link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadJourney, setJourneyStage } from "@/lib/journey-store";
import type { StageSlug } from "@/data/stages";
import { useTranslation } from "@/i18n/context";
import { HelpCircle, GraduationCap, FileSearch, Landmark, Plane, ArrowRight } from "lucide-react";

const STAGES = [
  {
    slug: "considering" as StageSlug,
    icon: HelpCircle,
    en: "Is Czechia realistic for me?",
    ar: "تشيكيا فعلاً حل مناسب ليا؟",
  },
  {
    slug: "choosing" as StageSlug,
    icon: GraduationCap,
    en: "Which university fits my grades and budget?",
    ar: "أي جامعة تناسب درجاتي وميزانيتي؟",
  },
  {
    slug: "documents" as StageSlug,
    icon: FileSearch,
    en: "Are my documents right?",
    ar: "أوراقي سليمة؟",
  },
  {
    slug: "visa" as StageSlug,
    icon: Landmark,
    en: "What will they ask me at the embassy?",
    ar: "هيسألوني إيه في السفارة؟",
  },
  {
    slug: "arrived" as StageSlug,
    icon: Plane,
    en: "I just landed. Now what?",
    ar: "لسه واصل. دلوقتي أعمل إيه؟",
  },
] as const;

const HEADING = {
  en: "Where are you right now?",
  ar: "إنت فين دلوقتي؟",
};

export function StageRouter() {
  const { locale } = useTranslation();
  // The stage the visitor last picked (saved in My Journey), read after mount.
  const [current, setCurrent] = useState<StageSlug | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is browser-only
    setCurrent(loadJourney()?.stage ?? null);
  }, []);
  const currentIndex = current ? STAGES.findIndex((s) => s.slug === current) : -1;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="motion-safe-fallback"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary text-center mb-4 sm:mb-6">
          {HEADING[locale]}
        </h2>
        {currentIndex >= 0 && (
          <div className="mb-4 sm:mb-6" aria-hidden="true">
            <div className="h-1.5 rounded-full bg-brand/10 overflow-hidden">
              <div
                className="stage-progress h-full rounded-full bg-brand"
                style={{ width: `${((currentIndex + 1) / STAGES.length) * 100}%` }}
              />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.slug}
                initial={{ y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.06 * i }}
                className="motion-safe-fallback h-full"
              >
                <Link
                  href={`/stage/${stage.slug}`}
                  onClick={() => setJourneyStage(stage.slug)}
                  aria-current={current === stage.slug ? "step" : undefined}
                  className="card-lift relative group flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 h-full px-4 py-3 sm:p-5 rounded-xl sm:rounded-2xl border border-brand/20 bg-brand/[0.04] hover:bg-brand/[0.08] hover:border-brand/40 transition-colors"
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center sm:mb-3 shrink-0">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <p className="text-sm font-semibold text-text-primary leading-snug flex-1">
                    {stage[locale]}
                  </p>
                  {current === stage.slug && (
                    <span className="sm:absolute sm:top-3 sm:end-3 shrink-0 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-bg">
                      {locale === "ar" ? "إنت هنا" : "You are here"}
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-brand shrink-0 sm:mt-3 sm:opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
