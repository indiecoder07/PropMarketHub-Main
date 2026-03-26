import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { getAllPosts } from '@/lib/db';

interface SuburbEntry {
  slug: string;
  lastUpdated: string;
}

function loadSuburbs(): SuburbEntry[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'nsw_suburb_scores.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as SuburbEntry[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://propmarkethub.com.au';
  const today = new Date('2026-03-26');

  // ── Static pages ───────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                                          lastModified: today,                      changeFrequency: 'weekly',  priority: 1.0  },
    { url: `${baseUrl}/about`,                              lastModified: today,                      changeFrequency: 'monthly', priority: 0.6  },
    { url: `${baseUrl}/blog`,                               lastModified: today,                      changeFrequency: 'daily',   priority: 0.8  },
    { url: `${baseUrl}/suburb-scorecard`,                   lastModified: new Date('2026-02-01'),     changeFrequency: 'monthly', priority: 0.9  },
    { url: `${baseUrl}/suburb-scorecard/faq`,               lastModified: new Date('2026-02-01'),     changeFrequency: 'monthly', priority: 0.7  },
    { url: `${baseUrl}/suburb-scorecard/top-10-nsw-investment-suburbs`, lastModified: new Date('2026-02-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/suburb-scorecard/compare`,           lastModified: new Date('2026-02-01'),     changeFrequency: 'monthly', priority: 0.8  },
    { url: `${baseUrl}/mortgage-calculator`,                lastModified: new Date('2026-03-01'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/stamp-duty-calculator`,              lastModified: today,                      changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/rental-yield-calculator`,            lastModified: new Date('2026-03-01'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/borrowing-power-calculator`,         lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/loan-comparison-calculator`,         lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/extra-repayment-calculator`,         lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/house-land-package-calculator`,      lastModified: today,                      changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/cash-flow-calculator`,               lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/negative-gearing-calculator`,        lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/brrrr-calculator`,                   lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/property-investment-calculator`,     lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/first-home-buyer-calculator`,        lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/home-equity-calculator`,             lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/property-purchase-costs-calculator`, lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/rent-vs-buy-calculator`,             lastModified: new Date('2026-03-05'),     changeFrequency: 'monthly', priority: 0.85 },
  ];

  // ── Blog posts ─────────────────────────────────────────────────────────────
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

  // ── Suburb detail pages (488 NSW suburbs) ──────────────────────────────────
  const suburbs = loadSuburbs();
  const suburbPages: MetadataRoute.Sitemap = suburbs.map((suburb) => ({
    url: `${baseUrl}/suburb-scorecard/suburb/nsw/${suburb.slug}`,
    lastModified: new Date(suburb.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticPages, ...blogPages, ...suburbPages];
}
