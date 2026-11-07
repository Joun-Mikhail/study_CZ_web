import { universitiesV2 } from "@/data/universities-v2";
import { universityJsonLd } from "@/lib/university-schema";

describe("university JSON-LD", () => {
  it("states only stored facts for every university", () => {
    for (const u of universitiesV2) {
      const ld = universityJsonLd(u.id)!;
      expect(ld["@type"]).toBe("CollegeOrUniversity");
      expect(ld.url).toBe(u.website);
      expect(u.name.startsWith(ld.name as string)).toBe(true);
      expect(ld.name).not.toMatch(/[()]/);
      expect(ld.foundingDate).toBe(u.founded ? String(u.founded) : undefined);
      expect(ld.address).toEqual({ "@type": "PostalAddress", addressLocality: u.city, addressCountry: "CZ" });
      for (const n of (ld.alternateName as string[] | undefined) ?? []) expect(u.name.includes(n) || [u.searchName, u.nameLocal, u.nameAr].includes(n)).toBe(true);
    }
  });

  it("splits the abbreviation out of the display name", () => {
    expect(universityJsonLd("ctu")).toMatchObject({
      name: "Czech Technical University in Prague",
      alternateName: ["CTU", "ČVUT", "České vysoké učení technické v Praze", "الجامعة التقنية التشيكية في براغ (ČVUT)"],
      foundingDate: "1707",
    });
    expect(universityJsonLd("nope")).toBeUndefined();
  });
});
