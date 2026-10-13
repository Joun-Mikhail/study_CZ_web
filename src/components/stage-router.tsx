"use client";

import Link from "@/components/locale-link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadJourney, setJourneyStage } from "@/lib/journey-store";
import type { StageSlug } from "@/data/stages";
import { SiteImage } from "@/components/site-image";
import type { ImageId } from "@/data/images";

/** One colour per stage, as static class strings so Tailwind keeps them. */
const STAGE_THEME = [
  { fill: "bg-sky", ink: "text-sky-ink", wash: "from-sky/40", border: "hover:border-sky" },
  { fill: "bg-violet", ink: "text-violet-ink", wash: "from-violet/40", border: "hover:border-violet" },
  { fill: "bg-gold", ink: "text-gold-ink", wash: "from-gold/40", border: "hover:border-gold" },
  { fill: "bg-coral", ink: "text-coral-ink", wash: "from-coral/40", border: "hover:border-coral" },
  { fill: "bg-teal", ink: "text-teal-ink", wash: "from-teal/40", border: "hover:border-teal" },
];
import { useTranslation } from "@/i18n/context";
import { HelpCircle, GraduationCap, FileSearch, Landmark, Plane, ArrowRight } from "lucide-react";

const STAGES = [
  {
    slug: "considering" as StageSlug,
    photo: "study-travel-map" as ImageId,
    icon: HelpCircle,
    en: "Is Czechia realistic for me?",
    ar: "تشيكيا فعلاً حل مناسب ليا؟",
  },
  {
    slug: "choosing" as StageSlug,
    photo: "study-library-hall" as ImageId,
    icon: GraduationCap,
    en: "Which university fits my grades and budget?",
    ar: "أي جامعة تناسب درجاتي وميزانيتي؟",
  },
  {
    slug: "documents" as StageSlug,
    photo: "study-paperwork" as ImageId,
    icon: FileSearch,
    en: "Are my documents right?",
    ar: "أوراقي سليمة؟",
  },
  {
    slug: "visa" as StageSlug,
    photo: "study-passport" as ImageId,
    icon: Landmark,
    en: "What will they ask me at the embassy?",
    ar: "هيسألوني إيه في السفارة؟",
  },
  {
    slug: "arrived" as StageSlug,
    photo: "study-reading-outdoors" as ImageId,
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
                className="stage-progress h-full rounded-full bg-brand-light"
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
                  className={`card-lift relative group flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 h-full overflow-hidden px-3 py-3 sm:p-0 rounded-2xl border border-border-subtle bg-surface ${STAGE_THEME[i].border}`}
                >
                  {/* Photo: a round thumbnail on phones, a header from sm up. */}
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-full sm:rounded-none">
                    <SiteImage id={stage.photo} sizes="(max-width: 640px) 56px, 240px" whenNear decorative className="transition-transform duration-500 group-hover:scale-105" />
                    <div aria-hidden="true" className={`absolute inset-0 hidden sm:block bg-gradient-to-t ${STAGE_THEME[i].wash} to-transparent`} />
                  </div>
                  <div className={`hidden sm:flex -mt-6 ms-4 h-11 w-11 items-center justify-center rounded-xl ${STAGE_THEME[i].fill} text-white shadow-md ring-4 ring-surface relative`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-text-primary leading-snug flex-1 sm:px-4 sm:pt-3 sm:pb-4">
                    <span className={`sm:hidden me-1.5 inline-flex h-5 w-5 items-center justify-center rounded-md align-[-3px] ${STAGE_THEME[i].fill} text-white`}>
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                    {stage[locale]}
                  </p>
                  {current === stage.slug && (
                    <span className="sm:absolute sm:top-2 sm:end-2 shrink-0 rounded-full bg-[#c8102e] px-2 py-0.5 text-[11px] font-semibold text-white shadow">
                      {locale === "ar" ? "إنت هنا" : "You are here"}
                    </span>
                  )}
                  <ArrowRight className={`w-4 h-4 shrink-0 sm:hidden ${STAGE_THEME[i].ink} rtl:rotate-180`} aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
