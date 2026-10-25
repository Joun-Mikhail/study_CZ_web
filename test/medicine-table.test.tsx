import { MedicineGuide } from "@/app/study/[slug]/MedicineGuide";
import { medicineRows } from "@/lib/medicine-guide";
import { feeStatus } from "@/lib/fee-source";
import { renderAt } from "./render";

const rows = medicineRows();
const verified = rows.filter((r) => feeStatus(r.programme) === "verified");

describe("medicine fee table", () => {
  it("is a real table with one row per programme", () => {
    const { container } = renderAt(<MedicineGuide locale="en" />, "/study/medicine-in-czech-republic/");
    expect(container.querySelector("table caption")?.textContent).toContain("whether each fee is verified");
    expect(container.querySelectorAll("tbody tr")).toHaveLength(rows.length);
  });

  for (const [locale, path, verifiedLabel, recheckLabel] of [
    ["en", "/study/medicine-in-czech-republic/", "Verified", "Being re-checked"],
    ["ar", "/ar/study/medicine-in-czech-republic/", "تم التحقق", "قيد المراجعة"],
  ] as const) {
    it(`shows a check date only for verified fees (${locale})`, () => {
      const { container } = renderAt(<MedicineGuide locale={locale} />, path);
      const trs = [...container.querySelectorAll("tbody tr")];
      expect(container.querySelectorAll("tbody time")).toHaveLength(verified.length);
      trs.forEach((tr, i) => {
        const p = rows[i].programme;
        const cell = tr.querySelectorAll("td")[1];
        const link = cell.querySelector("a")!;
        const status = feeStatus(p);
        if (status === "verified") {
          expect(cell.textContent).toContain(verifiedLabel);
          expect(cell.querySelector("time")?.getAttribute("datetime")).toBe(p.verification.lastVerified);
          expect(link.getAttribute("href")).toBe(p.verification.sourceUrl);
        } else {
          expect(cell.textContent).toContain(recheckLabel);
          expect(cell.querySelector("time")).toBeNull();
          expect(link.getAttribute("href")).toBe(status === "pending" ? p.verification.sourceUrl : p.programmeUrl);
        }
      });
    });
  }

  it("states the verified count in the intro instead of claiming every fee was checked", () => {
    const { container } = renderAt(<MedicineGuide locale="en" />, "/study/medicine-in-czech-republic/");
    expect(container.textContent).toContain(`${verified.length} of these ${rows.length} fees are verified`);
    expect(container.textContent).not.toMatch(/Each fee was checked on/);
  });
});
