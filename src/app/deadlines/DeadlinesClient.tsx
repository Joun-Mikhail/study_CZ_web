"use client";

import { useMemo } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { motion } from "framer-motion";
import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { universities } from "@/data/universities";
import { cn } from "@/lib/utils";

interface Deadline {
  universityName: string;
  universityId: string;
  faculty: string;
  level: string;
  date: string;
  note: string;
  daysRemaining: number;
}

const t = {
  en: {
    title: "Application Deadlines",
    subtitle: "All upcoming Czech university deadlines in one place. Sorted by date, updated regularly.",
    university: "University",
    faculty: "Faculty / Program",
    level: "Level",
    deadline: "Deadline",
    remaining: "Days Left",
    note: "Note",
    urgent: "Under 30 days",
    noDeadlines:
      "We're building a complete deadline database from official university websites. In the meantime, check deadlines directly on each university's page — we link to all official sites in our university directory.",
    eligibilityCta: "Check my eligibility →",
    browseUnis: "Browse universities (with official links) →",
  },
  ar: {
    title: "مواعيد التقديم",
    subtitle: "كل مواعيد التقديم للجامعات التشيكية في مكان واحد. مرتبة بالتاريخ، محدثة باستمرار.",
    university: "الجامعة",
    faculty: "الكلية / البرنامج",
    level: "المستوى",
    deadline: "اخر موعد",
    remaining: "الأيام المتبقية",
    note: "ملاحظة",
    urgent: "اقل من 30 يوم",
    noDeadlines:
      "بنبني قاعدة بيانات كاملة للمواعيد من المواقع الرسمية للجامعات. في الوقت الحالي، شوف المواعيد مباشرة من صفحة كل جامعة — بنربطك بكل المواقع الرسمية في دليل الجامعات.",
    eligibilityCta: "اعرف لو مؤهل →",
    browseUnis: "تصفح الجامعات (مع روابط رسمية) →",
  },
};

export default function DeadlinesClient() {
  const { locale } = useTranslation();
  const l = t[locale] || t.en;

  const deadlines = useMemo(() => {
    const now = new Date();
    const all: Deadline[] = [];

    for (const uni of universities) {
      const uniDeadlines = (uni as Record<string, unknown>).deadlines as
        | Array<{ faculty: string; level: string; date: string; note: string }>
        | undefined;
      if (!uniDeadlines) continue;

      for (const d of uniDeadlines) {
        if (!d.date) continue;
        const deadlineDate = new Date(d.date);
        const daysRemaining = Math.ceil(
          (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysRemaining < -30) continue;

        all.push({
          universityName: uni.name,
          universityId: uni.id,
          faculty: d.faculty,
          level: d.level,
          date: d.date,
          note: d.note,
          daysRemaining,
        });
      }
    }

    return all.sort((a, b) => a.daysRemaining - b.daysRemaining);
  }, []);

  const hasDeadlines = deadlines.length > 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{l.title}</h1>
            <p className="text-lg text-text-secondary">{l.subtitle}</p>
          </motion.div>

          {!hasDeadlines ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-border-subtle bg-surface/60 p-8 text-center space-y-6"
            >
              <Calendar className="w-12 h-12 text-text-muted mx-auto" />
              <p className="text-text-muted text-lg max-w-lg mx-auto">{l.noDeadlines}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <MagneticButton variant="secondary" href="/universities">
                  {l.browseUnis}
                </MagneticButton>
                <MagneticButton variant="primary" href="/eligibility">
                  {l.eligibilityCta}
                </MagneticButton>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-surface/60">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-text-muted border-b border-border-subtle">
                      <th className="text-start px-4 py-3 font-medium">{l.university}</th>
                      <th className="text-start px-4 py-3 font-medium">{l.faculty}</th>
                      <th className="text-start px-4 py-3 font-medium">{l.level}</th>
                      <th className="text-start px-4 py-3 font-medium">{l.deadline}</th>
                      <th className="text-start px-4 py-3 font-medium">{l.remaining}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deadlines.map((d, i) => {
                      const isUrgent = d.daysRemaining >= 0 && d.daysRemaining <= 30;
                      const isPast = d.daysRemaining < 0;

                      return (
                        <motion.tr
                          key={`${d.universityId}-${d.faculty}-${d.date}-${i}`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          className={cn(
                            "border-b border-border-subtle last:border-0",
                            isPast && "opacity-50"
                          )}
                        >
                          <td className="px-4 py-3">
                            <a
                              href={`/university/${d.universityId}`}
                              className="text-accent hover:underline font-medium"
                            >
                              {d.universityName}
                            </a>
                          </td>
                          <td className="px-4 py-3 text-text-secondary">{d.faculty || "--"}</td>
                          <td className="px-4 py-3 text-text-secondary">{d.level || "--"}</td>
                          <td className="px-4 py-3 text-text-primary font-medium">{d.date}</td>
                          <td className="px-4 py-3">
                            {isPast ? (
                              <span className="text-text-muted">Passed</span>
                            ) : (
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1 font-semibold",
                                  isUrgent ? "text-red-400" : "text-text-primary"
                                )}
                              >
                                {isUrgent && <AlertTriangle className="w-4 h-4" />}
                                {d.daysRemaining}
                              </span>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 text-center">
                <MagneticButton variant="primary" href="/eligibility">
                  {l.eligibilityCta}
                </MagneticButton>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
