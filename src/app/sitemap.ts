import type { MetadataRoute } from "next";
import { universities } from "@/data/universities";
import { programmes, PROGRAMME_FIELDS } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { fieldToSlug, cityToSlug } from "@/lib/seo-utils";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/courses",
    "/universities",
    "/programmes",
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
    "/my-journey",
    "/about",
    "/terms",
    "/privacy",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route === "/programmes" ? 0.9 : 0.8,
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

  const fieldRoutes = PROGRAMME_FIELDS.map((f) => ({
    url: `${SITE_URL}/study/${fieldToSlug(f)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cities = [...new Set(universitiesV2.map((u) => u.city))];
  const cityRoutes = cities.map((c) => ({
    url: `${SITE_URL}/study/${cityToSlug(c)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const intentRoutes = [
    "/study/cheapest-programmes",
    "/study/no-entrance-exam",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...universityRoutes,
    ...programmeRoutes,
    ...fieldRoutes,
    ...cityRoutes,
    ...intentRoutes,
  ];
}
