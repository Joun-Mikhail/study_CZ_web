"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "@/i18n/context";
import { COMMUNITY_SIZE, COMMUNITY_SIZE_AR, FOUNDER_NAME, FOUNDER_NAME_AR, whatsappWithContext } from "@/config/contact";
import { cn } from "@/lib/utils";

/**
 * Who is behind the help: John's photo, name and two true lines. Only facts
 * already on /about/ (the Facebook group and its size; built by a student who
 * went through it). Ask John before adding anything new.
 */
const COPY = {
  en: {
    line1: "I've been through the Czech application process myself.",
    line2: `I started this as a Facebook group answering students' questions; it now has ${COMMUNITY_SIZE} members.`,
    whatsapp: "Message me on WhatsApp",
  },
  // Tool and course pages: Egyptian Arabic.
  ar: {
    line1: "عديت تجربة التقديم في التشيك بنفسي.",
    line2: `بدأت الموضوع ده كجروب فيسبوك بيجاوب على أسئلة الطلاب، ودلوقتي فيه أكتر من ${COMMUNITY_SIZE_AR} عضو.`,
    whatsapp: "كلمني على واتساب",
  },
  // Parents page: light Modern Standard Arabic.
  arFormal: {
    line1: "مررتُ بتجربة التقديم في التشيك بنفسي.",
    line2: `بدأتُ هذا المشروع كمجموعة على فيسبوك للإجابة عن أسئلة الطلاب، وتضم اليوم أكثر من ${COMMUNITY_SIZE_AR} عضو.`,
    whatsapp: "راسلوني عبر واتساب",
  },
};

export function FounderCard({
  topic,
  whatsapp = true,
  register = "colloquial",
  className,
}: {
  /** What the WhatsApp message is about ("the First 90 Days course"). */
  topic?: string;
  whatsapp?: boolean;
  register?: "colloquial" | "formal";
  className?: string;
}) {
  const { locale } = useTranslation();
  const c = locale === "ar" ? (register === "formal" ? COPY.arFormal : COPY.ar) : COPY.en;
  const name = locale === "ar" ? FOUNDER_NAME_AR : FOUNDER_NAME;
  return (
    <aside className={cn("flex items-start gap-4 rounded-2xl border border-border-subtle bg-surface p-5", className)} aria-label={name}>
      <Image src="/images/john.jpg" alt={name} width={64} height={64} sizes="64px" className="w-16 h-16 rounded-full object-cover shrink-0" />
      <div className="min-w-0">
        <p className="text-base font-semibold text-text-primary">{name}</p>
        <p className="text-sm text-text-secondary leading-relaxed mt-1">{c.line1}</p>
        <p className="text-sm text-text-secondary leading-relaxed mt-1">{c.line2}</p>
        {whatsapp && (
          <a
            href={whatsappWithContext(topic ?? "studying in Czechia", locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            <MessageCircle className="w-4 h-4 text-success" aria-hidden="true" />
            {c.whatsapp}
          </a>
        )}
      </div>
    </aside>
  );
}
