import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <p className={styles.brandName}>PropMarketHub</p>
            <p className={styles.brandDesc}>
              A property investment platform for suburb analysis, financing calculators, stamp duty
              estimation, and rental yield planning.
            </p>
            <p className={styles.brandDisclaimer}>
              For informational purposes only. Not financial advice.
            </p>
          </div>

          <div>
            <p className={styles.columnHeading}>Tools</p>
            <ul className={styles.linkList}>
              <li>
                <Link href="/suburb-scorecard" className={styles.footerLink}>
                  Suburb Scorecard (Live)
                </Link>
              </li>
              <li>
                <span className={styles.comingSoonItem}>Mortgage Calculator (Soon)</span>
              </li>
              <li>
                <span className={styles.comingSoonItem}>Stamp Duty Calculator (Soon)</span>
              </li>
              <li>
                <span className={styles.comingSoonItem}>Rental Yield Calculator (Soon)</span>
              </li>
            </ul>
          </div>

          <div>
            <p className={styles.columnHeading}>Content</p>
            <ul className={styles.linkList}>
              <li>
                <Link href="/blog" className={styles.footerLink}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={styles.columnHeading}>Legal</p>
            <ul className={styles.linkList}>
              <li>
                <Link href="/suburb-scorecard" className={styles.footerLink}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/suburb-scorecard" className={styles.footerLink}>
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/suburb-scorecard" className={styles.footerLink}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.bottomText}>© {year} PropMarketHub. All rights reserved.</p>
          <p className={styles.bottomText}>
            Data freshness varies by tool · Suburb Scorecard updated monthly
          </p>
        </div>
      </div>
    </footer>
  );
}
