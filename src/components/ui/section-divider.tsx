"use client";

import { motion } from "framer-motion";

export function SectionDivider({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex items-center justify-center gap-3 py-8 ${className ?? ""}`}
    >
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-border-subtle" />
      <div className="w-1.5 h-1.5 rounded-full bg-amber/40" />
      <div className="w-2 h-2 rounded-full bg-amber/60" />
      <div className="w-1.5 h-1.5 rounded-full bg-amber/40" />
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-border-subtle" />
    </motion.div>
  );
}
