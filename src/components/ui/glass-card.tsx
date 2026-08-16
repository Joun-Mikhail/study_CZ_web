"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hoverEffect?: "glow" | "lift" | "border";
  href?: string;
  onClick?: () => void;
};

export function GlassCard({
  children,
  className,
  hoverEffect = "glow",
  href,
  onClick,
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

  const Component = href ? motion.a : motion.div;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-subtle bg-surface/80 backdrop-blur-sm p-6 cursor-pointer",
        "transition-colors shadow-sm",
        className
      )}
      whileHover={hoverVariants[hoverEffect]}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
