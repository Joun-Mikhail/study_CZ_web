import { describe, expect, it } from "vitest";
import { toV1 } from "@/data/compat";
import { getProgrammesByUniversity } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";

describe("university tuition range", () => {
  it("is null, never 0, when a university has no listed programme", () => {
    const empty = universitiesV2.filter((u) => getProgrammesByUniversity(u.id).length === 0);
    expect(empty.length).toBeGreaterThan(0);
    for (const u of empty) {
      expect(toV1(u).tuitionEurPerYear).toBeNull();
    }
  });

  it("spans the cheapest and dearest listed programme otherwise", () => {
    const listed = universitiesV2.filter((u) => getProgrammesByUniversity(u.id).length > 0);
    for (const u of listed) {
      const fees = getProgrammesByUniversity(u.id).map((p) => p.tuitionEurPerYear);
      expect(toV1(u).tuitionEurPerYear).toEqual([Math.min(...fees), Math.max(...fees)]);
    }
  });
});

describe("university languages and degree levels", () => {
  it("are empty, never guessed, when a university has no listed programme", () => {
    const empty = universitiesV2.filter((u) => getProgrammesByUniversity(u.id).length === 0);
    expect(empty.length).toBeGreaterThan(0);
    for (const u of empty) {
      expect(toV1(u).languages, u.id).toEqual([]);
      expect(toV1(u).degreeLevels, u.id).toEqual([]);
    }
  });

  it("come only from the listed programmes otherwise", () => {
    const listed = universitiesV2.filter((u) => getProgrammesByUniversity(u.id).length > 0);
    for (const u of listed) {
      const progs = getProgrammesByUniversity(u.id);
      expect(new Set(toV1(u).languages), u.id).toEqual(new Set(progs.map((p) => p.language)));
      expect(new Set(toV1(u).degreeLevels), u.id).toEqual(new Set(progs.map((p) => p.degree)));
    }
  });
});
