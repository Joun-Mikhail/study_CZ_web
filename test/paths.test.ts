import { hasArabicVersion, localeFromPath, localizeHref, pathForLocale, stripLocale } from "@/i18n/paths";

describe("stripLocale", () => {
  it("removes the /ar prefix", () => {
    expect(stripLocale("/ar/services/")).toBe("/services/");
    expect(stripLocale("/ar")).toBe("/");
    expect(stripLocale("/ar/")).toBe("/");
    expect(stripLocale("/services/")).toBe("/services/");
  });

  it("doesn't touch paths that merely start with 'ar'", () => {
    expect(stripLocale("/arrival/")).toBe("/arrival/");
  });
});

describe("localeFromPath", () => {
  it("detects Arabic only under /ar", () => {
    expect(localeFromPath("/ar/courses/")).toBe("ar");
    expect(localeFromPath("/ar")).toBe("ar");
    expect(localeFromPath("/arrival/")).toBe("en");
    expect(localeFromPath(null)).toBe("en");
  });
});

describe("pathForLocale", () => {
  it("maps between English and Arabic twins", () => {
    expect(pathForLocale("/services/", "ar")).toBe("/ar/services/");
    expect(pathForLocale("/", "ar")).toBe("/ar/");
    expect(pathForLocale("/ar/services/", "en")).toBe("/services/");
    expect(pathForLocale("/ar/", "en")).toBe("/");
  });

  it("keeps admin pages English-only", () => {
    expect(hasArabicVersion("/admin/")).toBe(false);
    expect(pathForLocale("/admin/", "ar")).toBe("/admin/");
  });
});

describe("localizeHref", () => {
  it("leaves English links alone", () => {
    expect(localizeHref("/services/", "en")).toBe("/services/");
  });

  it("prefixes internal links on Arabic pages", () => {
    expect(localizeHref("/services/", "ar")).toBe("/ar/services/");
    expect(localizeHref("/", "ar")).toBe("/ar/");
    expect(localizeHref("/services/?k=1#faq", "ar")).toBe("/ar/services/?k=1#faq");
  });

  it("skips external links, files, admin and already-Arabic links", () => {
    expect(localizeHref("https://wa.me/420703982237", "ar")).toBe("https://wa.me/420703982237");
    expect(localizeHref("//cdn.example.com/x", "ar")).toBe("//cdn.example.com/x");
    expect(localizeHref("/images/brno.jpg", "ar")).toBe("/images/brno.jpg");
    expect(localizeHref("/admin/", "ar")).toBe("/admin/");
    expect(localizeHref("/ar/courses/", "ar")).toBe("/ar/courses/");
  });
});
