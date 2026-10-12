// Lighthouse CI: mobile (Lighthouse's default 4x CPU and slow-4G simulation)
// against the static export, served like Netlify by tools/serve-out.mjs
// (gzip, image CDN). Budgets and the baseline they come from are in
// docs/PERFORMANCE.md. A pull request that breaks an "error" budget fails.
const BASE = "http://localhost:4173";

// Baseline on main, 12 October 2026 (median of 3 runs). "No worse than the
// baseline" allows 3 points / 10 % for run-to-run noise.
const PAGES = [
  { path: "/", perf: 0.85, lcp: 3777 },
  { path: "/ar/", perf: 0.8, lcp: 4581 },
  { path: "/eligibility/", perf: 0.79, lcp: 4620 },
  { path: "/services/", perf: 0.84, lcp: 3972 },
  { path: "/programmes/vse-bba-intl-business/", perf: 0.85, lcp: 3844 },
];
const HOME_JS_BASELINE = 228 * 1024; // compressed script bytes on "/"


module.exports = {
  ci: {
    collect: {
      startServerCommand: "node tools/serve-out.mjs 4173",
      startServerReadyPattern: "serving out/",
      url: PAGES.map((p) => BASE + p.path),
      numberOfRuns: 3,
      settings: { chromeFlags: "--no-sandbox --headless=new" },
    },
    assert: {
      assertMatrix: PAGES.map((p) => ({
        matchingUrlPattern: `4173${p.path}$`,
        aggregationMethod: "median-run",
        assertions: {
          "categories:performance": ["error", { minScore: p.perf }],
          "categories:accessibility": ["error", { minScore: 0.95 }],
          "cumulative-layout-shift": ["error", { maxNumericValue: 0.05 }],
          "total-blocking-time": ["error", { maxNumericValue: 200 }],
          "largest-contentful-paint": ["error", { maxNumericValue: Math.round(p.lcp * 1.1) }],
          ...(p.path === "/" ? { "resource-summary:script:size": ["error", { maxNumericValue: HOME_JS_BASELINE + 30 * 1024 }] } : {}),
        },
      })).concat([
        // The brief's target. A warning until the baseline gets there.
        { matchingUrlPattern: ".*", aggregationMethod: "median-run", assertions: { "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }] } },
      ]),
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci/reports" },
  },
};
