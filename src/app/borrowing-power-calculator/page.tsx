import type { Metadata } from 'next';
import { BorrowingPowerCalculatorProvider } from '@/context/BorrowingPowerCalculatorContext';
import { BorrowingPowerCalculator } from '@/features/BorrowingPowerCalculator/BorrowingPowerCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Borrowing Power Calculator Australia — How Much Can I Borrow?',
  description: 'Estimate how much an Australian lender may approve based on your income, expenses, debts, and the 3% serviceability buffer.',
  alternates: { canonical: 'https://propmarkethub.com.au/borrowing-power-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Borrowing Power Calculator Australia | PropMarketHub',
    description: 'Find out how much you can borrow for a home loan in Australia. Models income, expenses, existing debts, and the APRA serviceability buffer.',
    url: 'https://propmarkethub.com.au/borrowing-power-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'PropMarketHub — Free Property Investment Tools for Australia' }],
  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Borrowing Power Calculator Australia | PropMarketHub',
    description: 'Estimate your maximum home loan borrowing capacity. Models the APRA 3% serviceability buffer. Free Australian tool.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  
  },
};

const FAQS = [
  {
    q: 'What is the APRA 3% serviceability buffer and why does it matter?',
    a: 'APRA (Australian Prudential Regulation Authority) requires lenders to assess your ability to repay a loan at your actual interest rate plus a 3% buffer. If your loan rate is 6.5%, you are tested at 9.5%. This buffer is designed to ensure borrowers can still service the loan if rates rise significantly. It directly caps how much you can borrow — a higher assessment rate means a smaller maximum loan.',
  },
  {
    q: 'How does existing debt affect my borrowing power?',
    a: 'Every dollar of existing debt repayment reduces the monthly surplus available to service a new mortgage. Lenders typically use an HEM (Household Expenditure Measure) or your declared living expenses — whichever is higher — and add your existing debt commitments before assessing what you can borrow. Paying off a $10,000 personal loan before applying can sometimes increase your borrowing capacity by $50,000 or more.',
  },
  {
    q: 'Does having dependants reduce how much I can borrow?',
    a: 'Yes. Lenders factor dependants into their HEM benchmarks, which raises the assumed living cost floor. Each additional dependant effectively reduces your assessed monthly surplus and therefore your maximum borrowing amount. The impact varies by lender but is typically $20,000–$50,000 per dependant.',
  },
  {
    q: 'Can rental income count towards my borrowing power?',
    a: 'Yes, but lenders typically shade rental income — they only count 70–80% of gross rental income to account for vacancy and management costs. Owner-occupied rental income (e.g., from a granny flat) is treated similarly. Make sure to declare all rental income and associated expenses on your application, as the net position affects your assessed capacity.',
  },
  {
    q: 'Why do different lenders give me different borrowing estimates?',
    a: 'Every lender applies its own internal credit policy: different living expense benchmarks, different income shading percentages for casual or self-employed income, different treatment of HECS-HELP debt, and different assumptions about credit card limits. It is entirely normal for borrowing estimates to vary by $100,000 or more across lenders. A mortgage broker can help you identify which lender\'s policy best suits your situation.',
  },
  {
    q: 'Should I borrow the maximum amount I am approved for?',
    a: 'Rarely. Your maximum approved amount is a lender\'s ceiling, not a recommendation. Borrowing at the absolute limit leaves no buffer for rate rises, job changes, or unexpected expenses. Most financial advisers suggest targeting a monthly repayment that is no more than 25–30% of your gross income, which is often significantly less than your theoretical maximum.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Borrowing Power Calculator',
      url: 'https://propmarkethub.com.au/borrowing-power-calculator',
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
        { '@type': 'ListItem', position: 2, name: 'Borrowing Power Calculator', item: 'https://propmarkethub.com.au/borrowing-power-calculator' },
      ],
    },
  ],
};

export default function BorrowingPowerCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>Borrowing Power Calculator</h1>
            <p className={styles.subtitle}>
              Estimate how much an Australian bank may lend you based on income, living expenses, existing debts, and the APRA serviceability buffer.
            </p>
          </div>
        </section>

        <section className={styles.calcSection}>
          <div className="container">
            <BorrowingPowerCalculatorProvider>
              <BorrowingPowerCalculator />
            </BorrowingPowerCalculatorProvider>
          </div>
        </section>

        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How lenders calculate your borrowing power</h2>
            <p className={styles.guideIntro}>
              Australian lenders do not simply look at your income and multiply it by some fixed factor. They run a detailed serviceability assessment that stress-tests your ability to repay a loan at a higher rate than you will actually pay. Understanding this process helps you prepare a stronger application and set realistic expectations before you start looking at properties.
            </p>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>The serviceability assessment formula</h3>
              <p className={styles.guideBlockText}>
                At its core, borrowing power is determined by how much monthly surplus you have after living expenses and existing debt repayments — assessed at a stressed interest rate that is typically 3% above the actual loan rate.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Formula</span>
                <span className={styles.formula}>
                  Monthly surplus = Net income − HEM expenses − Existing debt repayments{'\n'}
                  Max borrowing = Surplus ÷ Stressed monthly repayment factor
                </span>
                <span className={styles.formulaNote}>
                  The stressed monthly repayment factor is derived from the amortisation formula at (actual rate + 3% buffer) over the full loan term. APRA sets the minimum buffer at 3%; lenders may apply a higher floor.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — Single applicant, $120,000 gross income</span>
                <p className={styles.exampleText}>
                  Applicant earns $120,000/year gross. No dependants. Single car loan of $400/month. Lender uses HEM of $2,200/month for living expenses. No existing home loans.
                </p>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Gross annual income</span>
                    <span className={styles.calcStepValue}>$120,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Net monthly income (~78% of gross/12)</span>
                    <span className={styles.calcStepValue}>$7,800/mo</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Less HEM living expenses</span>
                    <span className={styles.calcStepValue}>−$2,200/mo</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Less existing car loan repayment</span>
                    <span className={styles.calcStepValue}>−$400/mo</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Monthly surplus available for mortgage</span>
                    <span className={styles.calcStepValue}>$5,200/mo</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Assessment rate (6.5% actual + 3% buffer)</span>
                    <span className={styles.calcStepValue}>9.5% p.a.</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Estimated maximum loan (30-year term)</span>
                    <span className={styles.calcStepValue}>~$600,000</span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  If this applicant repaid the car loan before applying, their monthly surplus would increase to $5,600 — potentially adding $45,000–$50,000 to their maximum borrowing capacity.
                </p>
              </div>
            </div>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Key factors that increase or decrease borrowing power</h3>
              <p className={styles.guideBlockText}>
                While income is the primary driver, lenders weigh many other variables in their credit assessment. Knowing these levers lets you proactively improve your position before applying.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Factors that INCREASE borrowing power</span>
                <span className={styles.formula}>
                  ↑ Higher income (salary, rental, dividends){'\n'}
                  ↑ Lower existing debts / cleared credit cards{'\n'}
                  ↑ Longer loan term (30 yr vs 25 yr){'\n'}
                  ↑ Lower living expenses (no dependants)
                </span>
                <span className={styles.formulaNote}>
                  Reducing or closing unused credit cards can help significantly — lenders typically assess 3–3.5% of the credit limit as a monthly commitment, regardless of actual usage.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Impact of closing a $20,000 credit card limit</span>
                <p className={styles.exampleText}>
                  A $20,000 credit card limit costs approximately $600/month in assumed repayments in a lender&apos;s serviceability model (3% of limit). Closing this card before applying can free up enough monthly surplus to increase your approved loan by around $70,000–$80,000 at current assessment rates.
                </p>
                <p className={styles.exampleNote}>
                  This is one of the most impactful and under-utilised borrowing power strategies. If you do not use the card regularly, closing it well before your application (to allow credit file updates) is worth considering.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Borrowing power FAQs</h2>
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
