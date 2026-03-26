import Link from 'next/link';
import type { Metadata } from 'next';
import {
  FAQ_ITEMS,
  HOUSE_LAND_CALCULATOR_ROUTE,
} from '@/constants';
import { FeatureErrorBoundary } from '@/components/FeatureErrorBoundary';
import { HouseLandPackageCalculatorProvider } from '@/context/HouseLandPackageCalculatorContext';
import { HouseLandPackageCalculator } from '@/features/HouseLandPackageCalculator';
import styles from './page.module.css';

const PAGE_URL = `https://propmarkethub.com.au${HOUSE_LAND_CALCULATOR_ROUTE}`;

export const metadata: Metadata = {
  title: 'House & Land Package Calculator Australia | Stage EMI (IO vs P&I) — PropMarketHub',
  description:
    'Model house and land package repayments across every construction stage. Compare Interest-Only vs P&I monthly EMI increases from land settlement to completion.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'PropMarketHub',
    url: PAGE_URL,
    title: 'House & Land Package Calculator Australia | IO vs P&I Stage Repayments',
    description:
      'Track monthly repayment changes at each progress drawdown. Compare Interest-Only and Principal & Interest across full timeline.',
    images: [
      {
        url: 'https://propmarkethub.com.au/og-image.png',
        width: 1200,
        height: 630,
        alt: 'House and Land Package Calculator - PropMarketHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@propmarkethub',
    title: 'House & Land Package Calculator Australia | IO vs P&I Stage Repayments',
    description:
      'Compare staged EMI growth from land settlement to completion with side-by-side IO and P&I tracks.',
    images: ['https://propmarkethub.com.au/og-image.png'],
  },
  keywords: [
    'house and land package calculator',
    'construction loan calculator australia',
    'progress payment calculator',
    'interest only vs principal and interest construction loan',
    'stage by stage emi calculator',
  ],
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'House & Land Package Calculator',
      url: PAGE_URL,
      description:
        'Australian calculator to track staged repayment increases for house and land packages with Interest-Only and P&I comparison.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
      author: { '@type': 'Organization', name: 'PropMarketHub', url: 'https://propmarkethub.com.au' },
      featureList:
        'Stage-by-stage drawdown timeline, Monthly IO vs P&I repayments, EMI increase tracking, Construction-phase comparison',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
    {
      '@type': 'HowTo',
      name: 'How to estimate stage-by-stage repayments for a house and land package',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Enter land, build, deposit, and loan settings',
          text: 'Start with contract values and financing assumptions to define total borrowings.',
        },
        {
          '@type': 'HowToStep',
          name: 'Map construction stages by month and percentage',
          text: 'Set stage timing and draw percentages to match your lender and builder schedule.',
        },
        {
          '@type': 'HowToStep',
          name: 'Compare monthly IO and P&I tracks',
          text: 'Use the timeline to see repayment jumps and cash-flow impact at each stage.',
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propmarkethub.com.au/' },
        { '@type': 'ListItem', position: 2, name: 'House & Land Package Calculator', item: PAGE_URL },
      ],
    },
  ],
};

export default function HouseLandPackageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main className={styles.page}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>Australian Construction Loan Planning</p>
            <h1 className={styles.h1}>House &amp; Land Package Stage EMI Calculator</h1>
            <p className={styles.subtitle}>
              See exactly how monthly repayments increase after each land and construction drawdown.
              Compare Interest-Only and P&amp;I side-by-side across the full timeline.
            </p>
          </section>

          <section className={styles.directAnswer}>
            <h2 className={styles.directAnswerTitle}>Direct answer</h2>
            <p className={styles.directAnswerText}>
              For most house and land builds, monthly repayments rise in steps as each progress payment
              is released. Interest-Only starts lower but can cost more over time. P&amp;I is usually
              higher during construction but starts principal reduction earlier.
            </p>
          </section>

          <section className={styles.section}>
            <FeatureErrorBoundary>
              <HouseLandPackageCalculatorProvider>
                <HouseLandPackageCalculator />
              </HouseLandPackageCalculatorProvider>
            </FeatureErrorBoundary>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>How stage repayments increase</h2>
            <p className={styles.sectionText}>
              Construction loans are typically drawn in stages. Each draw increases the funded balance,
              which increases monthly repayments. This tool models every month so you can forecast
              repayment pressure before signing contracts.
            </p>

            <div className={styles.steps}>
              <article className={styles.stepCard}>
                <h3 className={styles.stepTitle}>1. Land settlement draw</h3>
                <p className={styles.stepText}>
                  The first draw usually happens at land settlement. This sets your baseline repayment.
                </p>
              </article>
              <article className={styles.stepCard}>
                <h3 className={styles.stepTitle}>2. Construction stage draws</h3>
                <p className={styles.stepText}>
                  Slab, frame, lock-up, fixing, and completion draws increase funded balance in steps.
                </p>
              </article>
              <article className={styles.stepCard}>
                <h3 className={styles.stepTitle}>3. Compare IO and P&amp;I cash flow</h3>
                <p className={styles.stepText}>
                  View both tracks monthly to understand short-term affordability and long-term cost.
                </p>
              </article>
              <article className={styles.stepCard}>
                <h3 className={styles.stepTitle}>4. Plan buffers before completion</h3>
                <p className={styles.stepText}>
                  Use the final repayment level to plan liquidity, rental coverage, and refinance options.
                </p>
              </article>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Worked example (illustrative)</h2>
            <p className={styles.sectionText}>
              A buyer funds a $420,000 land contract and $380,000 build with a $160,000 deposit at 6.2%.
              Drawdowns occur across 9 months. The timeline reveals each repayment jump as construction advances.
            </p>
            <div className={styles.exampleGrid}>
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Total project cost</span>
                <span className={styles.exampleValue}>$800,000</span>
              </div>
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Loan required</span>
                <span className={styles.exampleValue}>$640,000</span>
              </div>
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Construction period</span>
                <span className={styles.exampleValue}>9 months</span>
              </div>
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Outcome</span>
                <span className={styles.exampleValue}>EMI rises progressively as each stage is funded</span>
              </div>
            </div>

            <div className={styles.linkRow}>
              <Link href="/mortgage-calculator" className={styles.inlineLink}>Mortgage Calculator</Link>
              <Link href="/cash-flow-calculator" className={styles.inlineLink}>Cash Flow Calculator</Link>
              <Link href="/stamp-duty-calculator" className={styles.inlineLink}>Stamp Duty Calculator</Link>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>House &amp; land package FAQs</h2>
            <div className={styles.faqList}>
              {FAQ_ITEMS.map((faq) => (
                <article key={faq.q} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.q}</h3>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
