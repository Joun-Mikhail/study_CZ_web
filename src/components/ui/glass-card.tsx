"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hoverEffect?: "glow" | "lift" | "border";
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export function GlassCard({
  children,
  className,
  hoverEffect = "glow",
  href,
  onClick,
  ariaLabel,
}: GlassCardProps) {
  const hoverVariants = {
    glow: {
      boxShadow: "0 0 40px rgba(245, 158, 11, 0.15), 0 8px 32px rgba(0,0,0,0.12)",
    },
    lift: {
      y: -6,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    },
    border: {
      borderColor: "rgba(245, 158, 11, 0.5)",
    },
  };

  const classes = cn(
    "relative overflow-hidden rounded-2xl border border-border-subtle bg-surface/80 backdrop-blur-sm p-6",
    (href || onClick) && "cursor-pointer",
    "transition-colors shadow-sm",
    className
  );

  const inner = <div className="relative z-10">{children}</div>;

  const isInternal = href && href.startsWith("/");

  if (isInternal) {
    return (
      <motion.div
        className={classes}
        whileHover={hoverVariants[hoverEffect]}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Link href={href} className="absolute inset-0 z-20" aria-label={ariaLabel} tabIndex={ariaLabel ? undefined : -1} aria-hidden={ariaLabel ? undefined : true} />
        {inner}
      </motion.div>
    );
  }

  const Component = href ? motion.a : motion.div;

  return (
    <Component
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      onClick={onClick}
      className={classes}
      whileHover={hoverVariants[hoverEffect]}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {inner}
    </Component>
  );
}
