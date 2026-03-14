import type { Metadata } from 'next';
import Link from 'next/link';
import { RentalYieldCalculator } from '@/features/RentalYieldCalculator/RentalYieldCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title:       'Free Rental Yield Calculator Australia — Gross & Net Yield — PropMarketHub',
  description: 'Calculate gross and net rental yield on any Australian investment property. Enter property value, weekly rent, and annual expenses to see your real return on investment.',
  alternates:  { canonical: 'https://propmarkethub.com.au/rental-yield-calculator' },
  robots:      { index: true, follow: true },
  openGraph: {
    type:        'website',
    locale:      'en_AU',
    siteName:    'PropMarketHub',
    url:         'https://propmarkethub.com.au/rental-yield-calculator',
    title:       'Free Rental Yield Calculator Australia — Gross & Net Yield | PropMarketHub',
    description: 'Instantly calculate gross and net rental yield for any Australian investment property. See monthly cash flow and benchmarks. Free tool.',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'Rental Yield Calculator — PropMarketHub' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@propmarkethub',
    title:       'Free Rental Yield Calculator Australia | PropMarketHub',
    description: 'Gross and net rental yield for any Australian property. Cash flow, expense breakdown, and yield benchmarks.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  },
  keywords: [
    'rental yield calculator australia',
    'gross rental yield calculator',
    'net rental yield calculator',
    'property investment calculator australia',
    'investment property yield',
  ],
};

const FAQS = [
  { q: 'What is the difference between gross and net rental yield?',
    a: 'Gross rental yield = (annual rent ÷ property value) × 100. Net rental yield deducts all operating expenses — property management fees, maintenance, insurance, council rates, and water — giving you the real return before financing costs.' },
  { q: 'What is a good rental yield in Australia?',
    a: 'A gross yield of 4.5–6% is considered good for most Australian markets. Regional NSW and QLD markets often achieve 5–8%, while premium Sydney suburbs may yield 2–3.5%. Net yield is typically 1–2% lower than gross once expenses are factored in.' },
  { q: 'What is the difference between positively and negatively geared property?',
    a: 'A positively geared property generates more rental income than its total expenses, creating a cash surplus. A negatively geared property costs more to hold than it earns — investors typically rely on capital growth and tax deductions (negative gearing) to justify the shortfall.' },
  { q: 'What expenses should I include when calculating rental yield?',
    a: 'Key annual expenses include: property management fees (7–10% of rent), maintenance and repairs ($1,500–$5,000), landlord insurance ($1,000–$2,000), council rates ($1,500–$2,500), and water rates ($600–$1,200). Mortgage interest is not included in yield but affects cash flow.' },
  { q: 'How does vacancy rate affect my rental yield?',
    a: 'Vacancy directly reduces your effective annual rent. A 4-week vacancy on a $550/week property costs $2,200 per year, dropping gross yield by roughly 0.3% on a $750,000 property. Most property managers quote vacancy rates of 2–4% in capital cities. When modelling net yield, assume at least 2 weeks vacancy per year as a conservative baseline — more in regional or oversupplied markets.' },
  { q: 'Should I prioritise high yield or high capital growth?',
    a: 'It depends on your investment strategy and cash flow position. High-yield properties (regional areas, 5–8% gross) generate stronger cash flow but often have lower capital growth. High-growth properties (inner-city, 2–4% gross) may cost you money each week but deliver stronger long-term wealth through appreciation. Most successful Australian investors balance both — using high-yield properties to support the holding costs of high-growth assets in their portfolio.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Australian Rental Yield Calculator',
      url: 'https://propmarkethub.com.au/rental-yield-calculator',
      description: 'Free gross and net rental yield calculator for Australian investment properties.',
      applicationCategory: 'FinanceApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
      author: { '@type': 'Organization', name: 'PropMarketHub', url: 'https://propmarkethub.com.au' },
      featureList:
        'Gross yield, Net yield, Monthly cash flow, Expense breakdown, Yield benchmarks, Positive/negative gearing indicator',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: a,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propmarkethub.com.au/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Rental Yield Calculator',
          item: 'https://propmarkethub.com.au/rental-yield-calculator',
        },
      ],
    },
  ],
};

export default function RentalYieldCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australian Investment Properties</p>
            <h1 className={styles.h1}>Rental Yield Calculator</h1>
            <p className={styles.subtitle}>
              Calculate gross and net rental yield on any Australian investment property. Account for management fees, maintenance, insurance, and council rates to see your real return — and whether you&apos;re positively or negatively geared.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className={styles.calcSection}>
          <div className="container">
            <RentalYieldCalculator />
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={`container ${styles.introInner}`}>
            <h2 className={styles.introHeading}>How to use this rental yield calculator</h2>
            <p className={styles.introText}>
              Enter property value, weekly rent, and annual expenses to calculate gross rental yield,
              net rental yield, and your yearly cashflow position. Use this alongside the{' '}
              <Link href="/mortgage-calculator" className={styles.inlineLink}>mortgage calculator</Link>{' '}
              and{' '}
              <Link href="/stamp-duty-calculator" className={styles.inlineLink}>stamp duty calculator</Link>{' '}
              for a full investment analysis.
            </p>
            <p className={styles.introText}>
              If you are still comparing locations, shortlist opportunities first with the{' '}
              <Link href="/suburb-scorecard" className={styles.inlineLink}>NSW suburb scorecard</Link>{' '}
              before modelling yield and financing.
            </p>
          </div>
        </section>

        {/* Guide: How rental yield is calculated */}
        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How to calculate rental yield</h2>
            <p className={styles.guideIntro}>
              There are two forms of rental yield: <strong>gross rental yield</strong> and{' '}
              <strong>net rental yield</strong>. Gross yield is a quick reference metric that ignores
              expenses. Net yield accounts for all costs of ownership and gives you a more accurate
              picture of your real return — because expenses do not always scale proportionally with
              rent, two properties with identical gross yields can produce very different net returns.
            </p>

            {/* Gross yield */}
            <div className={styles.yieldBlock}>
              <h3 className={styles.yieldBlockHeading}>Gross rental yield</h3>
              <p className={styles.yieldBlockText}>
                Gross rental yield is simply your annual rental income divided by the property value,
                expressed as a percentage. It is quick to calculate and useful for comparing
                properties at a glance, but it does not reflect vacancy or any ownership costs.
              </p>

              <div className={styles.formulaCard}>
                <p className={styles.formulaLabel}>Formula</p>
                <p className={styles.formula}>
                  Gross Yield = (Annual Rent ÷ Property Value) × 100
                </p>
              </div>

              <div className={styles.exampleCard}>
                <p className={styles.exampleLabel}>Worked example</p>
                <p className={styles.exampleText}>
                  You are considering a house in Western Sydney listed at <strong>$750,000</strong>.
                  The comparable rent for the street is <strong>$550 per week</strong>.
                </p>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Annual rent</span>
                    <span className={styles.calcStepValue}>$550 × 52 weeks = <strong>$28,600</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Gross yield</span>
                    <span className={styles.calcStepValue}>$28,600 ÷ $750,000 × 100 = <strong>3.81%</strong></span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  A gross yield of 3.81% is below the 4.5–5% threshold many investors target, but it
                  says nothing about expenses. You need net yield to make a fair comparison.
                </p>
              </div>
            </div>

            {/* Net yield */}
            <div className={styles.yieldBlock}>
              <h3 className={styles.yieldBlockHeading}>Net rental yield</h3>
              <p className={styles.yieldBlockText}>
                Net rental yield adjusts for vacancy and deducts all annual ownership costs before
                dividing by property value. This gives you a more accurate like-for-like comparison
                between different properties. Note that mortgage repayments and interest are{' '}
                <em>not</em> usually included — they relate to your financing structure, not the
                property itself — though you can include them if you want to see after-debt return.
              </p>
              <p className={styles.yieldBlockText}>
                You need four inputs: annual rent, property value, vacancy rate, and annual expenses.
                The <strong>vacancy rate</strong> is the percentage of time you expect the property
                to be untenanted (e.g. 2 weeks per year ÷ 52 weeks = 3.85%).{' '}
                <strong>Annual expenses</strong> typically include property management fees,
                maintenance, landlord insurance, council rates, and water rates.
              </p>

              <div className={styles.formulaCard}>
                <p className={styles.formulaLabel}>Formula</p>
                <p className={styles.formula}>
                  Net Yield = ((Annual Rent × (1 − Vacancy Rate)) − Annual Expenses) ÷ Property Value × 100
                </p>
                <p className={styles.formulaNote}>
                  Multiplying by (1 − Vacancy Rate) reduces your income by the proportion of the
                  year the property is expected to sit empty.
                </p>
              </div>

              <div className={styles.exampleCard}>
                <p className={styles.exampleLabel}>Worked example (continuing from above)</p>
                <p className={styles.exampleText}>
                  Same <strong>$750,000 property</strong> at <strong>$550/week</strong>. You estimate
                  the property will be vacant for roughly <strong>1 week per year</strong> between
                  tenancies, and your annual expenses break down as follows:
                </p>
                <div className={styles.expenseTable}>
                  <div className={styles.expenseRow}>
                    <span>Property management (8.5% of rent)</span><span>$2,431</span>
                  </div>
                  <div className={styles.expenseRow}>
                    <span>Maintenance &amp; repairs</span><span>$2,500</span>
                  </div>
                  <div className={styles.expenseRow}>
                    <span>Landlord insurance</span><span>$1,400</span>
                  </div>
                  <div className={styles.expenseRow}>
                    <span>Council rates</span><span>$1,800</span>
                  </div>
                  <div className={styles.expenseRow}>
                    <span>Water rates</span><span>$900</span>
                  </div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}>
                    <span>Total annual expenses</span><span>$9,031</span>
                  </div>
                </div>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Vacancy rate</span>
                    <span className={styles.calcStepValue}>1 ÷ 52 = <strong>1.92%</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Effective income</span>
                    <span className={styles.calcStepValue}>$28,600 × (1 − 0.0192) = <strong>$28,051</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Income after expenses</span>
                    <span className={styles.calcStepValue}>$28,051 − $9,031 = <strong>$19,020</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Net yield</span>
                    <span className={styles.calcStepValue}>$19,020 ÷ $750,000 × 100 = <strong>2.54%</strong></span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  Net yield of 2.54% compared to gross yield of 3.81% — a gap of 1.27 percentage
                  points, purely from expenses and vacancy. This is why comparing properties on gross
                  yield alone can be misleading if one has significantly higher ownership costs.
                </p>
              </div>
            </div>

            {/* Quick comparison callout */}
            <div className={styles.comparisonBox}>
              <div className={styles.comparisonCol}>
                <p className={styles.comparisonTitle}>Gross yield</p>
                <p className={styles.comparisonFormula}>Annual Rent ÷ Property Value × 100</p>
                <p className={styles.comparisonPros}>✓ Fast to calculate<br />✓ Good for quick comparison</p>
                <p className={styles.comparisonCons}>✗ Ignores all expenses<br />✗ Can be misleading between markets</p>
              </div>
              <div className={styles.comparisonDivider} />
              <div className={styles.comparisonCol}>
                <p className={styles.comparisonTitle}>Net yield</p>
                <p className={styles.comparisonFormula}>(Income after vacancy − Expenses) ÷ Property Value × 100</p>
                <p className={styles.comparisonPros}>✓ Reflects real ownership cost<br />✓ Better for comparing unlike properties</p>
                <p className={styles.comparisonCons}>✗ Requires expense estimates<br />✗ Varies by management and maintenance style</p>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Rental yield — common questions</h2>
            <div className={styles.faqList}>
              {FAQS.map(({ q, a }) => (
                <article key={q} className={styles.faqItem}>
                  <h3 className={styles.faqQ}>{q}</h3>
                  <p className={styles.faqA}>{a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
