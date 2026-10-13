import { cn } from "@/lib/utils";

/**
 * A quiet, static background for a section: a muted colour wash with paper
 * grain on top. Put it first inside a `relative isolate overflow-hidden`
 * parent. No animation and no JavaScript.
 *
 *   - "hero": warm charcoal over a photo, a hint of terracotta and forest.
 *   - "dark": an opaque charcoal band with a faint forest tint.
 *   - "section": the page's own paper tone, a little warmer at the edges.
 */
type Variant = "hero" | "section" | "dark";

const WASH: Record<Variant, string> = {
  hero: [
    "radial-gradient(60% 70% at 85% 15%, rgba(198,123,92,0.22), transparent 70%)",
    "radial-gradient(50% 60% at 10% 100%, rgba(74,103,65,0.25), transparent 70%)",
    "linear-gradient(100deg, rgba(28,26,24,0.94) 0%, rgba(28,26,24,0.86) 45%, rgba(28,26,24,0.62) 100%)",
  ].join(", "),
  dark: [
    "radial-gradient(55% 70% at 100% 0%, rgba(74,103,65,0.28), transparent 70%)",
    "radial-gradient(45% 60% at 0% 100%, rgba(198,123,92,0.14), transparent 70%)",
    "#1c1a18",
  ].join(", "),
  section: [
    "radial-gradient(50% 60% at 0% 0%, color-mix(in srgb, var(--color-coral) 7%, transparent), transparent 70%)",
    "radial-gradient(50% 60% at 100% 100%, color-mix(in srgb, var(--color-teal) 7%, transparent), transparent 70%)",
    "var(--color-bg-subtle)",
  ].join(", "),
};

export function TexturedBackground({ variant = "section", className }: { variant?: Variant; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      <div className="absolute inset-0" style={{ background: WASH[variant] }} />
      <div className={cn("absolute inset-0", variant === "section" ? "paper" : "paper-light")} />
    </div>
  );
}
