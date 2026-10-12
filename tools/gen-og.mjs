#!/usr/bin/env node
// Draws a 1200×630 share card (the picture WhatsApp, Facebook and X show
// with a link) for every public page, in English and Arabic, from the page's
// own title and description in out/. Run after `npm run build`:
//
//   npm run build && npm run gen:og [-- --force]
//
// Only cards whose text changed are drawn again. Commit public/og/ afterwards.
// Uses playwright-core with the locally installed Chrome, because the
// built-in next/og renderer gets Arabic word order wrong when a line mixes
// Arabic with numbers. Set CHROME_PATH to use another Chromium-based browser.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright-core";
import { OUT, OG_DIR, MANIFEST, listPages, htmlFile, cardName, cardText, cardHash } from "./og-shared.mjs";
import { rewriteShareImages } from "./postbuild-og.mjs";

const force = process.argv.includes("--force");
const PUBLIC_OG = join("public", OG_DIR);

if (!existsSync(OUT)) {
  console.error("gen-og: no out/ directory. Run `npm run build` first.");
  process.exit(1);
}

const CHROME = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => p && existsSync(p));
if (!CHROME) {
  console.error("gen-og: Chrome not found. Set CHROME_PATH.");
  process.exit(1);
}

const TEMPLATE = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Tajawal:wght@500;700;800&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #fff; }
  #card { position: relative; width: 1200px; height: 630px; padding: 70px 80px 56px; display: flex; flex-direction: column; background: #fff; font-family: "Plus Jakarta Sans", sans-serif; color: #0f172a; overflow: hidden; }
  #card.ar { font-family: "Tajawal", sans-serif; }
  .flag { position: absolute; inset: 0 0 auto 0; height: 14px; display: flex; direction: ltr; }
  .flag i { flex: 1; } .flag .b { background: #11457e; } .flag .r { background: #d42127; }
  .logo { align-self: flex-start; font-family: "Plus Jakarta Sans", sans-serif; font-weight: 800; font-size: 34px; letter-spacing: -0.5px; direction: ltr; }
  .logo .s { color: #11457e; } .logo .c { color: #d42127; }
  main { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 18px; }
  #kicker { font-weight: 700; font-size: 28px; color: #11457e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  #title { font-weight: 800; line-height: 1.12; letter-spacing: -1px; color: #0f172a; }
  .ar #title { letter-spacing: 0; line-height: 1.3; }
  #desc { font-weight: 500; font-size: 28px; line-height: 1.4; color: #475569; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .ar #desc { line-height: 1.55; }
  footer { display: flex; align-items: center; justify-content: space-between; font-weight: 700; font-size: 24px; color: #64748b; }
  footer .url { direction: ltr; }
</style></head>
<body><div id="card">
  <div class="flag"><i class="b"></i><i class="r"></i></div>
  <div class="logo"><span class="s">Study</span> <span class="c">Czechia</span></div>
  <main><div id="kicker"></div><div id="title"></div><div id="desc"></div></main>
  <footer><span id="tag"></span><span class="url">studyczechia.com</span></footer>
</div></body></html>`;

const TAGLINE = { en: "Free guides and tools for studying in Czechia", ar: "أدلة وأدوات مجانية للدراسة في التشيك" };

function render({ text, tagline }) {
  const card = document.getElementById("card");
  card.className = text.ar ? "ar" : "";
  card.dir = text.ar ? "rtl" : "ltr";
  const kicker = document.getElementById("kicker");
  kicker.textContent = text.kicker;
  kicker.style.display = text.kicker ? "" : "none";
  document.getElementById("desc").textContent = text.description;
  document.getElementById("tag").textContent = tagline;
  // Largest title size that fits the space left by the other lines.
  const title = document.getElementById("title");
  title.textContent = text.title;
  const room = (text.description ? 270 : 360) + (text.kicker ? 0 : 50);
  for (let size = 76; size >= 40; size -= 2) {
    title.style.fontSize = `${size}px`;
    if (title.scrollHeight <= room) break;
  }
}

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
const pages = listPages();
mkdirSync(PUBLIC_OG, { recursive: true });

const todo = [];
const next = {};
for (const path of pages) {
  const text = cardText(path, readFileSync(htmlFile(path), "utf8"));
  const hash = cardHash(text);
  next[path] = hash;
  if (force || manifest[path] !== hash || !existsSync(join(PUBLIC_OG, cardName(path)))) todo.push({ path, text });
}

if (todo.length) {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(TEMPLATE, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.load('800 40px "Plus Jakarta Sans"');
    await document.fonts.load('800 40px "Tajawal"');
    await document.fonts.load('500 40px "Tajawal"');
    await document.fonts.ready;
  });
  for (const [i, { path, text }] of todo.entries()) {
    await page.evaluate(render, { text, tagline: text.ar ? TAGLINE.ar : TAGLINE.en });
    await page.locator("#card").screenshot({ path: join(PUBLIC_OG, cardName(path)), type: "jpeg", quality: 62 });
    if ((i + 1) % 50 === 0) console.log(`gen-og: ${i + 1}/${todo.length}`);
  }
  await browser.close();
}

// Drop cards for pages that no longer exist.
const keep = new Set(Object.keys(next).map(cardName));
let removed = 0;
for (const name of readdirSync(PUBLIC_OG)) {
  if (name.endsWith(".jpg") && !keep.has(name)) {
    rmSync(join(PUBLIC_OG, name));
    removed++;
  }
}
writeFileSync(MANIFEST, JSON.stringify(next, null, 2) + "\n");

// Make the cards live in the current out/ without another build.
mkdirSync(join(OUT, OG_DIR), { recursive: true });
for (const name of readdirSync(PUBLIC_OG)) copyFileSync(join(PUBLIC_OG, name), join(OUT, OG_DIR, name));
const { pointed, stale } = rewriteShareImages();
console.log(`gen-og: drew ${todo.length} cards, removed ${removed}, ${pages.length} pages point at a card (${pointed} updated, ${stale} out of date)`);
