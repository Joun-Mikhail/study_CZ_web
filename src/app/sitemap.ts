import type { MetadataRoute } from "next";
import { universities } from "@/data/universities";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.netlify.app";

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

  return [...staticRoutes, ...universityRoutes];
}
