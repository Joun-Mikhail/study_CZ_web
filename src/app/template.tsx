"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

/** True once the first page has rendered in this browser tab. */
let appStarted = false;

/**
 * Page transitions. Next.js re-mounts a template on every navigation, so
 * each new page fades in. The very first page is left alone (no inline
 * opacity:0 in the static HTML, so nothing waits for JavaScript and the
 * largest paint isn't delayed). Opacity only: a transform here would turn
 * the fixed header into a scrolling one while the page animates.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [firstPage] = useState(() => !appStarted);

  useEffect(() => {
    appStarted = true;
  }, []);

  return (
    <motion.div
      initial={firstPage ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
