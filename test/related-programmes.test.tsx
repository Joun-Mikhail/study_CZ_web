import ProgrammeDetailClient from "@/app/programmes/[slug]/ProgrammeDetailClient";
import { programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { programmeHubs, relatedProgrammes } from "@/lib/related-programmes";
import { studyPageIndexable } from "@/lib/seo-utils";
import { renderAt } from "./render";

const byId = (id: string) => programmes.find((p) => p.id === id)!;

describe("related programmes", () => {
  it("links up to four other programmes, same field first, never the page itself", () => {
    for (const p of programmes) {
      const related = relatedProgrammes(p);
      expect(related.length).toBeLessThanOrEqual(4);
      expect(related.map((r) => r.id)).not.toContain(p.id);
      const fields = related.map((r) => byId(r.id).field);
      const firstOther = fields.findIndex((f) => f !== p.field);
      if (firstOther >= 0) expect(fields.slice(firstOther).every((f) => f !== p.field)).toBe(true);
      for (const r of related) {
        const o = byId(r.id);
        expect(o.field === p.field || o.universityId === p.universityId).toBe(true);
      }
    }
  });

  it("only points at /study/ hubs that exist and have programmes", () => {
    for (const p of programmes) {
      for (const hub of Object.values(programmeHubs(p))) expect(studyPageIndexable(hub.slug), hub.slug).toBe(true);
    }
  });

  it("renders the links in English and Arabic", () => {
    const p = programmes.find((x) => x.field === "Medicine")!;
    const props = {
      programme: p,
      university: universitiesV2.find((u) => u.id === p.universityId) ?? null,
      total: programmes.length,
      related: relatedProgrammes(p),
      hubs: programmeHubs(p),
    };
    const hrefs = (c: HTMLElement) => [...c.querySelectorAll("a")].map((a) => a.getAttribute("href"));

    const en = renderAt(<ProgrammeDetailClient {...props} />, `/programmes/${p.id}/`);
    expect(en.getByRole("heading", { name: "Related programmes" })).toBeInTheDocument();
    expect(hrefs(en.container)).toEqual(expect.arrayContaining(props.related.map((r) => `/programmes/${r.id}`)));
    expect(hrefs(en.container)).toContain("/study/medicine-in-czech-republic");
    expect(en.getByText("All Medicine programmes")).toBeInTheDocument();
    en.unmount();

    const ar = renderAt(<ProgrammeDetailClient {...props} />, `/ar/programmes/${p.id}/`);
    expect(ar.getByRole("heading", { name: "برامج مشابهة" })).toBeInTheDocument();
    expect(hrefs(ar.container)).toContain("/ar/study/medicine-in-czech-republic");
    expect(ar.getByText("كل برامج الطب")).toBeInTheDocument();
  });
});
