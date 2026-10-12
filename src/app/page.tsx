import type { Metadata } from "next";
import HomeClient, { type HomeFacts } from "./HomeClient";
import { programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { CITY_IMAGE } from "@/data/images";
import { cityToSlug } from "@/lib/seo-utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

// Only facts already published on the site: name and description come from
// the site's own metadata, the Facebook group is the community linked in the
// footer. No logo or other profiles are declared because none exist in the repo.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Study Czechia",
  alternateName: "studyczechia",
  url: `${SITE_URL}/`,
  description:
    "Free guides, university matching, cost-of-living tools, and expert support for Arabic-speaking students studying in the Czech Republic.",
  areaServed: { "@type": "Country", name: "Czech Republic" },
  sameAs: ["https://www.facebook.com/groups/czechiastudents"],
};

// Computed at build time, so the client bundle never loads the full data files.
const facts: HomeFacts = {
  programmeCount: programmes.length,
  universityCount: universitiesV2.length,
  lowestTuition: Math.min(...programmes.filter((p) => p.language === "English").map((p) => p.tuitionEurPerYear)),
  // Every university city that has a photo, by number of programmes.
  cities: Object.keys(CITY_IMAGE)
    .map((name) => {
      const uniIds = new Set(universitiesV2.filter((u) => u.city === name).map((u) => u.id));
      return { name, slug: cityToSlug(name), programmes: programmes.filter((p) => uniIds.has(p.universityId)).length };
    })
    .sort((a, b) => b.programmes - a.programmes),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomeClient facts={facts} />
    </>
  );
}
