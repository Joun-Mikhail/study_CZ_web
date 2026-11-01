import { universitiesV2 } from "@/data/universities-v2";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

/**
 * schema.org CollegeOrUniversity for a /university/<id>/ page, built only from
 * what universities-v2.ts stores (and the page already shows): the official
 * site, the Czech name and abbreviations, the city and the founding year.
 */
export function universityJsonLd(id: string): Record<string, unknown> | undefined {
  const u = universitiesV2.find((x) => x.id === id);
  if (!u) return undefined;
  // "Czech Technical University in Prague (CTU)" -> name + "CTU" as an alternate name
  const [name, abbr] = u.name.split(/ \((.+)\)$/);
  const alternateName = [...new Set([...(abbr?.split(" / ") ?? []), u.searchName, u.nameLocal, u.nameAr].filter((n): n is string => !!n && n !== name))];
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${SITE_URL}/university/${id}/#university`,
    name,
    ...(alternateName.length ? { alternateName } : {}),
    url: u.website,
    ...(u.founded ? { foundingDate: String(u.founded) } : {}),
    address: { "@type": "PostalAddress", addressLocality: u.city, addressCountry: "CZ" },
  };
}
