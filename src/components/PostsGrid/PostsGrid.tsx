'use client';

import { useState } from 'react';
import type { Post } from '@/lib/db';
import { BlogCard } from '@/components/BlogCard/BlogCard';
import styles from './PostsGrid.module.css';

interface PostsGridProps {
  posts: Post[];
}

/** Client component: renders category filter buttons + filtered post grid. */
export function PostsGrid({ posts }: PostsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Collect unique categories from posts
  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter((c): c is string => Boolean(c)))
  );

  const filtered =
    activeCategory === null
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      {categories.length > 0 && (
        <div className={styles.filters} role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`${styles.filterBtn} ${activeCategory === null ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className={styles.grid}>
        {filtered.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
