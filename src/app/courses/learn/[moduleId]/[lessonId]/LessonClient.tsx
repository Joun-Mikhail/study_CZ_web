"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { COURSE, getAdjacentLessons } from "@/data/course";
import {
  hasAccess,
  markLessonComplete,
  isLessonComplete,
  setLastVisited,
} from "@/lib/course-store";
import { WHATSAPP_URL, PAYMENT_LINKS } from "@/config/contact";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  Clock,
  Lock,
  Download,
  FileText,
  Headphones,
  BookOpen,
  MessageCircle,
  LayoutDashboard,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { moduleId: string; lessonId: string };

export default function LessonClient({ moduleId, lessonId }: Props) {
  const { locale } = useTranslation();
  const isAr = locale === "ar";
  const t = isAr ? ar : en;

  const [unlocked, setUnlocked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mod = COURSE.modules.find((m) => m.id === moduleId);
  const lesson = mod?.lessons.find((l) => l.id === lessonId);
  const { prev, next } = getAdjacentLessons(moduleId, lessonId);
  const modIndex = COURSE.modules.findIndex((m) => m.id === moduleId);
  const lessonIndex = mod?.lessons.findIndex((l) => l.id === lessonId) ?? 0;

  useEffect(() => {
    setMounted(true);
    const access = hasAccess();
    setUnlocked(access || (lesson?.isFree ?? false));
    setCompleted(isLessonComplete(moduleId, lessonId));
    if (access) setLastVisited(moduleId, lessonId);
  }, [moduleId, lessonId, lesson?.isFree]);

  if (!mod || !lesson) {
    return (
      <div className="relative min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-2xl font-bold text-text-primary">{t.notFound}</h1>
          <MagneticButton variant="secondary" href="/courses/learn" className="mt-4">
            {t.backToDashboard}
          </MagneticButton>
        </main>
        <Footer />
      </div>
    );
  }

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

  // Locked state
  if (!unlocked) {
    return (
      <div className="relative min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-amber" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">{t.locked.title}</h1>
            <p className="text-text-secondary text-sm mb-6">{t.locked.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <MagneticButton variant="primary" href={PAYMENT_LINKS.course}>
                {t.locked.buyBtn}
              </MagneticButton>
              <MagneticButton variant="secondary" href="/courses/learn">
                {t.locked.dashboardBtn}
              </MagneticButton>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleComplete = () => {
    markLessonComplete(moduleId, lessonId);
    setCompleted(true);
  };

  const contentText = isAr ? lesson.content.ar : lesson.content.en;
  const paragraphs = contentText.split("\n").filter((p) => p.trim());

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb nav */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs text-text-muted mb-6 flex-wrap"
          >
            <Link href="/courses/learn" className="hover:text-text-secondary transition-colors flex items-center gap-1">
              <LayoutDashboard className="w-3 h-3" />
              {t.dashboard}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-secondary">
              {t.moduleLabel} {modIndex + 1}
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">
              {t.lessonLabel} {lessonIndex + 1}
            </span>
          </motion.div>

          {/* Lesson header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 text-amber text-sm font-medium mb-1">
              <BookOpen className="w-4 h-4" />
              {t.moduleLabel} {modIndex + 1} · {t.lessonLabel} {lessonIndex + 1}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              {isAr ? lesson.title.ar : lesson.title.en}
            </h1>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lesson.duration}
              </span>
              {completed && (
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle2 className="w-3 h-3" />
                  {t.completed}
                </span>
              )}
            </div>
          </motion.div>

          {/* Video player */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            {lesson.videoUrl ? (
              <div className="aspect-video rounded-2xl overflow-hidden border border-border-subtle bg-midnight">
                <iframe
                  src={lesson.videoUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                  title={isAr ? lesson.title.ar : lesson.title.en}
                />
              </div>
            ) : (
              <div className="aspect-video rounded-2xl border border-border-subtle bg-midnight/50 flex flex-col items-center justify-center">
                <Video className="w-12 h-12 text-text-muted/30 mb-3" />
                <p className="text-text-muted text-sm">{t.videoComingSoon}</p>
                <p className="text-text-muted/70 text-xs mt-1">{t.videoComingSoonSub}</p>
              </div>
            )}
          </motion.div>

          {/* Lesson content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <GlassCard>
              <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber" />
                {t.lessonNotes}
              </h2>
              <div className="space-y-3">
                {paragraphs.map((p, i) => {
                  if (p.startsWith("•")) {
                    return (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber shrink-0 mt-1" />
                        <span>{p.replace("• ", "")}</span>
                      </div>
                    );
                  }
                  return (
                    <p key={i} className="text-sm text-text-secondary leading-relaxed">
                      {p}
                    </p>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          {/* Resources */}
          {lesson.resources.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-amber" />
                {t.resources}
              </h3>
              <div className="space-y-2">
                {lesson.resources.map((res, i) => {
                  const ResIcon = res.type === "audio" ? Headphones : FileText;
                  return (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-surface/60 border border-border-subtle hover:border-amber/30 transition-colors"
                    >
                      <ResIcon className="w-4 h-4 text-amber shrink-0" />
                      <span className="text-sm text-text-secondary">
                        {isAr ? res.title.ar : res.title.en}
                      </span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Complete + Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-4"
          >
            {/* Mark complete */}
            {!completed ? (
              <MagneticButton variant="primary" onClick={handleComplete} className="w-full">
                <CheckCircle2 className="w-4 h-4" />
                {t.markComplete}
              </MagneticButton>
            ) : (
              <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-green-400">{t.lessonDone}</span>
              </div>
            )}

            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              {prev ? (
                <MagneticButton
                  variant="secondary"
                  size="sm"
                  href={`/courses/learn/${prev.moduleId}/${prev.lesson.id}`}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t.prev}
                </MagneticButton>
              ) : (
                <div className="flex-1" />
              )}
              {next ? (
                <MagneticButton
                  variant="primary"
                  size="sm"
                  href={`/courses/learn/${next.moduleId}/${next.lesson.id}`}
                  className="flex-1"
                >
                  {t.next}
                  <ChevronRight className="w-4 h-4" />
                </MagneticButton>
              ) : (
                <MagneticButton
                  variant="primary"
                  size="sm"
                  href={`/courses/learn/${moduleId}/quiz`}
                  className="flex-1"
                >
                  {t.takeQuiz}
                  <ChevronRight className="w-4 h-4" />
                </MagneticButton>
              )}
            </div>
          </motion.div>
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
  notFound: "Lesson not found",
  backToDashboard: "Back to Dashboard",
  dashboard: "Dashboard",
  moduleLabel: "Module",
  lessonLabel: "Lesson",
  completed: "Completed",
  videoComingSoon: "Video coming soon",
  videoComingSoonSub: "Read the lesson notes below in the meantime",
  lessonNotes: "Lesson Notes",
  resources: "Downloadable Resources",
  markComplete: "Mark as Complete",
  lessonDone: "Lesson Complete!",
  prev: "Previous",
  next: "Next Lesson",
  takeQuiz: "Take the Quiz",
  locked: {
    title: "This Lesson is Locked",
    subtitle: "Purchase the course to unlock all lessons, quizzes, and downloadable resources.",
    buyBtn: "Get the Course (€49)",
    dashboardBtn: "Back to Dashboard",
  },
};

const ar: typeof en = {
  notFound: "الدرس مش موجود",
  backToDashboard: "رجوع للوحة التحكم",
  dashboard: "لوحة التحكم",
  moduleLabel: "الوحدة",
  lessonLabel: "الدرس",
  completed: "مكتمل",
  videoComingSoon: "الفيديو قريبًا",
  videoComingSoonSub: "اقرأ ملاحظات الدرس تحت في الوقت الحالي",
  lessonNotes: "ملاحظات الدرس",
  resources: "ملفات قابلة للتحميل",
  markComplete: "علّم كمكتمل",
  lessonDone: "الدرس مكتمل!",
  prev: "السابق",
  next: "الدرس التالي",
  takeQuiz: "ابدأ الاختبار",
  locked: {
    title: "الدرس ده مقفول",
    subtitle: "اشتري الكورس عشان تفتح كل الدروس والاختبارات والملفات.",
    buyBtn: "احصل على الكورس (49€)",
    dashboardBtn: "رجوع للوحة التحكم",
  },
};
