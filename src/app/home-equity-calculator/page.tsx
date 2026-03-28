import type { Metadata } from 'next';
import { HomeEquityCalculatorProvider } from '@/context/HomeEquityCalculatorContext';
import { HomeEquityCalculator } from '@/features/HomeEquityCalculator/HomeEquityCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Home Equity Calculator Australia — Usable Equity & LVR',
  description: 'Calculate your available home equity and how much you could access to buy an investment property, renovate, or refinance.',
  alternates: { canonical: 'https://propmarkethub.com.au/home-equity-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Home Equity Calculator Australia | PropMarketHub',
    description: 'Find out how much home equity you have and how much is usable for a deposit, investment, or renovation. Free Australian tool.',
    url: 'https://propmarkethub.com.au/home-equity-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'PropMarketHub — Free Property Investment Tools for Australia' }],
  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Equity Calculator Australia | PropMarketHub',
    description: 'Calculate your usable home equity based on property value and remaining loan. Free Australian tool.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  
  },
};

const FAQS = [
  {
    q: 'What is the difference between total equity and usable equity?',
    a: 'Total equity is simply your property value minus your outstanding loan balance. Usable equity is the portion you can actually borrow against — typically the amount that keeps your combined loan-to-value ratio (LVR) at or below 80%. Most lenders will not advance funds beyond 80% LVR without charging Lenders Mortgage Insurance (LMI). So if your property is worth $800,000 and your loan is $400,000, your total equity is $400,000 but your usable equity is $240,000 (80% × $800k − $400k).',
  },
  {
    q: 'How do lenders value my property for equity access?',
    a: 'Lenders conduct a formal property valuation — either a full in-person inspection or an automated valuation model (AVM) using comparable sales data. The valuation may be lower than what you believe the property is worth, which directly reduces your calculated equity. It is worth getting a pre-valuation estimate from your lender before planning equity-funded purchases.',
  },
  {
    q: 'Can I use home equity to fund an investment property deposit?',
    a: 'Yes. This is one of the most common equity strategies in Australian property investing. You access usable equity as a line of credit or equity loan, which becomes the deposit and acquisition costs for the next property. The original home plus the new investment property both secure the lending. Lenders will assess your combined serviceability across both loans.',
  },
  {
    q: 'What is cross-collateralisation and should I avoid it?',
    a: 'Cross-collateralisation (cross-securing) occurs when a lender uses multiple properties as security for a single loan or portfolio. This gives the lender more control — if you want to sell one property, the lender must release their charge, which can complicate the sale. Most investment-savvy borrowers and mortgage brokers recommend keeping properties as separate securities with separate loans to preserve flexibility.',
  },
  {
    q: 'Does accessing equity affect my tax position?',
    a: 'It can. In Australia, interest on equity loans used for investment purposes (e.g., buying shares or an investment property) may be tax deductible. Interest on equity used for personal purposes (holiday, car, renovation of your own home) is generally not deductible. Speak with an accountant before drawing on equity to ensure the loan purpose and account structure support your intended tax treatment.',
  },
  {
    q: 'How often should I review my equity position?',
    a: 'Annually is a reasonable cadence in most markets, or whenever you suspect significant price movement in your suburb. In rising markets, equity can accumulate rapidly — waiting years before reviewing means missing purchase windows. In falling markets, monitoring ensures you do not unknowingly drop below 80% LVR and trigger LMI obligations on a top-up.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Home Equity Calculator',
      url: 'https://propmarkethub.com.au/home-equity-calculator',
      applicationCategory: 'FinanceApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
      author: { '@type': 'Organization', name: 'PropMarketHub', url: 'https://propmarkethub.com.au' },
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
        { '@type': 'ListItem', position: 2, name: 'Home Equity Calculator', item: 'https://propmarkethub.com.au/home-equity-calculator' },
      ],
    },
  ],
};

export default function HomeEquityCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>Home Equity Calculator</h1>
            <p className={styles.subtitle}>
              Calculate your total and usable home equity — the foundation for accessing funds to invest, renovate, or refinance.
            </p>
          </div>
        </section>

        <section className={styles.calcSection}>
          <div className="container">
            <HomeEquityCalculatorProvider>
              <HomeEquityCalculator />
            </HomeEquityCalculatorProvider>
          </div>
        </section>

        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>Understanding home equity in Australia</h2>
            <p className={styles.guideIntro}>
              Home equity is the portion of your property that you own outright — the difference between its current market value and what you still owe on your mortgage. As you make repayments and as property values rise, your equity grows. Once it reaches a meaningful level, that equity becomes a powerful financial tool: the deposit for your next investment property, a renovation fund, or simply a financial safety net.
            </p>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Total equity vs usable equity</h3>
              <p className={styles.guideBlockText}>
                Not all equity is accessible. Lenders require you to maintain a minimum equity buffer — typically 20% of the property&apos;s value — before they will allow you to borrow against your home. This protects them from exposure if property values fall. The equity you can actually use is called <strong>usable equity</strong>.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Formulas</span>
                <span className={styles.formula}>
                  Total equity = Property value − Outstanding loan balance{'\n'}
                  Usable equity = (Property value × 0.80) − Outstanding loan balance
                </span>
                <span className={styles.formulaNote}>
                  The 80% threshold is the standard LVR limit that avoids Lenders Mortgage Insurance (LMI). Some lenders will allow access up to 90% LVR with LMI, but this increases your borrowing costs substantially.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — $900,000 property, $520,000 remaining loan</span>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Property current market value</span>
                    <span className={styles.calcStepValue}>$900,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Outstanding loan balance</span>
                    <span className={styles.calcStepValue}>$520,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Total equity ($900k − $520k)</span>
                    <span className={styles.calcStepValue}>$380,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>80% of property value</span>
                    <span className={styles.calcStepValue}>$720,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Usable equity ($720k − $520k)</span>
                    <span className={styles.calcStepValue}>$200,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Current LVR ($520k ÷ $900k)</span>
                    <span className={styles.calcStepValue}>57.8%</span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  This owner has $380,000 in total equity but only $200,000 that lenders will advance without LMI. That $200,000 could fund the deposit and costs on an investment property worth approximately $800,000–$1,000,000 (depending on the state&apos;s stamp duty).
                </p>
              </div>
            </div>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Using equity to buy an investment property</h3>
              <p className={styles.guideBlockText}>
                Accessing equity to fund an investment property is a well-established strategy in Australia. Rather than saving a separate cash deposit, you borrow against your existing home&apos;s equity. This leverages the unrealised growth in your home to build a second asset without touching your savings.
              </p>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>How equity-funded investment works</span>
                <p className={styles.exampleText}>
                  Using the example above: the owner draws $200,000 usable equity as a separate equity loan. This becomes the deposit (20%) on an $800,000 investment property. An $800,000 × 80% = $640,000 investment loan is taken separately. The total debt is now $520,000 + $200,000 + $640,000 = $1,360,000, secured against two properties worth $900,000 + $800,000 = $1,700,000.
                </p>
                <p className={styles.exampleNote}>
                  Serviceability across both loans must pass the lender&apos;s assessment. Rental income from the investment property is counted at 70–80% to cover vacancy. Always model the combined cash flow position before proceeding — our <a href="/cash-flow-calculator" style={{color: '#16a34a', fontWeight: 600}}>Cash Flow Calculator</a> and <a href="/borrowing-power-calculator" style={{color: '#16a34a', fontWeight: 600}}>Borrowing Power Calculator</a> can help.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Home equity FAQs</h2>
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
