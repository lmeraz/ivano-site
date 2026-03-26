# Ivano Workshops Starter

Static Astro starter for an actor-performer who hosts public workshops and private training. The site is built to stay fast, cheap to host, and easy to maintain.

## Stack

- `Astro` for static rendering and minimal client-side JavaScript
- Plain CSS for styling
- `@astrojs/sitemap` for automatic sitemap generation
- External registration and payment links so workshop checkout stays out of the main site

## Run

```sh
npm install
npm run dev
```

Build for production:

```sh
npm run build
```

## Key Files

- `src/data/site.ts`: editable content, workshop details, and external links
- `src/layouts/BaseLayout.astro`: page shell, SEO metadata, and structured data hooks
- `src/styles/global.css`: design system and all site styles
- `src/pages/workshops/[slug].astro`: workshop detail template with event schema

## What To Replace First

1. Update the site URL in `astro.config.mjs`.
2. Replace placeholder copy and contact details in `src/data/site.ts`.
3. Add real registration URLs for each workshop when Eventbrite pages are ready.
4. Add a real newsletter or booking URL if Beehiiv, MailerLite, Brevo, or Calendly is being used.

## Recommended Maintenance Flow

- Keep the main site as the public marketing layer.
- Use each workshop detail page for the editorial overview.
- Send the actual checkout to Eventbrite or another ticketing tool.
- Edit dates, prices, and CTA links in `src/data/site.ts` instead of touching templates.
