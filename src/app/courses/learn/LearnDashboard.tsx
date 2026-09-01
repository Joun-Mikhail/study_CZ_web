"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { COURSE, getTotalLessons } from "@/data/course";
import {
  hasAccess,
  validateCode,
  getProgress,
  getModuleProgress,
  getQuizScore,
  getLastVisited,
} from "@/lib/course-store";
import { PAYMENT_LINKS, WHATSAPP_URL } from "@/config/contact";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Lock,
  Unlock,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Trophy,
  ChevronRight,
  Globe,
  MapPin,
  Coffee,
  Heart,
  Briefcase,
  MessageCircle,
  ArrowRight,
  GraduationCap,
  Clock,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MODULE_ICONS = { Globe, MapPin, Coffee, Heart, Briefcase };

export default function LearnDashboard() {
  const { locale } = useTranslation();
  const isAr = locale === "ar";
  const t = isAr ? ar : en;

  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUnlocked(hasAccess());
  }, []);

  const handleUnlock = () => {
    if (validateCode(code)) {
      setUnlocked(true);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  if (!mounted) {
    return (
      <div className="relative min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20 px-4 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  // Access Gate
  if (!unlocked) {
    return (
      <div className="relative min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-amber" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">{t.gate.title}</h1>
              <p className="text-text-secondary text-sm">{t.gate.subtitle}</p>
            </motion.div>

            <GlassCard>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">{t.gate.codeLabel}</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setCodeError(false); }}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    placeholder={t.gate.codePlaceholder}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-midnight/50 border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 transition-colors",
                      codeError ? "border-red-500/50" : "border-border-subtle"
                    )}
                  />
                  <AnimatePresence>
                    {codeError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-1.5"
                      >
                        {t.gate.codeError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <MagneticButton variant="primary" onClick={handleUnlock} className="w-full">
                  <Unlock className="w-4 h-4" />
                  {t.gate.unlockBtn}
                </MagneticButton>

                <div className="relative flex items-center gap-3 my-2">
                  <div className="flex-1 border-t border-border-subtle" />
                  <span className="text-xs text-text-muted">{t.gate.or}</span>
                  <div className="flex-1 border-t border-border-subtle" />
                </div>

                <MagneticButton variant="secondary" href={PAYMENT_LINKS.course} className="w-full">
                  {t.gate.buyBtn}
                </MagneticButton>

                <p className="text-xs text-text-muted text-center">
                  {t.gate.help}{" "}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-amber hover:underline">
                    {t.gate.helpLink}
                  </a>
                </p>
              </div>
            </GlassCard>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Dashboard
  const progress = getProgress();
  const totalLessons = getTotalLessons();
  const completedCount = progress.completedLessons.length;
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const lastVisited = getLastVisited();

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-amber text-sm font-medium mb-2">
              <GraduationCap className="w-4 h-4" />
              {t.dashboard.badge}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{t.dashboard.title}</h1>
            <p className="text-text-secondary text-sm">{t.dashboard.subtitle}</p>
          </motion.div>

          {/* Progress overview bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <GlassCard>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">{t.dashboard.progress}</span>
                    <span className="text-sm font-bold text-amber">{overallPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-midnight/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${overallPercent}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-amber to-orange-400"
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-1.5">
                    {completedCount} / {totalLessons} {t.dashboard.lessonsCompleted}
                  </p>
                </div>
                {lastVisited && (
                  <MagneticButton
                    variant="primary"
                    size="sm"
                    href={`/courses/learn/${lastVisited.moduleId}/${lastVisited.lessonId}`}
                  >
                    <PlayCircle className="w-4 h-4" />
                    {t.dashboard.continueBtn}
                  </MagneticButton>
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* Modules */}
          <div className="space-y-4">
            {COURSE.modules.map((mod, mi) => {
              const iconKeys = ["Globe", "MapPin", "Coffee", "Heart", "Briefcase"] as const;
              const Icon = MODULE_ICONS[iconKeys[mi] as keyof typeof MODULE_ICONS] ?? Globe;
              const modProgress = getModuleProgress(mod.id, mod.lessons.length);
              const quizScore = getQuizScore(mod.id);
              const isModuleComplete = modProgress === 100;

              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + mi * 0.05 }}
                >
                  <GlassCard hoverEffect="border" className="!p-0 overflow-hidden">
                    {/* Module header */}
                    <div className="px-5 py-4 border-b border-border-subtle">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                          isModuleComplete ? "bg-green-500/10" : "bg-amber/10"
                        )}>
                          {isModuleComplete ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : (
                            <Icon className="w-5 h-5 text-amber" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs text-amber font-medium">
                              {t.dashboard.moduleLabel} {mi + 1}
                            </span>
                            {quizScore !== null && quizScore >= 70 && (
                              <span className="inline-flex items-center gap-1 text-xs text-green-400">
                                <Trophy className="w-3 h-3" />
                                {quizScore}%
                              </span>
                            )}
                          </div>
                          <h2 className="text-sm font-semibold text-text-primary">
                            {isAr ? mod.title.ar : mod.title.en}
                          </h2>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs text-text-muted">{modProgress}%</span>
                          <div className="w-16 h-1.5 rounded-full bg-midnight/50 mt-1 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-amber to-orange-400 transition-all duration-300"
                              style={{ width: `${modProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lessons list */}
                    <div className="divide-y divide-border-subtle/50">
                      {mod.lessons.map((lesson, li) => {
                        const completed = progress.completedLessons.includes(`${mod.id}/${lesson.id}`);
                        return (
                          <Link
                            key={lesson.id}
                            href={`/courses/learn/${mod.id}/${lesson.id}`}
                            className="flex items-center gap-3 px-5 py-3 hover:bg-surface-hover/50 transition-colors group"
                          >
                            <div className={cn(
                              "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-medium",
                              completed
                                ? "bg-green-500/10 text-green-400"
                                : "bg-surface text-text-muted"
                            )}>
                              {completed ? <CheckCircle2 className="w-4 h-4" /> : li + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm truncate",
                                completed ? "text-text-secondary" : "text-text-primary"
                              )}>
                                {isAr ? lesson.title.ar : lesson.title.en}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="flex items-center gap-1 text-xs text-text-muted">
                                  <Clock className="w-3 h-3" />
                                  {lesson.duration}
                                </span>
                                {lesson.isFree && (
                                  <span className="text-xs text-green-400 font-medium">{t.dashboard.free}</span>
                                )}
                                {!lesson.videoUrl && (
                                  <span className="text-xs text-text-muted/70 italic">{t.dashboard.comingSoon}</span>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-amber transition-colors shrink-0" />
                          </Link>
                        );
                      })}

                      {/* Quiz link */}
                      <Link
                        href={`/courses/learn/${mod.id}/quiz`}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-surface-hover/50 transition-colors group bg-amber/[0.02]"
                      >
                        <div className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                          quizScore !== null && quizScore >= 70
                            ? "bg-green-500/10"
                            : "bg-amber/10"
                        )}>
                          {quizScore !== null && quizScore >= 70 ? (
                            <Award className="w-4 h-4 text-green-400" />
                          ) : (
                            <Trophy className="w-4 h-4 text-amber" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary">
                            {isAr ? mod.quiz.title.ar : mod.quiz.title.en}
                          </p>
                          <p className="text-xs text-text-muted">
                            {mod.quiz.questions.length} {t.dashboard.questions}
                            {quizScore !== null && ` · ${t.dashboard.bestScore}: ${quizScore}%`}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-amber transition-colors shrink-0" />
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 end-6 z-50"
        aria-label="WhatsApp"
      >
        <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
      </a>

      <Footer />
    </div>
  );
}

// ─── Copy ──────────────────────────────────────────────────────────────────

const en = {
  gate: {
    title: "Access Your Course",
    subtitle: "Enter your access code to unlock the course. You received it after purchasing.",
    codeLabel: "Access Code",
    codePlaceholder: "Enter your code here...",
    codeError: "Invalid code. Please check and try again.",
    unlockBtn: "Unlock Course",
    or: "or",
    buyBtn: "Buy the Course (€49)",
    help: "Bought but didn't get a code?",
    helpLink: "Message us on WhatsApp",
  },
  dashboard: {
    badge: "Your Course",
    title: "Your First 90 Days in Czechia",
    subtitle: "Pick up where you left off or start from the beginning.",
    progress: "Overall Progress",
    lessonsCompleted: "lessons completed",
    continueBtn: "Continue",
    moduleLabel: "Module",
    free: "Free",
    comingSoon: "video coming soon",
    questions: "questions",
    bestScore: "Best",
  },
};

const ar: typeof en = {
  gate: {
    title: "ادخل للكورس",
    subtitle: "اكتب كود الدخول عشان تفتح الكورس. الكود وصلك بعد الشراء.",
    codeLabel: "كود الدخول",
    codePlaceholder: "اكتب الكود هنا...",
    codeError: "الكود غلط. اتأكد وجرب تاني.",
    unlockBtn: "افتح الكورس",
    or: "أو",
    buyBtn: "اشتري الكورس (49€)",
    help: "اشتريت بس الكود ما وصلش؟",
    helpLink: "كلمنا على واتساب",
  },
  dashboard: {
    badge: "الكورس بتاعك",
    title: "أول 90 يوم في التشيك",
    subtitle: "كمّل من وقفت أو ابدأ من الأول.",
    progress: "التقدم الكلي",
    lessonsCompleted: "درس مكتمل",
    continueBtn: "كمّل",
    moduleLabel: "الوحدة",
    free: "مجاني",
    comingSoon: "الفيديو قريبًا",
    questions: "أسئلة",
    bestScore: "أعلى",
  },
};
