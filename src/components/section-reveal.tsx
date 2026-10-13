"use client";

import { Children, useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";

/** The site's reveal ease (easeOutQuad-like): quick start, soft landing. */
export const REVEAL_EASE = [0.25, 0.46, 0.45, 0.94] as const;

type SectionRevealProps = {
  children: ReactNode;
  /** Seconds before the first child moves. */
  delay?: number;
  /** Seconds between children. */
  stagger?: number;
  /** Classes for the wrapper (e.g. a grid). */
  className?: string;
  /** Classes for each child's wrapper (e.g. "h-full" inside a grid). */
  itemClassName?: string;
};

/**
 * Children rise into place one after another when the block scrolls into
 * view (once). Movement only, by the house rule "animate movement, not
 * existence": text is readable in every frame, without JavaScript, and in
 * Lighthouse's audit (which never scrolls). Reduced motion skips it
 * (MotionProvider sets reducedMotion="user").
 */
export function SectionReveal({ children, delay = 0, stagger = 0.09, className, itemClassName }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  const container: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };
  const item: Variants = {
    hidden: { y: 36 },
    visible: { y: 0, transition: { duration: 0.75, ease: REVEAL_EASE } },
  };

  return (
    <motion.div ref={ref} className={className} variants={container} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {Children.toArray(children).map((child, i) => (
        <motion.div key={i} variants={item} className={itemClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
