import { getProgrammesByUniversity } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { cityToSlug, fieldToSlug, getAllFieldSlugs, studyPageIndexable, universityPageIndexable } from "@/lib/seo-utils";

export type RelatedUniversity = { id: string; name: { en: string; ar?: string }; city: string };

export type UniversityLinks = {
  city?: { slug: string; name: string };
  fields: { slug: string; name: string }[];
  related: RelatedUniversity[];
};

/**
 * Links for a university page: its city hub, the field hubs of its listed
 * programmes, and other universities to look at (same city first, then ones
 * teaching the same fields). Ties go in alphabetical order starting after this
 * university, so pages in a big city like Prague link to different neighbours
 * instead of all pointing at the same four. Empty (noindexed) pages are left out.
 */
export function universityLinks(id: string, limit = 4): UniversityLinks {
  const uni = universitiesV2.find((u) => u.id === id);
  if (!uni) return { fields: [], related: [] };
  const fieldsOf = (uid: string) => new Set(getProgrammesByUniversity(uid).map((p) => p.field));
  const own = fieldsOf(id);
  const shared = (uid: string) => [...fieldsOf(uid)].filter((f) => own.has(f)).length;
  const ids = universitiesV2.map((u) => u.id).sort();
  const after = (uid: string) => (ids.indexOf(uid) - ids.indexOf(id) + ids.length) % ids.length;
  const related = universitiesV2
    .filter((u) => u.id !== id && universityPageIndexable(u.id) && (u.city === uni.city || shared(u.id) > 0))
    .sort(
      (a, b) =>
        Number(b.city === uni.city) - Number(a.city === uni.city) ||
        shared(b.id) - shared(a.id) ||
        after(a.id) - after(b.id)
    )
    .slice(0, limit)
    .map((u) => ({ id: u.id, name: { en: u.name, ar: u.nameAr }, city: u.city }));
  const citySlug = cityToSlug(uni.city);
  return {
    ...(studyPageIndexable(citySlug) ? { city: { slug: citySlug, name: uni.city } } : {}),
    fields: [...own]
      .sort()
      .filter((f) => getAllFieldSlugs().includes(fieldToSlug(f)) && studyPageIndexable(fieldToSlug(f)))
      .map((f) => ({ slug: fieldToSlug(f), name: f })),
    related,
  };
}
