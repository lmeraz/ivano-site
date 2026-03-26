# Ivano Workshops Site

## Commands
- `npm run dev` — dev server at localhost:4321
- `npm run build` — static build to `dist/` (~1s, no test suite)
- `make deploy` — build + deploy to Netlify production
- Node >=22.12.0 required

## Architecture
- Astro 6 static site, zero client-side JS, TypeScript strict mode
- `src/data/site.ts` — single source of truth for all content, metadata, and structured data helpers
- `src/layouts/BaseLayout.astro` — HTML shell, SEO meta, Google Fonts, JSON-LD injection
- `src/components/` — server-rendered Astro components, props via `interface Props`
- `src/styles/global.css` — single CSS file, BEM naming (`.block__element--modifier`)
- `src/pages/workshops/[slug].astro` — dynamic routes via `getStaticPaths()` from workshops array

## Key Patterns
- Edit content in `site.ts`, not in page templates — pages are thin display layers
- Derived exports (`featuredWorkshops`, `featuredTestimonials`) prevent duplicated slicing in pages
- Schema helpers: `personSchema(path)` and `eventSchema(workshop)` return JSON-LD objects
- Workshop CTA: `registrationUrl` (optional external) falls back to `fallbackUrl` + `fallbackLabel`
- `WorkshopStatus` type (`"open" | "waitlist" | "soon"`) drives CSS class and page filtering

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
