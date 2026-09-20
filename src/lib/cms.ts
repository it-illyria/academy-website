import { supabase } from "./supabase";
import { courses as hardcodedCourses, type Course } from "./courses";
import { blogPosts as hardcodedBlogPosts, type BlogPost } from "./blog-posts";
import { cohorts as hardcodedCohorts, type Cohort } from "./schedule-data";

// Minimal shapes of the raw rows returned by Supabase for each table. These
// mirror the DB column names (snake_case) before being mapped to the app's
// camelCase models below.
interface CourseRow {
  slug: string;
  category: string;
  icon: string;
  color: string;
  duration: string;
  total_hours: number;
  weeks: number;
  price: number;
  modules: Course["modules"] | null;
}

interface BlogPostRow {
  slug: string;
  category: string;
  date: string;
  read_time: number;
  title_sq: string;
  title_en: string;
  excerpt_sq: string;
  excerpt_en: string;
  content_sq: string;
  content_en: string;
}

interface CohortRow {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  spots_per_class: number;
  spots_taken: number;
  is_first: boolean;
  timetable: Cohort["timetable"] | null;
}

export async function getCourses(): Promise<Course[]> {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");

    if (!error && data && data.length > 0) {
      // Transform Supabase format to app format
      return (data as CourseRow[]).map((c) => ({
        slug: c.slug,
        category: c.category,
        icon: c.icon,
        color: c.color,
        duration: c.duration,
        totalHours: c.total_hours,
        weeks: c.weeks,
        price: c.price,
        modules: c.modules || [],
      })) as Course[];
    }
  } catch {
    console.log("[CMS] Supabase unavailable, using hardcoded courses");
  }
  return hardcodedCourses;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: false });

    if (!error && data && data.length > 0) {
      return (data as BlogPostRow[]).map((p) => ({
        slug: p.slug,
        category: p.category,
        date: p.date,
        readTime: p.read_time,
        title: { sq: p.title_sq, en: p.title_en },
        excerpt: { sq: p.excerpt_sq, en: p.excerpt_en },
        content: { sq: p.content_sq, en: p.content_en },
      })) as BlogPost[];
    }
  } catch {
    console.log("[CMS] Supabase unavailable, using hardcoded blog posts");
  }
  return hardcodedBlogPosts;
}

export async function getCohorts(): Promise<Cohort[]> {
  try {
    const { data, error } = await supabase
      .from("cohorts")
      .select("*")
      .eq("is_active", true)
      .order("start_date");

    if (!error && data && data.length > 0) {
      return (data as CohortRow[]).map((c) => ({
        id: c.id,
        name: c.name,
        startDate: c.start_date,
        endDate: c.end_date,
        spotsPerClass: c.spots_per_class,
        spotsTaken: c.spots_taken,
        isFirst: c.is_first,
        timetable: c.timetable || [],
      })) as Cohort[];
    }
  } catch {
    console.log("[CMS] Supabase unavailable, using hardcoded cohorts");
  }
  return hardcodedCohorts;
}
