# Performance and accessibility budgets

Every pull request runs **Lighthouse budgets and accessibility** in CI (`.github/workflows/ci.yml`). If a budget marked "error" breaks, the check fails and the PR doesn't merge.

## How it measures

- **Lighthouse, mobile:** its default 4× CPU slowdown and slow-4G simulation. Five pages: `/`, `/ar/`, `/eligibility/`, `/services/` and one programme page. Three runs each; the median run counts.
- **Where it runs:** against the static export, served by `tools/serve-out.mjs` the way Netlify serves it: gzip, cache headers, and the image CDN, with `sharp` resizing to the requested width as WebP. Without that, every photo would 404 and the numbers would mean nothing.
- **Accessibility:** `tools/a11y-check.mjs` runs axe (WCAG 2.1 A and AA) on 15 pages, in English and Arabic, light and dark: 60 page loads. It also opens the help sheet and audits it. Any violation fails CI.
- **Locally:** `npm run build && npm run perf && npm run a11y`. Reports land in `.lighthouseci/`, which is ignored by git. In CI they're attached to the run as an artifact.

## Baseline (main, 12 October 2026, median of 3)

| Page | Performance | Accessibility | LCP | CLS | TBT | JS transferred (Lighthouse) |
|---|---|---|---|---|---|---|
| `/` | 89 | 100 | 3.8 s | 0 | 40 ms | 228 KB |
| `/ar/` | 83 | 100 | 4.6 s | 0 | 66 ms | 228 KB |
| `/eligibility/` | 82 | 100 | 4.6 s | 0 | 52 ms | 258 KB |
| `/services/` | 87 | 100 | 4.0 s | 0.019 | 41 ms | 256 KB |
| `/programmes/vse-bba-intl-business/` | 88 | 100 | 3.8 s | 0 | 41 ms | 252 KB |

Lighthouse's JS column also counts route chunks Next.js prefetches, so it varies from run to run. The JS budget therefore uses `tools/js-budget.mjs`, which is exact. These numbers come from the local CI server, not production. Netlify's CDN may be a little faster, so compare runs of the same kind with each other.

## Budgets (`lighthouserc.cjs`)

| Metric | Budget | Level |
|---|---|---|
| Performance | ≥ 85, or no worse than the baseline when it's lower (3 points of noise allowed: `/ar/` ≥ 80, `/eligibility/` ≥ 79, `/services/` ≥ 84) | error |
| Accessibility | ≥ 95 | error |
| CLS | ≤ 0.05 | error |
| TBT | ≤ 200 ms | error |
| LCP | no worse than the baseline + 10 % | error |
| LCP | ≤ 2.5 s, the brief's target | **warning** |
| Homepage JavaScript (`tools/js-budget.mjs`: gzipped size of the scripts the homepage HTML loads, EN and AR; baseline 264 KB) | ≤ 294 KB | error |

**Why LCP 2.5 s is only a warning for now:** no page meets it yet (3.8–4.6 s), so an error would fail every PR, including ones that make things better. The LCP element is the hero photo on most pages. The photo work in phase 3 (B2) is the chance to bring it down. When a page gets under 2.5 s, tighten its budget in `lighthouserc.cjs` so it stays there.

**When a change is meant to cost a little,** for example a new feature that adds JavaScript, raise the budget in the same PR and say why in its description. Never raise a budget silently.
