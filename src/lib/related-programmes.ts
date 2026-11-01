import { programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import type { Programme } from "@/data/types";
import {
  cityToSlug,
  degreeToSlug,
  fieldToSlug,
  getAllDegreeSlugs,
  getAllFieldSlugs,
  studyPageIndexable,
} from "@/lib/seo-utils";

export type RelatedProgramme = { id: string; name: { en: string; ar?: string }; university: { en: string; ar?: string } };

export type ProgrammeHubs = {
  field?: { slug: string; name: string };
  city?: { slug: string; name: string };
  degree?: { slug: string; name: string };
};

/**
 * Other programmes to link from a programme page: the same field first (same
 * subfield, then same degree level, then other universities), topped up with the
 * same university's other programmes when the field is small.
 */
export function relatedProgrammes(p: Programme, limit = 4): RelatedProgramme[] {
  const others = programmes.filter((o) => o.id !== p.id);
  const sameField = others
    .filter((o) => o.field === p.field)
    .sort(
      (a, b) =>
        Number(b.subfield === p.subfield) - Number(a.subfield === p.subfield) ||
        Number(b.degree === p.degree) - Number(a.degree === p.degree) ||
        Number(a.universityId === p.universityId) - Number(b.universityId === p.universityId) ||
        a.id.localeCompare(b.id)
    );
  const sameUniversity = others.filter((o) => o.universityId === p.universityId && o.field !== p.field);
  return [...sameField, ...sameUniversity].slice(0, limit).map((o) => {
    const uni = universitiesV2.find((u) => u.id === o.universityId);
    return { id: o.id, name: o.name, university: { en: uni?.name ?? o.universityId, ar: uni?.nameAr } };
  });
}

/** The /study/ hubs a programme belongs to, leaving out empty (noindexed) ones. */
export function programmeHubs(p: Programme): ProgrammeHubs {
  const city = universitiesV2.find((u) => u.id === p.universityId)?.city;
  const field = fieldToSlug(p.field);
  const degree = degreeToSlug(p.degree);
  return {
    ...(getAllFieldSlugs().includes(field) && studyPageIndexable(field) ? { field: { slug: field, name: p.field } } : {}),
    ...(city && studyPageIndexable(cityToSlug(city)) ? { city: { slug: cityToSlug(city), name: city } } : {}),
    ...(getAllDegreeSlugs().includes(degree) ? { degree: { slug: degree, name: p.degree } } : {}),
  };
}
