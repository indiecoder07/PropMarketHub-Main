import type { Metadata } from 'next';
import { ExtraRepaymentCalculatorProvider } from '@/context/ExtraRepaymentCalculatorContext';
import { ExtraRepaymentCalculator } from '@/features/ExtraRepaymentCalculator/ExtraRepaymentCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Extra Repayment Calculator Australia — Pay Off Your Mortgage Faster',
  description: 'See how much interest you can save and how many years you can cut off your mortgage by making extra repayments each month.',
  alternates: { canonical: 'https://propmarkethub.com.au/extra-repayment-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Extra Repayment Calculator Australia | PropMarketHub',
    description: 'Calculate how extra mortgage repayments reduce your loan term and total interest. Free Australian home loan tool.',
    url: 'https://propmarkethub.com.au/extra-repayment-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Extra Repayment Calculator Australia | PropMarketHub',
    description: 'See how extra repayments slash your mortgage term and interest bill. Free Australian calculator.',
  },
};

const FAQS = [
  {
    q: 'How much interest can I save with extra repayments?',
    a: 'On a typical $600,000 loan at 6.5% over 30 years, adding just $500 per month in extra repayments can save approximately $154,000 in interest and cut the loan term by nearly seven years. The savings compound because every extra dollar reduces your principal, which directly reduces the interest calculated each month.',
  },
  {
    q: 'Is it better to make extra repayments or put money into an offset account?',
    a: 'Both strategies reduce the interest charged on your loan, and the mathematical outcome is almost identical. The key difference is flexibility: money in an offset account can be withdrawn at any time, while extra repayments on some loans (particularly fixed-rate loans) may not be redrawn without fees. If liquidity matters to you, an offset account is generally preferable. If you want the discipline of not having easy access to the money, direct repayments may help you stay on track.',
  },
  {
    q: 'Can I make extra repayments on a fixed-rate loan?',
    a: 'Many fixed-rate loans in Australia cap extra repayments at $10,000–$30,000 per year. Exceeding this cap can trigger break costs. If extra repayments are a priority, check the specific terms of any fixed loan before committing. Variable rate loans typically allow unlimited extra repayments without penalty.',
  },
  {
    q: 'What is the difference between extra repayments and a lump-sum payment?',
    a: 'Regular extra repayments provide consistent principal reduction each month, delivering steady compounding interest savings. A lump-sum payment (e.g., using a tax refund or inheritance) reduces your balance at a single point in time, after which interest is calculated on the lower balance. Both are effective strategies, and combining them — regular extras plus occasional lump sums — maximises savings.',
  },
  {
    q: 'Does my lender need to know I am making extra repayments?',
    a: 'No — most variable-rate loans allow you to pay any amount above your minimum repayment at any time without notifying the lender. Simply increase your direct debit or transfer additional funds to your loan account. The extra amount will reduce your outstanding principal immediately.',
  },
  {
    q: 'Will extra repayments reduce my minimum monthly repayment?',
    a: 'Not automatically. Most lenders keep the minimum repayment fixed even as your balance falls ahead of schedule. This is actually beneficial — it means the extra repayment savings are compounding faster because the unchanged repayment amount is eating into principal more aggressively. Some lenders periodically recalculate your minimum repayment downward, which reduces the compounding benefit; check your loan terms.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Extra Repayment Calculator',
      url: 'https://propmarkethub.com.au/extra-repayment-calculator',
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
        { '@type': 'ListItem', position: 2, name: 'Extra Repayment Calculator', item: 'https://propmarkethub.com.au/extra-repayment-calculator' },
      ],
    },
  ],
};

export default function ExtraRepaymentCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>Extra Repayment Calculator</h1>
            <p className={styles.subtitle}>
              Discover how much interest you can save and how many years you can cut from your mortgage by making additional repayments each month.
            </p>
          </div>
        </section>

        <section className={styles.calcSection}>
          <div className="container">
            <ExtraRepaymentCalculatorProvider>
              <ExtraRepaymentCalculator />
            </ExtraRepaymentCalculatorProvider>
          </div>
        </section>

        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How extra repayments reduce your mortgage</h2>
            <p className={styles.guideIntro}>
              Australian home loans calculate interest daily on your outstanding balance. Every extra dollar you pay into the loan immediately reduces that balance — and therefore the interest calculated tomorrow. This compounding effect means even modest additional repayments can save enormous amounts over a 25–30 year mortgage. The earlier in the loan life you make extra repayments, the greater the compounding benefit.
            </p>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Why extra repayments compound so powerfully</h3>
              <p className={styles.guideBlockText}>
                In the early years of a mortgage, the vast majority of your minimum repayment goes towards interest rather than principal. Extra repayments go directly to the principal, which reduces future interest, which means your regular repayment then pays off even more principal — a virtuous cycle that accelerates debt elimination.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Mechanism</span>
                <span className={styles.formula}>
                  Daily interest = Outstanding balance × (Annual rate ÷ 365){'\n'}
                  Extra repayment → ↓ balance → ↓ daily interest → more principal repaid each month
                </span>
                <span className={styles.formulaNote}>
                  Each extra repayment creates a permanent reduction in future interest. Unlike a lump sum deposited in a savings account, there is no tax on the interest saved within a mortgage.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — $600,000 loan at 6.50% over 30 years</span>
                <p className={styles.exampleText}>
                  Standard minimum monthly repayment: $3,792. What happens when you add $500/month?
                </p>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Loan amount</span>
                    <span className={styles.calcStepValue}>$600,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Interest rate</span>
                    <span className={styles.calcStepValue}>6.50% p.a.</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Standard total interest (30 yr)</span>
                    <span className={styles.calcStepValue}>$765,120</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Total interest with +$500/mo</span>
                    <span className={styles.calcStepValue}>$610,640</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Interest saved</span>
                    <span className={styles.calcStepValue}>$154,480</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Standard loan term</span>
                    <span className={styles.calcStepValue}>30 years</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>New loan term with extras</span>
                    <span className={styles.calcStepValue}>~23 years 4 months</span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  An extra $500/month — roughly the cost of a daily coffee habit — saves $154,480 in interest and pays off the loan nearly 7 years early. The total extra contributed is $140,000 but the interest saving exceeds it.
                </p>
              </div>
            </div>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Extra repayments vs offset account: which is better?</h3>
              <p className={styles.guideBlockText}>
                Both reduce the interest charged on your loan dollar for dollar. The strategic difference is liquidity. Funds in an offset account can be withdrawn at any time without fees; extra repayments made to some loans (particularly fixed rate) cannot always be redrawn.
              </p>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Decision guide</span>
                <p className={styles.exampleText}>
                  <strong>Choose extra repayments if:</strong> your loan has a free redraw facility and you want maximum psychological commitment to debt reduction. The interest saving is identical to an offset account.
                </p>
                <p className={styles.exampleText}>
                  <strong>Choose an offset account if:</strong> you may need access to the funds (emergency fund, investment opportunity, renovation), or if you are on a fixed-rate loan that caps extra repayments.
                </p>
                <p className={styles.exampleNote}>
                  Both strategies are mathematically equivalent as long as you maintain the same balance. The right answer depends on your discipline and liquidity needs — not on the maths.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Extra repayment FAQs</h2>
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
