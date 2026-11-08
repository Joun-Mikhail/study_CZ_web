import { generateMetadata as enUniversity } from "@/app/university/[id]/page";
import { universities } from "@/data/universities";
import { AR_PAGE_META } from "@/i18n/ar-metadata";

const params = <T,>(v: T) => ({ params: Promise.resolve(v) });
// Search results cut descriptions at about 160 characters; past that the end
// of the sentence (often the part that says what the page covers) is lost.
const MAX = 165;

describe("meta description length", () => {
  it("English university pages fit, or fall back to the blurb alone", async () => {
    for (const u of universities) {
      const { description } = await enUniversity(params({ id: u.id }));
      const d = String(description);
      if (d.length > MAX) expect(d, u.id).toBe(u.blurb.en);
      expect(d.startsWith(u.blurb.en || `Learn about ${u.name}.`), u.id).toBe(true);
    }
  });

  it("English university pages keep the city when there is room", async () => {
    const short = universities.filter((u) => u.blurb.en.length <= 90);
    for (const u of short) {
      const { description } = await enUniversity(params({ id: u.id }));
      expect(String(description), u.id).toContain(`${u.city}, Czech Republic`);
    }
  });

  // "/" is excluded: test/ar-home-metadata.test.ts pins its exact wording.
  it.each(Object.keys(AR_PAGE_META).filter((p) => p !== "/"))("Arabic %s fits the snippet", (path) => {
    expect(AR_PAGE_META[path].description.length, AR_PAGE_META[path].description).toBeLessThanOrEqual(MAX);
  });
});
