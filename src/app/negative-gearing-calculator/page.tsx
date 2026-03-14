import type { Metadata } from 'next';
import { NegativeGearingCalculatorProvider } from '@/context/NegativeGearingCalculatorContext';
import { NegativeGearingCalculator } from '@/features/NegativeGearingCalculator/NegativeGearingCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Negative Gearing Calculator Australia — Tax Benefit Estimate — PropMarketHub',
  description: 'Estimate the annual tax benefit and after-tax cash flow from a negatively geared Australian investment property.',
  alternates: { canonical: 'https://propmarkethub.com.au/negative-gearing-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Negative Gearing Calculator Australia | PropMarketHub',
    description: 'Estimate the tax benefit of negative gearing on an Australian investment property. Model after-tax cash flow and deductible losses.',
    url: 'https://propmarkethub.com.au/negative-gearing-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Negative Gearing Calculator Australia | PropMarketHub',
    description: 'Estimate your tax benefit and after-tax cash flow from negatively geared property. Free Australian tool.',
  },
};

const FAQS = [
  {
    q: 'What is negative gearing and how does it work in Australia?',
    a: 'Negative gearing occurs when the deductible costs of owning an investment property — interest, rates, insurance, repairs, property management, and depreciation — exceed the rental income it generates. The resulting loss can be offset against your other taxable income (such as salary), reducing your total tax bill. The Australian Tax Office allows this deduction under Section 8-1 of the Income Tax Assessment Act 1997. The tax saving does not eliminate the cash shortfall, but it reduces how much the shortfall actually costs you after tax.',
  },
  {
    q: 'What expenses can I deduct on a negatively geared property?',
    a: 'Deductible expenses include: loan interest (the largest component), council rates, water rates, landlord insurance, property management fees (typically 7–10% of rent), repairs and maintenance, advertising for tenants, accounting fees for the property, and depreciation on the building (capital works) and fixtures (plant and equipment). Capital improvements are not immediately deductible — they are added to the cost base and reduce capital gains tax on eventual sale.',
  },
  {
    q: 'What is depreciation and how does it increase my tax deduction?',
    a: 'Depreciation is a non-cash deduction that accounts for the wear and tear of the building structure (2.5% per year over 40 years for buildings constructed after 1987) and fixtures and fittings (e.g., carpet, dishwasher, air conditioning). A quantity surveyor can prepare a depreciation schedule for typically $500–$700, which often generates thousands of dollars in additional annual deductions. For a $700,000 property, depreciation deductions of $8,000–$15,000 per year are common in the first decade.',
  },
  {
    q: 'Does negative gearing guarantee a profit?',
    a: 'No. Negative gearing is a tax strategy, not a profit strategy. The investment only becomes profitable if capital growth — the increase in the property\'s value over time — exceeds the cumulative after-tax cash shortfalls. In periods of flat or falling property values, a negatively geared investor can face both ongoing cash losses and capital losses simultaneously. The strategy works best in markets with strong long-term capital growth.',
  },
  {
    q: 'How does the marginal tax rate affect the value of negative gearing?',
    a: 'The higher your marginal tax rate, the more valuable each dollar of property loss becomes as a tax offset. An investor on the 47% rate (including Medicare levy) saves $0.47 for every $1 of deductible loss. An investor on the 32.5% rate saves only $0.325. This is why negative gearing is often described as more beneficial for high-income earners — they receive a larger government subsidy per dollar of loss.',
  },
  {
    q: 'What happens to my negative gearing deductions if I sell the property?',
    a: 'When you sell, deferred losses do not carry forward — they have already been claimed each year. However, any capital gain on sale is subject to CGT. If you owned the property for more than 12 months, you are entitled to the 50% CGT discount, meaning only half the gain is added to your taxable income in the year of sale. The combination of annual tax offsets plus a discounted capital gain is the fundamental economics underpinning the negative gearing strategy.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Negative Gearing Calculator',
      url: 'https://propmarkethub.com.au/negative-gearing-calculator',
      applicationCategory: 'FinanceApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
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
        { '@type': 'ListItem', position: 2, name: 'Negative Gearing Calculator', item: 'https://propmarkethub.com.au/negative-gearing-calculator' },
      ],
    },
  ],
};

export default function NegativeGearingCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>Negative Gearing Calculator</h1>
            <p className={styles.subtitle}>
              Estimate the annual tax benefit and after-tax cash position of a negatively geared Australian investment property.
            </p>
          </div>
        </section>

        <section className={styles.calcSection}>
          <div className="container">
            <NegativeGearingCalculatorProvider>
              <NegativeGearingCalculator />
            </NegativeGearingCalculatorProvider>
          </div>
        </section>

        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How negative gearing works in Australia</h2>
            <p className={styles.guideIntro}>
              Negative gearing is one of Australia&apos;s most widely used property investment strategies. When your investment property costs more to hold than it earns in rent, the ATO allows you to deduct that loss against your other income — effectively sharing part of your shortfall with the government. Understanding the mechanics helps you assess whether the tax saving truly offsets the cash cost, and whether the strategy suits your financial position.
            </p>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Calculating your tax benefit</h3>
              <p className={styles.guideBlockText}>
                The tax benefit of negative gearing depends on two numbers: your <strong>net rental loss</strong> (total deductible expenses minus gross rent) and your <strong>marginal tax rate</strong>. The ATO lets you offset the loss against your salary, reducing your income tax payable by the loss multiplied by your marginal rate.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Formula</span>
                <span className={styles.formula}>
                  {`Net rental loss = Total deductible expenses − Gross rental income
Tax benefit = Net rental loss × Marginal tax rate
After-tax shortfall = Pre-tax shortfall − Tax benefit`}
                </span>
                <span className={styles.formulaNote}>
                  Deductible expenses include interest, rates, insurance, management fees, repairs, and depreciation. Depreciation is non-cash but fully deductible — it is the most powerful lever for increasing your tax benefit.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — $750,000 property, 47% marginal rate</span>
                <p className={styles.exampleText}>
                  An investor earning $200,000/year purchases a $750,000 property with an $600,000 interest-only loan at 6.5%.
                </p>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Gross annual rent ($600/week)</span>
                    <span className={styles.calcStepValue}>$31,200</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Annual loan interest ($600k × 6.5%)</span>
                    <span className={styles.calcStepValue}>−$39,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Rates, insurance, management (~$8,500)</span>
                    <span className={styles.calcStepValue}>−$8,500</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Depreciation (quantity surveyor schedule)</span>
                    <span className={styles.calcStepValue}>−$9,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Net rental loss</span>
                    <span className={styles.calcStepValue}>−$25,300</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Tax benefit (47% × $25,300)</span>
                    <span className={styles.calcStepValue}>+$11,891</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Pre-tax cash shortfall (excl. depreciation)</span>
                    <span className={styles.calcStepValue}>−$16,300</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>After-tax cash cost per year</span>
                    <span className={styles.calcStepValue}>~$4,409</span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  The investor pays $4,409 out of pocket per year to hold the property — about $85/week. The $9,000 depreciation deduction is the key reason the after-tax cost is so low; without it the annual cost would be roughly $8,900.
                </p>
              </div>
            </div>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Negative gearing vs positive gearing: which is better?</h3>
              <p className={styles.guideBlockText}>
                Negative gearing suits investors who can comfortably cover the cash shortfall and are primarily seeking capital growth. Positive gearing — where rent exceeds expenses — generates taxable income each year but typically occurs in higher-yield, lower-growth regional markets. Neither strategy is universally superior; the right choice depends on your income, cash flow needs, and growth expectations.
              </p>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Comparison at a glance</span>
                <div className={styles.expenseTable}>
                  <div className={styles.expenseRow}><span><strong>Factor</strong></span><span><strong>Negative Gearing</strong></span></div>
                  <div className={styles.expenseRow}><span>Annual cash flow</span><span>Negative (out of pocket)</span></div>
                  <div className={styles.expenseRow}><span>Tax position</span><span>Reduces taxable income</span></div>
                  <div className={styles.expenseRow}><span>Typical market</span><span>Capital city, high growth</span></div>
                  <div className={styles.expenseRow}><span>Yield profile</span><span>Low yield, high CG potential</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span>Best suited to</span><span>High-income, long horizon</span></div>
                </div>
                <p className={styles.exampleNote}>
                  Most Australian property investors in Sydney, Melbourne, and Brisbane operate negatively geared portfolios. The strategy requires patience — the real return comes at sale, not during ownership. Always model your cash flow position over a 10-year horizon before committing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Negative gearing FAQs</h2>
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
