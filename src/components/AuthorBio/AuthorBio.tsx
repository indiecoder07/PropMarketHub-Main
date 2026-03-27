import Image from 'next/image';
import Link from 'next/link';
import type { Author } from '@/lib/authors';
import styles from './AuthorBio.module.css';

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        {author.image ? (
          <Image
            src={author.image}
            alt={author.name}
            width={64}
            height={64}
            className={styles.avatarImg}
          />
        ) : (
          <div className={styles.avatarInitial} aria-hidden="true">
            {author.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.label}>Written by</p>
        <p className={styles.name}>
          <Link href={author.url} className={styles.nameLink}>
            {author.name}
          </Link>
        </p>
        <p className={styles.role}>
          {author.role}
          {author.affiliation && ` · ${author.affiliation}`}
        </p>
        {/* Use shortBio for compact card context; falls back to first sentence of full bio */}
        <p className={styles.bio}>
          {author.shortBio ?? author.bio.split('\n\n')[0]}
        </p>
        {/* Deep link to full author page if it's a named person */}
        {author.url !== 'https://propmarkethub.com.au/about' && (
          <Link href={author.url} className={styles.viewProfile}>
            View full profile →
          </Link>
        )}
      </div>
    </div>
  );
}
