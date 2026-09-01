"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { COURSE } from "@/data/course";
import type { QuizQuestion } from "@/data/course";
import { hasAccess, saveQuizScore, getQuizScore } from "@/lib/course-store";
import { PAYMENT_LINKS, WHATSAPP_URL } from "@/config/contact";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  LayoutDashboard,
  Lock,
  Award,
  MessageCircle,
  Target,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { moduleId: string };

type QuizState = "intro" | "active" | "result";

export default function QuizClient({ moduleId }: Props) {
  const { locale } = useTranslation();
  const isAr = locale === "ar";
  const t = isAr ? ar : en;

  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<QuizState>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const mod = COURSE.modules.find((m) => m.id === moduleId);
  const modIndex = COURSE.modules.findIndex((m) => m.id === moduleId);
  const quiz = mod?.quiz;
  const questions = quiz?.questions ?? [];
  const nextModule = COURSE.modules[modIndex + 1] ?? null;

  useEffect(() => {
    setMounted(true);
    setUnlocked(hasAccess());
    setBestScore(getQuizScore(moduleId));
  }, [moduleId]);

  if (!mod || !quiz) {
    return (
      <div className="relative min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-2xl font-bold text-text-primary">{t.notFound}</h1>
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

  const startQuiz = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQ(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setState("active");
  };

  const submitAnswer = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = selectedOption;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const goNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate score
      const correct = answers.filter(
        (a, i) => a === questions[i].correctIndex
      ).length;
      // Need to include the last answer
      const finalAnswers = [...answers];
      finalAnswers[currentQ] = answers[currentQ];
      const finalCorrect = finalAnswers.filter(
        (a, i) => a === questions[i].correctIndex
      ).length;
      const score = Math.round((finalCorrect / questions.length) * 100);
      saveQuizScore(moduleId, Math.max(score, bestScore ?? 0));
      setBestScore(Math.max(score, bestScore ?? 0));
      setState("result");
    }
  };

  const currentQuestion = questions[currentQ];
  const isCorrect = answers[currentQ] === currentQuestion?.correctIndex;
  const score = Math.round(
    (answers.filter((a, i) => a === questions[i]?.correctIndex).length /
      questions.length) *
      100
  );
  const passed = score >= (quiz.passingScore ?? 70);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-text-muted mb-6 flex-wrap">
            <Link href="/courses/learn" className="hover:text-text-secondary transition-colors flex items-center gap-1">
              <LayoutDashboard className="w-3 h-3" />
              {t.dashboard}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-secondary">{t.moduleLabel} {modIndex + 1}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">{t.quiz}</span>
          </div>

          {/* ── INTRO ── */}
          {state === "intro" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-amber" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {isAr ? quiz.title.ar : quiz.title.en}
              </h1>
              <p className="text-text-secondary text-sm mb-2">
                {questions.length} {t.questionsLabel} · {t.passingScore}: {quiz.passingScore}%
              </p>
              {bestScore !== null && (
                <p className="text-sm text-amber mb-4 flex items-center justify-center gap-1">
                  <Award className="w-4 h-4" />
                  {t.bestScoreLabel}: {bestScore}%
                </p>
              )}
              <div className="max-w-sm mx-auto mt-6">
                <GlassCard>
                  <div className="space-y-3 text-start">
                    <div className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <Target className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                      <span>{t.introTip1}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <Lightbulb className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                      <span>{t.introTip2}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <RotateCcw className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                      <span>{t.introTip3}</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
              <MagneticButton variant="primary" size="lg" onClick={startQuiz} className="mt-6">
                {t.startQuiz}
              </MagneticButton>
            </motion.div>
          )}

          {/* ── ACTIVE QUESTION ── */}
          {state === "active" && currentQuestion && (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-muted">
                    {t.questionLabel} {currentQ + 1} / {questions.length}
                  </span>
                  <span className="text-xs text-text-muted">
                    {Math.round(((currentQ + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-midnight/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber to-orange-400 transition-all duration-300"
                    style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <GlassCard>
                <h2 className="text-lg font-semibold text-text-primary mb-5">
                  {isAr ? currentQuestion.question.ar : currentQuestion.question.en}
                </h2>

                <div className="space-y-2.5 mb-5">
                  {currentQuestion.options.map((opt, i) => {
                    const isSelected = selectedOption === i;
                    const isAnswer = i === currentQuestion.correctIndex;
                    const showResult = showExplanation;

                    return (
                      <button
                        key={i}
                        onClick={() => !showExplanation && setSelectedOption(i)}
                        disabled={showExplanation}
                        className={cn(
                          "w-full text-start px-4 py-3 rounded-xl border text-sm transition-all",
                          showResult && isAnswer
                            ? "border-green-500/50 bg-green-500/10 text-green-300"
                            : showResult && isSelected && !isAnswer
                            ? "border-red-500/50 bg-red-500/10 text-red-300"
                            : isSelected
                            ? "border-amber/50 bg-amber/10 text-text-primary"
                            : "border-border-subtle bg-surface/60 text-text-secondary hover:border-amber/30 hover:bg-surface-hover/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 border",
                            showResult && isAnswer
                              ? "border-green-500 bg-green-500/20 text-green-300"
                              : showResult && isSelected && !isAnswer
                              ? "border-red-500 bg-red-500/20 text-red-300"
                              : isSelected
                              ? "border-amber bg-amber/20 text-amber"
                              : "border-border-subtle text-text-muted"
                          )}>
                            {showResult && isAnswer ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : showResult && isSelected && !isAnswer ? (
                              <XCircle className="w-4 h-4" />
                            ) : (
                              String.fromCharCode(65 + i)
                            )}
                          </div>
                          <span>{isAr ? opt.ar : opt.en}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={cn(
                        "px-4 py-3 rounded-xl mb-4 border",
                        isCorrect
                          ? "border-green-500/20 bg-green-500/[0.05]"
                          : "border-red-500/20 bg-red-500/[0.05]"
                      )}>
                        <div className="flex items-center gap-2 mb-1">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          <span className={cn(
                            "text-sm font-medium",
                            isCorrect ? "text-green-400" : "text-red-400"
                          )}>
                            {isCorrect ? t.correct : t.incorrect}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary">
                          {isAr ? currentQuestion.explanation.ar : currentQuestion.explanation.en}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  {!showExplanation ? (
                    <MagneticButton
                      variant="primary"
                      onClick={submitAnswer}
                      className="w-full"
                    >
                      {t.checkAnswer}
                    </MagneticButton>
                  ) : (
                    <MagneticButton
                      variant="primary"
                      onClick={goNext}
                      className="w-full"
                    >
                      {currentQ < questions.length - 1 ? t.nextQuestion : t.seeResults}
                      <ChevronRight className="w-4 h-4" />
                    </MagneticButton>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* ── RESULTS ── */}
          {state === "result" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
                passed ? "bg-green-500/10" : "bg-red-500/10"
              )}>
                {passed ? (
                  <Trophy className="w-10 h-10 text-green-400" />
                ) : (
                  <RotateCcw className="w-10 h-10 text-red-400" />
                )}
              </div>

              <h1 className="text-2xl font-bold text-text-primary mb-1">
                {passed ? t.result.passTitle : t.result.failTitle}
              </h1>
              <p className="text-4xl font-bold text-amber my-3">{score}%</p>
              <p className="text-text-secondary text-sm mb-6">
                {passed ? t.result.passMsg : t.result.failMsg}
              </p>

              {/* Score breakdown */}
              <GlassCard className="max-w-sm mx-auto mb-6 text-start">
                <div className="space-y-2">
                  {questions.map((q, i) => {
                    const correct = answers[i] === q.correctIndex;
                    return (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        {correct ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        )}
                        <span className={cn(
                          "truncate",
                          correct ? "text-text-secondary" : "text-red-300"
                        )}>
                          {isAr ? q.question.ar : q.question.en}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {!passed && (
                  <MagneticButton variant="secondary" onClick={startQuiz}>
                    <RotateCcw className="w-4 h-4" />
                    {t.result.retryBtn}
                  </MagneticButton>
                )}
                {passed && nextModule && (
                  <MagneticButton
                    variant="primary"
                    href={`/courses/learn/${nextModule.id}/${nextModule.lessons[0].id}`}
                  >
                    {t.result.nextModuleBtn}
                    <ChevronRight className="w-4 h-4" />
                  </MagneticButton>
                )}
                <MagneticButton variant="secondary" href="/courses/learn">
                  <LayoutDashboard className="w-4 h-4" />
                  {t.result.dashboardBtn}
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </div>
      </main>

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
  notFound: "Quiz not found",
  dashboard: "Dashboard",
  moduleLabel: "Module",
  quiz: "Quiz",
  questionsLabel: "questions",
  passingScore: "Passing",
  bestScoreLabel: "Your best score",
  introTip1: "Answer all questions to see your score",
  introTip2: "Each question has an explanation after you answer",
  introTip3: "You can retake the quiz as many times as you want",
  startQuiz: "Start Quiz",
  questionLabel: "Question",
  checkAnswer: "Check Answer",
  nextQuestion: "Next Question",
  seeResults: "See Results",
  correct: "Correct!",
  incorrect: "Not quite right",
  locked: {
    title: "Quiz Locked",
    subtitle: "Purchase the course to access quizzes.",
    buyBtn: "Get the Course (€49)",
    dashboardBtn: "Back to Dashboard",
  },
  result: {
    passTitle: "Great job! You passed!",
    failTitle: "Not quite there yet",
    passMsg: "You've demonstrated a solid understanding of this module.",
    failMsg: "Review the lessons and try again. You need 70% to pass.",
    retryBtn: "Try Again",
    nextModuleBtn: "Next Module",
    dashboardBtn: "Dashboard",
  },
};

const ar: typeof en = {
  notFound: "الاختبار مش موجود",
  dashboard: "لوحة التحكم",
  moduleLabel: "الوحدة",
  quiz: "الاختبار",
  questionsLabel: "أسئلة",
  passingScore: "درجة النجاح",
  bestScoreLabel: "أعلى درجة ليك",
  introTip1: "جاوب كل الأسئلة عشان تشوف درجتك",
  introTip2: "كل سؤال فيه شرح بعد ما تجاوب",
  introTip3: "ممكن تعيد الاختبار عدد المرات اللي تحبها",
  startQuiz: "ابدأ الاختبار",
  questionLabel: "السؤال",
  checkAnswer: "تأكد من الإجابة",
  nextQuestion: "السؤال التالي",
  seeResults: "شوف النتيجة",
  correct: "صح!",
  incorrect: "مش مظبوط",
  locked: {
    title: "الاختبار مقفول",
    subtitle: "اشتري الكورس عشان تقدر تعمل الاختبارات.",
    buyBtn: "احصل على الكورس (49€)",
    dashboardBtn: "رجوع للوحة التحكم",
  },
  result: {
    passTitle: "أحسنت! نجحت!",
    failTitle: "لسه محتاج شوية",
    passMsg: "فهمك للوحدة دي كويس.",
    failMsg: "راجع الدروس وجرب تاني. محتاج 70% عشان تنجح.",
    retryBtn: "جرب تاني",
    nextModuleBtn: "الوحدة التالية",
    dashboardBtn: "لوحة التحكم",
  },
};
