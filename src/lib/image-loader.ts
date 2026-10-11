// next/image loader for the static export: images are resized and converted
// to WebP/AVIF on the fly by Netlify Image CDN, so phones download a small
// version instead of the full-size JPG.
export default function netlifyImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (process.env.NODE_ENV === "development") return src;
  if (src.startsWith("data:") || src.endsWith(".svg")) return src;
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 70}`;
}
