import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.brand}>
            <p className={styles.brandName}>PropMarketHub</p>
            <p className={styles.brandDesc}>
              A free Australian property investment platform — suburb analysis, financing
              calculators, stamp duty estimation, and rental yield planning.
            </p>
            <p className={styles.brandDisclaimer}>
              For informational purposes only. Not financial advice.
            </p>
          </div>

          {/* Finance Calculators */}
          <div>
            <p className={styles.columnHeading}>Finance</p>
            <ul className={styles.linkList}>
              <li><Link href="/mortgage-calculator"         className={styles.footerLink}>Mortgage Calculator</Link></li>
              <li><Link href="/loan-comparison-calculator"  className={styles.footerLink}>Loan Comparison</Link></li>
              <li><Link href="/borrowing-power-calculator"  className={styles.footerLink}>Borrowing Power</Link></li>
              <li><Link href="/extra-repayment-calculator"  className={styles.footerLink}>Extra Repayment</Link></li>
            </ul>
          </div>

          {/* Investment Tools */}
          <div>
            <p className={styles.columnHeading}>Investing</p>
            <ul className={styles.linkList}>
              <li><Link href="/rental-yield-calculator"        className={styles.footerLink}>Rental Yield</Link></li>
              <li><Link href="/cash-flow-calculator"           className={styles.footerLink}>Cash Flow</Link></li>
              <li><Link href="/negative-gearing-calculator"    className={styles.footerLink}>Negative Gearing</Link></li>
              <li><Link href="/brrrr-calculator"               className={styles.footerLink}>BRRRR Method</Link></li>
              <li><Link href="/property-investment-calculator" className={styles.footerLink}>Property Investment</Link></li>
            </ul>
          </div>

          {/* Buying Tools */}
          <div>
            <p className={styles.columnHeading}>Buying</p>
            <ul className={styles.linkList}>
              <li><Link href="/first-home-buyer-calculator"        className={styles.footerLink}>First Home Buyer</Link></li>
              <li><Link href="/stamp-duty-calculator"              className={styles.footerLink}>Stamp Duty</Link></li>
              <li><Link href="/property-purchase-costs-calculator" className={styles.footerLink}>Purchase Costs</Link></li>
              <li><Link href="/rent-vs-buy-calculator"             className={styles.footerLink}>Rent vs Buy</Link></li>
              <li><Link href="/home-equity-calculator"             className={styles.footerLink}>Home Equity</Link></li>
            </ul>
          </div>

          {/* Content */}
          <div>
            <p className={styles.columnHeading}>Explore</p>
            <ul className={styles.linkList}>
              <li><Link href="/suburb-scorecard" className={styles.footerLink}>Suburb Scorecard</Link></li>
              <li><Link href="/blog"             className={styles.footerLink}>Blog</Link></li>
              <li><Link href="/about"            className={styles.footerLink}>About</Link></li>
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
