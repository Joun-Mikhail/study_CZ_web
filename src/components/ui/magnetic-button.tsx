"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
};

export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-amber via-amber to-orange-400 text-midnight shadow-[0_4px_24px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_32px_rgba(245,158,11,0.5)] hover:brightness-110 active:brightness-95",
    secondary:
      "bg-surface text-text-primary border border-border-subtle hover:border-amber/50 hover:bg-surface-hover hover:shadow-[0_2px_16px_rgba(245,158,11,0.1)] backdrop-blur-sm",
    ghost:
      "text-text-secondary hover:text-text-primary hover:bg-white/5",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm rounded-xl gap-2",
    md: "px-7 py-3.5 text-base rounded-xl gap-2.5",
    lg: "px-9 py-4.5 text-lg rounded-2xl gap-3",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);
  const motionProps = {
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 },
    whileTap: { scale: 0.97 },
    whileHover: { scale: 1.02 },
  };

  const shimmer = variant === "primary" ? (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover-shimmer pointer-events-none" />
  ) : null;

  const isInternal = href && href.startsWith("/");
  const isExternal = href && !isInternal;

  if (isInternal) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link ref={ref as any} href={href} onClick={onClick} className={classes}>
          {shimmer}
          {children}
        </Link>
      </motion.div>
    );
  }

  if (isExternal) {
    return (
      <motion.a
        ref={ref as any}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
        {...motionProps}
      >
        {shimmer}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as any}
      onClick={onClick}
      className={classes}
      {...motionProps}
    >
      {shimmer}
      {children}
    </motion.button>
  );
}
