export interface Module {
  name: string;
  hours: number;
  topics: string[];
}

export interface Course {
  slug: string;
  category: "webdev" | "adults";
  icon: string;
  color: "cyan" | "purple" | "pink";
  duration: string;
  totalHours: number;
  weeks: number;
  /** Not yet set for courses still being finalized (e.g. Web Development) — render a "coming soon" state instead of a number. */
  price?: number;
  modules: Module[];
}

export const courses: Course[] = [
  {
    slug: "web-development",
    category: "webdev",
    icon: "Code2",
    color: "cyan",
    duration: "2 months",
    totalHours: 24,
    weeks: 6,
    modules: [
      {
        name: "HTML5 & CSS3",
        hours: 8,
        topics: [
          "Semantic HTML5 structure",
          "Advanced CSS: animations, transitions",
          "Flexbox & CSS Grid mastery",
          "Responsive design & media queries",
        ],
      },
      {
        name: "JavaScript",
        hours: 10,
        topics: [
          "Variables, data types & operators",
          "Arrays, objects & functions",
          "DOM manipulation & events",
          "Async/await & Fetch API",
          "ES6+ modern features",
        ],
      },
      {
        name: "React",
        hours: 8,
        topics: [
          "Components & JSX",
          "Props, state & hooks",
          "React Router & navigation",
          "API integration with axios",
          "Building a complete SPA",
        ],
      },
      {
        name: "Node.js & Express",
        hours: 8,
        topics: [
          "Server-side JavaScript basics",
          "Express.js routing & middleware",
          "REST API development",
          "Authentication basics",
        ],
      },
      {
        name: "MongoDB",
        hours: 4,
        topics: [
          "NoSQL vs SQL databases",
          "MongoDB Atlas setup",
          "CRUD operations with Mongoose",
          "Data relationships & queries",
        ],
      },
      {
        name: "Portfolio Projects & Git",
        hours: 6,
        topics: [
          "Git workflow: branches, merge, pull requests",
          "Project 1: Full-stack web application",
          "Project 2: API-driven project",
          "Portfolio presentation & deployment",
        ],
      },
    ],
  },
  {
    slug: "python-fullstack",
    category: "adults",
    icon: "BrainCircuit",
    color: "purple",
    duration: "2 months",
    totalHours: 24,
    weeks: 6,
    price: 99,
    modules: [
      {
        name: "Python Fundamentals",
        hours: 10,
        topics: [
          "Data types, variables & operators",
          "Lists, tuples, dictionaries & sets",
          "Control flow & loops",
          "Functions, classes & OOP",
          "File handling & exceptions",
        ],
      },
      {
        name: "Django Framework",
        hours: 12,
        topics: [
          "MVT architecture & project setup",
          "Views, URLs & templates",
          "Models & database relationships",
          "Forms, CSRF & authentication",
          "Django REST Framework basics",
          "Static files & deployment",
        ],
      },
      {
        name: "Frontend (HTML/CSS/JS)",
        hours: 8,
        topics: [
          "HTML5 & CSS3 essentials",
          "JavaScript fundamentals",
          "Bootstrap responsive design",
          "Connecting frontend to Django",
        ],
      },
      {
        name: "AI Integration",
        hours: 8,
        topics: [
          "Python for data processing",
          "Working with AI APIs (OpenAI, etc.)",
          "Building AI-powered features",
          "Prompt engineering basics",
        ],
      },
      {
        name: "Projects & Deployment",
        hours: 8,
        topics: [
          "Git & GitHub workflow",
          "Project 1: Django web app with AI",
          "Project 2: REST API project",
          "Deployment to cloud (AWS/Railway)",
        ],
      },
    ],
  },
  {
    slug: "javascript-mern",
    category: "adults",
    icon: "Code2",
    color: "cyan",
    duration: "2 months",
    totalHours: 24,
    weeks: 6,
    price: 99,
    modules: [
      {
        name: "JavaScript Advanced",
        hours: 8,
        topics: [
          "ES6+ features deep dive",
          "Async programming & Promises",
          "Closures, prototypes & classes",
          "Error handling & debugging",
        ],
      },
      {
        name: "React.js",
        hours: 10,
        topics: [
          "Component architecture & JSX",
          "Hooks: useState, useEffect, useContext",
          "React Router & navigation",
          "State management patterns",
          "Forms & API integration",
        ],
      },
      {
        name: "Node.js & Express",
        hours: 8,
        topics: [
          "Server fundamentals & npm",
          "Express routing & middleware",
          "REST API best practices",
          "Authentication with JWT",
        ],
      },
      {
        name: "MongoDB & Mongoose",
        hours: 6,
        topics: [
          "Document database design",
          "Mongoose schemas & models",
          "CRUD operations & queries",
          "Aggregation pipeline",
        ],
      },
      {
        name: "AI & Modern Tools",
        hours: 4,
        topics: [
          "AI coding assistants in workflow",
          "Building AI-powered features",
          "TypeScript introduction",
        ],
      },
      {
        name: "Portfolio Projects",
        hours: 8,
        topics: [
          "Project 1: Full MERN application",
          "Project 2: Real-time app with WebSockets",
          "Deployment & CI/CD basics",
          "Portfolio & career preparation",
        ],
      },
    ],
  },
  {
    slug: "golang",
    category: "adults",
    icon: "Server",
    color: "cyan",
    duration: "2 months",
    totalHours: 24,
    weeks: 6,
    price: 99,
    modules: [
      {
        name: "Go Fundamentals",
        hours: 10,
        topics: [
          "Variables, types & control flow",
          "Functions, methods & interfaces",
          "Structs & pointers",
          "Error handling patterns",
          "Packages & modules",
        ],
      },
      {
        name: "Concurrency",
        hours: 6,
        topics: [
          "Goroutines & channels",
          "Select statements & patterns",
          "Sync package & mutexes",
          "Concurrent design patterns",
        ],
      },
      {
        name: "Web Development with Go",
        hours: 10,
        topics: [
          "HTTP servers & routing (Gin/Chi)",
          "Middleware & request handling",
          "REST API development",
          "Database integration (PostgreSQL)",
          "Authentication & JWT",
        ],
      },
      {
        name: "Advanced Topics",
        hours: 6,
        topics: [
          "Testing in Go",
          "Docker & containerization",
          "gRPC & microservices intro",
          "AI API integration",
        ],
      },
      {
        name: "Portfolio Projects",
        hours: 8,
        topics: [
          "Project 1: REST API service",
          "Project 2: Concurrent data processor",
          "Deployment with Docker",
          "Code review & best practices",
        ],
      },
    ],
  },
  {
    slug: "dotnet-csharp",
    category: "adults",
    icon: "Layers",
    color: "pink",
    duration: "2 months",
    totalHours: 24,
    weeks: 6,
    price: 99,
    modules: [
      {
        name: "C# Fundamentals",
        hours: 10,
        topics: [
          "Data types, variables & operators",
          "OOP: classes, inheritance, polymorphism",
          "Interfaces & abstract classes",
          "Collections, LINQ & generics",
          "Async/await & Task",
        ],
      },
      {
        name: "ASP.NET Core",
        hours: 12,
        topics: [
          "MVC architecture & routing",
          "Controllers, views & Razor pages",
          "Entity Framework Core & migrations",
          "REST API with Web API",
          "Authentication & Identity",
          "Dependency injection",
        ],
      },
      {
        name: "Frontend Integration",
        hours: 6,
        topics: [
          "Razor views & tag helpers",
          "JavaScript interop",
          "Blazor introduction",
          "Bootstrap & responsive design",
        ],
      },
      {
        name: "Database & Cloud",
        hours: 8,
        topics: [
          "SQL Server & PostgreSQL",
          "Entity Framework relationships",
          "Repository pattern",
          "Azure deployment basics",
          "AI service integration",
        ],
      },
      {
        name: "Portfolio Projects",
        hours: 8,
        topics: [
          "Project 1: Full-stack ASP.NET app",
          "Project 2: Web API with database",
          "Unit testing with xUnit",
          "CI/CD & deployment",
        ],
      },
    ],
  },
];

/**
 * Single source of truth for category -> accent color mapping.
 * Used by both the homepage programs preview and the full programs page
 * so a course's accent color never shifts between the two views.
 */
export const categoryColorMap: Record<Course["category"], "cyan" | "purple" | "pink"> = {
  webdev: "cyan",
  adults: "pink",
};

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: Course["category"]): Course[] {
  return courses.filter((c) => c.category === category);
}
