import sitemap from "@/app/sitemap";
import { metadata as journey } from "@/app/my-journey/page";
import { metadata as arJourney } from "@/app/ar/my-journey/page";
import { metadata as search } from "@/app/search/page";
import { metadata as compare } from "@/app/programmes/compare/page";

const urls = new Set(sitemap().map((e) => e.url));

describe("pages kept out of search", () => {
  it.each([
    ["/my-journey/", journey],
    ["/search/", search],
    ["/programmes/compare/", compare],
  ])("%s is noindex,follow and not in the sitemap", (path, meta) => {
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(urls.has(`https://studyczechia.com${path}`)).toBe(false);
    expect(urls.has(`https://studyczechia.com/ar${path}`)).toBe(false);
  });

  it("carries noindex to the Arabic twin", () => {
    expect(arJourney.robots).toEqual(journey.robots);
  });
});
