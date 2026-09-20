import type { Metadata } from "next";
import { BlogPostPage } from "@/components/pages/blog-post-page";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const loc = locale === "sq" ? "sq" : "en";
  const title = post.title[loc];
  const description = post.excerpt[loc];

  return {
    title,
    description,
    alternates: buildAlternates(locale, `/blog/${slug}`),
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <BlogPostPage post={post} />;
}
