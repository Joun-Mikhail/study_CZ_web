"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n/context";
import { IMAGES, creditedImages, type ImageId, type SiteImageEntry } from "@/data/images";
import { cn } from "@/lib/utils";

/**
 * A photo from the registry (src/data/images.ts): alt text in the page's
 * language, a blur placeholder while it loads, and lazy loading unless it's
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
}: {
  id: ImageId;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  /** Next to text that already says what it shows: empty alt. */
  decorative?: boolean;
}) {
  const { locale } = useTranslation();
  const img = IMAGES[id] as SiteImageEntry;
  return (
    <Image
      src={img.src}
      alt={decorative ? "" : img.alt[locale]}
      {...(fill ? { fill: true } : { width: img.width, height: img.height })}
      sizes={sizes}
      {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : { loading: "lazy" as const })}
      {...(img.blur ? { placeholder: "blur" as const, blurDataURL: img.blur } : {})}
      className={cn("object-cover", className)}
    />
  );
}

/** Credit lines for every Creative Commons photo, as their licences require. */
export function PhotoCredits({ className }: { className?: string }) {
  const { locale } = useTranslation();
  const ar = locale === "ar";
  return (
    <section className={cn("text-xs text-text-muted", className)} aria-labelledby="photo-credits">
      <h2 id="photo-credits" className="font-sans text-sm font-semibold text-text-secondary mb-2">
        {ar ? "مصادر الصور" : "Photo credits"}
      </h2>
      <p className="mb-2">
        {ar
          ? "صور المدن من ويكيميديا كومنز، مع ذكر المصوّر والرخصة. باقي الصور من Unsplash وPexels (رخصة مجانية)."
          : "City photos are from Wikimedia Commons, credited below with their licences. Other photos are from Unsplash and Pexels (free licence)."}
      </p>
      <ul className="space-y-1">
        {creditedImages().map((img) => (
          <li key={img.id}>
            <a href={img.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand">
              {img.alt[locale]}
            </a>
            {" · "}
            {img.credit}
            {" · "}
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
