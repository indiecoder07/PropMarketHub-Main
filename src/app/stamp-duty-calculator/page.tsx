import type { Metadata } from 'next';
import Link from 'next/link';
import { StampDutyCalculator } from '@/features/StampDutyCalculator/StampDutyCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title:       'Free Stamp Duty Calculator Australia — All States 2025–26',
  description: 'Calculate stamp duty for any Australian state or territory. Covers NSW, VIC, QLD, WA, SA, TAS, ACT and NT with 2024–25 rates. Includes first home buyer concessions.',
  alternates:  { canonical: 'https://propmarkethub.com.au/stamp-duty-calculator' },
  robots:      { index: true, follow: true },
  openGraph: {
    title:       'Free Stamp Duty Calculator Australia — All States | PropMarketHub',
    description: 'Estimate stamp duty for NSW, VIC, QLD, WA, SA, TAS, ACT and NT. First home buyer concessions included. Free Australian tool.',
    url:         'https://propmarkethub.com.au/stamp-duty-calculator',
    siteName:    'PropMarketHub',
    locale:      'en_AU',
    type:        'website',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'Stamp Duty Calculator — PropMarketHub' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@propmarkethub',
    title:       'Free Stamp Duty Calculator Australia — All States | PropMarketHub',
    description: 'Instant stamp duty estimates for all Australian states & territories. FHB concessions included.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  },
  keywords: [
    'stamp duty calculator australia',
    'stamp duty nsw',
    'transfer duty calculator',
    'stamp duty calculator vic',
    'first home buyer stamp duty',
  ],
};

const FAQS = [
  {
    q: 'How much stamp duty will I pay in NSW on a $750,000 property?',
    a: 'On a $750,000 property in NSW in 2024–25, an owner-occupier or investor pays approximately $28,750 in stamp duty. The NSW tiered bracket system applies rates from $1.25 per $100 on the first $16,000 up to $4.50 per $100 on the portion between $351,001 and $1,107,000. A first home buyer purchasing an existing home under $800,000 qualifies for a full exemption — saving the entire $28,750.',
  },
  {
    q: 'Do first home buyers pay stamp duty in Australia?',
    a: 'It depends on the state and purchase price. NSW offers a full exemption for FHBs on properties up to $800,000 and a tapered concession up to $1,000,000. VIC exempts FHBs on new homes up to $600,000 and tapers to $750,000. QLD offers a concession up to $550,000. WA exempts FHBs on properties up to $430,000. SA and TAS do not offer stamp duty exemptions for FHBs but may offer First Home Owner Grants instead.',
  },
  {
    q: 'Is stamp duty different for investors and owner-occupiers?',
    a: 'In most states, the same transfer duty rates apply to both owner-occupiers and investors. However, investors are not eligible for first home buyer concessions. Some states impose additional surcharges: VIC charges a 1% absentee owner surcharge and an additional duty on foreign purchasers; NSW charges 8% surcharge purchaser duty on foreign investors. Australian citizens and permanent residents investing locally pay standard rates.',
  },
  {
    q: 'When is stamp duty paid in Australia?',
    a: 'Stamp duty (transfer duty) is typically due at settlement — the day legal title transfers to the buyer. In some states you have 30 days after settlement to pay, though most conveyancers pay at settlement. For off-the-plan purchases, duty may be deferred until construction completes. Your solicitor or conveyancer handles the payment, which is typically drawn from your deposit or loan funds at settlement.',
  },
  {
    q: 'Can stamp duty be added to my mortgage?',
    a: 'Stamp duty cannot be directly capitalised into most standard home loans — lenders typically require it to be paid from your genuine savings or other funds. However, some lenders allow you to increase your loan amount to cover stamp duty if your LVR remains below 80% (or 90% with LMI). This effectively means you borrow stamp duty, which increases your total interest paid over the life of the loan.',
  },
  {
    q: 'What is the difference between stamp duty and the land transfer fee?',
    a: 'Stamp duty (transfer duty) is the state government tax on the purchase — it is the major cost, ranging from $10,000 to over $80,000 depending on state and price. The land transfer registration fee is a separate, much smaller government fee charged to register the change of ownership in the land titles registry — typically $300–$1,500 depending on the state. Both are payable at settlement, but the stamp duty is the dominant cost.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Australian Stamp Duty Calculator',
      url: 'https://propmarkethub.com.au/stamp-duty-calculator',
      description: 'Free stamp duty calculator for all Australian states and territories — NSW, VIC, QLD, WA, SA, TAS, ACT, NT.',
      applicationCategory: 'FinanceApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
      author: { '@type': 'Organization', name: 'PropMarketHub', url: 'https://propmarkethub.com.au' },
      featureList: 'All 8 states and territories, First home buyer concessions, Investor vs owner-occupier rates, Effective rate display, Total upfront cost summary',
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
        { '@type': 'ListItem', position: 2, name: 'Stamp Duty Calculator', item: 'https://propmarkethub.com.au/stamp-duty-calculator' },
      ],
    },
  ],
};

export default function StampDutyCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · All Australian States &amp; Territories</p>
            <h1 className={styles.h1}>Stamp Duty Calculator</h1>
            <p className={styles.subtitle}>
              Estimate stamp duty for any property purchase in NSW, VIC, QLD, WA, SA, TAS, ACT or NT. Includes 2024–25 rates and first home buyer concessions.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className={styles.calcSection}>
          <div className="container">
            <StampDutyCalculator />
          </div>
        </section>

        {/* Guide */}
        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How stamp duty is calculated in Australia</h2>
            <p className={styles.guideIntro}>
              Stamp duty — formally called <strong>transfer duty</strong> in most states — is a state
              government tax on the purchase of property. Each state sets its own rates, brackets, and
              concession thresholds, which is why a $750,000 purchase attracts very different duty
              amounts in NSW versus QLD or WA. Understanding how the tiered bracket system works
              helps you budget accurately and identify whether you qualify for any concessions.
            </p>

            {/* Block 1: Bracket system */}
            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>How the tiered bracket system works</h3>
              <p className={styles.guideBlockText}>
                Stamp duty is not charged at a flat rate on the whole purchase price. Instead, your
                purchase price is divided into brackets, and each bracket is taxed at its own rate —
                similar to income tax. Only the portion of the price that falls within each bracket
                  is taxed at that bracket&apos;s rate. The total duty is the sum of each bracket&apos;s
                contribution.
              </p>

              <div className={styles.formulaCard}>
                <p className={styles.formulaLabel}>Formula</p>
                <p className={styles.formula}>
                  Total duty = Σ (amount in each bracket × bracket rate)
                </p>
                <p className={styles.formulaNote}>
                  Each state publishes its own bracket thresholds and rates. Use this calculator to apply the correct rates for your state automatically.
                </p>
              </div>

              <div className={styles.exampleCard}>
                <p className={styles.exampleLabel}>Worked example — NSW owner-occupier, $750,000</p>
                <p className={styles.exampleText}>
                  Using <strong>2024–25 NSW transfer duty rates</strong> for a <strong>$750,000 purchase</strong>:
                </p>
                <div className={styles.expenseTable}>
                  <div className={styles.expenseRow}><span>$0 – $16,000 @ $1.25 per $100</span><span>$200</span></div>
                  <div className={styles.expenseRow}><span>$16,001 – $35,000 @ $1.50 per $100</span><span>$285</span></div>
                  <div className={styles.expenseRow}><span>$35,001 – $93,000 @ $1.75 per $100</span><span>$1,015</span></div>
                  <div className={styles.expenseRow}><span>$93,001 – $351,000 @ $3.50 per $100</span><span>$9,030</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span>$351,001 – $750,000 @ $4.50 per $100</span><span>$17,955</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span><strong>Total stamp duty</strong></span><span><strong>$28,485</strong></span></div>
                </div>
                <p className={styles.exampleNote}>
                  The effective rate on $750,000 is 3.80% — much lower than the top marginal bracket rate of 4.50% because most of the purchase price falls in lower brackets.
                </p>
              </div>
            </div>

            {/* Block 2: FHB concessions */}
            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>First home buyer concessions — how they work</h3>
              <p className={styles.guideBlockText}>
                Most states offer stamp duty exemptions or reductions for eligible first home buyers.
                NSW uses a linear taper: below $800,000 you pay nothing; above $1,000,000 you pay
                full duty; between those thresholds the concession phases out proportionally. This
                means a first home buyer purchasing a $750,000 property in NSW pays <strong>$0</strong> in
                stamp duty — saving the full $28,485 compared to an investor buying the same property.
              </p>

              <div className={styles.exampleCard}>
                <p className={styles.exampleLabel}>NSW First Home Buyer — $750,000 vs $850,000</p>
                <p className={styles.exampleText}>
                  Comparing duty for a first home buyer at two price points in NSW:
                </p>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>$750,000 (below $800k threshold)</span>
                    <span className={styles.calcStepValue}>Full exemption → <strong>$0 duty</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Standard duty on $750,000</span>
                    <span className={styles.calcStepValue}>(would have been $28,485)</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>$850,000 (50% through taper)</span>
                    <span className={styles.calcStepValue}>~50% concession → approx. <strong>$16,575</strong></span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>$1,000,000+ (above taper)</span>
                    <span className={styles.calcStepValue}>Full duty applies → <strong>no concession</strong></span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  The $800,000 threshold in NSW is a hard cliff — buying at $799,000 saves the full concession; buying at $801,000 means the taper begins. Always check the exact threshold in your state before setting a purchase price ceiling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro / internal links */}
        <section className={styles.introSection}>
          <div className={`container ${styles.introInner}`}>
            <h2 className={styles.introHeading}>Budget your full upfront costs</h2>
            <p className={styles.introText}>
              Stamp duty is the biggest upfront cost beyond your deposit — but not the only one. Use
              the{' '}
              <Link href="/property-purchase-costs-calculator" className={styles.inlineLink}>property purchase costs calculator</Link>{' '}
              to tally legal fees, inspections, and loan establishment costs alongside stamp duty.
            </p>
            <p className={styles.introText}>
              Then model your repayments with the{' '}
              <Link href="/mortgage-calculator" className={styles.inlineLink}>mortgage calculator</Link>{' '}
              and check whether the investment stacks up with the{' '}
              <Link href="/rental-yield-calculator" className={styles.inlineLink}>rental yield calculator</Link>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Stamp duty FAQs</h2>
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
