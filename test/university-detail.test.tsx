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
