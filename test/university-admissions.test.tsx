import UniversityDetailClient from "@/app/university/[id]/UniversityDetailClient";
import { universities } from "@/data/universities";
import { universitiesV2 } from "@/data/universities-v2";
import { renderAt } from "./render";

// "www.muni.cz" -> "muni.cz": a fact's source must be on the university's own domain.
const site = (url: string) => new URL(url).hostname.split(".").slice(-2).join(".");

describe("university admission facts", () => {
  it("come from the university's own domain, with a check date and both languages", () => {
    const withFacts = universitiesV2.filter((u) => u.admissions);
    expect(withFacts.map((u) => u.id)).toEqual(expect.arrayContaining(["muni", "zcu", "vse", "mendelu"]));
    for (const u of withFacts) {
      expect(u.admissions!.checkedOn, u.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      for (const f of u.admissions!.facts) {
        expect(f.sourceUrl, u.id).toMatch(/^https:\/\//);
        expect(site(f.sourceUrl), f.sourceUrl).toBe(site(u.website));
        expect(f.en.length).toBeGreaterThan(20);
        expect(f.ar.length).toBeGreaterThan(20);
      }
    }
  });

  it("render with their sources in English and Arabic, and stay hidden where none are stored", () => {
    const muni = universities.find((u) => u.id === "muni")!;
    const en = renderAt(<UniversityDetailClient uni={muni} />, "/university/muni/");
    expect(en.getByRole("heading", { name: "How admission works" })).toBeInTheDocument();
    expect(en.getAllByRole("link", { name: "(source)" })).toHaveLength(universitiesV2.find((u) => u.id === "muni")!.admissions!.facts.length);
    en.unmount();

    const ar = renderAt(<UniversityDetailClient uni={muni} />, "/ar/university/muni/");
    expect(ar.getByRole("heading", { name: "كيف يتم القبول" })).toBeInTheDocument();
    ar.unmount();

    const without = universities.find((u) => !universitiesV2.find((v) => v.id === u.id)?.admissions)!;
    const none = renderAt(<UniversityDetailClient uni={without} />, `/university/${without.id}/`);
    expect(none.queryByRole("heading", { name: "How admission works" })).toBeNull();
  });
});
