// ---------------------------------------------------------------------------
// Single source of truth for Renewed Bodyworks.
// Every NAP value, price, hour, and review is defined ONCE here and consumed by
// pages and JSON-LD so the site, schema, and copy can never disagree (audit
// NAP-01..04). Change a fact here and it updates everywhere.
// ---------------------------------------------------------------------------

export const SITE_URL = "https://www.renewedbodyworks.com";

export const business = {
  name: "Renewed Bodyworks",
  legalName: "Renewed Bodyworks LLC",
  tagline: "Unwind, Heal, Restore",
  practitioner: "Scott Hartzell, LMT",
  phone: "541-543-5215",
  phoneHref: "tel:+15415435215",
  email: "Scott@RenewedBodyWorks.com",
  emailHref: "mailto:Scott@RenewedBodyWorks.com",
  // Google reviews only (10 on GBP). The audit counted 22 across Google +
  // both MassageBook profiles, but the badge links to Google, so the number
  // shown must match what a visitor sees there.
  rating: { value: "5.0", count: 10 },
  // Portland GBP listing (CID link) — opens the live Google reviews.
  googleReviewsUrl: "https://maps.google.com/?cid=14423628157848241120",
} as const;

export type Location = {
  key: "eugene" | "portland";
  city: string;
  slug: string; // /massage-eugene-or
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  geo: { lat: number; lng: number };
  bookingUrl: string;
  bookEvent: "book_click_eugene" | "book_click_portland";
  // Published booking hours (MassageBook). Presented as "by appointment".
  hours: { days: string; open: string; close: string; label: string }[];
  blurb: string;
};

export const locations: Location[] = [
  {
    key: "eugene",
    city: "Eugene",
    slug: "massage-eugene-or",
    streetAddress: "767 Willamette St #301",
    addressLocality: "Eugene",
    addressRegion: "OR",
    postalCode: "97401",
    geo: { lat: 44.0489, lng: -123.0942 },
    bookingUrl: "https://www.massagebook.com/business/26781443",
    bookEvent: "book_click_eugene",
    hours: [
      { days: "Mon – Fri", open: "08:00", close: "19:00", label: "8:00 AM – 7:00 PM" },
      { days: "Saturday", open: "09:00", close: "19:00", label: "9:00 AM – 7:00 PM" },
      { days: "Sunday", open: "", close: "", label: "By appointment" },
    ],
    blurb:
      "Scott's downtown Eugene studio on Willamette Street offers therapeutic and customized bodywork with full weekday availability.",
  },
  {
    key: "portland",
    city: "Portland",
    slug: "massage-portland-or",
    streetAddress: "2005 N Williams Ave #533",
    addressLocality: "Portland",
    addressRegion: "OR",
    postalCode: "97227",
    geo: { lat: 45.5370885, lng: -122.6671835 },
    bookingUrl: "https://www.massagebook.com/therapists/renewed-bodyworks-llc",
    bookEvent: "book_click_portland",
    hours: [
      { days: "Mon – Wed", open: "07:00", close: "21:00", label: "7:00 AM – 9:00 PM" },
      { days: "Thursday", open: "", close: "", label: "By appointment" },
      { days: "Sunday", open: "13:00", close: "21:00", label: "1:00 PM – 9:00 PM" },
    ],
    blurb:
      "Scott's Portland studio on N Williams Ave in the Boise neighborhood is rated 5.0 on Google and open early on weekdays.",
  },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  durations: { minutes: number; price: number }[];
  image: string;
  imageAlt: string;
  best: string; // "Best for…"
};

export const services: Service[] = [
  {
    slug: "therapeutic-massage",
    name: "Full Body Therapeutic Massage",
    short: "Advanced modalities customized to your body, from light to deep pressure.",
    description:
      "Therapeutic massage incorporates a variety of advanced modalities customized to your needs that enhance your body's natural restorative functioning. Light to deep touch is used to release tension, relax muscles, increase blood and lymph circulation, and impart a sense of calm.",
    durations: [
      { minutes: 60, price: 120 },
      { minutes: 90, price: 165 },
    ],
    image: "/images/therapeutic-male.jpg",
    imageAlt:
      "Male massage therapist working on a client's neck and shoulders during a therapeutic massage at Renewed Bodyworks",
    best: "Full-body tension relief and everyday recovery",
  },
  {
    slug: "customized-bodywork",
    name: "Customized Bodywork",
    short: "A treatment plan built around your specific issues and long-term goals.",
    description:
      "For those who want more than relaxation. If you have specific issues to work on, or want long-term body maintenance, Scott begins with an assessment and health intake and builds a plan of treatment with you. Sessions combine numerous modalities to address chronic pain, injury recovery, mobility and flexibility, or joint health.",
    durations: [
      { minutes: 60, price: 120 },
      { minutes: 90, price: 165 },
    ],
    image: "/images/studio-portland.jpg",
    imageAlt:
      "The Renewed Bodyworks Portland studio with massage table, plants, and anatomy prints",
    best: "Chronic pain, injury recovery, and mobility",
  },
  {
    slug: "swedish-massage",
    name: "Swedish Massage",
    short: "Long, flowing strokes that calm the nervous system and ease tension.",
    description:
      "Focused on relaxation and overall well-being. Long strokes, kneading, friction, tapping, and gentle stretching promote relaxation, alleviate muscle tension, and calm the nervous system, bringing you out of fight-or-flight and into a relaxed, parasympathetic state. May be paired with aromatherapy or hydrotherapy.",
    durations: [
      { minutes: 60, price: 120 },
      { minutes: 90, price: 165 },
    ],
    image: "/images/swedish-male.jpg",
    imageAlt: "Relaxed client receiving long, calming massage strokes on the neck and shoulders",
    best: "Deep relaxation and stress relief",
  },
  {
    slug: "sports-massage",
    name: "Sports Massage",
    short: "Targeted work to keep you mobile, stable, and ready to perform.",
    description:
      "A blend of deep tissue, stretching, trigger point, range of motion, and Swedish techniques to help your body feel more mobile and stable. Great after hard workouts and before or after major events. Usually more focused than full body, and always tailored to your specific needs.",
    durations: [
      { minutes: 60, price: 120 },
      { minutes: 90, price: 165 },
    ],
    image: "/images/sports-focused.jpg",
    imageAlt: "Therapist performing focused sports massage work on a client's foot and ankle",
    best: "Athletes, events, and pre/post workout",
  },
  {
    slug: "focused-session",
    name: "30-Minute Focused Session",
    short: "A short, targeted session for one problem area.",
    description:
      "A concise, focused session to address a single area of tension or discomfort. Ideal when you are short on time but need targeted relief.",
    durations: [{ minutes: 30, price: 55 }],
    image: "/images/aromatherapy-oil.jpg",
    imageAlt: "Therapist warming aromatherapy massage oil between their hands",
    best: "A quick reset for one trouble spot",
  },
  {
    slug: "chair-massage",
    name: "Chair Massage",
    short: "Seated massage for events, offices, and on the go.",
    description:
      "Seated chair massage for corporate settings, events, and retreats. A fast, clothed treatment that relieves neck, shoulder, and back tension without the need for a full session.",
    durations: [{ minutes: 30, price: 50 }],
    image: "/images/ambiance-diffuser.jpg",
    imageAlt: "Calm treatment room ambiance with a reed diffuser, candles, and rolled towel",
    best: "Offices, corporate events, and retreats",
  },
];

// Mobile / other services are quote-based (audit: prices vary).
export const mobileService = {
  name: "Mobile & Corporate Services",
  description:
    "Mobile massage, chair massage, corporate massage, and event or retreat services, tailored to your needs. Pricing varies by request.",
};

export const benefits: { title: string; body: string }[] = [
  { title: "Reduces stress", body: "Induces relaxation and eases tension throughout the body for a general sense of calm." },
  { title: "Manages pain", body: "Relieves persistent lower back pain, arthritis, and headaches by improving circulation and easing tight muscles." },
  { title: "Improves blood flow", body: "Boosts circulation so oxygen and nutrients reach muscles and organs, supporting healing and vitality." },
  { title: "Increases flexibility", body: "Stretches and relaxes tight muscles to improve range of motion and reduce the risk of injury." },
  { title: "Speeds recovery", body: "Minimizes inflammation and promotes relaxation in affected areas to accelerate healing after injury." },
  { title: "Improves sleep", body: "Lowers stress and encourages relaxation for deeper, more restorative rest." },
  { title: "Supports emotional health", body: "Calming touch helps ease feelings of anxiety and low mood for a steadier emotional state." },
  { title: "Strengthens immunity", body: "May improve immune function by lowering stress hormones and boosting lymphatic circulation." },
  { title: "Corrects posture", body: "Addresses muscle tension and imbalances to improve posture and prevent related complications." },
];

// Verbatim 5-star reviews pulled from the live Google Business Profile
// (maps.google.com/?cid=14423628157848241120), fetched 2026-08-29. Only
// reviews that name Scott — do not paraphrase, and re-verify before swapping.
export const testimonials: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "Seriously the best massage I have ever received! Scott not only hit the areas I needed relief in, but he found spots I didn't know needed attention… Highly recommend!",
    name: "Danny Holden",
    role: "Google review",
  },
  {
    quote:
      "As a physical therapist, Scott is the only LMT I will trust my patients with. He has worked wonders for over 50 of my patients and I will continue to use him as long as he is willing to grace us with the privilege of his skilled services!",
    name: "Nathan Moore",
    role: "Google review",
  },
  {
    quote:
      "Scott is incredible. Highly skilled massage therapist!! I'd recommend him to anyone looking for top notch bodywork.",
    name: "Amber Berard",
    role: "Google review",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "How much does a massage cost?",
    a: "A 60-minute session is $120 and a 90-minute session is $165 for Therapeutic, Customized Bodywork, Swedish, and Sports massage. A 30-minute focused session is $55, and a 30-minute chair massage is $50.",
  },
  {
    q: "Where are you located?",
    a: "Renewed Bodyworks has two Oregon studios: 767 Willamette St #301 in downtown Eugene, and 2005 N Williams Ave #533 in Portland.",
  },
  {
    q: "How do I book an appointment?",
    a: "Book online through the booking page for either location, or call 541-543-5215. New clients complete a short health intake so Scott can tailor the session to your goals.",
  },
  {
    q: "What happens at my first session?",
    a: "Before your appointment Scott goes over your health history and goals, and you can tell him which areas to focus on or avoid. From there he builds the session around what your body needs that day.",
  },
  {
    q: "What should I expect from a customized session?",
    a: "Scott starts with an assessment and health intake, then develops a plan with you using multiple modalities, whether the goal is chronic pain relief, injury recovery, mobility, or joint health.",
  },
];

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Why Massage", href: "/why-massage" },
  { label: "About", href: "/about" },
  { label: "Eugene", href: "/massage-eugene-or" },
  { label: "Portland", href: "/massage-portland-or" },
  { label: "Contact", href: "/contact" },
];
