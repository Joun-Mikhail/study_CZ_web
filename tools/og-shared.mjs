// Shared by gen-og.mjs (draws the share cards) and postbuild-og.mjs (points
// each page's og:image at its card). Both read the built pages in out/.
import { createHash } from "node:crypto";
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

/** Bump when the card design changes, so every card is drawn again. */
export const TEMPLATE_VERSION = 1;

export const OUT = "out";
export const OG_DIR = "og";
export const MANIFEST = join("public", OG_DIR, "manifest.json");

/** Pages that never get a card: private, utility or legal pages. */
const SKIP = [/^\/(ar\/)?courses\/learn\//, /^\/(ar\/)?admin\//, /^\/(ar\/)?thanks\//, /^\/(ar\/)?404\//, /_not-found/, /^\/(ar\/)?verify\/not-found\//, /^\/(ar\/)?(privacy|terms|search)\//];

/** Every built page as a URL path ("/", "/ar/services/", …). */
export function listPages() {
  const pages = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) {
        if (name !== "_next" && name !== OG_DIR) walk(full);
      } else if (name === "index.html") {
        const rel = relative(OUT, dir).split(sep).join("/");
        pages.push(rel ? `/${rel}/` : "/");
      }
    }
  };
  walk(OUT);
  return pages.filter((p) => !SKIP.some((re) => re.test(p))).sort();
}

export function htmlFile(path) {
  return join(OUT, ...path.split("/").filter(Boolean), "index.html");
}

/** "/" → "home.jpg", "/ar/programmes/x/" → "ar--programmes--x.jpg" */
export function cardName(path) {
  const slug = path.split("/").filter(Boolean).join("--");
  return `${slug || "home"}.jpg`;
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** What a page's card says, taken from its own <title> and description. */
export function cardText(path, html) {
  const ar = path === "/ar/" || path.startsWith("/ar/");
  const rawTitle = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "Study Czechia");
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const parts = rawTitle
    .split(" | ")
    .map((s) => s.trim())
    .filter((s) => s && s !== "Study Czechia");
  let title = parts[0] ?? "Study Czechia";
  let kicker = parts.slice(1).join(" · ");
  // The home pages are titled "Study Czechia: …".
  if (title.startsWith("Study Czechia: ")) title = title.slice("Study Czechia: ".length);
  return { ar, title, kicker, description };
}

export function cardHash(text) {
  return createHash("sha1")
    .update(JSON.stringify([TEMPLATE_VERSION, text.ar, text.title, text.kicker, text.description]))
    .digest("hex")
    .slice(0, 16);
}
