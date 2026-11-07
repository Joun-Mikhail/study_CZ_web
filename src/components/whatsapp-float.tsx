"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappWithContext } from "@/config/contact";
import { stripLocale } from "@/i18n/paths";
import { useTranslation } from "@/i18n/context";
import { cn } from "@/lib/utils";

/** What the pre-filled WhatsApp message says the question is about. */
function topicFor(path: string): string {
  if (path.startsWith("/courses/learn")) return "a course lesson";
  if (path.startsWith("/courses")) return "the First 90 Days course";
  if (path.startsWith("/services")) return "your services";
  if (path.startsWith("/eligibility")) return "my eligibility check";
  if (path.startsWith("/university-matcher")) return "the programme matcher";
  if (path.startsWith("/programmes/") && path.length > "/programmes/".length) return `the programme page ${path}`;
  if (path.startsWith("/university/")) return `the university page ${path}`;
  if (path.startsWith("/thanks")) return "my payment";
  if (path === "/" || path === "") return "studying in Czechia";
  return `the page ${path}`;
}

/**
 * One floating WhatsApp button on every page. It fades out while any link,
 * button or form field is underneath it, so it never covers a buy button or
 * a call to action.
 */
export function WhatsAppFloat() {
  const pathname = usePathname() || "/";
  const { locale } = useTranslation();
  const ref = useRef<HTMLAnchorElement>(null);
  const [covering, setCovering] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Test a slightly larger area than the button, so it hides before it overlaps.
      const m = 6;
      const points: [number, number][] = [
        [r.left + r.width / 2, r.top + r.height / 2],
        [r.left - m, r.top - m],
        [r.right + m, r.top - m],
        [r.left - m, r.bottom + m],
        [r.right + m, r.bottom + m],
        [r.left + r.width / 2, r.top - m],
        [r.left + r.width / 2, r.bottom + m],
      ];
      const hit = points.some(([x, y]) =>
        document
          .elementsFromPoint(x, y)
          .some((node) => !el.contains(node) && node instanceof HTMLElement && node.closest("a, button, input, select, textarea, [role=button]"))
      );
      setCovering(hit);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const timer = window.setInterval(schedule, 1500); // content that appears without scrolling
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.clearInterval(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  if (pathname.includes("/admin")) return null;
  const path = stripLocale(pathname).replace(/\/$/, "") || "/";

  // Inside its own landmark, so every bit of the page belongs to one
  // (axe "region"); the button itself is fixed to the corner as before.
  return (
    <aside aria-label="WhatsApp">
    <a
      ref={ref}
      href={whatsappWithContext(topicFor(path))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={locale === "ar" ? "كلمني على واتساب" : "Message me on WhatsApp"}
      aria-hidden={covering || undefined}
      tabIndex={covering ? -1 : undefined}
      className={cn(
        "fixed bottom-5 end-5 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-[opacity,box-shadow] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366]",
        covering && "opacity-0 pointer-events-none"
      )}
    >
      <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />
    </a>
    </aside>
  );
}
