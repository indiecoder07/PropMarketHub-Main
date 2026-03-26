import type { Metadata } from 'next';
import { PropertyPurchaseCostsCalculatorProvider } from '@/context/PropertyPurchaseCostsCalculatorContext';
import { PropertyPurchaseCostsCalculator } from '@/features/PropertyPurchaseCostsCalculator/PropertyPurchaseCostsCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Property Purchase Costs Calculator Australia — Stamp Duty, Legal & More',
  description: 'Calculate all upfront costs when buying property in Australia — stamp duty, conveyancing, building inspection, loan fees, and total cash required at settlement.',
  alternates: { canonical: 'https://propmarkethub.com.au/property-purchase-costs-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Property Purchase Costs Calculator Australia | PropMarketHub',
    description: 'Calculate all upfront buying costs — stamp duty, conveyancing, inspections, and loan fees. Know exactly how much cash you need at settlement.',
    url: 'https://propmarkethub.com.au/property-purchase-costs-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Purchase Costs Calculator Australia | PropMarketHub',
    description: 'Calculate all property purchase costs — stamp duty, legal fees, inspections. Free Australian calculator.',
  },
};

const FAQS = [
  {
    q: 'What are the typical upfront costs when buying property in Australia?',
    a: 'The main upfront costs are: stamp duty (the largest, typically 3–5% of purchase price), conveyancing and legal fees ($1,500–$3,000), building and pest inspection ($400–$800), loan establishment fee ($300–$600), lenders mortgage insurance if your deposit is under 20% ($5,000–$30,000+), property valuation ($300–$600), and moving costs ($1,000–$5,000). In total, buyers should budget 4–7% of the purchase price on top of their deposit to cover all acquisition costs.',
  },
  {
    q: 'Is stamp duty the same in every Australian state?',
    a: 'No. Stamp duty rates, thresholds, and concession structures vary significantly by state and territory. NSW charges a maximum marginal rate of 5.5% on the portion above $3,040,000, with a general rate of 4.5% on the largest slice for most buyers. Victoria applies 5.5% on amounts above $960,001. Queensland\'s top rate is 4.5%. Western Australia charges 5.15%. First home buyer concessions further reduce or eliminate duty in most states below certain price thresholds. Always use a state-specific calculator or check your state revenue office for the current schedule.',
  },
  {
    q: 'What does a conveyancer do and how much do they cost?',
    a: 'A conveyancer (or solicitor) manages the legal transfer of property ownership. Their work includes: reviewing the contract of sale, conducting title searches, liaising with the vendor\'s solicitor, arranging settlement with banks, and ensuring all legal requirements are met. Conveyancers typically charge $1,200–$2,500 for a standard residential purchase; solicitors charge $2,000–$4,000. The cost difference is usually modest — for complex purchases or off-the-plan contracts, using a solicitor is often worth the additional cost.',
  },
  {
    q: 'Do I need a building and pest inspection before buying?',
    a: 'Yes, for established homes. A building and pest inspection identifies structural defects, safety hazards, and evidence of termite activity that are not visible to the untrained eye. Costs range from $400 to $800 for a combined report. This is one of the most valuable due diligence expenditures in property buying — a single undisclosed structural problem can cost tens of thousands to rectify. For off-the-plan purchases, a building inspection is less relevant but a pre-settlement inspection of the completed property is essential.',
  },
  {
    q: 'What is transfer duty vs stamp duty?',
    a: 'They are the same tax. "Transfer duty" is the official legal term used in most state legislation; "stamp duty" is the common name that has stuck from the era when documents were physically stamped. Both terms refer to the state government tax payable on the transfer of property ownership. The rate and calculation method is identical regardless of which term is used — it is based on the purchase price (or market value, whichever is higher) of the property.',
  },
  {
    q: 'Can I add purchase costs to my home loan?',
    a: 'Some costs can be capitalised into the loan — particularly LMI, which most lenders will add to the loan balance — but stamp duty, conveyancing, and inspection fees generally cannot. Some lenders offer "cashback" refinance offers of $2,000–$4,000 that can offset some costs indirectly, but this is not the same as financing the costs. If you are short of cash for acquisition costs, some family guarantee arrangements allow parents to provide security in lieu of a larger deposit, which can free up cash for costs.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Property Purchase Costs Calculator',
      url: 'https://propmarkethub.com.au/property-purchase-costs-calculator',
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
        { '@type': 'ListItem', position: 2, name: 'Property Purchase Costs Calculator', item: 'https://propmarkethub.com.au/property-purchase-costs-calculator' },
      ],
    },
  ],
};

export default function PropertyPurchaseCostsCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>Property Purchase Costs Calculator</h1>
            <p className={styles.subtitle}>
              Calculate all the upfront costs of buying property in Australia — stamp duty, conveyancing, inspections, and loan fees — so you know exactly how much cash you need at settlement.
            </p>
          </div>
        </section>

        <section className={styles.calcSection}>
          <div className="container">
            <PropertyPurchaseCostsCalculatorProvider>
              <PropertyPurchaseCostsCalculator />
            </PropertyPurchaseCostsCalculatorProvider>
          </div>
        </section>

        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>What does it really cost to buy property in Australia?</h2>
            <p className={styles.guideIntro}>
              Most first-time buyers underestimate the cash required at settlement by 20–30%. They focus on the deposit and overlook stamp duty, legal fees, inspection costs, and loan establishment charges that can add $30,000–$60,000 to a typical purchase in a capital city. Knowing the full cost upfront — before you make an offer — prevents the distressing experience of having a loan approved but not enough cash to complete settlement.
            </p>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Every cost you need to budget for</h3>
              <p className={styles.guideBlockText}>
                Australian property purchases involve a predictable set of acquisition costs. Some are fixed (conveyancing, inspection fees), some are calculated as a percentage of the purchase price (stamp duty, agent commission if selling), and some depend on your loan structure (LMI, establishment fees). Here is a complete breakdown with typical ranges.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Total acquisition cost formula</span>
                <span className={styles.formula}>
                  {`Total cash required =
  Deposit (typically 10–20% of purchase price)
+ Stamp duty (state-specific, 3–5% for most buyers)
+ Conveyancing / legal fees ($1,500–$3,000)
+ Building & pest inspection ($400–$800)
+ Loan establishment fee ($300–$600)
+ Lenders Mortgage Insurance (if deposit < 20%)
+ Moving costs ($1,000–$5,000)
− Any grants received (FHOG etc.)`}
                </span>
                <span className={styles.formulaNote}>
                  LMI is the most variable item — it can range from $5,000 to $35,000+ depending on deposit size and loan amount. With a 20% deposit, LMI is zero. With a 5% deposit on a $900,000 property, LMI can exceed $30,000.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — $850,000 established home, NSW investor (no FHB concessions)</span>
                <div className={styles.expenseTable}>
                  <div className={styles.expenseRow}><span>Purchase price</span><span>$850,000</span></div>
                  <div className={styles.expenseRow}><span>Deposit (20%)</span><span>$170,000</span></div>
                  <div className={styles.expenseRow}><span>Stamp duty (NSW, investor rate)</span><span>$33,840</span></div>
                  <div className={styles.expenseRow}><span>Conveyancing + legal fees</span><span>$2,200</span></div>
                  <div className={styles.expenseRow}><span>Building &amp; pest inspection</span><span>$650</span></div>
                  <div className={styles.expenseRow}><span>Loan establishment fee</span><span>$500</span></div>
                  <div className={styles.expenseRow}><span>Bank valuation</span><span>$400</span></div>
                  <div className={styles.expenseRow}><span>LMI (20% deposit — not applicable)</span><span>$0</span></div>
                  <div className={styles.expenseRow}><span>Moving + miscellaneous</span><span>$2,000</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span>Total cash required at settlement</span><span>$209,590</span></div>
                </div>
                <p className={styles.exampleNote}>
                  Beyond the $170,000 deposit, this buyer needs an additional $39,590 in cash — nearly 4.7% of the purchase price — just to reach settlement. Stamp duty alone accounts for $33,840 of that. Buyers who budget only for the deposit and assume they can borrow the rest are often caught short.
                </p>
              </div>
            </div>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>How stamp duty is calculated in Australia</h3>
              <p className={styles.guideBlockText}>
                Stamp duty (transfer duty) uses a tiered bracket system — similar to income tax — where progressively higher rates apply to higher portions of the purchase price. The total duty is the sum of the tax calculated at each bracket rate. Rates and thresholds differ across every state and territory.
              </p>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>NSW stamp duty calculation on $850,000 purchase (investor)</span>
                <div className={styles.expenseTable}>
                  <div className={styles.expenseRow}><span><strong>Portion</strong></span><span><strong>Rate</strong></span><span><strong>Duty</strong></span></div>
                  <div className={styles.expenseRow}><span>$0 – $16,000</span><span>$1.25 per $100</span><span>$200</span></div>
                  <div className={styles.expenseRow}><span>$16,001 – $35,000</span><span>$1.50 per $100</span><span>$285</span></div>
                  <div className={styles.expenseRow}><span>$35,001 – $93,000</span><span>$1.75 per $100</span><span>$1,015</span></div>
                  <div className={styles.expenseRow}><span>$93,001 – $351,000</span><span>$3.50 per $100</span><span>$9,030</span></div>
                  <div className={styles.expenseRow}><span>$351,001 – $850,000</span><span>$4.50 per $100</span><span>$22,455</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span>Total stamp duty</span><span></span><span>$32,985</span></div>
                </div>
                <p className={styles.exampleNote}>
                  Note: NSW stamp duty rates and thresholds updated periodically. Always verify with the NSW Revenue Office (revenue.nsw.gov.au) before settlement. Use our <a href="/stamp-duty-calculator" style={{color: '#16a34a', fontWeight: 600}}>Stamp Duty Calculator</a> for real-time estimates across all states.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Purchase costs FAQs</h2>
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
