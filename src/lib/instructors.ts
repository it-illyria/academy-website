export interface Instructor {
  id: string;
  name: string;
  role: { sq: string; en: string };
  bio: { sq: string; en: string };
  experience: number;
  specialties: string[];
  courses: string[];
  avatar: string;
  color: "primary" | "cyber" | "pink";
  isFounder?: boolean;
}

export const instructors: Instructor[] = [
  {
    id: "simi",
    name: "Simi",
    role: {
      sq: "Themelues & Lead Instructor",
      en: "Founder & Lead Instructor",
    },
    bio: {
      sq: "Themelues i Lika Academy dhe instruktor kryesor. Përvojë në programim full-stack, AI dhe menaxhim projektesh. I përkushtuar për të transformuar edukimin teknologjik në Shqipëri.",
      en: "Founder of Lika Academy and lead instructor. Experience in full-stack programming, AI and project management. Dedicated to transforming tech education in Albania.",
    },
    experience: 5,
    specialties: ["Python", "JavaScript", "React", "Next.js", "AI"],
    courses: [
      "python-fullstack",
      "javascript-mern",
      "web-development",
      "golang",
      "dotnet-csharp",
    ],
    avatar: "S",
    color: "primary",
    isFounder: true,
  },
];
