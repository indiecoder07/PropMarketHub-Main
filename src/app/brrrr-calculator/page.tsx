import type { Metadata } from 'next';
import { BRRRRCalculatorProvider } from '@/context/BRRRRCalculatorContext';
import { BRRRRCalculator } from '@/features/BRRRRCalculator/BRRRRCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'BRRRR Calculator Australia — Buy Renovate Rent Refinance Repeat — PropMarketHub',
  description: 'Model the full BRRRR cycle: purchase, renovation, rental income, refinance equity, and capital left in the deal.',
  alternates: { canonical: 'https://propmarkethub.com.au/brrrr-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'BRRRR Calculator Australia | PropMarketHub',
    description: 'Model the Buy, Renovate, Rent, Refinance, Repeat strategy for Australian property. Calculate equity recycled and cash left in deal.',
    url: 'https://propmarkethub.com.au/brrrr-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BRRRR Calculator Australia | PropMarketHub',
    description: 'Model the BRRRR property strategy — renovation uplift, refinance equity, and cash recycled. Free Australian tool.',
  },
};

const FAQS = [
  {
    q: 'What does BRRRR stand for and how does it work?',
    a: 'BRRRR stands for Buy, Renovate, Rent, Refinance, Repeat. The strategy involves purchasing an undervalued or distressed property below market value, adding value through renovation, tenanting it to establish rental income, then refinancing at the improved valuation to pull out most or all of the initial capital. The recycled cash is then used as a deposit on the next deal, allowing investors to build a portfolio with limited fresh capital.',
  },
  {
    q: 'What is "money left in the deal" and why does it matter?',
    a: 'Money left in the deal (MLID) is the amount of your own capital that remains trapped in the property after the refinance. The goal is to minimise or eliminate this figure. If you bought for $400,000, spent $50,000 on renovation (total cost $450,000), and the property revalues to $580,000 at 80% LVR giving you a $464,000 loan, you pull back $464,000 minus your original loan — leaving zero or near-zero capital in the deal. The lower your MLID, the faster you can repeat the cycle.',
  },
  {
    q: 'How do I find properties suitable for BRRRR in Australia?',
    a: 'Suitable properties are typically those selling at a discount due to condition, deceased estates, mortgagee sales, or owner neglect in suburbs where recent comparable sales (comps) support a significantly higher post-renovation value. The key metric is the after-repair value (ARV) — you need confident evidence that renovated properties in the street are selling at your target ARV before committing. Cosmetic renovations (paint, carpet, kitchen and bathroom updates) deliver the strongest dollar-for-dollar uplift.',
  },
  {
    q: 'What renovation costs should I budget for in Australia?',
    a: 'Cosmetic renovations (paint, flooring, kitchen resurface, bathroom refresh, landscaping) typically cost $20,000–$60,000 depending on property size. Structural or full gutfit renovations can exceed $150,000. For BRRRR to work, the renovation cost must be significantly less than the value it adds. A general rule is that $1 spent on renovation should add at least $2 in value — a 2:1 value-to-cost ratio. Always get three builder quotes and add a 15–20% contingency.',
  },
  {
    q: 'Can I use BRRRR with a standard owner-occupier mortgage?',
    a: 'No. BRRRR requires investment lending. You will typically need a bridging loan or short-term finance during the renovation phase (when the property is vacant), then a standard investment loan after tenanting. Some investors use construction loans or renovation loans for the build phase. The refinance step requires a formal bank valuation — the lender will base the new loan on the post-renovation market value, not your cost.',
  },
  {
    q: 'What are the tax implications of the BRRRR strategy in Australia?',
    a: 'If you rent the property, the ongoing holding costs are deductible as per standard investment property rules. Renovation costs that are repairs and maintenance are immediately deductible; capital improvements are added to the cost base and depreciated or claimed at CGT time. If you sell after the refinance instead of renting, the profit may be treated as ordinary income rather than a capital gain if the ATO considers you a property developer or trader — seek advice from a tax accountant familiar with property development rules.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'BRRRR Calculator',
      url: 'https://propmarkethub.com.au/brrrr-calculator',
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
        { '@type': 'ListItem', position: 2, name: 'BRRRR Calculator', item: 'https://propmarkethub.com.au/brrrr-calculator' },
      ],
    },
  ],
};

export default function BRRRRCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>BRRRR Calculator</h1>
            <p className={styles.subtitle}>
              Model the Buy, Renovate, Rent, Refinance, Repeat cycle — calculate renovation uplift, refinanced equity, and capital recycled into your next deal.
            </p>
          </div>
        </section>

        <section className={styles.calcSection}>
          <div className="container">
            <BRRRRCalculatorProvider>
              <BRRRRCalculator />
            </BRRRRCalculatorProvider>
          </div>
        </section>

        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How the BRRRR strategy works in Australia</h2>
            <p className={styles.guideIntro}>
              The BRRRR method is a capital recycling strategy that lets property investors build a portfolio faster than traditional buy-and-hold by recovering most or all of their initial investment through a refinance after renovation. Each successful BRRRR cycle returns capital that can be deployed into the next deal — theoretically allowing infinite portfolio growth from a finite pool of starting capital.
            </p>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>The equity recycling calculation</h3>
              <p className={styles.guideBlockText}>
                The core question in any BRRRR deal is: after the refinance, how much of my original cash is still trapped in the property? This figure — money left in the deal (MLID) — determines whether the strategy has worked. The lower the MLID, the more capital is available to repeat the cycle.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Formulas</span>
                <span className={styles.formula}>
                  {`Total all-in cost = Purchase price + Renovation + Acquisition costs
After-repair value (ARV) = Post-renovation market valuation
Refinance loan = ARV × LVR (typically 80%)
Money left in deal = Total all-in cost − Refinance loan`}
                </span>
                <span className={styles.formulaNote}>
                  A negative MLID means you have pulled out more than you put in — you have "manufactured" a deposit for your next deal from nothing. A positive MLID means some capital remains in the property.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — Brisbane renovation project</span>
                <p className={styles.exampleText}>
                  An investor purchases a tired 3-bedroom house in a Brisbane growth suburb.
                </p>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Purchase price</span>
                    <span className={styles.calcStepValue}>$480,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Stamp duty + acquisition costs</span>
                    <span className={styles.calcStepValue}>$18,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Renovation budget (cosmetic)</span>
                    <span className={styles.calcStepValue}>$42,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Total all-in cost</span>
                    <span className={styles.calcStepValue}>$540,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>After-repair valuation</span>
                    <span className={styles.calcStepValue}>$680,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Refinance loan (80% of $680k)</span>
                    <span className={styles.calcStepValue}>$544,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Money left in deal ($540k − $544k)</span>
                    <span className={styles.calcStepValue}>−$4,000</span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  This deal is effectively "money out" — the investor recovers all $540,000 invested plus an extra $4,000 that can go toward the next deal. The property is now positively or neutrally geared at $680,000 value with a $544,000 loan (80% LVR), generating rental income and long-term capital growth.
                </p>
              </div>
            </div>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Key metrics: value-to-cost ratio and equity created</h3>
              <p className={styles.guideBlockText}>
                Not every renovation creates equal value. The value-to-cost ratio measures how many dollars of property value are created per dollar of renovation spend. A ratio above 2.0 is considered strong; below 1.5 means the renovation is destroying value relative to its cost.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Value-to-cost ratio</span>
                <span className={styles.formula}>
                  {`Value created = ARV − Pre-renovation value
Value-to-cost ratio = Value created ÷ Renovation cost
Equity created = ARV − Total all-in cost`}
                </span>
                <span className={styles.formulaNote}>
                  In the example above: value created = $680,000 − $480,000 = $200,000. Renovation cost = $42,000. Ratio = $200,000 ÷ $42,000 = 4.76 — an exceptional result driven by below-market purchase price plus renovation.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>What makes a good BRRRR deal?</span>
                <p className={styles.exampleText}>
                  The best BRRRR deals combine three factors: purchasing below market value (the single biggest lever), a renovation that delivers strong value uplift at modest cost, and a post-renovation yield that supports positive or neutral cash flow after refinancing. Missing any one of these three makes the deal harder to justify.
                </p>
                <p className={styles.exampleNote}>
                  Use our <a href="/rental-yield-calculator" style={{color: '#16a34a', fontWeight: 600}}>Rental Yield Calculator</a> to check post-renovation yield and our <a href="/cash-flow-calculator" style={{color: '#16a34a', fontWeight: 600}}>Cash Flow Calculator</a> to confirm the deal is serviceable after refinancing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>BRRRR strategy FAQs</h2>
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
