import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/db';
import { getAuthor } from '@/lib/authors';
import { formatDate } from '@/lib/utils';
import styles from './page.module.css';

const AUTHOR_NAME = 'Mayank Ghosh';
const author = getAuthor(AUTHOR_NAME);

export const metadata: Metadata = {
  title: `${author.name} — Licensed Buyer's Agent & Property Investment Specialist`,
  description:
    "Mayank Ghosh is a licensed real estate agent and buyer's agent at Blue Hill Real Estate, specialising in NSW property investment. Data-driven suburb analysis for buyers and investors across Greater Sydney.",
  alternates: { canonical: 'https://propmarkethub.com.au/mayank-ghosh' },
  robots: { index: true, follow: true },
  openGraph: {
    type:        'profile',
    locale:      'en_AU',
    siteName:    'PropMarketHub',
    url:         'https://propmarkethub.com.au/mayank-ghosh',
    title:       `${author.name} — Licensed Buyer's Agent | PropMarketHub`,
    description: "Licensed real estate agent and buyer's agent at Blue Hill Real Estate. Data-driven NSW property investment advice for buyers and investors.",
    images: author.image
      ? [{ url: `https://propmarkethub.com.au${author.image}`, width: 800, height: 800, alt: author.name }]
      : [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'PropMarketHub' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@propmarkethub',
    title:       `${author.name} — Licensed Buyer's Agent | PropMarketHub`,
    description: "Data-driven NSW property investment advice from a licensed buyer's agent.",
    images: author.image
      ? [`https://propmarkethub.com.au${author.image}`]
      : ['https://propmarkethub.com.au/og-image.png'],
  },
};

export const revalidate = 300;

const EXPERTISE_AREAS = [
  { icon: '🏙️', label: 'Greater Sydney',         desc: 'Deep knowledge of micro-markets across all Sydney councils and growth corridors.' },
  { icon: '📊', label: 'Data-Driven Analysis',   desc: 'Suburb trends, yield potential, demographic shifts and supply-demand dynamics in every property brief.' },
  { icon: '🏡', label: 'First Home Buyers',       desc: 'Grants, FHBAS, LMI strategies and suburb selection for buyers entering the market.' },
  { icon: '📈', label: 'Investment Strategy',     desc: 'Identifying high-potential opportunities in emerging corridors before they hit the mainstream.' },
  { icon: '🔍', label: 'Buyer\'s Advocacy',       desc: 'Independent representation — searching, evaluating and negotiating on behalf of buyers.' },
  { icon: '🌏', label: 'Regional NSW',            desc: 'Beyond Sydney: regional growth markets with strong yield and long-term capital fundamentals.' },
];

export default async function MayankGhoshPage() {
  let authorPosts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    const allPosts = await getAllPosts(true);
    authorPosts = allPosts.filter(
      (p) => p.author === AUTHOR_NAME || p.author === 'Mayank Ghosh'
    );
  } catch {
    // DB unavailable — show page without posts
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type':       'Person',
        '@id':         'https://propmarkethub.com.au/mayank-ghosh#person',
        name:          author.name,
        jobTitle:      author.role,
        worksFor: {
          '@type': 'Organization',
          name:    author.affiliation,
        },
        url:           'https://propmarkethub.com.au/mayank-ghosh',
        description:   author.shortBio,
        knowsAbout:    author.expertise,
        ...(author.image && {
          image: {
            '@type': 'ImageObject',
            url:     `https://propmarkethub.com.au${author.image}`,
          },
        }),
        ...(author.sameAs && { sameAs: author.sameAs }),
      },
      {
        '@type':    'ProfilePage',
        '@id':      'https://propmarkethub.com.au/mayank-ghosh#webpage',
        name:       `${author.name} — Author Profile`,
        url:        'https://propmarkethub.com.au/mayank-ghosh',
        isPartOf:   { '@id': 'https://propmarkethub.com.au/#website' },
        about:      { '@id': 'https://propmarkethub.com.au/mayank-ghosh#person' },
        inLanguage: 'en-AU',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://propmarkethub.com.au' },
          { '@type': 'ListItem', position: 2, name: author.name, item: 'https://propmarkethub.com.au/mayank-ghosh' },
        ],
      },
    ],
  };

  // Split bio into paragraphs
  const bioParagraphs = author.bio.split('\n\n').filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            {' / '}
            <span className={styles.breadcrumbCurrent}>{author.name}</span>
          </nav>

          <div className={styles.heroInner}>
            {/* Photo */}
            <div className={styles.photoWrapper}>
              {author.image ? (
                <Image
                  src={author.image}
                  alt={`${author.name} — ${author.role}`}
                  width={280}
                  height={280}
                  className={styles.photo}
                  priority
                />
              ) : (
                <div className={styles.photoPlaceholder} aria-hidden="true">
                  {author.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Identity */}
            <div className={styles.identity}>
              <p className={styles.eyebrow}>About the Author</p>
              <h1 className={styles.name}>{author.name}</h1>
              <p className={styles.role}>{author.role}</p>
              {author.affiliation && (
                <p className={styles.affiliation}>{author.affiliation}</p>
              )}

              <div className={styles.badges}>
                <span className={styles.badge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Licensed Real Estate Agent
                </span>
                <span className={styles.badge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Licensed Buyer&apos;s Agent
                </span>
                <span className={styles.badge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  NSW Property Specialist
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className={styles.bioSection}>
        <div className="container">
          <div className={styles.bioLayout}>
            <div className={styles.bioContent}>
              <h2 className={styles.sectionHeading}>About Mayank</h2>
              {bioParagraphs.map((para, i) => (
                <p key={i} className={styles.bioPara}>{para}</p>
              ))}
            </div>

            {/* Sidebar — contact / tools */}
            <aside className={styles.sidebar}>
              <div className={styles.sideCard}>
                <p className={styles.sideCardHeading}>Work with Mayank</p>
                <p className={styles.sideCardBody}>
                  Looking for independent buyer&apos;s advocacy or investment advice in NSW? Mayank works
                  with buyers and investors across Greater Sydney and regional NSW.
                </p>
                <a
                  href="https://www.thebluehill.com.au/agent-profile?agent_id=42003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaBtn}
                >
                  Contact Mayank Ghosh →
                </a>
              </div>

              <div className={styles.sideCard}>
                <p className={styles.sideCardHeading}>Free Research Tools</p>
                <p className={styles.sideCardBody}>
                  Use the same data tools Mayank references when building a property case for clients.
                </p>
                <Link href="/suburb-scorecard" className={styles.toolLink}>🏙️ Suburb Scorecard</Link>
                <Link href="/rental-yield-calculator" className={styles.toolLink}>📈 Rental Yield Calculator</Link>
                <Link href="/stamp-duty-calculator" className={styles.toolLink}>📋 Stamp Duty Calculator</Link>
                <Link href="/borrowing-power-calculator" className={styles.toolLink}>🏦 Borrowing Power Calculator</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Expertise ── */}
      <section className={styles.expertiseSection}>
        <div className="container">
          <h2 className={styles.sectionHeading}>Areas of Expertise</h2>
          <div className={styles.expertiseGrid}>
            {EXPERTISE_AREAS.map((area) => (
              <div key={area.label} className={styles.expertiseCard}>
                <span className={styles.expertiseIcon} aria-hidden="true">{area.icon}</span>
                <h3 className={styles.expertiseLabel}>{area.label}</h3>
                <p className={styles.expertiseDesc}>{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles ── */}
      {authorPosts.length > 0 && (
        <section className={styles.articlesSection}>
          <div className="container">
            <h2 className={styles.sectionHeading}>
              Articles by {author.name}
              <span className={styles.articleCount}>{authorPosts.length}</span>
            </h2>
            <div className={styles.articlesGrid}>
              {authorPosts.map((post) => (
                <article key={post.slug} className={styles.articleCard}>
                  {post.cover_image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className={styles.articleImage}
                      loading="lazy"
                    />
                  )}
                  <div className={styles.articleBody}>
                    {post.category && (
                      <span className={styles.articleCategory}>{post.category}</span>
                    )}
                    <h3 className={styles.articleTitle}>
                      <Link href={`/blog/${post.slug}`} className={styles.articleTitleLink}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className={styles.articleExcerpt}>{post.excerpt}</p>
                    <div className={styles.articleMeta}>
                      <time className={styles.articleDate}>{formatDate(post.created_at)}</time>
                      {post.read_time && (
                        <span className={styles.articleReadTime}>{post.read_time}</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── No articles fallback ── */}
      {authorPosts.length === 0 && (
        <section className={styles.articlesSection}>
          <div className="container">
            <h2 className={styles.sectionHeading}>Articles by {author.name}</h2>
            <div className={styles.noArticles}>
              <p>Articles coming soon. In the meantime, explore our property research tools below.</p>
              <Link href="/blog" className={styles.ctaBtn}>Browse All Articles →</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
