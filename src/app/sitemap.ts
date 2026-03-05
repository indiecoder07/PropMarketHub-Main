import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://propmarkethub.com.au';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date('2025-03-01'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date('2025-03-01'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date('2025-03-01'), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/suburb-scorecard`, lastModified: new Date('2025-03-01'), changeFrequency: 'weekly', priority: 0.9 },
  ];

  // Blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts(true);
    blogPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // DB not connected — skip blog posts
  }

  return [...staticPages, ...blogPages];
}
