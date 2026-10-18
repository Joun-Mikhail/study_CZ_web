import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { normalizeSearchText, searchSite, searchTerms } from "@/lib/site-search";
import { SITE_PAGES } from "@/data/site-pages";
import { qaEntries } from "@/data/qa";
import { AR_PAGE_META } from "@/i18n/ar-metadata";

describe("normalizeSearchText", () => {
  it("folds case and Czech accents", () => {
    expect(normalizeSearchText("Plzeň")).toBe("plzen");
    expect(normalizeSearchText("  ČESKÉ Budějovice ")).toBe("ceske budejovice");
  });

  it("unifies Arabic letter variants and drops diacritics", () => {
    expect(normalizeSearchText("جامعة")).toBe(normalizeSearchText("جامعه"));
    expect(normalizeSearchText("أوسترافا")).toBe("اوسترافا");
    expect(normalizeSearchText("الطِّب")).toBe("الطب");
  });
});

describe("searchTerms", () => {
  it("splits words and drops the Arabic article", () => {
    expect(searchTerms("Medicine, Prague")).toEqual(["medicine", "prague"]);
    expect(searchTerms("الهندسة")).toEqual(["هندسه"]);
  });

  it("returns nothing for blank input", () => {
    expect(searchTerms("   ")).toEqual([]);
  });
});

describe("searchSite", () => {
  it("finds universities regardless of case or accents", () => {
    const ids = (q: string) => searchSite(q).universities.map((u) => u.id);
    expect(ids("charles")).toContain("cuni");
    expect(ids("CHARLES")).toContain("cuni");
    expect(searchSite("plzen").universities.some((u) => u.city === "Plzeň")).toBe(true);
  });

  it("matches words spread across fields", () => {
    const r = searchSite("medicine prague");
    expect(r.universities.map((u) => u.id)).toContain("cuni");
    expect(r.programmes.length).toBeGreaterThan(0);
  });

  it("answers Arabic queries", () => {
    expect(searchSite("براغ").universities.length).toBeGreaterThan(0);
    expect(searchSite("طب").programmes.length).toBeGreaterThan(0);
    expect(searchSite("جامعة تشارلز").universities.map((u) => u.id)).toContain("cuni");
  });

  it("searches programme names", () => {
    expect(searchSite("dentistry").programmes.length).toBeGreaterThan(0);
  });

  it("ranks a name match above a description match", () => {
    expect(searchSite("charles").universities[0].id).toBe("cuni");
  });

  it("returns empty lists for no match or an empty query", () => {
    expect(searchSite("zzzzqqq")).toEqual({ universities: [], programmes: [], pages: [], qa: [] });
    expect(searchSite("")).toEqual({ universities: [], programmes: [], pages: [], qa: [] });
  });
});

describe("searchSite: pages and Q&A", () => {
  const hrefs = (q: string) => searchSite(q).pages.map((p) => p.href);

  it("finds guide pages by topic in English", () => {
    expect(hrefs("visa")).toEqual(expect.arrayContaining(["/application-guide/", "/stage/visa/"]));
    expect(hrefs("accommodation")).toEqual(expect.arrayContaining(["/cost-of-living/", "/arrival/"]));
    expect(hrefs("scholarships")).toContain("/scholarships/");
  });

  it("finds guide pages by topic in Arabic, formal or colloquial", () => {
    expect(hrefs("تأشيرة")).toContain("/application-guide/");
    expect(hrefs("فيزا")).toContain("/application-guide/");
    expect(hrefs("السكن")).toContain("/cost-of-living/");
    expect(hrefs("معادلة الشهادة مصر")[0]).toBe("/recognition/egypt/");
  });

  it("finds service pages", () => {
    expect(hrefs("services")).toContain("/services/");
    expect(hrefs("مقابلة السفارة")).toContain("/interview-prep/");
  });

  it("ranks a title match first", () => {
    expect(hrefs("cost of living")[0]).toBe("/cost-of-living/");
    expect(hrefs("embassy interview")[0]).toBe("/interview-prep/");
  });

  it("finds individual Q&A answers and links to their anchor", () => {
    const qa = searchSite("visa").qa.map((p) => p.href);
    expect(qa).toContain("/qa/#visa-validity");
    expect(searchSite("dorm").qa.map((p) => p.href)).toContain("/qa/#housing-how-to-apply");
    expect(searchSite("تأشيرة").qa.length).toBeGreaterThan(0);
  });

  it("shows Arabic titles from AR_PAGE_META, without the site-name suffix", () => {
    const guide = searchSite("application guide").pages.find((p) => p.href === "/application-guide/")!;
    expect(guide.title.ar).toBe(AR_PAGE_META["/application-guide/"].title);
    const deadlines = searchSite("deadlines").pages.find((p) => p.href === "/deadlines/")!;
    expect(deadlines.title.en).toBe("Czech University Application Deadlines 2027");
    expect(deadlines.title.ar).not.toContain("|");
  });

  it("only links to internal URLs that end in a slash (before any #anchor)", () => {
    const all = [...searchSite("study").pages, ...searchSite("a").qa];
    expect(all.length).toBeGreaterThan(0);
    for (const p of all) expect(p.href).toMatch(/^\/[^#?]*\/(#[\w-]+)?$/);
  });
});

describe("SITE_PAGES", () => {
  // The English page's metadata: page.tsx wins over layout.tsx, as in Next.js.
  function metadataOf(path: string): { title: string; description: string } | undefined {
    for (const file of ["page.tsx", "layout.tsx"]) {
      const full = join("src/app", path, file);
      if (!existsSync(full)) continue;
      const block = readFileSync(full, "utf8").match(/export const metadata[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1];
      if (!block) continue;
      const title = block.match(/^\s+title:\s*"([^"]*)"/m)?.[1];
      const description = block.match(/^\s+description:\s*"([^"]*)"/m)?.[1];
      if (title && description) return { title, description };
    }
    return undefined;
  }

  it.each(SITE_PAGES.map((p) => [p.path, p]))("%s matches the page's English metadata", (path, page) => {
    expect(metadataOf(path)).toEqual({ title: page.title, description: page.description });
  });

  it.each(SITE_PAGES.map((p) => [p.path]))("%s has an Arabic twin and Arabic metadata", (path) => {
    expect(AR_PAGE_META[path]).toBeDefined();
    expect(existsSync(join("src/app/ar", path, "page.tsx"))).toBe(true);
  });

  it("lists each page once", () => {
    const paths = SITE_PAGES.map((p) => p.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("Q&A anchors are real entry ids", () => {
    const ids = new Set(qaEntries.map((e) => e.id));
    for (const p of searchSite("a").qa) expect(ids.has(p.href.replace("/qa/#", ""))).toBe(true);
  });
});
