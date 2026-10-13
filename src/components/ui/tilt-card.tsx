"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A card that tilts in 3D towards a mouse cursor and floats up a little,
 * with a soft light following the cursor. Mouse only; flat on touch and with
 * reduced motion.
 */
export function TiltCard({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  // Cursor position across the card, 0..1 (0.5 = centre).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const lift = useMotionValue(0);
  const spring = { stiffness: 180, damping: 18, mass: 0.5 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const y = useSpring(lift, spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(28rem circle at ${gx} ${gy}, rgba(255,255,255,0.14), transparent 45%)`
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    lift.set(-6);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    lift.set(0);
  };

  return (
    <motion.div
      className={cn("group/tilt relative [transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY, y, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
      {/* Light that follows the cursor (desktop hover only). */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  );
}
