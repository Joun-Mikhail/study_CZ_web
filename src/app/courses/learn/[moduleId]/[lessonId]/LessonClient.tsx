"use client";

import { price } from "@/config/pricing";
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
import { useLessonBody } from "@/lib/course-api";
import { WHATSAPP_URL, PAYMENT_LINKS, whatsappWithContext } from "@/config/contact";
import { motion } from "framer-motion";
import Link from "@/components/locale-link";
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
  LayoutDashboard,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { moduleId: string; lessonId: string };

export default function LessonClient({ moduleId, lessonId }: Props) {
  const { locale } = useTranslation();
  const isAr = locale === "ar";
  const t = isAr ? ar : en;

  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mod = COURSE.modules.find((m) => m.id === moduleId);
  const lesson = mod?.lessons.find((l) => l.id === lessonId);
  const { prev, next } = getAdjacentLessons(moduleId, lessonId);
  const modIndex = COURSE.modules.findIndex((m) => m.id === moduleId);
  const lessonIndex = mod?.lessons.findIndex((l) => l.id === lessonId) ?? 0;

  const body = useLessonBody(moduleId, lesson);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only state after mount so the static HTML hydrates cleanly
    setMounted(true);
    setCompleted(isLessonComplete(moduleId, lessonId));
    if (hasAccess()) setLastVisited(moduleId, lessonId);
  }, [moduleId, lessonId]);

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

  if (!mounted || body.status === "loading") {
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

  // Locked state: no valid access token, or the course service is unavailable
  if (body.status === "locked") {
    const copy = body.reason === "unavailable" ? t.unavailable : body.reason === "not-open" ? t.notOpen : t.locked;
    return (
      <div className="relative min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-amber" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">{copy.title}</h1>
            <p className="text-text-secondary text-sm mb-6">{copy.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {body.reason === "not-open" ? null : body.reason === "no-access" ? (
                <MagneticButton variant="primary" href={PAYMENT_LINKS.course}>
                  {t.locked.buyBtn}
                </MagneticButton>
              ) : (
                <MagneticButton variant="primary" href={whatsappWithContext("a course lesson that would not load")}>
                  {t.unavailable.helpBtn}
                </MagneticButton>
              )}
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

  const contentText = isAr ? body.content.ar : body.content.en;
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
            {body.videoUrl ? (
              <div className="aspect-video rounded-2xl overflow-hidden border border-border-subtle bg-midnight">
                <iframe
                  src={body.videoUrl}
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
          {body.resources.length > 0 && (
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
                {body.resources.map((res, i) => {
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
    subtitle: "Purchase the course to unlock all lessons, quizzes, and downloadable resources. Already bought it on another device? Message me on WhatsApp with the email you paid with and I'll send your personal link.",
    buyBtn: `Get the Course (${price("course")})`,
    dashboardBtn: "Back to Dashboard",
  },
  notOpen: {
    title: "The course opens on 1 January 2027",
    subtitle: "Your access is ready on this device. Lessons unlock on opening day; free preview lessons are open now.",
  },
  unavailable: {
    title: "This lesson couldn't load",
    subtitle: "Something went wrong on our side. Please try again in a few minutes, or message me on WhatsApp.",
    helpBtn: "Message on WhatsApp",
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
    subtitle: "اشتري الكورس عشان تفتح كل الدروس والاختبارات والملفات. اشتريته قبل كده على جهاز تاني؟ ابعتلي على واتساب الإيميل اللي دفعت بيه وهبعتلك اللينك بتاعك.",
    buyBtn: `احصل على الكورس (${price("course", "ar")})`,
    dashboardBtn: "رجوع للوحة التحكم",
  },
  notOpen: {
    title: "الكورس بيفتح يوم 1 يناير 2027",
    subtitle: "الدخول جاهز على الجهاز ده. الدروس بتفتح يوم الافتتاح، والدروس المجانية متاحة دلوقتي.",
  },
  unavailable: {
    title: "الدرس ماتحملش",
    subtitle: "في مشكلة عندنا. جرب تاني بعد شوية، أو ابعتلي على واتساب.",
    helpBtn: "كلمني على واتساب",
  },
};
