'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const NAV = [
  {
    label: 'Suburb Scorecard',
    href: '/suburb-scorecard',
    key: 'scorecard',
  },
  {
    label: 'Finance',
    key: 'finance',
    children: [
      { label: 'Mortgage Calculator',        href: '/mortgage-calculator'        },
      { label: 'Loan Comparison Calculator', href: '/loan-comparison-calculator' },
      { label: 'Borrowing Power Calculator', href: '/borrowing-power-calculator' },
      { label: 'Extra Repayment Calculator', href: '/extra-repayment-calculator' },
    ],
  },
  {
    label: 'Investing',
    key: 'investing',
    children: [
      { label: 'Rental Yield Calculator',       href: '/rental-yield-calculator'       },
      { label: 'Cash Flow Calculator',           href: '/cash-flow-calculator'           },
      { label: 'Negative Gearing Calculator',    href: '/negative-gearing-calculator'    },
      { label: 'BRRRR Calculator',               href: '/brrrr-calculator'               },
      { label: 'Property Investment Calculator', href: '/property-investment-calculator' },
    ],
  },
  {
    label: 'Buying',
    key: 'buying',
    children: [
      { label: 'First Home Buyer Calculator',        href: '/first-home-buyer-calculator'        },
      { label: 'Stamp Duty Calculator',              href: '/stamp-duty-calculator'              },
      { label: 'Property Purchase Costs Calculator', href: '/property-purchase-costs-calculator' },
      { label: 'Rent vs Buy Calculator',             href: '/rent-vs-buy-calculator'             },
      { label: 'Home Equity Calculator',             href: '/home-equity-calculator'             },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => { setMobileOpen(false); setMobileExpanded(null); };

  const isGroupActive = (item) =>
    item.children?.some((child) => pathname === child.href);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" aria-label="PropMarketHub home" className={styles.logoLink}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/propmarkethub-logo.png" alt="PropMarketHub" className={styles.logo} />
        </Link>

        <span className={styles.divider} />

        {/* ── Desktop nav ── */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.key}
                className={styles.dropdownWrapper}
                onMouseEnter={() => setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`${styles.toolLink} ${isGroupActive(item) ? styles.toolLinkActive : ''}`}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === item.key}
                >
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path
                      d="M3 5l3 3 3-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {activeDropdown === item.key && (
                  <div className={styles.dropdown} role="menu">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`${styles.dropdownLink} ${pathname === child.href ? styles.dropdownLinkActive : ''}`}
                        role="menuitem"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className={`${styles.toolLink} ${pathname === item.href ? styles.toolLinkActive : ''}`}
              >
                {item.label}
              </Link>
            )
          )}

          <div className={styles.rightLinks}>
            <Link
              href="/blog"
              className={`${styles.navLink} ${pathname?.startsWith('/blog') ? styles.navLinkActive : ''}`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`${styles.navLink} ${pathname === '/about' ? styles.navLinkActive : ''}`}
            >
              About
            </Link>
          </div>
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className={styles.mobileBtn}
          onClick={toggleMobile}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen
              ? <path d="M6 6l12 12M6 18L18 6" />
              : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* ── Mobile nav panel ── */}
      {mobileOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {/* Suburb Scorecard */}
          <Link href="/suburb-scorecard" className={styles.mobileLink} onClick={closeMobile}>
            Suburb Scorecard
          </Link>

          {/* Grouped dropdown sections */}
          {NAV.filter((i) => i.children).map((group) => (
            <div key={group.key} className={styles.mobileGroup}>
              <button
                className={styles.mobileGroupBtn}
                onClick={() =>
                  setMobileExpanded((prev) => (prev === group.key ? null : group.key))
                }
                aria-expanded={mobileExpanded === group.key}
              >
                <span>{group.label}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                  className={mobileExpanded === group.key ? styles.chevronUp : styles.chevronDown}
                >
                  <path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileExpanded === group.key && (
                <div className={styles.mobileGroupLinks}>
                  {group.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`${styles.mobileChildLink} ${pathname === child.href ? styles.mobileChildLinkActive : ''}`}
                      onClick={closeMobile}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <hr className={styles.mobileDivider} />
          <Link href="/blog"  className={styles.mobileLinkSecondary} onClick={closeMobile}>Blog</Link>
          <Link href="/about" className={styles.mobileLinkSecondary} onClick={closeMobile}>About</Link>
        </nav>
      )}
    </header>
  );
}
