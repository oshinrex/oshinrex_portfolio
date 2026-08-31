// ---------------------------------------------------------------------------
// URLs — kept in one place so they're easy to find and replace.
// ---------------------------------------------------------------------------

export const RESUME_URL = "/Oshin_Rex_Resume.pdf";

export const CONTACT = {
  email: "omr6@cornell.edu",
  linkedin: "https://linkedin.com/in/oshin-rex-405b78266",
  linkedinLabel: "linkedin.com/in/oshin-rex",
  github: "https://github.com/oshinrex",
  githubLabel: "github.com/oshinrex",
};

export const PROJECT_URLS = {
  act: {
    github: "https://github.com/cornellh4i/ACT",
  },
  hvtp: {
    github: "https://github.com/cornellh4i/HVTP",
  },
  limitOrderBook: {
    github: "https://github.com/oshinrex/cpp-order-book",
  },
  caseMatch: {
    github: "https://github.com/oshinrex/case-match",
    live: "https://case-match-agent.vercel.app/",
    demo: "https://www.youtube.com/watch?v=YuoRIuV09Lo",
  },
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
  logo?: string;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "ibm",
    company: "IBM",
    role: "Software Engineering Intern",
    location: "Chicago, IL",
    period: "May – July 2026",
    logo: "/logos/ibm.png",
    bullets: [
      "Built a vendor management portal serving 60,000+ consumers and 6,000+ vendors using FetchXML, JavaScript, HTML, CSS, and Dataverse.",
      "Developed LLM-powered automation for intake routing and database workflows; won 1st place in the IBM Consulting Intern Challenge.",
    ],
  },
  {
    id: "hack4impact",
    company: "Hack4Impact Cornell",
    role: "Software Developer",
    location: "Ithaca, NY",
    period: "Sep. 2025 – Present",
    logo: "/logos/hack4impact.png",
    current: true,
    bullets: [
      "Build and deploy software for nonprofit organizations, turning real-world needs into production applications.",
      "Developed React and React Native applications with Firebase and Express, including offline support, role-based access, and inventory workflows.",
    ],
  },
  {
    id: "greensand-ai",
    company: "GreenSand AI",
    role: "Software Developer Intern",
    location: "Remote",
    period: "Dec. 2025 – Feb. 2026",
    logo: "/logos/greensandai.png",
    bullets: [
      "Built a Django pipeline to process and organize 5,000+ PDFs into searchable document data.",
      "Integrated MinerU into the document processing pipeline, reducing processing time by 30%.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Projects — ordered earliest-built first, no single project featured.
// ---------------------------------------------------------------------------

export type ProjectLink = {
  type: "github" | "live" | "demo";
  label: string;
  href: string;
};

export type ProjectScreenshot = {
  src: string;
  fit?: "cover" | "contain";
  position?: "center" | "left-top";
  // Raw CSS object-position, for when the named positions aren't precise
  // enough (e.g. cropping a phone screenshot's status bar out of view).
  objectPosition?: string;
};

export type Project = {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  metrics?: string[];
  tech: string[];
  links: ProjectLink[];
  screenshots?: ProjectScreenshot[];
};

export const PROJECTS: Project[] = [
  {
    id: "limit-order-book",
    name: "High-Performance Limit Order Book",
    description:
      "A C++20 price-time priority matching engine supporting market orders, limit orders, partial fills, and cancellations.",
    metrics: ["1.14M orders/sec", "429 ns median matching", "1M+ orders benchmarked"],
    tech: ["C++20", "STL", "CMake"],
    links: [
      { type: "github", label: "GitHub", href: PROJECT_URLS.limitOrderBook.github },
    ],
    screenshots: [{ src: "/projects/orderbook.png", fit: "contain" }],
  },
  {
    id: "case-match",
    name: "Case Match",
    subtitle: "Agentic Memory for Consulting Precedent",
    description:
      "An AI-powered precedent discovery system that combines semantic search, agentic evaluation, and persistent memory to find relevant consulting engagements.",
    metrics: ["175 ms vector search", "330 ms end-to-end", "48+ engagements"],
    tech: ["Python", "LangGraph", "CockroachDB", "AWS Bedrock"],
    links: [
      { type: "github", label: "GitHub", href: PROJECT_URLS.caseMatch.github },
      { type: "live", label: "Live Demo", href: PROJECT_URLS.caseMatch.live },
      { type: "demo", label: "Video", href: PROJECT_URLS.caseMatch.demo },
    ],
    screenshots: [{ src: "/projects/case-match-1.png", fit: "cover", position: "center" }],
  },
  {
    id: "act",
    name: "ACT Conversation Cards App",
    description:
      "React Native application digitizing 75 safety cards across 15 decks with offline persistence, child profiles, filtering, and progress tracking.",
    tech: ["React Native", "Firebase", "TypeScript"],
    links: [{ type: "github", label: "GitHub", href: PROJECT_URLS.act.github }],
    screenshots: [
      { src: "/projects/act-1.png", fit: "cover", objectPosition: "center 14%" },
      { src: "/projects/act-2.png", fit: "cover", objectPosition: "center 14%" },
    ],
  },
  {
    id: "hvtp",
    name: "HVTP Inventory Webpage",
    description:
      "Full-stack inventory platform replacing spreadsheet-based tracking with centralized inventory, sales, and location data.",
    tech: ["React", "Express.js", "Firebase"],
    links: [{ type: "github", label: "GitHub", href: PROJECT_URLS.hvtp.github }],
    screenshots: [{ src: "/projects/hvtp.png", fit: "cover", position: "left-top" }],
  },
];

// ---------------------------------------------------------------------------
// Toolkit
// ---------------------------------------------------------------------------

export type TechGroup = {
  id: string;
  label: string;
  items: string[];
};

export const TECH_GROUPS: TechGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "C++", "Java", "SQL", "JavaScript", "HTML/CSS", "OCaml"],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    items: ["React", "React Native", "Express.js", "Django", "FastAPI", "LangGraph"],
  },
  {
    id: "cloud-ai",
    label: "Cloud & AI",
    items: ["AWS Bedrock", "Docker", "Power Automate", "RAG"],
  },
  {
    id: "databases-tools",
    label: "Databases & Tools",
    items: ["CockroachDB", "PostgreSQL", "Firebase", "Microsoft Dataverse", "Git", "CMake"],
  },
];
