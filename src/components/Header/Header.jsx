'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const TOOLS = [
  {
    label: 'Suburb Scorecard',
    href: '/suburb-scorecard',
    live: true,
    children: [
      { label: 'Regions', href: '/suburb-scorecard' },
      { label: 'Top 10 NSW', href: '/suburb-scorecard' },
      { label: 'Compare', href: '/suburb-scorecard' },
      { label: 'Methodology', href: '/suburb-scorecard' },
    ],
  },
  { label: 'Mortgage Calculator', href: '#', live: false },
  { label: 'Stamp Duty Calculator', href: '#', live: false },
  { label: 'Rental Yield Calculator', href: '#', live: false },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" aria-label="PropMarketHub home" className={styles.logoLink}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/propmarkethub-logo.png" alt="PropMarketHub" className={styles.logo} />
        </Link>

        <span className={styles.divider} />

        <nav className={styles.nav}>
          {TOOLS.map((tool) =>
            tool.children ? (
              <div
                key={tool.label}
                className={styles.dropdownWrapper}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link href={tool.href} className={styles.toolLink}>
                  {tool.label}
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path
                      d="M3 5l3 3 3-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                {dropdownOpen && (
                  <div className={styles.dropdown}>
                    {tool.children.map((child) => (
                      <Link key={child.label} href={child.href} className={styles.dropdownLink}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <span key={tool.label} className={styles.comingSoon} title="Coming Soon">
                {tool.label}
                <span className={styles.badge}>Soon</span>
              </span>
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

        <button className={styles.mobileBtn} onClick={toggleMobile} aria-label="Toggle menu">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileNav}>
          <Link href="/suburb-scorecard" className={styles.mobileLink} onClick={closeMobile}>
            Suburb Scorecard
          </Link>
          <span className={styles.mobileMuted}>Mortgage Calculator (Soon)</span>
          <span className={styles.mobileMuted}>Stamp Duty Calculator (Soon)</span>
          <span className={styles.mobileMuted}>Rental Yield Calculator (Soon)</span>
          <hr className={styles.mobileDivider} />
          <Link href="/blog" className={styles.mobileLinkSecondary} onClick={closeMobile}>
            Blog
          </Link>
          <Link href="/about" className={styles.mobileLinkSecondary} onClick={closeMobile}>
            About
          </Link>
        </div>
      )}
    </header>
  );
}
