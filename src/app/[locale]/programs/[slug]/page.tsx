import type { Metadata } from "next";
import { CourseDetailPage } from "@/components/pages/course-detail-page";
import { courses, getCourse } from "@/lib/courses";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/lib/seo";

/**
 * Course display names. Kept local to this route (not translated — these
 * are technology/brand names that read identically in sq and en, matching
 * the same map used in course-detail-page.tsx).
 */
const courseNames: Record<string, string> = {
  "web-development": "Web Development",
  "python-fullstack": "Python Full-Stack",
  "javascript-mern": "JavaScript / MERN",
  golang: "Golang",
  "dotnet-csharp": ".NET / C#",
};

const courseDescriptions: Record<string, { sq: string; en: string }> = {
  "web-development": {
    sq: "Mëso zhvillim web frontend dhe backend me HTML, CSS, JavaScript, React, Node.js dhe MongoDB. Ndërto aplikacione web të plota në 6 javë mësim + 4 javë projekte.",
    en: "Master frontend and backend web development with HTML, CSS, JavaScript, React, Node.js and MongoDB. Build complete web applications over 6 weeks of lessons + 4 weeks of projects.",
  },
  "python-fullstack": {
    sq: "Ndërto aplikacione web të fuqishme me Python dhe Django. Përfshin integrim AI dhe deployment në cloud. 2 muaj, 99€ çmim lansimi.",
    en: "Build powerful web applications with Python and Django. Includes AI integration and cloud deployment. 2 months, 99€ launch price.",
  },
  "javascript-mern": {
    sq: "Bëhu zhvillues full-stack JavaScript me stack-un MERN: React, Node.js, Express dhe MongoDB. 2 muaj, 99€ çmim lansimi.",
    en: "Become a full-stack JavaScript developer with the MERN stack: React, Node.js, Express and MongoDB. 2 months, 99€ launch price.",
  },
  golang: {
    sq: "Mëso Go — gjuhën e infrastrukturës cloud. Konkurrencë, API-të, Docker dhe microservices. 2 muaj, 99€ çmim lansimi.",
    en: "Learn Go — the language of cloud infrastructure. Concurrency, APIs, Docker and microservices. 2 months, 99€ launch price.",
  },
  "dotnet-csharp": {
    sq: "Zotëro zhvillimin enterprise me C# dhe ASP.NET Core. Entity Framework, Azure dhe pattern-e moderne. 2 muaj, 99€ çmim lansimi.",
    en: "Master enterprise development with C# and ASP.NET Core. Entity Framework, Azure and modern patterns. 2 months, 99€ launch price.",
  },
};

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const course = getCourse(slug);

  if (!course) {
    return {};
  }

  const name = courseNames[slug] ?? slug;
  const description =
    courseDescriptions[slug]?.[locale === "sq" ? "sq" : "en"] ??
    courseDescriptions[slug]?.en ??
    name;
  const title = `${name} — Lika Academy`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, `/programs/${slug}`),
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const name = courseNames[slug] ?? slug;
  const description = courseDescriptions[slug]?.en ?? name;

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Lika Academy",
      url: "https://likaacademy.al",
    },
    courseMode: "blended",
    ...(course.price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: course.price,
            priceCurrency: "EUR",
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <CourseDetailPage course={course} />
    </>
  );
}
