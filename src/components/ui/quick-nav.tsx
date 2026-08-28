"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import {
  HelpCircle,
  X,
  GraduationCap,
  Compass,
  BarChart3,
  FileText,
  Briefcase,
  MessageCircleQuestion,
  ClipboardCheck,
  BookOpen,
} from "lucide-react";

const quickLinks = [
  { icon: GraduationCap, href: "/universities", en: "Browse Universities", ar: "تصفح الجامعات" },
  { icon: Compass, href: "/university-matcher", en: "Find My Programme", ar: "ابحث عن برنامجي" },
  { icon: ClipboardCheck, href: "/eligibility", en: "Check Eligibility", ar: "تقييم الأهلية" },
  { icon: FileText, href: "/application-guide", en: "Application Guide", ar: "دليل التقديم" },
  { icon: BarChart3, href: "/cost-of-living", en: "Cost of Living", ar: "تكاليف المعيشة" },
  { icon: Briefcase, href: "/services", en: "Get Help", ar: "احصل على مساعدة" },
  { icon: MessageCircleQuestion, href: "/qa", en: "Common Questions", ar: "أسئلة شائعة" },
  { icon: BookOpen, href: "/courses", en: "Language Course", ar: "كورس اللغة" },
];

export function QuickNav() {
  const [open, setOpen] = useState(false);
  const { locale } = useTranslation();

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 end-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-amber to-orange-500 text-white shadow-lg shadow-amber/25 flex items-center justify-center hover:shadow-xl hover:shadow-amber/30 transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={locale === "ar" ? "مساعدة سريعة" : "Quick help"}
      >
        <HelpCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-midnight/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed bottom-24 end-6 z-50 w-[320px] max-h-[70vh] overflow-y-auto rounded-2xl bg-surface border border-border-subtle shadow-2xl"
            >
              <div className="sticky top-0 bg-surface border-b border-border-subtle px-5 py-4 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-base font-bold text-text-primary">
                  {locale === "ar" ? "وين بدك تروح؟" : "Where do you want to go?"}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 space-y-1">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-amber/5 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber/10 flex items-center justify-center shrink-0 group-hover:bg-amber/20 transition-colors">
                      <link.icon className="w-4.5 h-4.5 text-amber" />
                    </div>
                    <span className="text-sm font-medium">{locale === "ar" ? link.ar : link.en}</span>
                  </Link>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-border-subtle">
                <p className="text-xs text-text-muted text-center">
                  {locale === "ar" ? "مش لاقي اللي بدك إياه؟ جرب البحث" : "Can't find what you need? Try searching"}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
