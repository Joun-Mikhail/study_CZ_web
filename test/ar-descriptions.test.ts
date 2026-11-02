import { generateMetadata as arUniversity } from "@/app/ar/university/[id]/page";
import { generateMetadata as arStage } from "@/app/ar/stage/[slug]/page";
import { universities } from "@/data/universities";
import { stageOrder } from "@/data/stages";
import { AR_PAGE_META } from "@/i18n/ar-metadata";

const params = <T,>(v: T) => ({ params: Promise.resolve(v) });
// Search results show roughly 70-160 characters; shorter wastes the snippet.
const fits = (d: unknown) => typeof d === "string" && d.length >= 70 && d.length <= 165;

describe("Arabic meta descriptions", () => {
  it.each(["/contact/", "/terms/", "/privacy/", "/study/cheapest-programmes/"])("%s is long enough to use the snippet", (path) => {
    expect(fits(AR_PAGE_META[path].description), AR_PAGE_META[path].description).toBe(true);
  });

  it("every stage page has its own Arabic description", async () => {
    for (const slug of stageOrder) {
      const meta = await arStage(params({ slug }));
      expect(fits(meta.description), slug).toBe(true);
    }
  });

  it("university pages add the city unless the blurb is already long", async () => {
    for (const u of universities) {
      const { description } = await arUniversity(params({ id: u.id }));
      expect(String(description).length, u.id).toBeLessThanOrEqual(165);
      if (String(u.blurb?.ar ?? "").length < 70) expect(fits(description), `${u.id}: ${description}`).toBe(true);
    }
  });
});
