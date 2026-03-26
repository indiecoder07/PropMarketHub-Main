import type { Metadata } from 'next';
import { LoanComparisonCalculatorProvider } from '@/context/LoanComparisonCalculatorContext';
import { LoanComparisonCalculator } from '@/features/LoanComparisonCalculator/LoanComparisonCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Loan Comparison Calculator Australia — Compare Home Loans',
  description: 'Compare two Australian home loan scenarios side by side — rate, fees, and total cost — to find the cheaper deal over your full term.',
  alternates: { canonical: 'https://propmarkethub.com.au/loan-comparison-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Loan Comparison Calculator Australia | PropMarketHub',
    description: 'Compare two Australian home loan options side by side — rate, fees, and total cost — to find the better deal.',
    url: 'https://propmarkethub.com.au/loan-comparison-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Comparison Calculator Australia | PropMarketHub',
    description: 'Compare two loan scenarios by rate, fees, and total cost. Free Australian home loan comparison tool.',
  },
};

const FAQS = [
  {
    q: 'What is the most important number when comparing loans?',
    a: 'Total cost of credit — the sum of all repayments plus upfront fees over the full loan term. A loan with a marginally lower interest rate can still cost more overall if its fees are significantly higher. Always compare the complete picture, not just the headline rate.',
  },
  {
    q: 'How does a comparison rate differ from the advertised rate?',
    a: 'The comparison rate is a standardised figure that incorporates both the interest rate and most ongoing fees into a single percentage, making it easier to compare like-for-like. In Australia, lenders are legally required to display a comparison rate alongside their advertised rate. It is calculated on a $150,000 loan over 25 years, so it may not perfectly reflect your situation, but it is a helpful starting point.',
  },
  {
    q: 'Can a higher-fee loan ever be cheaper than a low-fee loan?',
    a: 'No — if the total cost of credit (repayments + fees) is lower on the high-fee loan, then yes, it can be cheaper overall. This typically happens when the lower-fee loan has a significantly higher interest rate that outweighs the fee saving over a long term. For short holding periods (e.g., refinancing after 3 years), upfront fee differences have less time to amortise, so lower-rate, higher-fee loans become less attractive.',
  },
  {
    q: 'Should I compare fixed and variable loans directly?',
    a: 'You can, but keep in mind the comparison is inherently uncertain for variable loans because the rate may change. Our calculator lets you model a variable loan at today\'s rate as a worst-case or best-case estimate. A common strategy is to compare: (a) full variable, (b) full fixed, and (c) a split arrangement to understand the range of outcomes.',
  },
  {
    q: 'How do offset accounts and redraw affect the comparison?',
    a: 'Offset accounts reduce the loan balance on which interest is calculated daily, effectively lowering your interest cost without changing your contracted rate. Redraw allows you to access extra repayments. Neither is captured in a pure rate-and-fee comparison, so if one loan has a 100% offset account and the other does not, factor in the value of funds you would regularly hold in offset when deciding.',
  },
  {
    q: 'What is a "break cost" on a fixed loan and should I factor it in?',
    a: 'If you sell, refinance, or make large lump-sum repayments on a fixed-rate loan before the fixed period ends, the lender may charge a break cost (also called an economic cost fee). These can be substantial — sometimes tens of thousands of dollars — and are not easily predictable. If there is any chance you will exit the loan early, fixed loans carry hidden switching risk that a simple rate comparison will not reveal.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Loan Comparison Calculator',
      url: 'https://propmarkethub.com.au/loan-comparison-calculator',
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
        { '@type': 'ListItem', position: 2, name: 'Loan Comparison Calculator', item: 'https://propmarkethub.com.au/loan-comparison-calculator' },
      ],
    },
  ],
};

export default function LoanComparisonCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>Loan Comparison Calculator</h1>
            <p className={styles.subtitle}>
              Compare two home loan options side by side — interest rate, fees, and total borrowing cost — to identify the genuinely cheaper deal.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className={styles.calcSection}>
          <div className="container">
            <LoanComparisonCalculatorProvider>
              <LoanComparisonCalculator />
            </LoanComparisonCalculatorProvider>
          </div>
        </section>

        {/* Guide */}
        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How to compare home loans in Australia</h2>
            <p className={styles.guideIntro}>
              Choosing between home loans based solely on the advertised interest rate is one of the most common — and costly — mistakes Australian borrowers make. A loan with a lower headline rate can still cost you tens of thousands more over its life once fees, charges, and product features are taken into account. Understanding the true cost of credit is the foundation of any sound loan comparison.
            </p>

            {/* Block 1: Total cost formula */}
            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>The total cost of credit formula</h3>
              <p className={styles.guideBlockText}>
                The single most useful number when comparing loans is the <strong>total cost of credit</strong> — the sum of every dollar you will pay over the life of the loan. It accounts for both the monthly repayment and any upfront establishment fees.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Formula</span>
                <span className={styles.formula}>Total Cost = (Monthly Repayment × Number of Payments) + Upfront Fee</span>
                <span className={styles.formulaNote}>
                  Where: Monthly Repayment is derived from the standard amortisation formula using the loan principal, interest rate, and term. Upfront fees include application, valuation, and legal fees charged at settlement.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — $700,000 loan over 30 years</span>
                <p className={styles.exampleText}>
                  Suppose you are comparing two $700,000 loans with 30-year terms:
                </p>
                <div className={styles.expenseTable}>
                  <div className={styles.expenseRow}><span>Loan A: 6.20% p.a. + $800 fee</span><span></span></div>
                  <div className={styles.expenseRow}><span>Monthly repayment (A)</span><span>$4,276</span></div>
                  <div className={styles.expenseRow}><span>Total repayments × 360</span><span>$1,539,360</span></div>
                  <div className={styles.expenseRow}><span>Plus upfront fee</span><span>$800</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span>Loan A total cost</span><span>$1,540,160</span></div>
                  <div className={styles.expenseRow}><span>Loan B: 5.90% p.a. + $1,500 fee</span><span></span></div>
                  <div className={styles.expenseRow}><span>Monthly repayment (B)</span><span>$4,153</span></div>
                  <div className={styles.expenseRow}><span>Total repayments × 360</span><span>$1,495,080</span></div>
                  <div className={styles.expenseRow}><span>Plus upfront fee</span><span>$1,500</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span>Loan B total cost</span><span>$1,496,580</span></div>
                </div>
                <p className={styles.exampleNote}>
                  Despite Loan B charging $700 more in upfront fees, its lower rate saves $43,580 in total interest over 30 years — making it the genuinely cheaper option by $43,580. The rate difference of 0.30% compounded over three decades is far more powerful than the fee difference.
                </p>
              </div>
            </div>

            {/* Block 2: Break-even period */}
            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Break-even period: how long before the lower rate wins?</h3>
              <p className={styles.guideBlockText}>
                If one loan charges significantly higher upfront fees but a lower ongoing rate, there is a <strong>break-even point</strong> — the number of months after which the rate saving overtakes the fee disadvantage. If you plan to sell or refinance before that point, the higher-fee loan may actually cost you more.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Break-even formula</span>
                <span className={styles.formula}>Break-even months = Fee difference ÷ Monthly repayment difference</span>
                <span className={styles.formulaNote}>
                  If your holding period is shorter than the break-even period, choose the loan with the lower upfront cost. If longer, choose the loan with the lower rate.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Example — When does Loan B break even?</span>
                <p className={styles.exampleText}>
                  Using the loans above: Loan B has a $700 higher fee but saves $123/month in repayments ($4,276 − $4,153). Break-even = $700 ÷ $123 ≈ <strong>6 months</strong>. After just six months, Loan B is ahead. If you intend to hold the loan for at least two years, Loan B wins convincingly.
                </p>
                <p className={styles.exampleNote}>
                  This analysis assumes you do not switch loans mid-term and that the variable rate on either loan does not change significantly. Use our calculator to model both scenarios with your real numbers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Loan comparison FAQs</h2>
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
