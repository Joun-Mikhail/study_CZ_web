"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plane } from "lucide-react";
import { useTranslation } from "@/i18n/context";

/**
 * "From your city to Czechia": a slowly turning 3D globe (cobe, ~6 KB) with
 * cities across the Arab world and Prague and Brno.
 *
 * Rules (phase 3 brief): the decision is made in JS before anything is
 * downloaded. Reduced motion, no WebGL or a slow device get a static image
 * and never load cobe. The globe starts only when on screen, pauses when off
 * screen or when the tab is hidden, caps the pixel ratio at 2, and is
 * decorative for screen readers (the text next to it says the same thing).
 */
const ORIGINS = [
  { en: "Cairo", ar: "القاهرة", at: [30.0444, 31.2357] },
  { en: "Alexandria", ar: "الإسكندرية", at: [31.2001, 29.9187] },
  { en: "Amman", ar: "عمّان", at: [31.9539, 35.9106] },
  { en: "Riyadh", ar: "الرياض", at: [24.7136, 46.6753] },
  { en: "Baghdad", ar: "بغداد", at: [33.3152, 44.3661] },
  { en: "Beirut", ar: "بيروت", at: [33.8938, 35.5018] },
  { en: "Casablanca", ar: "الدار البيضاء", at: [33.5731, -7.5898] },
] as const;
const DESTINATIONS = [
  { at: [50.0755, 14.4378], size: 0.1 },
  { at: [49.1951, 16.6068], size: 0.08 },
] as const;

type Mode = "pending" | "webgl" | "static";

export function JourneyGlobe() {
  const { locale } = useTranslation();
  const ar = locale === "ar";
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      webgl = !!document.createElement("canvas").getContext("webgl");
    } catch {}
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const slow = (nav.hardwareConcurrency ?? 4) < 4 || (nav.deviceMemory ?? 4) < 2 || nav.connection?.saveData === true;
    if (reduced || !webgl || slow) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- capability check, browser only
      setMode("static");
      return;
    }

    let globe: { destroy: () => void } | null = null;
    let visible = false;
    let phi = 4.3;
    let dragFrom: number | null = null;
    let dragDelta = 0;
    const el = canvas.current!;

    const onDown = (e: PointerEvent) => {
      dragFrom = e.clientX - dragDelta;
      el.style.cursor = "grabbing";
    };
    const onUp = () => {
      dragFrom = null;
      el.style.cursor = "grab";
    };
    const onMove = (e: PointerEvent) => {
      if (dragFrom !== null) dragDelta = e.clientX - dragFrom;
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);

    const io = new IntersectionObserver(
      async ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible || globe) return;
        const { default: createGlobe } = await import("cobe");
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const size = el.offsetWidth;
        globe = createGlobe(el, {
          devicePixelRatio: dpr,
          width: size * dpr,
          height: size * dpr,
          phi,
          theta: 0.32,
          dark: 0,
          diffuse: 1.2,
          mapSamples: 14000,
          mapBrightness: 5.5,
          baseColor: [0.94, 0.96, 0.99],
          markerColor: [0.78, 0.06, 0.18],
          glowColor: [0.82, 0.88, 0.97],
          markers: [
            ...ORIGINS.map((o) => ({ location: o.at as unknown as [number, number], size: 0.055 })),
            ...DESTINATIONS.map((d) => ({ location: d.at as unknown as [number, number], size: d.size })),
          ],
          onRender: (state) => {
            if (visible && dragFrom === null && document.visibilityState === "visible") phi += 0.0025;
            state.phi = phi + dragDelta / 200;
          },
        });
        setMode("webgl");
      },
      { rootMargin: "120px" }
    );
    io.observe(wrap.current!);

    return () => {
      io.disconnect();
      globe?.destroy();
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section aria-labelledby="globe-title" className="relative overflow-hidden bg-bg-subtle border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid gap-8 md:grid-cols-[1fr_1.1fr] items-center">
        <div className="reveal">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent-red mb-3">
            <Plane className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
            {ar ? "رحلتك" : "Your journey"}
          </p>
          <h2 id="globe-title" className="text-3xl sm:text-4xl text-text-primary mb-3">
            {ar ? "من مدينتك للتشيك" : "From your city to Czechia"}
          </h2>
          <p className="text-text-secondary mb-5 max-w-md">
            {ar
              ? "من أي مدينة بتبدأ، فيه جامعات تشيكية بتدرّس بالإنجليزي في براغ وبرنو و12 مدينة تانية."
              : "Wherever you start from, Czech universities teach in English in Prague, Brno and 12 more cities."}
          </p>
          <ul className="flex flex-wrap gap-2" aria-label={ar ? "مدن على الكرة" : "Cities on the globe"}>
            {ORIGINS.map((o) => (
              <li key={o.en} className="rounded-full border border-border-subtle bg-surface px-3 py-1 text-sm text-text-secondary">
                {ar ? o.ar : o.en}
              </li>
            ))}
          </ul>
        </div>
        <div ref={wrap} className="relative mx-auto w-full max-w-[300px] sm:max-w-[440px] aspect-square">
          {mode === "static" ? (
            <Image src="/images/globe-static.webp" alt="" fill sizes="(max-width: 640px) 300px, 440px" className="object-contain" />
          ) : (
            <canvas
              ref={canvas}
              aria-hidden="true"
              className="w-full h-full cursor-grab touch-pan-y transition-opacity duration-700"
              style={{ contain: "layout paint size", opacity: mode === "webgl" ? 1 : 0.6 }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
