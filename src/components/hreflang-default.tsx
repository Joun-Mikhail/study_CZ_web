"use client";

import { usePathname } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studyczechia.com";

// Pages that are noindexed / not part of the public site get no alternates.
const SKIP_PREFIXES = ["/courses/learn", "/admin", "/404", "/_not-found"];

// The site has one URL per page; Arabic is a client-side toggle on that same
// URL (no /ar/ routes exist). So the only honest annotation is a
// self-referencing x-default. An hreflang="ar" tag would have to point at a
// URL that doesn't exist and would show up as a broken alternate in Search
// Console.
export function HreflangDefault() {
  const pathname = usePathname();
  if (!pathname || SKIP_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />;
}
