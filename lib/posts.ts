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
  // Optional Q&A rendered after the body and emitted as FAQPage JSON-LD.
  faqs?: { q: string; a: string }[];
};

export const posts: Post[] = [
  {
    slug: "holiday-massage-portland-eugene",
    title: "Find a moment of calm this holiday season: massage in Portland and Eugene, OR",
    description:
      "When the holidays fill your calendar, your own well-being is usually the first thing to slide. Why a massage at Renewed Bodyworks in Portland or Eugene is worth an hour, and what one client said after a session.",
    date: "2026-10-20",
    image: "/images/ambiance-diffuser.webp",
    imageAlt: "Quiet treatment room with candles, a reed diffuser, and a rolled towel",
    readMinutes: 3,
    body: [
      {
        type: "p",
        text: "The holidays can be a joyful time. They also bring a packed calendar, travel, and a longer to-do list than usual, and taking care of yourself is often the first thing to go. A massage is an hour where nothing is asked of you except to lie down and breathe.",
      },
      { type: "h2", text: "Why massage helps when the season gets busy" },
      {
        type: "p",
        text: "Many people find massage calming and restorative. In a quiet room, with someone paying close attention to where you hold tension, your body gets a chance to slow down. [Swedish massage](/services#swedish-massage) in particular uses long, flowing strokes meant to calm the nervous system, and Scott can keep the whole session gentle if relaxation is all you want.",
      },
      {
        type: "p",
        text: "Booking the appointment helps too. It puts an hour on your calendar that belongs to you, in a month when most of your hours belong to someone else.",
      },
      { type: "h2", text: "Why safe, caring touch matters" },
      {
        type: "p",
        text: "Well-being takes more than getting through your list. Safe, respectful, consensual touch can bring comfort and a real sense of being cared for, and it's easy to go without it for a long time. When life feels rushed and people feel far away, that kind of touch helps you feel present in your body again.",
      },
      {
        type: "p",
        text: "You stay in charge of the session at Renewed Bodyworks. Tell Scott how much pressure you like and which areas to leave alone, and speak up anytime if you want something changed.",
      },
      { type: "h2", text: "What one client said" },
      {
        type: "p",
        text: "\"Hey Scott! I just wanted to send a quick text to say thank you, thank you, thank you for the massage. I can't explain it, but when I left your office, I just felt so much lighter and like I was carrying less burden than I was when I walked in. Your touch is genuinely magic, so healing and restorative. Your place and presence really felt safe which allowed me to really just let go and be, something I can't do on a daily basis with all the stresses. I even slept all night long, woke up feeling rested that hasn't happened in a long time. Thank you so much for your amazing work. I'm so grateful and can't wait till next visit.\"",
      },
      { type: "p", text: "Stacy M., Renewed Bodyworks client" },
      { type: "h2", text: "Fitting a massage into the holidays" },
      {
        type: "ul",
        items: [
          "Short on time? A [30-minute focused session](/services#focused-session) ($55) works on one problem area, like the neck and shoulders after a long drive.",
          "Want to fully unwind? A 60- or 90-minute [full body therapeutic massage](/services#therapeutic-massage) gives you more time to settle in.",
          "Traveling between cities? Scott is in Portland Sunday through Wednesday and in Eugene Thursday through Saturday, so you can book wherever you'll be.",
          "Need a time outside the listed hours? Text 541-543-5215 and ask.",
        ],
      },
      { type: "h2", text: "Book a massage in Portland or Eugene" },
      {
        type: "p",
        text: "Renewed Bodyworks has studios at [2005 N Williams Ave #533 in North Portland](/massage-portland-or) and [767 Willamette St #301 in downtown Eugene](/massage-eugene-or). If you want an hour of quiet before the season picks up, [book online](/book) at either studio and put yourself on the list this year.",
      },
    ],
    faqs: [
      {
        q: "Can massage help with holiday stress?",
        a: "Many people find massage calming and use it as a regular break during busy stretches like the holidays. A Swedish or full body therapeutic massage at Renewed Bodyworks focuses on relaxation and easing everyday tension. Massage is not a substitute for medical or mental health care.",
      },
      {
        q: "What massage should I book if I'm short on time?",
        a: "A 30-minute focused session ($55) works on one area of tension, such as the neck and shoulders. For full-body relaxation, book 60 minutes ($120) or 90 minutes ($165).",
      },
      {
        q: "Where can I get a massage in Portland or Eugene during the holidays?",
        a: "Renewed Bodyworks is at 2005 N Williams Ave #533 in Portland (Sunday to Wednesday) and 767 Willamette St #301 in downtown Eugene (Thursday to Saturday). Book online at renewedbodyworks.com/book or text 541-543-5215 for times outside the listed hours.",
      },
    ],
  },
  {
    slug: "assisted-stretching-portland-eugene",
    title: "Assisted stretching in Portland and Eugene, OR: move more freely with Renewed Bodyworks",
    description:
      "Assisted stretching in Portland and Eugene, OR with licensed massage therapist Scott Hartzell. What it is, who it helps, what a session feels like, and how it pairs with massage.",
    date: "2026-10-07",
    image: "/images/therapeutic-male.webp",
    imageAlt: "Massage therapist easing tension from a client's neck and shoulder before assisted stretching",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "Assisted stretching is a hands-on technique where a trained practitioner guides your body through gentle, controlled stretches while you relax. At Renewed Bodyworks, Scott Hartzell, a licensed massage therapist (Oregon LMT #28785), offers assisted stretching at his studios in [downtown Eugene](/massage-eugene-or) and [North Portland](/massage-portland-or) to help ease tension, improve mobility, and support relaxation.",
      },
      {
        type: "p",
        text: "Feeling your best starts with comfortable, unrestricted movement. Unlike stretching on your own, where you hold the position and do the work, assisted stretching lets Scott support and guide each movement so your muscles can let go.",
      },
      { type: "h2", text: "What is assisted stretching?" },
      {
        type: "p",
        text: "During an assisted stretching session, Scott uses gentle movements and stretches to work on areas of tightness and limited mobility. Depending on your needs, your session may include:",
      },
      {
        type: "ul",
        items: [
          "Gentle range-of-motion movements",
          "Static and dynamic stretching",
          "Light resistance, where you gently press against Scott's hand before easing into the stretch",
          "Joint mobility techniques",
          "Targeted stretching for the hips, shoulders, legs, neck, and back",
        ],
      },
      {
        type: "p",
        text: "Assisted stretching is usually built into a massage session, or it can be the focus of its own session.",
      },
      { type: "h2", text: "Assisted stretching vs. stretching on your own" },
      {
        type: "ul",
        items: [
          "You relax instead of working. When you stretch alone, the muscles holding the position stay engaged. With assisted stretching, Scott holds the position so the target muscle can release.",
          "Better positioning. It is hard to stretch your own hips, hamstrings, or upper back at the right angle. A practitioner can place the stretch exactly where you need it.",
          "Feedback in real time. Scott watches how your body responds and adjusts the depth, angle, and pace as you go.",
          "Safer progress. Stretches stay gentle and productive, never forced, so you are not guessing how far to push.",
        ],
      },
      { type: "h2", text: "Benefits of assisted stretching" },
      { type: "p", text: "Assisted stretching may help you:" },
      {
        type: "ul",
        items: [
          "Improve flexibility",
          "Increase range of motion",
          "Reduce everyday muscle tension",
          "Relieve feelings of stiffness",
          "Support better posture and movement",
          "Enhance relaxation",
          "Improve body awareness",
        ],
      },
      {
        type: "p",
        text: "Whether you spend long hours at a desk, stay active, or simply want to move more comfortably, assisted stretching can be a valuable part of your wellness routine.",
      },
      { type: "h2", text: "Who can benefit from assisted stretching?" },
      { type: "p", text: "Assisted stretching may be a good option for:" },
      {
        type: "ul",
        items: [
          "Desk workers and anyone who sits for long hours, including Portland and Eugene remote workers and students",
          "Active people and athletes: runners, cyclists, hikers, climbers, and gym regulars",
          "People who feel generally stiff, especially in the hips, lower back, neck, and shoulders",
          "Anyone who wants to improve mobility",
          "People returning to movement after a period of inactivity",
          "Clients who prefer guided stretching over stretching alone",
        ],
      },
      {
        type: "p",
        text: "Every session is adjusted to your comfort level and personal goals. If you are training for something, Scott's post on [sports massage in Portland and Eugene](/blog/sports-massage-portland-eugene) covers how stretching fits into a recovery routine.",
      },
      { type: "h2", text: "What to expect during a session" },
      {
        type: "p",
        text: "Your session begins with a conversation about your goals, activity level, and any areas of discomfort. Scott then builds a comfortable approach around your individual needs rather than running a set routine.",
      },
      {
        type: "p",
        text: "Throughout the session you are encouraged to breathe naturally and to say how each movement feels. A stretch should feel gentle and productive, never painful or forced. Your comfort and safety always come first.",
      },
      { type: "h2", text: "Assisted stretching and massage therapy" },
      {
        type: "p",
        text: "Massage therapy and assisted stretching complement each other well. Massage addresses soft-tissue tension, while assisted stretching focuses on mobility and movement. Warming the muscles with massage first often lets them lengthen more easily during the stretch.",
      },
      {
        type: "p",
        text: "Combining the two may help you feel more relaxed, less restricted, and more connected to your body. Scott regularly blends stretching into [customized bodywork](/services#customized-bodywork), [sports massage](/services#sports-massage), and [full body therapeutic massage](/services#therapeutic-massage). If you are not sure which style fits you, see [deep tissue vs. Swedish massage](/blog/deep-tissue-vs-swedish-massage).",
      },
      { type: "h2", text: "Assisted stretching in Eugene and Portland" },
      {
        type: "p",
        text: "Renewed Bodyworks has two Oregon studios, and assisted stretching is available at both:",
      },
      {
        type: "ul",
        items: [
          "[Eugene](/massage-eugene-or): 767 Willamette St #301, downtown Eugene. Thursday to Saturday, with other times available by text.",
          "[Portland](/massage-portland-or): 2005 N Williams Ave #533, in North Portland's Boise neighborhood. Sunday to Wednesday, with other times available by text.",
        ],
      },
      {
        type: "p",
        text: "Sessions run 30, 60, or 90 minutes. Just mention assisted stretching when you book or at the start of your session and Scott will work it in.",
      },
      { type: "h2", text: "Your comfort comes first" },
      {
        type: "p",
        text: "Before your session, please share any injuries, surgeries, chronic conditions, pregnancy, or other health concerns. Assisted stretching should never cause sharp pain, numbness, tingling, or dizziness.",
      },
      {
        type: "p",
        text: "If you have a recent injury, severe pain, joint instability, osteoporosis, or a recent surgery, consult your healthcare provider before scheduling a session. Assisted stretching is not a substitute for medical diagnosis or treatment.",
      },
      { type: "h2", text: "Feel more mobile. Feel renewed." },
      {
        type: "p",
        text: "Assisted stretching is more than lengthening muscles. It is a chance to slow down, release tension, and reconnect with how your body moves. If you are ready to feel more flexible, relaxed, and supported, [book an assisted stretching or massage session](/book) at the Eugene or Portland studio.",
      },
    ],
    faqs: [
      {
        q: "What is assisted stretching?",
        a: "Assisted stretching is a hands-on technique where a trained practitioner guides your body through gentle, controlled stretches while you relax. At Renewed Bodyworks in Eugene and Portland, Oregon, licensed massage therapist Scott Hartzell uses range-of-motion work, static and dynamic stretches, light resistance, and joint mobility techniques for the hips, shoulders, legs, neck, and back.",
      },
      {
        q: "Does assisted stretching hurt?",
        a: "No. A stretch should feel gentle and productive, never painful or forced. You are encouraged to breathe naturally and tell Scott how each movement feels so he can adjust. Stop and speak up if you feel sharp pain, numbness, tingling, or dizziness.",
      },
      {
        q: "Can I combine assisted stretching with a massage?",
        a: "Yes. Assisted stretching is usually included with massage therapy at Renewed Bodyworks. Massage addresses soft-tissue tension and stretching focuses on mobility, so the two work well together in a 60- or 90-minute session.",
      },
      {
        q: "Where can I get assisted stretching in Portland or Eugene?",
        a: "Renewed Bodyworks offers assisted stretching at 2005 N Williams Ave #533 in Portland and 767 Willamette St #301 in downtown Eugene. Book online at renewedbodyworks.com/book or text 541-543-5215.",
      },
      {
        q: "Who should not get assisted stretching?",
        a: "If you have a recent injury, severe pain, joint instability, osteoporosis, or a recent surgery, check with your healthcare provider first. Always tell your therapist about injuries, chronic conditions, or pregnancy before the session.",
      },
    ],
  },
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
