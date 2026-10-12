@AGENTS.md

## Engineering conventions

Static export (`output: "export"`, `trailingSlash: true`) published from `out/` on Netlify. There is no server code at runtime: no API routes, middleware or server actions. Anything dynamic needs a Netlify Function or an external service, which is an architecture change to agree on first.

### Rules for every change

1. **Prices only via `src/config/pricing.ts`.** Never type a price ("€15", "15€") into copy. Use `price(key, locale)`, `<PriceTag k="…">`, `fullPackageTotal()`, `czk()`. Stripe URLs live only in `stripe-links.json` and are rendered only through `checkoutLink(key)`; links marked `"public": false` must never be rendered.
2. **Refund text only from `REFUND_COPY`** in `src/config/contact.ts`. Payment-structure wording must match `/terms`.
3. **Every public page has an Arabic twin under `/ar/`:**
   - build the English page under `src/app/...`;
   - add Arabic strings with the same keys as English;
   - add an `AR_PAGE_META` entry in `src/i18n/ar-metadata.ts` (Modern Standard Arabic title and description);
   - run `npm run gen:ar` and commit the generated files (dynamic routes need a hand-written file marked `@custom-ar`, which the generator never overwrites);
   - add the page to `src/app/sitemap.ts`;
   - after `npm run build`, run `npm run gen:og` and commit `public/og/` (share cards).
4. **Links:** import `Link` from `@/components/locale-link`, never `next/link`. Plain `<a>` tags to internal pages go through `localizeHref()`. Internal URLs end with `/`.
5. **Arabic copy:** Egyptian colloquial is fine on community and tool pages; terms, privacy and anything legal use light Modern Standard Arabic. Western digits for prices and numbers. Don't rewrite the voice of an existing page.
6. **Accuracy:** every fee comes from the university's or faculty's own page and is stored with its source URL and verification date (`src/data/programmes.ts`). No invented statistics, testimonials or unconfirmed claims about the owner.
7. **Accessibility:** WCAG AA contrast, visible focus, meaningful `alt` text. Content must be visible without JavaScript animation (animate movement, not existence) and respect `prefers-reduced-motion`.
8. **Privacy:** cookieless only. No cookie-setting analytics, pixels or third-party scripts without the owner's approval and a consent banner.
9. **Mobile first:** check every change at 375 px wide, in English and in Arabic (RTL).
10. **Public repo:** never commit secrets, `.env*` files (except `.env.example`), business notes or personal/customer data.

### Workflow

- Never push to `main`. One small pull request per topic, on a `fix/…`, `feat/…`, `content/…` or `chore/…` branch.
- Before opening a pull request:
  ```bash
  npx tsc --noEmit   # must be clean
  npm run lint       # must not add new errors or warnings
  npm run build      # must pass; check the "postbuild-ar: set lang=…" line
  npx serve out      # click through EN and /ar/ at 375 px
  ```
- Commit messages: imperative subject plus a short body explaining why. Pull request description: what changed, why, and how it was checked.
- Every pull request gets a Netlify deploy preview at `https://deploy-preview-<N>--studyczechia.netlify.app`. Check the changed pages there in English and Arabic at phone width before merging (squash merge). After merging, confirm the change on `https://studyczechia.com` once the production deploy finishes.
- `next dev` rewrites the block in `AGENTS.md`; leave it alone.
