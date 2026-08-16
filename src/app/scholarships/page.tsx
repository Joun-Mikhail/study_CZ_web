"use client";

import React from "react";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import { scholarships } from "@/data/scholarships";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GraduationCap, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  const { t, locale } = useTranslation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            {locale === "ar" ? "المنح الدراسية والتمويل" : "Scholarships & Funding"}
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {locale === "ar"
              ? "اكتشف طرق المنح الشائعة ونصائح للتقديم — من طلاب عدّوا التجربة فعلًا."
              : "Find common scholarship routes and tips for applying — from students who've been through it."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {scholarships.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <GlassCard href={s.link || "#"} hoverEffect="lift" className="h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary mb-0.5">{s.name[locale]}</h2>
                    <p className="text-xs text-text-muted">{s.provider[locale]}</p>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-3 flex-1">{s.eligibility[locale]}</p>

                <div className="text-sm text-text-secondary mb-3">
                  <span className="font-medium text-text-primary">
                    {locale === "ar" ? "التغطية:" : "Coverage:"}
                  </span>{" "}
                  {s.coverage[locale]}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Clock className="w-3 h-3" />
                  {locale === "ar" ? "الموعد النهائي:" : "Deadline:"} {s.deadline[locale]}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
