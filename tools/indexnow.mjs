// IndexNow: tell Bing, Seznam, Yandex and the other IndexNow engines which
// pages changed, instead of waiting for them to recrawl. Bing's index also
// feeds ChatGPT search and Copilot. The key file is public/<KEY>.txt.
//
//   node tools/indexnow.mjs --from-build   end of `npm run build`: production
//                                          deploys only; pages that are new or
//                                          changed compared with the live sitemap
//                                          (falls back to "changed in 3 days")
//   node tools/indexnow.mjs --all          every page in the sitemap (one-off)
//   node tools/indexnow.mjs --dry-run ...  print the list, send nothing
//
// It never fails the build: any problem is logged and the exit code stays 0.
import { readFileSync } from "node:fs";

export const KEY = "7003e425e79494c8eb708eb7b2491504";
const HOST = "studyczechia.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";
/** Pages whose sitemap lastmod (last git change of their sources) is this recent count as changed. */
const CHANGED_WITHIN_DAYS = 3;

/** [{ url, lastmod }] from the built sitemap. */
export function sitemapEntries(xml) {
  return xml
    .split("<url>")
    .slice(1)
    .map((block) => ({
      url: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
      lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
    }))
    .filter((e) => e.url);
}

export function changedSince(entries, sinceMs) {
  return entries.filter((e) => e.lastmod && Date.parse(e.lastmod) >= sinceMs).map((e) => e.url);
}

/** Pages that are new, or whose lastmod differs, compared with the sitemap that is live now. */
export function changedFrom(entries, liveEntries) {
  const live = new Map(liveEntries.map((e) => [e.url, e.lastmod]));
  return entries.filter((e) => !live.has(e.url) || live.get(e.url) !== e.lastmod).map((e) => e.url);
}

/** The sitemap still live (the build runs before the new deploy is published), or null. */
async function liveEntries() {
  try {
    const res = await fetch(`https://${HOST}/sitemap.xml`, { signal: AbortSignal.timeout(15_000) });
    return res.ok ? sitemapEntries(await res.text()) : null;
  } catch {
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  if (args.includes("--from-build") && process.env.CONTEXT !== "production") {
    console.log(`indexnow: skipped (Netlify context: ${process.env.CONTEXT ?? "none, local build"})`);
    return;
  }
  const entries = sitemapEntries(readFileSync("out/sitemap.xml", "utf8"));
  let urls;
  if (args.includes("--all")) {
    urls = entries.map((e) => e.url);
  } else {
    const live = await liveEntries();
    urls = live ? changedFrom(entries, live) : changedSince(entries, Date.now() - CHANGED_WITHIN_DAYS * 86_400_000);
  }
  if (urls.length === 0) {
    console.log("indexnow: no recently changed pages to submit");
    return;
  }
  if (dryRun) {
    console.log(`indexnow: would submit ${urls.length} URLs:\n${urls.join("\n")}`);
    return;
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10_000) }),
  });
  // 200 and 202 both mean accepted; 422 usually means the key file isn't live yet.
  console.log(`indexnow: submitted ${urls.length} URLs, HTTP ${res.status} ${res.statusText}`);
}

const isCli = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop());
if (isCli) {
  main().catch((err) => console.log(`indexnow: not sent (${err.message})`));
}
