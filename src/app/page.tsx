import type { Metadata } from "next";
import HomeClient, { type HomeFacts } from "./HomeClient";
import { programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { CITY_IMAGE } from "@/data/images";
import { cityToSlug } from "@/lib/seo-utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The Organization structured data lives in the root layout, so every page
// (not only this one) carries it.

// Computed at build time, so the client bundle never loads the full data files.
const facts: HomeFacts = {
  programmeCount: programmes.length,
  universityCount: universitiesV2.length,
  lowestTuition: Math.min(...programmes.filter((p) => p.language === "English").map((p) => p.tuitionEurPerYear)),
  // University cities that have a photo and at least one programme on the
  // site, by number of programmes. A card reading "0 programmes" made the
  // catalogue look empty, so those cities wait until a programme is added.
  cities: Object.keys(CITY_IMAGE)
    .map((name) => {
      const uniIds = new Set(universitiesV2.filter((u) => u.city === name).map((u) => u.id));
      return { name, slug: cityToSlug(name), programmes: programmes.filter((p) => uniIds.has(p.universityId)).length };
    })
    .filter((c) => c.programmes > 0)
    .sort((a, b) => b.programmes - a.programmes),
};

export default function Home() {
  return (
    <HomeClient facts={facts} />
  );
}
