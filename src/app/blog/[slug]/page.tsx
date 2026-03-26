import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/db';
import { formatDate, stripYamlFrontmatter } from '@/lib/utils';
import { ShareButtons } from '@/components/ShareButtons/ShareButtons';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found', robots: { index: false, follow: false } };

    const title       = post.meta_title       || post.title;
    const description = post.meta_description || post.excerpt;
    const url         = `https://propmarkethub.com.au/blog/${slug}`;
    const images      = post.cover_image
      ? [{ url: post.cover_image, alt: post.title }]
      : [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: title }];

    return {
      title,
      description,
      alternates: { canonical: url },
      robots:     { index: true, follow: true },
      openGraph: {
        type:          'article',
        locale:        'en_AU',
        siteName:      'PropMarketHub',
        url,
        title,
        description,
        publishedTime: post.created_at,
        modifiedTime:  post.updated_at,
        authors:       [post.author],
        images,
      },
      twitter: {
        card:        'summary_large_image',
        site:        '@propmarkethub',
        title,
        description,
        images:      [images[0].url],
      },
    };
  } catch {
    return { title: 'Blog' };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts(true);
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }
  if (!post || !post.published) notFound();

  const jsonLd = {
    '@context':    'https://schema.org',
    '@type':       'BlogPosting',
    headline:      post.title,
    description:   post.excerpt,
    datePublished: post.created_at,
    dateModified:  post.updated_at,
    publisher: {
      '@type': 'Organization',
      name:    'PropMarketHub',
      url:     'https://propmarkethub.com.au',
      logo: {
        '@type': 'ImageObject',
        url:     'https://propmarkethub.com.au/propmarkethub-logo.png',
      },
    },
    author: {
      '@type': 'Person',
      name:    post.author,
      url:     'https://propmarkethub.com.au/about',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id':   `https://propmarkethub.com.au/blog/${post.slug}`,
    },
    inLanguage: 'en-AU',
    ...(post.cover_image && { image: post.cover_image }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className={styles.article}>
        <div className={`container ${styles.container}`}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link href="/"     className={styles.breadcrumbLink}>Home</Link>
            {' / '}
            <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
            {' / '}
            <span className={styles.breadcrumbCurrent}>{post.title}</span>
          </nav>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}

          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.meta}>
            <span>By {post.author}</span>
            <span>·</span>
            <time>{formatDate(post.created_at)}</time>
          </div>

          {/* Cover image */}
          {post.cover_image && (
            <div className={styles.coverWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image}
                alt={post.title}
                className={styles.coverImage}
              />
            </div>
          )}

          {/* Content — frontmatter stripped defensively in case content was imported with YAML headers */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: stripYamlFrontmatter(post.content) }} />

          {/* Share */}
          <ShareButtons
            url={`https://propmarkethub.com.au/blog/${post.slug}`}
            title={post.title}
          />

          {/* Back link */}
          <div className={styles.backSection}>
            <Link href="/blog" className={styles.backLink}>
              ← Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
