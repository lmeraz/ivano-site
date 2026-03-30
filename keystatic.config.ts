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
