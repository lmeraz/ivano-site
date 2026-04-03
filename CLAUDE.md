# Ivano Workshops Site

## Commands
- `npm run dev` — dev server at localhost:4321
- `npm run build` — static build to `dist/` (~1s, no test suite)
- `npm run preview` — preview production build locally
- `make deploy` — build + deploy to Netlify production
- Node >=22.12.0 required

## Architecture
- Astro 6 site with hybrid output (static pages + SSR admin route), TypeScript strict mode
- **Keystatic CMS** — content edited at `/keystatic` admin UI, stored as JSON in `src/content/`
- `raw/` — unstructured client materials (markdown, Word docs, photos) used as source for content population
- `docs/superpowers/specs/` — design specs for site features and tooling
- `keystatic.config.ts` — CMS schema defining all singletons and collections
- `src/lib/reader.ts` — shared Keystatic reader instance + `personSchema(siteSettings, path)` pure helper
- `src/content/singletons/` — site settings, home, about, contact, testimonials, FAQs (JSON)
- `src/content/workshops/` — one JSON file per workshop
- `src/content/past-workshops/` — one JSON file per past workshop
- `src/layouts/BaseLayout.astro` — HTML shell, SEO meta, Google Fonts, JSON-LD injection
- `src/components/` — server-rendered Astro components, props via `interface Props`
- `src/styles/global.css` — single CSS file, BEM naming (`.block__element--modifier`)
- `src/pages/workshops/[slug].astro` — dynamic routes via `getStaticPaths()` from Keystatic reader

## Key Patterns
- Client intake toolkit (`docs/superpowers/specs/2026-04-03-client-intake-toolkit-design.md`) defines the repeatable workflow for collecting content from new clients
- Edit content via Keystatic admin UI or JSON files in `src/content/`, not in page templates
- Pages read content via `reader.singletons.<name>.read()` and `reader.collections.<name>.all()`
- Featured workshops use a `featured` boolean field, filtered on the home page
- Contact channel mailto hrefs are built dynamically from `siteSettings.email` + channel subject
- Schema helpers: `personSchema(siteSettings, path)` in `src/lib/reader.ts` returns JSON-LD Person objects
- Workshop CTA: `registrationUrl` (optional external) falls back to `fallbackUrl` + `fallbackLabel`
- Workshop status (`"open" | "waitlist" | "soon"`) drives CSS class and page filtering
- `siteSettings` is read once in BaseLayout and passed as a prop to Header and Footer
- Pages use `Promise.all` for parallel Keystatic reads in frontmatter
- Workshop index maps status to sections: `"open"` → Registration Open, `"waitlist"` → Waitlist, `"soon"` → Coming Soon

## Style
- CSS custom properties in `:root` for colors, fonts, shadows, layout
- Fonts: Cormorant Garamond (display), Outfit (body) — all loaded weights are used
- Responsive breakpoints: 980px, 720px
- `.reveal` class for CSS-only staggered entrance animations (nth-child delays up to 5)

## Gotchas
- Images in `public/` are not optimized (no astro:assets) — referenced directly by path
- No tests — `npm run build` success is the verification step
- Sticky detail card offset (6rem) assumes fixed header height
- `.reveal` animation stagger only covers nth-child(1-5)
- Keystatic `format: "json"` must be set on all singletons and collections (default is YAML)
- `@keystatic/astro` auto-creates the admin route — do not add a manual `src/pages/keystatic/` route
- Keystatic reader returns deeply `readonly` objects — component prop types must use `readonly` arrays/fields
