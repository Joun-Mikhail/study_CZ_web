import { SeoCrosslinks } from "@/components/seo-crosslinks";
import { PROGRAMME_FIELDS } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { cityToSlug, fieldToSlug, studyPageIndexable } from "@/lib/seo-utils";
import { renderAt } from "./render";

const hubs = [
  ...PROGRAMME_FIELDS.map(fieldToSlug),
  ...[...new Set(universitiesV2.map((u) => u.city))].map(cityToSlug),
];

function studyLinks(pathname: string, locale: "en" | "ar") {
  const { container } = renderAt(<SeoCrosslinks locale={locale} />, pathname);
  return [...container.querySelectorAll("a")]
    .map((a) => ({ slug: a.getAttribute("href")!.replace(/^(\/ar)?\/study\//, "").replace(/\/$/, ""), text: a.textContent }))
    .filter((l) => hubs.includes(l.slug));
}

describe("SeoCrosslinks", () => {
  it("links every field and city hub that has programmes, and no empty one", () => {
    const linked = studyLinks("/study/in-brno/", "en").map((l) => l.slug).sort();
    expect(linked).toEqual(hubs.filter(studyPageIndexable).sort());
  });

  it("labels fields and cities in Arabic on Arabic pages", () => {
    const links = studyLinks("/ar/study/in-brno/", "ar");
    const text = (slug: string) => links.find((l) => l.slug === slug)?.text;
    expect(text("computer-science-in-czech-republic")).toBe("علوم الحاسب");
    expect(text("in-prague")).toBe("براغ");
  });
});
