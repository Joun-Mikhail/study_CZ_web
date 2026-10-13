"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/** The site's reveal ease (an expo-out): long, soft landing. */
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

type SectionRevealProps = {
  children: ReactNode;
  /** Seconds to wait once the block is in view. */
  delay?: number;
  className?: string;
};

/**
 * The block settles into place when it scrolls into view (once): a short,
 * slow rise. Movement only, by the house rule "animate movement, not
 * existence": text is readable in every frame, without JavaScript, and in
 * Lighthouse's audit (which never scrolls). Reduced motion skips it
 * (MotionProvider sets reducedMotion="user").
 */
export function SectionReveal({ children, delay = 0, className }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 20 }}
      animate={inView ? { y: 0 } : { y: 20 }}
      transition={{ duration: 1.1, ease: REVEAL_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
