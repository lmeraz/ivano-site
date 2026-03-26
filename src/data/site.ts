export type WorkshopStatus = "open" | "waitlist" | "soon";

export interface Workshop {
  slug: string;
  title: string;
  badge: string;
  strapline: string;
  summary: string;
  lead: string;
  dateLabel: string;
  timeLabel: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  priceLabel: string;
  format: string;
  level: string;
  seats: string;
  status: WorkshopStatus;
  statusLabel: string;
  registrationUrl?: string;
  fallbackUrl: string;
  fallbackLabel: string;
  audience: string[];
  outcomes: string[];
  schedule: { label: string; detail: string }[];
}

export const site = {
  name: "Ivano Conte",
  role: "Theatre pedagogue, movement teacher, and Commedia dell'Arte specialist",
  baseCity: "Rome",
  siteUrl: "https://www.ivanoworkshops.com",
  email: "ivano.conte@gmail.com",
  instagram: "https://www.instagram.com/ivano.conte",
  description:
    "Ivano Conte leads Commedia dell'Arte, Neutral Mask, and physical theatre workshops rooted in the Lecoq pedagogy. International intensives for performers seeking authenticity, expressivity, and a living theatrical presence.",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Workshops", href: "/workshops/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],
} as const;

export const stats = [
  { value: "8+", label: "International workshops taught" },
  { value: "5", label: "Countries across three continents" },
  { value: "Lecoq", label: "Pedagogy rooted in the tradition" },
];

export const workshopPillars = [
  {
    title: "Play and experimentation",
    description:
      "A space open to mistakes, where performers feel free to try, to fail, and to discover. Play within the group is the foundation of every session.",
  },
  {
    title: "Warmth and presence",
    description:
      "Teaching that is close, smiling, and firm when necessary. No walls between teacher and student -- just shared commitment to the work.",
  },
  {
    title: "Physical discipline meets imagination",
    description:
      "Rigorous physical training blended with creative exploration, guiding performers toward authenticity, expressivity, and a living theatrical presence.",
  },
];

export const process = [
  {
    title: "Enter through the body",
    description:
      "Every session begins with physical preparation -- breath, rhythm, and awareness. The body becomes the instrument before the mask or the character arrives.",
  },
  {
    title: "Play within the ensemble",
    description:
      "Work happens in the group. Performers discover characters, impulses, and dynamics through collective play, improvisation, and the generous exchange of energy.",
  },
  {
    title: "Carry it forward",
    description:
      "Each workshop closes with reflection and integration. What was discovered in the room becomes a tool for the stage, the rehearsal, and life itself.",
  },
];

export const testimonials = [
  {
    name: "Workshop participant",
    credit: "Commedia dell'Arte, Montreal, March 2025",
    quote:
      "I found his entire curriculum to be effectively planned and structured. He introduced new concepts and exercises at a natural and helpful pace, ensuring we had time to absorb, take notes and implement in action everything we learned. We would all jump at the chance to learn from him again.",
  },
  {
    name: "Workshop participant",
    credit: "Bouffons and Commedia dell'Arte",
    quote:
      "Ivano is a wonderful, observant and thoughtful teacher. His classes always feel like a playground to experiment and explore different forms. He has an innate ability to create a warm, inviting atmosphere which helped me be more of myself.",
  },
  {
    name: "Workshop participant",
    credit: "Commedia dell'Arte and Feldenkrais Method",
    quote:
      "Ivano does not simply teach techniques; he guides you through a personal journey, helping you overcome physical, emotional, or expressive blocks. His attention to each individual student is sincere and consistent.",
  },
  {
    name: "Former student",
    credit: "Giovanni Arnone Theatre Academy, 3 years",
    quote:
      "He has been one of the best teachers I have ever had. His humor and the irony with which he approaches each lesson are contagious. A true great professional, both as an actor and as a teacher, and on a human level, a truly wonderful person.",
  },
  {
    name: "Workshop participant",
    credit: "Physical theatre workshops",
    quote:
      "Ivano is an extremely knowledgeable, precise, and reliable professional. One of the things I appreciated most is the seriousness he brings to the work, conveyed with remarkable lightness. A rare encounter that undoubtedly leaves a lasting mark.",
  },
];

export const faqs = [
  {
    question: "Do I need previous experience in physical theatre or Commedia dell'Arte?",
    answer:
      "No. Each workshop lists its expected level, but many sessions are open to all. The work meets you where you are. What matters most is willingness to play and put yourself on the line.",
  },
  {
    question: "What should I wear or bring to a workshop?",
    answer:
      "Comfortable clothing that allows full movement. Soft-soled shoes or bare feet depending on the venue. Everything else -- masks, props, materials -- is provided.",
  },
  {
    question: "Can I attend a workshop if I'm not a professional actor?",
    answer:
      "Absolutely. The work is valuable for anyone drawn to physical expression, presence, and play. Theatre-makers, dancers, educators, and curious beginners are all welcome.",
  },
  {
    question: "Are scholarships or reduced rates available?",
    answer:
      "We are committed to providing paths of access for practitioners of color, trans theatre-makers, and those from backgrounds not typically represented in the field. Scholarships are available -- please reach out to inquire.",
  },
  {
    question: "Can I bring Ivano to my school, studio, or festival?",
    answer:
      "Yes. Ivano regularly leads guest workshops at studios, conservatories, and festivals internationally. Use the contact page to discuss format, duration, and logistics.",
  },
];

export const workshops: Workshop[] = [
  {
    slug: "commedia-dell-arte-la-2026",
    title: "Commedia dell'Arte",
    badge: "Los Angeles Intensive",
    strapline:
      "Five days of Commedia dell'Arte and the foundations of physical theatre in Los Angeles.",
    summary:
      "An intensive workshop exploring the masks, characters, and physical language of Commedia dell'Arte. Rooted in the Lecoq pedagogy, this five-day immersion covers character analysis, improvisation, rhythm, and the foundational principles of masked performance.",
    lead:
      "Whether you are encountering Commedia for the first time or returning to deepen your practice, this intensive offers a rigorous and playful exploration of one of theatre's oldest living traditions.",
    dateLabel: "April 27 -- May 1, 2026",
    timeLabel: "Full days",
    startDate: "2026-04-27T10:00:00-07:00",
    endDate: "2026-05-01T18:00:00-07:00",
    location: "Los Angeles, USA",
    venue: "Industry Loft",
    priceLabel: "Contact for pricing",
    format: "In-person",
    level: "Open level",
    seats: "Limited",
    status: "open",
    statusLabel: "Registration open",
    fallbackUrl:
      "mailto:ivano.conte@gmail.com?subject=Commedia%20dell'Arte%20LA%20-%20Registration",
    fallbackLabel: "Register by email",
    audience: [
      "Actors and performers seeking physical theatre training rooted in a living tradition",
      "Returning students who want to deepen their Commedia dell'Arte practice",
      "Theatre-makers curious about masked performance and the Lecoq approach",
    ],
    outcomes: [
      "Understanding of key Commedia dell'Arte characters and their physical signatures",
      "Practical skills in masked improvisation, rhythm, and ensemble play",
      "A deeper relationship with the body as the primary instrument of performance",
    ],
    schedule: [
      {
        label: "Physical preparation",
        detail:
          "Each day opens with body work -- breath, rhythm, and spatial awareness to prepare the instrument.",
      },
      {
        label: "Character and mask work",
        detail:
          "Progressive exploration of Commedia characters through the mask, from first encounters to improvised scenes.",
      },
      {
        label: "Ensemble play and integration",
        detail:
          "Group improvisations that weave the day's discoveries into shared theatrical play.",
      },
    ],
  },
  {
    slug: "neutral-mask-la-2026",
    title: "Neutral Mask",
    badge: "Los Angeles Weekend",
    strapline:
      "Three days focused on the essential principles of Jacques Lecoq's pedagogy and the foundational work of presence.",
    summary:
      "The Neutral Mask is the starting point of Lecoq's pedagogy -- a tool for discovering economy of movement, clarity of intention, and the deepest presence an actor can bring to the stage. This three-day workshop explores the mask as a mirror of essential human movement.",
    lead:
      "If you want to go deeper into the foundational work of Jacques Lecoq's pedagogy, Neutral Mask work is exactly what you are looking for. A weekend of clarity, physical awareness, and presence.",
    dateLabel: "May 8 -- 10, 2026",
    timeLabel: "Full days",
    startDate: "2026-05-08T10:00:00-07:00",
    endDate: "2026-05-10T18:00:00-07:00",
    location: "Los Angeles, USA",
    venue: "Thymele Arts",
    priceLabel: "Contact for pricing",
    format: "In-person",
    level: "Open level",
    seats: "Limited",
    status: "open",
    statusLabel: "Registration open",
    fallbackUrl:
      "mailto:ivano.conte@gmail.com?subject=Neutral%20Mask%20LA%20-%20Registration",
    fallbackLabel: "Register by email",
    audience: [
      "Performers seeking the foundational body work of the Lecoq tradition",
      "Actors who completed the Commedia dell'Arte workshop and want to go deeper",
      "Anyone drawn to presence, physical clarity, and essential movement",
    ],
    outcomes: [
      "Understanding of the Neutral Mask as a pedagogical tool for presence and economy",
      "Greater physical awareness, clarity of gesture, and spatial sensitivity",
      "A foundation for all subsequent mask work and physical theatre practice",
    ],
    schedule: [
      {
        label: "Body and space",
        detail:
          "Opening work on breath, weight, and the relationship between the body and the surrounding space.",
      },
      {
        label: "The mask encounters",
        detail:
          "Progressive exercises with the Neutral Mask -- movement journeys, elemental work, and essential human gestures.",
      },
      {
        label: "Integration",
        detail:
          "Bringing the mask's lessons back into the unmasked body -- presence without artifice.",
      },
    ],
  },
  {
    slug: "mask-and-play-corsica-2026",
    title: "Mask and Play",
    badge: "Corsica Intensive",
    strapline:
      "An immersive exploration of mask work and theatrical play on the island of Corsica.",
    summary:
      "Mask and Play brings together various mask traditions -- from Neutral to Expressive -- in an intensive format surrounded by the landscape of Corsica. The workshop explores how the mask liberates the performer's body and imagination.",
    lead:
      "A unique opportunity to work with masks in an inspiring Mediterranean setting, combining rigorous physical training with the freedom of play.",
    dateLabel: "May 2026",
    timeLabel: "Full days",
    startDate: "2026-05-15T10:00:00+02:00",
    endDate: "2026-05-20T18:00:00+02:00",
    location: "Ajaccio, Corsica",
    venue: "Ajaccio",
    priceLabel: "Contact for pricing",
    format: "In-person",
    level: "Open level",
    seats: "Limited",
    status: "soon",
    statusLabel: "Coming soon",
    fallbackUrl:
      "mailto:ivano.conte@gmail.com?subject=Mask%20and%20Play%20Corsica%20-%20Interest",
    fallbackLabel: "Express interest",
    audience: [
      "Performers wanting an immersive mask experience in a unique setting",
      "Theatre-makers exploring the relationship between mask, body, and environment",
      "International practitioners seeking intensive training outside the studio",
    ],
    outcomes: [
      "Experience across multiple mask traditions and their physical demands",
      "Deeper understanding of how environment and space shape theatrical play",
      "Skills in mask-based improvisation and ensemble creation",
    ],
    schedule: [
      {
        label: "Morning body work",
        detail:
          "Physical preparation attuned to the natural environment -- breath, rhythm, and spatial awareness.",
      },
      {
        label: "Mask explorations",
        detail:
          "Working through different mask families with exercises designed for discovery and play.",
      },
      {
        label: "Evening ensemble",
        detail:
          "Collective creation sessions where the day's explorations become shared theatrical moments.",
      },
    ],
  },
  {
    slug: "embodied-poetics-padua-2026",
    title: "First Voyage of Embodied Poetics",
    badge: "Padua Residency",
    strapline:
      "A deep residency in Padua exploring the full arc of Lecoq's pedagogy through Embodied Poetics.",
    summary:
      "The First Voyage is an extended residency that traces the foundational arc of Jacques Lecoq's methodology -- from movement analysis through mask work, Commedia dell'Arte, and the creative process. An intensive journey for serious practitioners.",
    lead:
      "An extended immersion in the Lecoq tradition, designed for those ready to commit to a deeper, sustained exploration of physical theatre and its creative possibilities.",
    dateLabel: "June -- July 2026",
    timeLabel: "Multi-week residency",
    startDate: "2026-06-15T10:00:00+02:00",
    endDate: "2026-07-15T18:00:00+02:00",
    location: "Padua, Italy",
    venue: "Padua",
    priceLabel: "Contact for pricing",
    format: "In-person",
    level: "Intermediate to advanced",
    seats: "Limited",
    status: "soon",
    statusLabel: "Coming soon",
    fallbackUrl:
      "mailto:ivano.conte@gmail.com?subject=Embodied%20Poetics%20Padua%20-%20Interest",
    fallbackLabel: "Express interest",
    audience: [
      "Committed practitioners seeking an extended physical theatre residency",
      "Performers and educators wanting a comprehensive Lecoq methodology experience",
      "Artists ready for sustained, intensive training over multiple weeks",
    ],
    outcomes: [
      "A comprehensive understanding of Lecoq's pedagogical arc",
      "Advanced skills in movement analysis, mask work, and ensemble creation",
      "A personal creative practice grounded in physical theatre principles",
    ],
    schedule: [
      {
        label: "Movement foundations",
        detail:
          "Daily practice in movement analysis, dynamics, and the physical laws that govern theatrical expression.",
      },
      {
        label: "Mask progression",
        detail:
          "A journey through the mask families -- Neutral, Larval, Expressive, and Commedia dell'Arte.",
      },
      {
        label: "Creative laboratory",
        detail:
          "Ensemble creation work that synthesizes the residency's explorations into original theatrical material.",
      },
    ],
  },
  {
    slug: "commedia-dell-arte-lyon-2026",
    title: "Commedia dell'Arte",
    badge: "Lyon Workshop",
    strapline:
      "Commedia dell'Arte in Lyon -- an intensive workshop on masked characters and physical comedy.",
    summary:
      "Returning to France for an intensive Commedia dell'Arte workshop in Lyon. The same rigorous, playful approach to masked performance and character work, now in one of Europe's great theatre cities.",
    lead:
      "An opportunity to explore the Commedia tradition in the heart of a city deeply connected to theatrical innovation and the French physical theatre lineage.",
    dateLabel: "October 2026",
    timeLabel: "Full days",
    startDate: "2026-10-01T10:00:00+02:00",
    endDate: "2026-10-05T18:00:00+02:00",
    location: "Lyon, France",
    venue: "Lyon",
    priceLabel: "Contact for pricing",
    format: "In-person",
    level: "Open level",
    seats: "Limited",
    status: "soon",
    statusLabel: "Coming soon",
    fallbackUrl:
      "mailto:ivano.conte@gmail.com?subject=Commedia%20Lyon%20-%20Interest",
    fallbackLabel: "Express interest",
    audience: [
      "European practitioners seeking Commedia dell'Arte training",
      "Performers interested in the intersection of Italian and French physical theatre traditions",
      "Theatre-makers wanting intensive masked performance work",
    ],
    outcomes: [
      "Confident handling of key Commedia characters and their physical vocabularies",
      "Improvisation skills specific to the masked comedy tradition",
      "An embodied understanding of rhythm, timing, and comic precision",
    ],
    schedule: [
      {
        label: "Physical warm-up",
        detail:
          "Daily body preparation focused on rhythm, agility, and the physical readiness Commedia demands.",
      },
      {
        label: "Character work",
        detail:
          "Deep exploration of Commedia characters through mask, movement, and improvisation.",
      },
      {
        label: "Performance and play",
        detail:
          "Ensemble scenes and lazzi that bring the characters to life in comic situations.",
      },
    ],
  },
];

export const featuredWorkshops = workshops.slice(0, 2);

export const featuredTestimonials = testimonials.slice(0, 3);

export const idealStudentPillars = [
  {
    title: "The willing",
    description:
      "Someone who is not afraid to get their hands dirty. This does not exclude people who feel insecure -- on the contrary, they are the best to have in this kind of work.",
  },
  {
    title: "The insecure",
    description:
      'As someone who is insecure, shy, and introverted himself, Ivano found in "masked" play the freedom to express himself and then bring that freedom into real life.',
  },
  {
    title: "The curious",
    description:
      '"I do not believe that theatre is therapy, but I do believe that physical work leads to changes we can truly feel, allowing us to discover something new about ourselves."',
  },
];

export function personSchema(path = "/") {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Person" as const,
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    email: site.email,
    url: `${site.siteUrl}${path}`,
    homeLocation: {
      "@type": "City" as const,
      name: site.baseCity,
    },
  };
}

export function eventSchema(workshop: Workshop) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Event" as const,
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
      "@type": "Place" as const,
      name: workshop.venue,
      address: workshop.location,
    },
    organizer: {
      "@type": "Person" as const,
      name: site.name,
      email: site.email,
      url: site.siteUrl,
    },
    url: `${site.siteUrl}/workshops/${workshop.slug}/`,
  };
}

export const pastWorkshops = [
  { title: "Mimodynamics", location: "Padua, Italy", dates: "February 2026" },
  { title: "Movement and Play", location: "Chens-sur-Leman, France", dates: "February 2026" },
  { title: "Commedia dell'Arte", location: "Rome, Italy", dates: "January 2026" },
  { title: "Commedia dell'Arte", location: "Los Angeles, USA", dates: "November 2025" },
  { title: "Neutral Mask and Play", location: "Rome, Italy", dates: "October 2025" },
  { title: "Bouffons", location: "Padua, Italy", dates: "July 2025" },
  { title: "Commedia dell'Arte", location: "Montreal, Canada", dates: "March 2025" },
  { title: "Commedia dell'Arte", location: "Montreal, Canada", dates: "May 2024" },
];
