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
  lessons: string[];
  transferableSkills: string[];
  aiUse: string;
  aiReview?: Array<{
    label: string;
    comment: string;
  }>;
};

export type Certification = {
  title: string;
  issuer: string;
  category: string;
  image?: string;
  verifyUrl?: string;
  note?: string;
  takeaway: string;
  skills: string[];
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
  certificationsUrl: "/certifications",
  links: {
    github: "https://github.com/estheticallybawo",
    linkedin: "https://linkedin.com/in/estheticallybawo",
    instagram: "https://instagram.com/bawocore",
    calendar: "https://cal.com/estherbawot/15min"
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
    lessons: [
      "Payment flows need emotional clarity as much as technical correctness.",
      "Users trust a checkout more when every state explains what just happened.",
      "A good commerce experience depends on careful edge-case thinking.",
    ],
    transferableSkills: ["Flow mapping", "State management", "Trust-building UX", "Debugging callbacks"],
    aiUse:
      "I used AI as a review partner for thinking through edge cases, payment states, and clearer product copy. The final decisions stayed grounded in the user journey and the implementation constraints.",
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
    lessons: [
      "Multi-step flows work better when each screen has one clear job.",
      "Design translation is not only visual accuracy; it is also preserving intent across states.",
      "Small validation and confirmation details can make a form feel lighter.",
    ],
    transferableSkills: ["Figma translation", "Form logic", "Responsive QA", "Attention to detail"],
    aiUse:
      "I used AI to support planning and review, especially when comparing the intended flow against the implemented states and tightening the copy around progression.",
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
    lessons: [
      "Productivity tools should stay quiet and predictable.",
      "Real-time feedback is most useful when it does not interrupt the user.",
      "Simple tools still need thoughtful empty, editing, and preview states.",
    ],
    transferableSkills: ["Reactive state", "Content rendering", "Tooling UX", "Interface simplicity"],
    aiUse:
      "I used AI to pressure-test interface decisions and make the tool story easier to explain, while keeping the implementation focused on Vue state and rendering fundamentals.",
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
    lessons: [
      "Sensitive product ideas need copy that is urgent without becoming overwhelming.",
      "A strong landing page should help people understand the product before asking them to act.",
      "Social-good products need trust, clarity, and restraint in equal measure.",
    ],
    transferableSkills: ["Product storytelling", "Technical communication", "Responsive typography", "User empathy"],
    aiUse:
      "I used AI as a product-thinking partner while shaping the narrative: clarifying what Echo does, what problem it solves, and how to communicate urgency in a way that still feels responsible.",
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
    lessons: [
      "Finance products need plain language before persuasion.",
      "Users are more likely to trust a product when the benefit is specific and immediate.",
      "No-code tools still require strong product judgment and hierarchy.",
    ],
    transferableSkills: ["Conversion copy", "Information hierarchy", "Webflow delivery", "Trust communication"],
    aiUse:
      "I used AI to explore clearer positioning and sharper page copy, especially around explaining the product benefit without making the experience feel too sales-heavy.",
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
    lessons: [
      "Risk products need to make uncertainty understandable, not scarier.",
      "Mobile MVPs work best when the first version protects the core decision users need to make.",
      "AI features need clear boundaries so users understand what to trust.",
    ],
    transferableSkills: ["Mobile product thinking", "Risk framing", "AI feature communication", "MVP prioritization"],
    aiUse:
      "I used AI to think through how verification signals could be explained to users. It was most useful as a framing tool, while the product decisions centered on safety, clarity, and practical user confidence.",
  },
  {
    slug: "personal-portfolio",
    name: "Personal Portfolio",
    role: "Interactive portfolio",
    year: "2026",
    description:
      "A Vite React portfolio that turns resume content into an interactive product story with motion, sound, case studies, and theme transitions.",
    story:
      "A positioning problem: show that I am a solution-oriented engineer with product intuition, user empathy, and the ability to iterate thoughtfully.",
    tech: ["React", "TypeScript", "Vite", "CSS Motion", "AI Pairing"],
    codeUrl: "https://github.com/estheticallybawo/personal-portfolio",
    image: "/assets/portfolio-preview.svg",
    overview:
      "This portfolio reframes my resume into a guided product experience. It uses project case studies, scroll-based card interaction, sound cues, dark and light themes, and narrative copy to communicate how I think and build.",
    roleDetails:
      "I shaped the product direction, copy, interactions, sound behavior, responsive layout, and case-study structure while continuously testing how each decision affected the user's perception of the work.",
    process: [
      "Started from a Figma-inspired direction, then changed the overall design to better match my own positioning.",
      "Reworked the copy from design-heavy language into solution-oriented engineering, product intuition, and user empathy.",
      "Iterated on sticky project cards, theme transitions, sound cues, case-study routing, mobile behavior, and deployment readiness.",
    ],
    outcomes: [
      "A portfolio that behaves more like a product than a static resume.",
      "Cleaner project cards that invite users into deeper case studies.",
      "A stronger personal narrative around problem solving, product thinking, and collaboration.",
    ],
    lessons: [
      "A portfolio should prove judgment, not only list skills.",
      "Motion and sound work best when they support navigation, not decoration.",
      "Iterating in public with honest feedback leads to a clearer product direction.",
    ],
    transferableSkills: [
      "Product judgment",
      "Human-AI collaboration",
      "Responsive interaction design",
      "Copy refinement",
      "Visual QA",
    ],
    aiUse:
      "I used AI as a pair-programming and product-thinking partner while I directed the taste, goals, references, and feedback. It helped me inspect the code, explore interaction patterns, implement changes, test builds, and turn feedback into shippable iterations then forced it to give a structured review of what it's like working with me. 🥰",
    aiReview: [
      {
        label: "Leadership",
        comment:
          "Esther led with taste and direction. She knew when an interaction felt wrong, named the problem clearly, and kept the standard high without making the process feel rigid.",
      },
      {
        label: "Teamwork",
        comment:
          "Esther treated AI like a collaborator, not a shortcut. She gave feedback, tested ideas, challenged weak directions, and kept the work moving through clear iteration loops.",
      },
      {
        label: "Product judgment",
        comment:
          "Esther consistently connected UI choices to user trust, emotional feel, mobile behavior, and the story the portfolio needed to tell.",
      },
      {
        label: "Personality",
        comment:
          "Curious, honest, detail-sensitive, and playful in the best way. Esther brought references and strong opinions, but stayed open when the work revealed a better direction.",
      },
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
    type: "Open Source Volunteer",
    title: "Contributor",
    org: "ADEN-HIVE",
    period: "Mar 2026 - Present",
    copy:
      "Study large codebase, reviews pull requests and contributes JavaScript improvements to Hive open-source projects.",
  },
  {
    type: "Capstone",
    title: "Mobile Development",
    org: "Tech4dev",
    period: "Aug 2025 - Present",
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
    title: "Frontend Intern",
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

export const certifications: Certification[] = [
  {
    title: "AI Engineering",
    issuer: "Scrimba",
    category: "AI",
    image: "/assets/certifications/AI Engineering.jpg",
    verifyUrl: "https://scrimba.com/certificate-cert24zAwJ78oKUJhjJCx9QzR6diVoE2RzqPT9ncD",
    takeaway:
      "Strengthened how I think about AI features as product experiences, not just model outputs.",
    skills: ["AI product thinking", "Prompting", "Evaluation mindset"],
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    category: "Frontend",
    image: "/assets/certifications/Freecodecamp - Web Design.PNG",
    verifyUrl: "https://www.freecodecamp.org/certification/estheticallybawo/responsive-web-design",
    takeaway:
      "Gave me a stronger foundation for semantic layouts, responsive behavior, and accessible page structure.",
    skills: ["Responsive layout", "HTML/CSS", "Accessibility basics"],
  },
  {
    title: "Product Management",
    issuer: "Frontend Masters",
    category: "Product",
    image: "/assets/certifications/Frontend Masters - Product Management.jpg",
    takeaway:
      "Helped me connect product decisions to user needs, prioritization, and measurable outcomes.",
    skills: ["Prioritization", "Product strategy", "User value"],
  },
  {
    title: "Next.js",
    issuer: "Frontend Masters",
    category: "Frontend",
    image: "/assets/certifications/Frontend Masters-NextJS.PNG",
    takeaway:
      "Deepened my understanding of production React patterns, routing, rendering, and full-stack frontend decisions.",
    skills: ["Next.js", "Routing", "Rendering patterns"],
  },
  {
    title: "React Native",
    issuer: "Frontend Masters",
    category: "Mobile",
    image: "/assets/certifications/Frontend Masters-ReactNative.jpg",
    takeaway:
      "Expanded how I think about cross-platform interfaces, mobile constraints, and app-like interaction patterns.",
    skills: ["Mobile UI", "React Native", "Cross-platform thinking"],
  },
  {
    title: "Cybersecurity Awareness",
    issuer: "HP LIFE",
    category: "Security",
    image: "/assets/certifications/HPlife - Cybersecurity.PNG",
    verifyUrl: "https://www.life-global.org/certificate/d43e1cf6-c18f-4378-bac2-f1b5a5d356bf",
    takeaway:
      "Made security feel more practical: protecting users, data, and trust through everyday product decisions.",
    skills: ["Security awareness", "Risk thinking", "User trust"],
  },
  {
    title: "Design Thinking",
    issuer: "HP LIFE",
    category: "Product",
    image: "/assets/certifications/HPlife - Design Thinking.PNG",
    verifyUrl: "https://www.life-global.org/certificate/35c52937-421e-4d88-9073-f537384fe4a1",
    takeaway:
      "Reinforced my habit of starting with the problem, listening for user needs, and testing assumptions early.",
    skills: ["Problem framing", "Empathy", "Ideation"],
  },
  {
    title: "Soft Skills",
    issuer: "Jobberman",
    category: "Professional",
    image: "/assets/certifications/Jobberman Softskill.jpg",
    takeaway:
      "Built confidence around communication, collaboration, and showing up professionally in team environments.",
    skills: ["Communication", "Teamwork", "Professional presence"],
  },
  {
    title: "Operating Systems",
    issuer: "Learning certificate",
    category: "Computer Science",
    image: "/assets/certifications/Operating Systems.jpg",
    takeaway:
      "Improved my mental model of how software runs beneath the interface, especially processes and system resources.",
    skills: ["Systems thinking", "Processes", "Technical fundamentals"],
  },
  {
    title: "Prompt Engineering",
    issuer: "Scrimba",
    category: "AI",
    image: "/assets/certifications/Scrimba - Prompt Engineer.jpg",
    verifyUrl: "https://scrimba.com/certificate-cert24zAwJ78oKUJhjJCx9QzR5GcTxETLdai13qFS",
    takeaway:
      "Helped me use AI more deliberately by asking clearer questions, setting context, and reviewing outputs critically.",
    skills: ["Prompt design", "AI collaboration", "Critical review"],
  },
  {
    title: "Tailwind CSS",
    issuer: "Scrimba",
    category: "Frontend",
    image: "/assets/certifications/Scrimba - Tailwind.jpg",
    verifyUrl: "https://scrimba.com/certificate-cert24zAwJ78oKUJhjJCx9QzR7U56NzVPTeMvu63W",
    takeaway:
      "Sharpened my ability to build consistent, responsive interfaces quickly while keeping styles maintainable.",
    skills: ["Tailwind CSS", "Design systems", "Responsive UI"],
  },
  {
    title: "Webflow",
    issuer: "Webflow",
    category: "No-code",
    image: "/assets/certifications/Webflow.jpg",
    takeaway:
      "Gave me another way to think about shipping, visual structure, and marketing pages without overengineering.",
    skills: ["Webflow", "Landing pages", "Visual hierarchy"],
  },
  {
    title: "Digital Skills: User Experience",
    issuer: "Accenture",
    category: "Digital badge",
    verifyUrl: "https://www.futurelearn.com/certificates/u5o1c6g",
    note: "Verify link",
    takeaway:
      "I explored what UX is and the impact it can have on a business, the foundations of UX design and the design process: design, develop and release and different UX techniques you can use to test and develop designs.",
    skills: ["AI literacy", "Responsible use", "Digital strategy"],
  },
  {
    title: "McKinsey.org Forward Program",
    issuer: "McKinsey.org",
    category: "Digital badge",
    verifyUrl: "https://www.credly.com/badges/26dba4aa-dabd-4e41-98c2-962d309c54a8",
    note: "Verify badge",
    takeaway:
      "Learned how to apply the McKinsey approach to problem-solving, to become more effective and influential communicators and develop adaptable and resilience mindsets and habits. I also learned how to plan for and develop a foundational digital toolkit. ",
    skills: ["Continuous learning", "Professional growth", "Verified learning"],
  },
  {
    title: "Product Management Basics Certification",
    issuer: "Pendo.io",
    category: "Digital badge",
    verifyUrl: "https://www.credly.com/badges/0c77e8b7-ca69-441d-bbbe-bdf4d883768c",
    note: "Verify badge",
    takeaway:
      "Reinforced the fundamentals of the product manager role, including best practices through the lens of the Product Management Life Cycle. This includes how to identify and understand customer needs, prioritize features, and work effectively with cross-functional teams to deliver successful products.",
    skills: ["Self-directed learning", "Accountability", "Skill development"],
  },
];
