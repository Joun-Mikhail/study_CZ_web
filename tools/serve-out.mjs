#!/usr/bin/env node
// Serves the static export (out/) the way Netlify does, for Lighthouse CI and
// the accessibility check: trailing-slash directories, 404.html, and the
// image CDN. Images go through /.netlify/images?url=…&w=…&q=… (see
// src/lib/image-loader.ts); here sharp resizes them to that width as WebP, so
// page weight and LCP are close to production instead of full-size JPGs.
//
//   node tools/serve-out.mjs [port]      (default 4173)
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
import sharp from "sharp";

const ROOT = path.resolve("out");
const PORT = Number(process.argv[2] ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".woff2": "font/woff2", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml", ".webmanifest": "application/manifest+json",
};
const imageCache = new Map();

async function fileFor(urlPath) {
  const p = path.join(ROOT, decodeURIComponent(urlPath));
  if (!p.startsWith(ROOT)) return null;
  try {
    const s = await stat(p);
    if (s.isDirectory()) return path.join(p, "index.html");
    return p;
  } catch {
    // Next.js link prefetches ask for "__next.a.b.__PAGE__.txt"; the export
    // writes "__next.a/b/__PAGE__.txt". Netlify maps one to the other.
    const base = path.basename(p);
    if (base.startsWith("__next.") && base.endsWith(".txt")) {
      const parts = base.slice("__next.".length, -".txt".length).split(".");
      const nested = path.join(path.dirname(p), `__next.${parts[0]}`, ...parts.slice(1)) + ".txt";
      try {
        await stat(nested);
        return nested;
      } catch {}
    }
    return null;
  }
}

async function image(url) {
  const src = url.searchParams.get("url") ?? "";
  const w = Math.min(Number(url.searchParams.get("w")) || 1080, 3840);
  const q = Math.min(Number(url.searchParams.get("q")) || 70, 100);
  const key = `${src}|${w}|${q}`;
  if (!imageCache.has(key)) {
    const file = await fileFor(src);
    if (!file) return null;
    imageCache.set(key, await sharp(await readFile(file)).resize({ width: w, withoutEnlargement: true }).webp({ quality: q }).toBuffer());
  }
  return imageCache.get(key);
}

http
  .createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
    try {
      if (url.pathname === "/.netlify/images") {
        const body = await image(url);
        if (!body) return res.writeHead(404).end();
        res.writeHead(200, { "content-type": "image/webp", "cache-control": "public, max-age=31536000" });
        return res.end(body);
      }
      const file = await fileFor(url.pathname);
      if (!file) {
        res.writeHead(404, { "content-type": TYPES[".html"] });
        return res.end(await readFile(path.join(ROOT, "404.html")).catch(() => "Not found"));
      }
      let body = await readFile(file);
      const type = TYPES[path.extname(file)] ?? "application/octet-stream";
      const headers = {
        "content-type": type,
        "cache-control": url.pathname.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate",
      };
      // Netlify compresses text; Lighthouse sizes and simulated timings depend on it.
      if (/text|javascript|json|svg|xml/.test(type) && /gzip/.test(req.headers["accept-encoding"] ?? "")) {
        body = gzipSync(body);
        headers["content-encoding"] = "gzip";
      }
      res.writeHead(200, headers);
      res.end(body);
    } catch (err) {
      res.writeHead(500).end(String(err));
    }
  })
  .listen(PORT, () => console.log(`serving out/ on http://localhost:${PORT}`));
