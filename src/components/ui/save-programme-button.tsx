"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { isProgrammeSaved, addProgrammeToJourney, removeProgrammeFromJourney } from "@/lib/journey-store";
import { useToast } from "@/components/ui/toast";

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
  const { toast } = useToast();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only state after mount so the static HTML hydrates cleanly
    setSaved(isProgrammeSaved(programmeId));
  }, [programmeId]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeProgrammeFromJourney(programmeId);
      setSaved(false);
      toast(
        locale === "ar" ? "اتشال من رحلتي" : "Removed from My Journey",
        "info"
      );
    } else {
      addProgrammeToJourney(programmeId);
      setSaved(true);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
      toast(
        locale === "ar" ? "اتضاف لرحلتي" : "Added to My Journey",
        "success"
      );
    }
  };

  const iconSize = size === "md" ? "w-5 h-5" : "w-4 h-4";
  const padding = size === "md" ? "px-3 py-1.5" : "px-2 py-1";

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 ${padding} rounded-lg text-xs font-medium transition-all duration-200 ${
        saved
          ? "bg-brand/15 text-brand border border-brand/30 hover:bg-brand/25"
          : "bg-surface text-text-secondary border border-border-subtle hover:border-brand/30 hover:text-brand"
      } ${animate ? "scale-110" : ""}`}
      aria-label={saved ? (locale === "ar" ? "شيل من رحلتي" : "Remove from My Journey") : (locale === "ar" ? "احفظ في رحلتي" : "Save to My Journey")}
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
