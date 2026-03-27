import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import styles from './BlogCard.module.css';

export function BlogCard({ post }) {
  return (
    <article className={styles.card}>
      {post.cover_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.coverImage}
          src={post.cover_image}
          alt={post.title}
          loading="lazy"
        />
      )}

      <div className={styles.body}>
        {/* Category pill + tags */}
        {(post.category || (post.tags && post.tags.length > 0)) && (
          <div className={styles.tags}>
            {post.category && (
              <span className={`${styles.tag} ${styles.tagCategory}`}>
                {post.category}
              </span>
            )}
            {post.tags && post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className={styles.title}>
          <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </h3>

        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.footer}>
          <div className={styles.meta}>
            <span className={styles.author}>{post.author || 'PropMarketHub'}</span>
            <span className={styles.metaDot} aria-hidden="true">·</span>
            <time className={styles.date}>{formatDate(post.created_at)}</time>
            {post.read_time && (
              <>
                <span className={styles.metaDot} aria-hidden="true">·</span>
                <span className={styles.readTime}>{post.read_time}</span>
              </>
            )}
          </div>
          <Link href={`/blog/${post.slug}`} className={styles.readMore}>
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
