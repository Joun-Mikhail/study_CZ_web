"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n/context";
import { IMAGES, creditedImages, type ImageId, type SiteImageEntry } from "@/data/images";
import { cn } from "@/lib/utils";

/**
 * A photo from the registry (src/data/images.ts): alt text in the page's
 * language, its dominant colour while it loads, and lazy loading unless it's
 * the page's main image (`priority`). Always pass `sizes` for the real
 * rendered width so phones get a small file from the image CDN.
 */
export function SiteImage({
  id,
  sizes,
  priority,
  fill = true,
  className,
  decorative,
  whenNear,
}: {
  id: ImageId;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  /** Next to text that already says what it shows: empty alt. */
  decorative?: boolean;
  /**
   * Don't request the photo until it's within about a screen of the viewport.
   * On slow connections Chrome starts native lazy images ~2,500 px early,
   * which competes with the page's main image; use this for rows of photos
   * below the fold (fill mode only).
   */
  whenNear?: boolean;
}) {
  const { locale } = useTranslation();
  const img = IMAGES[id] as SiteImageEntry;
  const near = useNear(whenNear && fill);
  if (!near.ready) {
    return <span ref={near.ref} aria-hidden="true" className={cn("absolute inset-0", className)} style={{ backgroundColor: img.color }} />;
  }
  return (
    <Image
      src={img.src}
      alt={decorative ? "" : img.alt[locale]}
      {...(fill ? { fill: true } : { width: img.width, height: img.height })}
      sizes={sizes}
      {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : { loading: "lazy" as const, fetchPriority: "low" as const })}
      style={{ backgroundColor: img.color }}
      className={cn("object-cover", className)}
    />
  );
}

function useNear(enabled: boolean | undefined) {
  const ref = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(!enabled);
  useEffect(() => {
    if (near || !ref.current) return;
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- very old browsers: just load it
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "800px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [near]);
  return { ref, ready: near };
}

/** Credit lines for every Creative Commons photo, as their licences require. */
export function PhotoCredits({ className }: { className?: string }) {
  const { locale } = useTranslation();
  const ar = locale === "ar";
  return (
    <section className={cn("text-xs text-text-muted", className)} aria-labelledby="photo-credits">
      <h2 id="photo-credits" className="font-sans text-sm font-semibold text-text-secondary mb-2">
        {ar ? "Ù…ØµØ§Ø¯Ø± Ø§Ù„ØµÙˆØ±" : "Photo credits"}
      </h2>
      <p className="mb-2">
        {ar
          ? "ØµÙˆØ± Ø§Ù„Ù…Ø¯Ù† Ù…Ù† ÙˆÙŠÙƒÙŠÙ…ÙŠØ¯ÙŠØ§ ÙƒÙˆÙ…Ù†Ø²ØŒ Ù…Ø¹ Ø°ÙƒØ± Ø§Ù„Ù…ØµÙˆÙ‘Ø± ÙˆØ§Ù„Ø±Ø®ØµØ©. Ø¨Ø§Ù‚ÙŠ Ø§Ù„ØµÙˆØ± Ù…Ù† Unsplash ÙˆPexels (Ø±Ø®ØµØ© Ù…Ø¬Ø§Ù†ÙŠØ©)."
          : "City photos are from Wikimedia Commons, credited below with their licences. Other photos are from Unsplash and Pexels (free licence)."}
      </p>
      <ul className="space-y-1">
        {creditedImages().map((img) => (
          <li key={img.id}>
            <a href={img.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand">
              {img.alt[locale]}
            </a>
            {" Â· "}
            {img.credit}
            {" Â· "}
            {img.licenseUrl ? (
              <a href={img.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline underline-offset-2 hover:text-brand">
                {img.license}
              </a>
            ) : (
              img.license
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
