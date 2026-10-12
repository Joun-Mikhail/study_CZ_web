"use client";

// THROWAWAY PROTOTYPE for phase 3 B1: three visual directions for the
// homepage hero plus one section, and the two signature-element candidates.
// /proto/visual/?d=a|b|c — never merged, never linked, noindex.

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/components/locale-link";
import { Navbar } from "@/components/navbar";
import { useTranslation } from "@/i18n/context";
import { ArrowRight, ClipboardCheck, MapPin, X } from "lucide-react";
import { programmes } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
import { costCategories, type CityKey } from "@/data/costs";
import { CZ_MAP, project } from "@/data/czech-map";
import { CITY_AR } from "@/i18n/ar-metadata";
import { cn } from "@/lib/utils";

type Dir = "a" | "b" | "c";

const CITIES: { name: string; slug: string; lat: number; lon: number; costKey?: CityKey }[] = [
  { name: "Prague", slug: "prague", lat: 50.0755, lon: 14.4378, costKey: "prague" },
  { name: "Brno", slug: "brno", lat: 49.1951, lon: 16.6068, costKey: "brno" },
  { name: "Ostrava", slug: "ostrava", lat: 49.8209, lon: 18.2625, costKey: "ostrava" },
  { name: "Hradec Králové", slug: "hradec-kralove", lat: 50.2092, lon: 15.8328 },
  { name: "České Budějovice", slug: "ceske-budejovice", lat: 48.9745, lon: 14.4743 },
  { name: "Plzeň", slug: "plzen", lat: 49.7384, lon: 13.3736 },
  { name: "Olomouc", slug: "olomouc", lat: 49.5938, lon: 17.2509 },
  { name: "Ústí nad Labem", slug: "usti-nad-labem", lat: 50.6607, lon: 14.0323 },
  { name: "Zlín", slug: "zlin", lat: 49.2265, lon: 17.6707 },
  { name: "Pardubice", slug: "pardubice", lat: 50.0343, lon: 15.7812 },
  { name: "Opava", slug: "opava", lat: 49.9387, lon: 17.9026 },
  { name: "Mladá Boleslav", slug: "mlada-boleslav", lat: 50.4114, lon: 14.9032 },
  { name: "Liberec", slug: "liberec", lat: 50.7663, lon: 15.0543 },
  { name: "Jihlava", slug: "jihlava", lat: 49.3961, lon: 15.5912 },
];

function useCityFacts() {
  return useMemo(() => {
    const uniCity = new Map(universitiesV2.map((u) => [u.id, u.city as string]));
    const count = new Map<string, number>();
    for (const p of programmes) {
      if (p.language !== "English") continue;
      const c = uniCity.get(p.universityId);
      if (c) count.set(c, (count.get(c) ?? 0) + 1);
    }
    const rent = (k?: CityKey) => {
      if (!k) return null;
      const dorm = costCategories.find((c) => c.key === "dorm");
      return dorm ? dorm.monthlyCzk[k] : null;
    };
    return CITIES.map((c) => ({ ...c, english: count.get(c.name) ?? 0, rent: rent(c.costKey) }));
  }, []);
}

const PHOTO: Record<string, string> = { prague: "/images/prague-old-town.jpg" };

export default function VisualProto() {
  const { t, locale } = useTranslation();
  const ar = locale === "ar";
  const [dir, setDir] = useState<Dir>("a");
  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get("d");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- prototype: read the query after mount
    if (d === "a" || d === "b" || d === "c") setDir(d);
  }, []);

  const cta = ar ? "شوف لو تقدر تقدم" : "Check if you can apply";
  const second = ar ? "شوف البرامج" : "Browse programmes";

  return (
    <div className={cn("proto", `proto-${dir}`)}>
      <Navbar />
      <main id="main-content">
        {dir === "a" && <HeroA title={t.hero.title} sub={t.hero.subtitle} cta={cta} second={second} />}
        {dir === "b" && <HeroB title={t.hero.title} sub={t.hero.subtitle} cta={cta} second={second} ar={ar} />}
        {dir === "c" && <HeroC title={t.hero.title} sub={t.hero.subtitle} cta={cta} second={second} />}

        {dir === "a" && <GlobeBand ar={ar} />}
        <CitiesSection dir={dir} ar={ar} />
      </main>
    </div>
  );
}

// ── Direction A: full-bleed photo, brand-blue duotone ────────────────────────
function HeroA({ title, sub, cta, second }: { title: string; sub: string; cta: string; second: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b1f3a]">
      <div className="duotone absolute inset-0 -z-10">
        <Image src="/images/prague-cityscape.jpg" alt="" fill sizes="100vw" fetchPriority="high" loading="eager" className="proto-a-zoom object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b1f3a] via-[#0b1f3a]/60 to-transparent" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-40 sm:pb-28">
        <div className="max-w-2xl text-white">
          <h1 className="text-[2.4rem] leading-[1.1] rtl:leading-[1.35] sm:text-6xl font-semibold mb-5">{title}</h1>
          <p className="text-lg text-white/85 mb-8 max-w-xl">{sub}</p>
          <Ctas cta={cta} second={second} dark />
        </div>
      </div>
    </section>
  );
}

// ── Direction B: light hero, framed photo cards ─────────────────────────────
function HeroB({ title, sub, cta, second, ar }: { title: string; sub: string; cta: string; second: string; ar: boolean }) {
  return (
    <section className="bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-32 sm:pb-20 grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
        <div>
          <p className="flex items-center gap-3 text-sm font-semibold text-brand mb-4">
            <span aria-hidden="true" className="inline-block w-8 h-[3px] rounded-full bg-accent-red" />
            {ar ? "من طالب عاش التجربة" : "From a student who did it"}
          </p>
          <h1 className="text-[2.4rem] leading-[1.1] rtl:leading-[1.35] sm:text-6xl font-semibold text-text-primary mb-5">{title}</h1>
          <p className="text-lg text-text-secondary mb-8 max-w-xl">{sub}</p>
          <Ctas cta={cta} second={second} />
        </div>
        <div className="relative h-56 sm:h-96" aria-hidden="true">
          <Frame src="/images/prague-bridge.jpg" className="proto-b-card absolute top-0 start-0 w-[62%] h-[78%] rotate-[-2deg]" />
          <Frame src="/images/university-campus.jpg" className="proto-b-card absolute bottom-0 end-0 w-[55%] h-[62%] rotate-[2deg] [animation-delay:120ms]" />
        </div>
      </div>
    </section>
  );
}

function Frame({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-3xl border-[6px] border-surface shadow-[0_24px_48px_-28px_rgba(11,31,58,0.55)]", className)}>
      <div className="relative w-full h-full">
        <Image src={src} alt="" fill sizes="(max-width: 1024px) 60vw, 30vw" className="object-cover" />
      </div>
    </div>
  );
}

// ── Direction C: documentary collage ────────────────────────────────────────
function HeroC({ title, sub, cta, second }: { title: string; sub: string; cta: string; second: string }) {
  return (
    <section className="relative bg-surface-raised overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-32 sm:pb-20">
        <div className="grid grid-cols-6 grid-rows-[90px_90px] sm:grid-rows-[150px_150px] gap-2 sm:gap-3 mb-8" aria-hidden="true">
          <Tile src="/images/prague-old-town.jpg" className="col-span-3 row-span-2" duo />
          <Tile src="/images/students-studying.jpg" className="col-span-3 proto-c-drift" />
          <Tile src="/images/prague-architecture.jpg" className="col-span-2 proto-c-drift [animation-direction:reverse]" duo />
          <div className="col-span-1 rounded-2xl bg-accent-red" />
        </div>
        <h1 className="text-[2.4rem] leading-[1.1] rtl:leading-[1.35] sm:text-6xl font-semibold text-text-primary mb-4 max-w-3xl">{title}</h1>
        <p className="text-lg text-text-secondary mb-8 max-w-xl">{sub}</p>
        <Ctas cta={cta} second={second} />
      </div>
    </section>
  );
}

function Tile({ src, className, duo }: { src: string; className?: string; duo?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", duo && "duotone", className)}>
      <Image src={src} alt="" fill sizes="50vw" className="object-cover" />
    </div>
  );
}

function Ctas({ cta, second, dark }: { cta: string; second: string; dark?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        href="/eligibility"
        className={cn(
          "proto-press inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xl px-7 text-base font-semibold",
          dark ? "bg-white text-[#0b1f3a]" : "bg-brand text-bg"
        )}
      >
        <ClipboardCheck className="w-5 h-5" aria-hidden="true" />
        {cta}
      </Link>
      <Link
        href="/programmes"
        className={cn(
          "proto-press inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border px-7 text-base font-semibold",
          dark ? "border-white/40 text-white" : "border-border-subtle text-text-primary bg-surface"
        )}
      >
        {second}
        <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
      </Link>
    </div>
  );
}

// ── Section: where students live ────────────────────────────────────────────
function CitiesSection({ dir, ar }: { dir: Dir; ar: boolean }) {
  const cities = useCityFacts();
  const title = ar ? "الطلاب بيعيشوا فين" : "Where students live";
  const name = (n: string) => (ar ? CITY_AR[n] ?? n : n);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20" aria-labelledby="cities">
      <h2 id="cities" className="text-2xl sm:text-3xl font-semibold text-text-primary mb-2">{title}</h2>
      <p className="text-text-secondary mb-8">
        {ar ? "14 مدينة فيها جامعات بتدرّس بالإنجليزي." : "14 cities with English-taught programmes."}
      </p>

      {dir === "b" ? (
        <CityMap cities={cities} ar={ar} />
      ) : (
        <div className={cn("grid gap-4", dir === "c" ? "lg:grid-cols-[1fr_1.1fr] items-start" : "")}>
          <ul className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto snap-x pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
            {cities.slice(0, 6).map((c) => (
              <li key={c.slug} className="snap-start shrink-0 w-40 sm:w-auto">
                <Link href={`/study/in-${c.slug}`} className="proto-lift block overflow-hidden rounded-2xl border border-border-subtle bg-surface">
                  <div className={cn("relative h-28", PHOTO[c.slug] ? "duotone" : "bg-brand/10")}>
                    {PHOTO[c.slug] ? (
                      <Image src={PHOTO[c.slug]} alt="" fill sizes="200px" className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center text-xs text-brand/70 px-3 text-center">
                        {ar ? "صورة المدينة هنا" : "City photo goes here"}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-text-primary">{name(c.name)}</p>
                    <p className="text-xs text-text-muted">
                      {c.english} {ar ? "برنامج بالإنجليزي" : "English programmes"}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {dir === "c" && <CityMap cities={cities} ar={ar} compact />}
        </div>
      )}
    </section>
  );
}

// ── Signature option 2: SVG map of the 14 university cities ─────────────────
function CityMap({ cities, ar, compact }: { cities: ReturnType<typeof useCityFacts>; ar: boolean; compact?: boolean }) {
  const [sel, setSel] = useState<string | null>(null);
  const city = cities.find((c) => c.slug === sel);
  const name = (n: string) => (ar ? CITY_AR[n] ?? n : n);
  return (
    <div className={cn("relative rounded-3xl border border-border-subtle bg-surface p-3 sm:p-6", compact && "lg:mt-0")}>
      <svg viewBox={`-20 -20 ${CZ_MAP.width + 40} ${CZ_MAP.height + 40}`} className="w-full h-auto" role="group" aria-label={ar ? "خريطة مدن الجامعات في التشيك" : "Map of Czech university cities"}>
        <path d={CZ_MAP.path} className="fill-brand/[0.07] stroke-brand/40" strokeWidth="2" strokeLinejoin="round" />
        {cities.map((c) => {
          const [x, y] = project(c.lat, c.lon);
          const r = 7 + Math.sqrt(c.english) * 1.6;
          const active = sel === c.slug;
          return (
            <g key={c.slug}>
              <circle cx={x} cy={y} r={r + 10} className="proto-pulse fill-brand/15" aria-hidden="true" />
              <circle
                cx={x}
                cy={y}
                r={r}
                tabIndex={0}
                role="button"
                aria-label={`${name(c.name)}: ${c.english} ${ar ? "برنامج بالإنجليزي" : "English programmes"}`}
                aria-pressed={active}
                onClick={() => setSel(active ? null : c.slug)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(active ? null : c.slug))}
                className={cn("cursor-pointer stroke-surface focus-visible:outline-none", active ? "fill-accent-red" : "fill-brand")}
                strokeWidth="3"
              />
              {(c.english >= 10 || active) && (
                <text x={x} y={y - r - 8} textAnchor="middle" className="fill-text-primary text-[18px] font-semibold pointer-events-none">
                  {name(c.name)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {city && (
        <div className="absolute inset-x-3 bottom-3 sm:inset-x-auto sm:end-6 sm:bottom-6 sm:w-72 rounded-2xl border border-border-subtle bg-surface p-4 shadow-xl">
          <button type="button" onClick={() => setSel(null)} aria-label={ar ? "إغلاق" : "Close"} className="absolute top-2 end-2 p-1.5 text-text-muted">
            <X className="w-4 h-4" />
          </button>
          <p className="flex items-center gap-1.5 font-semibold text-text-primary mb-1">
            <MapPin className="w-4 h-4 text-accent-red" aria-hidden="true" />
            {name(city.name)}
          </p>
          <p className="text-sm text-text-secondary">
            {city.english} {ar ? "برنامج بالإنجليزي" : "English-taught programmes"}
          </p>
          {city.rent && (
            <p className="text-sm text-text-secondary">
              {ar ? "سكن جامعي:" : "Dorm room:"} {city.rent[0].toLocaleString("en-US")}–{city.rent[1].toLocaleString("en-US")} Kč {ar ? "في الشهر" : "/ month"}
            </p>
          )}
          <Link href={`/study/in-${city.slug}`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand">
            {ar ? `ادرس في ${name(city.name)}` : `Study in ${city.name}`}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}

// ── Signature option 1: cobe globe in a band below the hero ─────────────────
const ORIGINS: [number, number][] = [
  [30.0444, 31.2357], // Cairo
  [31.2001, 29.9187], // Alexandria
  [31.9539, 35.9106], // Amman
  [24.7136, 46.6753], // Riyadh
  [33.3152, 44.3661], // Baghdad
  [33.8938, 35.5018], // Beirut
  [33.5731, -7.5898], // Casablanca
];

function GlobeBand({ ar }: { ar: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending");

  useEffect(() => {
    // Decide in JS before importing anything: reduced motion, no WebGL or a
    // slow device get the static version and never download cobe.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = (() => {
      try {
        return !!document.createElement("canvas").getContext("webgl");
      } catch {
        return false;
      }
    })();
    const slow = (navigator.hardwareConcurrency ?? 4) < 4;
    if (reduced || !gl || slow) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- prototype
      setMode("static");
      return;
    }
    let destroy: (() => void) | undefined;
    let visible = false;
    const io = new IntersectionObserver(async ([entry]) => {
      visible = entry.isIntersecting;
      if (!visible || destroy || !ref.current) return;
      const { default: createGlobe } = await import("cobe");
      const canvas = ref.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let phi = 4.4;
      const size = canvas.offsetWidth;
      const globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi,
        theta: 0.35,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 12000,
        mapBrightness: 5,
        baseColor: [0.93, 0.95, 0.98],
        markerColor: [0.07, 0.27, 0.49],
        glowColor: [0.85, 0.9, 0.97],
        markers: [
          ...ORIGINS.map(([lat, lon]) => ({ location: [lat, lon] as [number, number], size: 0.05 })),
          { location: [50.0755, 14.4378], size: 0.09 },
          { location: [49.1951, 16.6068], size: 0.07 },
        ],
        onRender: (state) => {
          if (visible && document.visibilityState === "visible") phi += 0.003;
          state.phi = phi;
        },
      });
      destroy = () => globe.destroy();
      setMode("webgl");
    });
    if (wrap.current) io.observe(wrap.current);
    return () => {
      io.disconnect();
      destroy?.();
    };
  }, []);

  return (
    <section className="bg-surface-raised">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-3">
            {ar ? "من مدينتك للتشيك" : "From your city to Czechia"}
          </h2>
          <p className="text-text-secondary">
            {ar
              ? "طلاب من القاهرة وإسكندرية وعمّان والرياض وبغداد وبيروت والدار البيضاء بيدرسوا في براغ وبرنو."
              : "Students from Cairo, Alexandria, Amman, Riyadh, Baghdad, Beirut and Casablanca study in Prague and Brno."}
          </p>
        </div>
        <div ref={wrap} className="mx-auto w-full max-w-[340px] sm:max-w-[420px] aspect-square">
          {mode === "static" ? (
            <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#dbe6f4_60%,#c3d5ec)] grid place-items-center text-xs text-text-muted" aria-hidden="true">
              {ar ? "صورة ثابتة للكرة" : "Static globe image"}
            </div>
          ) : (
            <canvas ref={ref} className="w-full h-full" aria-hidden="true" style={{ contain: "layout paint size" }} />
          )}
        </div>
      </div>
    </section>
  );
}
