# Developer Notes

Fill this out after your client discussion. This document is for you — it captures project constraints and technical decisions that inform how you build the site.

---

## Section 9 — Project Details

**Timeline — any hard deadline?**

> Example: Client has an event on April 27, 2026. Site must be live at least 2 weeks before for promotion.

**Must-haves at launch vs. nice-to-haves for later:**

> Example:
> - Must-have: Home, About, Events (with 5 workshops), Contact
> - Must-have: Mobile responsive
> - Nice-to-have: Photo gallery page
> - Nice-to-have: Blog / news section
> - Nice-to-have: Multi-language support

**Existing web presence — link anything they currently have:**

> Example: No existing website. Has an Instagram (@ivano.conte_) and uses email for all communication.

**Who approves the site? Just the client, or does a partner/manager/team review?**

> Example: Just the client (Ivano). He also works with a local organizer (Andrea) who handles logistics but does not review the site.

**Content readiness — is all content ready now, or will some come in later?**

> Example: Bio and philosophy are ready. Workshop details for 3 of 5 events are complete. 2 events still need dates confirmed. Photos are partially gathered — portraits done, need more teaching shots.

**Ongoing updates — how will the site be maintained?**

> Example: Client will add 3-5 new events per year. Wants CMS access (Keystatic) to manage events independently. Will need a brief training session on how to add/edit workshops.

---

## Section 10 — Technical Preferences

**Hosting platform:**

> Example: Netlify (free tier sufficient for static site)

**Domain registrar:**

> Example: Hostinger — client already owns thephysicalworkshop.com

**Third-party integrations:**

> Example:
> - Registration: No external platform — uses email-based registration
> - Mailing list: None currently, may add Mailchimp later
> - Analytics: Google Analytics
> - Payments: None — handles payments outside the site

**Analytics preference:**

> Example: Google Analytics (client wants basic traffic data)

---

## Build Workflow Notes

This section is for recording decisions made during the build.

**Skill workflow:**
- Survey Sections 1-6 → feed to LLM agent for copy drafting
- Survey Sections 7-8 → feed to `frontend-design` skill for visual direction
- Developer Notes Section 9 → feed to `superpowers` brainstorming/planning for project scoping
- Developer Notes Section 10 → feed to `claude-md-management` for CLAUDE.md generation

**Content pipeline:**
1. Client fills out survey + gathers assets
2. Developer fills out this document
3. Developer creates new repo from template
4. LLM agent drafts all site copy from survey answers
5. Frontend-design skill generates site design from Sections 7-8
6. Developer populates Keystatic JSON from drafted copy
7. Developer places images in `public/` from asset checklist
8. Client reviews and provides feedback
9. Iterate until approved, then deploy

**Notes from client call:**

> (Fill in after your discussion — anything surprising, non-obvious, or that changes how you'd approach the build)

---
