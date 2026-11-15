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
  technicalExplorations?: Array<{ title: string; copy: string }>;
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
  label: "Founder & CEO of The Flowst Experience",
  email: "estherbawotsotso@gmail.com",
  contactEmail: "estheticallybawo@gmail.com",
  phone: "+234 806 136 5611",
  location: "Nigeria",
  image: "/assets/frontend.jpg",
  headshot: "/esther%20(2).jpg",
  cvUrl:
    "https://docs.google.com/document/d/1j7VtsYQAPlM58AjTc7SNJWwMsi-BLCgu4LyBVKSg0M4/edit?usp=sharing",
  certificationsUrl: "/certifications",
  links: {
    github: "https://github.com/estheticallybawo",
    linkedin: "https://linkedin.com/in/estheticallybawo",
    instagram: "https://instagram.com/bawocore",
    calendar: "https://cal.com/estherbawot/",
    silt: "https://silt-institute.com",
    substack: "https://whatwebcome.substack.com",
  },
};

export const writingPosts = [
  {
    publication: "The Flowst Experience",
    title: "FlowState Engineering: A Proposed framework for designing intelligent systems for learning",
    description: "The eight questions that shape how Flowst’s agents reason, behave, and support learning.",
    date: "15 Nov 2026",
    dateTime: "2026-11-15",
    image: "/writing-flowstate-engineering.webp",
    imageAlt: "A learner studies a cardboard bridge prototype at a workbench.",
    url: "https://www.useflowst.com/articles/flowstate-engineering",
  },
  {
    publication: "The Flowst Experience",
    title: "Why the next generation of AI-native builders need to know a little about everything",
    description: "What my first radio internship taught me about curiosity, and how that lesson shapes Flowst.",
    date: "15 Nov 2026",
    dateTime: "2026-11-15",
    image: "/writing-ai-native-builders.webp",
    imageAlt: "A microphone, headphones, and an open notebook in a radio studio.",
    url: "https://www.useflowst.com/articles/why-ai-native-builders-need-curiosity",
  },
  {
    publication: "whatWEBecome",
    title: "Before AI, We Were Already Extending Ourselves",
    description:
      "What anthropology can teach us about ourselves and the tools we create.",
    date: "24 Sep 2026",
    dateTime: "2026-09-24",
    image: "/writing-before-ai.jpg",
    imageAlt:
      "Illustrated river valley at sunset with the title Before AI, We Were Already Extending Ourselves.",
    url: "https://whatwebcome.substack.com/p/whatwebecome-1-before-ai-we-were",
  },
  {
    publication: "whatWEBecome",
    title: "Maybe the Question Isn’t Whether We Should Slow AI Down",
    description:
      "Why the deeper AI-safety mismatch may sit between machine capability and our understanding of the people these systems serve.",
    date: "18 Sep 2026",
    dateTime: "2026-09-18",
    image: "/writing-slow-ai.jpg",
    imageAlt:
      "Deep blue typographic cover reading Maybe the Question Isn’t Whether We Should Slow AI Down.",
    url: "https://whatwebcome.substack.com/p/maybe-the-question-isnt-whether-we",
  },
];

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
    title: "Research framing",
    detail: "Questions, learners, testable assumptions",
    copy:
      "I turn broad questions about learning and technology into focused inquiries that can be observed, challenged, and refined.",
  },
  {
    title: "Learning systems",
    detail: "Pedagogy, agent behaviour, human oversight",
    copy:
      "I translate learning-science principles into product behaviours that protect learner agency, effort, and confidence.",
  },
  {
    title: "Product engineering",
    detail: "React, TypeScript, prototypes, delivery",
    copy:
      "I build the interfaces and prototypes that make an idea concrete enough to test with people and improve through evidence.",
  },
  {
    title: "Research translation",
    detail: "Teaching, broadcasting, facilitation",
    copy:
      "I make complex ideas understandable across classrooms, teams, products, and public-facing research communication.",
  },
];

export const journeyChapters = [
  {
    period: "2007 - 2009",
    phase: "The first classroom",
    title: "I learned technology by teaching it and helping people turn ideas into prototypes.",
    role: "Computer Tutor & Administrative Assistant",
    org: "S n Sol Cyber Cafe",
    copy:
      "I arrived as a computer student after secondary school and was invited to join the centre a month into a six months training. Much of my teaching focused on design, I helped other learners turn an idea into something they could see, try, and improve.",
    carriedForward: "Digital confidence grows when instruction feels practical, patient, and safe.",
  },
  {
    period: "2011 - 2012",
    phase: "Learning became the work",
    title: "The classroom taught me that understanding is never one-size-fits-all.",
    role: "Teacher",
    org: "Moncordel International School",
    copy:
      "I taught Computer Studies, Mathematics, English, and Biology across primary and junior secondary levels. I saw how prior knowledge, confidence, explanation, correction, and practice change what a learner can do next.",
    carriedForward: "Good support adapts without taking the work of thinking away from the learner.",
  },
  {
    period: "2012 - 2019",
    phase: "Learning to translate",
    title: "Broadcasting taught me how to research, listen, and make complexity public.",
    role: "Radio Host, Radio Intern & TV News Anchor Intern",
    org: "Wave FM, Rhythm FM & Silverbird Television",
    copy:
      "Across radio and television, I prepared programmes, interviews, scripts, and live conversations. The work sharpened my editorial judgment and my ability to translate information for very different audiences.",
    carriedForward: "Clarity is not simplification. It is the discipline of helping people find meaning.",
  },
  {
    period: "2023 - 2025",
    phase: "From explaining systems to building them",
    title: "Software engineering gave my ideas a form people could use.",
    role: "Frontend Engineering Student & Intern",
    org: "Loctech, HNG Tech, AltSchool Africa & Miva Open University",
    copy:
      "I returned to technology through frontend engineering, then expanded into software engineering, responsive products, and cross-functional delivery. I learned to turn human needs into interfaces, states, and working systems.",
    carriedForward: "A useful idea becomes accountable when people can interact with it.",
  },
  {
    period: "2025 - 2026",
    phase: "AI became a design material",
    title: "Building with AI changed the questions I was asking.",
    role: "AI/ML Intern, Product Engineer & Independent Builder",
    org: "UNICCON, Echo & Flowst",
    copy:
      "Working on machine-learning products, safety technology, and a multi-agent learning platform moved my attention beyond what AI can generate to how it shapes trust, behaviour, agency, and reliance.",
    carriedForward: "Model capability matters, but human capability is the boundary that matters more.",
  },
  {
    period: "2026–Present",
    phase: "Building The Flowst Experience",
    title: "I’m building and leading an ecosystem for lifelong learning.",
    role: "Founder & CEO",
    org: "The Flowst Experience",
    copy:
      "I lead Flowst, where we’re designing phygital learning experiences that connect digital tools with hands-on practice. The work brings together the parts of my career I keep returning to: teaching, making things, and helping people understand what they can do with an idea.",
    carriedForward: "An idea becomes useful when you can take it into the next thing you do.",
  },
];

export const projects: Project[] = [
  {
    slug: "flowst",
    name: "Flowst",
    role: "Founder & CEO",
    year: "2026–Present",
    description:
      "An ecosystem that connects digital tools with hands-on experiences for lifelong learning.",
    story:
      "I’m building Flowst around a question that goes back to my time teaching. What helps someone take an idea they understand and use it in a situation they haven’t seen before?",
    tech: ["AI Agent Orchestration", "Learning Design", "Product Engineering"],
    liveUrl: "https://www.useflowst.com",
    image: "/flowsthero.PNG",
    overview:
      "Flowst connects AI-guided learning with things people can try, build, and discuss in the physical world. A learner might work through an idea with an agent, try it in a hands-on project, then come back to explain what happened. The aim is to make learning part of everyday life, across school, home, and the communities people belong to.",
    roleDetails:
      "As Founder and CEO of The Flowst Experience, I lead product direction and work across learning design, agent architecture, prototyping, and interface engineering.",
    process: [
      "Started with a learning question. What can someone explain or apply after getting help?",
      "Designed distinct roles for agents that plan, clarify, guide conversation, support visual exploration, and help learners work through projects.",
      "Connected those roles to physical and digital activities so learners can carry an idea from a conversation into something they make.",
    ],
    technicalExplorations: [
      {
        title: "FlowState Engineering",
        copy: "I’m developing the framework that connects agent capabilities, behaviour, and interface design. The design decisions include when an agent should step in, which context it needs, and which choices stay with the learner or educator.",
      },
      {
        title: "Specialised agents",
        copy: "I’m working through how to give each agent a clear role. A planning agent needs different information from an agent helping a learner explain a difficult idea, even when both are working toward the same learning goal.",
      },
      {
        title: "Physical and digital learning",
        copy: "I’m designing activities that move between a digital workspace and a hands-on task. A learner might discuss a bridge design with an agent, build the bridge offline, then return to explain where it bent and what they would change.",
      },
    ],
    outcomes: [
      "A product direction that connects AI guidance, hands-on projects, and learning with other people.",
      "A defined set of agent roles for different kinds of support.",
      "A framework for making agent behaviour a deliberate part of product design.",
    ],
    lessons: [
      "The kind of help a learner needs depends on what they’ve already tried.",
      "People need to see what an agent is doing and know how to redirect it.",
      "A useful learning interaction gives someone something they can carry into the next problem.",
    ],
    transferableSkills: ["AI product design", "Agent orchestration", "Learning design", "Design prototyping"],
    aiUse:
      "AI guides learning inside Flowst. I also use it while designing and building the product, especially to explore alternatives and work through tricky interaction states.",
  },
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
      "I built the purchase flow, cart behavior, payment callback handling, and responsive interface patterns that make the shopping journey feel clear across devices.",
    process: [
      "Mapped the shopping journey from product discovery to order confirmation.",
      "Used Zustand for predictable cart state and Paystack for payment flow integration.",
      "Built responsive UI states for loading, payment feedback, and confirmation moments.",
    ],
    outcomes: [
      "A complete checkout flow with fewer dead ends.",
      "Clearer payment feedback for users after transactions.",
      "A stronger example of product thinking inside a product build.",
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
      "A useful proof point for detail-oriented product delivery.",
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
      "A practical example of product messaging in an interface workflow.",
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
      "I used AI as a pair-programming and product-thinking partner while I directed the taste, goals, references, and feedback. It helped me inspect the code, explore interaction patterns, implement changes, test builds, and turn feedback into shippable iterations, then I asked it for a structured review of what it is like to work with me.",
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
    type: "Current position",
    title: "Founder & CEO",
    org: "The Flowst Experience",
    period: "2026–Present",
    copy:
      "Building and leading a lifelong learning ecosystem that connects AI-guided digital experiences with hands-on projects and practice.",
  },
  {
    type: "Research affiliation",
    title: "Research Member",
    org: "SILT Institute",
    period: "Present",
    copy:
      "A member of the research community exploring how AI-supported systems can strengthen learning and learner agency.",
  },
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
    title: "Frontend Engineering Intern",
    org: "HNG Tech",
    period: "Dec 2024 - Apr 2025",
    copy:
      "Shipped responsive web interfaces with HTML, CSS, JavaScript, React, Next.js, and TypeScript in a remote team.",
  },
  {
    type: "Broadcasting",
    title: "Radio Host & TV News Anchor Intern",
    org: "Wave FM, Rhythm FM & Silverbird Television",
    period: "2012 - 2019",
    copy:
      "Researched, scripted, presented, and facilitated live conversations, learning how to make complex information clear for public audiences.",
  },
  {
    type: "Education",
    title: "Teacher",
    org: "Moncordel International School",
    period: "2011 - 2012",
    copy:
      "Taught primary and junior secondary learners across Computer Studies, Mathematics, English, and Biology, adapting explanations to different levels of knowledge and confidence.",
  },
  {
    type: "Starting point",
    title: "Computer Tutor & Administrative Assistant",
    org: "S n Sol Cyber Cafe",
    period: "2007 - 2009",
    copy:
      "Began as a computer student, then joined the centre and taught practical digital skills with a focus on design and prototyping.",
  },
];

export const education = [
  {
    title: "Software Engineering",
    org: "Miva Open University",
    period: "2023 - Present",
    meta: "Bachelor of Science",
    detail:
      "Currently pursuing a software-engineering degree while applying the learning across AI research and product development.",
  },
  {
    title: "Frontend Engineering",
    org: "AltSchool Africa",
    period: "2025 - 2026",
    meta: "Diploma",
    detail:
      "Completed an intensive frontend-engineering programme and graduated as the highest-scoring learner in the School of Computing.",
  },
  {
    title: "Frontend Engineering",
    org: "Loctech IT Training Institute",
    period: "2023",
    meta: "Professional training",
    detail:
      "Built a practical foundation in responsive web development and interface implementation.",
  },
  {
    title: "Public Administration",
    org: "Federal Polytechnic Nekede",
    period: "2009 - 2011",
    meta: "National Diploma",
    detail:
      "Studied public institutions and administration—an early foundation for thinking about systems, people, and service.",
  },
];

export const credentials = [
  "BestLearner Award - AltSchool Africa in Frontend Engineering",
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
    category: "Product",
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
    category: "Product",
    image: "/assets/certifications/Frontend Masters-NextJS.PNG",
    takeaway:
      "Deepened my understanding of production React patterns, routing, rendering, and full-stack product decisions.",
    skills: ["Next.js", "Routing", "Rendering patterns"],
  },
  {
    title: "React Native",
    issuer: "Frontend Masters",
    category: "Product",
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
    category: "Design",
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

export const whyCards = [
  {
    id: "africa",
    label: "my africa",
    detail: "Everything I build carries this , the textures, the rhythms, the people who raised me.",
    photos: [] as string[],
    video: { youtubeId: "lugard7P0nw" },
    rotation: -5,
  },
  {
    id: "brothers",
    label: "my brothers",
    detail: "The first people I ever wanted to build something useful for.",
    photos: ["/assets/why/my-brothers/my-bros.png"],
    rotation: 4,
  },
  {
    id: "dad",
    label: "my dad",
    detail: "He taught me that showing up consistently is its own kind of craft.",
    photos: [
      "/assets/why/my-dad/dad.jpg",
      "/assets/why/my-dad/dad.png",
      "/assets/why/my-dad/daddy.png",
    ],
    rotation: -3,
  },
  {
    id: "family",
    label: "my family",
    detail: "They remind me why the product has to work for people who don't have time to figure it out.",
    photos: ["/assets/why/my-family/aunty-and-i.png"],
    rotation: 6,
  },
  {
    id: "friends",
    label: "my friends",
    detail: "The ones who beta test my ideas and tell me the hard truth when it's not working.",
    photos: [
      "/assets/why/my-friends/jane-and-ebere.jpg",
      "/assets/why/my-friends/my-girls.png",
    ],
    rotation: -6,
  },
  {
    id: "mum",
    label: "my mum",
    detail: "She is the reason I design for the people technology usually forgets.",
    photos: [
      "/assets/why/my-mum/mum.png",
      "/assets/why/my-mum/mummy.png",
    ],
    rotation: 2,
  },
  {
    id: "me",
    label: "other versions of me",
    detail: "Still becoming. The designer, the engineer, the builder , all at once.",
    photos: [] as string[],
    rotation: -4,
  },
];

// ── EarlyHer engagement proposal ─────────────────────────────────────────────
export const earlyHer = {
  client: "Yinka",
  product: "EarlyHer",
  prepared: "June 2025",
  tagline: "Smart Health. Early Insight.",
  pitch:
    "A women's health intelligence platform that uses AI to surface early warning signals, personalise health guidance, and close the diagnostic gap that has long left women's symptoms unheard.",

  problem: {
    headline: "Women's health has always been an afterthought.",
    subheadline: "The gap is real, measurable, and costly.",
    points: [
      "Women are 50% more likely than men to be misdiagnosed after a cardiac event.",
      "Conditions like endometriosis take an average of 7–10 years to diagnose.",
      "Most health tech tools are built on male-centric datasets, leaving women underserved.",
      "There is no centralised, intelligent platform helping women connect their own health dots.",
    ],
  },

  market: {
    headline: "The market is ready. The timing is now.",
    stats: [
      { value: "$60B", label: "Global femtech market by 2027" },
      { value: "3.9B", label: "Women globally underserved by health tech" },
      { value: "7–10 yrs", label: "Average delay to diagnose endometriosis" },
      { value: "50%", label: "Higher misdiagnosis rate for women in cardiac care" },
    ],
  },

  intro:
    "EarlyHer is not being approached as a small MVP. It is being approached as the first serious version of the full product , with the right foundation for product clarity, brand trust, app experience, secure technical setup, AI-assisted health support, and early launch readiness. Because EarlyHer involves sensitive women's health information, it needs to be handled with care, structure, privacy awareness, and long-term scalability in mind from day one.",

  marketContext: {
    body: "A healthcare product with app development, secure user data handling, backend setup, database management, AI-assisted support, and launch preparation usually sits within a much higher build range when developed through a full healthcare product team or agency. EarlyHer is being approached with that level of seriousness, but with a founder-friendly structure suitable for this first version.",
    rangeLabel: "Industry's standard pricing for  healthcare & AI-assisted product builds",
    range: "£80,000 – £300,000+",
  },

  founderRateLabel: "EarlyHer Founder Support Rate",
  founderRate: "£25,000",
  founderRateNote:
    "Reduced founder support rate covering the full first version of EarlyHer , product foundation, identity direction, app experience, backend setup, database handling, security-conscious implementation, AI-assisted support, standard setup costs, and early launch support.",

  referralLabel: "Referral Deduction (via Yemi)",
  referralNote: "Because this opportunity came through Yemi, an additional referral deduction of 8% is applied. 8% of £25,000 = £2,000.",
  referralDeduction: "− £2,000",

  finalRateLabel: "Final Referral Rate",
  finalRate: "£23,000",
  finalRateNote:
    "This proposal is open for discussion and final adjustment before agreement, depending on the final scope, timeline, and delivery expectations.",

  investorPrep: {
    headline: "How This Prepares EarlyHer for Customers and Investors",
    forCustomers:
      "For customers, the work will help EarlyHer feel trustworthy, easy to understand, and useful from the first experience , shaped around real user needs, sensitive health information, clear guidance, and a supportive app journey.",
    forInvestors:
      "For investors or partners, the work will help EarlyHer communicate a stronger product story, show a clearer first version, demonstrate organised product thinking, and present a more credible foundation for future growth.",
  },

  deliverables: [
    {
      number: "01",
      title: "The Product Foundation",
      desc: "The thinking, structure, and clarity needed before and during the build , shaping EarlyHer around the women it is being built for, the problems it is solving, and the experience users should have from day one.",
    },
    {
      number: "02",
      title: "The EarlyHer Identity",
      desc: "How EarlyHer should look, sound, and feel as a women's health product , creating an identity that feels trustworthy, calm, intelligent, and appropriate for women tracking symptoms or preparing for GP appointments.",
    },
    {
      number: "03",
      title: "The App Experience",
      desc: "The first version of the app experience , cycle tracking, phase understanding, symptom logging, self-examination guidance, health information preparation, and a path toward doctor support when needed.",
    },
    {
      number: "04",
      title: "The Behind-the-Scenes System",
      desc: "The technical layer needed to make the app function beyond just screens , account creation, secure data storage, user access structure, backend setup, and privacy-conscious handling of sensitive health information.",
    },
    {
      number: "05",
      title: "AI-Assisted Support Layer",
      desc: "An AI-assisted layer to provide smarter health-related guidance within the product. Not to replace doctors , to help users better organise, understand, and prepare their health information before seeking professional support.",
    },
    {
      number: "06",
      title: "Project Setup & Launch Operating Costs",
      desc: "Standard setup and first-version operating costs , domain, hosting, storage, selected paid tools, development tools, testing, communication setup, and basic launch preparation. Included to avoid repeated requests for small setup payments.",
    },
    {
      number: "07",
      title: "The Launch Foundation",
      desc: "Early communication support to introduce EarlyHer clearly to users, supporters, partners, or early adopters , the messaging and content direction needed to support awareness and the first stage of market introduction.",
    },
  ],

  stages: [
    { stage: "01", title: "Project Activation & Team Setup", amount: "£6,900", trigger: "30% committment deposit to begin, Team formation, research, sprint planning and Internal docs" },
    { stage: "02", title: "Product Clarity & Direction", amount: "£2,300", trigger: "After first major direction is presented and agreed. Branding, Product positioning and Visual identity Essentials" },
    { stage: "03", title: "Look, Feel & User Experience Direction", amount: "£1,700", trigger: "After visual and experience direction is approved. App's visuals" },
    { stage: "04", title: "Core App Structure & User Flow", amount: "£2,300", trigger: "After main app structure and user journey direction are approved.  app's core functionality and user flow" },
    { stage: "05", title: "Technical Foundation", amount: "£3,200", trigger: "After behind-the-scenes system and first technical foundation are completed. Backend, Database, Encryption, Auth and Paywall" },
    { stage: "06", title: "AI-Assisted Support Layer", amount: "£2,700", trigger: "After AI-assisted support layer direction and first integration structure are completed. Healthcare's Safe zone AI Integration" },
    { stage: "07", title: "First Version Build & Connection", amount: "£2,900", trigger: "After main app build and key connections are completed and reviewed. App Stores readiness and Essentials" },
    { stage: "08", title: "Launch Readiness & Final Handover", amount: "£1,000", trigger: "After launch support materials, final checks, and handover are completed. Live product webpage with Marketing essentials " },
  ],

  importantNotes: [
    "This quote covers the product foundation and first version of EarlyHer.",
    "Specialist costs outside the product build , legal representation, formal medical review, clinical validation, formal GDPR compliance certification, NHS approval, or external medical board review , are not included unless separately agreed in writing.",
    "Because EarlyHer is a women's health product, any medical or clinical recommendations should be reviewed by a qualified healthcare professional before public release.",
    "The AI-assisted layer is intended to support health-information organisation and user guidance. It should not be presented as a replacement for doctors, diagnosis, treatment, or emergency medical care.",
    "The security and privacy foundation will be approached carefully, but formal legal, GDPR, NHS, or medical compliance approval should be handled by qualified legal, clinical, or compliance professionals.",
  ],

  photos: [
    { src: "/assets/earlyher/meetup.png", caption: "EarlyHer Community Meetup" },
    { src: "/assets/earlyher/call.png", caption: "EarlyHer Community Call" },
    { src: "/assets/earlyher/popup.png", caption: "EarlyHer University Pop-Up" },
  ],

  playlistId: "PLLmemQh3Fs0s",

  competitorStatement: "Apps like Flo, Clue, Ada, Hertility, and Oura each solve a slice of the journey, cycle tracking, fertility, symptom assessment, or biometrics. Each one collects. None of them help women turn what they're tracking into evidence they can take to a doctor.",

  competitors: [
    {
      name: "Flo",
      category: "Cycle tracking",
      solves: "Period prediction, symptom logging, and personalised health content, 300M+ users globally.",
      gap: "Tracks the cycle. Doesn't help women turn what they're tracking into evidence they can take to a doctor.",
    },
    {
      name: "Clue",
      category: "Cycle & health",
      solves: "Science-backed period and symptom tracking, with research partnerships and detailed health data.",
      gap: "Excellent at collection. Silent on what to do with the data when it matters most, a clinical conversation.",
    },
    {
      name: "Natural Cycles",
      category: "Fertility",
      solves: "FDA-cleared contraception and fertility planning through basal body temperature tracking.",
      gap: "Narrowly focused on fertility. No layer for ongoing symptom advocacy or appointment preparation.",
    },
    {
      name: "Ada",
      category: "Symptom checker",
      solves: "AI-powered symptom assessment that triages users toward the appropriate level of care.",
      gap: "Built for one-off check-ins. Not designed for tracking patterns over time or building a personal health case.",
    },
    {
      name: "Hertility",
      category: "Hormone health",
      solves: "At-home hormone and fertility testing with personalised clinical reports and care pathways.",
      gap: "Lab-first. Built around a single test moment, not the continuous day-to-day health journey.",
    },
    {
      name: "Oura",
      category: "Wearable health",
      solves: "Ring-based biometric tracking for sleep, recovery, and cycle prediction through passive sensing.",
      gap: "Hardware-dependent and general wellness. Not designed to help women advocate for themselves with clinicians.",
    },
  ],

  positioningNote: "EarlyHer's defensible ground is the full arc, from daily patterns, to organised evidence, to confident clinical conversations. That's what none of them offer. Which is why early positioning is non-negotiable.",
};
