#!/usr/bin/env node
// Measures page height (in 375x812 phone screens) and saves a full-page
// screenshot for key pages, in English and Arabic. Used for before/after
// numbers in conversion PRs.
//
//   node tools/measure-pages.mjs [--base https://studyczechia.com] [--label before] [--out measurements]
//
// Uses playwright-core with the locally installed Chrome (no browser
// download). Set CHROME_PATH to use another Chromium-based browser.
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, arg, i, all) => {
    if (arg.startsWith("--")) acc.push([arg.slice(2), all[i + 1]]);
    return acc;
  }, [])
);
const base = (args.base ?? "https://studyczechia.com").replace(/\/$/, "");
const label = args.label ?? "current";
const outDir = path.resolve(args.out ?? "measurements", label);
const PAGES = ["/", "/services/", "/courses/", "/ar/", "/ar/services/", "/ar/courses/"];
const VIEWPORT = { width: 375, height: 812 };

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("measure-pages: no Chrome found; set CHROME_PATH");
  process.exit(2);
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath });
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
const results = [];
for (const route of PAGES) {
  const page = await context.newPage();
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  // Scroll to the bottom in steps so scroll-triggered content renders, then back up.
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const file = `${route.replace(/\//g, "_").replace(/^_|_$/g, "") || "home"}.png`.replace(/^ar\.png$/, "ar_home.png");
  await page.screenshot({ path: path.join(outDir, file), fullPage: true });
  results.push({ route, height, screens: Math.round((height / VIEWPORT.height) * 10) / 10, screenshot: file });
  await page.close();
}
await browser.close();

await writeFile(path.join(outDir, "results.json"), JSON.stringify({ base, label, viewport: VIEWPORT, results }, null, 2));
console.log(`measure-pages: ${base} (${label}), 375x812`);
for (const r of results) console.log(`${r.route.padEnd(15)} ${String(r.height).padStart(6)} px  ${String(r.screens).padStart(5)} screens`);
