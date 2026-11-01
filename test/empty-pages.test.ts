import sitemap from "@/app/sitemap";
import { generateMetadata as studyMetadata } from "@/app/study/[slug]/page";
import { generateMetadata as universityMetadata } from "@/app/university/[id]/page";
import { generateMetadata as arStudyMetadata } from "@/app/ar/study/[slug]/page";
import { universities } from "@/data/universities";
import { getProgrammesByUniversity } from "@/data/programmes";
import {
  getAllCitySlugs,
  getAllDegreeSlugs,
  getAllFieldSlugs,
  studyPageProgrammes,
} from "@/lib/seo-utils";

const urls = new Set(sitemap().map((e) => e.url));
const studySlugs = [...getAllFieldSlugs(), ...getAllCitySlugs(), ...getAllDegreeSlugs()];
const params = <T,>(v: T) => ({ params: Promise.resolve(v) });

describe("pages with no programmes", () => {
  it("keeps empty /study/ pages out of search and the sitemap, and lists the rest", async () => {
    for (const slug of studySlugs) {
      const empty = studyPageProgrammes(slug).length === 0;
      const meta = await studyMetadata(params({ slug }));
      const ar = await arStudyMetadata(params({ slug }));
      expect(meta.robots, slug).toEqual(empty ? { index: false, follow: true } : undefined);
      expect(ar.robots, `/ar/ ${slug}`).toEqual(meta.robots);
      expect(urls.has(`https://studyczechia.com/study/${slug}/`), slug).toBe(!empty);
      expect(urls.has(`https://studyczechia.com/ar/study/${slug}/`), slug).toBe(!empty);
    }
  });

  it("keeps universities without programmes out of search and the sitemap", async () => {
    for (const { id } of universities) {
      const empty = getProgrammesByUniversity(id).length === 0;
      const meta = await universityMetadata(params({ id }));
      expect(meta.robots, id).toEqual(empty ? { index: false, follow: true } : undefined);
      expect(urls.has(`https://studyczechia.com/university/${id}/`), id).toBe(!empty);
    }
  });
});
