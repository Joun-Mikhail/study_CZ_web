"use client";

import { useEffect, useRef } from "react";
import { FANCY_POINTER, useMediaQuery } from "@/lib/use-media-query";

/**
 * A soft colour glow that trails the mouse (desktop only: a fine pointer,
 * wider than 768 px, no "reduce motion"). It follows with lerp smoothing and
 * only animates while it is catching up, so an idle page costs nothing.
 * Purely decorative and never intercepts clicks.
 */
export function CursorGlow() {
  const enabled = useMediaQuery(FANCY_POINTER);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    const SIZE = 480;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const pos = { ...target };
    let frame = 0;

    const step = () => {
      // Move 12% of the remaining distance per frame: a slight, smooth lag.
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      el.style.transform = `translate3d(${pos.x - SIZE / 2}px, ${pos.y - SIZE / 2}px, 0)`;
      const settled = Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(step);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 h-[480px] w-[480px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(139,92,246,0.13) 0%, rgba(59,130,246,0.08) 35%, rgba(236,72,153,0.04) 55%, transparent 70%)",
      }}
    />
  );
}
