"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure up from 0 when it scrolls into view. The final value is in
 * the HTML from the start (no JS, crawlers and reduced motion all see it);
 * the count only runs once, in the browser, for people who allow motion.
 * Handles a prefix or suffix around the number: "€1,500", "1,500€", "36".
 */
export function CountUp({ value, duration = 1100 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const m = /^(\D*)([\d,]+)(\D*)$/.exec(value);
    const el = ref.current;
    if (!m || !el) return;
    const [, pre, digits, post] = m;
    const target = Number(digits.replace(/,/g, ""));
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen when the page loads: leave the real figure alone.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- start from 0 while it's still off screen
    setShown(`${pre}0${post}`);

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(`${pre}${Math.round(eased * target).toLocaleString("en-US")}${post}`);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {/* Screen readers get the real figure once, not every frame. */}
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
