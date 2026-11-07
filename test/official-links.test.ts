import { universitiesV2 } from "@/data/universities-v2";

// URLs that returned 404 when checked on 1 Nov 2026; keep them from coming back.
const DEAD = [
  "https://www.vse.cz/english/admissions/",
  "https://www.cvut.cz/en/admissions",
  "https://www.vutbr.cz/en/admission",
  "https://mendelu.cz/en/admission/",
  "https://www.upol.cz/en/applicants/",
  "https://www.vscht.cz/EN/",
  "https://www.umprum.cz/web/en/",
];

describe("university official links", () => {
  it("are https and avoid known dead pages", () => {
    for (const u of universitiesV2) {
      for (const url of [u.website, u.admissionsUrl, u.verification.sourceUrl].filter(Boolean) as string[]) {
        expect(url, u.id).toMatch(/^https:\/\//);
        expect(DEAD, `${u.id}: ${url}`).not.toContain(url);
      }
    }
  });
});
