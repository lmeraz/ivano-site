# Keystatic CMS Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Keystatic CMS so the client can edit all site content through a web-based admin UI, and deploy via Netlify with auto-builds.

**Architecture:** Migrate all content from the hardcoded `src/data/site.ts` TypeScript file into Keystatic-managed JSON files under `src/content/`. Keystatic provides a `/keystatic` admin route where the client edits content through forms. Astro reads content at build time via Keystatic's reader API. The site deploys on Netlify with `hybrid` output mode (static pages + server-rendered admin route).

**Tech Stack:** Astro 6, Keystatic, React (Keystatic dependency), Netlify adapter

---

## File Structure

### New files
- `keystatic.config.ts` — Keystatic schema: all singletons and collections
- `src/pages/keystatic/[...params].astro` — Admin UI route
- `src/lib/reader.ts` — Keystatic reader instance (shared across pages)
- `src/content/singletons/site-settings.json` — Site name, role, email, etc.
- `src/content/singletons/home.json` — Stats, pillars, process steps
- `src/content/singletons/about.json` — About page copy
- `src/content/singletons/contact.json` — Contact page copy
- `src/content/singletons/testimonials.json` — Testimonials array
- `src/content/singletons/faqs.json` — FAQ entries
- `src/content/workshops/commedia-dell-arte-la-2026.json` — (one per workshop)
- `src/content/workshops/neutral-mask-la-2026.json`
- `src/content/workshops/mask-and-play-corsica-2026.json`
- `src/content/workshops/embodied-poetics-padua-2026.json`
- `src/content/workshops/commedia-dell-arte-lyon-2026.json`
- `src/content/past-workshops/` — one JSON file per past workshop entry
- `netlify.toml` — Netlify build config

### Modified files
- `package.json` — add dependencies
- `astro.config.mjs` — add React, Keystatic, Netlify integrations; set hybrid output
- `src/layouts/BaseLayout.astro` — read site settings from Keystatic reader instead of `site.ts`
- `src/components/Header.astro` — read navigation from Keystatic reader
- `src/components/Footer.astro` — read site settings from Keystatic reader
- `src/pages/index.astro` — read all home page content from Keystatic reader
- `src/pages/about.astro` — read about content from Keystatic reader
- `src/pages/contact.astro` — read contact + site settings from Keystatic reader
- `src/pages/workshops/index.astro` — read workshops + past workshops from Keystatic reader
- `src/pages/workshops/[slug].astro` — read individual workshop from Keystatic reader

### Removed files
- `src/data/site.ts` — fully replaced by Keystatic content

---

## Task 1: Install Dependencies and Configure Astro

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Install Keystatic, React, and Netlify adapter**

```bash
cd /Users/lmeraz/src/ivano-site
npm install @keystatic/core @keystatic/astro @astrojs/react @astrojs/netlify
```

- [ ] **Step 2: Update `astro.config.mjs`**

Replace the entire file with:

```javascript
// @ts-check
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.ivanoworkshops.com",
  output: "hybrid",
  adapter: netlify(),
  integrations: [react(), keystatic(), sitemap()],
});
```

- [ ] **Step 3: Create `netlify.toml`**

Create `netlify.toml` at project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 4: Verify the dev server starts**

```bash
npm run dev
```

Expected: Dev server starts without errors. The `/keystatic` route may show a config error — that's expected since we haven't created the config yet.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json astro.config.mjs netlify.toml
git commit -m "feat: add Keystatic, React, and Netlify adapter dependencies"
```

---

## Task 2: Define Keystatic Schema

**Files:**
- Create: `keystatic.config.ts`

- [ ] **Step 1: Create `keystatic.config.ts` at project root**

```typescript
import { collection, config, fields, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
    siteSettings: singleton({
      label: "Site Settings",
      path: "src/content/singletons/site-settings",
      schema: {
        name: fields.text({ label: "Name", validation: { isRequired: true } }),
        role: fields.text({ label: "Role" }),
        baseCity: fields.text({ label: "Base City" }),
        siteUrl: fields.url({ label: "Site URL" }),
        email: fields.text({ label: "Email" }),
        instagram: fields.url({ label: "Instagram URL" }),
        description: fields.text({ label: "Site Description", multiline: true }),
        navigation: fields.array(
          fields.object({
            label: fields.text({ label: "Label", validation: { isRequired: true } }),
            href: fields.text({ label: "URL Path", validation: { isRequired: true } }),
          }),
          {
            label: "Navigation Items",
            itemLabel: (props) => props.fields.label.value,
          }
        ),
      },
    }),
    home: singleton({
      label: "Home Page",
      path: "src/content/singletons/home",
      schema: {
        stats: fields.array(
          fields.object({
            value: fields.text({ label: "Value", validation: { isRequired: true } }),
            label: fields.text({ label: "Label", validation: { isRequired: true } }),
          }),
          {
            label: "Stats",
            itemLabel: (props) => props.fields.label.value,
          }
        ),
        pillars: fields.array(
          fields.object({
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            description: fields.text({ label: "Description", multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: "Workshop Pillars",
            itemLabel: (props) => props.fields.title.value,
          }
        ),
        process: fields.array(
          fields.object({
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            description: fields.text({ label: "Description", multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: "Process Steps",
            itemLabel: (props) => props.fields.title.value,
          }
        ),
      },
    }),
    about: singleton({
      label: "About Page",
      path: "src/content/singletons/about",
      schema: {
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroDescription: fields.text({ label: "Hero Description", multiline: true }),
        bioParagraphs: fields.array(
          fields.text({ label: "Paragraph", multiline: true }),
          { label: "Biography Paragraphs" }
        ),
        teachingQuotes: fields.array(
          fields.text({ label: "Quote", multiline: true }),
          { label: "Teaching Story Quotes" }
        ),
        idealStudents: fields.array(
          fields.object({
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            description: fields.text({ label: "Description", multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: "Ideal Student Types",
            itemLabel: (props) => props.fields.title.value,
          }
        ),
      },
    }),
    contact: singleton({
      label: "Contact Page",
      path: "src/content/singletons/contact",
      schema: {
        heroHeadline: fields.text({ label: "Hero Headline" }),
        heroDescription: fields.text({ label: "Hero Description", multiline: true }),
        channels: fields.array(
          fields.object({
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            description: fields.text({ label: "Description", multiline: true, validation: { isRequired: true } }),
            href: fields.text({ label: "Link URL", validation: { isRequired: true } }),
            label: fields.text({ label: "Button Label", validation: { isRequired: true } }),
          }),
          {
            label: "Contact Channels",
            itemLabel: (props) => props.fields.title.value,
          }
        ),
      },
    }),
    testimonials: singleton({
      label: "Testimonials",
      path: "src/content/singletons/testimonials",
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: "Name", validation: { isRequired: true } }),
            credit: fields.text({ label: "Credit", validation: { isRequired: true } }),
            quote: fields.text({ label: "Quote", multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: "Testimonials",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),
    faqs: singleton({
      label: "FAQs",
      path: "src/content/singletons/faqs",
      schema: {
        items: fields.array(
          fields.object({
            question: fields.text({ label: "Question", validation: { isRequired: true } }),
            answer: fields.text({ label: "Answer", multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: "FAQ Entries",
            itemLabel: (props) => props.fields.question.value,
          }
        ),
      },
    }),
  },
  collections: {
    workshops: collection({
      label: "Workshops",
      slugField: "slug",
      path: "src/content/workshops/*",
      schema: {
        slug: fields.text({ label: "URL Slug", validation: { isRequired: true } }),
        title: fields.text({ label: "Title", validation: { isRequired: true } }),
        badge: fields.text({ label: "Badge (e.g. 'Los Angeles Intensive')", validation: { isRequired: true } }),
        featured: fields.checkbox({ label: "Featured on Home Page", defaultValue: false }),
        strapline: fields.text({ label: "Strapline", multiline: true }),
        summary: fields.text({ label: "Summary", multiline: true, validation: { isRequired: true } }),
        lead: fields.text({ label: "Lead Paragraph", multiline: true }),
        dateLabel: fields.text({ label: "Date Label (display)", validation: { isRequired: true } }),
        timeLabel: fields.text({ label: "Time Label" }),
        startDate: fields.text({ label: "Start Date (ISO)", validation: { isRequired: true } }),
        endDate: fields.text({ label: "End Date (ISO)", validation: { isRequired: true } }),
        location: fields.text({ label: "Location", validation: { isRequired: true } }),
        venue: fields.text({ label: "Venue", validation: { isRequired: true } }),
        priceLabel: fields.text({ label: "Price Label" }),
        format: fields.text({ label: "Format (e.g. In-person)" }),
        level: fields.text({ label: "Level (e.g. Open level)" }),
        seats: fields.text({ label: "Seats (e.g. Limited)" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Registration Open", value: "open" },
            { label: "Waitlist", value: "waitlist" },
            { label: "Coming Soon", value: "soon" },
          ],
          defaultValue: "soon",
        }),
        statusLabel: fields.text({ label: "Status Label (display)" }),
        registrationUrl: fields.url({ label: "Registration URL (optional)" }),
        fallbackUrl: fields.text({ label: "Fallback URL" }),
        fallbackLabel: fields.text({ label: "Fallback Button Label" }),
        audience: fields.array(fields.text({ label: "Audience Item" }), {
          label: "Who This Is For",
        }),
        outcomes: fields.array(fields.text({ label: "Outcome Item" }), {
          label: "What You Leave With",
        }),
        schedule: fields.array(
          fields.object({
            label: fields.text({ label: "Label", validation: { isRequired: true } }),
            detail: fields.text({ label: "Detail", multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: "Session Flow",
            itemLabel: (props) => props.fields.label.value,
          }
        ),
      },
    }),
    pastWorkshops: collection({
      label: "Past Workshops",
      slugField: "title",
      path: "src/content/past-workshops/*",
      schema: {
        title: fields.text({ label: "Title", validation: { isRequired: true } }),
        location: fields.text({ label: "Location", validation: { isRequired: true } }),
        dates: fields.text({ label: "Dates", validation: { isRequired: true } }),
      },
    }),
  },
});
```

- [ ] **Step 2: Verify Keystatic admin loads**

```bash
npm run dev
```

Visit `http://localhost:4321/keystatic`. Expected: Keystatic admin dashboard with empty singletons and collections listed in the sidebar.

- [ ] **Step 3: Commit**

```bash
git add keystatic.config.ts
git commit -m "feat: define Keystatic schema for all site content"
```

---

## Task 3: Create Keystatic Admin Route

**Files:**
- Create: `src/pages/keystatic/[...params].astro`

- [ ] **Step 1: Create the admin route file**

```bash
mkdir -p /Users/lmeraz/src/ivano-site/src/pages/keystatic
```

Create `src/pages/keystatic/[...params].astro`:

```astro
---
import { makeHandler } from '@keystatic/astro/api';
import keystaticConfig from '../../../keystatic.config';

export const prerender = false;

export const ALL = makeHandler({
  config: keystaticConfig,
});
---
```

- [ ] **Step 2: Verify the admin route works**

```bash
npm run dev
```

Visit `http://localhost:4321/keystatic`. Expected: Full Keystatic admin UI loads with sidebar showing all singletons and collections.

- [ ] **Step 3: Commit**

```bash
git add src/pages/keystatic/
git commit -m "feat: add Keystatic admin route"
```

---

## Task 4: Migrate Content — Singletons

**Files:**
- Create: `src/content/singletons/site-settings.json`
- Create: `src/content/singletons/home.json`
- Create: `src/content/singletons/about.json`
- Create: `src/content/singletons/contact.json`
- Create: `src/content/singletons/testimonials.json`
- Create: `src/content/singletons/faqs.json`

- [ ] **Step 1: Create `src/content/singletons/site-settings.json`**

```json
{
  "name": "Ivano Conte",
  "role": "Theatre pedagogue, movement teacher, and Commedia dell'Arte specialist",
  "baseCity": "Rome",
  "siteUrl": "https://www.ivanoworkshops.com",
  "email": "ivano.conte@gmail.com",
  "instagram": "https://www.instagram.com/ivano.conte",
  "description": "Ivano Conte leads Commedia dell'Arte, Neutral Mask, and physical theatre workshops rooted in the Lecoq pedagogy. International intensives for performers seeking authenticity, expressivity, and a living theatrical presence.",
  "navigation": [
    { "label": "Home", "href": "/" },
    { "label": "Workshops", "href": "/workshops/" },
    { "label": "About", "href": "/about/" },
    { "label": "Contact", "href": "/contact/" }
  ]
}
```

- [ ] **Step 2: Create `src/content/singletons/home.json`**

```json
{
  "stats": [
    { "value": "8+", "label": "International workshops taught" },
    { "value": "5", "label": "Countries across three continents" },
    { "value": "Lecoq", "label": "Pedagogy rooted in the tradition" }
  ],
  "pillars": [
    {
      "title": "Play and experimentation",
      "description": "A space open to mistakes, where performers feel free to try, to fail, and to discover. Play within the group is the foundation of every session."
    },
    {
      "title": "Warmth and presence",
      "description": "Teaching that is close, smiling, and firm when necessary. No walls between teacher and student -- just shared commitment to the work."
    },
    {
      "title": "Physical discipline meets imagination",
      "description": "Rigorous physical training blended with creative exploration, guiding performers toward authenticity, expressivity, and a living theatrical presence."
    }
  ],
  "process": [
    {
      "title": "Enter through the body",
      "description": "Every session begins with physical preparation -- breath, rhythm, and awareness. The body becomes the instrument before the mask or the character arrives."
    },
    {
      "title": "Play within the ensemble",
      "description": "Work happens in the group. Performers discover characters, impulses, and dynamics through collective play, improvisation, and the generous exchange of energy."
    },
    {
      "title": "Carry it forward",
      "description": "Each workshop closes with reflection and integration. What was discovered in the room becomes a tool for the stage, the rehearsal, and life itself."
    }
  ]
}
```

- [ ] **Step 3: Create `src/content/singletons/about.json`**

```json
{
  "heroHeadline": "A teacher who breaks down the fourth wall between himself and the student.",
  "heroDescription": "Theatre pedagogue and movement teacher trained in the Lecoq pedagogy. A graduate of Il Cantiere Teatrale in Rome, Associate Lecoq Pedagogue with Embodied Poetics, and certified Feldenkrais Method practitioner.",
  "bioParagraphs": [
    "Ivano Conte is a theatre pedagogue and movement teacher trained in the Lecoq pedagogy. A graduate of Il Cantiere Teatrale in Rome, where he later became a founding member and teacher, he has studied with renowned masters including Norman Taylor, Amy Russell, Philippe Gaulier, Lassaad Saidi, Antonio Fava, José Piris Pereda, Mai Rojas, Pablo Ibarluzea, Miguel Ángel Gutiérrez, Vladimir Olshansky, Carlo Boso, and Emmanuel Gallot-Lavallée.",
    "Ivano is an Associate Lecoq Pedagogue with Embodied Poetics, where he contributes to the transmission of Jacques Lecoq's methodology, focusing on movement analysis, Commedia dell'Arte, Bouffons, and the creative process. He has taught internationally, leading workshops in Italy, Canada, France, Corsica, and the United States.",
    "In addition, Ivano is a certified Feldenkrais Method practitioner, integrating somatic awareness into actor training to deepen presence, precision, and creative freedom. His approach blends rigorous physical discipline with imaginative exploration, guiding performers toward authenticity, expressivity, and a living theatrical presence."
  ],
  "teachingQuotes": [
    "My teaching philosophy is based on play within the group and on creating a space that is open to experimentation -- and also to mistakes -- with the understanding that mistakes lead us to learn something and should not be demonized. I believe that a class in which people feel free to try, and even to 'be terrible,' is a class that is free to discover itself.",
    "I try to be the first to step into this mindset, bringing a teaching style that is warm, smiling, and present, yet firm when necessary so that students can truly learn. I aim to stay close to my students, so they feel supported and open to listening to what is being offered to them.",
    "Perhaps also because of my relatively young age, I do not yet feel the need to build that large wall that often stands between teacher and student. I believe that breaking down this 'fourth wall' between myself and the student helps me better understand what they truly need."
  ],
  "idealStudents": [
    {
      "title": "The willing",
      "description": "Someone who is not afraid to get their hands dirty. This does not exclude people who feel insecure -- on the contrary, they are the best to have in this kind of work."
    },
    {
      "title": "The insecure",
      "description": "As someone who is insecure, shy, and introverted himself, Ivano found in \"masked\" play the freedom to express himself and then bring that freedom into real life."
    },
    {
      "title": "The curious",
      "description": "\"I do not believe that theatre is therapy, but I do believe that physical work leads to changes we can truly feel, allowing us to discover something new about ourselves.\""
    }
  ]
}
```

- [ ] **Step 4: Create `src/content/singletons/contact.json`**

```json
{
  "heroHeadline": "Join the next workshop, or bring the work to your studio.",
  "heroDescription": "Whether you want to register for an upcoming intensive, invite Ivano to teach at your school or festival, or simply ask a question -- reach out. Andrea and Ivano are here to help.",
  "channels": [
    {
      "title": "Workshop registration",
      "description": "Interested in an upcoming workshop? Reach out for pricing, availability, and registration details.",
      "href": "mailto:ivano.conte@gmail.com?subject=Workshop%20Registration%20Inquiry",
      "label": "Email about workshops"
    },
    {
      "title": "Guest teaching",
      "description": "Invite Ivano to lead a guest workshop, intensive, or residency at your studio, school, or festival.",
      "href": "mailto:ivano.conte@gmail.com?subject=Guest%20Teaching%20Inquiry",
      "label": "Inquire about guest teaching"
    },
    {
      "title": "Scholarships",
      "description": "Scholarships are available for practitioners of color, trans theatre-makers, and those from underrepresented backgrounds.",
      "href": "mailto:ivano.conte@gmail.com?subject=Scholarship%20Inquiry",
      "label": "Ask about scholarships"
    },
    {
      "title": "General inquiries",
      "description": "Questions about the work, the pedagogy, or anything else? Andrea and Ivano are happy to help.",
      "href": "mailto:ivano.conte@gmail.com",
      "label": "ivano.conte@gmail.com"
    }
  ]
}
```

- [ ] **Step 5: Create `src/content/singletons/testimonials.json`**

```json
{
  "items": [
    {
      "name": "Workshop participant",
      "credit": "Commedia dell'Arte, Montreal, March 2025",
      "quote": "I found his entire curriculum to be effectively planned and structured. He introduced new concepts and exercises at a natural and helpful pace, ensuring we had time to absorb, take notes and implement in action everything we learned. We would all jump at the chance to learn from him again."
    },
    {
      "name": "Workshop participant",
      "credit": "Bouffons and Commedia dell'Arte",
      "quote": "Ivano is a wonderful, observant and thoughtful teacher. His classes always feel like a playground to experiment and explore different forms. He has an innate ability to create a warm, inviting atmosphere which helped me be more of myself."
    },
    {
      "name": "Workshop participant",
      "credit": "Commedia dell'Arte and Feldenkrais Method",
      "quote": "Ivano does not simply teach techniques; he guides you through a personal journey, helping you overcome physical, emotional, or expressive blocks. His attention to each individual student is sincere and consistent."
    },
    {
      "name": "Former student",
      "credit": "Giovanni Arnone Theatre Academy, 3 years",
      "quote": "He has been one of the best teachers I have ever had. His humor and the irony with which he approaches each lesson are contagious. A true great professional, both as an actor and as a teacher, and on a human level, a truly wonderful person."
    },
    {
      "name": "Workshop participant",
      "credit": "Physical theatre workshops",
      "quote": "Ivano is an extremely knowledgeable, precise, and reliable professional. One of the things I appreciated most is the seriousness he brings to the work, conveyed with remarkable lightness. A rare encounter that undoubtedly leaves a lasting mark."
    }
  ]
}
```

- [ ] **Step 6: Create `src/content/singletons/faqs.json`**

```json
{
  "items": [
    {
      "question": "Do I need previous experience in physical theatre or Commedia dell'Arte?",
      "answer": "No. Each workshop lists its expected level, but many sessions are open to all. The work meets you where you are. What matters most is willingness to play and put yourself on the line."
    },
    {
      "question": "What should I wear or bring to a workshop?",
      "answer": "Comfortable clothing that allows full movement. Soft-soled shoes or bare feet depending on the venue. Everything else -- masks, props, materials -- is provided."
    },
    {
      "question": "Can I attend a workshop if I'm not a professional actor?",
      "answer": "Absolutely. The work is valuable for anyone drawn to physical expression, presence, and play. Theatre-makers, dancers, educators, and curious beginners are all welcome."
    },
    {
      "question": "Are scholarships or reduced rates available?",
      "answer": "We are committed to providing paths of access for practitioners of color, trans theatre-makers, and those from backgrounds not typically represented in the field. Scholarships are available -- please reach out to inquire."
    },
    {
      "question": "Can I bring Ivano to my school, studio, or festival?",
      "answer": "Yes. Ivano regularly leads guest workshops at studios, conservatories, and festivals internationally. Use the contact page to discuss format, duration, and logistics."
    }
  ]
}
```

- [ ] **Step 7: Verify singletons load in Keystatic admin**

```bash
npm run dev
```

Visit `http://localhost:4321/keystatic`. Click each singleton in the sidebar. Expected: All fields pre-populated with the migrated content.

- [ ] **Step 8: Commit**

```bash
git add src/content/singletons/
git commit -m "feat: migrate singleton content to Keystatic JSON files"
```

---

## Task 5: Migrate Content — Workshops Collection

**Files:**
- Create: `src/content/workshops/commedia-dell-arte-la-2026.json`
- Create: `src/content/workshops/neutral-mask-la-2026.json`
- Create: `src/content/workshops/mask-and-play-corsica-2026.json`
- Create: `src/content/workshops/embodied-poetics-padua-2026.json`
- Create: `src/content/workshops/commedia-dell-arte-lyon-2026.json`

- [ ] **Step 1: Create `src/content/workshops/commedia-dell-arte-la-2026.json`**

```json
{
  "slug": "commedia-dell-arte-la-2026",
  "title": "Commedia dell'Arte",
  "badge": "Los Angeles Intensive",
  "featured": true,
  "strapline": "Five days of Commedia dell'Arte and the foundations of physical theatre in Los Angeles.",
  "summary": "An intensive workshop exploring the masks, characters, and physical language of Commedia dell'Arte. Rooted in the Lecoq pedagogy, this five-day immersion covers character analysis, improvisation, rhythm, and the foundational principles of masked performance.",
  "lead": "Whether you are encountering Commedia for the first time or returning to deepen your practice, this intensive offers a rigorous and playful exploration of one of theatre's oldest living traditions.",
  "dateLabel": "April 27 -- May 1, 2026",
  "timeLabel": "Full days",
  "startDate": "2026-04-27T10:00:00-07:00",
  "endDate": "2026-05-01T18:00:00-07:00",
  "location": "Los Angeles, USA",
  "venue": "Industry Loft",
  "priceLabel": "Contact for pricing",
  "format": "In-person",
  "level": "Open level",
  "seats": "Limited",
  "status": "open",
  "statusLabel": "Registration open",
  "registrationUrl": null,
  "fallbackUrl": "mailto:ivano.conte@gmail.com?subject=Commedia%20dell'Arte%20LA%20-%20Registration",
  "fallbackLabel": "Register by email",
  "audience": [
    "Actors and performers seeking physical theatre training rooted in a living tradition",
    "Returning students who want to deepen their Commedia dell'Arte practice",
    "Theatre-makers curious about masked performance and the Lecoq approach"
  ],
  "outcomes": [
    "Understanding of key Commedia dell'Arte characters and their physical signatures",
    "Practical skills in masked improvisation, rhythm, and ensemble play",
    "A deeper relationship with the body as the primary instrument of performance"
  ],
  "schedule": [
    { "label": "Physical preparation", "detail": "Each day opens with body work -- breath, rhythm, and spatial awareness to prepare the instrument." },
    { "label": "Character and mask work", "detail": "Progressive exploration of Commedia characters through the mask, from first encounters to improvised scenes." },
    { "label": "Ensemble play and integration", "detail": "Group improvisations that weave the day's discoveries into shared theatrical play." }
  ]
}
```

- [ ] **Step 2: Create `src/content/workshops/neutral-mask-la-2026.json`**

```json
{
  "slug": "neutral-mask-la-2026",
  "title": "Neutral Mask",
  "badge": "Los Angeles Weekend",
  "featured": true,
  "strapline": "Three days focused on the essential principles of Jacques Lecoq's pedagogy and the foundational work of presence.",
  "summary": "The Neutral Mask is the starting point of Lecoq's pedagogy -- a tool for discovering economy of movement, clarity of intention, and the deepest presence an actor can bring to the stage. This three-day workshop explores the mask as a mirror of essential human movement.",
  "lead": "If you want to go deeper into the foundational work of Jacques Lecoq's pedagogy, Neutral Mask work is exactly what you are looking for. A weekend of clarity, physical awareness, and presence.",
  "dateLabel": "May 8 -- 10, 2026",
  "timeLabel": "Full days",
  "startDate": "2026-05-08T10:00:00-07:00",
  "endDate": "2026-05-10T18:00:00-07:00",
  "location": "Los Angeles, USA",
  "venue": "Thymele Arts",
  "priceLabel": "Contact for pricing",
  "format": "In-person",
  "level": "Open level",
  "seats": "Limited",
  "status": "open",
  "statusLabel": "Registration open",
  "registrationUrl": null,
  "fallbackUrl": "mailto:ivano.conte@gmail.com?subject=Neutral%20Mask%20LA%20-%20Registration",
  "fallbackLabel": "Register by email",
  "audience": [
    "Performers seeking the foundational body work of the Lecoq tradition",
    "Actors who completed the Commedia dell'Arte workshop and want to go deeper",
    "Anyone drawn to presence, physical clarity, and essential movement"
  ],
  "outcomes": [
    "Understanding of the Neutral Mask as a pedagogical tool for presence and economy",
    "Greater physical awareness, clarity of gesture, and spatial sensitivity",
    "A foundation for all subsequent mask work and physical theatre practice"
  ],
  "schedule": [
    { "label": "Body and space", "detail": "Opening work on breath, weight, and the relationship between the body and the surrounding space." },
    { "label": "The mask encounters", "detail": "Progressive exercises with the Neutral Mask -- movement journeys, elemental work, and essential human gestures." },
    { "label": "Integration", "detail": "Bringing the mask's lessons back into the unmasked body -- presence without artifice." }
  ]
}
```

- [ ] **Step 3: Create `src/content/workshops/mask-and-play-corsica-2026.json`**

```json
{
  "slug": "mask-and-play-corsica-2026",
  "title": "Mask and Play",
  "badge": "Corsica Intensive",
  "featured": false,
  "strapline": "An immersive exploration of mask work and theatrical play on the island of Corsica.",
  "summary": "Mask and Play brings together various mask traditions -- from Neutral to Expressive -- in an intensive format surrounded by the landscape of Corsica. The workshop explores how the mask liberates the performer's body and imagination.",
  "lead": "A unique opportunity to work with masks in an inspiring Mediterranean setting, combining rigorous physical training with the freedom of play.",
  "dateLabel": "May 2026",
  "timeLabel": "Full days",
  "startDate": "2026-05-15T10:00:00+02:00",
  "endDate": "2026-05-20T18:00:00+02:00",
  "location": "Ajaccio, Corsica",
  "venue": "Ajaccio",
  "priceLabel": "Contact for pricing",
  "format": "In-person",
  "level": "Open level",
  "seats": "Limited",
  "status": "soon",
  "statusLabel": "Coming soon",
  "registrationUrl": null,
  "fallbackUrl": "mailto:ivano.conte@gmail.com?subject=Mask%20and%20Play%20Corsica%20-%20Interest",
  "fallbackLabel": "Express interest",
  "audience": [
    "Performers wanting an immersive mask experience in a unique setting",
    "Theatre-makers exploring the relationship between mask, body, and environment",
    "International practitioners seeking intensive training outside the studio"
  ],
  "outcomes": [
    "Experience across multiple mask traditions and their physical demands",
    "Deeper understanding of how environment and space shape theatrical play",
    "Skills in mask-based improvisation and ensemble creation"
  ],
  "schedule": [
    { "label": "Morning body work", "detail": "Physical preparation attuned to the natural environment -- breath, rhythm, and spatial awareness." },
    { "label": "Mask explorations", "detail": "Working through different mask families with exercises designed for discovery and play." },
    { "label": "Evening ensemble", "detail": "Collective creation sessions where the day's explorations become shared theatrical moments." }
  ]
}
```

- [ ] **Step 4: Create `src/content/workshops/embodied-poetics-padua-2026.json`**

```json
{
  "slug": "embodied-poetics-padua-2026",
  "title": "First Voyage of Embodied Poetics",
  "badge": "Padua Residency",
  "featured": false,
  "strapline": "A deep residency in Padua exploring the full arc of Lecoq's pedagogy through Embodied Poetics.",
  "summary": "The First Voyage is an extended residency that traces the foundational arc of Jacques Lecoq's methodology -- from movement analysis through mask work, Commedia dell'Arte, and the creative process. An intensive journey for serious practitioners.",
  "lead": "An extended immersion in the Lecoq tradition, designed for those ready to commit to a deeper, sustained exploration of physical theatre and its creative possibilities.",
  "dateLabel": "June -- July 2026",
  "timeLabel": "Multi-week residency",
  "startDate": "2026-06-15T10:00:00+02:00",
  "endDate": "2026-07-15T18:00:00+02:00",
  "location": "Padua, Italy",
  "venue": "Padua",
  "priceLabel": "Contact for pricing",
  "format": "In-person",
  "level": "Intermediate to advanced",
  "seats": "Limited",
  "status": "soon",
  "statusLabel": "Coming soon",
  "registrationUrl": null,
  "fallbackUrl": "mailto:ivano.conte@gmail.com?subject=Embodied%20Poetics%20Padua%20-%20Interest",
  "fallbackLabel": "Express interest",
  "audience": [
    "Committed practitioners seeking an extended physical theatre residency",
    "Performers and educators wanting a comprehensive Lecoq methodology experience",
    "Artists ready for sustained, intensive training over multiple weeks"
  ],
  "outcomes": [
    "A comprehensive understanding of Lecoq's pedagogical arc",
    "Advanced skills in movement analysis, mask work, and ensemble creation",
    "A personal creative practice grounded in physical theatre principles"
  ],
  "schedule": [
    { "label": "Movement foundations", "detail": "Daily practice in movement analysis, dynamics, and the physical laws that govern theatrical expression." },
    { "label": "Mask progression", "detail": "A journey through the mask families -- Neutral, Larval, Expressive, and Commedia dell'Arte." },
    { "label": "Creative laboratory", "detail": "Ensemble creation work that synthesizes the residency's explorations into original theatrical material." }
  ]
}
```

- [ ] **Step 5: Create `src/content/workshops/commedia-dell-arte-lyon-2026.json`**

```json
{
  "slug": "commedia-dell-arte-lyon-2026",
  "title": "Commedia dell'Arte",
  "badge": "Lyon Workshop",
  "featured": false,
  "strapline": "Commedia dell'Arte in Lyon -- an intensive workshop on masked characters and physical comedy.",
  "summary": "Returning to France for an intensive Commedia dell'Arte workshop in Lyon. The same rigorous, playful approach to masked performance and character work, now in one of Europe's great theatre cities.",
  "lead": "An opportunity to explore the Commedia tradition in the heart of a city deeply connected to theatrical innovation and the French physical theatre lineage.",
  "dateLabel": "October 2026",
  "timeLabel": "Full days",
  "startDate": "2026-10-01T10:00:00+02:00",
  "endDate": "2026-10-05T18:00:00+02:00",
  "location": "Lyon, France",
  "venue": "Lyon",
  "priceLabel": "Contact for pricing",
  "format": "In-person",
  "level": "Open level",
  "seats": "Limited",
  "status": "soon",
  "statusLabel": "Coming soon",
  "registrationUrl": null,
  "fallbackUrl": "mailto:ivano.conte@gmail.com?subject=Commedia%20Lyon%20-%20Interest",
  "fallbackLabel": "Express interest",
  "audience": [
    "European practitioners seeking Commedia dell'Arte training",
    "Performers interested in the intersection of Italian and French physical theatre traditions",
    "Theatre-makers wanting intensive masked performance work"
  ],
  "outcomes": [
    "Confident handling of key Commedia characters and their physical vocabularies",
    "Improvisation skills specific to the masked comedy tradition",
    "An embodied understanding of rhythm, timing, and comic precision"
  ],
  "schedule": [
    { "label": "Physical warm-up", "detail": "Daily body preparation focused on rhythm, agility, and the physical readiness Commedia demands." },
    { "label": "Character work", "detail": "Deep exploration of Commedia characters through mask, movement, and improvisation." },
    { "label": "Performance and play", "detail": "Ensemble scenes and lazzi that bring the characters to life in comic situations." }
  ]
}
```

- [ ] **Step 6: Verify workshops appear in Keystatic admin**

Visit `http://localhost:4321/keystatic`. Click "Workshops" in sidebar. Expected: All 5 workshops listed. Click one — all fields populated.

- [ ] **Step 7: Commit**

```bash
git add src/content/workshops/
git commit -m "feat: migrate workshop content to Keystatic collection"
```

---

## Task 6: Migrate Content — Past Workshops Collection

**Files:**
- Create: `src/content/past-workshops/` (8 JSON files)

- [ ] **Step 1: Create all past workshop JSON files**

Create `src/content/past-workshops/mimodynamics-padua-2026-02.json`:
```json
{ "title": "Mimodynamics", "location": "Padua, Italy", "dates": "February 2026" }
```

Create `src/content/past-workshops/movement-and-play-chens-2026-02.json`:
```json
{ "title": "Movement and Play", "location": "Chens-sur-Leman, France", "dates": "February 2026" }
```

Create `src/content/past-workshops/commedia-rome-2026-01.json`:
```json
{ "title": "Commedia dell'Arte", "location": "Rome, Italy", "dates": "January 2026" }
```

Create `src/content/past-workshops/commedia-la-2025-11.json`:
```json
{ "title": "Commedia dell'Arte", "location": "Los Angeles, USA", "dates": "November 2025" }
```

Create `src/content/past-workshops/neutral-mask-rome-2025-10.json`:
```json
{ "title": "Neutral Mask and Play", "location": "Rome, Italy", "dates": "October 2025" }
```

Create `src/content/past-workshops/bouffons-padua-2025-07.json`:
```json
{ "title": "Bouffons", "location": "Padua, Italy", "dates": "July 2025" }
```

Create `src/content/past-workshops/commedia-montreal-2025-03.json`:
```json
{ "title": "Commedia dell'Arte", "location": "Montreal, Canada", "dates": "March 2025" }
```

Create `src/content/past-workshops/commedia-montreal-2024-05.json`:
```json
{ "title": "Commedia dell'Arte", "location": "Montreal, Canada", "dates": "May 2024" }
```

- [ ] **Step 2: Verify past workshops appear in Keystatic admin**

Visit `http://localhost:4321/keystatic`. Click "Past Workshops" in sidebar. Expected: All 8 entries listed.

- [ ] **Step 3: Commit**

```bash
git add src/content/past-workshops/
git commit -m "feat: migrate past workshop content to Keystatic collection"
```

---

## Task 7: Create Keystatic Reader

**Files:**
- Create: `src/lib/reader.ts`

- [ ] **Step 1: Create `src/lib/reader.ts`**

```typescript
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

export async function personSchema(path = "/") {
  const siteSettings = await reader.singletons.siteSettings.read();
  if (!siteSettings) throw new Error("Site settings not found");
  return {
    "@context": "https://schema.org" as const,
    "@type": "Person" as const,
    name: siteSettings.name,
    jobTitle: siteSettings.role,
    description: siteSettings.description,
    email: siteSettings.email,
    url: `${siteSettings.siteUrl}${path}`,
    homeLocation: {
      "@type": "City" as const,
      name: siteSettings.baseCity,
    },
  };
}
```

- [ ] **Step 2: Commit**

```bash
mkdir -p src/lib
git add src/lib/reader.ts
git commit -m "feat: add Keystatic reader instance"
```

---

## Task 8: Update Layout and Shared Components

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Update `src/layouts/BaseLayout.astro`**

Replace the frontmatter (lines 1-29) with:

```astro
---
import Footer from "../components/Footer.astro";
import Header from "../components/Header.astro";
import { reader } from "../lib/reader";
import "../styles/global.css";

interface Props {
  title?: string;
  description?: string;
  path?: string;
  pageClass?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const siteSettings = await reader.singletons.siteSettings.read();
if (!siteSettings) throw new Error("Site settings not found");

const {
  title,
  description = siteSettings.description,
  path = Astro.url.pathname,
  pageClass = "",
  structuredData,
} = Astro.props;

const pageTitle = title ? `${title} | ${siteSettings.name}` : `${siteSettings.name} | Theatre Pedagogue`;
const canonicalUrl = new URL(path, siteSettings.siteUrl).toString();
const structured = structuredData
  ? Array.isArray(structuredData)
    ? structuredData
    : [structuredData]
  : [];
---
```

Update the OG image URL in the HTML body (line 51) from `${site.siteUrl}` to `${siteSettings.siteUrl}`:

```html
<meta property="og:image" content={`${siteSettings.siteUrl}/og-card.svg`} />
```

- [ ] **Step 2: Update `src/components/Header.astro`**

Replace the entire file with:

```astro
---
import { reader } from "../lib/reader";

interface Props {
  currentPath?: string;
}

const { currentPath = "/" } = Astro.props;

const siteSettings = await reader.singletons.siteSettings.read();
if (!siteSettings) throw new Error("Site settings not found");

const isActive = (href: string) => {
  if (href === "/") {
    return currentPath === "/";
  }
  return currentPath.startsWith(href);
};
---

<header class="site-header">
  <div class="site-header__inner">
    <a class="brand" href="/">
      <span class="brand__mark">IC</span>
      <span>
        <span class="brand__eyebrow">Theatre Pedagogue</span>
        <span class="brand__name">{siteSettings.name}</span>
      </span>
    </a>

    <nav class="nav" aria-label="Primary">
      {
        siteSettings.navigation.map((item) => (
          <a
            class:list={["nav__link", { "nav__link--active": isActive(item.href) }]}
            href={item.href}
          >
            {item.label}
          </a>
        ))
      }
    </nav>

    <a class="button nav__cta" href="/workshops/">Upcoming workshops</a>
  </div>
</header>
```

- [ ] **Step 3: Update `src/components/Footer.astro`**

Replace the entire file with:

```astro
---
import { reader } from "../lib/reader";

const siteSettings = await reader.singletons.siteSettings.read();
if (!siteSettings) throw new Error("Site settings not found");
---

<footer class="footer">
  <div class="footer__grid">
    <div>
      <p class="eyebrow">{siteSettings.name}</p>
      <h2>{siteSettings.role}</h2>
      <p>
        Commedia dell'Arte, Neutral Mask, and physical theatre workshops rooted
        in the Lecoq pedagogy. Based in {siteSettings.baseCity}, teaching internationally.
      </p>
    </div>

    <div>
      <h3>Explore</h3>
      <ul>
        {siteSettings.navigation.map((item) => <li><a href={item.href}>{item.label}</a></li>)}
      </ul>
    </div>

    <div>
      <h3>Connect</h3>
      <ul>
        <li><a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a></li>
        <li>Based in {siteSettings.baseCity}, Italy</li>
        <li>International workshops and intensives</li>
      </ul>
    </div>
  </div>

  <div class="footer__legal">
    <span>{siteSettings.name}</span>
    <span>Commedia dell'Arte, Neutral Mask, and physical theatre.</span>
  </div>
</footer>
```

- [ ] **Step 4: Verify dev server loads the home page**

```bash
npm run dev
```

Visit `http://localhost:4321/`. Expected: Page loads with header, footer, and navigation populated from Keystatic content. Other page content may still reference old imports — that's fine, we'll fix those next.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/Header.astro src/components/Footer.astro
git commit -m "feat: update layout and shared components to use Keystatic reader"
```

---

## Task 9: Update Home Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace `src/pages/index.astro` frontmatter and update data references**

Replace the frontmatter (lines 1-17) with:

```astro
---
import PillarGrid from "../components/PillarGrid.astro";
import SectionTitle from "../components/SectionTitle.astro";
import TestimonialGrid from "../components/TestimonialGrid.astro";
import WorkshopCard from "../components/WorkshopCard.astro";
import BaseLayout from "../layouts/BaseLayout.astro";
import { reader, personSchema } from "../lib/reader";

const siteSettings = await reader.singletons.siteSettings.read();
if (!siteSettings) throw new Error("Site settings not found");

const home = await reader.singletons.home.read();
if (!home) throw new Error("Home content not found");

const testimonialsData = await reader.singletons.testimonials.read();
if (!testimonialsData) throw new Error("Testimonials not found");

const faqsData = await reader.singletons.faqs.read();
if (!faqsData) throw new Error("FAQs not found");

const allWorkshops = await reader.collections.workshops.all();
const featuredWorkshops = allWorkshops
  .map((w) => w.entry)
  .filter((w) => w.featured);
---
```

In the template body, replace all data references:
- `site.description` → `siteSettings.description`
- `site.name` → `siteSettings.name`
- `personSchema()` → `await personSchema()`
- `stats` → `home.stats`
- `workshopPillars` → `home.pillars`
- `process` → `home.process`
- `featuredWorkshops` → `featuredWorkshops` (already correct)
- `testimonials.slice(0, 3)` → `testimonialsData.items.slice(0, 3)`
- `faqs` → `faqsData.items`

The template body stays structurally identical — only the variable names change.

- [ ] **Step 2: Verify the home page renders correctly**

```bash
npm run dev
```

Visit `http://localhost:4321/`. Expected: All sections render with correct content — hero, stats, pillars, featured workshops, process steps, testimonials, FAQs.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: update home page to read content from Keystatic"
```

---

## Task 10: Update About Page

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Replace `src/pages/about.astro` frontmatter**

Replace the frontmatter (lines 1-7) with:

```astro
---
import PastWorkshopList from "../components/PastWorkshopList.astro";
import PillarGrid from "../components/PillarGrid.astro";
import SectionTitle from "../components/SectionTitle.astro";
import TestimonialGrid from "../components/TestimonialGrid.astro";
import BaseLayout from "../layouts/BaseLayout.astro";
import { reader, personSchema } from "../lib/reader";

const siteSettings = await reader.singletons.siteSettings.read();
if (!siteSettings) throw new Error("Site settings not found");

const about = await reader.singletons.about.read();
if (!about) throw new Error("About content not found");

const home = await reader.singletons.home.read();
if (!home) throw new Error("Home content not found");

const testimonialsData = await reader.singletons.testimonials.read();
if (!testimonialsData) throw new Error("Testimonials not found");

const allPastWorkshops = await reader.collections.pastWorkshops.all();
const pastWorkshops = allPastWorkshops.map((w) => w.entry);
---
```

In the template body, update references:
- `site.name` → `siteSettings.name`
- The hardcoded hero `<h1>` → `{about.heroHeadline}`
- The hardcoded hero `<p>` → `{about.heroDescription}`
- The hardcoded biography `<article>` blocks → map over `about.bioParagraphs`:
  ```astro
  {about.bioParagraphs.map((para) => (
    <article class="info-card reveal">
      <p>{para}</p>
    </article>
  ))}
  ```
- `workshopPillars` → `home.pillars`
- The hardcoded teaching quotes → map over `about.teachingQuotes`:
  ```astro
  {about.teachingQuotes.map((quote) => (
    <article class="info-card reveal">
      <p>"{quote}"</p>
    </article>
  ))}
  ```
- The hardcoded ideal student `PillarGrid` → `<PillarGrid pillars={about.idealStudents} />`
- `pastWorkshops` → `pastWorkshops` (already correct variable name)
- `testimonials.slice(0, 3)` → `testimonialsData.items.slice(0, 3)`

- [ ] **Step 2: Verify the about page renders correctly**

```bash
npm run dev
```

Visit `http://localhost:4321/about/`. Expected: All sections render with correct content.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: update about page to read content from Keystatic"
```

---

## Task 11: Update Contact Page

**Files:**
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Replace `src/pages/contact.astro` frontmatter**

Replace the frontmatter (lines 1-35) with:

```astro
---
import SectionTitle from "../components/SectionTitle.astro";
import BaseLayout from "../layouts/BaseLayout.astro";
import { reader } from "../lib/reader";

const siteSettings = await reader.singletons.siteSettings.read();
if (!siteSettings) throw new Error("Site settings not found");

const contact = await reader.singletons.contact.read();
if (!contact) throw new Error("Contact content not found");
---
```

In the template body:
- `${site.name}` in description → `${siteSettings.name}`
- The hardcoded hero `<h1>` → `{contact.heroHeadline}`
- The hardcoded hero `<p>` → `{contact.heroDescription}`
- `channels` → `contact.channels`

- [ ] **Step 2: Verify the contact page renders correctly**

```bash
npm run dev
```

Visit `http://localhost:4321/contact/`. Expected: All contact channels render correctly.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: update contact page to read content from Keystatic"
```

---

## Task 12: Update Workshops Index Page

**Files:**
- Modify: `src/pages/workshops/index.astro`

- [ ] **Step 1: Replace `src/pages/workshops/index.astro` frontmatter**

Replace the frontmatter (lines 1-9) with:

```astro
---
import PastWorkshopList from "../../components/PastWorkshopList.astro";
import SectionTitle from "../../components/SectionTitle.astro";
import WorkshopCard from "../../components/WorkshopCard.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { reader } from "../../lib/reader";

const siteSettings = await reader.singletons.siteSettings.read();
if (!siteSettings) throw new Error("Site settings not found");

const allWorkshops = await reader.collections.workshops.all();
const workshops = allWorkshops.map((w) => w.entry);
const upcomingWorkshops = workshops.filter((w) => w.status === "open");
const futureWorkshops = workshops.filter((w) => w.status === "soon");

const allPastWorkshops = await reader.collections.pastWorkshops.all();
const pastWorkshops = allPastWorkshops.map((w) => w.entry);
---
```

In the template body:
- `site.name` → `siteSettings.name`
- The rest of the template stays the same — `upcomingWorkshops`, `futureWorkshops`, `pastWorkshops` variable names are unchanged.

- [ ] **Step 2: Verify the workshops page renders correctly**

```bash
npm run dev
```

Visit `http://localhost:4321/workshops/`. Expected: Upcoming and coming-soon workshops render, past workshops list appears.

- [ ] **Step 3: Commit**

```bash
git add src/pages/workshops/index.astro
git commit -m "feat: update workshops index to read content from Keystatic"
```

---

## Task 13: Update Workshop Detail Page

**Files:**
- Modify: `src/pages/workshops/[slug].astro`

- [ ] **Step 1: Replace `src/pages/workshops/[slug].astro` frontmatter**

Replace the frontmatter (lines 1-54) with:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { reader } from "../../lib/reader";

export async function getStaticPaths() {
  const allWorkshops = await reader.collections.workshops.all();
  return allWorkshops.map((workshop) => ({
    params: { slug: workshop.slug },
    props: { workshop: workshop.entry },
  }));
}

const { workshop } = Astro.props;

const siteSettings = await reader.singletons.siteSettings.read();
if (!siteSettings) throw new Error("Site settings not found");

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: workshop.title,
  description: workshop.summary,
  startDate: workshop.startDate,
  endDate: workshop.endDate,
  eventAttendanceMode:
    workshop.format === "In-person"
      ? "https://schema.org/OfflineEventAttendanceMode"
      : "https://schema.org/MixedEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: workshop.venue,
    address: workshop.location,
  },
  organizer: {
    "@type": "Person",
    name: siteSettings.name,
    email: siteSettings.email,
    url: siteSettings.siteUrl,
  },
  url: `${siteSettings.siteUrl}/workshops/${workshop.slug}/`,
};

const primaryCta = workshop.registrationUrl
  ? {
      href: workshop.registrationUrl,
      label: "Register now",
      external: true,
    }
  : {
      href: workshop.fallbackUrl,
      label: workshop.fallbackLabel,
      external: false,
    };
---
```

The template body stays identical — it already uses `workshop.*` properties.

- [ ] **Step 2: Verify a workshop detail page renders**

```bash
npm run dev
```

Visit `http://localhost:4321/workshops/commedia-dell-arte-la-2026/`. Expected: Full workshop detail page renders with all fields.

- [ ] **Step 3: Commit**

```bash
git add src/pages/workshops/[slug].astro
git commit -m "feat: update workshop detail page to read content from Keystatic"
```

---

## Task 14: Remove Old Data File and Update Component Imports

**Files:**
- Delete: `src/data/site.ts`
- Modify: `src/components/WorkshopCard.astro` (remove type import)

- [ ] **Step 1: Check for any remaining imports of `src/data/site`**

```bash
grep -r "data/site" src/
```

Expected: No results (all pages and components should now use Keystatic reader). If any remain, update them following the same pattern as previous tasks.

- [ ] **Step 2: Update `src/components/WorkshopCard.astro`**

The component currently imports `type Workshop` from `../data/site`. Replace the frontmatter with an inline interface:

```astro
---
interface Workshop {
  slug: string;
  title: string;
  badge: string;
  strapline: string;
  dateLabel: string;
  format: string;
  priceLabel: string;
  level: string;
  location: string;
  seats: string;
  status: string;
  statusLabel: string;
  registrationUrl?: string | null;
  fallbackUrl: string;
  fallbackLabel: string;
}

interface Props {
  workshop: Workshop;
}

const { workshop } = Astro.props;
---
```

The template body stays identical.

- [ ] **Step 3: Delete `src/data/site.ts`**

```bash
rm src/data/site.ts
rmdir src/data 2>/dev/null || true
```

- [ ] **Step 4: Verify the entire site builds without errors**

```bash
npm run build
```

Expected: Build completes successfully with no import errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: remove old site.ts data file, complete Keystatic migration"
```

---

## Task 15: Full Verification

- [ ] **Step 1: Run dev server and verify all pages**

```bash
npm run dev
```

Visit each page and verify content renders:
- `http://localhost:4321/` — Home page with hero, stats, pillars, featured workshops, process, testimonials, FAQs
- `http://localhost:4321/workshops/` — Workshop list with upcoming, coming soon, past workshops
- `http://localhost:4321/workshops/commedia-dell-arte-la-2026/` — Workshop detail
- `http://localhost:4321/workshops/neutral-mask-la-2026/` — Workshop detail
- `http://localhost:4321/about/` — About page with bio, philosophy, teaching story, ideal students, past workshops, testimonials
- `http://localhost:4321/contact/` — Contact page with channels

- [ ] **Step 2: Verify Keystatic admin works**

Visit `http://localhost:4321/keystatic`. Test:
- Edit a workshop title, save, refresh the workshop page — title should update
- Edit a testimonial, save, refresh home page — testimonial should update
- Add a new FAQ entry, save, refresh home page — new FAQ should appear

- [ ] **Step 3: Verify production build**

```bash
npm run build && npm run preview
```

Expected: Preview server starts. Visit `http://localhost:4321/` — all pages render correctly.

- [ ] **Step 4: Commit any fixes**

If any issues were found and fixed:
```bash
git add -A
git commit -m "fix: address issues found during full verification"
```

---

## Task 16: Switch to GitHub Storage Mode

**Files:**
- Modify: `keystatic.config.ts`

This task is done once the repo is pushed to GitHub and the GitHub OAuth app is configured.

- [ ] **Step 1: Update `keystatic.config.ts` storage config**

Replace the storage block:

```typescript
storage: {
  kind: "local",
},
```

With:

```typescript
storage: {
  kind: "github",
  repo: "OWNER/ivano-site",
},
```

Replace `OWNER` with the actual GitHub username or organization that owns the repo.

- [ ] **Step 2: Add environment variables for GitHub OAuth**

Create a `.env` file (do NOT commit this):

```
KEYSTATIC_GITHUB_CLIENT_ID=your_client_id
KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret
KEYSTATIC_SECRET=your_random_secret
```

Update `src/pages/keystatic/[...params].astro`:

```astro
---
import { makeHandler } from '@keystatic/astro/api';
import keystaticConfig from '../../../keystatic.config';

export const prerender = false;

export const ALL = makeHandler({
  config: keystaticConfig,
  clientId: import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: import.meta.env.KEYSTATIC_SECRET,
});
---
```

- [ ] **Step 3: Add `.env` to `.gitignore`**

Ensure `.env` is in `.gitignore`:

```bash
echo ".env" >> .gitignore
```

- [ ] **Step 4: Commit**

```bash
git add keystatic.config.ts src/pages/keystatic/[...params].astro .gitignore
git commit -m "feat: switch Keystatic to GitHub storage mode"
```

---

## Task 17: Netlify Deployment Setup

This task is done in the Netlify dashboard and GitHub, not in code.

- [ ] **Step 1: Create Netlify site**

1. Log into Netlify (Ivano's account or yours to transfer later)
2. "Add new site" → "Import an existing project" → Connect GitHub repo
3. Build settings should auto-detect from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`

- [ ] **Step 2: Add environment variables in Netlify**

In Netlify dashboard → Site settings → Environment variables, add:
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET`

- [ ] **Step 3: Configure custom domain**

In Netlify → Domain settings:
1. Add custom domain `www.ivanoworkshops.com`
2. In Hostinger DNS settings, add a CNAME record:
   - Name: `www`
   - Value: `your-site-name.netlify.app`
3. Or change nameservers to Netlify's nameservers for full DNS management

- [ ] **Step 4: Verify live site**

Visit `https://www.ivanoworkshops.com`. Expected: Site loads with all content.
Visit `https://www.ivanoworkshops.com/keystatic`. Expected: Keystatic admin loads, GitHub sign-in flow works.

- [ ] **Step 5: Test the full edit-to-deploy flow**

1. Sign into Keystatic admin
2. Edit a workshop's date label
3. Save
4. Wait ~1 minute for Netlify to rebuild
5. Verify the change is live on the workshop page

---

## Task 18: Handoff Documentation

**Files:**
- Create: `docs/user-guide.md`
- Modify: `README.md` (or create if not present)

- [ ] **Step 1: Create `docs/user-guide.md` for Ivano**

```markdown
# How to Edit Your Website

Your website has a built-in editor at **ivanoworkshops.com/keystatic**.

## Signing In

1. Go to `ivanoworkshops.com/keystatic`
2. Click "Sign in with GitHub"
3. Log in with your GitHub account
4. You're in the editor

## Editing Workshops

1. Click **Workshops** in the left sidebar
2. Click any workshop to edit it
3. Change any field — title, dates, location, status, etc.
4. Click **Save** when done
5. Your changes go live in about 1 minute

### Adding a New Workshop

1. Click **Workshops** in the left sidebar
2. Click **Create Workshop**
3. Fill in all the fields
4. Set **Featured on Home Page** to checked if you want it on the home page
5. Click **Create**

### Removing a Workshop

1. Click **Workshops** in the left sidebar
2. Click the workshop you want to remove
3. Click **Delete** at the bottom
4. Confirm deletion

## Editing Testimonials

1. Click **Testimonials** in the left sidebar
2. Add, edit, or remove entries in the list
3. Click **Save**

## Editing FAQs

1. Click **FAQs** in the left sidebar
2. Add, edit, or remove entries in the list
3. Click **Save**

## Editing Site Information

1. Click **Site Settings** in the left sidebar
2. Change your name, email, description, etc.
3. Click **Save**

## Editing Page Content

- **Home Page** — Click "Home Page" to edit stats, pillars, and process steps
- **About Page** — Click "About Page" to edit your bio, teaching quotes, and ideal student descriptions
- **Contact Page** — Click "Contact Page" to edit the contact channels

## How Long Do Changes Take?

After you click Save, your changes go live in about 1 minute. The site rebuilds automatically.

## Need Help?

Contact your developer for:
- Styling or design changes
- Adding new pages or sections
- Technical issues with the editor
```

- [ ] **Step 2: Update `README.md` with developer documentation**

```markdown
# Ivano Conte — Theatre Workshops

Website for Ivano Conte's international theatre workshops.

## Tech Stack

- **Framework:** [Astro](https://astro.build/) v6
- **CMS:** [Keystatic](https://keystatic.com/) — content editing at `/keystatic`
- **Hosting:** [Netlify](https://netlify.com/) — auto-deploys from GitHub
- **Domain:** ivanoworkshops.com (registered on Hostinger, DNS points to Netlify)

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:4321` for the site, `http://localhost:4321/keystatic` for the CMS admin.

## Content Structure

All content is managed through Keystatic and stored as JSON in `src/content/`:

- `src/content/singletons/` — Site settings, home page, about page, contact page, testimonials, FAQs
- `src/content/workshops/` — One JSON file per workshop
- `src/content/past-workshops/` — One JSON file per past workshop

The Keystatic schema is defined in `keystatic.config.ts`. To add a new editable field:

1. Add the field to the schema in `keystatic.config.ts`
2. Use the field in the relevant `.astro` page via `reader.singletons.<name>.read()` or `reader.collections.<name>.all()`
3. The field will automatically appear in the Keystatic admin UI

## Deployment

Deploys are automatic. Push to `main` on GitHub → Netlify builds → site is live.

Environment variables (set in Netlify dashboard):
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET`

## Key Files

- `astro.config.mjs` �� Astro config with Keystatic, React, Netlify integrations
- `keystatic.config.ts` — CMS schema (all editable content defined here)
- `src/lib/reader.ts` — Shared Keystatic reader instance
- `src/pages/keystatic/[...params].astro` — CMS admin route
- `netlify.toml` — Netlify build config
```

- [ ] **Step 3: Commit**

```bash
git add docs/user-guide.md README.md
git commit -m "docs: add user guide for client and developer README"
```
