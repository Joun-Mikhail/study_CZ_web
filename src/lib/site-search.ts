import { universitiesV2 } from "@/data/universities-v2";
import { programmes } from "@/data/programmes";
import type { Programme, UniversityV2 } from "@/data/types";
import { qaCategories, qaEntries } from "@/data/qa";
import { stageOrder, stages } from "@/data/stages";
import { QA_CATEGORY_KEYWORDS, SITE_PAGES, STAGE_KEYWORDS } from "@/data/site-pages";
import { AR_PAGE_META, CITY_AR, DEGREE_VALUE_AR, FIELD_AR, LANGUAGE_AR } from "@/i18n/ar-metadata";

/**
 * Site search over universities, programmes, guide pages and Q&A answers,
 * in English and Arabic.
 *
 * Text is folded before matching so that "Plzen" finds "Plzeň", "PRAGUE"
 * finds "Prague", and "جامعة" finds "جامعه". A query matches when every word
 * appears somewhere in the record (in either language), so "medicine prague"
 * works even though no single field contains both words.
 */

/** Lower-case, strip accents and Arabic diacritics, unify Arabic letter variants. */
export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "") // Latin accents (ň → n) and Arabic harakat
    .toLowerCase()
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ـ/g, "") // tatweel
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/** Query words, each already normalised. Drops the Arabic article so "الهندسة" also finds "هندسة". */
export function searchTerms(query: string): string[] {
  return normalizeSearchText(query)
    .split(" ")
    .filter(Boolean)
    .map((w) => (w.length > 3 && w.startsWith("ال") ? w.slice(2) : w));
}

/** Fields of one record, weighted: a hit in the name ranks above a hit in the description. */
type Haystack = { strong: string; medium: string; weak: string };

function hay(strong: (string | undefined)[], medium: (string | undefined)[], weak: (string | undefined)[]): Haystack {
  const join = (parts: (string | undefined)[]) => normalizeSearchText(parts.filter(Boolean).join(" "));
  return { strong: join(strong), medium: join(medium), weak: join(weak) };
}

/** 0 when some word is missing; otherwise higher means a better match. */
function score(h: Haystack, terms: string[]): number {
  let total = 0;
  for (const t of terms) {
    if (h.strong.includes(t)) total += 3;
    else if (h.medium.includes(t)) total += 2;
    else if (h.weak.includes(t)) total += 1;
    else return 0;
  }
  return total;
}

const uniById = new Map(universitiesV2.map((u) => [u.id, u]));

// Built once per page load; the dataset is small (tens of universities, ~100 programmes).
const universityIndex = universitiesV2.map((u) => ({
  item: u,
  hay: hay(
    [u.name, u.nameAr, u.nameLocal, u.searchName],
    [u.city, CITY_AR[u.city], ...u.fields, ...u.fields.map((f) => FIELD_AR[f])],
    [u.blurb.en, u.blurb.ar]
  ),
}));

const programmeIndex = programmes.map((p) => {
  const uni = uniById.get(p.universityId);
  return {
    item: p,
    hay: hay(
      [p.name.en, p.name.ar],
      [p.field, FIELD_AR[p.field], p.subfield, p.subfield && FIELD_AR[p.subfield], p.faculty, uni?.name, uni?.nameAr, uni?.searchName, uni?.city, uni && CITY_AR[uni.city]],
      [p.degree, DEGREE_VALUE_AR[p.degree], p.language, LANGUAGE_AR[p.language], uni?.nameLocal]
    ),
  };
});

/** A guide, tool or service page, or one Q&A answer, as shown in search results. */
export type PageResult = {
  /** Internal URL ending in "/" (Q&A answers add "#<id>"). */
  href: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
};

/** "Deadlines | Study in CZ Deadline Tracker" -> "Deadlines": the site name is noise in a result list. */
function shortTitle(title: string): string {
  return title.split(" | ")[0];
}

const pageIndex = [
  ...SITE_PAGES.map((p) => {
    const ar = AR_PAGE_META[p.path];
    return {
      item: {
        href: p.path,
        title: { en: shortTitle(p.title), ar: shortTitle(ar?.title ?? p.title) },
        description: { en: p.description, ar: ar?.description ?? p.description },
      },
      hay: hay([p.title, ar?.title], [...p.keywords.en, ...p.keywords.ar], [p.description, ar?.description]),
    };
  }),
  ...stageOrder.map((slug) => {
    const s = stages[slug];
    const kw = STAGE_KEYWORDS[slug];
    return {
      item: { href: `/stage/${slug}/`, title: s.h1, description: s.intro },
      hay: hay(
        [s.h1.en, s.h1.ar],
        [...kw.en, ...kw.ar, ...s.tools.flatMap((t) => [t.label.en, t.label.ar])],
        [s.intro.en, s.intro.ar]
      ),
    };
  }),
];

const categoryLabel = new Map(qaCategories.map((c) => [c.key, c.label]));

// One entry per answer, linking to its anchor on /qa/ (the accordion opens it).
const qaIndex = qaEntries.map((e) => {
  const label = categoryLabel.get(e.category) ?? { en: "", ar: "" };
  const kw = QA_CATEGORY_KEYWORDS[e.category];
  return {
    item: { href: `/qa/#${e.id}`, title: e.q, description: label },
    hay: hay([e.q.en, e.q.ar], [label.en, label.ar, ...kw.en, ...kw.ar], [e.a.en, e.a.ar]),
  };
});

function rank<T>(index: { item: T; hay: Haystack }[], terms: string[]): T[] {
  return index
    .map((e) => ({ item: e.item, s: score(e.hay, terms) }))
    .filter((e) => e.s > 0)
    .sort((a, b) => b.s - a.s) // stable: equal scores keep data order
    .map((e) => e.item);
}

export type SiteSearchResults = {
  universities: UniversityV2[];
  programmes: Programme[];
  pages: PageResult[];
  qa: PageResult[];
};

export function searchSite(query: string): SiteSearchResults {
  const terms = searchTerms(query);
  if (terms.length === 0) return { universities: [], programmes: [], pages: [], qa: [] };
  return {
    universities: rank(universityIndex, terms),
    programmes: rank(programmeIndex, terms),
    pages: rank(pageIndex, terms),
    qa: rank(qaIndex, terms),
  };
}

export function universityOf(p: Programme): UniversityV2 | undefined {
  return uniById.get(p.universityId);
}
