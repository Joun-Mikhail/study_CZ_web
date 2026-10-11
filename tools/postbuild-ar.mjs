#!/usr/bin/env node
// After `next build` (static export): mark every page under out/ar/ as Arabic,
// right-to-left, in the HTML itself — the root layout is shared by both
// languages, so it can only write lang="en" at build time.
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join("out", "ar");
if (!existsSync(ROOT)) {
  console.log("postbuild-ar: no out/ar directory, skipping");
  process.exit(0);
}

let changed = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".html")) {
      const html = readFileSync(full, "utf8");
      const next = html.replace(/<html lang="en" dir="ltr"/, '<html lang="ar" dir="rtl"');
      if (next !== html) {
        writeFileSync(full, next);
        changed++;
      }
    }
  }
}
walk(ROOT);
console.log(`postbuild-ar: set lang="ar" dir="rtl" on ${changed} pages`);
