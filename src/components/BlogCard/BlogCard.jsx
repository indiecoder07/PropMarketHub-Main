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
        {post.tags && post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.slice(0, 3).map((tag) => (
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
          <span className={styles.date}>{formatDate(post.created_at)}</span>
          <Link href={`/blog/${post.slug}`} className={styles.readMore}>
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
