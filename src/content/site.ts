export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  role: string;
  problem: string;
  built: string;
  components: string[];
  technologies: string[];
  outcome: string;
  links: { label: string; href: string; available: boolean }[];
};

export const site = {
  name: "Ndibueze Ifeanyichukwu Chibuzor",
  shortName: "Ndibueze Chibuzor",
  headline: "Microbiology-trained builder working across data, AI, and health.",
  intro:
    "I am a Microbiology graduate from the University of Nigeria, Nsukka, developing computational approaches to biological and healthcare problems through data science, machine learning, and practical AI applications.",
  location: "Nigeria",
  email: null as string | null,
  socials: [
    { label: "LinkedIn", href: "#contact", note: "URL to add" },
    { label: "GitHub", href: "#contact", note: "URL to add" },
    { label: "Email", href: "#contact", note: "Address to add" },
  ],
  nav: [
    ["About", "about"],
    ["Education", "education"],
    ["Research", "research"],
    ["Projects", "projects"],
    ["Experience", "experience"],
    ["Leadership", "leadership"],
    ["Skills", "skills"],
    ["Learning", "learning"],
    ["Writing", "writing"],
    ["Contact", "contact"],
  ],
};

export const researchInterests = [
  "AI and healthcare",
  "Health data analytics",
  "Predictive modelling",
  "Public health",
  "Infectious diseases",
  "Microbial sciences",
  "Bioinformatics",
  "Computational biology",
  "Human-centered digital health",
];

export const journey = [
  {
    number: "01",
    title: "Scientific foundation",
    text: "Microbiology at the University of Nigeria, Nsukka built my grounding in biological systems, infectious disease, and evidence-led inquiry.",
  },
  {
    number: "02",
    title: "Public health questions",
    text: "My undergraduate research brought that foundation into a public health context through a study of HIV and HBV among women in Nsukka Metropolis.",
  },
  {
    number: "03",
    title: "Computational turn",
    text: "Working with data and learning through structured technical programs expanded how I approach complex biological and healthcare problems.",
  },
  {
    number: "04",
    title: "Practical AI applications",
    text: "Today I am building toward responsible, useful AI systems for health, with particular attention to context, evaluation, and human needs.",
  },
];

export const education = {
  institution: "University of Nigeria, Nsukka",
  degree: "B.Sc. Microbiology",
  result: "Second Class Upper Honours",
  period: "Academic details to add",
  context:
    "A scientific foundation in microbiology, complemented by undergraduate public health research and a growing focus on computational methods.",
};

export const researchProject = {
  title: "Prevalence of HIV and HBV amongst Women in Nsukka Metropolis",
  meta: "University Undergraduate Project · University of Nigeria, Nsukka · 2023",
  question:
    "An undergraduate public health research project examining the prevalence of HIV and HBV among women in Nsukka Metropolis.",
  design: "Study design and participant/sample details to be added.",
  analysis: "Analysis approach and statistical methods to be added.",
  findings: "Findings to be added from the final research report.",
  relevance:
    "The project sits at the intersection of microbial science, infectious disease, and population health, and helps explain my interest in using data to understand healthcare problems.",
};

export const projects: Project[] = [
  {
    title: "MedSought AI",
    eyebrow: "Featured project · AI-enabled digital health",
    description:
      "A healthcare application with a conversational AI layer designed to provide context-aware, safety-conscious medical information assistance.",
    role: "ML/AI conversational layer contributor",
    problem:
      "Healthcare conversations need to be useful and understandable while handling uncertainty, medication-related questions, urgency, and safety boundaries with care.",
    built:
      "I work specifically on the ML/AI conversational layer and its connection to the surrounding application. The broader backend and frontend system is owned by other contributors.",
    components: [
      "Medical information assistance",
      "Retrieval-augmented generation",
      "Medication-related information",
      "Intent classification",
      "Urgency classification",
      "Safety and guardrail handling",
      "Context-aware conversations",
      "Backend API integration",
    ],
    technologies: ["Generative AI", "RAG", "Classification", "API integration", "AI evaluation"],
    outcome: "Project-specific outcomes and deployment details to add.",
    links: [
      { label: "GitHub", href: "#contact", available: false },
      { label: "Live demo", href: "#contact", available: false },
    ],
  },
];

export const skillGroups = [
  {
    title: "Programming & data",
    note: "Tools I use or am developing through practice and learning.",
    items: ["Python", "R", "SQL", "Pandas", "NumPy", "Scikit-learn"],
  },
  {
    title: "Machine learning & AI",
    note: "Methods and application areas connected to my current direction.",
    items: [
      "Machine learning",
      "Predictive modelling",
      "Classification",
      "Regression",
      "Clustering",
      "Generative AI",
      "AI application development",
      "RAG",
      "AI evaluation",
    ],
  },
  {
    title: "Data & visualisation",
    note: "Ways I explore, communicate, and make sense of data.",
    items: ["Tableau", "Power BI", "Jupyter Notebook"],
  },
  {
    title: "Development & tools",
    note: "Working tools for building, documenting, and collaborating.",
    items: ["Git", "GitHub", "VS Code", "Microsoft 365"],
  },
];

export const oneForma = {
  title: "AI data and evaluation work",
  eyebrow: "OneForma · Practical AI training experience",
  description:
    "This work has given me hands-on exposure to the careful human judgment behind useful AI systems: preparing data, creating evaluation signals, and checking model behaviour against contextual standards.",
  activities: [
    "Reviewing and post-editing machine-generated translations",
    "Evaluating Generative AI responses using rubric-based standards",
    "Annotating text and image datasets for AI training",
    "Creating prompts and ranking model outputs",
    "Working with contextual datasets",
    "Multilingual translation and post-editing",
    "Voice, email, and contextual AI dataset initiatives where applicable",
  ],
  details: "Project names, dates, and platform-specific outcomes to add.",
};

export const leadership = {
  title: "President, Microbiology Association",
  eyebrow: "Leadership and community",
  description:
    "I led the association's executive team, worked with lecturers, represented students, and helped turn student needs into practical academic, social, and community activities.",
  responsibilities: [
    "Leading the executive team and working with lecturers",
    "Representing students and addressing student concerns",
    "Organising workshops and supporting academic and sporting activities",
    "Organising the department's first trade fair",
    "Supporting participation in the Nigerian Society for Microbiology symposium",
    "Supporting implementation of a departmental digital library",
    "Coordinating student-week activities",
  ],
  reflection:
    "The role strengthened my ability to coordinate across different priorities, communicate clearly, and finish practical work with a team. Dates and specific outcomes are intentionally left open for a fuller account.",
};

export const learning = [
  {
    name: "M4ACE",
    type: "Applied AI/ML development",
    text: "M4ACE has contributed to my development in AI/ML, practical AI application development, real-world problem solving, and building models and applications.",
    detail: "Programme details and specific projects to add.",
  },
  {
    name: "WorldQuant University",
    type: "Structured quantitative learning",
    text: "A learning pathway that supports my interest in data-driven reasoning and quantitative approaches.",
    detail: "Programme name, dates, modules, and applied work to add.",
  },
  {
    name: "DataCamp",
    type: "Data science practice",
    text: "A source of structured practice across data analysis, programming, and machine learning topics.",
    detail: "Completed tracks, certificates, and projects to add.",
  },
  {
    name: "AWS",
    type: "Cloud learning",
    text: "Relevant cloud learning that can support the deployment and operation of data and AI applications.",
    detail: "Course or certification details to add.",
  },
];

export const achievements = [
  { label: "Academic", title: "Second Class Upper Honours", text: "B.Sc. Microbiology, University of Nigeria, Nsukka." },
  { label: "Leadership", title: "Microbiology Association President", text: "Led student representation, programming, and departmental initiatives." },
  { label: "Applied AI", title: "Healthcare conversational AI work", text: "Contributed to the ML/AI layer of MedSought AI." },
  { label: "Research", title: "Undergraduate public health project", text: "Studied HIV and HBV prevalence among women in Nsukka Metropolis." },
];

export const beyondCv = [
  { title: "Running", text: "A practical reminder that progress is built through consistency, patience, and showing up again." },
  { title: "Books and podcasts", text: "Ways I keep learning outside formal coursework and make room for ideas from different fields." },
  { title: "Helping others move forward", text: "I value sharing context, encouragement, and useful support when someone is working toward a goal." },
  { title: "Finishing what I start", text: "A personal standard I try to carry into research, leadership, and technical work." },
];
