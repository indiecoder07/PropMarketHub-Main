import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for could not be found. Browse our free property investment tools and NSW suburb scorecard.',
  robots: { index: false, follow: true },
};

const POPULAR_LINKS = [
  { href: '/suburb-scorecard',         label: 'NSW Suburb Scorecard' },
  { href: '/mortgage-calculator',      label: 'Mortgage Calculator' },
  { href: '/stamp-duty-calculator',    label: 'Stamp Duty Calculator' },
  { href: '/rental-yield-calculator',  label: 'Rental Yield Calculator' },
  { href: '/borrowing-power-calculator', label: 'Borrowing Power Calculator' },
  { href: '/blog',                     label: 'Property Investment Blog' },
];

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.code}>404</p>
        <h1 className={styles.heading}>Page not found</h1>
        <p className={styles.body}>
          The page you were looking for doesn&apos;t exist or may have moved.
          Try one of our popular tools below, or{' '}
          <Link href="/" className={styles.homeLink}>go back to the homepage</Link>.
        </p>

        <nav className={styles.links} aria-label="Popular pages">
          {POPULAR_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.link}>
              {label} →
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
