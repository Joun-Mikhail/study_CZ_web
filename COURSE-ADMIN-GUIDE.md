# Course Admin Guide — Video Upload & Content Management

## Architecture Overview

The course is a **static Next.js site** — all content lives in `src/data/course.ts`. There's no database or CMS. To update lessons, quizzes, or videos, you edit that file and redeploy.

---

## 1. Uploading Videos

### Recommended: Bunny.net Stream (cheapest)

1. **Create account** at [bunny.net](https://bunny.net) — Stream costs ~$1/TB storage + $1/TB bandwidth
2. **Create a Video Library** → enable "Direct Play" and "Token Authentication"
3. **Upload videos** via the Bunny dashboard or API
4. **Get the embed URL** — format: `https://iframe.mediadelivery.net/embed/{libraryId}/{videoId}`
5. **Restrict by domain** — in Library Settings → Security, add `studyczechia.com` and `localhost` as allowed domains

### Alternative: Vimeo Pro/Business

1. Upload to Vimeo with privacy set to **"Hide from Vimeo"**
2. Enable **domain-level privacy** — restrict embedding to `studyczechia.com`
3. Get embed URL — format: `https://player.vimeo.com/video/{id}?h={hash}`

### Adding the Video URL to a Lesson

Open `src/data/course.ts` and find the lesson. Replace `videoUrl: null` with the embed URL:

```typescript
{
  id: "embassy-questions",
  title: { en: "What the Embassy Actually Asks", ar: "..." },
  duration: "8 min",
  videoUrl: "https://iframe.mediadelivery.net/embed/12345/abc-def-123",  // ← add URL here
  content: { en: "...", ar: "..." },
  resources: [],
  isFree: true,
}
```

Then redeploy (`git push` triggers Vercel auto-deploy).

---

## 2. Adding Downloadable Resources

Each lesson has a `resources` array. Add files like this:

```typescript
resources: [
  {
    title: { en: "Embassy Checklist PDF", ar: "قائمة السفارة PDF" },
    url: "/downloads/embassy-checklist.pdf",
    type: "pdf",
  },
  {
    title: { en: "Czech Phrases Audio", ar: "عبارات تشيكية صوتية" },
    url: "/downloads/czech-phrases.mp3",
    type: "audio",
  },
],
```

**Where to put the files:**
- Place PDFs, audio files, and cheatsheets in `public/downloads/`
- They'll be served at `studyczechia.com/downloads/filename.pdf`
- Or host on Bunny CDN / Google Drive (use a direct download link)

---

## 3. Adding New Lessons

Add a new lesson object to the appropriate module's `lessons` array:

```typescript
{
  id: "new-lesson-slug",           // URL-safe, unique within the module
  title: { en: "English Title", ar: "العنوان بالعربي" },
  duration: "12 min",
  videoUrl: null,                  // null shows "Coming Soon" placeholder
  content: {
    en: "• Point one\n• Point two\n• Point three",
    ar: "• النقطة الأولى\n• النقطة الثانية",
  },
  resources: [],
  isFree: false,                   // true = free preview (no access code needed)
}
```

The page at `/courses/learn/{moduleId}/{lessonId}` is auto-generated at build time via `generateStaticParams`.

---

## 4. Adding / Editing Quiz Questions

Each module has a `quiz` object. Add questions like this:

```typescript
quiz: {
  title: { en: "Module 1 Quiz", ar: "اختبار الوحدة الأولى" },
  passingScore: 70,
  questions: [
    {
      id: "q-new",
      question: { en: "What is...?", ar: "ما هو...؟" },
      options: [
        { en: "Option A", ar: "الخيار أ" },
        { en: "Option B", ar: "الخيار ب" },
        { en: "Option C", ar: "الخيار ج" },
        { en: "Option D", ar: "الخيار د" },
      ],
      correctIndex: 2,  // 0-based — this means "Option C" is correct
      explanation: {
        en: "Option C is correct because...",
        ar: "الخيار ج صحيح لأن...",
      },
    },
  ],
}
```

---

## 5. Managing Access (Who Can View Paid Content)

### How It Works Now

- After a student pays via Stripe (€49 course / €350 full package), you manually give them an access code
- Valid codes are hardcoded in `src/lib/course-store.ts`:
  - `CZECH2024`, `PRAGUE90`, `STUDY-CZ-VIP`, `FIRST90DAYS`, `CZECHIA2025`, `WELCOME-CZ`
- The student enters the code on the course dashboard → it sets `studycz_access=true` in localStorage
- Free preview lessons (marked `isFree: true`) bypass the gate entirely

### Adding New Access Codes

Edit `src/lib/course-store.ts`, find the `VALID_CODES` array, and add new codes:

```typescript
const VALID_CODES = [
  "CZECH2024", "PRAGUE90", "STUDY-CZ-VIP",
  "FIRST90DAYS", "CZECHIA2025", "WELCOME-CZ",
  "NEW-CODE-HERE",  // ← add yours
];
```

### Recommended Workflow

1. Student pays via Stripe Payment Link
2. You see the payment in Stripe Dashboard
3. Send the student a code via WhatsApp / email
4. They enter it at `studyczechia.com/courses/learn`

### Future: Automated Access via Stripe Webhooks

To automate code delivery, you'd need a small API route or serverless function:

1. Set up a Stripe Webhook for `checkout.session.completed`
2. The webhook handler generates a unique code, stores it, and emails it to the buyer
3. This requires a server component (Vercel Serverless Function or external service)

---

## 6. Choosing Free Preview Lessons

Set `isFree: true` on any lesson to make it accessible without an access code. Currently free:
- `embassy-questions` (Module 1)
- `airport-to-home` (Module 2)
- `czech-social-norms` (Module 4)

This lets potential students try the content before buying.

---

## 7. Quick Reference — Content Update Workflow

| Task | Where to edit | Deploy |
|------|--------------|--------|
| Add/change video | `src/data/course.ts` → lesson's `videoUrl` | `git push` |
| Add lesson notes | `src/data/course.ts` → lesson's `content` | `git push` |
| Add downloadable file | `public/downloads/` + lesson's `resources` | `git push` |
| Add quiz question | `src/data/course.ts` → module's `quiz.questions` | `git push` |
| Add new lesson | `src/data/course.ts` → module's `lessons` array | `git push` |
| Add access code | `src/lib/course-store.ts` → `VALID_CODES` | `git push` |
| Change pricing | `src/config/contact.ts` → `PRICING` object | `git push` |
| Mark lesson as free | `src/data/course.ts` → lesson's `isFree: true` | `git push` |

---

## 8. Video Production Tips

- **Format:** MP4 with H.264 codec, 1080p preferred
- **Length:** Keep lessons 5-15 minutes — better retention
- **Hosting cost comparison:**
  - Bunny.net: ~$1/month for a small course (cheapest)
  - Vimeo Pro: $20/month (unlimited bandwidth)
  - YouTube Unlisted: Free but no domain restriction, students can share links
- **Domain restriction** is critical — without it, anyone with the embed URL can watch for free
