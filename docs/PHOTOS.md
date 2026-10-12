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
