"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { isProgrammeSaved, addProgrammeToJourney, removeProgrammeFromJourney } from "@/lib/journey-store";

export function SaveProgrammeButton({
  programmeId,
  locale,
  size = "sm",
}: {
  programmeId: string;
  locale: "en" | "ar";
  size?: "sm" | "md";
}) {
  const [saved, setSaved] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setSaved(isProgrammeSaved(programmeId));
  }, [programmeId]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeProgrammeFromJourney(programmeId);
      setSaved(false);
    } else {
      addProgrammeToJourney(programmeId);
      setSaved(true);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }
  };

  const iconSize = size === "md" ? "w-5 h-5" : "w-4 h-4";
  const padding = size === "md" ? "px-3 py-1.5" : "px-2 py-1";

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 ${padding} rounded-lg text-xs font-medium transition-all duration-200 ${
        saved
          ? "bg-amber/15 text-amber border border-amber/30 hover:bg-amber/25"
          : "bg-white/5 text-text-secondary border border-border-subtle hover:border-amber/30 hover:text-amber"
      } ${animate ? "scale-110" : ""}`}
      aria-label={saved ? (locale === "ar" ? "إزالة من رحلتي" : "Remove from My Journey") : (locale === "ar" ? "حفظ في رحلتي" : "Save to My Journey")}
    >
      {saved ? (
        <BookmarkCheck className={iconSize} />
      ) : (
        <Bookmark className={iconSize} />
      )}
      <span className="hidden sm:inline">
        {saved
          ? (locale === "ar" ? "محفوظ" : "Saved")
          : (locale === "ar" ? "احفظ" : "Save")}
      </span>
    </button>
  );
}
