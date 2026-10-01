// ---------------------------------------------------------------------------
// Blog posts. Same idea as lib/business.ts: content lives here as typed data,
// and /blog, /blog/[slug], the sitemap, and the Article JSON-LD all read it.
// To publish a post, add an object to `posts`. Newest first is handled by
// `allPosts()`, so order in this file does not matter.
//
// Paragraph and list text supports one inline form: [label](/path) links.
// ---------------------------------------------------------------------------

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  // Meta description + card excerpt.
  description: string;
  // ISO dates (YYYY-MM-DD).
  date: string;
  updated?: string;
  image: string;
  imageAlt: string;
  readMinutes: number;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "sports-massage-portland-eugene",
    title: "Sports massage in Portland and Eugene, OR: move better with Renewed Bodyworks",
    description:
      "Sports massage for runners, cyclists, hikers, and gym regulars in Portland and Eugene. What it is, how it supports recovery, when to book it, and what a session with Scott looks like.",
    date: "2026-09-30",
    image: "/images/sports-knee-massage.webp",
    imageAlt: "Therapist performing focused sports massage work on a client's knee",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Whether you run the trails in Forest Park, cycle along the Willamette, hike Spencer Butte, or train at a local gym, an active life asks a lot of your muscles. At Renewed Bodyworks, Scott provides personalized [sports massage](/services#sports-massage) for active people in the Portland and Eugene areas, helping you move more comfortably and recover between the things you love doing.",
      },
      { type: "h2", text: "What is sports massage?" },
      {
        type: "p",
        text: "Sports massage is a focused form of massage therapy for people who exercise, play sports, work physically demanding jobs, or deal with recurring muscle tension. You do not need to be a competitive athlete to benefit from it. Every session is tailored to your body, your activities, and your goals.",
      },
      { type: "p", text: "Depending on what your body needs, Scott may bring in:" },
      {
        type: "ul",
        items: [
          "Targeted deep tissue work",
          "Trigger point therapy",
          "Myofascial release",
          "Assisted stretching",
          "Compression",
          "Range-of-motion techniques",
        ],
      },
      { type: "h2", text: "How sports massage helps" },
      { type: "p", text: "Sports massage may help support:" },
      {
        type: "ul",
        items: [
          "Muscle recovery after workouts or events",
          "Relief from exercise-related tension",
          "Flexibility and mobility",
          "Body awareness",
          "Relaxation after strenuous activity",
          "Ongoing wellness for active people",
        ],
      },
      {
        type: "p",
        text: "Scott pays close attention to the areas physical activity tends to load up: calves, hamstrings, hips, glutes, shoulders, neck, and lower back.",
      },
      { type: "h2", text: "Built for how Portland and Eugene stay active" },
      {
        type: "p",
        text: "Both cities give you endless ways to move, and each one leaves its own kind of tightness behind.",
      },
      { type: "p", text: "In Portland, that might look like:" },
      {
        type: "ul",
        items: [
          "Running in Forest Park or along the Eastbank Esplanade",
          "Cycling through the city and the surrounding countryside",
          "Hiking the Columbia River Gorge",
          "Training for a local race",
          "Strength training, yoga, and fitness classes",
          "Rec-league soccer, basketball, and pickup games",
        ],
      },
      { type: "p", text: "In Eugene, it might be:" },
      {
        type: "ul",
        items: [
          "Running the riverbank paths along the Willamette",
          "Hiking Spencer Butte or Mount Pisgah",
          "Cycling through Eugene and Springfield",
          "Yoga, Pilates, and strength training",
          "University and community rec sports",
          "Getting outside anywhere in the southern Willamette Valley",
        ],
      },
      {
        type: "p",
        text: "Whether you are preparing for an event in Portland, recovering from a hike near Eugene, or managing tension from regular workouts, Scott customizes the session to fit your lifestyle.",
      },
      { type: "h2", text: "When should you schedule a sports massage?" },
      {
        type: "ul",
        items: [
          "Before an event: a lighter session can help prepare your body for movement.",
          "After an event: gentle, recovery-focused work can help you unwind after strenuous activity.",
          "Between workouts: the best time for focused work on persistent tightness.",
        ],
      },
      {
        type: "p",
        text: "If you are new to sports massage, avoid scheduling intense work right before an important race, competition, or demanding workout. Give your body a few days to adapt.",
      },
      { type: "h2", text: "What to expect at Renewed Bodyworks" },
      {
        type: "p",
        text: "Your session begins with a conversation about your activities, goals, and areas of concern. Scott uses that to build the hour around you rather than a set routine.",
      },
      {
        type: "p",
        text: "You are encouraged to speak up throughout, so pressure and techniques can be adjusted to your comfort. Sports massage may involve focused pressure, but it should never feel sharp or unbearable.",
      },
      { type: "h2", text: "Book sports massage in Portland or Eugene" },
      {
        type: "p",
        text: "Your body works hard to support the activities you enjoy. Whether you are a runner, cyclist, hiker, lifter, or simply dealing with muscle tension, sports massage can be a valuable part of your routine. Renewed Bodyworks has studios in [downtown Eugene](/massage-eugene-or) and [Portland](/massage-portland-or), and you can [book online](/book) at either one.",
      },
      {
        type: "p",
        text: "Sports massage is not a substitute for medical diagnosis or treatment. Consult a qualified healthcare professional for significant, persistent, or worsening pain.",
      },
    ],
  },
  {
    slug: "deep-tissue-vs-swedish-massage",
    title: "Deep tissue vs. Swedish massage: which one do you need?",
    description:
      "Deep tissue and Swedish massage feel different and do different jobs. Here is how to tell which one fits your body right now, and why most sessions end up using both.",
    date: "2026-09-21",
    image: "/images/trigger-point-massage.webp",
    imageAlt: "Therapist applying focused pressure to a client's upper back during a massage session",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "It is the most common question new clients ask before a first session: should I book deep tissue or Swedish? The honest answer is that the name on the booking matters less than what your body needs on the day. But the two styles really are different, and knowing the difference helps you walk in with the right expectations.",
      },
      { type: "h2", text: "What Swedish massage does" },
      {
        type: "p",
        text: "Swedish massage is built around long, flowing strokes, kneading, friction, tapping, and gentle stretching. The pressure runs from light to medium. The goal is to ease general muscle tension and calm the nervous system, bringing you out of fight-or-flight and into a relaxed, parasympathetic state.",
      },
      {
        type: "p",
        text: "That is why Swedish is the style people picture when they think of a relaxing massage. It can be paired with aromatherapy or hydrotherapy, and it works well as a regular reset when stress, poor sleep, or long days at a desk are the main complaint.",
      },
      { type: "h2", text: "What deep tissue does" },
      {
        type: "p",
        text: "Deep tissue work is slower and more specific. Instead of covering the whole body evenly, the therapist spends time on the areas that are actually causing trouble, working through the muscle layers with sustained pressure and techniques like trigger point release and assisted stretching.",
      },
      {
        type: "p",
        text: "It is a better fit when there is a particular problem to solve: a shoulder that will not settle down, a lower back that tightens every afternoon, hips that limit your stride. Deep does not have to mean painful. Good deep tissue work stays inside what your body can accept, because a muscle that is bracing against pressure is not releasing.",
      },
      { type: "h2", text: "How to tell which one you need" },
      {
        type: "ul",
        items: [
          "Choose Swedish if your main goal is to relax, sleep better, or come down from a stressful stretch, and nothing in particular hurts.",
          "Choose deep tissue or [customized bodywork](/services) if you can point to the spot, the problem keeps coming back, or it is limiting how you move.",
          "Choose [sports massage](/services) if you train hard, have an event coming up, or are recovering from one.",
          "Short on time with one trouble area? A 30-minute focused session is made for exactly that.",
        ],
      },
      { type: "h2", text: "Why most sessions blend both" },
      {
        type: "p",
        text: "In practice the line between the two is soft. A session at Renewed Bodyworks usually opens with lighter, Swedish-style work to warm the tissue and let your nervous system settle, then moves into deeper, more specific work where you need it, and finishes light again. Scott draws on deep tissue, trigger point, Swedish, sports massage, and assisted stretching in the same hour, and adjusts pressure as he goes.",
      },
      {
        type: "p",
        text: "So you do not have to get the choice exactly right when you book. Tell Scott what is bothering you and what you want to feel like when you leave, and the session gets built around that.",
      },
      { type: "h2", text: "What to say at your first appointment" },
      {
        type: "ul",
        items: [
          "Where it hurts or feels restricted, and when you notice it most.",
          "Any injuries, surgeries, or medical conditions, even old ones.",
          "How much pressure you like, and that it is fine to change your mind mid-session.",
          "What you want out of the hour: relief in one area, full-body relaxation, or both.",
        ],
      },
      {
        type: "p",
        text: "New clients start with a short intake so every session fits. Renewed Bodyworks has studios in [downtown Eugene](/massage-eugene-or) and [Portland](/massage-portland-or), and you can [book online](/book) at either one.",
      },
    ],
  },
];

export function allPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

// "September 21, 2026". Parsed as UTC so the date never shifts by time zone.
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
