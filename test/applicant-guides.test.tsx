import { ApplicantGuides } from "@/components/applicant-guides";
import { SITE_PAGES } from "@/data/site-pages";
import { renderAt } from "./render";

// Next adds the trailing slash at build time (trailingSlash: true); the test renderer does not.
const hrefs = (ui: React.ReactElement, pathname = "/programmes/x/") =>
  [...renderAt(ui, pathname).container.querySelectorAll("a")].map((a) => a.getAttribute("href")!.replace(/\/?$/, "/"));

describe("ApplicantGuides", () => {
  it("links only real pages, the Egypt hub first", () => {
    const links = hrefs(<ApplicantGuides context="university" />);
    expect(links[0]).toBe("/study-in-czechia-from-egypt/");
    const known = new Set(SITE_PAGES.map((p) => p.path));
    for (const h of links) expect(known.has(h), h).toBe(true);
  });

  it("gives Bachelor applicants the school-certificate guide and Master applicants the recognition guide", () => {
    const bachelor = hrefs(<ApplicantGuides context="programme" degree="Bachelor" />);
    const master = hrefs(<ApplicantGuides context="programme" degree="Master" />);
    expect(bachelor).toContain("/thanaweya-amma-czech-university/");
    expect(master).not.toContain("/thanaweya-amma-czech-university/");
    expect(master).toContain("/recognition/egypt/");
    expect(bachelor).toHaveLength(3);
  });

  it("points at the Arabic pages from Arabic pages", () => {
    for (const h of hrefs(<ApplicantGuides context="scholarships" />, "/ar/scholarships/")) expect(h).toMatch(/^\/ar\/.+\/$/);
  });
});
