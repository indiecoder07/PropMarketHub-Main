import type { Metadata } from 'next';
import Link from 'next/link';
import { CashFlowCalculatorProvider } from '@/context/CashFlowCalculatorContext';
import { CashFlowCalculator } from '@/features/CashFlowCalculator/CashFlowCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Property Cash Flow Calculator Australia — Weekly & Annual Cash Flow',
  description: 'Calculate weekly and annual cash flow on an Australian investment property — rental income minus mortgage, rates, insurance, management, and all holding costs.',
  alternates: { canonical: 'https://propmarkethub.com.au/cash-flow-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Property Cash Flow Calculator Australia | PropMarketHub',
    description: 'Calculate weekly and annual investment property cash flow. Model rental income against all holding costs. Free Australian tool.',
    url: 'https://propmarkethub.com.au/cash-flow-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'PropMarketHub — Free Property Investment Tools for Australia' }],
  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Cash Flow Calculator Australia | PropMarketHub',
    description: 'Model investment property cash flow — income vs all holding costs. Free Australian calculator.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  
  },
};

const FAQS = [
  {
    q: 'What is property cash flow and why does it matter?',
    a: 'Property cash flow is the difference between the rental income a property generates and all the costs of holding it — mortgage repayments (or interest), rates, insurance, property management, repairs, and body corporate fees. Positive cash flow means the property pays for itself and generates surplus income. Negative cash flow means you are contributing money each week to hold the property. Understanding your cash flow position is critical for assessing whether you can sustain the investment long-term, especially if interest rates rise or the property sits vacant.',
  },
  {
    q: 'What is the difference between cash flow and profit on an investment property?',
    a: 'Cash flow is a real-money concept — actual dollars in and out of your bank account each month. Profit (or net income) includes non-cash items like depreciation, which reduces your taxable income but does not require an actual cash payment. A property can show a tax loss (due to depreciation) while still generating positive cash flow, or it can be cash flow negative while the depreciation deduction reduces the real after-tax cost. Both perspectives matter: cash flow tells you whether you can afford to hold the property; the tax position tells you the true cost.',
  },
  {
    q: 'How do I calculate cash-on-cash return for an investment property?',
    a: 'Cash-on-cash return measures the annual pre-tax cash flow as a percentage of the total cash you invested (deposit + acquisition costs). Formula: Cash-on-cash return = Annual net cash flow ÷ Total cash invested × 100. For example, if you invested $180,000 in total and the property generates $6,000/year in net cash flow, your cash-on-cash return is 3.3%. This metric is particularly useful for comparing property investments against other cash-yielding assets.',
  },
  {
    q: 'How much should I budget for repairs and maintenance?',
    a: 'A widely used rule of thumb is 1% of the property\'s value per year for maintenance and repairs. On an $800,000 property, that is $8,000/year or about $154/week. In practice, costs vary significantly: newer properties and apartments typically require less; older freestanding houses and properties with large gardens or pools require more. Budget conservatively — unexpected repairs are the most common reason investors experience cash flow stress.',
  },
  {
    q: 'Does vacancy affect my cash flow calculation?',
    a: 'Yes, significantly. Most properties experience some vacancy between tenancies — typically 2–4 weeks per year, representing a 4–8% reduction in gross rental income. A prudent cash flow model applies a vacancy allowance of at least 4% (2 weeks per year). In some markets or property types (furnished apartments, student accommodation), vacancy rates can be higher. Always stress-test your cash flow assuming 6–8 weeks vacancy per year to ensure you can absorb a prolonged empty period.',
  },
  {
    q: 'What is a good cash flow figure for an Australian investment property?',
    a: 'This depends entirely on your strategy and financial position. Many inner-city investors accept cash flow deficits of $100–$300/week in exchange for strong long-term capital growth. Regional and outer-suburban investors often prioritise neutral or positive cash flow of $50–$150/week surplus. The key question is not whether cash flow is positive or negative in absolute terms, but whether the after-tax shortfall is sustainable given your income, risk tolerance, and capital growth expectations over the intended holding period.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Property Cash Flow Calculator',
      url: 'https://propmarkethub.com.au/cash-flow-calculator',
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
        { '@type': 'ListItem', position: 2, name: 'Cash Flow Calculator', item: 'https://propmarkethub.com.au/cash-flow-calculator' },
      ],
    },
  ],
};

export default function CashFlowCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>Property Cash Flow Calculator</h1>
            <p className={styles.subtitle}>
              Calculate the weekly and annual cash flow on an Australian investment property — rental income minus every holding cost, so you know exactly what it costs to own.
            </p>
          </div>
        </section>

        <section className={styles.calcSection}>
          <div className="container">
            <CashFlowCalculatorProvider>
              <CashFlowCalculator />
            </CashFlowCalculatorProvider>
          </div>
        </section>

        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How to calculate investment property cash flow</h2>
            <p className={styles.guideIntro}>
              Cash flow is the most immediate measure of whether an investment property is financially sustainable. Before committing to a purchase, every investor should model the realistic weekly cash position — including a vacancy allowance and a maintenance reserve — at both current interest rates and a stressed rate 2–3% higher. A property that looks fine at 6.5% can become unmanageable at 9.5% if your income does not grow proportionally.
            </p>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>The cash flow formula</h3>
              <p className={styles.guideBlockText}>
                Net property cash flow is simply gross rental income minus every real cash expense associated with the property. The result is typically expressed as a weekly figure to make it easy to relate to your salary or household budget.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Formula</span>
                <span className={styles.formula}>
                  {`Gross weekly rent
− Vacancy allowance (÷ 52 weeks × vacancy weeks)
− Mortgage repayment (or interest-only payment)
− Property management fee (% of rent)
− Council rates (annual ÷ 52)
− Water rates (annual ÷ 52)
− Landlord insurance (annual ÷ 52)
− Maintenance reserve (% of property value ÷ 52)
= Net weekly cash flow`}
                </span>
                <span className={styles.formulaNote}>
                  This is a pre-tax cash flow figure. The after-tax cost will be lower for negatively geared properties because the annual loss offsets your other taxable income. Use our Negative Gearing Calculator to model the after-tax position.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — $750,000 property, $640,000 loan at 6.5%</span>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Gross weekly rent</span>
                    <span className={styles.calcStepValue}>$600/wk</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Vacancy allowance (2 weeks / 52)</span>
                    <span className={styles.calcStepValue}>−$23/wk</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Interest-only repayment ($640k × 6.5% ÷ 52)</span>
                    <span className={styles.calcStepValue}>−$800/wk</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Property management (8.5% of rent)</span>
                    <span className={styles.calcStepValue}>−$51/wk</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Council + water rates (÷ 52)</span>
                    <span className={styles.calcStepValue}>−$42/wk</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Landlord insurance (÷ 52)</span>
                    <span className={styles.calcStepValue}>−$25/wk</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Maintenance reserve (0.75% of $750k ÷ 52)</span>
                    <span className={styles.calcStepValue}>−$108/wk</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Net weekly cash flow (pre-tax)</span>
                    <span className={styles.calcStepValue}>−$449/wk</span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  This property costs $449/week before tax. For an investor on the 37% marginal rate, the annual tax benefit on the rental loss (~$23,350/year) is approximately $8,640, reducing the true after-tax weekly cost to around $283/week — or about $40/day to hold a $750,000 asset.
                </p>
              </div>
            </div>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Stress-testing your cash flow</h3>
              <p className={styles.guideBlockText}>
                Always model your cash flow at two additional interest rate scenarios: your current rate plus 1.5%, and your current rate plus 3%. This reflects the APRA serviceability buffer approach and ensures you are not purchasing a property that only works in the current rate environment. If a 3% rate rise would make your weekly cost unsustainable, you are taking on more risk than most investors should accept.
              </p>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Rate stress test — same property at 3 rate scenarios</span>
                <div className={styles.expenseTable}>
                  <div className={styles.expenseRow}><span><strong>Scenario</strong></span><span><strong>Weekly cost (pre-tax)</strong></span></div>
                  <div className={styles.expenseRow}><span>Current rate: 6.5%</span><span>−$449/wk</span></div>
                  <div className={styles.expenseRow}><span>+1.5% stress: 8.0%</span><span>−$634/wk</span></div>
                  <div className={styles.expenseRow}><span>+3.0% stress: 9.5%</span><span>−$819/wk</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span>Additional weekly cost at +3%</span><span>+$370/wk</span></div>
                </div>
                <p className={styles.exampleNote}>
                  A 3% rate rise adds $370/week to the holding cost of this property — about $19,240/year. Before purchasing, confirm you have sufficient income buffer to absorb this scenario. Use our <Link href="/borrowing-power-calculator" className={styles.inlineLink}>Borrowing Power Calculator</Link> to check your serviceability position.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Cash flow FAQs</h2>
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
