"use client";

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 py-8 ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-border-subtle" />
      <div className="w-1.5 h-1.5 rounded-full bg-amber/40" />
      <div className="w-2 h-2 rounded-full bg-amber/60" />
      <div className="w-1.5 h-1.5 rounded-full bg-amber/40" />
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-border-subtle" />
    </div>
  );
}
