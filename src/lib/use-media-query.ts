"use client";

import { useSyncExternalStore } from "react";

/**
 * True while a CSS media query matches. Always false on the server and on
 * the first client render (so hydration matches), then follows the query.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** A desktop mouse, room for effects, and no "reduce motion" request. */
export const FANCY_POINTER = "(hover: hover) and (pointer: fine) and (min-width: 769px) and (prefers-reduced-motion: no-preference)";
