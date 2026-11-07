import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { programmes } from "@/data/programmes";
import { englishTuition, medicineTuition, OFFICIAL } from "@/lib/study-costs";
import { feeRange, medicineRows } from "@/lib/medicine-guide";
import { feeVerified } from "@/lib/fee-source";
// @ts-expect-error: plain JS build tool
import { KEY, changedFrom, changedSince, sitemapEntries } from "../tools/indexnow.mjs";

const n = (v: number) => v.toLocaleString("en-US");

describe("llms.txt", () => {
  const text = readFileSync("public/llms.txt", "utf8");

  it("states the current programme and university counts", () => {
    const english = programmes.filter((p) => p.language === "English");
    const unis = new Set(english.map((p) => p.universityId)).size;
    expect(text).toContain(`${english.length} English-taught programmes at ${unis} Czech universities`);
  });

  it("claims only as many verified fees as the data supports", () => {
    const english = programmes.filter((p) => p.language === "English");
    const verified = english.filter(feeVerified).length;
    expect(text).toContain(`${verified} of the ${english.length} fees are verified`);
    expect(text).toContain(`${verified} of those fees are verified on the university's own fee page`);
    expect(text).not.toMatch(/every tuition fee on the site comes from the university/i);
  });

  it("flags the cheapest and medicine fees that are not verified", () => {
    const cheapest = [...programmes].filter((p) => p.language === "English").sort((a, b) => a.tuitionEurPerYear - b.tuitionEurPerYear)[0];
    const line = text.split("\n").find((l) => l.includes("cheapest English-taught programme"))!;
    if (!feeVerified(cheapest)) expect(line).toContain("still being re-checked");
    const verifiedMed = [...new Set(medicineRows().filter((r) => feeVerified(r.programme)).map((r) => r.programme.tuitionEurPerYear))];
    expect(verifiedMed).toHaveLength(1);
    expect(text).toContain(`Only the €${n(verifiedMed[0])} fees at Charles University's First Faculty of Medicine are verified so far`);
  });

  it("states fees and visa figures that match the site's data", () => {
    const med = medicineTuition()!;
    const dent = feeRange(medicineRows(), "Dentistry")!;
    expect(text).toContain(`listed at €${n(englishTuition().all.min)} a year`);
    expect(text).toContain(`€${n(med.min)} to €${n(med.max)} a year`);
    expect(text).toContain(`Dentistry €${n(dent.min)} to €${n(dent.max)}`);
    expect(text).toContain(`${n(OFFICIAL.proofOfFundsYearCzk.value)} CZK`);
    expect(text).toContain(`${n(OFFICIAL.visaFeeCairoEgp.value)} EGP (valid from ${OFFICIAL.visaFeeCairoEgp.validFrom.en})`);
  });

  it("only links pages that exist", () => {
    for (const [, path] of text.matchAll(/https:\/\/studyczechia\.com(\/[^\s)]*)/g)) {
      const dir = path === "/" ? "src/app" : `src/app${path.replace(/\/$/, "")}`;
      expect(existsSync(`${dir}/page.tsx`) || existsSync(dir.replace("/study/medicine-in-czech-republic", "/study/[slug]") + "/page.tsx"), path).toBe(true);
    }
  });
});

describe("IndexNow", () => {
  it("publishes the key file the script points to", () => {
    expect(readFileSync(`public/${KEY}.txt`, "utf8").trim()).toBe(KEY);
  });

  it("reads URLs and lastmod from a sitemap and keeps recent changes", () => {
    const xml = `<urlset><url><loc>https://studyczechia.com/a/</loc><lastmod>2026-10-19T10:00:00.000Z</lastmod></url><url><loc>https://studyczechia.com/b/</loc><lastmod>2026-09-01T10:00:00.000Z</lastmod></url></urlset>`;
    const entries = sitemapEntries(xml);
    expect(entries.map((e: { url: string }) => e.url)).toEqual(["https://studyczechia.com/a/", "https://studyczechia.com/b/"]);
    expect(changedSince(entries, Date.parse("2026-10-16T00:00:00Z"))).toEqual(["https://studyczechia.com/a/"]);
  });

  it("submits only pages that are new or changed compared with the live sitemap", () => {
    const built = [
      { url: "https://studyczechia.com/a/", lastmod: "2026-10-19T10:00:00.000Z" },
      { url: "https://studyczechia.com/b/", lastmod: "2026-09-01T10:00:00.000Z" },
      { url: "https://studyczechia.com/new/", lastmod: "2026-10-19T10:00:00.000Z" },
    ];
    const live = [
      { url: "https://studyczechia.com/a/", lastmod: "2026-10-01T10:00:00.000Z" },
      { url: "https://studyczechia.com/b/", lastmod: "2026-09-01T10:00:00.000Z" },
    ];
    expect(changedFrom(built, live)).toEqual(["https://studyczechia.com/a/", "https://studyczechia.com/new/"]);
  });
});
