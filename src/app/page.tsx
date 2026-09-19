import type { Metadata } from "next";
import HomeClient from "./HomeClient";

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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
