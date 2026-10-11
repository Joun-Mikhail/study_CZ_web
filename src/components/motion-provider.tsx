"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Respect the visitor's "reduce motion" setting for every Framer Motion animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
