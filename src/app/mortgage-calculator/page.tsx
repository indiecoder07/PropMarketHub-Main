import type { Metadata } from 'next';
import Link from 'next/link';
import { MortgageCalculator } from '@/features/MortgageCalculator/MortgageCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title:       'Free Mortgage Repayment Calculator Australia',
  description: 'Calculate your Australian mortgage repayments instantly. Enter property price, deposit, interest rate and loan term to see monthly, fortnightly and weekly repayments, total interest, and LVR.',
  alternates:  { canonical: 'https://propmarkethub.com.au/mortgage-calculator' },
  robots:      { index: true, follow: true },
  openGraph: {
    title:       'Free Mortgage Repayment Calculator Australia | PropMarketHub',
    description: 'Estimate your mortgage repayments, total interest, and LVR in seconds. Free Australian mortgage calculator.',
    url:         'https://propmarkethub.com.au/mortgage-calculator',
    siteName:    'PropMarketHub',
    locale:      'en_AU',
    type:        'website',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'Mortgage Calculator — PropMarketHub' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@propmarkethub',
    title:       'Free Mortgage Repayment Calculator Australia | PropMarketHub',
    description: 'Instant mortgage repayment estimates — monthly, fortnightly, weekly. Free Australian tool.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  },
  keywords: [
    'mortgage repayment calculator australia',
    'home loan calculator australia',
    'mortgage calculator',
    'loan repayment calculator',
    'australian mortgage calculator',
  ],
};

const FAQS = [
  {
    q: 'How is a mortgage repayment calculated?',
    a: 'Australian mortgage repayments use the standard amortisation formula: M = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1], where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments (years × 12). Each repayment covers the interest accrued that month plus a portion of principal — in the early years most of the payment is interest, and the principal portion grows over time.',
  },
  {
    q: 'What is LVR and why does it matter?',
    a: 'LVR (Loan-to-Value Ratio) is your loan amount divided by the property value, expressed as a percentage. A $560,000 loan on a $700,000 property is an 80% LVR. Lenders typically require Lenders Mortgage Insurance (LMI) on loans above 80% LVR, adding thousands to your upfront costs. Keeping LVR at or below 80% avoids LMI and often unlocks better interest rates.',
  },
  {
    q: 'What is LMI and when does it apply?',
    a: "Lenders Mortgage Insurance (LMI) is insurance that protects the lender — not you — if you default on a loan with an LVR above 80%. On a $700,000 property with a 10% deposit ($70,000), the $630,000 loan is at 90% LVR and LMI typically costs $12,000–$18,000 depending on lender and loan size. LMI can usually be capitalised (added to the loan), but this increases total interest paid over the life of the loan.",
  },
  {
    q: 'Should I pay monthly or fortnightly?',
    a: 'Paying fortnightly reduces total interest because you make 26 half-monthly payments per year — equivalent to 13 full monthly payments rather than 12. On a $560,000 loan at 6.5% over 30 years, switching from monthly to fortnightly payments can save approximately $68,000 in interest and cut nearly 4 years from the loan term. Weekly payments produce a similar effect.',
  },
  {
    q: 'What is the difference between fixed and variable rate mortgages?',
    a: 'A fixed-rate mortgage locks in an interest rate for a set period (typically 1–5 years in Australia), providing repayment certainty regardless of RBA rate moves. A variable rate moves with the lender\'s standard variable rate, which tracks the RBA cash rate. Variable loans often allow unlimited extra repayments and offset accounts; fixed loans usually cap extra repayments at $10,000–$20,000 per year and may not allow offset accounts.',
  },
  {
    q: 'How much less do I pay on a 25-year loan versus 30 years?',
    a: 'On a $560,000 loan at 6.5%, a 30-year term costs approximately $714,000 in total interest. The same loan over 25 years costs approximately $572,000 in interest — a saving of $142,000. The monthly repayment increases by around $240 per month, but the total saving over the life of the loan is substantial.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Australian Mortgage Repayment Calculator',
      url: 'https://propmarkethub.com.au/mortgage-calculator',
      description: 'Free mortgage repayment calculator for Australian property investors and home buyers.',
      applicationCategory: 'FinanceApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
      author: { '@type': 'Organization', name: 'PropMarketHub', url: 'https://propmarkethub.com.au' },
      featureList: 'Monthly repayments, Fortnightly repayments, Weekly repayments, Total interest, LVR calculation, LMI warning',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propmarkethub.com.au/' },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator', item: 'https://propmarkethub.com.au/mortgage-calculator' },
      ],
    },
  ],
};

export default function MortgageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australian Home Buyers &amp; Investors</p>
            <h1 className={styles.h1}>Mortgage Repayment Calculator</h1>
            <p className={styles.subtitle}>
              Enter your property price, deposit, interest rate, and loan term to instantly see monthly, fortnightly and weekly repayments — plus total interest paid and your LVR.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className={styles.calcSection}>
          <div className="container">
            <MortgageCalculator />
          </div>
        </section>

        {/* Guide */}
        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How mortgage repayments are calculated</h2>
            <p className={styles.guideIntro}>
              A mortgage repayment calculator uses the <strong>amortisation formula</strong> to work
              out how much you owe each period. Every repayment covers two things: interest charged
              on the outstanding balance, and a principal reduction that slowly pays down what you
              borrowed. Understanding how this works helps you make better decisions about loan term,
              repayment frequency, and extra repayments.
            </p>

            {/* Block 1: The formula */}
            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>The amortisation formula</h3>
              <p className={styles.guideBlockText}>
                Lenders use the following formula to calculate your fixed repayment amount. The key
                insight is that the repayment is constant — but the split between interest and
                principal shifts over time. Early repayments are mostly interest; later repayments
                are mostly principal.
              </p>

              <div className={styles.formulaCard}>
                <p className={styles.formulaLabel}>Formula</p>
                <p className={styles.formula}>M = P × [r × (1 + r)ⁿ] ÷ [(1 + r)ⁿ − 1]</p>
                <p className={styles.formulaNote}>
                  P = loan principal · r = monthly interest rate (annual rate ÷ 12) · n = total monthly payments (years × 12)
                </p>
              </div>

              <div className={styles.exampleCard}>
                <p className={styles.exampleLabel}>Worked example</p>
                <p className={styles.exampleText}>
                  You buy a property for <strong>$700,000</strong> with a <strong>$140,000 deposit (20%)</strong>, leaving a <strong>$560,000 loan</strong> at <strong>6.5% per annum</strong> over <strong>30 years</strong>.
                </p>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Monthly rate (r)</span>
                    <span className={styles.calcStepValue}>6.5% ÷ 12 = <strong>0.5417%</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Total payments (n)</span>
                    <span className={styles.calcStepValue}>30 × 12 = <strong>360 months</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Monthly repayment</span>
                    <span className={styles.calcStepValue}>$560,000 × formula = <strong>$3,539/month</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Total repaid over 30 years</span>
                    <span className={styles.calcStepValue}>$3,539 × 360 = <strong>$1,274,040</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Total interest paid</span>
                    <span className={styles.calcStepValue}>$1,274,040 − $560,000 = <strong>$714,040</strong></span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  On this loan, you pay more in interest than the original loan amount. This is why reducing your rate by even 0.5% or shortening the term by 5 years makes a significant difference to the total cost.
                </p>
              </div>
            </div>

            {/* Block 2: Frequency */}
            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>How repayment frequency reduces total interest</h3>
              <p className={styles.guideBlockText}>
                Switching from monthly to fortnightly payments is one of the most effective ways to
                reduce total interest without refinancing. The reason: there are 26 fortnights in a
                year, so you make the equivalent of <strong>13 monthly payments</strong> instead of
                12. That extra month of principal reduction per year compounds significantly over a
                30-year term.
              </p>

              <div className={styles.formulaCard}>
                <p className={styles.formulaLabel}>Fortnightly payment approach</p>
                <p className={styles.formula}>Fortnightly payment = Monthly repayment ÷ 2</p>
                <p className={styles.formulaNote}>
                  This simple division results in 26 payments × half-monthly amount = 13 full monthly payments per year, not 12.
                </p>
              </div>

              <div className={styles.exampleCard}>
                <p className={styles.exampleLabel}>Worked example — same $560,000 loan</p>
                <p className={styles.exampleText}>
                  Using the same <strong>$560,000 loan at 6.5% over 30 years</strong>, compare monthly vs fortnightly repayments.
                </p>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Monthly payment</span>
                    <span className={styles.calcStepValue}><strong>$3,539/month</strong> × 12 = $42,468/yr</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Fortnightly payment</span>
                    <span className={styles.calcStepValue}><strong>$1,770/fortnight</strong> × 26 = $46,020/yr</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Extra paid per year</span>
                    <span className={styles.calcStepValue}>$46,020 − $42,468 = <strong>$3,552 more/yr</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Interest saved (approx.)</span>
                    <span className={styles.calcStepValue}><strong>~$68,000</strong> over the loan life</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Loan term reduction</span>
                    <span className={styles.calcStepValue}>30 years → <strong>~26 years 2 months</strong></span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  Fortnightly repayments save nearly 4 years and $68,000 in interest with no change to rate or loan structure — just payment frequency. The same logic applies to weekly payments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro / internal links */}
        <section className={styles.introSection}>
          <div className={`container ${styles.introInner}`}>
            <h2 className={styles.introHeading}>Plan your full property purchase</h2>
            <p className={styles.introText}>
              Use this mortgage calculator alongside the{' '}
              <Link href="/stamp-duty-calculator" className={styles.inlineLink}>stamp duty calculator</Link>{' '}
              to understand your total upfront costs, and the{' '}
              <Link href="/borrowing-power-calculator" className={styles.inlineLink}>borrowing power calculator</Link>{' '}
              to check how much you can borrow before you start searching.
            </p>
            <p className={styles.introText}>
              If you are buying an investment property, the{' '}
              <Link href="/rental-yield-calculator" className={styles.inlineLink}>rental yield calculator</Link>{' '}
              and{' '}
              <Link href="/cash-flow-calculator" className={styles.inlineLink}>cash flow calculator</Link>{' '}
              help you model returns alongside your financing costs.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Mortgage calculator FAQs</h2>
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
