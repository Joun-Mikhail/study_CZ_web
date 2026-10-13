"use client";

import type { ReactNode } from "react";
import Link from "@/components/locale-link";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Kept for compatibility; every interactive card now uses the same quiet hover. */
  hoverEffect?: "glow" | "lift" | "border";
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * The site's card: a solid surface with a hairline border. Clickable cards
 * (href or onClick) lift slightly and take the brand border on hover/focus.
 * The name is historical; there is no glass effect any more.
 */
export function GlassCard({ children, className, href, onClick, ariaLabel }: GlassCardProps) {
  const interactive = Boolean(href || onClick);
  // No tailwind-merge here: when the caller sets its own padding, leave the
  // default out so CSS order can't silently pick the wrong one.
  const ownPadding = /(^|\s)(sm:|md:|lg:)?p-/.test(className ?? "");
  const classes = cn(
    "reveal relative overflow-hidden rounded-2xl border border-border-subtle bg-surface",
    !ownPadding && "p-6",
    "shadow-[0_1px_2px_rgba(26,25,24,0.05)]",
    interactive &&
      "cursor-pointer transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-accent hover:shadow-[0_12px_28px_-16px_rgba(26,25,24,0.35)] focus-within:border-border-accent",
    className
  );
  const inner = <div className="relative z-10">{children}</div>;

  if (href && href.startsWith("/")) {
    return (
      <div className={classes}>
        <Link
          href={href}
          className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <span className="sr-only">{ariaLabel}</span>
        </Link>
        {inner}
      </div>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel} className={cn(classes, "block")}>
        {inner}
      </a>
    );
  }

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className={classes}
      >
        {inner}
      </div>
    );
  }

  return <div className={classes}>{inner}</div>;
}
