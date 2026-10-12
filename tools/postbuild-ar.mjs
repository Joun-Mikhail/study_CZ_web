#!/usr/bin/env node
// After `next build` (static export): mark every page under out/ar/ as Arabic,
// right-to-left, in the HTML itself — the root layout is shared by both
// languages, so it can only write lang="en" at build time.
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, posix, sep } from "node:path";

const ROOT = join("out", "ar");
if (!existsSync(ROOT)) {
  console.log("postbuild-ar: no out/ar directory, skipping");
  process.exit(0);
}

// The Lalezar file name is hashed: read it from the built CSS.
function lalezarFont() {
  const cssDir = join("out", "_next", "static");
  const files = [];
  const collect = (d) => {
    for (const name of readdirSync(d)) {
      const full = join(d, name);
      if (statSync(full).isDirectory()) collect(full);
      else if (name.endsWith(".css")) files.push(full);
    }
  };
  collect(cssDir);
  for (const file of files) {
    const css = readFileSync(file, "utf8");
    for (const block of css.split("@font-face").slice(1)) {
      if (!/font-family:\s*["']?Lalezar["']?\s*[;}]/.test(block)) continue;
      const url = /url\(\s*["']?([^)"']+\.woff2)["']?\s*\)/.exec(block)?.[1];
      // next/font writes it relative to the CSS file (../media/…).
      if (url) return url.startsWith("/") ? url : "/" + posix.relative("out", posix.join(dirname(file).split(sep).join("/"), url));
    }
  }
  return null;
}
const FONT = lalezarFont();
const PRELOAD = FONT ? `<link rel="preload" href="${FONT}" as="font" type="font/woff2" crossorigin=""/>` : "";

let changed = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".html")) {
      const html = readFileSync(full, "utf8");
      let next = html.replace(/<html lang="en" dir="ltr"/, '<html lang="ar" dir="rtl"');
      if (PRELOAD && !next.includes(PRELOAD)) next = next.replace("<head>", `<head>${PRELOAD}`);
      if (next !== html) {
        writeFileSync(full, next);
        changed++;
      }
    }
  }
}
walk(ROOT);
console.log(`postbuild-ar: set lang="ar" dir="rtl" on ${changed} pages${FONT ? `, preloading ${FONT}` : ", Lalezar not found"}`);
