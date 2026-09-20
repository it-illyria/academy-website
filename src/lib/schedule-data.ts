export interface TimeSlot {
  time: string;
  saturday: string; // course slug or empty
  sunday: string;
}

export interface Cohort {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  spotsPerClass: number;
  spotsTaken: number;
  isFirst?: boolean;
  timetable: TimeSlot[];
}

export const cohorts: Cohort[] = [
  {
    id: "may-2026",
    name: "May 2026",
    startDate: "2026-05-02",
    endDate: "2026-06-14",
    spotsPerClass: 12,
    spotsTaken: 0,
    isFirst: true,
    timetable: [
      { time: "08:00 - 10:00", saturday: "open", sunday: "open" },
      { time: "10:00 - 12:00", saturday: "open", sunday: "open" },
      { time: "12:00 - 14:00", saturday: "open", sunday: "open" },
      { time: "14:00 - 16:00", saturday: "open", sunday: "open" },
    ],
  },
  {
    id: "jun-2026",
    name: "June 2026",
    startDate: "2026-06-06",
    endDate: "2026-07-19",
    spotsPerClass: 12,
    spotsTaken: 0,
    timetable: [
      { time: "08:00 - 10:00", saturday: "open", sunday: "open" },
      { time: "10:00 - 12:00", saturday: "open", sunday: "open" },
      { time: "12:00 - 14:00", saturday: "open", sunday: "open" },
      { time: "14:00 - 16:00", saturday: "open", sunday: "open" },
    ],
  },
  {
    id: "jul-2026",
    name: "July 2026",
    startDate: "2026-07-04",
    endDate: "2026-08-16",
    spotsPerClass: 12,
    spotsTaken: 0,
    timetable: [
      { time: "08:00 - 10:00", saturday: "open", sunday: "open" },
      { time: "10:00 - 12:00", saturday: "open", sunday: "open" },
      { time: "12:00 - 14:00", saturday: "open", sunday: "open" },
      { time: "14:00 - 16:00", saturday: "open", sunday: "open" },
    ],
  },
];

export const courseLabels: Record<string, string> = {
  "python-fullstack": "Python Full-Stack",
  "javascript-mern": "JavaScript / MERN",
  golang: "Golang",
  "dotnet-csharp": ".NET / C#",
  "web-development": "Web Development",
};

export const courseColors: Record<string, { bg: string; text: string; border: string }> = {
  "python-fullstack": { bg: "bg-cyber/15", text: "text-cyber", border: "border-cyber/30" },
  "javascript-mern": { bg: "bg-primary/15", text: "text-primary", border: "border-primary/30" },
  golang: { bg: "bg-[oklch(0.7_0.2_160)]/15", text: "text-[oklch(0.7_0.2_160)]", border: "border-[oklch(0.7_0.2_160)]/30" },
  "dotnet-csharp": { bg: "bg-[oklch(0.7_0.15_320)]/15", text: "text-[oklch(0.7_0.15_320)]", border: "border-[oklch(0.7_0.15_320)]/30" },
  "web-development": { bg: "bg-cyber/15", text: "text-cyber", border: "border-cyber/30" },
};
