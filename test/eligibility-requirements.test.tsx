import EligibilityClient from "@/app/eligibility/EligibilityClient";
import { REQUIREMENT_SOURCES } from "@/app/eligibility/EligibilityRequirements";
import { renderAt } from "./render";

describe("eligibility requirements", () => {
  for (const [locale, path] of [
    ["en", "/eligibility/"],
    ["ar", "/ar/eligibility/"],
  ] as const) {
    it(`sits under the quiz with the four requirements and five topics (${locale})`, () => {
      const { container } = renderAt(<EligibilityClient />, path);
      const section = container.querySelector("#eligibility-requirements")!.parentElement!;
      expect(section.closest("main")).not.toBeNull();
      expect(section.querySelector("ol")!.querySelectorAll("li")).toHaveLength(4);
      for (const id of ["recognition", "language", "exam", "documents", "timeline"]) {
        expect(section.querySelector(`h3#requirements-${id}`), id).not.toBeNull();
      }
    });

    it(`links every official source and the related guides (${locale})`, () => {
      const { container } = renderAt(<EligibilityClient />, path);
      const section = container.querySelector("#eligibility-requirements")!.parentElement!;
      for (const url of Object.values(REQUIREMENT_SOURCES)) {
        expect(section.querySelector(`a[href="${url}"]`), url).not.toBeNull();
      }
      // next/link only keeps the trailing slash with the build's trailingSlash
      // setting, which tests don't load; the exported HTML keeps it.
      const prefix = locale === "ar" ? "/ar" : "";
      for (const href of ["/recognition/egypt", "/deadlines", "/application-guide", "/study/medicine-in-czech-republic"]) {
        const link = section.querySelector(`a[href="${prefix}${href}"], a[href="${prefix}${href}/"]`);
        expect(link, href).not.toBeNull();
      }
    });
  }
});
