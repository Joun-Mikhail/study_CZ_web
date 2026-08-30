"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "none";
  as?: "div" | "span" | "section" | "p";
};

export function FadeIn({
  delay = 0,
  duration = 0.5,
  direction = "up",
  className,
  children,
  ...props
}: FadeInProps) {
  const y = direction === "up" ? 20 : direction === "down" ? -20 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration }}
      className={cn("motion-safe-fallback", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
