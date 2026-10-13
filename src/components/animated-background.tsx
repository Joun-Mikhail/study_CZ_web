"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Layered, decorative background for a section (put it first inside a
 * `relative isolate overflow-hidden` parent). Four layers:
 *
 *   1. a colour mesh that slowly turns and breathes (20 s),
 *   2. soft glowing orbs drifting on 15/20/25 s loops,
 *   3. a faint dot grid for depth,
 *   4. a static grain texture.
 *
 * Everything moves with `transform` only, so the browser composites it on
 * the GPU without repainting. The motion lives in globals.css ("Animated
 * background"): phones get three orbs and no mesh turn, reduced motion
 * stops it all, and this component pauses the loops while the section is
 * off screen.
 *
 * Variants:
 *   - "hero": translucent royal → purple → magenta over a photo, bright orbs.
 *   - "dark": an opaque indigo/purple band (white text on top).
 *   - "section": a light wash from the theme tokens (works in dark mode).
 */
type Variant = "hero" | "section" | "dark";

type Orb = { className: string; style: CSSProperties };

type VariantConfig = {
  base: string;
  shift: string;
  orbs: Orb[];
  orbOpacity: number;
  grid: string;
  noise: number;
};

const VARIANTS: Record<Variant, VariantConfig> = {
  hero: {
    base: "linear-gradient(135deg, rgba(11,31,58,0.96) 0%, rgba(30,58,138,0.88) 42%, rgba(76,29,149,0.84) 74%, rgba(131,24,67,0.78) 100%)",
    shift:
      "radial-gradient(30% 35% at 20% 30%, rgba(59,130,246,0.35), transparent 70%), radial-gradient(28% 32% at 75% 25%, rgba(139,92,246,0.35), transparent 70%), radial-gradient(30% 30% at 60% 80%, rgba(236,72,153,0.28), transparent 70%)",
    orbs: [
      { className: "ab-orb-1 h-64 w-64 md:h-[28rem] md:w-[28rem]", style: { top: "-8%", insetInlineStart: "-6%", background: "#3b82f6" } },
      { className: "ab-orb-2 h-72 w-72 md:h-[32rem] md:w-[32rem]", style: { top: "25%", insetInlineEnd: "-10%", background: "#8b5cf6" } },
      { className: "ab-orb-3 h-56 w-56 md:h-[24rem] md:w-[24rem]", style: { bottom: "-10%", insetInlineStart: "30%", background: "#ec4899" } },
      { className: "ab-orb-4 md:h-[20rem] md:w-[20rem]", style: { top: "10%", insetInlineStart: "45%", background: "#f97316" } },
      { className: "ab-orb-5 md:h-[18rem] md:w-[18rem]", style: { bottom: "5%", insetInlineEnd: "15%", background: "#f59e0b" } },
    ],
    orbOpacity: 0.55,
    grid: "text-white opacity-[0.08]",
    noise: 1,
  },
  dark: {
    base: "linear-gradient(140deg, #1e1b4b 0%, #312e81 40%, #4c1d95 78%, #581c87 100%)",
    shift:
      "radial-gradient(30% 35% at 15% 20%, rgba(249,115,22,0.22), transparent 70%), radial-gradient(30% 35% at 85% 30%, rgba(236,72,153,0.25), transparent 70%), radial-gradient(35% 30% at 50% 90%, rgba(59,130,246,0.25), transparent 70%)",
    orbs: [
      { className: "ab-orb-1 h-64 w-64 md:h-[26rem] md:w-[26rem]", style: { top: "-12%", insetInlineEnd: "5%", background: "#f97316" } },
      { className: "ab-orb-2 h-64 w-64 md:h-[28rem] md:w-[28rem]", style: { bottom: "-15%", insetInlineStart: "-5%", background: "#ec4899" } },
      { className: "ab-orb-3 h-56 w-56 md:h-[22rem] md:w-[22rem]", style: { top: "35%", insetInlineStart: "40%", background: "#3b82f6" } },
      { className: "ab-orb-4 md:h-[18rem] md:w-[18rem]", style: { top: "5%", insetInlineStart: "10%", background: "#8b5cf6" } },
    ],
    orbOpacity: 0.55,
    grid: "text-white opacity-[0.06]",
    noise: 1,
  },
  section: {
    base: "var(--color-bg-subtle)",
    shift:
      "radial-gradient(30% 35% at 15% 20%, color-mix(in srgb, var(--color-electric) 16%, transparent), transparent 70%), radial-gradient(30% 35% at 85% 25%, color-mix(in srgb, var(--color-orchid) 14%, transparent), transparent 70%), radial-gradient(35% 30% at 50% 95%, color-mix(in srgb, var(--color-gold) 14%, transparent), transparent 70%)",
    orbs: [
      { className: "ab-orb-1 h-56 w-56 md:h-[24rem] md:w-[24rem]", style: { top: "-10%", insetInlineStart: "-5%", background: "var(--color-electric)" } },
      { className: "ab-orb-2 h-56 w-56 md:h-[22rem] md:w-[22rem]", style: { bottom: "-10%", insetInlineEnd: "-5%", background: "var(--color-magenta)" } },
      { className: "ab-orb-3 h-48 w-48 md:h-[20rem] md:w-[20rem]", style: { top: "30%", insetInlineStart: "45%", background: "var(--color-orchid)" } },
    ],
    orbOpacity: 0.25,
    grid: "text-text-primary opacity-[0.05]",
    noise: 0.7,
  },
};

export function AnimatedBackground({ variant = "section", className }: { variant?: Variant; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = VARIANTS[variant];

  // Pause every loop while the section is off screen. Written straight to
  // the DOM, so scrolling never re-renders React.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={cn("ab-root", className)}>
      <div className="ab-layer" style={{ background: v.base }} />
      <div className="ab-layer ab-shift" style={{ background: v.shift }} />
      {v.orbs.map((orb, i) => (
        <span
          key={i}
          className={cn("ab-orb", orb.className)}
          style={{
            ...orb.style,
            // Colour fades to nothing towards the edge: a glow, not a disc.
            background: `radial-gradient(circle at center, ${orb.style.background} 0%, transparent 68%)`,
            opacity: v.orbOpacity,
          }}
        />
      ))}
      <div className={cn("ab-layer ab-grid", v.grid)} />
      <div className="ab-layer ab-noise" style={{ opacity: v.noise }} />
    </div>
  );
}
