# Copy Refactor & Layout Adjustments — Design Spec

**Date:** 2026-03-29
**Approach:** B — Copy refactor with targeted layout adjustments

## Summary

Refactor all site copy to use first-person voice sourced from `raw/website-copy.md` (primary) and `raw/other-information.md` (supplemental). Process and optimize raw/ images for use across all pages. Add targeted layout changes where richer content demands it: a new 6-area philosophy grid on About, expanded photo band, curated gallery section, workshop module descriptions, and expandable testimonials.

## Decisions

| Decision | Choice |
|---|---|
| Voice | First-person throughout (matching `website-copy.md`) |
| Images | Curated gallery approach — best photos optimized, used richly across all pages |
| Teaching philosophy | Full 6-area breakdown on About, Home pillars reworded to preview |
| Workshop detail pages | Enriched with module descriptions from `website-copy.md` |
| Hero headline | "Movement. Presence. Imagination." (from `website-copy.md`) |
| Testimonials | Condensed on Home, full-length expandable on About |
| Contact details | Updated to raw/ values (`thephysicalworkshop@gmail.com`, `ivano.conte_`) |

## 1. Site Settings & Global Changes

### Contact details

- `email`: `"thephysicalworkshop@gmail.com"` (was `ivano.conte@gmail.com`)
- `instagram`: `"https://www.instagram.com/ivano.conte_"` (was `ivano.conte`)

### Site description

Rewritten first-person:

> "I am a movement teacher and physical theatre practitioner with an international background rooted in Jacques Lecoq's pedagogy. My work combines movement training, mask work, Commedia dell'Arte, mimodynamics, clown, bouffon, and the Feldenkrais Method to help performers develop awareness, precision, and a more articulate physical language."

### Navigation

No changes — Home, Workshops, About, Contact.

## 2. Image Processing

### Strategy

Review all ~50 raw/ images, select the best for each purpose, process into optimized web formats in `public/`.

### Processing steps

1. Convert HEIC files (`workshop-1.HEIC`, `workshop-2.HEIC`, `workshop-3.HEIC`, `ivano-1.HEIC`) to JPG
2. Resize to max 1200px wide for page images, 600px for card thumbnails
3. Compress at ~80% JPG quality
4. Use descriptive filenames in `public/` (e.g., `ivano-portrait.jpg`, `workshop-commedia-group.jpg`)

### Image slots

| Purpose | Current | Proposed |
|---|---|---|
| Hero image (Home) | `commedia-mask.jpg` (single) | Best ivano-* or show-* portrait — high impact |
| Portrait (About hero) | `portrait.jpg` (10KB, tiny) | Best ivano-* headshot, properly sized |
| Photo band (About) | 3 images | Expanded to 5-6 images from workshop-*, show-*, ensemble-* |
| Workshop cards | None | Add representative image from raw/ to each workshop entry |
| Gallery section (About) | Does not exist | New section — curated grid of 12-15 best images |

Final photo selection will be made during implementation by reviewing all raw/ images.

## 3. Home Page

### Hero section

- **Eyebrow:** "Movement Teacher · Physical Theatre · Lecoq Pedagogy"
- **Headline:** "Movement. Presence. Imagination."
- **Lede (first-person from `website-copy.md`):**
  > "I am a movement teacher and physical theatre practitioner with an international background rooted in Jacques Lecoq's pedagogy. My work begins from a clear conviction: the body is the foundation of storytelling. Before words or character appear, performers respond to space, rhythm, weight, and the environment around them. That physical response is where theatre truly starts."
- **Hero image:** Best portrait/performance shot from raw/, replacing `commedia-mask.jpg`
- **CTA buttons:** "View upcoming workshops" (kept), "About my approach" (was "Teaching philosophy")

### Approach pillars

Reworded to preview the 6 teaching philosophy areas on About. New 3 pillars:

1. **Attention & Awareness** — "Training begins with attention: shifts of weight, the influence of space, the quality of someone else's movement..."
2. **Physical Imagination** — "Creativity grows when performers allow their bodies to explore unfamiliar dynamics and non-habitual states..."
3. **A Creative Laboratory** — "My workshops function as spaces where experimentation is encouraged and individuality is central."

Source: `website-copy.md` Teaching Philosophy section (condensed).

### Approach section title

- **Eyebrow:** "Approach" (kept)
- **Title:** "Movement as inquiry, creation as practice."
- **Description:** "My teaching grows from the intersection of movement training, mask work, and somatic exploration. I see the actor not as a container to fill, but as an artist with a physical intelligence already present in their body."

### Process section ("In The Room")

Layout kept. Copy reworded to first-person:

- Section title adjusted: "Every session I lead begins in the body"
- Step descriptions rewritten from Ivano's perspective

### Featured workshops

Layout kept. Workshop cards gain images (see schema changes below).

### Testimonials

Layout kept. Condensed quotes stay on Home (3 shown). No changes to this section.

### Banner / CTA

Rewritten to first-person:

- "I share new dates, early access, and workshop updates from Rome and beyond."
- "Reach out to be first to know when new workshops open for registration."

### FAQ

No changes to layout or content.

## 4. About Page

### Hero section

- **Eyebrow:** "Movement, Theatre & Creative Inquiry" (was "About Ivano Conte")
- **Headline (first-person from `website-copy.md`):** "I am an actor and movement pedagogue based in Rome, teaching internationally across Europe, Canada, and the United States."
- **Description:** "My training has been shaped by diverse theatrical traditions and by master teachers such as Amy Russell, Norman Taylor, Philippe Gaulier, Lassaad Saidi, Carlo Boso, Antonio Fava, Miguel Angel Gutierrez, Mai Rojas, and Jose Piris Pereda."
- **Portrait:** Full-size image from raw/ivano-*, replacing the 10KB `portrait.jpg`

### Biography section

Layout kept (split layout with info cards). Copy replaced with first-person from `website-copy.md` About section:

1. "I began my studies at Il Cantiere Teatrale and expanded my practice into Lecoq-inspired movement training, Commedia dell'Arte and mask theatre, mimodynamics and movement analysis, clown and bouffon, and somatic practice through the Feldenkrais Method."
2. "I also draw from years of martial arts and basic acrobatics, which shape my sense of rhythm, coordination, and physical intention: essential tools for any performer who works primarily through movement."
3. "Today, I teach physical theatre and mask workshops internationally, helping artists refine their awareness, broaden their creative range, and build a confident, expressive relationship between body and stage."

### Teaching Philosophy — LAYOUT CHANGE

**Replace PillarGrid (3 columns) with new PhilosophyGrid component (2-column, 6 cards).**

Section header:

- **Eyebrow:** "Teaching Philosophy"
- **Title:** "Movement as Inquiry, Creation as Practice" (from `website-copy.md`)
- **Description:** "I see the actor not as a container to fill, but as an artist with a physical intelligence already present in their body: an intelligence that can be sharpened, questioned, and expanded."

Six philosophy areas (all from `website-copy.md` Teaching Philosophy section):

1. **Attention & Awareness** — "Training begins with attention: shifts of weight, the influence of space, the quality of someone else's movement, or the impulses emerging under pressure. This kind of noticing turns performers into active decision-makers and fuels authentic creative choices."
2. **Movement With Dramatic Purpose** — "Movement always carries intention. Direction, rhythm, tension, and flow become compositional tools, shaping emotional tone and narrative structure. Through analysis and exploration, actors learn that movement can think, argue, reveal, question, and transform."
3. **Physical Imagination** — "Creativity grows when performers allow their bodies to explore alternative logics: unfamiliar dynamics, unusual rhythms, and non-habitual states. This work expands expressive possibilities, making space for new forms of character, atmosphere, and theatrical presence."
4. **Mask Work** — "Masks require clarity, precision, and physical intention. Neutral masks, larval forms, expressive masks, and half masks shift attention away from facial expression and toward the body as the primary carrier of meaning."
5. **Feldenkrais Method** — "As a certified Feldenkrais practitioner, I guide performers toward greater ease, coordination, and intentional movement. Somatic work helps reduce strain, refine choices, and support sustainable physical practice."
6. **Beyond Human Movement** — "Exploring non-human dynamics (instinctive, mechanical, elemental) enriches physical vocabulary and deepens sensitivity. This research helps performers break habitual patterns, opening space for empathy, humour, and imaginative transformation."

**Component:** New `PhilosophyGrid.astro` — 2-column CSS grid, each card has a left accent border (`border-left: 3px solid`), title, and description paragraph. Responsive: collapses to 1-column below 720px.

### Photo band — expanded

Increase from 3 to 5-6 images. Replace current `teaching.jpg`, `workshop-group.jpg`, `neutral-mask.jpg` with curated selections from raw/ covering workshop, mask work, ensemble, teaching, and performance categories.

### Teaching Story

No changes — quotes are already first-person. Layout kept.

### Ideal Student

PillarGrid kept. Copy stays as-is (already works well).

### Gallery — NEW SECTION

New section placed after Ideal Student, before Workshop History.

- **Eyebrow:** "In The Studio & On Stage"
- **Title:** "The work in images"
- **Layout:** CSS grid masonry-style gallery, 12-15 curated images from raw/
- **Implementation:** Use CSS `grid-template-rows` with `span` variations to create visual interest. Images loaded lazily.
- **Data source:** New `galleryImages` array field on About singleton

### Workshop History

No changes. PastWorkshopList kept.

### Testimonials — UPGRADED

Replace condensed 3-testimonial grid with all 5 testimonials in expandable format.

- Show first 2-3 sentences of each testimonial
- "Read full testimonial" expand/collapse toggle (CSS-only with `<details>` element, matching existing FAQ pattern)
- Full quotes sourced from `raw/other-information.md` Student Testimonials section
- Attribution kept (name + credit line)

**Schema change:** Add `fullQuote` field to testimonials items for the untruncated text. The existing `quote` field serves as the preview.

## 5. Workshop Pages

### Workshop index (/workshops/)

Hero copy rewritten to first-person from `website-copy.md` Workshops intro:

- **Headline:** "Physical Expression, Masks & Creative Training"
- **Description:** "Each workshop explores a different dimension of physical theatre, movement awareness, and creative invention. Modules can be taken individually or combined into intensive programs for schools, companies, or training institutions."

Layout stays the same.

### Workshop cards

Add images to WorkshopCard component. New optional `image` field on workshop collection schema. Cards gain an image area above the text content.

### Workshop detail pages (/workshops/[slug]) — NEW SECTION

Add "Focus Areas" section below existing workshop content, sourced from `website-copy.md` Workshops section.

Structure per workshop:

- **Section eyebrow:** "What We Explore"
- **Focus areas:** 2-column grid of 4 bullet points with accent border (same style as PhilosophyGrid)
- **Module description:** Summary paragraph below the focus grid

Module content mapping from `website-copy.md`:

| Workshop type | Focus areas | Maps to |
|---|---|---|
| Neutral Mask | Presence without tension, Grounded movement, Essential action free of excess, Responsiveness to space and impulse | `neutral-mask-la-2026` |
| Mimodynamics | Elemental qualities, Material behaviours, Instinctive/non-human physicality, Rhythm/tension/physical logic | Future mimodynamics workshops |
| Larval Masks | Playing from form, Enlarging gesture/attitude, Clear physical storytelling, Slow attentive transformation | Future larval mask workshops |
| Commedia dell'Arte | Character mechanics, Improvisation/canovacci, Rhythm/timing/comic precision, Vocal play/physical instinct | `commedia-dell-arte-la-2026`, `commedia-dell-arte-lyon-2026` |
| Bouffon | Alternative/exaggerated physicality, Chorus work/ensemble timing, Parody/mockery/imitation, Tension between charm and cruelty | Future bouffon workshops |

Workshops without a direct module match (`mask-and-play-corsica-2026`, `embodied-poetics-padua-2026`) will get custom focus area descriptions written in the same style.

**Schema fields:** `focusAreas` (array of strings), `moduleDescription` (text) — both optional.

## 6. Contact Page

### Copy changes (first-person)

- **Hero headline:** "Join my next workshop, or bring the work to your studio."
- **Hero description:** "Whether you want to register for an upcoming intensive, invite me to teach at your school or festival, or simply ask a question — reach out. Andrea and I are here to help."
- Channel descriptions adjusted to first-person where needed

### Layout

No structural changes. Contact page works well as-is.

## 7. Keystatic Schema Additions

All new fields are optional so existing content is not broken.

| Collection/Singleton | Field | Type | Purpose |
|---|---|---|---|
| `workshops` collection | `image` | `text` | Path to card image in `public/` |
| `workshops` collection | `focusAreas` | `array` of `text` | Module focus area bullet points |
| `workshops` collection | `moduleDescription` | `text` | Module summary paragraph |
| `testimonials` singleton (items) | `fullQuote` | `text` | Full-length quote for About expandable view |
| `about` singleton | `philosophyAreas` | `array` of `{title, description}` | 6 teaching philosophy areas |
| `about` singleton | `galleryImages` | `array` of `text` | Curated image paths for gallery grid |

## 8. New Components

| Component | Purpose | Used on |
|---|---|---|
| `PhilosophyGrid.astro` | 2×3 grid for 6 teaching philosophy areas with accent borders | About page |
| `GalleryGrid.astro` | Masonry-style CSS grid for 12-15 images | About page |

Existing components modified:

| Component | Change |
|---|---|
| `WorkshopCard.astro` | Add optional image rendering above card content |
| `TestimonialGrid.astro` | Add expandable full-quote support via `<details>` |

## 9. Files Changed (Summary)

### Content JSON files modified

- `src/content/singletons/site-settings.json` — email, instagram
- `src/content/singletons/home.json` — pillars, process, stats copy
- `src/content/singletons/about.json` — hero, bio, new philosophyAreas, galleryImages
- `src/content/singletons/contact.json` — hero headline, description, channel copy
- `src/content/singletons/testimonials.json` — add fullQuote to each item
- `src/content/workshops/*.json` — add image, focusAreas, moduleDescription

### Page templates modified

- `src/pages/index.astro` — hero copy, pillar section title, process copy, banner copy
- `src/pages/about.astro` — hero, bio, philosophy section (swap PillarGrid for PhilosophyGrid), add gallery section, upgrade testimonials
- `src/pages/contact.astro` — hero copy
- `src/pages/workshops/index.astro` — hero copy
- `src/pages/workshops/[slug].astro` — add focus areas section

### Schema

- `keystatic.config.ts` — add new fields to workshops collection, testimonials singleton, about singleton

### New components

- `src/components/PhilosophyGrid.astro`
- `src/components/GalleryGrid.astro`

### Styles

- `src/styles/global.css` — add `.philosophy-grid`, `.gallery-grid` styles

### Assets

- `public/` — new optimized images from raw/

## 10. Verification

No test suite exists. Verification is:

1. `npm run build` succeeds
2. `npm run dev` — visual review of all pages
3. Check all images load correctly
4. Verify Keystatic admin UI reflects new schema fields at `/keystatic`
