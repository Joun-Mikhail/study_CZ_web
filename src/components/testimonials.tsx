"use client";

import Image from "next/image";
import { Quote, MapPin } from "lucide-react";
import { useTranslation } from "@/i18n/context";
import { GlassCard } from "@/components/ui/glass-card";
import { testimonials } from "@/data/testimonials";

const ARABIC_SCRIPT = /[؀-ۿ]/;

const HEADING = {
  en: "What Students Are Saying",
  ar: "إيه رأي الطلاب",
};

export function Testimonials() {
  const { locale } = useTranslation();

  if (testimonials.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto mb-16">
      <h2 className="text-xl font-semibold text-text-primary text-center mb-6">
        {HEADING[locale]}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((item, i) => {
          const quoteDir = ARABIC_SCRIPT.test(item.quote) ? "rtl" : "ltr";
          return (
            <GlassCard key={i} className="flex flex-col justify-between">
              <div>
                <Quote className="w-5 h-5 text-amber mb-3" />
                <p
                  dir={quoteDir}
                  className="text-sm text-text-secondary italic leading-relaxed mb-4 text-start"
                >
                  {item.quote}
                </p>
              </div>

              {item.screenshotPath && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={item.screenshotPath}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-text-muted">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-border-subtle flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-text-muted" />
                </div>
                <span>
                  {item.firstName}, {item.originCountry} · {item.year} · {item.serviceUsed}
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
