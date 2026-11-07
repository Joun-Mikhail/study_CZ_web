import type { Metadata } from "next";
import { PROGRAMME_FIELDS, filterProgrammes, getProgrammesByUniversity } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { City, Programme } from "@/data/types";

export function slugify(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Plzeň -> Plzen, Ústí -> Usti (instead of dropping the letter)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function deslugify(slug: string): string {
  return slug.replace(/-/g, " ");
}

export function fieldToSlug(field: string): string {
  return slugify(field) + "-in-czech-republic";
}

export function slugToField(slug: string): string | undefined {
  const raw = slug.replace(/-in-czech-republic$/, "");
  return PROGRAMME_FIELDS.find(
    (f) => slugify(f) === raw
  );
}

export function cityToSlug(city: string): string {
  return "in-" + slugify(city);
}

export function slugToCity(slug: string): City | undefined {
  const raw = slug.replace(/^in-/, "");
  const cities = [...new Set(universitiesV2.map((u) => u.city))];
  return cities.find((c) => slugify(c) === raw);
}

export function getAllFieldSlugs(): string[] {
  return PROGRAMME_FIELDS.map(fieldToSlug);
}

export function getAllCitySlugs(): string[] {
  const cities = [...new Set(universitiesV2.map((u) => u.city))];
  return cities.map(cityToSlug);
}

const DEGREE_LEVELS = ["Bachelor", "Master"] as const;

export function degreeToSlug(degree: string): string {
  return slugify(degree) + "-programmes-in-czech-republic";
}

export function slugToDegree(slug: string): string | undefined {
  const raw = slug.replace(/-programmes-in-czech-republic$/, "");
  return DEGREE_LEVELS.find((d) => slugify(d) === raw);
}

export function getAllDegreeSlugs(): string[] {
  return DEGREE_LEVELS.map(degreeToSlug);
}

/** The programmes a /study/<slug>/ page lists (the same filter StudyPageClient applies). */
export function studyPageProgrammes(slug: string): Programme[] {
  const uniLookup = universitiesV2.map((u) => ({ id: u.id, city: u.city, type: u.type, name: u.name }));
  const field = slugToField(slug);
  if (field) return filterProgrammes({ field }, uniLookup);
  const city = slugToCity(slug);
  if (city) return filterProgrammes({ city }, uniLookup);
  const degree = slugToDegree(slug);
  if (degree) return filterProgrammes({ degree }, uniLookup);
  return [];
}

// A field, city or university with no programmes yet renders an empty
// template ("No programmes in this category yet", "Coming soon"). Search
// engines read those as soft 404s, so they stay reachable for visitors but
// carry noindex and are left out of the sitemap until programmes are added.
const NOINDEX: Metadata["robots"] = { index: false, follow: true };

export function studyPageIndexable(slug: string): boolean {
  return studyPageProgrammes(slug).length > 0;
}

export function universityPageIndexable(id: string): boolean {
  return getProgrammesByUniversity(id).length > 0;
}

export function noindexUnless(indexable: boolean): Pick<Metadata, "robots"> {
  return indexable ? {} : { robots: NOINDEX };
}
