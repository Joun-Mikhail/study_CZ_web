"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { qaEntries, qaCategories, type QaEntry } from "@/data/qa";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Answer text stays permanently mounted (never conditionally rendered) so it's
// present in the server-rendered HTML and indexable even without JS running —
// only the visual height/opacity animate on toggle.
function AccordionItem({ entry, locale }: { entry: QaEntry; locale: "en" | "ar" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface/60 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start hover:bg-white/[0.03] transition-colors"
      >
        <span className="font-medium text-text-primary">{entry.q[locale]}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 shrink-0 text-text-muted transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
          {entry.a[locale]}
        </p>
      </motion.div>
    </div>
  );
}

export default function QaPage() {
  const { t, locale } = useTranslation();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<QaEntry["category"] | "all">("all");

  const filtered = useMemo(() => {
    return qaEntries.filter((entry) => {
      const matchesCategory = category === "all" || entry.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        entry.q[locale].toLowerCase().includes(q) ||
        entry.a[locale].toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category, locale]);

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            {t.qa.title}
          </h1>
          <p className="text-text-secondary leading-relaxed">{t.qa.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.qa.searchPlaceholder}
              className="w-full ps-11 pe-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber/40 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setCategory("all")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-sm border transition-colors",
                category === "all"
                  ? "bg-amber text-midnight border-amber font-medium"
                  : "border-border-subtle text-text-secondary hover:text-text-primary hover:border-amber/30"
              )}
            >
              {t.qa.allCategories}
            </button>
            {qaCategories.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-sm border transition-colors",
                  category === c.key
                    ? "bg-amber text-midnight border-amber font-medium"
                    : "border-border-subtle text-text-secondary hover:text-text-primary hover:border-amber/30"
                )}
              >
                {c.label[locale]}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center text-text-muted py-12">{t.qa.noResults}</p>
          ) : (
            filtered.map((entry) => (
              <AccordionItem key={entry.id} entry={entry} locale={locale} />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
