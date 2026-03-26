import type { Metadata } from 'next';
import { FirstHomeBuyerCalculatorProvider } from '@/context/FirstHomeBuyerCalculatorContext';
import { FirstHomeBuyerCalculator } from '@/features/FirstHomeBuyerCalculator/FirstHomeBuyerCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'First Home Buyer Calculator Australia — Grants, Stamp Duty & Deposit',
  description: 'Calculate your total upfront costs, First Home Owner Grant eligibility, stamp duty concessions, and how much deposit you need as a first home buyer in Australia.',
  alternates: { canonical: 'https://propmarkethub.com.au/first-home-buyer-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'First Home Buyer Calculator Australia | PropMarketHub',
    description: 'Calculate grants, stamp duty concessions, deposit requirements, and total upfront costs for first home buyers in Australia.',
    url: 'https://propmarkethub.com.au/first-home-buyer-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'PropMarketHub — Free Property Investment Tools for Australia' }],
  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Home Buyer Calculator Australia | PropMarketHub',
    description: 'First home buyer costs, grants, and stamp duty concessions. Free Australian calculator.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  
  },
};

const FAQS = [
  {
    q: 'How much deposit do I need as a first home buyer in Australia?',
    a: 'The minimum deposit is 5% of the purchase price under the Federal Government\'s First Home Guarantee (FHBG), which allows eligible first home buyers to purchase with a 5% deposit without paying Lenders Mortgage Insurance (LMI) — the government guarantees the remaining 15%. Without the guarantee, lenders typically require a 20% deposit to avoid LMI, which can add $15,000–$30,000 to your costs. On top of the deposit, you will need additional cash for stamp duty (unless exempt), conveyancing, building inspections, and moving costs — typically 3–5% of the purchase price.',
  },
  {
    q: 'What is the First Home Owner Grant and how much is it?',
    a: 'The First Home Owner Grant (FHOG) is a one-off government payment to eligible first home buyers purchasing or building a new home. Grant amounts and eligibility thresholds vary by state: NSW offers $10,000 for new homes up to $600,000; VIC offers $10,000 for new homes up to $750,000 (regional VIC: $20,000); QLD offers $30,000 for new homes (until 30 June 2025); WA offers $10,000. The grant is paid at settlement or first drawdown for construction loans. It applies to new homes only — established properties do not qualify.',
  },
  {
    q: 'Do I pay stamp duty as a first home buyer?',
    a: 'Most states offer stamp duty concessions or full exemptions for first home buyers below certain price thresholds. In NSW, first home buyers purchasing new or existing homes up to $800,000 pay no stamp duty; the concession phases out up to $1,000,000. In VIC, first home buyers pay no stamp duty on homes up to $600,000; concessions apply up to $750,000. In QLD, a first home concession applies to homes under $550,000. Check your state\'s revenue office for current thresholds as these change periodically.',
  },
  {
    q: 'What is Lenders Mortgage Insurance and can I avoid it?',
    a: 'LMI is an insurance policy that protects the lender (not you) if you default and the property sells for less than the outstanding loan. It is typically charged when your deposit is less than 20% of the purchase price. On a $700,000 purchase with a 10% deposit, LMI can cost $12,000–$22,000, often added to the loan balance. You can avoid LMI by having a 20% deposit, using the First Home Guarantee (5% deposit, no LMI), or having a family member provide a guarantor loan.',
  },
  {
    q: 'What is the First Home Super Saver Scheme?',
    a: 'The First Home Super Saver Scheme (FHSSS) allows first home buyers to make voluntary contributions to their superannuation and later withdraw up to $50,000 (as of 2024) to use as a home deposit. Contributions and earnings in super are taxed at a maximum of 15%, which is lower than most people\'s marginal income tax rate. The scheme can generate meaningful tax savings but has strict rules around contribution types, annual limits, and withdrawal timing. Speak with a financial adviser before making contributions specifically for this purpose.',
  },
  {
    q: 'Should I buy new or established as a first home buyer?',
    a: 'Both have trade-offs. New properties typically attract the First Home Owner Grant and full stamp duty exemptions in most states, and you benefit from depreciation if you later rent it. Established homes are often in more established suburbs with better transport, schools, and amenities. New builds carry construction risk (builder insolvency is a real consideration in the current market) and may be in outer-growth corridors with slower capital growth. For most first home buyers, the combination of financial incentives and lower maintenance costs makes new properties financially attractive if location is acceptable.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'First Home Buyer Calculator',
      url: 'https://propmarkethub.com.au/first-home-buyer-calculator',
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
        { '@type': 'ListItem', position: 2, name: 'First Home Buyer Calculator', item: 'https://propmarkethub.com.au/first-home-buyer-calculator' },
      ],
    },
  ],
};

export default function FirstHomeBuyerCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>First Home Buyer Calculator</h1>
            <p className={styles.subtitle}>
              Estimate your total upfront costs, grant eligibility, stamp duty concessions, and minimum deposit as an Australian first home buyer.
            </p>
          </div>
        </section>

        <section className={styles.calcSection}>
          <div className="container">
            <FirstHomeBuyerCalculatorProvider>
              <FirstHomeBuyerCalculator />
            </FirstHomeBuyerCalculatorProvider>
          </div>
        </section>

        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>First home buyer costs and grants in Australia</h2>
            <p className={styles.guideIntro}>
              Buying your first home in Australia involves more than just saving a deposit. Stamp duty, government grants, LMI, conveyancing, and inspection fees all affect how much cash you need at settlement. The good news is that Australian first home buyers have access to a range of government schemes that can significantly reduce the upfront burden — if you know how to use them.
            </p>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>True upfront cost: what you actually need at settlement</h3>
              <p className={styles.guideBlockText}>
                Most first home buyers focus on the deposit and underestimate the total cash needed at settlement. The true upfront cost is your deposit plus stamp duty (if applicable), conveyancing fees, building and pest inspections, loan establishment fees, and moving costs. Stamp duty — even with first home buyer concessions — can add $15,000–$40,000 depending on the purchase price and state.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Formula — Total cash required at settlement</span>
                <span className={styles.formula}>
                  {`Total required = Deposit + Stamp duty − FHOG grant + Conveyancing
                  + Building inspection + Loan fees + Moving costs`}
                </span>
                <span className={styles.formulaNote}>
                  The First Home Owner Grant is typically paid at settlement and can reduce your required cash. Some states allow the grant to contribute toward the deposit. Always confirm with your conveyancer whether the grant is paid before or at settlement.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — NSW first home buyer, $750,000 new home</span>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Purchase price</span>
                    <span className={styles.calcStepValue}>$750,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Deposit (10% = avoids LMI via FHBG)</span>
                    <span className={styles.calcStepValue}>$75,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Stamp duty (NSW new home, $750k — exempt)</span>
                    <span className={styles.calcStepValue}>$0</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>First Home Owner Grant (new home)</span>
                    <span className={styles.calcStepValue}>−$10,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Conveyancing + legal fees</span>
                    <span className={styles.calcStepValue}>$2,200</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Building &amp; pest inspection</span>
                    <span className={styles.calcStepValue}>$600</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Loan establishment + misc.</span>
                    <span className={styles.calcStepValue}>$800</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Total cash needed at settlement</span>
                    <span className={styles.calcStepValue}>$68,600</span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  The FHOG effectively reduces your out-of-pocket requirement from $78,600 to $68,600. Under the First Home Guarantee, this buyer avoids LMI entirely despite having only a 10% deposit — saving an estimated $18,000–$22,000.
                </p>
              </div>
            </div>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Federal and state schemes: stacking your benefits</h3>
              <p className={styles.guideBlockText}>
                Australian first home buyers can often combine multiple federal and state government schemes simultaneously. Understanding how to stack these benefits can reduce your upfront cash requirement by $30,000–$50,000 on a typical purchase.
              </p>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Key schemes at a glance (2024–25)</span>
                <div className={styles.expenseTable}>
                  <div className={styles.expenseRow}><span><strong>Scheme</strong></span><span><strong>Benefit</strong></span></div>
                  <div className={styles.expenseRow}><span>First Home Guarantee (Federal)</span><span>5% deposit, no LMI</span></div>
                  <div className={styles.expenseRow}><span>First Home Owner Grant (State)</span><span>$10,000–$30,000 cash</span></div>
                  <div className={styles.expenseRow}><span>Stamp Duty Exemption (State)</span><span>$0–$40,000 saved</span></div>
                  <div className={styles.expenseRow}><span>First Home Super Saver</span><span>Up to $50,000 from super</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span>Potential total benefit</span><span>$60,000–$120,000+</span></div>
                </div>
                <p className={styles.exampleNote}>
                  Eligibility rules, price caps, and scheme allocations change each financial year. Always check the current thresholds at your state revenue office and the National Housing Finance and Investment Corporation (NHFIC) website before making purchase decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>First home buyer FAQs</h2>
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
