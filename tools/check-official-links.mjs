#!/usr/bin/env node
// Checks that the official pages the site links to still open.
//
//   node tools/check-official-links.mjs            # government and official-portal links
//   node tools/check-official-links.mjs --all      # every external https link in src/data and src/app
//
// Why: the official Study in Czechia portal moved from studyin.cz to
// studyin.gov.cz and many of its old addresses now end in "page not found".
// A guide that sends students to dead official pages loses their trust.
//
// A link is only called BROKEN when the server clearly says the page is gone
// (404 or 410), on two attempts. Everything else is reported separately and
// never fails the run, because it does not prove the page is dead:
//   blocked      401/403/429/451: the site refuses automated requests or is
//                rate limiting. Open it in a browser.
//   unreachable  timeouts, network errors and 5xx: try again later.
//   moved        opens, but ends on a different host or on a site's home
//                page. Check the page still says what we cite it for.
// Exit code: 1 if anything is BROKEN, otherwise 0.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOTS = ["src/data", "src/app", "src/components", "public/llms.txt"];
const OFFICIAL = /^https:\/\/([a-z0-9-]+\.)*(gov\.cz|mzv\.cz|msmt\.cz|mvcr\.cz|dzs\.cz|studyin\.cz)\//i;

const host = (u) => new URL(u).hostname.replace(/^www\./, "");
const isRoot = (u) => new URL(u).pathname.replace(/\/+$/, "") === "";

/** What an HTTP outcome says about a link. `status` 0 means no response. */
export function classify(url, status, finalUrl) {
  if (status === 404 || status === 410) return "broken";
  if ([401, 403, 429, 451].includes(status)) return "blocked";
  if (status === 0 || status >= 500) return "unreachable";
  if (status >= 400) return "blocked"; // other 4xx (405, 406...): the server answered, the page may exist
  if (finalUrl && finalUrl !== url) {
    // A deep link that lands on a home page is a soft 404; another host may be an archive.
    if (host(finalUrl) !== host(url) || (isRoot(finalUrl) && !isRoot(url))) return "moved";
  }
  return "ok";
}

function files(path, out = []) {
  if (statSync(path).isFile()) return out.concat(path);
  for (const name of readdirSync(path)) {
    const full = join(path, name);
    if (statSync(full).isDirectory()) files(full, out);
    else if (/\.(ts|tsx|md|txt|json)$/.test(name)) out.push(full);
  }
  return out;
}

async function request(url) {
  // Some servers reject HEAD or answer it differently, so any HEAD failure falls back to GET.
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(25000),
        headers: { "user-agent": "studyczechia-link-check (+https://studyczechia.com/official-sources/)" },
      });
      if (method === "HEAD" && res.status >= 400) continue;
      return { status: res.status, final: res.url };
    } catch (e) {
      if (method === "GET") return { status: 0, error: String(e.cause?.code || e.name) };
    }
  }
  return { status: 0, error: "no response" };
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** One retry after a pause for anything that is not a clean success, so a blip is not reported. */
async function check(url) {
  let r = await request(url);
  let verdict = classify(url, r.status, r.final);
  if (verdict !== "ok" && verdict !== "moved") {
    await wait(verdict === "blocked" ? 4000 : 2000);
    r = await request(url);
    verdict = classify(url, r.status, r.final);
  }
  return { ...r, verdict };
}

async function main() {
  const all = process.argv.includes("--all");
  const found = new Map(); // url -> first file that uses it
  for (const root of ROOTS) {
    for (const file of files(root)) {
      const text = readFileSync(file, "utf8");
      for (const m of text.matchAll(/https:\/\/[^\s"'`<>)\\\]]+/g)) {
        const url = m[0].replace(/[.,;:]+$/, "");
        if (url.includes("${") || url.includes("studyczechia.com")) continue;
        if (!all && !OFFICIAL.test(url)) continue;
        if (!found.has(url)) found.set(url, file);
      }
    }
  }

  const urls = [...found.keys()].sort();
  console.log(`Checking ${urls.length} ${all ? "external" : "official"} links...`);
  const results = [];
  const queue = [...urls];
  // Four at a time and a short pause between requests: polite to small government servers.
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (queue.length) {
        const url = queue.shift();
        results.push({ url, ...(await check(url)) });
        await wait(150);
      }
    })
  );

  const by = (v) => results.filter((r) => r.verdict === v).sort((a, b) => a.url.localeCompare(b.url));
  const line = (tag, r) =>
    console.log(`${tag}  ${r.status || r.error}  ${r.url}\n          in ${found.get(r.url)}${r.final && r.final !== r.url ? `\n          ends at ${r.final}` : ""}`);
  for (const r of by("moved")) line("moved      ", r);
  for (const r of by("blocked")) line("blocked    ", r);
  for (const r of by("unreachable")) line("unreachable", r);
  for (const r of by("broken")) line("BROKEN     ", r);
  console.log(
    `${by("ok").length} ok, ${by("moved").length} moved (check the content), ${by("blocked").length} blocked (open in a browser), ` +
      `${by("unreachable").length} unreachable (retry later), ${by("broken").length} broken`
  );
  process.exit(by("broken").length ? 1 : 0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) await main();
