# Ivano Workshops Site -- Editing Guide

## How to Edit Your Website

Your website has a built-in content editor. You can change text, add workshops, update testimonials, and more -- all without touching code.

### Logging In

1. Go to **ivanoconte.com/keystatic**
2. Click **Sign in with GitHub**
3. Enter your GitHub username and password
4. You are now in the admin dashboard

### What You Can Edit

From the dashboard sidebar, you will see:

**Singletons (one-of-a-kind pages):**

| Section | What you can change |
|---------|-------------------|
| Site Settings | Your name, role, email, Instagram link, site description |
| Home Page | Hero text, approach pillars, process steps, stats, banner text |
| About Page | Bio paragraphs, teaching philosophy areas, gallery images, teaching quotes |
| Contact Page | Headline, description, contact channels |
| Testimonials | Student quotes (preview and full versions) |
| FAQs | Questions and answers |

**Collections (repeatable items):**

| Collection | What you can do |
|-----------|----------------|
| Workshops | Add, edit, or remove workshops. Change titles, dates, pricing, descriptions, status, images |
| Past Workshops | Add or remove past workshop entries (name, location, date) |

### Editing a Page

1. Click the section you want to edit in the sidebar
2. Change any field in the form
3. Click **Save** at the top
4. Your site rebuilds automatically -- changes are live in about a minute

### Formatting Your Text (Lists, Bold, Links)

Most of the longer text boxes accept simple **Markdown** formatting. Type these symbols and they turn into real formatting on the live site:

- **Bulleted list** -- start each line with a dash and a space:
  ```
  - First item
  - Second item
  ```
- **New paragraph** -- leave a blank line between two paragraphs.
- **Bold** -- wrap words in two asterisks: `**important**`
- **Italic** -- wrap words in one asterisk: `*gentle*`
- **Link** -- write `[text to show](https://example.com)`

This works in the longer text areas -- biography, page and section descriptions, workshop summaries, FAQ answers, and the like. Short single-line fields (titles, badges, dates) stay plain text.

### Adding a New Workshop

1. Click **Workshops** in the sidebar
2. Click **Create** (top right)
3. Fill in the fields:
   - **Title** and **Slug** (the URL-friendly name, e.g., `mask-workshop-rome-2026`)
   - **Badge** (e.g., "Rome Intensive")
   - **Status**: `open` (registration open), `waitlist`, or `soon` (coming soon)
   - **Featured**: check this to show the workshop on the home page
   - **Dates, location, pricing, format** -- fill in what applies
   - **Image**: path to the card image (e.g., `/card-your-workshop.jpg`)
4. Click **Save**

### Removing a Workshop

1. Click **Workshops** in the sidebar
2. Click the workshop you want to remove
3. Click **Delete** and confirm

### Workshop Status Options

| Status | What it means on the site |
|--------|--------------------------|
| `open` | Appears under "Registration Open" with a green badge |
| `waitlist` | Appears under "Waitlist" section |
| `soon` | Appears under "Coming Soon" section |

### Adding Images

To use a new image on the site:

1. Ask your developer to add the image file to the site's `public/` folder
2. Reference it by path in the relevant field (e.g., `/my-new-photo.jpg`)

Note: Images need to be added to the code repository. Your developer can show you how or handle this for you.

---

## What Requires a Developer

These changes need a developer to modify the code:

- Styling or layout changes (colors, fonts, spacing)
- Adding new pages or sections
- Adding new features (payment integration, mailing list signup, booking system)
- Domain or hosting configuration changes
- Adding images to the site (uploading to the `public/` folder)

---

## Your Accounts

| Service | Purpose | URL |
|---------|---------|-----|
| GitHub | Sign in to edit content | github.com |
| Netlify | Hosts your website (no login needed day-to-day) | netlify.com |
| Hostinger | Domain registration | hostinger.com |

---

## Quick Reference

- **Edit content:** ivanoconte.com/keystatic
- **View your site:** ivanoconte.com
- **Changes go live:** about 1 minute after saving
- **Need help?** Contact your developer
