import { programmes } from "@/data/programmes";
import { feeVerified } from "@/lib/fee-source";
import { programmeJsonLd } from "@/lib/programme-schema";

describe("programme JSON-LD", () => {
  it("describes every programme as a degree programme from stored data", () => {
    for (const p of programmes) {
      const ld = programmeJsonLd(p);
      expect(ld["@type"]).toBe("EducationalOccupationalProgram");
      expect(ld.timeToComplete).toBe(`P${p.durationYears}Y`);
      expect(ld.educationalCredentialAwarded).toMatch(/degree$/);
      // Course-only properties that EducationalOccupationalProgram doesn't define
      expect(ld).not.toHaveProperty("inLanguage");
      expect(ld).not.toHaveProperty("educationalLevel");
      expect(ld.provider).toMatchObject({ "@type": "CollegeOrUniversity", "@id": `https://studyczechia.com/university/${p.universityId}/#university` });
      expect(ld.provider).not.toHaveProperty("@context");
      expect("offers" in ld).toBe(feeVerified(p));
    }
  });

  it("states the verified fee for CUNI dentistry", () => {
    expect(programmeJsonLd(programmes.find((p) => p.id === "cuni-md-dentistry")!)).toMatchObject({
      name: "Dentistry",
      educationalCredentialAwarded: "Master's degree",
      offers: { price: 24250, priceCurrency: "EUR" },
    });
  });
});
