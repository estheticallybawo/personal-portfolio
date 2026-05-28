export type Project = {
  name: string;
  role: string;
  description: string;
  story: string;
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
  image: string;
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
    name: "Loft Craft",
    role: "E-commerce platform",
    description:
      "A Next.js furniture store with Paystack payments, cart state, callbacks, and order confirmation flows.",
    story:
      "A product-flow problem: help shoppers move from discovery to checkout with fewer doubts and reliable payment feedback.",
    tech: ["Next.js", "TypeScript", "Zustand", "Paystack"],
    liveUrl: "https://capstone-seven-tau.vercel.app/",
    codeUrl: "https://github.com/estheticallybawo/loft-craft-store",
    image:
      "https://hellocv.s3.amazonaws.com/assets/resumes/v93fp6CT6nxnklAF8VzDfcVomuq6tD3UklBjyKQn.png",
  },
  {
    name: "Ticket Generator",
    role: "Figma-to-app experience",
    description:
      "A multi-step ticketing interface for Techember Fest with form progression and precise UI translation.",
    story:
      "A flow-state problem: guide users through ticket selection, validation, and confirmation without making the process feel heavy.",
    tech: ["React", "Forms", "Responsive UI"],
    liveUrl: "https://ticket-generator-sepia.vercel.app",
    codeUrl: "https://github.com/estheticallybawo/Ticket-Generator",
    image:
      "https://hellocv.s3.amazonaws.com/assets/resumes/ziBV7xuXZYvx4aL9JwyEM6s1XzJcASW8vbaKBecj.png",
  },
  {
    name: "Markdown Previewer",
    role: "Real-time editor",
    description:
      "A Vue 3 markdown workspace for live editing and rendering with responsive document-preview behavior.",
    story:
      "A tooling problem: make writing and previewing feel immediate, predictable, and calm for people working with structured text.",
    tech: ["Vue 3", "Markdown", "State"],
    liveUrl: "https://markdown-preview-vue-nu.vercel.app/",
    codeUrl: "https://github.com/estheticallybawo/Markdown-Preview",
    image:
      "https://hellocv.s3.amazonaws.com/assets/resumes/IMTxsqWYvjmckGNoJnqfXVIFmxNhfGwTS0c6TzzG.png",
  },
  {
    name: "Echo Landing",
    role: "AI product landing page",
    description:
      "A polished TypeScript landing page for Echo, built to communicate product value with clarity and momentum.",
    story:
      "A communication problem: turn an urgent social-good idea into a clear product story people can understand quickly.",
    tech: ["TypeScript", "Landing Page", "Product Story"],
    liveUrl: "https://echoxgemma.live",
    codeUrl: "https://github.com/estheticallybawo/echo-landing",
    image: "/assets/echo-tag.png",
  },
  {
    name: "RemFi",
    role: "Webflow landing page",
    description:
      "A conversion-focused landing page for a financial reminder app that helps people plan expenses intentionally.",
    story:
      "A trust problem: explain a finance product simply enough that users understand the value before they ever sign up.",
    tech: ["Webflow", "UX Copy", "Landing Page"],
    liveUrl: "https://remfi-app.webflow.io/",
    image:
      "https://hellocv.s3.amazonaws.com/assets/resumes/1uK9BPhSUiV8Rjpy8JITG1nfM7slUf9OoQHI2Egb.png",
  },
  {
    name: "Veritrade",
    role: "Mobile MVP",
    description:
      "A business verification and risk-intelligence mobile MVP with AI-powered checks and practical trust signals.",
    story:
      "A risk problem: help people make safer business decisions by surfacing verification signals in a mobile-first experience.",
    tech: ["Mobile", "AI", "Risk Intelligence"],
    codeUrl: "https://github.com/estheticallybawo/veritrade-app",
    image:
      "https://hellocv.s3.amazonaws.com/assets/resumes/zXBXN7t9avDkkrODQXhyqfLcHY4mfk8nL8lJCRs5.png",
  },
];

export const resumeHighlights = [
  {
    type: "Product Initiative",
    title: "Echo App",
    org: "Gemma for Good / Long-term project",
    period: "May 2026 - Present",
    copy:
      "Restructuring Echo beyond the hackathon into an AI-powered emergency response product, with a Flutter MVP for alerts, location sharing, contact escalation, onboarding, and emergency-state flows.",
  },
  {
    type: "Open Source",
    title: "Open Source Engineer",
    org: "ADEN-HIVE (YC Backed)",
    period: "Mar 2026 - Present",
    copy:
      "Reviews pull requests and contributes JavaScript improvements to Hive open-source projects.",
  },
  {
    type: "Mobile",
    title: "Mobile Development",
    org: "WTFellowship",
    period: "Aug 2025 - Aug 2026",
    copy:
      "Selected for a 52-week fellowship focused on Flutter, React Native, Firebase, APIs, and mobile MVP delivery.",
  },
  {
    type: "AI Interface",
    title: "AI/ML Intern",
    org: "UNICCON",
    period: "Jul 2025 - Oct 2025",
    copy:
      "Built interface features and API-connected flows for a text-to-speech product powered by ML and NLP.",
  },
  {
    type: "Frontend",
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
