import Link from 'next/link';
import type { Post } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import styles from './RelatedPosts.module.css';

interface RelatedPostsProps {
  currentSlug: string;
  currentTags: string[];
  allPosts: Post[];
}

/**
 * Shows up to 3 posts that share at least one tag with the current post.
 * Falls back to the 3 most recent posts if no tag overlap is found.
 */
export function RelatedPosts({ currentSlug, currentTags, allPosts }: RelatedPostsProps) {
  const otherPosts = allPosts.filter((p) => p.slug !== currentSlug);

  // Score posts by number of shared tags
  const scored = otherPosts.map((post) => ({
    post,
    score: (post.tags || []).filter((t) => currentTags.includes(t)).length,
  }));

  scored.sort((a, b) => b.score - a.score);

  const related = scored.slice(0, 3).map((s) => s.post);
  if (related.length === 0) return null;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>Related Articles</h2>
      <div className={styles.grid}>
        {related.map((post) => (
          <article key={post.slug} className={styles.card}>
            {post.cover_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.cover_image}
                alt={post.title}
                className={styles.cardImage}
                loading="lazy"
              />
            )}
            <div className={styles.cardBody}>
              {post.tags && post.tags.length > 0 && (
                <span className={styles.tag}>{post.tags[0]}</span>
              )}
              <h3 className={styles.cardTitle}>
                <Link href={`/blog/${post.slug}`} className={styles.cardTitleLink}>
                  {post.title}
                </Link>
              </h3>
              <p className={styles.cardMeta}>{formatDate(post.created_at)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
