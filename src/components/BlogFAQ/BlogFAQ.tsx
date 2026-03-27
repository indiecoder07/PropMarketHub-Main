'use client';

import { useState } from 'react';
import styles from './BlogFAQ.module.css';

interface FAQ {
  question: string;
  answer: string;
}

interface BlogFAQProps {
  faqs: FAQ[];
}

/** Accordion-style FAQ section rendered from post.faqs JSONB data. */
export function BlogFAQ({ faqs }: BlogFAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>
      <dl className={styles.list}>
        {faqs.map((faq, i) => (
          <div key={i} className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}>
            <dt>
              <button
                type="button"
                className={styles.question}
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`${styles.chevron} ${open === i ? styles.chevronOpen : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </button>
            </dt>
            {open === i && (
              <dd className={styles.answer}>
                {faq.answer}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
