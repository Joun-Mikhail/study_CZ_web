#!/usr/bin/env node
// Checks that the official pages the site links to still open.
//
//   node tools/check-official-links.mjs            # government and official-portal links
//   node tools/check-official-links.mjs --all      # every external https link in src/data and src/app
//
// Why: in 2026 the official Study in Czechia portal moved from studyin.cz to
// studyin.gov.cz and many of its old addresses now end in "page not found".
// A guide that sends students to dead official pages loses their trust, and
// search engines read broken outbound links as a sign of a neglected page.
//
// Exit code 1 if any link fails, so it can gate a pull request. Sites that
// refuse automated requests (403) are reported as "blocked", not as broken:
// open those in a browser.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src/data", "src/app", "src/components", "public/llms.txt"];
const OFFICIAL = /^https:\/\/([a-z0-9-]+\.)*(gov\.cz|mzv\.cz|msmt\.cz|mvcr\.cz|dzs\.cz|studyin\.cz)\//i;
const all = process.argv.includes("--all");

function files(path, out = []) {
  if (statSync(path).isFile()) return out.concat(path);
  for (const name of readdirSync(path)) {
    const full = join(path, name);
    if (statSync(full).isDirectory()) files(full, out);
    else if (/\.(ts|tsx|md|txt|json)$/.test(name)) out.push(full);
  }
  return out;
}

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

async function check(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, { method, redirect: "follow", signal: AbortSignal.timeout(20000) });
      if (res.status === 405 || (method === "HEAD" && res.status >= 400)) continue;
      return { status: res.status, final: res.url };
    } catch (e) {
      if (method === "GET") return { status: 0, error: String(e.cause?.code || e.name) };
    }
  }
  return { status: 0, error: "no response" };
}

const urls = [...found.keys()].sort();
console.log(`Checking ${urls.length} ${all ? "external" : "official"} links...`);
const broken = [];
const blocked = [];
const queue = [...urls];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      const r = await check(url);
      if (r.status === 403 || r.status === 429) blocked.push({ url, ...r });
      else if (r.status < 200 || r.status >= 400) broken.push({ url, ...r });
    }
  })
);

for (const b of blocked) console.log(`blocked ${b.status}  ${b.url}\n          in ${found.get(b.url)}`);
for (const b of broken) console.log(`BROKEN  ${b.status || b.error}  ${b.url}\n          in ${found.get(b.url)}${b.final && b.final !== b.url ? `\n          ends at ${b.final}` : ""}`);
console.log(`${urls.length - broken.length - blocked.length} ok, ${blocked.length} blocked (check in a browser), ${broken.length} broken`);
process.exit(broken.length ? 1 : 0);
