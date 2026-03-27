import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { sanitizePostContent, injectHeadingIds, extractHeadings, getToolCTAForPost } from '@/lib/blogContent';
import { getAuthor } from '@/lib/authors';
import { ShareButtons } from '@/components/ShareButtons/ShareButtons';
import { AuthorBio } from '@/components/AuthorBio';
import { TableOfContents } from '@/components/TableOfContents';
import { ToolCTA } from '@/components/ToolCTA';
import { BlogFAQ } from '@/components/BlogFAQ';
import { RelatedPosts } from '@/components/RelatedPosts';
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
  let allPosts;
  try {
    [post, allPosts] = await Promise.all([
      getPostBySlug(slug),
      getAllPosts(true),
    ]);
  } catch {
    notFound();
  }
  if (!post || !post.published) notFound();

  // Process HTML content
  const sanitized  = sanitizePostContent(post.content);
  const withIds    = injectHeadingIds(sanitized);
  const headings   = extractHeadings(withIds);
  const toolCTA    = getToolCTAForPost(post.tags || [], post.title);
  const author     = getAuthor(post.author);
  const postUrl    = `https://propmarkethub.com.au/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type':       'BlogPosting',
        '@id':         `${postUrl}#article`,
        headline:      post.title,
        description:   post.excerpt,
        datePublished: post.created_at,
        dateModified:  post.updated_at,
        url:           postUrl,
        inLanguage:    'en-AU',
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
          name:    author.name,
          url:     author.url,
          jobTitle: author.role,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id':   postUrl,
        },
        ...(post.cover_image && { image: post.cover_image }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://propmarkethub.com.au' },
          { '@type': 'ListItem', position: 2, name: 'Blog',  item: 'https://propmarkethub.com.au/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
        ],
      },
      // FAQPage schema when post has FAQ items
      ...(post.faqs && post.faqs.length > 0
        ? [{
            '@type': 'FAQPage',
            mainEntity: post.faqs.map((faq) => ({
              '@type':          'Question',
              name:             faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text:    faq.answer,
              },
            })),
          }]
        : []),
    ],
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
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/"     className={styles.breadcrumbLink}>Home</Link>
            {' / '}
            <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
            {' / '}
            <span className={styles.breadcrumbCurrent}>{post.title}</span>
          </nav>

          {/* Category + Tags */}
          <div className={styles.tags}>
            {post.category && (
              <span className={`${styles.tag} ${styles.tagCategory}`}>{post.category}</span>
            )}
            {post.tags && post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <h1 className={styles.title}>{post.title}</h1>

          {/* Byline with author link + read time */}
          <div className={styles.meta}>
            <span>
              By{' '}
              <Link href={author.url} className={styles.authorLink}>
                {author.name}
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
            {post.read_time && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.read_time}</span>
              </>
            )}
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

          {/* Table of Contents */}
          <TableOfContents headings={headings} />

          {/* Body content — frontmatter stripped, heading IDs injected */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: withIds }} />

          {/* Inline tool CTA (matched from tags + title) */}
          {toolCTA && (
            <ToolCTA
              label={toolCTA.label}
              href={toolCTA.href}
              description={toolCTA.description}
            />
          )}

          {/* FAQ Accordion */}
          {post.faqs && post.faqs.length > 0 && (
            <BlogFAQ faqs={post.faqs} />
          )}

          {/* Author Bio */}
          <AuthorBio author={author} />

          {/* Share */}
          <ShareButtons
            url={postUrl}
            title={post.title}
          />

          {/* Related Posts */}
          {allPosts && allPosts.length > 1 && (
            <RelatedPosts
              currentSlug={post.slug}
              currentTags={post.tags || []}
              allPosts={allPosts}
            />
          )}

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
