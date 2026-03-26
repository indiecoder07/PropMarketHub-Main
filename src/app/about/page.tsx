import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title:       'About PropMarketHub',
  description: 'PropMarketHub builds free, data-driven property investment tools for Australian investors — suburb scorecard, mortgage calculator, stamp duty estimator, and more. Start for free.',
  alternates:  { canonical: 'https://propmarkethub.com.au/about' },
  robots:      { index: true, follow: true },
  openGraph: {
    type:        'website',
    locale:      'en_AU',
    siteName:    'PropMarketHub',
    url:         'https://propmarkethub.com.au/about',
    title:       'About PropMarketHub — Free Australian Property Investment Tools',
    description: 'PropMarketHub builds free, data-driven property investment tools for Australian investors — suburb scorecard, mortgage calculator, stamp duty estimator, and more.',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'PropMarketHub — Free Property Investment Tools for Australia' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@propmarkethub',
    title:       'About PropMarketHub — Free Australian Property Investment Tools',
    description: 'Free, data-driven suburb scorecard, mortgage calculator, stamp duty estimator, and rental yield tools for Australian investors.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type':       'AboutPage',
      '@id':         'https://propmarkethub.com.au/about/#webpage',
      name:          'About PropMarketHub — Free Australian Property Investment Tools & Mission',
      description:   'PropMarketHub builds free, data-driven property investment tools for Australian investors.',
      url:           'https://propmarkethub.com.au/about',
      isPartOf:      { '@id': 'https://propmarkethub.com.au/#website' },
      inLanguage:    'en-AU',
    },
    {
      '@type':       'Organization',
      '@id':         'https://propmarkethub.com.au/#organization',
      name:          'PropMarketHub',
      url:           'https://propmarkethub.com.au',
      description:   'Free, data-driven property investment tools for Australian investors.',
      logo: {
        '@type':     'ImageObject',
        url:         'https://propmarkethub.com.au/og-image.png',
        width:       1200,
        height:      630,
      },
      sameAs: ['https://twitter.com/propmarkethub'],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.heading}>
          About <span className={styles.headingAccent}>PropMarketHub</span>
        </h1>

        <div className={styles.body}>
          <p>
            PropMarketHub is a property investment platform built for Australian investors who want
            practical, data-driven tools in one place. Whether you&apos;re buying your first investment
            property or managing a growing portfolio, PropMarketHub helps you make smarter decisions
            with less guesswork.
          </p>

          <p>
            The platform started with the{' '}
            <Link href="/suburb-scorecard" className={styles.inlineLink}>
              Suburb Scorecard
            </Link>{' '}
            — a free tool that ranks NSW suburbs using six investment fundamentals: rental yield,
            vacancy rate, population growth, infrastructure pipeline, median household income, and
            price trend. Each suburb gets a composite score, making it easy to compare opportunities
            and shortlist locations.
          </p>

          <p>
            More tools are being built to cover the full investment workflow: mortgage repayment
            modelling, stamp duty estimation, and rental yield forecasting. All tools will be free to
            use and designed to work together.
          </p>

          <div className={styles.missionBox}>
            <h2 className={styles.missionHeading}>Our mission</h2>
            <p>
              Make property investment research accessible, transparent, and data-backed — so every
              Australian investor can make informed decisions, regardless of experience level.
            </p>
          </div>

          <p>
            PropMarketHub is independently built and not affiliated with any real estate agency,
            lender, or financial institution. All tools are for informational and educational
            purposes only — not financial advice.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/suburb-scorecard" className={styles.btnPrimary}>
              Try Suburb Scorecard
            </Link>
            <Link href="/blog" className={styles.btnSecondary}>
              Read the Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
