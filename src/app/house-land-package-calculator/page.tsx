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
  title: 'House & Land Package Calculator Australia | Stage EMI (IO vs P&I)',
  description:
    'Model house and land package repayments across every construction stage. Choose Interest-Only or P&I for each phase, compare monthly EMI increases from land settlement to completion.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'PropMarketHub',
    url: PAGE_URL,
    title: 'House & Land Package Calculator Australia | IO vs P&I Stage Repayments',
    description:
      'Track monthly repayment changes at each progress drawdown. Choose your repayment structure for construction and post-completion phases.',
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
      'Compare staged EMI growth from land settlement to completion with IO and P&I options for each phase.',
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
        'Australian calculator to track staged repayment increases for house and land packages. Choose Interest-Only or P&I for construction and post-completion phases.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
      author: { '@type': 'Organization', name: 'PropMarketHub', url: 'https://propmarkethub.com.au' },
      featureList:
        'Stage-by-stage drawdown timeline, IO or P&I per phase, Monthly repayment tracking, Construction-phase comparison',
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
          name: 'Choose your repayment structure per phase',
          text: 'Select IO or P&I for the construction period and for the full loan tenure after completion.',
        },
        {
          '@type': 'HowToStep',
          name: 'Map construction stages by month and percentage',
          text: 'Set stage timing and draw percentages to match your lender and builder schedule.',
        },
        {
          '@type': 'HowToStep',
          name: 'Review your EMI timeline',
          text: 'See repayment jumps at each drawdown — stage changes only, or expand to the full tenure.',
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

      <div className={styles.page}>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australian Construction Loan Planning</p>
            <h1 className={styles.h1}>House &amp; Land Package Stage EMI Calculator</h1>
            <p className={styles.subtitle}>
              See exactly how monthly repayments increase after each drawdown. Choose
              Interest-Only or P&amp;I independently for the construction phase and for
              the full tenure after completion.
            </p>
          </div>
        </section>

        {/* ── Calculator ── */}
        <section className={styles.calcSection}>
          <div className="container">
            <FeatureErrorBoundary>
              <HouseLandPackageCalculatorProvider>
                <HouseLandPackageCalculator />
              </HouseLandPackageCalculatorProvider>
            </FeatureErrorBoundary>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className={styles.introSection}>
          <div className={`container ${styles.introInner}`}>
            <h2 className={styles.introHeading}>How construction loan repayments work</h2>
            <p className={styles.introText}>
              Construction loans are drawn in stages — each progress payment increases your funded balance,
              which immediately increases monthly interest costs. This calculator models every drawdown
              so you can forecast repayment pressure before signing contracts.
            </p>

            <div className={styles.stepsGrid}>
              <article className={styles.stepCard}>
                <span className={styles.stepNum}>1</span>
                <h3 className={styles.stepTitle}>Land settlement draw</h3>
                <p className={styles.stepText}>
                  The first draw at land settlement sets your baseline repayment on the land portion of your loan.
                </p>
              </article>
              <article className={styles.stepCard}>
                <span className={styles.stepNum}>2</span>
                <h3 className={styles.stepTitle}>Progress payment stages</h3>
                <p className={styles.stepText}>
                  Slab, frame, lock-up, fixing, and practical completion draws each increase the funded balance in steps.
                </p>
              </article>
              <article className={styles.stepCard}>
                <span className={styles.stepNum}>3</span>
                <h3 className={styles.stepTitle}>IO vs P&amp;I during build</h3>
                <p className={styles.stepText}>
                  Interest-Only keeps repayments lower during construction. P&amp;I starts paying principal immediately — higher short-term, lower long-term cost.
                </p>
              </article>
              <article className={styles.stepCard}>
                <span className={styles.stepNum}>4</span>
                <h3 className={styles.stepTitle}>Plan buffers before completion</h3>
                <p className={styles.stepText}>
                  Use the final repayment figure to plan cash flow, rental coverage, and refinance timing before practical completion.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── Worked example ── */}
        <section className={styles.exampleSection}>
          <div className={`container ${styles.exampleInner}`}>
            <h2 className={styles.exampleHeading}>Worked example (illustrative)</h2>
            <p className={styles.exampleIntro}>
              A buyer funds a $420,000 land contract and $380,000 build with a $160,000 deposit at 6.2% p.a.
              Drawdowns occur across 9 months. The timeline reveals each repayment jump as construction advances.
            </p>
            <div className={styles.exampleCard}>
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
                <span className={styles.exampleLabel}>Settlement IO repayment</span>
                <span className={styles.exampleValue}>~$2,177/mo</span>
              </div>
              <div className={[styles.exampleRow, styles.exampleRowLast].join(' ')}>
                <span className={styles.exampleLabel}>Final P&amp;I repayment (post-completion)</span>
                <span className={styles.exampleValue}>~$3,908/mo</span>
              </div>
            </div>
            <div className={styles.linkRow}>
              <Link href="/mortgage-calculator" className={styles.inlineLink}>Mortgage Calculator →</Link>
              <Link href="/cash-flow-calculator" className={styles.inlineLink}>Cash Flow Calculator →</Link>
              <Link href="/stamp-duty-calculator" className={styles.inlineLink}>Stamp Duty Calculator →</Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>House &amp; land package FAQs</h2>
            <div className={styles.faqList}>
              {FAQ_ITEMS.map((faq) => (
                <article key={faq.q} className={styles.faqItem}>
                  <h3 className={styles.faqQ}>{faq.q}</h3>
                  <p className={styles.faqA}>{faq.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
