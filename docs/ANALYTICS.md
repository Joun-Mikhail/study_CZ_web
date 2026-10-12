# Reading the funnel in Umami: a five-minute weekly check

Umami is the site's analytics. It is cookieless and stores nothing personal, so no banner is needed. It only runs when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set on Netlify.

## What the events mean

| Event | Data | Fires when |
|---|---|---|
| `tool_started` | `tool`: `eligibility`, `matcher`, `cost-of-living` | First answer, choice or slider move in a tool (once per page load) |
| `tool_completed` | `tool` (+ `field` for the matcher) | The result is shown |
| `plan_saved` | `tool` | "Save to My Journey" |
| `plan_sent_whatsapp` | `tool` | "Send my plan to John" (WhatsApp opens; we can't see whether they pressed send) |
| `email_signup` | `source`, `tips` | Someone asks for their result or reminders by email (only once Brevo is on) |
| `help_sheet_open` | `service`, `source` | Someone taps an offer and sees the help sheet |
| `checkout_click` | `product`, `page`, `source` | Someone taps a Stripe button (in the help sheet, or on `/services/` and `/courses/`) |
| `whatsapp_click` | `page` | Any WhatsApp link |
| `purchase` | `product` | Stripe sends them back to `/thanks/` after paying |

`source` says where it happened. For example, `eligibility:documents` means the documents risk in the eligibility plan, `stage:visa` the visa stage page, and `guide:/application-guide/` a guide page.

Until 12 October 2026 the tools sent `eligibility_completed` and `matcher_completed` instead of `tool_completed`. For older weeks, look at those two.

## Set up once: the funnel report

1. In Umami, open the website, then **Reports → Create report → Funnel**.
2. Add four steps, each of type **Event**:
   1. `tool_completed`
   2. `help_sheet_open`
   3. `checkout_click`
   4. `purchase`
3. Set the window to 1 day (1440 minutes) and save it as "Tools to purchase".

A visitor who pays on another day or another device won't connect across the funnel, because Umami has no accounts or cookies. That's why the weekly check also looks at plain counts.

## Every Monday (five minutes)

1. **Range:** last 7 days.
2. **Events tab.** Note these counts in the table below: `tool_started`, `tool_completed`, `plan_saved`, `plan_sent_whatsapp`, `help_sheet_open`, `checkout_click`, `purchase`.
3. **Event data.** Click `help_sheet_open` and look at `service` and `source`. Which risks make people open the sheet?
4. **Funnel report.** Note the percentage at each step.
5. **WhatsApp.** Count how many conversations started with "here's my plan". Umami can't see that part; only you can.

| Week starting | tool_started | tool_completed | plan_saved | plan_sent_whatsapp | help_sheet_open | checkout_click | purchase | "my plan" chats |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

## How to read it

- **started → completed** low: the tool is too long, or confusing on a phone.
- **completed → help_sheet_open** low: the plan isn't pointing at a problem people feel. Read `source` to see which risks work.
- **help_sheet_open → checkout_click** low: something in the sheet stops them (price, timing, trust). "Ask me first on WhatsApp" is a good outcome too. Count those chats.
- **checkout_click → purchase** low: a Stripe problem (wrong link, promo code, payment method).

## Comparing before and after a change

Traffic is too low for A/B tests: a few dozen visits a week can't separate two versions. Compare **four weeks before** a change with **four weeks after** it instead, on rates rather than raw counts (completed ÷ started, help_sheet_open ÷ completed, and so on). Write the change date next to the table. Treat a difference as real only if it holds over the four weeks, not in a single week.
