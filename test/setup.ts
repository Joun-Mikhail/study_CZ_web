import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { vi } from "vitest";

// The current URL path for the Next.js navigation mocks; set via renderAt().
export const navigation = { pathname: "/" };

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

// next/image needs the Next.js build config; a plain <img> is enough here.
vi.mock("next/image", () => ({
  default: ({ src, alt, ...rest }: Record<string, unknown>) => {
    const img = { ...rest };
    delete img.fill;
    delete img.priority;
    return createElement("img", { src: typeof src === "string" ? src : "", alt, ...img });
  },
}));

// Browser APIs jsdom doesn't provide (used by framer-motion and the theme toggle).
class NoopIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.assign(globalThis, { IntersectionObserver: NoopIntersectionObserver });
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
window.scrollTo = () => {};

// Newer Node versions ship their own (disabled) localStorage that shadows
// jsdom's; give every test a working in-memory one.
class MemoryStorage implements Storage {
  private items = new Map<string, string>();
  get length() {
    return this.items.size;
  }
  clear() {
    this.items.clear();
  }
  getItem(key: string) {
    return this.items.get(key) ?? null;
  }
  key(index: number) {
    return [...this.items.keys()][index] ?? null;
  }
  removeItem(key: string) {
    this.items.delete(key);
  }
  setItem(key: string, value: string) {
    this.items.set(key, String(value));
  }
}
for (const name of ["localStorage", "sessionStorage"] as const) {
  Object.defineProperty(window, name, { value: new MemoryStorage(), configurable: true });
  Object.defineProperty(globalThis, name, { value: window[name], configurable: true });
}
