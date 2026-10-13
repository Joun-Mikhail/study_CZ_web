#!/usr/bin/env node
// Accessibility check for CI: runs axe-core (WCAG 2.1 A and AA) on key pages,
// in English and Arabic, light and dark theme, against the static export.
// Exits 1 on any violation, so a pull request can't make the site less
// accessible. #54 brought these pages to zero issues; keep them there.
//
//   npm run build && node tools/a11y-check.mjs
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const AXE = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const PORT = 4174;
const PAGES = [
  "/", "/services/", "/courses/", "/eligibility/", "/university-matcher/", "/cost-of-living/", "/deadlines/",
  "/application-guide/", "/my-journey/", "/for-parents/", "/recognition/egypt/", "/stage/documents/",
  "/programmes/vse-bba-intl-business/", "/why-czechia/", "/about/",
];
const CHROME = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean).find((p) => existsSync(p));
if (!CHROME) {
  console.error("a11y-check: no Chrome found; set CHROME_PATH");
  process.exit(2);
}

const server = spawn(process.execPath, ["tools/serve-out.mjs", String(PORT)], { stdio: ["ignore", "pipe", "inherit"] });
await new Promise((resolve) => server.stdout.on("data", (d) => String(d).includes("serving") && resolve()));

const browser = await chromium.launch({ executablePath: CHROME });
let failures = 0;
for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });
  await context.addInitScript((t) => {
    try { localStorage.setItem("theme", t); } catch {}
  }, theme);
  for (const route of PAGES.flatMap((p) => [p, `/ar${p === "/" ? "/" : p}`])) {
    const page = await context.newPage();
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle" });
    await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
    await page.addScriptTag({ content: AXE });
    const { violations } = await page.evaluate(() =>
      window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } })
    );
    if (violations.length) {
      failures += violations.length;
      for (const v of violations) {
        console.log(`✗ ${theme} ${route}: ${v.id} (${v.impact}) ${v.help}`);
        for (const n of v.nodes.slice(0, 3)) console.log(`    ${n.target.join(" ")}`);
      }
    } else {
      console.log(`✓ ${theme} ${route}`);
    }
    await page.close();
  }
  await context.close();
}
// The help sheet only exists once opened: audit it open, in both languages.
for (const route of ["/stage/documents/", "/ar/stage/documents/"]) {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle" });
  await page.locator("a[aria-haspopup=dialog]").first().click();
  await page.waitForSelector("dialog[open]");
  // Audit the sheet at rest: it fades in from 0.6 opacity, and measuring
  // mid-animation reported false contrast failures about half the time.
  await page.evaluate(() =>
    Promise.all(document.querySelector("dialog[open]").getAnimations({ subtree: true }).map((a) => a.finished))
  );
  await page.addScriptTag({ content: AXE });
  const { violations } = await page.evaluate(() =>
    window.axe.run(document.querySelector("dialog[open]"), { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } })
  );
  failures += violations.length;
  for (const v of violations) console.log(`✗ help sheet ${route}: ${v.id} (${v.impact}) ${v.help}`);
  if (!violations.length) console.log(`✓ help sheet ${route}`);
  await page.close();
}

await browser.close();
server.kill();
console.log(failures ? `a11y-check: ${failures} violation(s)` : "a11y-check: no violations");
process.exit(failures ? 1 : 0);
