import { normalizeSearchText, searchSite, searchTerms } from "@/lib/site-search";

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
    expect(searchSite("zzzzqqq")).toEqual({ universities: [], programmes: [] });
    expect(searchSite("")).toEqual({ universities: [], programmes: [] });
  });
});
