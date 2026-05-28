export type Project = {
  slug: string;
  name: string;
  role: string;
  year: string;
  description: string;
  story: string;
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
  image: string;
  overview: string;
  roleDetails: string;
  process: string[];
  outcomes: string[];
};

export const profile = {
  name: "Esther Bawo Tsotso",
  shortName: "Esther Tsotso",
  initials: "ET",
  label: "Frontend Focused Software Engineer",
  email: "estherbawotsotso@gmail.com",
  contactEmail: "estheticallybawo@gmail.com",
  phone: "+234 806 136 5611",
  location: "Nigeria",
  image: "/assets/frontend.jpg",
  cvUrl:
    "https://docs.google.com/document/d/1oCvEVTNmlrDe_qive0rKeHDxfBHK72btmxe3XOkBT8g/edit?usp=sharing",
  certificationsUrl: "https://www.esthertsotso.cv",
  links: {
    github: "https://github.com/estheticallybawo",
    linkedin: "https://linkedin.com/in/estheticallybawo",
    instagram: "https://instagram.com/bawocore",
  },
};

export const tools = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Vue.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
];

export const craftCards = [
  {
    title: "Problem Framing",
    detail: "User empathy, research, clarity",
    copy:
      "I start by understanding the real user pain, the product goal, and the simplest path to a useful solution.",
  },
  {
    title: "Frontend Engineering",
    detail: "React, TypeScript, Tailwind CSS",
    copy:
      "I build responsive, accessible interfaces that hold up across states, devices, browsers, and real user flows.",
  },
  {
    title: "Problem Solving",
    detail: "Systems thinking, edge cases",
    copy:
      "I break complex requirements into product decisions, UI states, technical tradeoffs, and testable steps.",
  },
  {
    title: "Product Thinking",
    detail: "Trust, conversion, retention",
    copy:
      "I connect engineering choices to business outcomes, user confidence, and the moments where products earn trust.",
  },
];

export const projects: Project[] = [
  {
    slug: "loft-craft",
    name: "Loft Craft",
    role: "E-commerce platform",
    year: "2025",
    description:
      "A Next.js furniture store with Paystack payments, cart state, callbacks, and order confirmation flows.",
    story:
      "A product-flow problem: help shoppers move from discovery to checkout with fewer doubts and reliable payment feedback.",
    tech: ["Next.js", "TypeScript", "Zustand", "Paystack"],
    liveUrl: "https://capstone-seven-tau.vercel.app/",
    codeUrl: "https://github.com/estheticallybawo/loft-craft-store",
    image:
      "https://hellocv.s3.amazonaws.com/assets/resumes/v93fp6CT6nxnklAF8VzDfcVomuq6tD3UklBjyKQn.png",
    overview:
      "Loft Craft is an e-commerce experience built around the full shopping path: browsing furniture, managing a cart, paying securely, and confirming the order state without leaving users unsure about what happened.",
    roleDetails:
      "I built the frontend flow, cart behavior, payment callback handling, and responsive interface patterns that make the purchase journey feel clear across devices.",
    process: [
      "Mapped the shopping journey from product discovery to order confirmation.",
      "Used Zustand for predictable cart state and Paystack for payment flow integration.",
      "Built responsive UI states for loading, payment feedback, and confirmation moments.",
    ],
    outcomes: [
      "A complete checkout flow with fewer dead ends.",
      "Clearer payment feedback for users after transactions.",
      "A stronger example of product thinking inside a frontend build.",
    ],
  },
  {
    slug: "ticket-generator",
    name: "Ticket Generator",
    role: "Figma-to-app experience",
    year: "2025",
    description:
      "A multi-step ticketing interface for Techember Fest with form progression and precise UI translation.",
    story:
      "A flow-state problem: guide users through ticket selection, validation, and confirmation without making the process feel heavy.",
    tech: ["React", "Forms", "Responsive UI"],
    liveUrl: "https://ticket-generator-sepia.vercel.app",
    codeUrl: "https://github.com/estheticallybawo/Ticket-Generator",
    image:
      "https://hellocv.s3.amazonaws.com/assets/resumes/ziBV7xuXZYvx4aL9JwyEM6s1XzJcASW8vbaKBecj.png",
    overview:
      "Ticket Generator turns a festival ticketing design into a working multi-step flow where users can select a ticket, complete their details, and reach confirmation without friction.",
    roleDetails:
      "I translated the Figma direction into a responsive React experience and focused on progression, validation, and interface clarity.",
    process: [
      "Broke the ticketing task into clear steps with simple state transitions.",
      "Matched the visual direction while keeping form behavior usable on smaller screens.",
      "Handled form and confirmation states so users always know where they are.",
    ],
    outcomes: [
      "A polished Figma-to-code implementation.",
      "A smoother ticket selection and confirmation flow.",
      "A useful proof point for detail-oriented frontend delivery.",
    ],
  },
  {
    slug: "markdown-previewer",
    name: "Markdown Previewer",
    role: "Real-time editor",
    year: "2025",
    description:
      "A Vue 3 markdown workspace for live editing and rendering with responsive document-preview behavior.",
    story:
      "A tooling problem: make writing and previewing feel immediate, predictable, and calm for people working with structured text.",
    tech: ["Vue 3", "Markdown", "State"],
    liveUrl: "https://markdown-preview-vue-nu.vercel.app/",
    codeUrl: "https://github.com/estheticallybawo/Markdown-Preview",
    image:
      "https://hellocv.s3.amazonaws.com/assets/resumes/IMTxsqWYvjmckGNoJnqfXVIFmxNhfGwTS0c6TzzG.png",
    overview:
      "Markdown Previewer is a live writing workspace that helps users edit structured text and immediately see the rendered output.",
    roleDetails:
      "I built the Vue interface, editing experience, and preview behavior with attention to predictable state and calm document-focused layout.",
    process: [
      "Separated editing and preview concerns so the workspace stays easy to reason about.",
      "Focused on real-time feedback as the core interaction.",
      "Kept the interface responsive so writing and previewing remains usable on different screen sizes.",
    ],
    outcomes: [
      "Immediate markdown feedback for users.",
      "A lightweight productivity tool with simple interaction rules.",
      "A project that demonstrates state and rendering fundamentals.",
    ],
  },
  {
    slug: "echo-landing",
    name: "Echo Landing",
    role: "AI product landing page",
    year: "2026",
    description:
      "A polished TypeScript landing page for Echo, built to communicate product value with clarity and momentum.",
    story:
      "A communication problem: turn an urgent social-good idea into a clear product story people can understand quickly.",
    tech: ["TypeScript", "Landing Page", "Product Story"],
    liveUrl: "https://www.echoxgemma.live",
    codeUrl: "https://github.com/estheticallybawo/echo-landing",
    image: "/assets/echo-tag.png",
    overview:
      "Echo Landing presents the story behind Echo, an AI-powered emergency response product, and turns a sensitive social-good idea into a clear product narrative.",
    roleDetails:
      "I built the TypeScript landing page and shaped the communication around urgency, trust, and product value so visitors can understand the idea quickly.",
    process: [
      "Clarified the core product promise before building the landing page sections.",
      "Structured the page around the problem, how Echo works, roadmap, team, and trust signals.",
      "Used strong responsive typography and spacing to keep the message readable.",
    ],
    outcomes: [
      "A clearer public-facing story for Echo.",
      "A landing page that supports a long-term product initiative beyond the hackathon.",
      "A stronger example of engineering with product empathy.",
    ],
  },
  {
    slug: "remfi",
    name: "RemFi",
    role: "Webflow landing page",
    year: "2025",
    description:
      "A conversion-focused landing page for a financial reminder app that helps people plan expenses intentionally.",
    story:
      "A trust problem: explain a finance product simply enough that users understand the value before they ever sign up.",
    tech: ["Webflow", "UX Copy", "Landing Page"],
    liveUrl: "https://remfi-app.webflow.io/",
    image:
      "https://hellocv.s3.amazonaws.com/assets/resumes/1uK9BPhSUiV8Rjpy8JITG1nfM7slUf9OoQHI2Egb.png",
    overview:
      "RemFi is a landing page for a financial reminder app, designed to explain how the product helps people plan expenses and avoid missed payments.",
    roleDetails:
      "I worked on the Webflow landing page, focusing on simple product messaging, conversion flow, and trust-building sections.",
    process: [
      "Framed the product around intentional planning rather than generic finance copy.",
      "Organized the landing page to introduce the problem, value, and call to action quickly.",
      "Balanced clear copy with a layout that feels approachable for finance users.",
    ],
    outcomes: [
      "A more understandable entry point for the product.",
      "Clearer trust and value communication.",
      "A practical example of product messaging in a frontend-adjacent workflow.",
    ],
  },
  {
    slug: "veritrade",
    name: "Veritrade",
    role: "Mobile MVP",
    year: "2025",
    description:
      "A business verification and risk-intelligence mobile MVP with AI-powered checks and practical trust signals.",
    story:
      "A risk problem: help people make safer business decisions by surfacing verification signals in a mobile-first experience.",
    tech: ["Mobile", "AI", "Risk Intelligence"],
    codeUrl: "https://github.com/estheticallybawo/veritrade-app",
    image:
      "https://hellocv.s3.amazonaws.com/assets/resumes/zXBXN7t9avDkkrODQXhyqfLcHY4mfk8nL8lJCRs5.png",
    overview:
      "Veritrade is a mobile MVP for business verification and risk intelligence, helping users make safer business decisions through practical trust signals.",
    roleDetails:
      "I contributed to the mobile-first product experience, shaping flows that make verification signals understandable rather than overwhelming.",
    process: [
      "Started from the user risk: uncertainty before trusting a business.",
      "Organized verification and intelligence signals into a mobile-first flow.",
      "Used practical UI states to help users interpret results and next steps.",
    ],
    outcomes: [
      "A clearer mobile MVP direction for trust and verification.",
      "A product example centered on risk reduction and user confidence.",
      "A stronger story around problem-solving beyond visual interface work.",
    ],
  },
];

export const resumeHighlights = [
  {
    type: "Hackathon",
    title: "Echo App",
    org: "Exploration",
    period: "May 2026 - Present",
    copy:
      "Post Gemma 4 Good Hackathon exploration into what SafetyTech could look like in the age of AI and Edge computing.",
  },
  {
    type: "Volunteer",
    title: "Open Source Engineer",
    org: "ADEN-HIVE (YC Backed)",
    period: "Mar 2026 - Present",
    copy:
      "Reviews pull requests and contributes JavaScript improvements to Hive open-source projects.",
  },
  {
    type: "Capstone",
    title: "Mobile Development",
    org: "WTFellowship",
    period: "Aug 2025 - Aug 2026",
    copy:
      "Selected for a 52-week fellowship focused on Flutter, React Native, Firebase, APIs, and mobile MVP delivery.",
  },
  {
    type: "Internship",
    title: "AI/ML Intern",
    org: "UNICCON",
    period: "Jul 2025 - Oct 2025",
    copy:
      "Built interface features and API-connected flows for a text-to-speech product powered by ML and NLP.",
  },
  {
    type: "Internship",
    title: "Frontend Engineering Intern",
    org: "HNG Tech",
    period: "Dec 2024 - Apr 2025",
    copy:
      "Shipped responsive web interfaces with HTML, CSS, JavaScript, React, Next.js, and TypeScript in a remote team.",
  },
];

export const education = [
  {
    title: "Software Engineering",
    org: "Miva Open University",
    period: "2023 - Present",
    meta: "Bachelor of Science",
  },
  {
    title: "Frontend Engineering",
    org: "AltSchool Africa",
    period: "2025 - 2026",
    meta: "Diploma",
  },
];

export const credentials = [
  "BestLearner Award - AltSchool Africa Frontend Engineering",
];
