"use client";

import { type ReactNode, useRef, useState, useCallback } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

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

  const inner = (
    <>
      {/* Cursor-aware ambient glow */}
      {isHovered && (
        <div
          className="absolute pointer-events-none z-0 transition-opacity duration-300"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </>
  );

  const isInternal = href && href.startsWith("/");

  if (isInternal) {
    return (
      <motion.div
        ref={cardRef}
        className={classes}
        whileHover={hoverVariants[hoverEffect]}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={href} className="absolute inset-0 z-20">
          <span className="sr-only">{ariaLabel}</span>
        </Link>
        {inner}
      </motion.div>
    );
  }

  const Component = href ? motion.a : motion.div;

  return (
    <Component
      ref={cardRef as any}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      onClick={onClick}
      className={classes}
      whileHover={hoverVariants[hoverEffect]}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {inner}
    </Component>
  );
}
