import { describe, expect, it } from "vitest";
import { MEDICAL_DEGREES, examSubjects, feeRange, medicineRows } from "@/lib/medicine-guide";

describe("medicine guide", () => {
  const rows = medicineRows();

  it("lists English-taught General Medicine and Dentistry only, cheapest first", () => {
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) {
      expect(r.programme.field).toBe("Medicine");
      expect(r.programme.language).toBe("English");
      expect(MEDICAL_DEGREES).toContain(r.programme.name.en);
    }
    const fees = rows.map((r) => r.programme.tuitionEurPerYear);
    expect(fees).toEqual([...fees].sort((a, b) => a - b));
  });

  it("names a faculty and city in both languages for every row", () => {
    for (const r of rows) {
      expect(r.where.en).not.toBe("");
      expect(r.where.ar).not.toBe("");
      expect(r.city).not.toBe("");
    }
  });

  it("computes fee ranges from the same programmes", () => {
    const gm = feeRange(rows, "General Medicine")!;
    const fees = rows.filter((r) => r.programme.name.en === "General Medicine").map((r) => r.programme.tuitionEurPerYear);
    expect(gm).toEqual({ min: Math.min(...fees), max: Math.max(...fees), years: 6 });
    expect(feeRange(rows, "Not a programme")).toBeNull();
  });

  it("never counts more exams than programmes that publish subjects", () => {
    const e = examSubjects(rows);
    expect(e.withSubjects).toBeLessThanOrEqual(rows.length);
    for (const n of [e.biology, e.chemistry, e.physics]) expect(n).toBeLessThanOrEqual(e.withSubjects);
  });
});
