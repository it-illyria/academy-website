export const COURSE_NAMES: Record<string, string> = {
  "web-development": "Web Development",
  "python-fullstack": "Python Full-Stack",
  "javascript-mern": "JavaScript / MERN",
  golang: "Golang",
  "dotnet-csharp": ".NET / C#",
};

export const CATEGORY_LABELS: Record<string, string> = {
  webdev: "Web Development",
  adults: "Pro Tracks",
};

export interface FormData {
  // Step 1
  courseSlug: string;
  // Step 2
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  // Step 3
  experience: string;
  format: string;
  message: string;
}

export const INITIAL_FORM: FormData = {
  courseSlug: "",
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  experience: "none",
  format: "hybrid",
  message: "",
};

export const TOTAL_STEPS = 4;

export const inputCls =
  "w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";
export const selectCls =
  "w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";
