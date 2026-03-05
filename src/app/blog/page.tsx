import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/db';
import { BlogCard } from '@/components/BlogCard/BlogCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title:       'Property Investment Blog — Market Insights & Suburb Analysis',
  description: 'Expert property investment articles for Australian investors — suburb analysis, mortgage guides, stamp duty explainers, and rental yield strategies. Start reading.',
  alternates:  { canonical: 'https://propmarkethub.com.au/blog' },
  robots:      { index: true, follow: true },
  openGraph: {
    type:        'website',
    locale:      'en_AU',
    siteName:    'PropMarketHub',
    url:         'https://propmarkethub.com.au/blog',
    title:       'Property Investment Blog | PropMarketHub',
    description: 'Suburb deep-dives, mortgage guides, stamp duty explainers, and rental yield strategies for Australian property investors.',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'PropMarketHub Blog — Property Investment Insights for Australia' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@propmarkethub',
    title:       'Property Investment Blog | PropMarketHub',
    description: 'Suburb analysis, mortgage guides, and rental yield strategies for Australian investors.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  },
};

export const revalidate = 60;

export default async function BlogListingPage() {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];

  try {
    posts = await getAllPosts(true);
  } catch {
    // DB not connected yet — show empty state
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type':    'CollectionPage',
    '@id':      'https://propmarkethub.com.au/blog/#webpage',
    name:       'Property Investment Blog — PropMarketHub',
    description:'Expert property investment articles for Australian investors — suburb analysis, mortgage guides, stamp duty explainers, and rental yield strategies.',
    url:        'https://propmarkethub.com.au/blog',
    isPartOf:   { '@id': 'https://propmarkethub.com.au/#website' },
    publisher:  { '@id': 'https://propmarkethub.com.au/#organization' },
    inLanguage: 'en-AU',
    ...(posts.length > 0 && {
      hasPart: posts.map((p) => ({
        '@type':        'BlogPosting',
        headline:       p.title,
        url:            `https://propmarkethub.com.au/blog/${p.slug}`,
        datePublished:  p.created_at,
        dateModified:   p.updated_at,
        description:    p.excerpt,
        author:         { '@type': 'Organization', name: p.author },
      })),
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

    <section className={styles.section}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.heading}>
            Property Investment <span className={styles.headingAccent}>Blog</span>
          </h1>
          <p className={styles.subheading}>
            Suburb analysis, mortgage guides, stamp duty explainers, and rental yield strategies for
            Australian property investors.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No posts yet</p>
            <p className={styles.emptyText}>New articles are coming soon. Check back shortly!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
}
