#!/usr/bin/env node
// After `next build`: point each page's og:image and twitter:image at its own
// share card in out/og/ (drawn by gen-og.mjs), if the card is up to date.
// Pages without a card, or whose title or description changed since the card
// was drawn, keep the default /og-image.jpg.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { OUT, OG_DIR, MANIFEST, listPages, htmlFile, cardName, cardText, cardHash } from "./og-shared.mjs";

export function rewriteShareImages() {
  const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
  let pointed = 0;
  let stale = 0;
  for (const path of listPages()) {
    const file = htmlFile(path);
    const html = readFileSync(file, "utf8");
    const card = join(OUT, OG_DIR, cardName(path));
    if (!manifest[path] || !existsSync(card)) continue;
    const text = cardText(path, html);
    if (manifest[path] !== cardHash(text)) {
      stale++;
      continue;
    }
    const alt = text.title.replace(/"/g, "&quot;");
    const next = html
      .replace(/(<meta (?:property="og:image"|name="twitter:image") content="[^"]*?)\/og-image\.jpg"/g, `$1/${OG_DIR}/${cardName(path)}"`)
      .replace(/<meta property="og:image:alt" content="Study Czechia"\/>/, `<meta property="og:image:alt" content="${alt}"/>`);
    if (next !== html) {
      writeFileSync(file, next);
      pointed++;
    }
  }
  return { pointed, stale };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!existsSync(OUT)) {
    console.log("postbuild-og: no out/ directory, skipping");
    process.exit(0);
  }
  const { pointed, stale } = rewriteShareImages();
  console.log(`postbuild-og: ${pointed} pages use their own share card`);
  if (stale) console.log(`postbuild-og: ${stale} cards are out of date (title or description changed); those pages use the default image until \`npm run gen:og\` is run`);
}
