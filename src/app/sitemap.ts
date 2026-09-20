import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { courses } from "@/lib/courses";

const BASE_URL = "https://likaacademy.al";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["sq", "en"];

  const staticPages = [
    "",
    "/programs",
    "/about",
    "/contact",
    "/enroll",
    "/blog",
    "/stories",
    "/schedule",
    "/calculator",
    "/compare",
    "/playground",
    "/referral",
    "/instructors",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page === "/programs" ? 0.9 : 0.7,
      });
    }
  }

  // Course pages
  for (const locale of locales) {
    for (const course of courses) {
      entries.push({
        url: `${BASE_URL}/${locale}/programs/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Blog posts
  for (const locale of locales) {
    for (const post of blogPosts) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
