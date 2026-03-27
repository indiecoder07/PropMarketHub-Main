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
            width={56}
            height={56}
            className={styles.avatarImg}
          />
        ) : (
          <div className={styles.avatarInitial} aria-hidden="true">
            {author.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.name}>
          <Link href={author.url} className={styles.nameLink}>
            {author.name}
          </Link>
        </p>
        <p className={styles.role}>{author.role}</p>
        <p className={styles.bio}>{author.bio}</p>
      </div>
    </div>
  );
}
