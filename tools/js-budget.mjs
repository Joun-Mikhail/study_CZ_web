#!/usr/bin/env node
// Homepage JavaScript budget: the gzipped size of every <script src> the
// homepage HTML loads (EN and AR), straight from out/. Deterministic, unlike
// Lighthouse's network total, which also counts the route chunks Next.js
// prefetches for links in view (that varies run to run).
//
//   npm run build && node tools/js-budget.mjs
import { readFileSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

// Baseline on main, 12 October 2026, plus the brief's +30 KB allowance.
const BASELINE_KB = 264;
const BUDGET_KB = BASELINE_KB + 30;

let failed = false;
for (const page of ["index.html", "ar/index.html"]) {
  const html = readFileSync(path.join("out", page), "utf8");
  const srcs = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]))].filter((s) => s.startsWith("/"));
  const bytes = srcs.reduce((sum, src) => sum + gzipSync(readFileSync(path.join("out", src.split("?")[0]))).length, 0);
  const kb = Math.round(bytes / 1024);
  const ok = kb <= BUDGET_KB;
  failed ||= !ok;
  console.log(`${ok ? "✓" : "✗"} /${page.replace("index.html", "")}: ${srcs.length} scripts, ${kb} KB gzipped (budget ${BUDGET_KB} KB)`);
}
process.exit(failed ? 1 : 0);
