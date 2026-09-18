"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/context";
import { HelpCircle, GraduationCap, FileSearch, Landmark, Plane, ArrowRight } from "lucide-react";

const STAGES = [
  {
    slug: "considering",
    icon: HelpCircle,
    en: "Is Czechia realistic for me?",
    ar: "تشيكيا فعلاً حل مناسب ليا؟",
  },
  {
    slug: "choosing",
    icon: GraduationCap,
    en: "Which university fits my grades and budget?",
    ar: "أي جامعة تناسب درجاتي وميزانيتي؟",
  },
  {
    slug: "documents",
    icon: FileSearch,
    en: "Are my documents right?",
    ar: "أوراقي سليمة؟",
  },
  {
    slug: "visa",
    icon: Landmark,
    en: "What will they ask me at the embassy?",
    ar: "هيسألوني إيه في السفارة؟",
  },
  {
    slug: "arrived",
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

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="motion-safe-fallback"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary text-center mb-6">
          {HEADING[locale]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.06 * i }}
                className="motion-safe-fallback h-full"
              >
                <Link
                  href={`/stage/${stage.slug}`}
                  className="group flex flex-col h-full p-5 rounded-2xl border border-amber/20 bg-amber/[0.04] hover:bg-amber/[0.08] hover:border-amber/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center mb-3 shrink-0">
                    <Icon className="w-5 h-5 text-amber" />
                  </div>
                  <p className="text-sm font-semibold text-text-primary leading-snug flex-1">
                    {stage[locale]}
                  </p>
                  <ArrowRight className="w-4 h-4 text-amber mt-3 opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
