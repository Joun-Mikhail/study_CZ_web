import { PROGRAMME_FIELDS } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { City } from "@/data/types";

export function slugify(str: string): string {
  return str
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
