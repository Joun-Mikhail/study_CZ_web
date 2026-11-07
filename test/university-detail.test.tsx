import UniversityDetailClient from "@/app/university/[id]/UniversityDetailClient";
import { universities } from "@/data/universities";
import { renderAt } from "./render";

const empty = universities.find((u) => !u.programs?.length)!;
const listed = universities.find((u) => (u.programs?.length ?? 0) > 1)!;

describe("UniversityDetailClient tuition", () => {
  it("says the fee is not listed, not €0, when no programme is listed", () => {
    const { container } = renderAt(<UniversityDetailClient uni={empty} />, `/university/${empty.id}/`);
    expect(container.textContent).toContain("Not listed yet");
    expect(container.textContent).not.toMatch(/€\s?0(?![\d,])/);
  });

  it("does the same in Arabic", () => {
    const { container } = renderAt(<UniversityDetailClient uni={empty} />, `/ar/university/${empty.id}/`);
    expect(container.textContent).toContain("لم تُدرج بعد");
    expect(container.textContent).not.toMatch(/€\s?0(?![\d,])/);
  });

  it("shows the real fee range when programmes are listed", () => {
    const [min, max] = listed.tuitionEurPerYear!;
    const { container } = renderAt(<UniversityDetailClient uni={listed} />, `/university/${listed.id}/`);
    expect(container.textContent).toContain(`€${min.toLocaleString()}`);
    if (max !== min) expect(container.textContent).toContain(`€${max.toLocaleString()}`);
  });
});

describe("UniversityDetailClient languages", () => {
  it("makes no language claim when no programme is listed (EN/AR)", () => {
    const en = renderAt(<UniversityDetailClient uni={empty} />, `/university/${empty.id}/`);
    expect(en.container.textContent).not.toMatch(/Language of listed programmes|Languages:|English, Czech/);
    en.unmount();
    const ar = renderAt(<UniversityDetailClient uni={empty} />, `/ar/university/${empty.id}/`);
    expect(ar.container.textContent).not.toMatch(/لغة البرامج المدرجة|اللغات|English, Czech/);
  });

  it("names only the listed programmes' languages, in Arabic on /ar/", () => {
    const en = renderAt(<UniversityDetailClient uni={listed} />, `/university/${listed.id}/`);
    expect(en.container.textContent).toContain(`Language of listed programmes: ${listed.languages.join(", ")}`);
    en.unmount();
    const ar = renderAt(<UniversityDetailClient uni={listed} />, `/ar/university/${listed.id}/`);
    const arNames = listed.languages.map((l) => ({ English: "الإنجليزية", Czech: "التشيكية" })[l]).join("، ");
    expect(ar.container.textContent).toContain(`لغة البرامج المدرجة: ${arNames}`);
  });
});
