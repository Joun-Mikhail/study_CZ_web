import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import { universities } from "@/data/universities";
import { programmes, PROGRAMME_FIELDS } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { stageOrder } from "@/data/stages";
import { fieldToSlug, cityToSlug, degreeToSlug } from "@/lib/seo-utils";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

// lastmod = date of the last git commit touching the page's own source (and
// the data file it renders, where relevant). If git history isn't available
// at build time we omit lastmod entirely rather than publish a made-up date:
// Google ignores lastmod values that prove unreliable.
const gitDateCache = new Map<string, Date | undefined>();

function gitDate(paths: string[]): Date | undefined {
  const key = paths.join("|");
  if (gitDateCache.has(key)) return gitDateCache.get(key);
  let result: Date | undefined;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (out) result = new Date(out);
  } catch {
    result = undefined;
  }
  gitDateCache.set(key, result);
  return result;
}

// Trailing slash on every URL: next.config sets trailingSlash: true, every
// page's canonical ends in "/", and the live host 301s the slashless form --
// so a slashless <loc> would be a redirect, not the canonical URL.
function entry(route: string, priority: number, sources: string[]): MetadataRoute.Sitemap[number] {
  const lastModified = gitDate(sources);
  return {
    url: route === "" ? `${SITE_URL}/` : `${SITE_URL}${route}/`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: "monthly",
    priority,
  };
}

const STATIC_ROUTES: { route: string; priority: number; sources: string[] }[] = [
  { route: "", priority: 1, sources: ["src/app/page.tsx", "src/app/HomeClient.tsx", "src/components/stage-router.tsx"] },
  { route: "/courses", priority: 0.8, sources: ["src/app/courses/page.tsx", "src/app/courses/CoursesClient.tsx", "src/data/course.ts"] },
  { route: "/universities", priority: 0.8, sources: ["src/app/universities", "src/data/universities-v2.ts"] },
  { route: "/programmes", priority: 0.9, sources: ["src/app/programmes/page.tsx", "src/app/programmes/ProgrammesClient.tsx", "src/data/programmes.ts"] },
  { route: "/scholarships", priority: 0.8, sources: ["src/app/scholarships"] },
  { route: "/cost-of-living", priority: 0.8, sources: ["src/app/cost-of-living", "src/data/costs.ts"] },
  { route: "/application-guide", priority: 0.8, sources: ["src/app/application-guide", "src/data/guide.ts"] },
  { route: "/qa", priority: 0.8, sources: ["src/app/qa", "src/data/qa.ts"] },
  { route: "/university-matcher", priority: 0.8, sources: ["src/app/university-matcher", "src/data/programmes.ts"] },
  { route: "/services", priority: 0.8, sources: ["src/app/services"] },
  { route: "/preparatory-year", priority: 0.8, sources: ["src/app/preparatory-year", "src/data/preparatory-programs.ts"] },
  { route: "/contact", priority: 0.8, sources: ["src/app/contact"] },
  { route: "/eligibility", priority: 0.8, sources: ["src/app/eligibility"] },
  { route: "/what-it-costs", priority: 0.8, sources: ["src/app/what-it-costs"] },
  { route: "/deadlines", priority: 0.8, sources: ["src/app/deadlines", "src/data/programmes.ts"] },
  { route: "/interview-prep", priority: 0.8, sources: ["src/app/interview-prep"] },
  { route: "/arrival", priority: 0.8, sources: ["src/app/arrival"] },
  { route: "/questions-to-ask", priority: 0.8, sources: ["src/app/questions-to-ask"] },
  { route: "/search", priority: 0.8, sources: ["src/app/search", "src/data/universities.ts"] },
  { route: "/programmes/compare", priority: 0.8, sources: ["src/app/programmes/compare"] },
  { route: "/my-journey", priority: 0.8, sources: ["src/app/my-journey"] },
  { route: "/about", priority: 0.8, sources: ["src/app/about"] },
  { route: "/terms", priority: 0.8, sources: ["src/app/terms"] },
  { route: "/privacy", priority: 0.8, sources: ["src/app/privacy"] },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = STATIC_ROUTES.map((r) => entry(r.route, r.priority, r.sources));

  const stageRoutes = stageOrder.map((slug) =>
    entry(`/stage/${slug}`, 0.8, ["src/app/stage", "src/data/stages.ts", "src/data/qa.ts"])
  );

  const universityRoutes = universities.map((u) =>
    entry(`/university/${u.id}`, 0.6, ["src/app/university", "src/data/universities.ts"])
  );

  const programmeRoutes = programmes.map((p) =>
    entry(`/programmes/${p.id}`, 0.7, ["src/app/programmes/[slug]", "src/data/programmes.ts"])
  );

  const studySources = ["src/app/study", "src/data/programmes.ts", "src/data/universities-v2.ts"];

  const fieldRoutes = PROGRAMME_FIELDS.map((f) => entry(`/study/${fieldToSlug(f)}`, 0.7, studySources));

  const cities = [...new Set(universitiesV2.map((u) => u.city))];
  const cityRoutes = cities.map((c) => entry(`/study/${cityToSlug(c)}`, 0.7, studySources));

  const degreeRoutes = (["Bachelor", "Master"] as const).map((d) =>
    entry(`/study/${degreeToSlug(d)}`, 0.7, studySources)
  );

  const intentRoutes = ["/study/cheapest-programmes", "/study/no-entrance-exam"].map((route) =>
    entry(route, 0.7, studySources)
  );

  return [
    ...staticRoutes,
    ...stageRoutes,
    ...universityRoutes,
    ...programmeRoutes,
    ...fieldRoutes,
    ...cityRoutes,
    ...degreeRoutes,
    ...intentRoutes,
  ];
}
