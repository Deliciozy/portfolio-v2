export type AboutCapability = {
  icon:
    | "captain"
    | "guardian"
    | "explorer";

  title: string;
  subtitle: string;
  description: string;
};

export type Interest = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const aboutHero = {
  title:
    "What Set Me Apart",

  subtitle:
    "Achievement through resilience",

  paragraphs: [
    "I move through challenges the way iron cuts through stone — steady, unyielding, leaving a mark with every step.",

    "For me, achievement isn’t a single moment of victory, but the discipline of never wasting a season, never letting effort scatter. I’ve filled every gap with growth — learning, building, shipping — so that time itself becomes proof of my persistence. And I believe that with enough pressure and repetition, they shape into outcomes that last",
  ],

  image:
    "/images/framer-original/about/image-01.png",

  imageAlt:
    "Mary Chen at the GIX Steve Ballmer Building",
};

export const aboutCapabilities:
  AboutCapability[] = [
  {
    icon: "captain",

    title: "Captain",

    subtitle:
      "Turning separated groups into stronger teams.",

    description:
      "I naturally step up when a team needs direction. Taking ownership beyond my role, I align peers, raise the bar for quality, and keep progress moving forward. At the same time, my system-oriented mindset allows me to design structures that make collaboration smoother and drive the whole team toward shared goals.",
  },

  {
    icon: "guardian",

    title: "Guardian",

    subtitle:
      "Raising the bar through responsibility and detail.",

    description:
      "I'm known for taking full responsibility and holding myself to high standards. I catch the small details others miss, ensuring quality in every delivery. With a structured mindset, I break down complex flows into clear, actionable steps. Even the smallest interactions are opportunities to elevate both the product and the team's work.",
  },

  {
    icon: "explorer",

    title: "Explorer",

    subtitle:
      "Openness as a path to stronger design.",

    description:
      "I embrace every opportunity to learn, treating both praise and critique as fuel for growth. Curiosity drives me to understand how others think, and I actively seek perspectives that can expand or challenge my own. For me, growth is not just personal — it’s about creating a culture where learning lifts the whole team.",
  },
];

export const interests:
  Interest[] = [
  {
    title:
      "Photography",

    description:
      "Back in college, I had my very first video camera, which I fondly named Ruby. She wasn’t just a gadget to me—I saw her as a companion. Wherever I went, Ruby came along, and together we discovered, recorded, and shared the beauty of the world around us.",

    image:
      "/images/framer-original/about/image-02.png",

    alt:
      "Photography interest",
  },

  {
    title:
      "Crochet",

    description:
      "I enjoy crocheting because I love the simple joy of patiently pulling loops through one another and, little by little, ending up with something whole and meaningful. Whenever I crochet, I feel a bit like a craftsperson, gently telling my own story through the twists and turns of the yarn.",

    image:
      "/images/framer-original/about/image-03.png",

    alt:
      "Crochet interest",
  },

  {
    title:
      "Reading",

    description:
      "To me, books are like close friends—they give me comfort and sometimes inspire me. Every time I open a book, it feels like stepping into another world. I get to live inside the stories, see life through the author’s eyes, as if we’re exploring the world together.",

    image:
      "/images/framer-original/about/image-04.png",

    alt:
      "Reading interest",
  },
];