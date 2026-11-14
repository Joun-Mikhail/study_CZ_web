"use client";

import { useEffect, useState } from "react";
import Link from "@/components/locale-link";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Footer } from "@/components/footer";
import { CalendarCheck, ExternalLink, Printer, Share2 } from "lucide-react";
import { CHECKED, SOURCES, ar as guideAr, en as guideEn } from "../StudentVisaEgyptClient";

// The checklist shows the visa guide's own items, so the two can never
// disagree: change a fact in StudentVisaEgyptClient and it changes here.
const STORAGE_KEY = "visa-checklist-egypt";
const SITE = "https://studyczechia.com";

const copy = {
  en: {
    title: "Czech student visa from Egypt: document checklist",
    subtitle: "Tick each item as you get it ready. Your ticks stay on this device. Print it and take it with you to the embassy.",
    independent: "Study Czechia is an independent student guide, not the embassy. Every line links to the official page it comes from.",
    checked: `Checked against the official pages on ${CHECKED.en}. Open the source before you book or pay.`,
    ready: (done: number, all: number) => `${done} of ${all} ready`,
    print: "Print",
    share: "Send on WhatsApp",
    shareText: "Czech student visa from Egypt: document checklist",
    reset: "Clear ticks",
    source: "Source",
    guide: "Read the full visa guide",
    hub: "Every step from Egypt",
    printedFrom: "Printed from",
  },
  ar: {
    title: "قائمة مستندات فيزا الدراسة في التشيك من مصر",
    subtitle: "علّم على كل بند عندما يصبح جاهزًا. العلامات تبقى محفوظة على جهازك. اطبعها وخذها معك إلى السفارة.",
    independent: "Study Czechia دليل طلابي مستقل، وليس السفارة. كل سطر مربوط بالصفحة الرسمية المأخوذ منها.",
    checked: `راجعنا هذه المعلومات على الصفحات الرسمية بتاريخ ${CHECKED.ar}. افتح المصدر قبل الحجز أو الدفع.`,
    ready: (done: number, all: number) => `${done} من ${all} جاهز`,
    print: "اطبع",
    share: "أرسلها على واتساب",
    shareText: "قائمة مستندات فيزا الدراسة في التشيك من مصر",
    reset: "امسح العلامات",
    source: "المصدر",
    guide: "اقرأ دليل الفيزا كاملًا",
    hub: "كل الخطوات من مصر",
    printedFrom: "مطبوعة من",
  },
};

export default function ChecklistClient() {
  const { locale } = useTranslation();
  const t = copy[locale];
  const guide = locale === "ar" ? guideAr : guideEn;
  // Items that only point to another of our pages are not things to prepare.
  const sections = guide.sections.map((s) => ({ ...s, items: s.items.filter((i) => i.source) }));
  const total = sections.reduce((n, s) => n + s.items.length, 0);

  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore ticks saved on this device
      if (saved) setDone(JSON.parse(saved));
    } catch {}
  }, []);
  const save = (next: Record<string, boolean>) => {
    setDone(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };
  const count = sections.reduce((n, s) => n + s.items.filter((_, i) => done[`${s.id}-${i}`]).length, 0);
  const pageUrl = `${SITE}${locale === "ar" ? "/ar" : ""}/student-visa-egypt/checklist/`;
  const button =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface text-sm font-medium text-text-primary hover:border-brand/40 hover:text-brand transition-colors";

  return (
    <div className="relative min-h-screen">
      <div className="print:hidden">
        <Navbar />
        <Breadcrumb />
      </div>
      <main id="main-content" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 print:pt-0 print:pb-0">
        <div className="max-w-3xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 print:text-2xl">{t.title}</h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-3 print:hidden">{t.subtitle}</p>
            <p className="text-sm text-text-secondary leading-relaxed mb-2">{t.independent}</p>
            <p className="flex items-start gap-2 text-sm text-text-muted">
              <CalendarCheck className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              {t.checked}
            </p>
          </header>

          <div className="mb-6 flex flex-wrap items-center gap-3 print:hidden">
            <p className="text-sm font-semibold text-text-primary" aria-live="polite">
              {t.ready(count, total)}
            </p>
            <button type="button" onClick={() => window.print()} className={button}>
              <Printer className="w-4 h-4" aria-hidden="true" />
              {t.print}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${t.shareText} ${pageUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={button}
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
              {t.share}
            </a>
            {count > 0 && (
              <button type="button" onClick={() => save({})} className="text-sm text-text-muted underline underline-offset-2 hover:text-text-secondary">
                {t.reset}
              </button>
            )}
          </div>

          {sections.map((s) => (
            <section key={s.id} aria-labelledby={`check-${s.id}`} className="mb-8 print:mb-4 print:break-inside-avoid-page">
              <h2 id={`check-${s.id}`} className="text-xl font-semibold text-text-primary mb-3 print:text-base print:mb-1">
                {s.title}
              </h2>
              <ul className="divide-y divide-border-subtle rounded-2xl border border-border-subtle print:border-0">
                {s.items.map((item, i) => {
                  const key = `${s.id}-${i}`;
                  return (
                    <li key={key} className="p-4 print:p-1.5">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!done[key]}
                          onChange={(e) => save({ ...done, [key]: e.target.checked })}
                          className="mt-1 h-5 w-5 shrink-0 accent-brand"
                        />
                        <span className={`text-sm leading-relaxed ${done[key] ? "text-text-muted" : "text-text-primary"}`}>{item.text}</span>
                      </label>
                      <p className="ms-8 mt-1 text-xs print:hidden">
                        <a
                          href={SOURCES[item.source as keyof typeof SOURCES]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-brand hover:underline"
                        >
                          {t.source}: {guide.sourceNames[item.source!]}
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </a>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <p className="hidden print:block text-xs mt-4">
            {t.printedFrom} <bdi dir="ltr">studyczechia.com/student-visa-egypt/checklist</bdi> · {t.checked} {guide.note}
          </p>

          <aside className="rounded-2xl border border-border-subtle bg-bg-subtle p-5 print:hidden">
            <h2 className="font-semibold text-text-primary mb-2">{guide.noteTitle}</h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">{guide.note}</p>
            <ul className="flex flex-wrap gap-2">
              {[
                { href: "/student-visa-egypt/", label: t.guide },
                { href: "/study-in-czechia-from-egypt/", label: t.hub },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-border-subtle bg-surface text-sm text-text-secondary hover:text-brand hover:border-brand/40 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
