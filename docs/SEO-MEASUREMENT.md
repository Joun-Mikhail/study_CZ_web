# Measuring search: a ten-minute weekly check

The goal is a top-three Google result for **study czechia** for searchers in Egypt, then the other tracked keywords (the list is `TRACKED` in `tools/gsc-report.mjs`). This page says how to measure progress without paying for a rank tracker.

## What the numbers mean

- **Search Console "position"** is an average over every time the site was shown, across devices, cities and days. A page shown once at position 3 and nine times at position 40 reports about 36. Read the trend over weeks, not one number.
- **A search you run yourself** is personalised by your history and location. It is not a measurement. If you want a spot check, use a private window with `&gl=eg&hl=en&pws=0` (or `hl=ar`) added to the Google URL, and write down the date and device.
- **No impressions** for a keyword means Google did not show the site for it at all in that period, which is different from ranking low.

## Every Monday

1. Search Console → Performance → Search results → last 28 days → **Country: Egypt**. Export → CSV, unzip.
2. `node tools/gsc-report.mjs <folder> --label egypt --log`
3. Repeat with no country filter and `--label all`, and once a month with **Device: Mobile** and `--label egypt-mobile`.
4. Search Console → Pages: note "Indexed" and "Discovered, currently not indexed".
5. Search Console → Links → Top linking sites: note the number of linking sites and any new one.
6. `node tools/check-official-links.mjs` and fix anything it reports as broken.

The report appends to `.seo/rank-log.csv`, which is git-ignored on purpose: search data is business data and this repository is public.

| Week | "study czechia" position (Egypt) | Impressions (Egypt) | Clicks (Egypt) | Non-brand clicks | Pages indexed | Linking sites |
|---|---|---|---|---|---|---|
| | | | | | | |

## Four different things, never mixed

| Measure | Where it comes from | What it tells you |
|---|---|---|
| Ranking (average position) | Search Console, filtered to Egypt | Where Google shows the site. An average, not a fixed place. |
| Impressions | Search Console | How often the site was shown at all. Rises before clicks do. |
| Organic clicks | Search Console (and Umami sessions with a Google referrer) | People who actually arrived. |
| Qualified enquiries | WhatsApp chats and `plan_sent_whatsapp` / `help_sheet_open` in Umami, see `docs/ANALYTICS.md` | Students who asked for something. The only number that matters to the business. |

A change counts as an improvement only when the Search Console number moved over four weeks. Shipping a page is not a result.

## Weekly targets to watch (Egypt and Arabic)

- "study czechia", Country = Egypt: average position, impressions, clicks.
- Arabic queries line of the report: impressions, clicks, CTR.
- Impressions and position of `/ar/study-in-czechia-from-egypt/` and `/ar/student-visa-egypt/` in Pages.csv.
- Brand clicks.
- Indexed pages and linking sites.
- Enquiries that say they found the site on Google.

## How to read it

- **Tracked keyword has impressions but position above 20:** Google understands the page is relevant but trusts other sites more. This is a links and brand problem, not a wording problem.
- **Position 8 to 20 with impressions** (the "closest to page one" list): the cheapest wins. Improve that page's answer and link to it from related pages.
- **Brand clicks rising** (people typing "study czechia" or "studyczechia" and choosing this site): the strongest signal for the main keyword, because that query is mostly people looking for a specific site.
- **Indexed pages falling or "discovered, not indexed" rising:** check the sitemap and the pages' internal links before publishing anything new.

Compare four weeks before a change with four weeks after it. One good week proves nothing.
