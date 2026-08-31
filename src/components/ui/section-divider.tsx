"use client";

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 py-12 ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-border-subtle to-amber/20" />
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-amber/30" />
        <div className="w-1.5 h-1.5 rotate-45 bg-amber/50" />
        <div className="w-1 h-1 rounded-full bg-amber/30" />
      </div>
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent via-border-subtle to-amber/20" />
    </div>
  );
}
