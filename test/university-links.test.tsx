import UniversityDetailClient from "@/app/university/[id]/UniversityDetailClient";
import { universities } from "@/data/universities";
import { universitiesV2 } from "@/data/universities-v2";
import { studyPageIndexable, universityPageIndexable } from "@/lib/seo-utils";
import { universityLinks } from "@/lib/university-links";
import { renderAt } from "./render";

describe("university links", () => {
  it("links up to four other non-empty universities, same city first, never the page itself", () => {
    for (const u of universitiesV2) {
      const { related } = universityLinks(u.id);
      expect(related.length).toBeLessThanOrEqual(4);
      expect(related.map((r) => r.id)).not.toContain(u.id);
      for (const r of related) expect(universityPageIndexable(r.id), r.id).toBe(true);
      const sameCity = related.map((r) => r.city === u.city);
      expect(sameCity).toEqual([...sameCity].sort((a, b) => Number(b) - Number(a)));
    }
  });

  it("only points at /study/ hubs that have programmes", () => {
    for (const u of universitiesV2) {
      const { city, fields } = universityLinks(u.id);
      for (const hub of [...(city ? [city] : []), ...fields]) expect(studyPageIndexable(hub.slug), hub.slug).toBe(true);
    }
  });

  it("renders the links in English and Arabic", () => {
    const uni = universities.find((u) => u.id === "muni")!;
    const links = universityLinks(uni.id);
    const hrefs = (c: HTMLElement) => [...c.querySelectorAll("a")].map((a) => a.getAttribute("href"));

    const en = renderAt(<UniversityDetailClient uni={uni} links={links} />, "/university/muni/");
    expect(en.getByRole("heading", { name: "Keep exploring" })).toBeInTheDocument();
    expect(hrefs(en.container)).toEqual(expect.arrayContaining([...links.related.map((r) => `/university/${r.id}`), "/study/in-brno", "/deadlines"]));
    expect(en.getByText("Study in Brno")).toBeInTheDocument();
    en.unmount();

    const ar = renderAt(<UniversityDetailClient uni={uni} links={links} />, "/ar/university/muni/");
    expect(ar.getByRole("heading", { name: "استكشف أكتر" })).toBeInTheDocument();
    expect(hrefs(ar.container)).toEqual(expect.arrayContaining(["/ar/study/in-brno", "/ar/deadlines", "/ar/recognition"]));
    expect(ar.getByText("الدراسة في برنو")).toBeInTheDocument();
  });
});
