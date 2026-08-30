# Renewed Bodyworks — website

Custom-coded (full-code) marketing site for Renewed Bodyworks (Scott Hartzell, LMT),
built by Switch Case Studio. Next.js 15 App Router + Tailwind v4. Static, fast,
and built to fix every finding in the pre-engagement audit (`../AUDIT.md`).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Deploy

Deploys as a static/SSR Next.js app (Vercel recommended, one click). No database.
Set the production domain to `renewedbodyworks.com` and point DNS via Google Workspace.

## Configuration

Copy `.env.example` to `.env` and set:

- `NEXT_PUBLIC_GA_ID` — GA4 measurement ID. Enables the four conversion events
  (`phone_tap`, `contact_submit`, `book_click_eugene`, `book_click_portland`).

## Where the content lives

- **`lib/business.ts`** — single source of truth: name, phone, email, both
  locations (address, hours, booking URL, geo), all services + prices, reviews,
  FAQs, nav. Change a fact here and it updates the whole site and its schema.
- **`lib/schema.ts`** — JSON-LD (MassageTherapy per location, Services with
  prices, AggregateRating, Person, FAQPage, BreadcrumbList, Organization).
- **`lib/seo.ts`** — per-page metadata (title, description, canonical, OG/Twitter).
- **`public/images/`** — self-hosted photography. **Swap these for Scott's own
  studio photos when available** (keep the same filenames, or update paths in
  `lib/business.ts`).

## Contact form

`app/api/contact/route.ts` validates submissions and logs them. Wire an email
provider (e.g. Resend) there to deliver enquiries to Scott's inbox.

## Audit findings this build closes

Indexable (no noindex), sitemap + robots, one H1 per page with service + city,
unique meta descriptions, clean slugs with 301s from the old Wix URLs, full
structured data, prices + hours published, descriptive alt text, mobile booking
bar, GA4 event scaffolding, security headers, practitioner bio, two dedicated
location pages (`/massage-eugene-or`, `/massage-portland-or`).

### Still needs Scott (from the audit)

- Confirm the real weekly Eugene/Portland schedule (currently shows published
  MassageBook hours) — see audit `NAP-03`.
- Oregon LMT license number to display (audit `TRUST-01`).
- Real studio photos to replace the stock imagery.
- Create + verify the Eugene Google Business Profile (audit `LOC-01`).
