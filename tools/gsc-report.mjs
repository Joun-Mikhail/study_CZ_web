#!/usr/bin/env node
// Weekly search report from a Google Search Console export. No API key needed.
//
//   1. Search Console → Performance → Search results. Set the date range
//      (last 28 days) and, for the main report, Country = Egypt.
//   2. Export → Download CSV, and unzip it (Queries.csv, Pages.csv, ...).
//   3. node tools/gsc-report.mjs path/to/unzipped-folder --label egypt
//
// Prints where the tracked keywords stand, the queries closest to page one,
// and brand versus non-brand clicks. With --log it also appends one dated row
// per tracked keyword to .seo/rank-log.csv (git-ignored: search data is
// business data and this repository is public).
//
// "Position" is Search Console's average over every impression in the range,
// across devices and places. It is not a fixed rank: read the trend, not the
// number.
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

/** The queries the site is trying to win, in the order they matter. */
export const TRACKED = [
  "study czechia",
  "study in czechia",
  "study in czech republic",
  "study czech republic",
  "czech universities for international students",
  "study in czechia from egypt",
  "study medicine in czech republic",
  "الدراسة في التشيك",
  "الدراسة في التشيك للمصريين",
  "الدراسة في جمهورية التشيك",
  "جامعات التشيك",
  "الدراسة في التشيك مجانا",
  "تكاليف الدراسة في التشيك",
  "شروط الدراسة في التشيك",
  "فيزا الدراسة في التشيك",
];

const BRAND = /study\s?czechia|studyczechia/i;

/** Minimal CSV reader: quoted fields, doubled quotes, commas inside quotes. */
export function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/** Rows of a Search Console export as { key, clicks, impressions, ctr, position }. */
export function readExport(text) {
  const [, ...rows] = parseCsv(text);
  return rows.map(([key, clicks, impressions, ctr, position]) => ({
    key,
    clicks: Number(clicks) || 0,
    impressions: Number(impressions) || 0,
    ctr: parseFloat(ctr) || 0,
    position: Number(position) || 0,
  }));
}

const norm = (s) => s.toLowerCase().replace(/[ً-ْ]/g, "").replace(/[أإآ]/g, "ا").replace(/\s+/g, " ").trim();

export function summarize(queries) {
  const byKey = new Map(queries.map((q) => [norm(q.key), q]));
  const tracked = TRACKED.map((k) => ({ keyword: k, ...(byKey.get(norm(k)) || { clicks: 0, impressions: 0, ctr: 0, position: null }) }));
  // Queries Google already shows us for, just off page one: the cheapest wins.
  const nearMisses = queries
    .filter((q) => q.position > 8 && q.position <= 20 && q.impressions >= 5)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);
  const sum = (rows, f) => rows.reduce((n, r) => n + r[f], 0);
  const brand = queries.filter((q) => BRAND.test(q.key));
  const nonBrand = queries.filter((q) => !BRAND.test(q.key));
  // Arabic-script queries are the Arabic audience, whatever country they search from.
  const arabic = queries.filter((q) => /[\u0600-\u06FF]/.test(q.key));
  const totals = (rows) => {
    const impressions = sum(rows, "impressions");
    const clicks = sum(rows, "clicks");
    return { clicks, impressions, ctr: impressions ? Math.round((clicks / impressions) * 1000) / 10 : 0 };
  };
  return {
    arabic: totals(arabic),
    other: totals(queries.filter((q) => !/[\u0600-\u06FF]/.test(q.key))),
    tracked,
    nearMisses,
    brand: { clicks: sum(brand, "clicks"), impressions: sum(brand, "impressions") },
    nonBrand: { clicks: sum(nonBrand, "clicks"), impressions: sum(nonBrand, "impressions") },
  };
}

function main() {
  const args = process.argv.slice(2);
  const dir = args.find((a) => !a.startsWith("--"));
  const flag = (name) => { const i = args.indexOf(name); return i === -1 ? null : args[i + 1]; };
  if (!dir) {
    console.error("Usage: node tools/gsc-report.mjs <unzipped-export-folder> [--label egypt] [--log]");
    process.exit(2);
  }
  const read = (name) => (existsSync(join(dir, name)) ? readExport(readFileSync(join(dir, name), "utf8")) : null);
  const queries = read("Queries.csv");
  if (!queries) { console.error(`No Queries.csv in ${dir}`); process.exit(2); }
  const label = flag("--label") || "all";
  const s = summarize(queries);
  const pos = (p) => (p ? p.toFixed(1) : "–");

  console.log(`\nTracked keywords (${label})`);
  console.log("pos     impr  clicks    ctr  keyword");
  for (const t of s.tracked) console.log(`${pos(t.position).padStart(5)} ${String(t.impressions).padStart(6)} ${String(t.clicks).padStart(7)} ${(t.impressions ? `${t.ctr}%` : "–").padStart(6)}  ${t.keyword}`);
  console.log("\n'–' means no impressions in this export: Google did not show the site for that exact query.");

  console.log("\nClosest to page one (position 8–20, by impressions)");
  for (const q of s.nearMisses) console.log(`${pos(q.position).padStart(5)} ${String(q.impressions).padStart(6)} ${String(q.clicks).padStart(7)}  ${q.key}`);
  if (!s.nearMisses.length) console.log("  none yet");

  console.log(`\nBrand queries:     ${s.brand.clicks} clicks, ${s.brand.impressions} impressions`);
  console.log(`Non-brand queries: ${s.nonBrand.clicks} clicks, ${s.nonBrand.impressions} impressions`);
  console.log(`Arabic queries:    ${s.arabic.clicks} clicks, ${s.arabic.impressions} impressions, ${s.arabic.ctr}% CTR`);
  console.log(`Other queries:     ${s.other.clicks} clicks, ${s.other.impressions} impressions, ${s.other.ctr}% CTR`);

  for (const [file, title] of [["Countries.csv", "Top countries"], ["Devices.csv", "Devices"], ["Pages.csv", "Top pages"]]) {
    const rows = read(file);
    if (!rows) continue;
    console.log(`\n${title}`);
    for (const r of rows.sort((a, b) => b.impressions - a.impressions).slice(0, 8)) console.log(`${pos(r.position).padStart(5)} ${String(r.impressions).padStart(6)} ${String(r.clicks).padStart(7)}  ${r.key}`);
  }

  if (args.includes("--log")) {
    mkdirSync(".seo", { recursive: true });
    const log = ".seo/rank-log.csv";
    if (!existsSync(log)) appendFileSync(log, "date,label,keyword,position,impressions,clicks\n");
    const date = new Date().toISOString().slice(0, 10);
    for (const t of s.tracked) appendFileSync(log, `${date},${label},"${t.keyword}",${t.position ?? ""},${t.impressions},${t.clicks}\n`);
    console.log(`\nLogged ${s.tracked.length} rows to ${log}`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
