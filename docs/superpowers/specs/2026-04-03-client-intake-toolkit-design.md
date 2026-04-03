# Client Intake Toolkit — Design Spec

**Date:** 2026-04-03
**Goal:** Create a reusable set of documents that capture everything needed from a client to replicate an events/personality-driven site like the Ivano Workshops site.

## Context

The Ivano Workshops site is an Astro 6 + Keystatic CMS site built for an event organizer / workshop teacher. All content lives as JSON in `src/content/`, defined by a Keystatic schema. The `./raw` directory contains the unstructured client materials (markdown, Word docs, 48 photos) that were manually translated into the structured JSON.

This toolkit replaces that ad-hoc process with a repeatable intake workflow: client fills out a survey and gathers assets, developer uses an LLM agent (with frontend-design and superpowers skills) to draft copy and build the site.

## Target Audience

- **Client:** Non-technical person who runs events — workshops, retreats, masterclasses, conferences. They provide raw substance; the LLM agent handles copywriting.
- **Developer:** Uses the completed toolkit to spin up a new site with the superpowers and frontend-design plugins.

## Deliverables

Four markdown documents, cleanly separated by audience:

### 1. Client Intake Survey (`client-intake-survey.md`)

Client-facing. Plain language, with example answers to guide responses.

**Section 1 — About You**
- Full name
- Professional title / role
- City you're based in
- A few paragraphs about your background — training, experience, what shaped you (agent polishes into bio)
- Credentials, certifications, notable affiliations
- Key people who influenced your work (mentors, teachers, collaborators)

**Section 2 — Your Events**
For each event currently offered or planned:
- Event name and type (workshop, retreat, masterclass, etc.)
- Short description — what is it and who is it for?
- What participants walk away with (outcomes)
- Typical schedule / flow of a session
- Location, format (in-person / online / hybrid), capacity
- Pricing structure (early bird, full price, bundles, scholarships)
- Any upcoming dates with locations

Plus a section for **past events** — name, location, approximate date. Establishes credibility.

**Section 3 — Your Teaching / Facilitation Philosophy**
- What principles guide how you lead your events?
- What makes your approach different from others in your field?
- Describe your ideal participant — who thrives in your events?
- Any quotes or mantras you come back to?

**Section 4 — Social Proof**
- 3-5 testimonials from past participants (name, event attended, what they said)
- If no testimonials yet: names of people they could ask
- 3-5 FAQs they commonly get from potential participants

**Section 5 — Contact & Channels**
- Email address
- Instagram handle and any other social links
- Preferred domain name (if they have one)
- How should people reach out? (separate channels for registration, general inquiries, collaboration, etc.)

**Section 6 — Brand Inspiration**
- 2-3 adjectives that describe your vibe / energy
- Links to websites, Instagram accounts, or brands they admire (doesn't have to be in their field)
- A sample of their natural writing voice — an email they've sent, a social post, a newsletter blurb (agent uses as voice reference)

**Section 7 — Site Look & Feel**
- Color preferences — any colors associated with your brand? Colors you hate? (or "I'll leave it to the designer")
- Mood — pick 2-3: elegant, playful, bold, minimal, earthy, warm, dramatic, clean, artistic, rustic, luxurious, raw
- Reference screenshots — specific pages or elements they love from the sites they linked in Section 6
- Photography style preference — full-bleed vs. contained, dark/moody vs. bright/airy, photo-heavy vs. text-forward

**Section 8 — Site Functionality**
- Do you need online registration / booking? (external link like Eventbrite, embedded form, or "email me")
- Do you want a mailing list signup? (Mailchimp, ConvertKit, etc.)
- Multiple languages?
- Any features you've seen on other sites that you want? (open-ended)

### 2. Asset Checklist (`asset-checklist.md`)

Client-facing. A categorized list of images and files to gather.

**Photo Categories:**

| Category | Purpose | Recommended Count | Notes |
|----------|---------|-------------------|-------|
| Portraits / Headshots | About page, bio, social meta | 5-10 | Different angles, settings. At least one clean headshot. |
| Teaching / Facilitating in Action | Event pages, homepage | 8-15 | Actively leading, interacting with participants |
| Event Atmosphere | Event pages, gallery | 5-10 | Wide shots of the space, group energy, candid moments |
| Performance / Demos | Homepage hero, credibility | 3-5 | Doing the thing you teach (if applicable) |
| Group / Ensemble | Community feel, testimonials | 3-5 | Participants together, collaborative moments |

**File Guidance:**
- Format: JPG or PNG preferred. Phone photos are fine — developer handles optimization.
- Naming: Descriptive names (`portrait-outdoor-1.jpg`, `workshop-mask-session.jpg`) — not `IMG_4392.heic`.
- Resolution: Higher is better. Don't downsize before sending.
- Delivery: Share via Google Drive, Dropbox, or similar. One folder per category.

**Optional Extras:**
- Logo (if they have one)
- Existing promotional flyers or PDFs
- Video links (YouTube, Vimeo) for potential embedding

### 3. Site Map (`site-map.md`)

Client-facing. A text overview showing what pages the site will have and where each piece of content goes. Maps survey sections and asset categories to site pages so the client understands *why* they're providing each piece of content.

**Structure:**

```
Home Page
├── Hero: your name, role, a striking image (Portrait or Performance photo)
├── Pillars: 3-5 core principles from your philosophy (Section 3)
├── Featured Events: 1-3 highlighted upcoming events (Section 2)
├── Testimonial highlight: one standout quote (Section 4)
└── Call to action: link to events page or registration

About Page
├── Bio: your background story (Section 1)
├── Philosophy: your approach and what makes it unique (Section 3)
├── Ideal Participant: who your events are for (Section 3)
├── Gallery: teaching, performance, ensemble photos (Asset Checklist)
└── Teaching quotes (Section 3)

Events Page
├── Upcoming Events: full details for each event (Section 2)
│   ├── Description, outcomes, schedule
│   ├── Dates, location, pricing, registration
│   └── Event-specific images (Asset Checklist)
├── Waitlist / Coming Soon events
├── Past Events: credibility list (Section 2)
├── Testimonials: participant feedback (Section 4)
└── FAQs: common questions (Section 4)

Individual Event Page (one per event)
├── Full description, lead paragraph
├── Who it's for (audience)
├── What you leave with (outcomes)
├── Session schedule / flow
├── Logistics: dates, venue, format, level, capacity
├── Pricing and registration
└── Event image

Contact Page
├── Headline and description
├── Contact channels with descriptions (Section 5)
│   e.g., Workshop Registration, General Inquiries, Collaboration
└── Social links (Section 5)
```

### 4. Developer Notes (`developer-notes.md`)

Developer-facing. Filled out by the developer after the client discussion.

**Section 9 — Project Details**
- Timeline — any deadline? (e.g., "event in 6 weeks, site must be live before")
- Must-haves vs. nice-to-haves — what's required at launch vs. phase 2
- Existing web presence — current website, Linktree, or landing page (link it)
- Who approves — just the client, or does a partner / manager / team review?
- Content readiness — all content ready now, or some coming later?
- Ongoing updates — will they add events regularly? Do they want CMS access or developer-managed?

**Section 10 — Technical Preferences**
- Hosting platform (Netlify, Vercel, Cloudflare, etc.)
- Domain registrar (if they own one already)
- Third-party integrations (Mailchimp, Eventbrite, Stripe, Cal.com, etc.)
- Analytics preference (Google Analytics, Plausible, none)

## How the Toolkit Feeds Into the Build Workflow

| Document | Consumed By | Purpose |
|----------|-------------|---------|
| Client Intake Survey (Sections 1-6) | LLM agent | Drafts all site copy from raw substance + voice samples |
| Client Intake Survey (Sections 7-8) | `frontend-design` skill | Visual direction and functional requirements |
| Asset Checklist | Developer | Organizes images into `public/` directory by category |
| Site Map | Client + Developer | Shared understanding of site structure |
| Developer Notes (Section 9) | `superpowers` brainstorming/planning | Scopes project, sets milestones, plans build order |
| Developer Notes (Section 10) | `claude-md-management` | Generates project CLAUDE.md with hosting, integrations, commands |

## Design Decisions

- **Survey is substance-focused, not copy-focused.** The client provides facts, background, and voice samples. The LLM agent does the heavy lifting of drafting polished copy that matches their voice.
- **Events + personality framing.** The survey is tailored to people who sell events (workshops, retreats, masterclasses) and whose personal brand is the reason to attend.
- **Client-facing vs. developer-facing separation.** The client never sees technical jargon. Developer notes capture project constraints and technical choices separately.
- **Markdown format.** Portable, version-controllable, works in any text editor. No dependency on external form tools.
- **Example answers inline.** Each survey question includes a brief example response (drawn from the Ivano site) directly below the prompt, so clients can see what a good response looks like without needing a separate reference document.
