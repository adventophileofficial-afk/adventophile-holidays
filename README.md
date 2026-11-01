# Adventophile Holidays

Site for Adventophile Holidays, a travel & holiday management company based in Jodhpur, Rajasthan —
customized domestic (India) and international holiday packages. Built with the Next.js App Router,
TypeScript and Tailwind CSS to replace a legacy WordPress site whose audit is preserved in
`Executive Summary.pdf` — the rebuild fixes everything that audit flagged: no dead nav links,
no Lorem Ipsum content, unique SEO metadata per page, JSON-LD structured data, accessible forms
(unique field IDs/labels), and descriptive image alt text throughout.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content model

- **Destinations** — typed data in `lib/data/destinations.ts`: 17 entries, each with a
  `scope` of `"domestic"` (11 Indian destinations) or `"international"` (6). This split drives
  the two sections on `/destinations`, the `/destinations/[slug]` pages, the homepage
  destinations block, and the `?scope=` / `?destination=` filters on `/tours`.
- **Tours (packages)** — typed data in `lib/data/tours.ts` (19 itineraries, priced in INR). Each
  tour references a destination by slug via `location.destination`; a tour's domestic/international
  scope is *derived* from that destination rather than stored twice (`getTourScope`).
- **Services** — `lib/data/services.ts`, rendered on `/services`, the homepage and `/contact`.
- **Company details** — `lib/site.ts` is the single source of truth for name, phone, email and
  address; Header, Footer, `/contact`, `/about` and the JSON-LD `TravelAgency` schema all read
  from it.
- **Blog posts** — MDX files in `content/blog/*.mdx`, loaded via `lib/blog.ts`.
- **Images** — `public/images/**` are locally generated placeholder SVGs (see
  `scripts/generate-placeholders.mjs`, which must be edited in lockstep with the tour and
  destination slugs). Every reference is marked as a placeholder; swap in licensed photography
  before a real launch — `next.config.ts`'s `dangerouslyAllowSVG` exists only to serve these
  placeholders and should be reconsidered once they're replaced.
- **Still placeholder content** — the two team members in `app/about/page.tsx` and the four
  reviews in `lib/data/testimonials.ts` are illustrative, not real people or real feedback. Both
  files are marked `PLACEHOLDER`; replace them before launch.

## Contact / booking / newsletter forms

`/contact`, each tour's "Book This Tour" form and the footer newsletter POST to `/api/contact`,
`/api/book` and `/api/newsletter`. Every submission is saved as a row in a Google Sheet through a
Google Apps Script web app (`scripts/leads-sheet.gs`); setup steps are in `docs/leads-setup.md`.
Copy `.env.local.example` to `.env.local` and fill in:

- `LEADS_SHEET_WEBHOOK_URL` — the Apps Script web app URL (ends in `/exec`). Without it, leads are
  logged to the server console in development; in production the forms return an error instead
  of pretending to succeed.
- `LEADS_SHEET_SECRET` — must match the script's `LEADS_SHEET_SECRET` script property.
- `NEXT_PUBLIC_SITE_URL` — used for canonical URLs, sitemap.xml, robots.txt, and OG images.

Spam protection: a hidden honeypot field (`company`) and a minimum time on the form. Either trap
returns `{ ok: true }` without saving, so bots can't distinguish it from a real submission.

## Verification

```bash
npm run lint
npm run build   # also runs the TypeScript check and prerenders all tour/post pages
npm run start   # serve the production build locally
```

For a full pre-launch check: run Lighthouse against `/`, a tour page, and a blog post; validate
JSON-LD on a tour/post page with Google's Rich Results Test; and do a keyboard-only pass through
the Contact and Booking forms.

## Deploying

Push to a Git remote and import the repo in Vercel, or run `vercel` from this directory. Set the
environment variables above in the Vercel project settings before going live.
