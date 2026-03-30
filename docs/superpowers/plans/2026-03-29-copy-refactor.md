# Copy Refactor & Layout Adjustments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor all site copy to first-person voice from raw/website-copy.md, process and deploy raw/ images, add targeted layout components (PhilosophyGrid, GalleryGrid, expandable testimonials, workshop focus areas).

**Architecture:** Content-first approach — update Keystatic schema and JSON content first, then build new components, then update page templates to wire everything together. Image processing happens early since multiple tasks depend on the processed images being in `public/`.

**Tech Stack:** Astro 6, Keystatic CMS (JSON storage), CSS custom properties, `sips`/`magick` for image processing on macOS.

**Spec:** `docs/superpowers/specs/2026-03-29-copy-refactor-design.md`

---

## File Structure

### New files
- `src/components/PhilosophyGrid.astro` — 2×3 grid for teaching philosophy areas
- `src/components/GalleryGrid.astro` — masonry-style image gallery grid
- `public/` — ~25-30 new optimized images from `raw/`

### Modified files
- `keystatic.config.ts` — new optional fields on workshops, testimonials, about
- `src/content/singletons/site-settings.json` — email, instagram, description
- `src/content/singletons/home.json` — pillars, process, stats
- `src/content/singletons/about.json` — hero, bio, philosophyAreas, galleryImages
- `src/content/singletons/contact.json` — hero, channel copy
- `src/content/singletons/testimonials.json` — add fullQuote to each item
- `src/content/workshops/*.json` — add image, focusAreas, moduleDescription
- `src/components/WorkshopCard.astro` — optional image rendering
- `src/components/TestimonialGrid.astro` — expandable full-quote support
- `src/pages/index.astro` — hero, pillars, process, banner copy
- `src/pages/about.astro` — hero, bio, philosophy, gallery, testimonials
- `src/pages/contact.astro` — hero copy
- `src/pages/workshops/index.astro` — hero copy
- `src/pages/workshops/[slug].astro` — focus areas section
- `src/styles/global.css` — philosophy-grid, gallery-grid, workshop-card image styles

---

### Task 1: Process and optimize raw/ images

**Files:**
- Read: `raw/*.jpg`, `raw/*.HEIC`
- Create: optimized images in `public/`

- [ ] **Step 1: Convert HEIC files to JPG**

```bash
cd /Users/lmeraz/src/ivano-site
for f in raw/*.HEIC; do
  base=$(basename "$f" .HEIC)
  sips -s format jpeg "$f" --out "raw/${base}.jpg"
done
```

This converts `workshop-1.HEIC`, `workshop-2.HEIC`, `workshop-3.HEIC`, and `ivano-1.HEIC` to JPG format in the raw/ directory.

- [ ] **Step 2: Review all images and select the best for each slot**

Open each image file to review it. Select images for these slots:

| Slot | Target filename | Selection criteria |
|---|---|---|
| Home hero | `hero.jpg` | High-impact portrait or performance shot showing physicality |
| About portrait | `portrait.jpg` (replace existing) | Clear headshot/portrait of Ivano, well-lit |
| Photo band (6) | `band-1.jpg` through `band-6.jpg` | Mix of workshop, mask work, ensemble, teaching, performance |
| Workshop card: Commedia | `card-commedia.jpg` | Commedia mask or character work |
| Workshop card: Neutral Mask | `card-neutral-mask.jpg` | Neutral mask work |
| Workshop card: Mask & Play | `card-mask-play.jpg` | General mask play |
| Workshop card: Embodied Poetics | `card-embodied-poetics.jpg` | Movement/ensemble work |
| Workshop card: Commedia Lyon | `card-commedia-lyon.jpg` | Commedia performance |
| Gallery (12-15) | `gallery-01.jpg` through `gallery-15.jpg` | Best variety across all categories |

- [ ] **Step 3: Process selected images for page/hero use (max 1200px wide)**

```bash
cd /Users/lmeraz/src/ivano-site
# For each selected hero/band/gallery image, resize and compress:
# Example for a single image — repeat for each selected image:
magick raw/SELECTED.jpg -resize '1200x>' -quality 80 public/TARGET.jpg
```

Process all hero, portrait, photo band, and gallery images at max 1200px wide, 80% quality.

- [ ] **Step 4: Process card thumbnail images (max 600px wide)**

```bash
# For each workshop card image:
magick raw/SELECTED.jpg -resize '600x>' -quality 80 public/TARGET.jpg
```

Process all workshop card images at max 600px wide, 80% quality.

- [ ] **Step 5: Verify all images are in public/**

```bash
ls -la public/*.jpg | wc -l
# Expected: ~25-30 new images
ls -la public/hero.jpg public/portrait.jpg public/band-*.jpg public/card-*.jpg public/gallery-*.jpg
```

- [ ] **Step 6: Commit**

```bash
git add public/*.jpg
git commit -m "assets: process and optimize raw/ images for site-wide use"
```

---

### Task 2: Update Keystatic schema with new fields

**Files:**
- Modify: `keystatic.config.ts`

- [ ] **Step 1: Add fields to the `about` singleton schema**

In `keystatic.config.ts`, inside the `about` singleton's `schema` object, after the `idealStudents` field, add:

```typescript
philosophyAreas: fields.array(
  fields.object({
    title: fields.text({ label: "Title", validation: { isRequired: true } }),
    description: fields.text({ label: "Description", multiline: true, validation: { isRequired: true } }),
  }),
  {
    label: "Teaching Philosophy Areas",
    itemLabel: (props) => props.fields.title.value,
  }
),
galleryImages: fields.array(
  fields.text({ label: "Image Path" }),
  { label: "Gallery Images" }
),
```

- [ ] **Step 2: Add `fullQuote` field to the `testimonials` singleton schema**

In `keystatic.config.ts`, inside the testimonials singleton's items object schema, after the `quote` field, add:

```typescript
fullQuote: fields.text({ label: "Full Quote (for About page)", multiline: true }),
```

- [ ] **Step 3: Add fields to the `workshops` collection schema**

In `keystatic.config.ts`, inside the workshops collection's `schema` object, after the `schedule` field, add:

```typescript
image: fields.text({ label: "Card Image Path" }),
focusAreas: fields.array(
  fields.text({ label: "Focus Area" }),
  { label: "Focus Areas" }
),
moduleDescription: fields.text({ label: "Module Description", multiline: true }),
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds. New fields are optional, so existing content is unaffected.

- [ ] **Step 5: Commit**

```bash
git add keystatic.config.ts
git commit -m "schema: add philosophy areas, gallery images, workshop focus areas, full testimonial quotes"
```

---

### Task 3: Update site settings and contact content JSON

**Files:**
- Modify: `src/content/singletons/site-settings.json`
- Modify: `src/content/singletons/contact.json`

- [ ] **Step 1: Update site-settings.json**

Replace the `email`, `instagram`, and `description` values:

```json
{
  "name": "Ivano Conte",
  "role": "Theatre pedagogue, movement teacher, and Commedia dell'Arte specialist",
  "baseCity": "Rome, Italy",
  "siteUrl": "https://www.ivanoworkshops.com",
  "email": "thephysicalworkshop@gmail.com",
  "instagram": "https://www.instagram.com/ivano.conte_",
  "description": "I am a movement teacher and physical theatre practitioner with an international background rooted in Jacques Lecoq's pedagogy. My work combines movement training, mask work, Commedia dell'Arte, mimodynamics, clown, bouffon, and the Feldenkrais Method to help performers develop awareness, precision, and a more articulate physical language.",
  "navigation": [
    { "label": "Home", "href": "/" },
    { "label": "Workshops", "href": "/workshops/" },
    { "label": "About", "href": "/about/" },
    { "label": "Contact", "href": "/contact/" }
  ]
}
```

- [ ] **Step 2: Update contact.json**

```json
{
  "heroHeadline": "Join my next workshop, or bring the work to your studio.",
  "heroDescription": "Whether you want to register for an upcoming intensive, invite me to teach at your school or festival, or simply ask a question -- reach out. Andrea and I are here to help.",
  "channels": [
    {
      "title": "Workshop registration",
      "description": "Interested in an upcoming workshop? Reach out for pricing, availability, and registration details.",
      "subject": "Workshop Registration Inquiry",
      "label": "Email about workshops"
    },
    {
      "title": "Guest teaching",
      "description": "Invite me to lead a guest workshop, intensive, or residency at your studio, school, or festival.",
      "subject": "Guest Teaching Inquiry",
      "label": "Inquire about guest teaching"
    },
    {
      "title": "Scholarships",
      "description": "Scholarships are available for practitioners of color, trans theatre-makers, and those from underrepresented backgrounds.",
      "subject": "Scholarship Inquiry",
      "label": "Ask about scholarships"
    },
    {
      "title": "General inquiries",
      "description": "Questions about the work, the pedagogy, or anything else? Andrea and I are happy to help.",
      "subject": "",
      "label": ""
    }
  ]
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/content/singletons/site-settings.json src/content/singletons/contact.json
git commit -m "content: update contact details and site description to first-person voice"
```

---

### Task 4: Update home page content JSON

**Files:**
- Modify: `src/content/singletons/home.json`

- [ ] **Step 1: Replace home.json with first-person copy**

```json
{
  "stats": [
    { "value": "8+", "label": "International workshops taught" },
    { "value": "5", "label": "Countries across three continents" },
    { "value": "Lecoq", "label": "Pedagogy rooted in the tradition" }
  ],
  "pillars": [
    {
      "title": "Attention & Awareness",
      "description": "Training begins with attention: shifts of weight, the influence of space, the quality of someone else's movement. This kind of noticing turns performers into active decision-makers and fuels authentic creative choices."
    },
    {
      "title": "Physical Imagination",
      "description": "Creativity grows when performers allow their bodies to explore alternative logics: unfamiliar dynamics, unusual rhythms, and non-habitual states. This work expands expressive possibilities."
    },
    {
      "title": "A Creative Laboratory",
      "description": "My workshops function as spaces where experimentation is encouraged, discovery outweighs demonstration, risk becomes a resource, and individuality is central."
    }
  ],
  "process": [
    {
      "title": "Enter through the body",
      "description": "Every session I lead begins with physical preparation -- breath, rhythm, and awareness. The body becomes the instrument before the mask or the character arrives."
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

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/content/singletons/home.json
git commit -m "content: rewrite home page pillars and process to first-person voice"
```

---

### Task 5: Update about page content JSON with philosophy areas and gallery

**Files:**
- Modify: `src/content/singletons/about.json`

- [ ] **Step 1: Replace about.json with first-person copy and new fields**

```json
{
  "heroHeadline": "I am an actor and movement pedagogue based in Rome, teaching internationally across Europe, Canada, and the United States.",
  "heroDescription": "My training has been shaped by diverse theatrical traditions and by master teachers such as Amy Russell, Norman Taylor, Philippe Gaulier, Lassaad Saidi, Carlo Boso, Antonio Fava, Miguel Ángel Gutiérrez, Mai Rojas, and José Piris Pereda.",
  "bioParagraphs": [
    "I began my studies at Il Cantiere Teatrale and expanded my practice into Lecoq-inspired movement training, Commedia dell'Arte and mask theatre, mimodynamics and movement analysis, clown and bouffon, and somatic practice through the Feldenkrais Method®.",
    "I also draw from years of martial arts and basic acrobatics, which shape my sense of rhythm, coordination, and physical intention: essential tools for any performer who works primarily through movement.",
    "Today, I teach physical theatre and mask workshops internationally, helping artists refine their awareness, broaden their creative range, and build a confident, expressive relationship between body and stage. My goal is to support performers as they discover what moves them -- literally and creatively -- and to guide them toward a grounded, imaginative, and personally meaningful physical practice."
  ],
  "teachingQuotes": [
    "\"My teaching philosophy is based on play within the group and on creating a space that is open to experimentation -- and also to mistakes -- with the understanding that mistakes lead us to learn something and should not be demonized. I believe that a class in which people feel free to try, and even to 'be terrible,' is a class that is free to discover itself.\"",
    "\"I try to be the first to step into this mindset, bringing a teaching style that is warm, smiling, and present, yet firm when necessary so that students can truly learn. I aim to stay close to my students, so they feel supported and open to listening to what is being offered to them.\"",
    "\"Perhaps also because of my relatively young age, I do not yet feel the need to build that large wall that often stands between teacher and student. I believe that breaking down this 'fourth wall' between myself and the student helps me better understand what they truly need.\""
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
  ],
  "philosophyAreas": [
    {
      "title": "Attention & Awareness",
      "description": "Training begins with attention: shifts of weight, the influence of space, the quality of someone else's movement, or the impulses emerging under pressure. This kind of noticing turns performers into active decision-makers and fuels authentic creative choices. Awareness isn't decorative: it activates imagination."
    },
    {
      "title": "Movement With Dramatic Purpose",
      "description": "In my approach, movement always carries intention. Direction, rhythm, tension, and flow become compositional tools, shaping emotional tone and narrative structure. Through analysis and exploration, actors learn that movement can think, argue, reveal, question, and transform."
    },
    {
      "title": "Physical Imagination",
      "description": "Creativity grows when performers allow their bodies to explore alternative logics: unfamiliar dynamics, unusual rhythms, and non-habitual states. This work expands expressive possibilities, making space for new forms of character, atmosphere, and theatrical presence."
    },
    {
      "title": "Mask Work",
      "description": "Masks require clarity, precision, and physical intention. Neutral masks, larval forms, expressive masks, and half masks shift attention away from facial expression and toward the body as the primary carrier of meaning. Mask work cultivates boldness, responsiveness, and new ways of understanding space and rhythm."
    },
    {
      "title": "Feldenkrais Method®",
      "description": "As a certified Feldenkrais practitioner, I guide performers toward greater ease, coordination, and intentional movement. Somatic work helps reduce strain, refine choices, and support sustainable physical practice: essential for long-term training and performance."
    },
    {
      "title": "Beyond Human Movement",
      "description": "Exploring non-human dynamics -- instinctive, mechanical, elemental -- enriches physical vocabulary and deepens sensitivity. This research helps performers break habitual patterns, opening space for empathy, humour, and imaginative transformation."
    }
  ],
  "galleryImages": [
    "/gallery-01.jpg",
    "/gallery-02.jpg",
    "/gallery-03.jpg",
    "/gallery-04.jpg",
    "/gallery-05.jpg",
    "/gallery-06.jpg",
    "/gallery-07.jpg",
    "/gallery-08.jpg",
    "/gallery-09.jpg",
    "/gallery-10.jpg",
    "/gallery-11.jpg",
    "/gallery-12.jpg"
  ]
}
```

Note: The `galleryImages` paths should match the filenames used in Task 1. Adjust if different filenames were chosen during image processing.

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/content/singletons/about.json
git commit -m "content: rewrite about page to first-person, add philosophy areas and gallery images"
```

---

### Task 6: Update testimonials JSON with full quotes

**Files:**
- Modify: `src/content/singletons/testimonials.json`

- [ ] **Step 1: Replace testimonials.json adding fullQuote field to each item**

```json
{
  "items": [
    {
      "name": "Workshop participant",
      "credit": "Commedia dell'Arte, Montreal, March 2025",
      "quote": "I found his entire curriculum to be effectively planned and structured. He introduced new concepts and exercises at a natural and helpful pace, ensuring we had time to absorb, take notes and implement in action everything we learned. We would all jump at the chance to learn from him again.",
      "fullQuote": "I took Ivano's Commedia dell'Arte program over two weekends in March 2025. I found his entire curriculum to be effectively planned and structured. He introduced new concepts and exercises at a natural and helpful pace, ensuring we had time to absorb, take notes and implement in action everything we learned. From one day to the next, he would review the previous day's learnings then introduce new material that built on the previous. Ivano proved to be highly knowledgeable as he answered and expanded on all of our questions. He provided insightful personalized feedback to us after each exercise. The students finished the workshops with the same sentiment; we would all jump at the chance to learn from him again and wished we could have more time to learn from his expertise."
    },
    {
      "name": "Workshop participant",
      "credit": "Bouffons and Commedia dell'Arte",
      "quote": "Ivano is a wonderful, observant and thoughtful teacher. His classes always feel like a playground to experiment and explore different forms. He has an innate ability to create a warm, inviting atmosphere which helped me be more of myself.",
      "fullQuote": "Ivano is a wonderful, observant and thoughtful teacher. His approach to learning is one of fun mixed with a lot of play. His classes always feel like a playground to experiment and explore different forms. He has an innate ability to create a warm, inviting atmosphere which helped me be more of myself. When he taught us bouffon, he was encouraging and always pushing us to take the form a little over the edge each time. As a pedagogue, his feedback is filled with what worked well and many ideas of where my work/presentation could be taken ahead next. As a theatre practitioner, Ivano is one of the rare pedagogues who ensures he keeps learning and going into the forms he teaches. Highly recommend his workshops!"
    },
    {
      "name": "Workshop participant",
      "credit": "Commedia dell'Arte and Feldenkrais Method",
      "quote": "Ivano does not simply teach techniques; he guides you through a personal journey, helping you overcome physical, emotional, or expressive blocks. His attention to each individual student is sincere and consistent.",
      "fullQuote": "I had the pleasure of studying with Ivano Conte, a highly knowledgeable and sensitive teacher, in the disciplines of Commedia dell'Arte, the Feldenkrais Method, and Neutral and Larval Mask. He has always been professional, empathetic, and attentive in listening to and understanding where a student needs support. Ivano does not simply teach techniques; he guides you through a personal journey, helping you overcome physical, emotional, or expressive blocks. His attention to each individual student is sincere and consistent. He has studied with many teachers in different parts of the world, which makes his teaching rich and well-rounded, combining practice and theory in a balanced way. He is outgoing, open, and welcoming, yet always respectful and professional. He asks a lot, but only because he is the first to fully commit himself. A teacher who helps you grow, both artistically and personally. I highly recommend him to anyone seeking serious and in-depth training."
    },
    {
      "name": "Former student",
      "credit": "Giovanni Arnone Theatre Academy, 3 years",
      "quote": "He has been one of the best teachers I have ever had. His humor and the irony with which he approaches each lesson are contagious. A true great professional, both as an actor and as a teacher, and on a human level, a truly wonderful person.",
      "fullQuote": "Ivano was my teacher at the Giovanni Arnone Theatre Academy. He put up with me for a full three years. Together we explored masks -- from the Neutral Mask to Commedia dell'Arte, through Larval Masks and even some introduction to the Feldenkrais Method. With him, I undertook not only a highly professional training path in masks and Commedia dell'Arte, but a true personal evolution that improved the quality of my working life. I learned that the mask, as fascinating and perhaps even mystical as it may seem, is nothing more than \"a piece of leather,\" as he would say -- and that the only truly essential tool on stage is ourselves and our body. I entered the Academy as stiff as a piece of wood, and it is only thanks to him that I have now acquired movements that were completely unknown to me three years ago. Through him, I learned that you may fail, but you must never give up -- and that we carry the responsibility of the performance and the audience. I learned to find my own sense of play even in the most seemingly anonymous things -- though nothing is ever truly \"anonymous\" -- and that when we joke, we must be serious. He has been one of the best teachers I have ever had. His humor and the irony with which he approaches each lesson are contagious. A true great professional, both as an actor and as a teacher, and on a human level, a truly wonderful person. He probably does not know the great influence he has had on me, nor the deep respect and admiration I feel for him. I am grateful that he asked me for this small piece of feedback, because after three years I can perhaps write something that I would never have been able to say to him directly."
    },
    {
      "name": "Workshop participant",
      "credit": "Physical theatre workshops",
      "quote": "Ivano is an extremely knowledgeable, precise, and reliable professional. One of the things I appreciated most is the seriousness he brings to the work, conveyed with remarkable lightness. A rare encounter that undoubtedly leaves a lasting mark.",
      "fullQuote": "Ivano is an extremely knowledgeable, precise, and reliable professional. With his direct, empathetic, and above all respectful way of communicating, he immediately makes you feel at ease. He is a focused and present teacher, with an exceptional ability to listen without ever making you feel judged. One of the things I appreciated most about his work is the seriousness he brings to it, conveyed with remarkable lightness. It is precisely this atmosphere that allows you to learn while enjoying the process. When working with him, you feel as though you are being taken by the hand and guided toward a shared goal. Every step is experienced together, and every achievement is the result of sincere and in-depth work. A rare encounter that undoubtedly leaves a lasting mark."
    }
  ]
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/content/singletons/testimonials.json
git commit -m "content: add full-length testimonial quotes from raw/other-information.md"
```

---

### Task 7: Update workshop JSON files with images, focus areas, and module descriptions

**Files:**
- Modify: `src/content/workshops/commedia-dell-arte-la-2026.json`
- Modify: `src/content/workshops/neutral-mask-la-2026.json`
- Modify: `src/content/workshops/commedia-dell-arte-lyon-2026.json`
- Modify: `src/content/workshops/mask-and-play-corsica-2026.json`
- Modify: `src/content/workshops/embodied-poetics-padua-2026.json`

- [ ] **Step 1: Add fields to commedia-dell-arte-la-2026.json**

Add these fields at the end of the JSON object (before the closing `}`):

```json
"image": "/card-commedia.jpg",
"focusAreas": [
  "The mechanics of Commedia characters",
  "Improvisation and canovacci",
  "Rhythm, timing, and comic precision",
  "Vocal play and physical instinct"
],
"moduleDescription": "This workshop develops confidence, agility, and the capacity for quick, instinctive creative choices. A dynamic training in half-mask performance grounded in Commedia traditions."
```

- [ ] **Step 2: Add fields to neutral-mask-la-2026.json**

```json
"image": "/card-neutral-mask.jpg",
"focusAreas": [
  "Presence without tension",
  "Grounded movement",
  "Essential action free of excess",
  "Responsiveness to space and impulse"
],
"moduleDescription": "Neutral mask work develops a performer's ability to act with directness and simplicity, revealing how expressive the body is before character or text appear."
```

- [ ] **Step 3: Add fields to commedia-dell-arte-lyon-2026.json**

```json
"image": "/card-commedia-lyon.jpg",
"focusAreas": [
  "The mechanics of Commedia characters",
  "Improvisation and canovacci",
  "Rhythm, timing, and comic precision",
  "Vocal play and physical instinct"
],
"moduleDescription": "This workshop develops confidence, agility, and the capacity for quick, instinctive creative choices. A dynamic training in half-mask performance grounded in Commedia traditions."
```

- [ ] **Step 4: Add fields to mask-and-play-corsica-2026.json**

```json
"image": "/card-mask-play.jpg",
"focusAreas": [
  "Mask forms and their physical language",
  "Play, presence, and physical clarity",
  "Ensemble dynamics and responsiveness",
  "Creative exploration through mask and movement"
],
"moduleDescription": "A workshop exploring the intersection of mask forms and physical play. Performers develop clarity, boldness, and a responsive physical language through guided creative exploration."
```

- [ ] **Step 5: Add fields to embodied-poetics-padua-2026.json**

```json
"image": "/card-embodied-poetics.jpg",
"focusAreas": [
  "Movement analysis and physical expression",
  "The creative process in Lecoq pedagogy",
  "Ensemble creation and collective play",
  "Integration of somatic and theatrical practice"
],
"moduleDescription": "An immersive journey through the foundations of Jacques Lecoq's pedagogy, combining movement analysis, mask work, and creative process in an intensive residential format."
```

- [ ] **Step 6: Verify build passes**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/content/workshops/*.json
git commit -m "content: add images, focus areas, and module descriptions to all workshops"
```

---

### Task 8: Create PhilosophyGrid component

**Files:**
- Create: `src/components/PhilosophyGrid.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create PhilosophyGrid.astro**

```astro
---
interface PhilosophyArea {
  readonly title: string;
  readonly description: string;
}

interface Props {
  areas: readonly PhilosophyArea[];
}

const { areas } = Astro.props;
---

<div class="philosophy-grid">
  {
    areas.map((area) => (
      <article class="philosophy-card reveal">
        <h3>{area.title}</h3>
        <p>{area.description}</p>
      </article>
    ))
  }
</div>
```

- [ ] **Step 2: Add CSS for philosophy-grid to global.css**

Add at the end of `src/styles/global.css`, before the final closing comment or at the end of the file:

```css
/* Philosophy grid — 2-column layout for teaching philosophy areas */
.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.philosophy-card {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 3px solid var(--green);
  box-shadow: var(--shadow);
}

.philosophy-card h3 {
  font-family: var(--display-font);
  font-size: 1.15rem;
  margin: 0 0 0.5rem;
}

.philosophy-card p {
  font-size: 0.92rem;
  color: var(--muted);
  margin: 0;
  line-height: 1.65;
}

@media (max-width: 720px) {
  .philosophy-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/PhilosophyGrid.astro src/styles/global.css
git commit -m "feat: add PhilosophyGrid component for 6-area teaching philosophy"
```

---

### Task 9: Create GalleryGrid component

**Files:**
- Create: `src/components/GalleryGrid.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create GalleryGrid.astro**

```astro
---
interface Props {
  images: readonly string[];
}

const { images } = Astro.props;
---

<div class="gallery-grid">
  {
    images.map((src, i) => (
      <img
        src={src}
        alt={`Workshop and performance photography ${i + 1}`}
        class="gallery-grid__img"
        loading="lazy"
        width="400"
        height="300"
      />
    ))
  }
</div>
```

- [ ] **Step 2: Add CSS for gallery-grid to global.css**

Append to `src/styles/global.css`:

```css
/* Gallery grid — masonry-style image gallery */
.gallery-grid {
  columns: 3;
  column-gap: 1rem;
}

.gallery-grid__img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
  break-inside: avoid;
}

@media (max-width: 980px) {
  .gallery-grid {
    columns: 2;
  }
}

@media (max-width: 720px) {
  .gallery-grid {
    columns: 1;
  }
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/GalleryGrid.astro src/styles/global.css
git commit -m "feat: add GalleryGrid component for masonry-style image gallery"
```

---

### Task 10: Update WorkshopCard component to support images

**Files:**
- Modify: `src/components/WorkshopCard.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add `image` to the Workshop interface and render it**

In `src/components/WorkshopCard.astro`, add `image` to the interface:

```typescript
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
  image?: string | null;
}
```

Then add the image rendering right after the opening `<article>` tag:

```astro
<article class="workshop-card reveal">
  {workshop.image && (
    <img
      src={workshop.image}
      alt={`${workshop.title} workshop`}
      class="workshop-card__img"
      width="600"
      height="400"
      loading="lazy"
    />
  )}
  <div class="workshop-card__header">
```

- [ ] **Step 2: Add CSS for workshop card image**

Append to `src/styles/global.css`:

```css
/* Workshop card image */
.workshop-card__img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
  margin: -1.5rem -1.5rem 1rem;
  width: calc(100% + 3rem);
}
```

Note: The existing `.workshop-card` likely has `padding: 1.5rem` — the negative margin and calc width make the image bleed to the card edges. Verify by checking the existing workshop-card padding in global.css and adjust the values accordingly.

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/WorkshopCard.astro src/styles/global.css
git commit -m "feat: add optional image support to WorkshopCard component"
```

---

### Task 11: Update TestimonialGrid for expandable full quotes

**Files:**
- Modify: `src/components/TestimonialGrid.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update TestimonialGrid interface and add expandable pattern**

Replace the full content of `src/components/TestimonialGrid.astro`:

```astro
---
interface Testimonial {
  readonly name: string;
  readonly credit: string;
  readonly quote: string;
  readonly fullQuote?: string;
}

interface Props {
  testimonials: readonly Testimonial[];
  expandable?: boolean;
}

const { testimonials, expandable = false } = Astro.props;
---

<div class="quote-grid">
  {
    testimonials.map((testimonial) => (
      <blockquote class="quote-card reveal">
        <p>"{testimonial.quote}"</p>
        {expandable && testimonial.fullQuote && (
          <details class="quote-card__details">
            <summary>Read full testimonial</summary>
            <p>"{testimonial.fullQuote}"</p>
          </details>
        )}
        <footer>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.credit}</span>
        </footer>
      </blockquote>
    ))
  }
</div>
```

- [ ] **Step 2: Add CSS for expandable testimonials**

Append to `src/styles/global.css`:

```css
/* Expandable testimonial details */
.quote-card__details {
  margin-top: 0.75rem;
  border-top: 1px solid var(--line);
  padding-top: 0.75rem;
}

.quote-card__details summary {
  cursor: pointer;
  color: var(--green);
  font-size: 0.88rem;
  font-weight: 500;
  list-style: none;
}

.quote-card__details summary::before {
  content: "\25B8 ";
}

.quote-card__details[open] summary::before {
  content: "\25BE ";
}

.quote-card__details p {
  margin-top: 0.75rem;
  font-size: 0.88rem;
  line-height: 1.7;
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/TestimonialGrid.astro src/styles/global.css
git commit -m "feat: add expandable full-quote support to TestimonialGrid"
```

---

### Task 12: Update Home page template (index.astro)

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Update the hero section copy**

In `src/pages/index.astro`, replace the hero section content. Change the eyebrow, headline, lede, CTA button text, and hero image:

Replace:
```astro
<p class="eyebrow">Commedia dell'Arte &middot; Neutral Mask &middot; Physical Theatre</p>
<h1>The mask is a piece of leather. <em>You</em> are the instrument.</h1>
<p class="hero__lede">
  {siteSettings.name} leads international workshops in Commedia dell'Arte,
  Neutral Mask, and physical theatre rooted in the Lecoq pedagogy.
  A space for play, experimentation, and the freedom to discover.
</p>
```

With:
```astro
<p class="eyebrow">Movement Teacher &middot; Physical Theatre &middot; Lecoq Pedagogy</p>
<h1>Movement. Presence. Imagination.</h1>
<p class="hero__lede">
  I am a movement teacher and physical theatre practitioner with an
  international background rooted in Jacques Lecoq's pedagogy. My work
  begins from a clear conviction: <strong>the body is the foundation of
  storytelling.</strong> Before words or character appear, performers respond
  to space, rhythm, weight, and the environment around them. That physical
  response is where theatre truly starts.
</p>
```

- [ ] **Step 2: Update the CTA button text**

Replace:
```astro
<a class="button button--ghost" href="/about/">Teaching philosophy</a>
```

With:
```astro
<a class="button button--ghost" href="/about/">About my approach</a>
```

- [ ] **Step 3: Update the hero image**

Replace:
```astro
<img
  src="/commedia-mask.jpg"
  alt="Commedia dell'Arte character in mask -- workshop performance"
```

With:
```astro
<img
  src="/hero.jpg"
  alt="Ivano Conte -- movement teacher and physical theatre practitioner"
```

- [ ] **Step 4: Update the spotlight list to first-person**

Replace:
```astro
<ul class="spotlight-list">
  <li>Commedia dell'Arte intensives with masked character work</li>
  <li>Neutral Mask workshops for presence and physical clarity</li>
  <li>International residencies and guest studio intensives</li>
</ul>
```

With:
```astro
<ul class="spotlight-list">
  <li>Commedia dell'Arte intensives with masked character work</li>
  <li>Neutral Mask workshops for presence and physical clarity</li>
  <li>International residencies across Europe, Canada, and the USA</li>
</ul>
```

- [ ] **Step 5: Update the Approach section title**

Replace:
```astro
<SectionTitle
  eyebrow="Approach"
  title="Play freely. Work rigorously. Carry it forward."
  description="The teaching philosophy is rooted in play, experimentation, and the belief that mistakes are not to be demonized -- they are where discovery begins."
/>
```

With:
```astro
<SectionTitle
  eyebrow="Approach"
  title="Movement as inquiry, creation as practice."
  description="My teaching grows from the intersection of movement training, mask work, and somatic exploration. I see the actor not as a container to fill, but as an artist with a physical intelligence already present in their body."
/>
```

- [ ] **Step 6: Update the "In The Room" section title**

Replace:
```astro
<SectionTitle
  eyebrow="In The Room"
  title="Every session begins in the body."
  description="The structure moves from physical preparation through ensemble play to integration -- rigorous training that stays playful."
/>
```

With:
```astro
<SectionTitle
  eyebrow="In The Room"
  title="Every session I lead begins in the body."
  description="The structure moves from physical preparation through ensemble play to integration -- rigorous training that stays playful."
/>
```

- [ ] **Step 7: Update the banner/CTA section**

Replace:
```astro
<h2>New dates, early access, and workshop updates from Rome and beyond.</h2>
<p>
  Reach out to be first to know when new workshops open for registration
  in Los Angeles, Europe, and beyond.
</p>
```

With:
```astro
<h2>I share new dates, early access, and workshop updates from Rome and beyond.</h2>
<p>
  Reach out to be first to know when new workshops open for registration
  in Los Angeles, Europe, and beyond.
</p>
```

- [ ] **Step 8: Verify build passes**

```bash
npm run build
```

- [ ] **Step 9: Commit**

```bash
git add src/pages/index.astro
git commit -m "content: rewrite home page to first-person voice with new hero headline"
```

---

### Task 13: Update About page template (about.astro)

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Add imports for new components**

At the top of the frontmatter, add imports for PhilosophyGrid and GalleryGrid:

```astro
import GalleryGrid from "../components/GalleryGrid.astro";
import PastWorkshopList from "../components/PastWorkshopList.astro";
import PhilosophyGrid from "../components/PhilosophyGrid.astro";
import PillarGrid from "../components/PillarGrid.astro";
import SectionTitle from "../components/SectionTitle.astro";
import TestimonialGrid from "../components/TestimonialGrid.astro";
import BaseLayout from "../layouts/BaseLayout.astro";
import { reader, personSchema } from "../lib/reader";
```

- [ ] **Step 2: Update the hero eyebrow**

Replace:
```astro
<p class="eyebrow">About {siteSettings.name}</p>
```

With:
```astro
<p class="eyebrow">Movement, Theatre & Creative Inquiry</p>
```

- [ ] **Step 3: Update the About page portrait image**

Replace:
```astro
<img
  src="/portrait.jpg"
  alt="Ivano Conte -- theatre pedagogue and movement teacher"
  class="portrait-card__img"
  width="320"
  height="320"
```

With:
```astro
<img
  src="/portrait.jpg"
  alt="Ivano Conte -- theatre pedagogue and movement teacher"
  class="portrait-card__img"
  width="600"
  height="600"
```

(The portrait.jpg file was replaced with a larger version in Task 1.)

- [ ] **Step 4: Replace the Philosophy section — swap PillarGrid for PhilosophyGrid**

Replace the entire philosophy section:

```astro
<section class="section section--tint">
  <SectionTitle
    eyebrow="Philosophy"
    title="Mistakes are where discovery begins."
    description="A teaching approach built on play within the group and a space open to experimentation."
  />
  <PillarGrid pillars={home.pillars} />
</section>
```

With:

```astro
<section class="section section--tint">
  <SectionTitle
    eyebrow="Teaching Philosophy"
    title="Movement as Inquiry, Creation as Practice"
    description="I see the actor not as a container to fill, but as an artist with a physical intelligence already present in their body: an intelligence that can be sharpened, questioned, and expanded."
  />
  <PhilosophyGrid areas={about.philosophyAreas} />
</section>
```

- [ ] **Step 5: Expand the photo band from 3 to 6 images**

Replace the image-band section:

```astro
<section class="section">
  <div class="image-band">
    <img src="/teaching.jpg" alt="Ivano leading a workshop -- students in movement on the floor" class="image-band__img reveal" width="1080" height="763" loading="lazy" />
    <img src="/workshop-group.jpg" alt="Workshop ensemble with Commedia dell'Arte masks" class="image-band__img reveal" width="1080" height="1080" loading="lazy" />
    <img src="/neutral-mask.jpg" alt="The Neutral Mask -- foundational tool of the Lecoq pedagogy" class="image-band__img reveal" width="1080" height="1350" loading="lazy" />
  </div>
</section>
```

With:

```astro
<section class="section">
  <div class="image-band">
    <img src="/band-1.jpg" alt="Workshop ensemble in movement" class="image-band__img reveal" width="1080" height="763" loading="lazy" />
    <img src="/band-2.jpg" alt="Mask work in the studio" class="image-band__img reveal" width="1080" height="1080" loading="lazy" />
    <img src="/band-3.jpg" alt="Commedia dell'Arte performance" class="image-band__img reveal" width="1080" height="1350" loading="lazy" />
    <img src="/band-4.jpg" alt="Teaching physical theatre" class="image-band__img reveal" width="1080" height="763" loading="lazy" />
    <img src="/band-5.jpg" alt="Ensemble work on stage" class="image-band__img reveal" width="1080" height="1080" loading="lazy" />
    <img src="/band-6.jpg" alt="Movement and mask exploration" class="image-band__img reveal" width="1080" height="1350" loading="lazy" />
  </div>
</section>
```

- [ ] **Step 6: Add gallery section after Ideal Student section**

After the "Ideal Student" section and before the "Workshop History" section, add:

```astro
<section class="section">
  <SectionTitle
    eyebrow="In The Studio & On Stage"
    title="The work in images"
  />
  <GalleryGrid images={about.galleryImages} />
</section>
```

- [ ] **Step 7: Update testimonials section to use expandable mode and show all 5**

Replace:
```astro
<section class="section section--tint">
  <SectionTitle
    eyebrow="What Students Say"
    title="Words from those who have done the work."
  />
  <TestimonialGrid testimonials={testimonialsData.items.slice(0, 3)} />
</section>
```

With:
```astro
<section class="section section--tint">
  <SectionTitle
    eyebrow="What Students Say"
    title="Words from those who have done the work."
  />
  <TestimonialGrid testimonials={testimonialsData.items} expandable />
</section>
```

- [ ] **Step 8: Remove the `home` import since PillarGrid no longer reads from it**

In the frontmatter `Promise.all`, remove the `home` read since the About page no longer uses `home.pillars`:

Replace:
```astro
const [siteSettings, about, home, testimonialsData, allPastWorkshops] =
  await Promise.all([
    reader.singletons.siteSettings.read(),
    reader.singletons.about.read(),
    reader.singletons.home.read(),
    reader.singletons.testimonials.read(),
    reader.collections.pastWorkshops.all(),
  ]);
```

With:
```astro
const [siteSettings, about, testimonialsData, allPastWorkshops] =
  await Promise.all([
    reader.singletons.siteSettings.read(),
    reader.singletons.about.read(),
    reader.singletons.testimonials.read(),
    reader.collections.pastWorkshops.all(),
  ]);
```

Also remove:
```astro
if (!home) throw new Error("Home content not found");
```

And remove the `PillarGrid` import if it's no longer used on this page (it's still used for idealStudents, so keep it).

Actually — check: `PillarGrid` is still used for the Ideal Student section (`<PillarGrid pillars={about.idealStudents} />`), so keep the import.

- [ ] **Step 9: Verify build passes**

```bash
npm run build
```

- [ ] **Step 10: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add philosophy grid, gallery, expandable testimonials to about page"
```

---

### Task 14: Update Workshop index and detail pages

**Files:**
- Modify: `src/pages/workshops/index.astro`
- Modify: `src/pages/workshops/[slug].astro`

- [ ] **Step 1: Update workshop index hero copy**

In `src/pages/workshops/index.astro`, replace the hero headline and description:

Replace:
```astro
<h1>Commedia dell'Arte, Neutral Mask, and physical theatre.</h1>
<p>
  International intensives rooted in the Lecoq pedagogy.
  Each workshop is designed for play, experimentation, and rigorous
  physical training in an intimate, supportive setting.
</p>
```

With:
```astro
<h1>Physical Expression, Masks & Creative Training</h1>
<p>
  Each workshop explores a different dimension of physical theatre,
  movement awareness, and creative invention. Modules can be taken
  individually or combined into intensive programs for schools,
  companies, or training institutions.
</p>
```

- [ ] **Step 2: Add focus areas section to workshop detail page**

In `src/pages/workshops/[slug].astro`, add a new section after the existing detail-layout section (before the closing `</BaseLayout>`). Also update the "Bring this workshop" paragraph to first-person:

Replace:
```astro
        <article class="info-card reveal">
          <h2>Bring this workshop to your space</h2>
          <p>
            This workshop can be adapted for studios, conservatories, festivals,
            and training programs. Ivano regularly teaches as a guest internationally.
          </p>
          <a class="button button--ghost" href="/contact/">Inquire about guest teaching</a>
        </article>
```

With:
```astro
        <article class="info-card reveal">
          <h2>Bring this workshop to your space</h2>
          <p>
            This workshop can be adapted for studios, conservatories, festivals,
            and training programs. I regularly teach as a guest internationally.
          </p>
          <a class="button button--ghost" href="/contact/">Inquire about guest teaching</a>
        </article>
```

Then, after the closing `</section>` of the detail-layout section and before `</BaseLayout>`, add:

```astro
  {workshop.focusAreas && workshop.focusAreas.length > 0 && (
    <section class="section section--tint">
      <SectionTitle
        eyebrow="What We Explore"
        title="Focus areas for this workshop"
      />
      <div class="philosophy-grid">
        {workshop.focusAreas.map((area) => (
          <article class="philosophy-card reveal">
            <p>{area}</p>
          </article>
        ))}
      </div>
      {workshop.moduleDescription && (
        <div class="section__footer reveal">
          <p>{workshop.moduleDescription}</p>
        </div>
      )}
    </section>
  )}
```

- [ ] **Step 3: Add SectionTitle import to [slug].astro**

In the frontmatter of `src/pages/workshops/[slug].astro`, add the SectionTitle import:

```astro
import SectionTitle from "../../components/SectionTitle.astro";
import BaseLayout from "../../layouts/BaseLayout.astro";
```

- [ ] **Step 4: Add CSS for section footer**

Append to `src/styles/global.css`:

```css
/* Section footer — summary text below a grid */
.section__footer {
  max-width: 720px;
  margin: 2rem auto 0;
  text-align: center;
}

.section__footer p {
  font-size: 1rem;
  color: var(--muted);
  line-height: 1.7;
}
```

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/pages/workshops/index.astro src/pages/workshops/\[slug\].astro src/styles/global.css
git commit -m "feat: add workshop focus areas section, update workshop index to first-person"
```

---

### Task 15: Final verification and build

**Files:** All modified files

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Start dev server and visually review**

```bash
npm run dev
```

Open http://localhost:4321 and check:

1. **Home page** — new headline, first-person lede, hero image, updated pillars, first-person banner
2. **About page** — first-person hero, bio, 6-area PhilosophyGrid, expanded photo band, gallery section, expandable testimonials
3. **Workshops page** — updated hero copy, images on workshop cards
4. **Workshop detail pages** — focus areas section appears, first-person "Bring this workshop" text
5. **Contact page** — first-person hero copy
6. **All images** — load correctly, properly sized

- [ ] **Step 3: Check Keystatic admin**

Open http://localhost:4321/keystatic and verify:

1. About singleton shows "Teaching Philosophy Areas" and "Gallery Images" fields
2. Testimonials singleton shows "Full Quote" field on each item
3. Workshop entries show "Card Image Path", "Focus Areas", and "Module Description" fields

- [ ] **Step 4: Commit any final adjustments**

If any adjustments were needed during review, commit them:

```bash
git add -A
git commit -m "fix: address visual review issues from copy refactor"
```
