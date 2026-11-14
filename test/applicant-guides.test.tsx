import { ApplicantGuides } from "@/components/applicant-guides";
import { SITE_PAGES } from "@/data/site-pages";
import { renderAt } from "./render";

const hrefs = (pathname: string) =>
  // Next adds the trailing slash at build time (trailingSlash: true); the test renderer does not.
  [...renderAt(<ApplicantGuides />, pathname).container.querySelectorAll("a")].map((a) => a.getAttribute("href")!.replace(/\/?$/, "/"));

describe("ApplicantGuides", () => {
  it("links the Egypt guides, each a real page with a trailing slash", () => {
    const links = hrefs("/programmes/x/");
    expect(links[0]).toBe("/study-in-czechia-from-egypt/");
    expect(links).toContain("/student-visa-egypt/");
    const known = new Set(SITE_PAGES.map((p) => p.path));
    for (const h of links) expect(known.has(h), h).toBe(true);
  });

  it("points at the Arabic pages from Arabic pages", () => {
    for (const h of hrefs("/ar/programmes/x/")) expect(h).toMatch(/^\/ar\/.+\/$/);
  });
});
