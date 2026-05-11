# Ivano Workshops

Marketing site for Ivano Conte — theatre pedagogue and workshop facilitator. Built with Astro 5, managed via Keystatic CMS, hosted on Netlify.

Live site: [ivanoconte.com](https://ivanoconte.com)
CMS (production): [ivanoconte.com/keystatic](https://ivanoconte.com/keystatic)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Astro 5 (SSR via Netlify adapter) |
| CMS | Keystatic (GitHub storage in production) |
| Hosting | Netlify |
| Styling | Plain CSS |

---

## Local Development

```sh
npm install
npm run dev
```

The dev server starts at `http://localhost:4321`.
The CMS admin panel is at `http://localhost:4321/keystatic`.

In local mode, Keystatic uses `local` storage — it reads and writes JSON files directly in the repo. No GitHub OAuth is needed locally.

Build for production:

```sh
npm run build
```

---

## Content Structure

All CMS-managed content lives in `src/content/`:

```
src/content/
  singletons/
    site-settings.json     # name, email, Instagram, nav
    home.json              # stats, pillars, process steps
    about.json             # bio, teaching quotes, ideal students
    contact.json           # contact channels
    testimonials.json      # student testimonials
    faqs.json              # FAQ entries
  workshops/
    <slug>.json            # one file per upcoming workshop
  past-workshops/
    <title>.json           # one file per past workshop
```

### Collections vs Singletons

- **Singletons** are one-off pages or settings (home, about, site settings, etc.)
- **Collections** are repeating entries (workshops, past workshops)

---

## Schema

All field definitions live in `keystatic.config.ts`. This is the single source of truth for what the CMS can edit.

To add a new editable field:

1. Open `keystatic.config.ts`
2. Find the relevant singleton or collection schema
3. Add a new `fields.*` entry (e.g. `fields.text(...)`, `fields.checkbox(...)`)
4. Open the corresponding `.astro` page and read the new field via `reader`
5. The CMS admin will reflect the new field immediately on next page load

See the [Keystatic fields docs](https://keystatic.com/docs/fields/text) for the full field API.

---

## Key Files

| File | Purpose |
|---|---|
| `astro.config.mjs` | Astro config — site URL, integrations (React, Keystatic, sitemap), Netlify adapter |
| `keystatic.config.ts` | Full CMS schema — all singletons and collections with their fields |
| `src/lib/reader.ts` | Shared Keystatic reader instance used by all `.astro` pages to fetch content |
| `netlify.toml` | Netlify build config (`npm run build`, publish `dist`) |

---

## Deployment

Deploys are automatic. Push to `main` and Netlify builds and deploys within ~1 minute.

No manual deploy step is needed.

---

## Environment Variables

In production (Netlify), Keystatic uses GitHub storage mode. The following environment variables must be set in the Netlify dashboard:

| Variable | Purpose |
|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` | GitHub OAuth app client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |
| `KEYSTATIC_SECRET` | Random secret used to sign Keystatic session tokens |

To rotate these: update the values in Netlify > Site configuration > Environment variables, then trigger a redeploy.

The GitHub OAuth app should be configured with:
- **Homepage URL:** `https://ivanoconte.com`
- **Authorization callback URL:** `https://ivanoconte.com/api/keystatic/github/oauth/callback`

---

## Switching Storage Mode

`keystatic.config.ts` currently has `storage: { kind: "local" }`. In production on Netlify, Keystatic automatically switches to GitHub mode if the environment variables are present (this is handled by the `@keystatic/astro` integration).

If you need to force GitHub mode locally for testing, change the storage config to:

```ts
storage: {
  kind: "github",
  repo: "owner/repo-name",
},
```

---

## Adding a New Page

1. Create a new `.astro` file in `src/pages/`
2. If it needs editable content, add a new singleton in `keystatic.config.ts`
3. Read content in the page using the shared `reader` from `src/lib/reader.ts`
4. Add the page to the navigation in Site Settings via the CMS

---

## Client Guide

For non-technical instructions on how to use the CMS, see [`docs/user-guide.md`](docs/user-guide.md).
