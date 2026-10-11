"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type ComponentProps } from "react";
import { localeFromPath, localizeHref } from "@/i18n/paths";

type Props = ComponentProps<typeof NextLink>;

/**
 * Drop-in replacement for next/link: on Arabic pages (/ar/...), internal
 * links stay in Arabic automatically, so components never hard-code a locale.
 */
const Link = forwardRef<HTMLAnchorElement, Props>(function LocaleLink({ href, ...rest }, ref) {
  const locale = localeFromPath(usePathname());
  let localized: Props["href"] = href;
  if (typeof href === "string") {
    localized = localizeHref(href, locale);
  } else if (href && typeof href === "object" && typeof href.pathname === "string") {
    localized = { ...href, pathname: localizeHref(href.pathname, locale) };
  }
  return <NextLink ref={ref} href={localized} {...rest} />;
});

export default Link;
