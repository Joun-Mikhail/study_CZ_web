import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { AUTHORITIES, OFFICIAL_TOPICS } from "@/data/official-sources";
import { SITE_PAGES } from "@/data/site-pages";

// The official portal moved to studyin.gov.cz and many old studyin.cz paths
// now end in "page not found" (checked 11 Nov 2026). Old interior-ministry
// article pages (mvcr.cz/mvcren/article/...) are gone as well.
const OLD_HOSTS = /https?:\/\/(www\.|portal\.)?studyin\.cz|mvcr\.cz\/mvcren\/article/;

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) sourceFiles(full, out);
    else if (/\.(ts|tsx|md)$/.test(name)) out.push(full);
  }
  return out;
}

describe("official sources", () => {
  it("no page links to the old official addresses", () => {
    const offenders = [...sourceFiles("src"), "public/llms.txt"].filter((f) => OLD_HOSTS.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("every topic points to the official portal and to one of our own pages", () => {
    const known = new Set(SITE_PAGES.map((p) => p.path));
    for (const t of OFFICIAL_TOPICS) {
      expect(t.officialUrl, t.id).toMatch(/^https:\/\/studyin\.gov\.cz\/.+\/$/);
      expect(t.guide.href, t.id).toMatch(/^\/.+\/$/);
      expect(known.has(t.guide.href) || ["/programmes/", "/universities/", "/scholarships/"].includes(t.guide.href), t.guide.href).toBe(true);
      expect(t.topic.ar && t.guide.label.ar, t.id).toBeTruthy();
    }
  });

  it("authorities are https and described in both languages", () => {
    for (const a of AUTHORITIES) {
      expect(a.url, a.id).toMatch(/^https:\/\//);
      expect(a.name.ar && a.decides.ar, a.id).toBeTruthy();
    }
  });
});
