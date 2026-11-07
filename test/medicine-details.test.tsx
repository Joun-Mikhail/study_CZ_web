import { MedicineGuide } from "@/app/study/[slug]/MedicineGuide";
import { totalRange } from "@/data/costs";
import { MEDICINE_ADMISSIONS } from "@/data/medicine-admissions";
import { feeRange, formatDate, formatMoney, medicineRows } from "@/lib/medicine-guide";
import { renderAt } from "./render";

const rows = medicineRows();
const unpublished = MEDICINE_ADMISSIONS.filter((r) => !r.applyUntil);

describe("medicine admission rounds", () => {
  it("cover every medicine programme exactly once", () => {
    const covered = MEDICINE_ADMISSIONS.flatMap((r) => r.programmeIds).sort();
    expect(covered).toEqual(rows.map((r) => r.programme.id).sort());
  });

  it("record an official source and check date, and only real windows", () => {
    for (const round of MEDICINE_ADMISSIONS) {
      expect(round.sourceUrl).toMatch(/^https:\/\//);
      expect(round.checkedOn).toMatch(/^20\d\d-\d\d-\d\d$/);
      if (round.applyFrom) expect(round.applyUntil, round.sourceUrl).toBeTruthy();
      if (round.applyFrom && round.applyUntil) expect(round.applyFrom < round.applyUntil).toBe(true);
    }
  });
});

describe("medicine guide sections", () => {
  for (const [locale, path, notPublished] of [
    ["en", "/study/medicine-in-czech-republic/", "Not published yet"],
    ["ar", "/ar/study/medicine-in-czech-republic/", "لم تُنشر المواعيد بعد"],
  ] as const) {
    it(`renders the routes, admission, timeline, cost and recognition sections (${locale})`, () => {
      const { container } = renderAt(<MedicineGuide locale={locale} />, path);
      for (const id of ["medicine-routes", "medicine-admission", "medicine-timeline", "medicine-total-cost", "medicine-egypt-recognition"]) {
        expect(container.querySelector(`h2#${id}`), id).not.toBeNull();
      }
    });

    it(`links every faculty's page and says when a round isn't published (${locale})`, () => {
      const { container } = renderAt(<MedicineGuide locale={locale} />, path);
      const text = container.textContent ?? "";
      for (const round of MEDICINE_ADMISSIONS) {
        expect(container.querySelector(`a[href="${round.sourceUrl}"]`), round.sourceUrl).not.toBeNull();
        if (round.applyUntil) expect(text).toContain(formatDate(round.applyUntil, locale));
        if (round.applicationFee) {
          expect(text).toContain(formatMoney(round.applicationFee.amount, round.applicationFee.currency, locale));
        }
      }
      expect(text.split(notPublished).length - 1).toBe(unpublished.length);
    });

    it(`adds up the degree from the fee data and the cost estimates (${locale})`, () => {
      const { container } = renderAt(<MedicineGuide locale={locale} />, path);
      const text = container.textContent ?? "";
      const medicine = feeRange(rows, "General Medicine")!;
      expect(text).toContain(formatMoney(medicine.min * medicine.years, "EUR", locale));
      expect(text).toContain(formatMoney(medicine.max * medicine.years, "EUR", locale));
      const [min, max] = totalRange("brno");
      expect(text).toContain(formatMoney(min, "CZK", locale));
      expect(text).toContain(formatMoney(max, "CZK", locale));
    });
  }

  it("keeps the fee table as the guide's only table", () => {
    const { container } = renderAt(<MedicineGuide locale="en" />, "/study/medicine-in-czech-republic/");
    expect(container.querySelectorAll("table")).toHaveLength(1);
    expect(container.querySelectorAll("tbody tr")).toHaveLength(rows.length);
  });
});

describe("formatDate", () => {
  it("writes the month in words with Western digits", () => {
    expect(formatDate("2027-04-30", "en")).toBe("30 April 2027");
    expect(formatDate("2026-11-01", "ar")).toBe("1 نوفمبر 2026");
  });
});
