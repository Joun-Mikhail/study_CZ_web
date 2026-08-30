"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const SITE_URL = "https://studyczechia.com";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLdItems = [
    { name: "Home", url: `${SITE_URL}/` },
    ...items.map((item) => ({
      name: item.label,
      url: item.href ? `${SITE_URL}${item.href}/` : undefined,
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
      <Link href="/" className="hover:text-text-primary transition-colors">
        <Home className="w-3.5 h-3.5" />
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
