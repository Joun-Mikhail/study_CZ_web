// @ts-expect-error: plain JS tool
import { TRACKED, readExport, summarize } from "../tools/gsc-report.mjs";

const CSV = [
  "Top queries,Clicks,Impressions,CTR,Position",
  "study czechia,3,40,7.5%,11.2",
  '"study in czechia, from egypt",0,9,0%,14',
  "الدراسة في التشيك,1,60,1.67%,23.4",
  "studyczechia,5,6,83.33%,1",
  "czech visa,0,3,0%,45",
].join("\r\n");

describe("gsc-report", () => {
  const s = summarize(readExport("﻿" + CSV));

  it("reads quoted queries and percentages", () => {
    const rows = readExport(CSV);
    expect(rows[1]).toEqual({ key: "study in czechia, from egypt", clicks: 0, impressions: 9, ctr: 0, position: 14 });
    expect(rows[0].ctr).toBe(7.5);
  });

  it("reports every tracked keyword, with no position when Google never showed the site", () => {
    expect(s.tracked.map((t: { keyword: string }) => t.keyword)).toEqual(TRACKED);
    expect(s.tracked[0]).toMatchObject({ keyword: "study czechia", position: 11.2, impressions: 40 });
    expect(s.tracked.find((t: { keyword: string }) => t.keyword === "الدراسة في التشيك").position).toBe(23.4);
    expect(s.tracked.find((t: { keyword: string }) => t.keyword === "جامعات التشيك").position).toBeNull();
  });

  it("separates brand from non-brand and lists near misses", () => {
    expect(s.brand).toEqual({ clicks: 8, impressions: 46 });
    expect(s.nonBrand).toEqual({ clicks: 1, impressions: 72 });
    expect(s.nearMisses.map((q: { key: string }) => q.key)).toEqual(["study czechia", "study in czechia, from egypt"]);
  });
});
