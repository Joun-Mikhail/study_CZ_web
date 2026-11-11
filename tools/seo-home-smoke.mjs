#!/usr/bin/env node
// Evidence capture for the EN/AR search landing pages. Does not measure rankings.
// Start dev or serve the real export separately; set SEO_BASE and SEO_OUTPUT.
import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const axe = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
const base = process.env.SEO_BASE ?? "http://localhost:3002";
const out = process.env.SEO_OUTPUT ?? "/tmp/study-seo-home";
const production = process.env.SEO_STATIC_EXPORT === "1";
assert(["localhost", "127.0.0.1"].includes(new URL(base).hostname), "Use a local preview, not the production site");
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/usr/bin/chromium", args: ["--no-sandbox"] });
const results = [];
const origin = "https://studyczechia.com";
const routes = ["/", "/ar/"];
try {
  for (const route of routes) for (const width of [375, 1280]) for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    await context.addInitScript((t) => localStorage.setItem("theme", t), theme);
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(base + route, { waitUntil: "networkidle", timeout: 90000 });
    assert.equal(response.status(), 200);
    const lang = route === "/ar/" ? "ar" : "en";
    assert.equal(await page.locator("html").getAttribute("lang"), lang);
    assert.equal(await page.locator("html").getAttribute("dir"), lang === "ar" ? "rtl" : "ltr");
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), origin + route);
    for (const [code, path] of [["en", "/"], ["ar", "/ar/"], ["x-default", "/"]]) {
      const alternate = page.locator(`link[rel="alternate"][hreflang="${code}"]`);
      assert.equal(await alternate.count(), 1);
      assert.equal(await alternate.getAttribute("href"), origin + path);
    }
    assert(!/noindex/.test(await page.locator('meta[name="robots"]').getAttribute("content") ?? ""));
    const title = await page.title();
    assert(lang === "en" ? title.startsWith("Study Czechia") : title.startsWith("الدراسة في التشيك"));
    for (const path of ["study-in-czechia-from-egypt/", "programmes/", "eligibility/", "student-visa-egypt/", "deadlines/", "services/"]) {
      assert(await page.locator(`main a[href="${route}${path}"]`).count(), `Missing contextual link ${route}${path}`);
    }
    const overview = page.locator('section[aria-labelledby="study-essentials"]');
    assert(await overview.isVisible());
    for (const path of ["programmes/", "preparatory-year/", "application-guide/", "deadlines/", "what-it-costs/", "scholarships/", "study-in-czechia-from-egypt/#egypt-timeline", "student-visa-egypt/", "about/", "contact/"]) {
      assert.equal(await overview.locator(`a[href="${route}${path}"]`).count(), 1, `Missing localized overview link ${route}${path}`);
    }
    assert.equal(await overview.locator('a[href="https://studyin.gov.cz/"]').count(), 1);
    await overview.locator("a").first().focus();
    await page.keyboard.press("Tab");
    assert(await overview.locator("a").nth(1).evaluate((a) => a === document.activeElement), "Overview links must remain keyboard reachable in document order");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    assert(!overflow, `Horizontal overflow ${route} ${width}`);
    // Trigger existing lazy imagery before recording a whole-page screenshot.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 650) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
    await page.addScriptTag({ content: axe });
    const { violations } = await page.evaluate(() => window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } }));
    const file = `${lang}-${width}-${theme}.png`;
    await page.screenshot({ path: `${out}/${file}`, fullPage: true });
    await overview.screenshot({ path: `${out}/${lang}-${width}-${theme}-overview.png` });
    const result = { route, width, theme, title, screenshot: file, errors, violations: violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target) })) };
    results.push(result);
    console.log(JSON.stringify(result));
    await overview.locator(`a[href="${route}study-in-czechia-from-egypt/#egypt-timeline"]`).click();
    await page.waitForURL(`${base}${route}study-in-czechia-from-egypt/#egypt-timeline`);
    assert(await page.locator("#egypt-timeline").isVisible(), "Timeline destination must exist in both languages");
    await context.close();
  }
  // Initial HTML must retain useful text and crawlable links without hydration.
  for (const route of routes) {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: "load", timeout: 90000 });
    assert(await page.locator("h1").isVisible());
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), origin + route);
    for (const code of ["en", "ar", "x-default"]) assert.equal(await page.locator(`link[hreflang="${code}"]`).count(), 1);
    assert(await page.locator(`main a[href="${route}study-in-czechia-from-egypt/"]`).count());
    const overview = page.locator('section[aria-labelledby="study-essentials"]');
    assert(await overview.isVisible(), "Study guidance must render without JavaScript");
    assert(await overview.locator(`a[href="${route}scholarships/"]`).count());
    assert(await overview.locator(`a[href="${route}study-in-czechia-from-egypt/#egypt-timeline"]`).count());
    // Arabic lang/dir correction without JS is performed by postbuild-ar.mjs.
    if (production) {
      assert.equal(await page.locator("html").getAttribute("lang"), route === "/" ? "en" : "ar");
      assert.equal(await page.locator("html").getAttribute("dir"), route === "/" ? "ltr" : "rtl");
    }
    console.log(`No-JS content/canonical/alternates: ${route}; static-export attributes ${production ? "checked" : "pending production build"}`);
    await context.close();
  }
} finally {
  await writeFile(`${out}/results.json`, JSON.stringify({ base, production, results }, null, 2));
  await browser.close();
}
assert(results.every((r) => !r.errors.length && !r.violations.length), "Browser/accessibility findings recorded in results.json");
console.log("Homepage checks passed. This is rendering evidence, not Google indexing or ranking evidence.");
