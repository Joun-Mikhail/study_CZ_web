# Photos

Every photo on the site lives in `public/images/`. All of them except `john.jpg`
are free stock photos from Unsplash and Pexels. The credit line
"Photos: Unsplash & Pexels (free license)" is on `/why-czechia/` (English and
Arabic). **Keep it until every stock photo below has been replaced.**

## Where each stock photo is used

| File | Size | Pages |
| --- | --- | --- |
| `university-campus.jpg` | 1400×933 | every programme page, programme list, universities list, scholarships, `/study/*` pages (8 places) |
| `prague-bridge.jpg` | 1280×854 | every university page, eligibility check, arrival, interview prep, my journey |
| `prague-scenic.jpg` | 1280×1920 (portrait) | contact, course page, preparatory year, why Czechia |
| `prague-architecture.jpg` | 1400×933 | cost of living, matcher, what it costs |
| `prague-old-town.jpg` | 1400×933 | about, application guide, why Czechia |
| `students-group.jpg` | 1400×2100 (portrait) | services, questions to ask, why Czechia |
| `prague-cityscape.jpg` | 1400×933 | home hero, deadlines |
| `students-studying.jpg` | 1400×933 | Q&A, why Czechia |

Arabic pages use the same files.

## Photos to ask John for

Real photos build more trust than stock ones. Most useful first:

1. **A university building or campus in Brno or Prague**, landscape. It replaces
   `university-campus.jpg`, which appears on 8 page types, including every
   programme page.
2. **A student dorm room or kitchen**, landscape. For cost of living and what it
   costs (replaces `prague-architecture.jpg`).
3. **The foreign police office (OAMP) from outside**, landscape. For arrival
   and the course page.
4. **Brno streets or the city centre**, landscape. Replaces `prague-bridge.jpg`
   on university pages, so they don't all show Prague.
5. **Students together (with their permission)**, portrait. Replaces
   `students-group.jpg` on the services page.

Phone photos are fine. Landscape at least 1400 px wide (portrait at least
1280 px tall). No faces without permission, and no documents, names or plates
that can be read.

## How to swap one in

Save the new photo over the old file with the same name (for example
`public/images/university-campus.jpg`), or add a new file and update the
`src="/images/..."` paths listed above. Netlify resizes and compresses images
automatically, so the original can be large. Once no stock photo is left, remove
the credit line in `src/app/why-czechia/WhyCzechiaClient.tsx` and this table.

## The registry (`src/data/images.ts`)

Every photo now has one entry in `src/data/images.ts`: file, size, alt text in English and Arabic, credit, licence, source URL and origin (`own`, `stock` or `commons`). Pages show photos with `<SiteImage id="...">`, which adds the right alt text, a blur placeholder and lazy loading.

- **City photos** (`public/images/cities/`): one for each of the 14 university cities, from Wikimedia Commons (CC0, public domain, CC BY or CC BY-SA). Each author and licence is credited in `<PhotoCredits />` on `/why-czechia/` and `/about/`, as those licences require. Don't remove that list while a Commons photo is in use.
- **Adding your own photo:** put the file in `public/images/`, add an entry with `origin: "own"` and `credit: "John"`, then switch the page to its id.

## Shot list: 20 photos to take in Brno and Prague

Landscape unless noted, at least 1400 px wide. No readable faces without permission; no readable documents, names or number plates.

| # | Photo | Page and section it's for |
|---|---|---|
| 1 | VUT campus (Brno University of Technology), a main building from outside | `/university/but/` hero; programme pages for VUT (Brno University of Technology) |
| 2 | Masaryk University, the main faculty building | `/university/muni/` hero; Brno programme pages |
| 3 | Charles University, a faculty building in Prague | `/university/cuni/` hero; Prague programme pages |
| 4 | A dorm room (made bed, desk, window) | Cost of living, "Dorm rent"; What it costs; parents page |
| 5 | A shared dorm kitchen | Cost of living, groceries; arrival guide |
| 6 | A supermarket shelf with price tags visible (Albert, Lidl or Billa) | Cost of living, groceries row |
| 7 | A Brno tram at a stop | Arrival guide, transport; cost of living, transport row |
| 8 | A Prague metro station | Prague city page; arrival guide |
| 9 | The foreign police office (OAMP) in Brno, from outside only | Arrival guide, "Register within 3 working days"; stage page "arrived" |
| 10 | A student desk with documents and folders (nothing readable) | Application guide hero; document review help sheet |
| 11 | An apostille stamp on a blank or blurred document | Application guide, "Authenticate and translate"; recognition guides |
| 12 | A university library reading room | Eligibility plan; why Czechia |
| 13 | A lecture hall (empty, or a crowd seen from behind) | Programmes list; why Czechia |
| 14 | Brno's Náměstí Svobody or Zelný trh on a weekday | Brno city page (replaces the Commons photo) |
| 15 | Prague street near a campus (Albertov or Dejvice) | Prague city page |
| 16 | A Czech SIM card shop or a bank branch front | Arrival guide, bank and SIM |
| 17 | A student canteen (menza) with a tray and prices | Cost of living, food; parents page |
| 18 | A train between cities (České dráhy or RegioJet) | Why Czechia, "travel cheaply" |
| 19 | You working with a student on WhatsApp or a call (your photo, portrait) | Help sheet, founder card, services |
| 20 | An embassy-style waiting room or queue (no faces) | Interview prep, stage page "visa" |

Send them in any order; each one replaces the stock or Commons photo in that spot.
