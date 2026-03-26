import type { Metadata } from 'next';
import { RentVsBuyCalculatorProvider } from '@/context/RentVsBuyCalculatorContext';
import { RentVsBuyCalculator } from '@/features/RentVsBuyCalculator/RentVsBuyCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator Australia — Is It Better to Rent or Buy?',
  description: 'Compare the true long-term cost of renting versus buying a home in Australia — including opportunity cost, capital growth, and all transaction costs.',
  alternates: { canonical: 'https://propmarkethub.com.au/rent-vs-buy-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Rent vs Buy Calculator Australia | PropMarketHub',
    description: 'Is it better to rent or buy in Australia? Model capital growth, opportunity cost, and total costs over your time horizon. Free tool.',
    url: 'https://propmarkethub.com.au/rent-vs-buy-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'PropMarketHub — Free Property Investment Tools for Australia' }],
  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent vs Buy Calculator Australia | PropMarketHub',
    description: 'Compare renting vs buying in Australia — total costs, equity built, and opportunity cost. Free calculator.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  
  },
};

const FAQS = [
  {
    q: 'Is it always better to buy than rent in Australia?',
    a: 'No — this is one of the most persistent myths in Australian personal finance. Whether buying is better depends on: how long you intend to stay in the property (shorter horizons favour renting due to high transaction costs), the price-to-rent ratio in your target suburb, the opportunity cost of the deposit capital, your access to a mortgage, and local price growth expectations. In expensive markets like Sydney, the rent-vs-buy maths often favours renting for holding periods under 7–10 years once all costs are accounted for.',
  },
  {
    q: 'What is the break-even holding period for buying vs renting?',
    a: 'The break-even point is the number of years you must own the property before your total ownership costs (including stamp duty, maintenance, and mortgage interest) equal what you would have spent renting an equivalent property — accounting for the investment returns on your deposit if you had rented instead. In Australian capital cities, this typically ranges from 4 to 10 years depending on the suburb, property price, and assumed capital growth rate. High-transaction-cost states like NSW and VIC have longer break-even periods.',
  },
  {
    q: 'What is the opportunity cost of a house deposit?',
    a: 'If you use $150,000 as a house deposit, that money is no longer available to invest in shares, superannuation, or a business. The opportunity cost is the return you forgo on that capital. If Australian shares return an average of 8% per year and you hold your home for 10 years, your $150,000 deposit could have grown to $323,000 in shares — a $173,000 opportunity cost. A rigorous rent-vs-buy analysis must include this comparison, not just the nominal cost of rent vs mortgage.',
  },
  {
    q: 'Does renting mean throwing money away?',
    a: 'No. Rent pays for housing — a real service with real value, just like paying for any other service. Owning a home also involves significant "thrown away" costs: mortgage interest (often $30,000–$50,000/year on a median Sydney mortgage), council rates, insurance, maintenance, and stamp duty that is never recovered. The relevant question is not whether rent is wasted but whether the total cost of ownership — including all non-equity components — exceeds the total cost of renting an equivalent property over your intended timeframe.',
  },
  {
    q: 'How does capital growth affect the rent vs buy comparison?',
    a: 'Capital growth is the most powerful factor in favour of buying. If your $900,000 home grows at 6% per year, it generates $54,000 in paper wealth in year one — far exceeding the mortgage interest cost on the equity component. Over 10 years at 6% compound growth, the property would be worth approximately $1,611,000, a gain of $711,000. However, capital growth is not guaranteed and varies enormously by location. The rent-vs-buy comparison should be modelled at conservative (3%), base (6%), and optimistic (8%) growth scenarios.',
  },
  {
    q: 'When does renting and investing the difference make financial sense?',
    a: 'The "rent and invest" strategy makes sense when: the rental yield is very low relative to asset prices (price-to-annual-rent ratio above 25–30×), you invest the deposit and the monthly mortgage-vs-rent difference consistently in diversified assets, you are disciplined enough to actually invest the difference (not spend it), and your holding period is under 7 years. In practice, behavioural factors — the forced savings of a mortgage, the psychological stability of ownership — mean most people build more wealth by buying, even if the pure maths slightly favours renting in expensive markets.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Rent vs Buy Calculator',
      url: 'https://propmarkethub.com.au/rent-vs-buy-calculator',
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
        { '@type': 'ListItem', position: 2, name: 'Rent vs Buy Calculator', item: 'https://propmarkethub.com.au/rent-vs-buy-calculator' },
      ],
    },
  ],
};

export default function RentVsBuyCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>Rent vs Buy Calculator</h1>
            <p className={styles.subtitle}>
              Compare the true long-term financial outcome of renting versus buying in Australia — factoring in capital growth, opportunity cost, stamp duty, and all ownership costs.
            </p>
          </div>
        </section>

        <section className={styles.calcSection}>
          <div className="container">
            <RentVsBuyCalculatorProvider>
              <RentVsBuyCalculator />
            </RentVsBuyCalculatorProvider>
          </div>
        </section>

        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How to compare renting vs buying in Australia</h2>
            <p className={styles.guideIntro}>
              The rent-vs-buy decision is one of the most consequential financial choices Australians make — yet it is usually framed too simply. &quot;Renting is throwing money away&quot; and &quot;buying is always better&quot; are both incomplete views. A rigorous comparison must account for every cost of ownership (not just the mortgage), the opportunity cost of your deposit capital, and the time horizon over which you intend to hold the property.
            </p>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>The true cost of ownership vs renting</h3>
              <p className={styles.guideBlockText}>
                Owning a home involves significant costs beyond the mortgage repayment. A complete rent-vs-buy analysis compares the total cost of renting (just weekly rent × 52) against the total cost of ownership — mortgage interest, rates, insurance, maintenance, plus the opportunity cost of the deposit. The gap between these two totals determines which is financially superior over your intended holding period.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Annual cost comparison</span>
                <span className={styles.formula}>
                  {`Annual renting cost = Weekly rent × 52 + Contents insurance

Annual ownership cost = Mortgage interest
  + Council rates + Water rates
  + Building insurance + Maintenance (1% of value)
  + Opportunity cost of deposit (deposit × alternative return rate)
  − Capital growth (property value × growth rate)`}
                </span>
                <span className={styles.formulaNote}>
                  Capital growth reduces the effective ownership cost over time — this is why buying becomes more attractive the longer you hold. Opportunity cost makes renting more attractive in the short term when the deposit is large relative to the property value.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — $900,000 home, Sydney, 10-year horizon</span>
                <div className={styles.expenseTable}>
                  <div className={styles.expenseRow}><span><strong>Renting (equivalent property ~$700/wk)</strong></span><span></span></div>
                  <div className={styles.expenseRow}><span>Annual rent cost</span><span>$36,400/yr</span></div>
                  <div className={styles.expenseRow}><span>10-year total rent paid</span><span>$364,000</span></div>
                  <div className={styles.expenseRow}><span>Deposit ($180k) invested at 7% → 10yr</span><span>+$174,000 gain</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span>Net renter position after 10 years</span><span>−$190,000</span></div>
                  <div className={styles.expenseRow}><span><strong>Buying ($720,000 loan at 6.5%)</strong></span><span></span></div>
                  <div className={styles.expenseRow}><span>10-year total interest paid (est.)</span><span>$442,000</span></div>
                  <div className={styles.expenseRow}><span>Rates, insurance, maintenance</span><span>$115,000</span></div>
                  <div className={styles.expenseRow}><span>Stamp duty (NSW)</span><span>$35,835</span></div>
                  <div className={styles.expenseRow}><span>Property value after 10yr at 6% growth</span><span>$1,611,000</span></div>
                  <div className={`${styles.expenseRow} ${styles.expenseRowTotal}`}><span>Net buyer equity after 10 years</span><span>~$710,000</span></div>
                </div>
                <p className={styles.exampleNote}>
                  Over 10 years, buying generates approximately $710,000 in net equity versus a $190,000 net cost for renting — a $900,000 difference in favour of buying. However, this assumes 6% annual capital growth. At 3% growth, the buyer&apos;s net equity falls to ~$310,000, still ahead but by a much smaller margin.
                </p>
              </div>
            </div>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>When renting makes more financial sense</h3>
              <p className={styles.guideBlockText}>
                Despite buying winning in most long-horizon scenarios, there are circumstances where renting is the financially superior choice — particularly when property prices are very high relative to rents, when your intended holding period is short, or when you can reliably invest the deposit and monthly savings at a high return.
              </p>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Renting wins when…</span>
                <p className={styles.exampleText}>
                  <strong>Price-to-rent ratio is very high:</strong> When a property costs more than 25–30× its annual rent to buy, renting and investing is often superior for horizons under 7 years. Sydney currently has price-to-rent ratios of 35–45× in many suburbs.
                </p>
                <p className={styles.exampleText}>
                  <strong>Short intended stay:</strong> Stamp duty alone (up to 4–5% in NSW/VIC) takes 2–4 years of capital growth just to break even. If you plan to move within 3–5 years, renting is almost certainly cheaper on a total-cost basis.
                </p>
                <p className={styles.exampleNote}>
                  The rent-vs-buy decision is not purely financial — job flexibility, lifestyle preferences, and the psychological value of stability all matter. Use this calculator to understand the financial trade-offs, then weigh them against your personal circumstances.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Rent vs buy FAQs</h2>
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
