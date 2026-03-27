'use client';

import type { Heading } from '@/lib/blogContent';
import styles from './TableOfContents.module.css';

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings || headings.length < 2) return null;

  return (
    <nav className={styles.wrapper} aria-label="Table of contents">
      <p className={styles.title}>In this article</p>
      <ol className={styles.list}>
        {headings.map((h) => (
          <li
            key={h.id}
            className={`${styles.item} ${h.level === 3 ? styles.itemH3 : ''}`}
          >
            <a href={`#${h.id}`} className={styles.link}>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
