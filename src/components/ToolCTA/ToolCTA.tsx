import Link from 'next/link';
import styles from './ToolCTA.module.css';

interface ToolCTAProps {
  label: string;
  href: string;
  description: string;
}

/** Inline call-to-action box linking to a PropMarketHub calculator or tool. */
export function ToolCTA({ label, href, description }: ToolCTAProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon} aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Free tool</p>
        <p className={styles.heading}>{label}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <Link href={href} className={styles.cta}>
        Try it free →
      </Link>
    </div>
  );
}
