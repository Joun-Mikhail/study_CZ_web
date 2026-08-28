import type { MetadataRoute } from "next";
import { universities } from "@/data/universities";
import { programmes } from "@/data/programmes";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/courses",
    "/universities",
    "/scholarships",
    "/cost-of-living",
    "/application-guide",
    "/qa",
    "/university-matcher",
    "/services",
    "/preparatory-year",
    "/contact",
    "/eligibility",
    "/what-it-costs",
    "/deadlines",
    "/interview-prep",
    "/questions-to-ask",
    "/search",
    "/programmes/compare",
    "/about",
    "/terms",
    "/privacy",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const universityRoutes = universities.map((u) => ({
    url: `${SITE_URL}/university/${u.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const programmeRoutes = programmes.map((p) => ({
    url: `${SITE_URL}/programmes/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...universityRoutes, ...programmeRoutes];
}
