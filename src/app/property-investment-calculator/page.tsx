import type { Metadata } from 'next';
import { PropertyInvestmentCalculatorProvider } from '@/context/PropertyInvestmentCalculatorContext';
import { PropertyInvestmentCalculator } from '@/features/PropertyInvestmentCalculator/PropertyInvestmentCalculator';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Property Investment Calculator Australia — Total Return & ROI',
  description: 'Calculate the total return on an Australian investment property — combining rental income, capital growth, tax benefits, and all holding costs over your investment horizon.',
  alternates: { canonical: 'https://propmarkethub.com.au/property-investment-calculator' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Property Investment Calculator Australia | PropMarketHub',
    description: 'Model the total return on Australian investment property — yield, capital growth, tax benefits, and net ROI over your investment horizon.',
    url: 'https://propmarkethub.com.au/property-investment-calculator',
    siteName: 'PropMarketHub',
    locale: 'en_AU',
    type: 'website',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'PropMarketHub — Free Property Investment Tools for Australia' }],
  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Investment Calculator Australia | PropMarketHub',
    description: 'Calculate total property investment return — yield, growth, tax, and ROI. Free Australian tool.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  
  },
};

const FAQS = [
  {
    q: 'What is a realistic capital growth rate for Australian property?',
    a: 'Australian capital city residential property has historically delivered long-term average capital growth of approximately 6–7% per year, though this varies significantly by city, suburb, and property type. Sydney and Melbourne have historically outperformed the national average. Regional markets can deliver periods of strong growth followed by extended flat periods. For conservative modelling, financial planners often use 4–5% per year; for optimistic scenarios, 7–8%. Never base investment decisions on recent short-term growth rates, which are almost always mean-reverting.',
  },
  {
    q: 'How do I calculate the total return on an investment property?',
    a: 'Total return combines two components: income return (net rental yield after all expenses) and capital return (annual growth in property value). The total return percentage = (Net rental income + Capital gain) ÷ Property value. However, because property is a leveraged investment, your return on equity (ROE) is typically much higher — you may control a $800,000 asset with only $160,000 of your own money, meaning a 7% total return on the asset is a 35% return on your equity (before loan costs).',
  },
  {
    q: 'What costs should I include when modelling property investment returns?',
    a: 'Holding costs include: loan interest, council rates, water rates, landlord insurance, property management fees (7–10% of rent), repairs and maintenance (budget 0.5–1% of property value per year), body corporate fees (for apartments), and accounting fees. Acquisition costs (stamp duty, conveyancing, inspections) should be amortised over your intended holding period. Disposal costs (agent commission ~2–2.5%, conveyancing, CGT) should be factored into your net sale proceeds.',
  },
  {
    q: 'How does leverage affect my property investment return?',
    a: 'Leverage amplifies both gains and losses. If your $800,000 property grows 7% ($56,000) and you only invested $160,000 (20% deposit), your return on equity is 35% before interest costs. After a 6.5% interest cost on $640,000 ($41,600/year), your net equity return is ($56,000 − $41,600) ÷ $160,000 = 9%. In a flat or declining market, leverage works in reverse — a 5% price fall on $800,000 wipes out 25% of your $160,000 equity.',
  },
  {
    q: 'Is property a better investment than shares in Australia?',
    a: 'Historically, Australian shares (ASX) and residential property have delivered broadly similar long-term returns of 7–10% per year total return. Property\'s advantages include leverage (which amplifies returns), tax benefits (negative gearing, depreciation, CGT discount), and psychological comfort for many investors. Shares offer superior liquidity, lower transaction costs, easier diversification, and no management burden. The optimal allocation depends on your tax position, risk tolerance, time horizon, and whether you have the cash flow to sustain property holding costs.',
  },
  {
    q: 'When should I sell an investment property?',
    a: 'From a pure financial perspective, you should hold an investment property as long as its expected future return (yield + growth) exceeds the opportunity cost of the equity locked in it. Trigger points for considering a sale include: the property has significantly underperformed over 5+ years, you need to rebalance your portfolio, the holding costs are no longer sustainable, or the neighbourhood fundamentals have materially deteriorated. Always model the after-tax sale proceeds — CGT on a large gain can be substantial, particularly if sold in a high-income year.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Property Investment Calculator',
      url: 'https://propmarkethub.com.au/property-investment-calculator',
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
        { '@type': 'ListItem', position: 2, name: 'Property Investment Calculator', item: 'https://propmarkethub.com.au/property-investment-calculator' },
      ],
    },
  ],
};

export default function PropertyInvestmentCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.eyebrow}>Free · Australia</p>
            <h1 className={styles.h1}>Property Investment Calculator</h1>
            <p className={styles.subtitle}>
              Model the total return on an Australian investment property — combining rental income, capital growth, tax benefits, and all holding costs over your investment horizon.
            </p>
          </div>
        </section>

        <section className={styles.calcSection}>
          <div className="container">
            <PropertyInvestmentCalculatorProvider>
              <PropertyInvestmentCalculator />
            </PropertyInvestmentCalculatorProvider>
          </div>
        </section>

        <section className={styles.guideSection}>
          <div className={`container ${styles.guideInner}`}>
            <h2 className={styles.guideHeading}>How to calculate property investment returns in Australia</h2>
            <p className={styles.guideIntro}>
              A property investment return is not just a capital growth number. It is the combined result of rental income, capital appreciation, tax benefits from deductions, and the cost of borrowing — all expressed relative to the actual equity you have invested. Understanding the complete return picture helps you compare property against other asset classes and make better hold-or-sell decisions.
            </p>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>Total return: the complete picture</h3>
              <p className={styles.guideBlockText}>
                Property total return has two components: the <strong>income return</strong> (net rental yield) and the <strong>capital return</strong> (annual price growth). Both compound over time. For leveraged investors, the return on equity is considerably higher than the asset return — but so is the risk.
              </p>

              <div className={styles.formulaCard}>
                <span className={styles.formulaLabel}>Formulas</span>
                <span className={styles.formula}>
                  {`Annual income return = Net rental income ÷ Property value
Annual capital return = (End value − Start value) ÷ Start value
Total asset return = Income return + Capital return
Return on equity = (Capital gain + Net income − Interest cost) ÷ Equity invested`}
                </span>
                <span className={styles.formulaNote}>
                  Net rental income = Gross rent − All deductible expenses (excl. interest). Return on equity is typically far higher than the asset return due to leverage — but leverage also amplifies downside risk.
                </span>
              </div>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Worked Example — $800,000 property, 10-year hold</span>
                <div className={styles.calcSteps}>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Purchase price</span>
                    <span className={styles.calcStepValue}>$800,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Equity invested (20% deposit)</span>
                    <span className={styles.calcStepValue}>$160,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Value after 10 years at 6% p.a.</span>
                    <span className={styles.calcStepValue}>$1,432,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Capital gain</span>
                    <span className={styles.calcStepValue}>$632,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Cumulative net rental income (est.)</span>
                    <span className={styles.calcStepValue}>$62,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Cumulative interest paid (est.)</span>
                    <span className={styles.calcStepValue}>−$416,000</span>
                  </div>
                  <div className={styles.calcStep}>
                    <span className={styles.calcStepLabel}>Net 10-year return on equity</span>
                    <span className={styles.calcStepValue}>$278,000 (174%)</span>
                  </div>
                </div>
                <p className={styles.exampleNote}>
                  Despite paying $416,000 in interest over 10 years, the investor achieves a 174% return on their $160,000 equity — primarily driven by capital growth amplified through leverage. The after-tax position (with CGT discount) is even more favourable.
                </p>
              </div>
            </div>

            <div className={styles.guideBlock}>
              <h3 className={styles.guideBlockHeading}>The three drivers of property investment performance</h3>
              <p className={styles.guideBlockText}>
                Long-term investment property performance is overwhelmingly driven by three factors: <strong>location</strong> (which determines capital growth), <strong>yield</strong> (which determines cash flow sustainability), and <strong>leverage</strong> (which amplifies both). Getting location right is the single most important decision — a mediocre property in a great suburb outperforms a great property in a mediocre suburb almost every time.
              </p>

              <div className={styles.exampleCard}>
                <span className={styles.exampleLabel}>Location factors that drive capital growth</span>
                <p className={styles.exampleText}>
                  Strong performers share common characteristics: proximity to employment hubs, quality schools, transport infrastructure investment (new train lines, motorways), population growth, constrained housing supply, and gentrification momentum. Suburbs within 10–15km of major CBDs have historically shown the strongest long-run capital growth in Australia.
                </p>
                <p className={styles.exampleNote}>
                  Use our <a href="/rental-yield-calculator" style={{color: '#16a34a', fontWeight: 600}}>Rental Yield Calculator</a> to assess income return and our <a href="/negative-gearing-calculator" style={{color: '#16a34a', fontWeight: 600}}>Negative Gearing Calculator</a> to model your annual tax position before committing to a property.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={`container ${styles.faqInner}`}>
            <h2 className={styles.faqHeading}>Property investment FAQs</h2>
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
