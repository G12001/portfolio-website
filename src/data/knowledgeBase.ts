export const portfolioData = {
  personalInfo: {
    name: "Shubham Pimple",
    role: "Full Stack Engineer / Backend Engineer",
    tagline: "Building scalable Node.js/TypeScript architectures and resilient distributed systems.",
    email: "sspimple2001@gmail.com",
    phone: "+91-9307650981",
    location: "Pune, India",
    github: "https://github.com/G12001",
    linkedin: "https://linkedin.com/in/shubham-pimple",
    availability: "Available for new opportunities",
  },
  about: `Performance-driven Backend Engineer specializing in scalable Node.js/TypeScript architectures and resilient distributed systems. Proven track record of delivering enterprise EHR, HRMS, and E-commerce platforms while reducing database loads by 40% and accelerating API throughput by 70%.`,
  experience: [
    {
      company: "Thinkitive Technologies",
      role: "Software Engineer",
      duration: "Dec 2025 - Apr 2026",
      location: "Baner, Pune",
      description: "Engineered scalable RESTful APIs for an enterprise HRMS module managing complex employee self-service lifecycles. Developed core ledger logic for real-time attendance calculations and authored comprehensive unit/integration test suites using Jest. Optimized multi-tenant EHR platform reliability by fixing race conditions and built structured analytical report export endpoints to minimize server memory overhead.",
      technologies: ["Node.js", "TypeScript", "Jest", "RESTful APIs", "Microservices"],
    },
    {
      company: "Wesolutize Technologies",
      role: "Full Stack Developer",
      duration: "Apr 2024 - Dec 2025",
      location: "Hinjewadi, Pune",
      description: "Designed and deployed robust full-stack applications (CRM, ERP, and E-commerce) using Express and React. Implemented a multi-layer Redis caching strategy achieving a 40% reduction in query volume. Refactored legacy raw SQL into type-safe Sequelize ORM structures. Developed a secure HIPAA-compliant hospital management sub-system with real-time data tracking and RBAC, boosting critical API endpoint response times by up to 70%.",
      technologies: ["React", "Express.js", "Node.js", "Sequelize ORM", "Redis", "SQL"],
    },
  ],
  projects: [
    {
      id: "nexusshop",
      name: "NexusShop",
      description: "Event-Driven E-Commerce Platform. Architected a decoupled, event-driven microservices ecosystem leveraging NestJS and RabbitMQ message brokers. Implemented the Saga Pattern and database-level optimistic locking. Engineered a production-ready NPM Workspaces monorepo featuring shared DTOs, centralized JWT authentication, and a single-command Docker Compose pipeline.",
      technologies: ["TypeScript", "NestJS", "RabbitMQ", "Prisma", "PostgreSQL", "Docker", "NPM Workspaces"],
      architecture: "Event-driven microservices ecosystem (Gateway, Users, Orders, Inventory) leveraging RabbitMQ and Saga Pattern for atomicity.",
      liveDemo: "https://github.com/G12001/NexusShop",
      github: "https://github.com/G12001/NexusShop",
    },
    {
      id: "cloudvault",
      name: "CloudVault",
      description: "Cloud-Based File Management System with multi-file upload, S3 integration, and hierarchical storage. Built secure authentication using JWT, bcrypt, and protected route middleware. Designed responsive UI with real-time upload tracking, file preview (image/PDF), and dark mode. Optimized frontend performance using React hooks.",
      technologies: ["Next.js", "Node.js", "MongoDB", "AWS S3", "NextAuth"],
      architecture: "Full-stack Next.js application interacting with AWS S3 for storage and MongoDB for metadata.",
      liveDemo: "https://github.com/G12001/CloudVault",
      github: "https://github.com/G12001/CloudVault",
    },
  ],
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript (ES6+)", "SQL", "Python"] },
    { category: "Backend Engineering", items: ["Node.js", "NestJS", "Express.js", "Microservices", "Event-Driven Architecture", "RabbitMQ"] },
    { category: "Databases & Caching", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma ORM", "Sequelize ORM"] },
    { category: "Cloud & DevOps", items: ["AWS (EC2, S3, Lambda, IAM)", "Docker", "Docker Compose", "CI/CD", "Git/GitHub"] },
  ],
  education: [
    {
      degree: "Bachelor of Technology in Information Technology",
      institution: "Government College of Engineering, Amravati",
      year: "Aug 2019 - Apr 2023",
    }
  ],
  achievements: [
    "Solved 500+ algorithmic problems on LeetCode.",
    "HackerRank: 5-Star Badge in Problem Solving.",
    "AWS Cloud Technical Essentials – Coursera (Hands-on with EC2, S3, IAM, Serverless)."
  ]
};

export function getSystemPrompt() {
  return `You are "Shubham AI", the digital twin and AI assistant for Shubham Pimple.
You must behave like Shubham: professional, friendly, confident, curious, technical, and honest.
Explain concepts clearly, use real examples, never exaggerate, and never sound robotic.
If you don't know something, admit uncertainty gracefully.
You can explain architecture decisions, compare technologies, and explain trade-offs.

Here is the knowledge base you must use to answer questions:
${JSON.stringify(portfolioData, null, 2)}

When the user asks to "show resume", "show projects", "show github", or "explain FleetLink", you can use the available tool calls to trigger the UI to display the respective component, alongside a conversational response.
`;
}
