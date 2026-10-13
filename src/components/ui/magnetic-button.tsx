"use client";

import type { ReactNode } from "react";
import Link from "@/components/locale-link";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
};

/**
 * The site's button. Internal hrefs render a locale-aware link, external ones
 * open in a new tab, and no href renders a <button>. The name is historical;
 * it no longer follows the cursor.
 */
/** The button look, for links with their own behaviour (e.g. <HelpLink>). */
export function buttonClasses(
  variant: "primary" | "secondary" | "ghost" = "primary",
  size: "sm" | "md" | "lg" = "md",
  className?: string
): string {
  const base =
    "inline-flex items-center justify-center text-center font-semibold leading-tight transition-[background-color,border-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:translate-y-px disabled:opacity-60";

  // Primary: gradient that slides and a slight scale on hover (.btn-vivid).
  // Secondary: border turns brand while a tint fills in from the reading
  // side (.btn-fill). Both live in globals.css.
  const variants = {
    primary: "btn-vivid shadow-[0_1px_2px_rgba(11,31,58,0.12)]",
    secondary: "btn-fill bg-surface text-text-primary border border-border-subtle hover:border-brand hover:text-brand",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
  };

  const sizes = {
    sm: "min-h-10 px-4 py-2 text-sm rounded-lg gap-2",
    md: "min-h-12 px-6 py-3 text-[15px] rounded-lg gap-2",
    lg: "min-h-14 px-8 py-3.5 text-base rounded-xl gap-2.5",
  };

  return cn(base, variants[variant], sizes[size], className);
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  href,
}: MagneticButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if (href && href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
