"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function injectFallbackStyle() {
  if (document.getElementById("motion-fallback-style")) return;

  const hasStuck = document.querySelectorAll('[style*="opacity"]');
  let stuck = false;
  hasStuck.forEach((el) => {
    if (parseFloat(getComputedStyle(el).opacity) < 0.1) {
      stuck = true;
    }
  });

  if (!stuck) return;

  const style = document.createElement("style");
  style.id = "motion-fallback-style";
  style.textContent = [
    '[style*="opacity: 0"], [style*="opacity:0"] {',
    "  opacity: 1 !important;",
    "  transform: none !important;",
    "  filter: none !important;",
    "  transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease !important;",
    "}",
  ].join("\n");
  document.head.appendChild(style);
}

export function MotionFallback() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(injectFallbackStyle, 3000);
    let scrollTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(injectFallbackStyle, 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
