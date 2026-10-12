"use client";

import Link from "@/components/locale-link";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "@/i18n/context";

const SITE_URL = "https://studyczechia.com";

type Crumb = { label: string; href?: string };

/** Arabic for the fixed labels that server pages pass in English. */
const AR_LABELS: Record<string, string> = { Programmes: "البرامج", Universities: "الجامعات", Compare: "المقارنة" };

export function Breadcrumbs({ items: rawItems }: { items: Crumb[] }) {
  const { locale } = useTranslation();
  const base = locale === "ar" ? `${SITE_URL}/ar` : SITE_URL;
  const items = locale === "ar" ? rawItems.map((item) => ({ ...item, label: AR_LABELS[item.label] ?? item.label })) : rawItems;
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const jsonLdItems = [
    { name: homeLabel, url: `${base}/` },
    ...items.map((item) => ({
      name: item.label,
      url: item.href ? `${base}${item.href}/` : undefined,
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: jsonLdItems
      .filter((item) => item.url)
      .map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-muted mb-6 flex-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/" className="hover:text-text-primary transition-colors" aria-label={homeLabel}>
        <Home className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="sr-only">{homeLabel}</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 rtl:rotate-180" />
          {item.href ? (
            <Link href={item.href} className="hover:text-text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-secondary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
