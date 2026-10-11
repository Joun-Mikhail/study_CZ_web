import { fieldToSlug, slugify } from "@/lib/seo-utils";

describe("slugify", () => {
  it("transliterates Czech letters instead of dropping them", () => {
    expect(slugify("Plzeň")).toBe("plzen");
    expect(slugify("Ústí nad Labem")).toBe("usti-nad-labem");
    expect(slugify("Zlín")).toBe("zlin");
    expect(slugify("České Budějovice")).toBe("ceske-budejovice");
  });

  it("collapses punctuation and trims dashes", () => {
    expect(slugify("  Business & Economics! ")).toBe("business-economics");
  });

  it("builds field page slugs", () => {
    expect(fieldToSlug("Medicine")).toBe("medicine-in-czech-republic");
  });
});
