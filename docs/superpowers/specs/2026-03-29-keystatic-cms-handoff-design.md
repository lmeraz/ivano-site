# Keystatic CMS Integration & Client Handoff

**Date:** 2026-03-29
**Status:** Approved
**Site:** ivanoworkshops.com (Ivano Conte — theatre workshops)

## Problem

The site is a custom-built Astro static site with all content hardcoded in `src/data/site.ts`. The client (Ivano) needs to independently edit content — workshops, testimonials, FAQs, about page copy — while the developer handles code, styling, and integrations. The site currently has no CMS and is not set up for non-developer editing.

## Decision

**Keystatic + Netlify.** Keystatic provides a web-based admin UI at `/keystatic` that lets Ivano edit structured content through forms. Content is stored as JSON files in the Git repo. Netlify auto-deploys on every change.

### Why Keystatic over alternatives

- **No third-party cloud dependency** — talks directly to GitHub, unlike TinaCMS (requires Tina Cloud)
- **Singletons support** — maps naturally to one-of-a-kind site data (settings, home page, about page)
- **Free and open source** — no usage limits or paid tiers
- **First-class Astro integration** — official support, maintained
- **Structured data focus** — form-based editing is ideal for this site's content (fields, not rich-text blog posts)

### Why Netlify over staying on Hostinger

- **Git-based auto-deploys** — push to GitHub triggers build and deploy automatically
- **Native Astro SSR support** — required for Keystatic's admin route (`hybrid` output mode)
- **Free tier** covers this site's needs indefinitely
- **No FTP or manual deploys** — eliminates fragile deployment scripts
- **Domain stays on Hostinger** — only DNS records change; hosting plan can be cancelled

## Content Architecture

### Singletons (one-of-a-kind data)

| Singleton | Contents | Current source |
|---|---|---|
| Site Settings | name, role, baseCity, email, instagram, description, navigation | `site` object in `site.ts` |
| Home Page | stats, workshop pillars, process steps | `stats`, `workshopPillars`, `process` in `site.ts` |
| About Page | about page copy | Hardcoded in `about.astro` |
| Contact Page | contact page copy | Hardcoded in `contact.astro` |
| Testimonials | Array of {name, credit, quote} | `testimonials` in `site.ts` |
| FAQs | Array of {question, answer} | `faqs` in `site.ts` |

### Collections (repeatable entries)

| Collection | Entry fields | Current source |
|---|---|---|
| Workshops | slug, title, badge, featured (boolean), strapline, summary, lead, dateLabel, timeLabel, startDate, endDate, location, venue, priceLabel, format, level, seats, status, statusLabel, registrationUrl, fallbackUrl, fallbackLabel, audience[], outcomes[], schedule[] | `workshops` array in `site.ts` |
| Past Workshops | title, location, dates | `pastWorkshops` array in `site.ts` |

### Featured workshops

Currently `featuredWorkshops` is derived as the first two entries in the workshops array. In the new system, each workshop gets a `featured` boolean field. The home page queries workshops where `featured: true`. This gives Ivano explicit control over which workshops appear on the home page.

### Content storage

- `src/content/singletons/` — one JSON file per singleton
- `src/content/workshops/` — one JSON file per workshop, keyed by slug
- `src/content/past-workshops/` — one JSON file per entry

## Editing Experience

Ivano visits `ivanoworkshops.com/keystatic` and sees an admin dashboard:

- Sidebar lists singletons (Site Settings, Home Page, About, etc.) and collections (Workshops, Past Workshops)
- Clicking a collection shows a list of entries — add, edit, or remove
- Clicking an entry opens a form with labeled fields (Title, Date, Status dropdown, etc.)
- No code, no terminal, no GitHub UI

**Authentication:** Keystatic uses GitHub OAuth. Ivano gets a GitHub account (created once during handoff setup). He clicks "Sign in" on the Keystatic admin page — that's his only interaction with GitHub.

**Edit-to-live flow:**
1. Ivano edits content at `/keystatic`
2. Keystatic commits the JSON change to GitHub
3. Netlify detects the push, builds Astro site (~30 seconds), deploys
4. Live in under a minute

## Project Structure Changes

### New dependencies

- `@keystatic/core` — CMS core
- `@keystatic/astro` — Astro integration
- `@astrojs/react` — required by Keystatic's UI
- `@astrojs/netlify` — Netlify adapter for hybrid output

### New files

- `keystatic.config.ts` — defines all singletons and collections with field schemas
- `src/pages/keystatic/[...params].astro` — admin UI route
- `src/content/singletons/*.json` — singleton content files
- `src/content/workshops/*.json` — workshop content files
- `src/content/past-workshops/*.json` — past workshop content files

### Modified files

- `astro.config.mjs` — add React, Keystatic, Netlify integrations; set `output: 'hybrid'`
- All page `.astro` files — switch from `site.ts` imports to Keystatic reader API
- All component `.astro` files — accept content via props instead of direct imports

### Removed files

- `src/data/site.ts` — fully replaced by Keystatic-managed content

## Deployment & Hosting

- **Repo:** GitHub (existing or new)
- **Host:** Netlify (free tier), connected to repo for auto-deploys
- **Domain:** `ivanoworkshops.com` stays registered on Hostinger; DNS points to Netlify
- **SSL:** Handled automatically by Netlify
- **Astro output:** `hybrid` — static pages pre-rendered, `/keystatic` route server-rendered

## Handoff Deliverables

### For Ivano (client)

1. **Accounts created:**
   - GitHub account (one-time setup, used only for Keystatic sign-in)
   - Netlify account (free tier, owns the site)
   - Hostinger DNS updated to point to Netlify

2. **User guide (1 page):**
   - How to access admin (`ivanoworkshops.com/keystatic`)
   - How to edit workshops, testimonials, FAQs, site info
   - How to add/remove workshops
   - What to expect (changes live in ~1 minute)
   - Who to contact for help

### For future developers

- Repo README with:
  - Local dev setup (`npm run dev`)
  - How Keystatic config maps to site content
  - How to add new editable fields
  - Netlify deployment details

### Responsibility split

| Ivano can do | Requires a developer |
|---|---|
| Edit any content field | Styling changes |
| Add/remove workshops | New pages or sections |
| Update testimonials, FAQs | Layout or navigation structure |
| Change bio, contact info, site description | New integrations (payments, booking) |
