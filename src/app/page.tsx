import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './page.module.css';

/* ============================================================
   ON-PAGE SEO CHECKLIST (applied below)
   ✅ Primary keyword in title (position 1)
   ✅ Keyword-rich meta description with CTA (≤160 chars)
   ✅ Canonical URL
   ✅ Open Graph title, description, image, type
   ✅ Twitter Card metadata
   ✅ H1 contains primary keyword + geo-modifier
   ✅ H2s include secondary keywords + audience signals
   ✅ E-E-A-T trust section (data sources, update cadence)
   ✅ Keyword-rich body copy throughout
   ✅ FAQs target real search-intent queries
   ✅ Enhanced Schema.org — WebSite, Organization, FAQPage,
      SoftwareApplication per tool
   ✅ Internal linking to key pages
   ✅ robots index, follow
   ============================================================ */

export const metadata: Metadata = {
  title: 'Property Investment Tools Australia | Free Suburb & Mortgage Analysis — PropMarketHub',
  description:
    'Free property investment tools for Australian investors. Analyse NSW suburbs, estimate mortgage repayments, calculate stamp duty and rental yield — all in one platform.',
  alternates: { canonical: 'https://propmarkethub.com.au/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type:        'website',
    locale:      'en_AU',
    siteName:    'PropMarketHub',
    url:         'https://propmarkethub.com.au/',
    title:       'Free Property Investment Tools for Australia | PropMarketHub',
    description: 'Analyse NSW suburbs, model mortgage repayments, estimate stamp duty and calculate rental yield — practical tools for Australian property investors.',
    images: [{ url: 'https://propmarkethub.com.au/og-image.png', width: 1200, height: 630, alt: 'PropMarketHub — Free Property Investment Tools for Australia' }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@propmarkethub',
    title:       'Free Property Investment Tools for Australia | PropMarketHub',
    description: 'Suburb scorecard, mortgage calculator, stamp duty estimator, rental yield planner — free tools for Australian investors.',
    images:      ['https://propmarkethub.com.au/og-image.png'],
  },
};

// ── Tool definitions ──────────────────────────────────────────
const TOOLS = [
  { name: 'Suburb Scorecard',       href: '/suburb-scorecard', status: 'Live',        icon: '📊', description: 'Score NSW suburbs across six investment fundamentals — rental yield, vacancy rate, population growth, infrastructure pipeline, median household income, and price trend. Free, data-backed suburb analysis.' },
  { name: 'Mortgage Calculator',    href: '/mortgage-calculator',     status: 'Live', icon: '🏦', description: 'Model your borrowing power, estimate weekly repayments, and stress-test interest rate scenarios before committing to an Australian property purchase.' },
  { name: 'Cash Flow Calculator',   href: '/cash-flow-calculator',    status: 'Live', icon: '📉', description: 'Estimate real monthly and annual investment property cash flow using rent, debt repayments, vacancy assumptions, and flexible expense frequencies.' },
  { name: 'Loan Comparison Calculator', href: '/loan-comparison-calculator', status: 'Live', icon: '⚖️', description: 'Compare two loan options side-by-side and identify which delivers a lower total borrowing cost.' },
  { name: 'Borrowing Power Calculator', href: '/borrowing-power-calculator', status: 'Live', icon: '🧮', description: 'Estimate how much you can borrow based on income, expenses, debt commitments, and servicing buffers.' },
  { name: 'Rent vs Buy Calculator', href: '/rent-vs-buy-calculator', status: 'Live', icon: '🏠', description: 'Compare long-term outcomes of renting versus buying using growth and financing assumptions.' },
  { name: 'Property Purchase Costs Calculator', href: '/property-purchase-costs-calculator', status: 'Live', icon: '🗂️', description: 'Estimate full upfront acquisition costs including duty, legal fees, inspections, and loan setup costs.' },
  { name: 'Home Equity Calculator', href: '/home-equity-calculator', status: 'Live', icon: '💎', description: 'Measure total and usable equity at a target LVR to support refinance and portfolio planning decisions.' },
  { name: 'Extra Repayment Calculator', href: '/extra-repayment-calculator', status: 'Live', icon: '🚀', description: 'Estimate interest savings and loan term reduction from extra repayments and one-off lump sums.' },
  { name: 'Negative Gearing Calculator', href: '/negative-gearing-calculator', status: 'Live', icon: '🧾', description: 'Estimate potential tax impact when property deductions exceed rental income and model after-tax cash flow.' },
  { name: 'BRRRR Method Calculator', href: '/brrrr-calculator', status: 'Live', icon: '🔁', description: 'Track forced equity, refinance outcomes, and cash-on-cash return for Buy, Rehab, Rent, Refinance, Repeat strategies.' },
  { name: 'First Home Buyer Calculator', href: '/first-home-buyer-calculator', status: 'Live', icon: '🎯', description: 'Check deposit position, LVR range, and likely concession pathway for first-home purchase planning.' },
  { name: 'Property Investment Calculator', href: '/property-investment-calculator', status: 'Live', icon: '📈', description: 'Estimate yield, annual cash flow, and projected ROI from growth and leverage assumptions.' },
  { name: 'Stamp Duty Calculator',  href: '/stamp-duty-calculator',   status: 'Live', icon: '🧾', description: 'Estimate stamp duty costs for all Australian states and territories. Covers NSW, VIC, QLD, WA, SA, TAS, ACT and NT with first home buyer concessions.' },
  { name: 'Rental Yield Calculator',href: '/rental-yield-calculator', status: 'Live', icon: '💰', description: 'Calculate gross and net rental yield, account for property management fees, maintenance, and vacancy to benchmark real return on investment.' },
];

// ── FAQs ──────────────────────────────────────────────────────
const FAQS = [
  { question: 'What is the best free property investment tool in Australia?',  answer: 'PropMarketHub offers a free Suburb Scorecard that ranks NSW suburbs across six investment fundamentals: rental yield, vacancy rate, population growth, infrastructure pipeline, household income, and price trend. It is one of the most comprehensive free suburb analysis tools available to Australian investors.' },
  { question: 'How do I find the best suburbs to invest in NSW?',              answer: 'Start with the PropMarketHub Suburb Scorecard — it ranks all NSW suburbs using a composite investment score based on rental yield, vacancy rate, population growth, household income, infrastructure pipeline, and historical price trend. Filter by region (Sydney Metro, Hunter, Central Coast, etc.) or search by suburb name to compare opportunities side by side.' },
  { question: 'How do I calculate rental yield on a property in Australia?',   answer: "Gross rental yield = (annual rent ÷ property purchase price) × 100. Net rental yield also deducts ongoing costs like property management fees (typically 7–10%), maintenance, rates, and insurance. PropMarketHub's Rental Yield Calculator computes both figures instantly." },
  { question: 'How much stamp duty will I pay in NSW?',                        answer: "Stamp duty in NSW is calculated on the purchase price or market value of the property (whichever is higher). As of 2025, a $750,000 property attracts approximately $28,990 in stamp duty. First home buyers may be eligible for exemptions or concessions. PropMarketHub's Stamp Duty Calculator can estimate this instantly for every state." },
  { question: 'Are these property investment tools free to use?',              answer: 'Yes. Core access to all PropMarketHub tools is free. The Suburb Scorecard, including suburb-level composite scores, regional hubs, and the Top 10 NSW comparison list, is free with no account required. Some tools offer optional lead capture to unlock extended reports and monthly suburb update emails.' },
  { question: 'Is PropMarketHub only for NSW property investment?',            answer: 'The current live Suburb Scorecard covers all NSW suburbs. Additional tools being released — including the Mortgage Calculator, Stamp Duty Calculator, and Rental Yield Calculator — are designed for Australia-wide property investment analysis across all states and territories.' },
  { question: 'How often is the suburb data updated?',                         answer: 'Suburb Scorecard data is batch-updated monthly. Score inputs — including rental yield, vacancy rates, and price trend data — are refreshed from government and property data sources to ensure investors are working with current fundamentals rather than stale figures.' },
];

// ── Trust signals (E-E-A-T) ──────────────────────────────────
const TRUST_SIGNALS = [
  { icon: '📅', label: 'Updated monthly',    detail: 'Suburb data refreshed from government & property data sources' },
  { icon: '🏛️', label: 'Government data',   detail: 'ABS, CoreLogic, and state planning authority inputs' },
  { icon: '🆓', label: 'Free to use',        detail: 'No account required for core suburb analysis' },
  { icon: '🔍', label: '2,500+ NSW suburbs', detail: 'Comprehensive coverage across every NSW suburb and region' },
];

export default function HomePage() {

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': 'https://propmarkethub.com.au/#website', name: 'PropMarketHub', alternateName: 'Prop Market Hub', url: 'https://propmarkethub.com.au/', description: 'Free property investment tools for Australian investors — suburb scorecard, mortgage calculator, stamp duty estimator, rental yield planner.', inLanguage: 'en-AU', publisher: { '@id': 'https://propmarkethub.com.au/#organization' }, potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: 'https://propmarkethub.com.au/suburb-scorecard?q={search_term}' }, 'query-input': 'required name=search_term' } },
      { '@type': 'Organization', '@id': 'https://propmarkethub.com.au/#organization', name: 'PropMarketHub', url: 'https://propmarkethub.com.au/', logo: 'https://propmarkethub.com.au/propmarkethub-logo.png', sameAs: [], areaServed: { '@type': 'Country', name: 'Australia' }, knowsAbout: ['Property investment', 'Real estate analysis', 'Suburb research', 'Australian property market', 'Rental yield', 'Stamp duty', 'Mortgage calculation'] },
      { '@type': 'WebPage', '@id': 'https://propmarkethub.com.au/#webpage', url: 'https://propmarkethub.com.au/', name: 'Property Investment Tools Australia | PropMarketHub', description: 'Free property investment tools for Australian investors.', isPartOf: { '@id': 'https://propmarkethub.com.au/#website' }, publisher: { '@id': 'https://propmarkethub.com.au/#organization' }, about: { '@id': 'https://propmarkethub.com.au/#organization' }, inLanguage: 'en-AU', datePublished: '2025-03-01', dateModified: new Date().toISOString().split('T')[0], mainEntityOfPage: { '@id': 'https://propmarkethub.com.au/#webpage' } },
      { '@type': 'BreadcrumbList', '@id': 'https://propmarkethub.com.au/#breadcrumb', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://propmarkethub.com.au/' }] },
      { '@type': 'WebApplication', '@id': 'https://propmarkethub.com.au/#suburb-scorecard', name: 'NSW Suburb Investment Scorecard', applicationCategory: 'FinanceApplication', browserRequirements: 'Requires JavaScript. Works in all modern browsers.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD', availability: 'https://schema.org/InStock' }, url: 'https://propmarkethub.com.au/suburb-scorecard', description: 'Free suburb investment analysis tool for NSW — scores 2,500+ suburbs across rental yield, vacancy rate, population growth, infrastructure, income, and price trend.', author: { '@id': 'https://propmarkethub.com.au/#organization' }, featureList: 'Suburb composite scores, Regional hub comparisons, Top 10 NSW ranking, Side-by-side suburb comparison, Monthly data updates' },
      { '@type': 'FAQPage', '@id': 'https://propmarkethub.com.au/#faq', mainEntity: FAQS.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.eyebrow}>Free · Australian Property Investors</p>

          <h1 className={styles.h1}>
            Property Investment Tools{' '}
            <span className={styles.h1Accent}>for Australia</span>
            {' '}— Free &amp; Data-Backed
          </h1>

          <p className={styles.subheadline}>
            Research NSW suburbs with a free investment scorecard, then model your mortgage
            repayments, stamp duty costs, and rental yield — all in one platform built for
            Australian property investors.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/suburb-scorecard" aria-label="Open free NSW Suburb Scorecard" className={styles.btnPrimary}>
              Free Suburb Scorecard →
            </Link>
            <a href="#tools" className={styles.btnSecondary}>Explore All Tools</a>
          </div>

          <div className={styles.trustBar}>
            {['2,500+ NSW suburbs', 'Updated monthly', 'Free — no account needed', 'Government data sources'].map((s) => (
              <span key={s} className={styles.trustItem}>✓ {s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className={styles.introSection}>
        <div className={`container ${styles.introInner}`}>
          <p className={styles.introText}>
            <strong className={styles.introStrong}>PropMarketHub</strong> is a free Australian
            property investment platform that helps investors research suburbs, model financing, and
            evaluate returns before committing to a purchase. Start with the{' '}
            <Link href="/suburb-scorecard" className={styles.inlineLink}>free NSW Suburb Scorecard</Link>
            {' '}to shortlist locations using data — not guesswork — then validate your numbers with
            mortgage, cash flow, stamp duty, and rental yield calculators.
          </p>
        </div>
      </section>

      {/* ── TOOLS GRID ───────────────────────────────────────── */}
      <section id="tools" className={styles.toolsSection}>
        <div className="container">
          <h2 className={styles.sectionH2}>Free Property Investment Tools for Australian Investors</h2>
          <p className={styles.sectionSubheading}>
            Each tool is designed to cover one phase of the investment workflow — suburb selection,
            finance planning, cost estimation, and yield modelling — so you can move from research
            to decision without switching platforms.
          </p>

          <div className={styles.toolsGrid}>
            {TOOLS.map((tool) => (
              <article key={tool.name} className={styles.toolCard}>
                <div className={styles.toolCardHeader}>
                  <span className={styles.toolIcon} aria-hidden="true">{tool.icon}</span>
                  <span className={`${styles.statusBadge} ${tool.status === 'Live' ? styles.statusLive : styles.statusSoon}`}>
                    {tool.status}
                  </span>
                </div>
                <h3 className={styles.toolH3}>{tool.name}</h3>
                <p className={styles.toolDescription}>{tool.description}</p>
                {tool.status === 'Live' ? (
                  <Link href={tool.href} aria-label={`Open free ${tool.name}`} className={styles.toolLink}>
                    Open Free Tool →
                  </Link>
                ) : (
                  <span className={styles.toolComingSoon}>Coming soon</span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className={styles.howSection}>
        <div className={`container ${styles.howInner}`}>
          <h2 className={styles.sectionH2}>How to Research Property Investment in Australia</h2>
          <p className={styles.sectionSubheadingCentered}>
            PropMarketHub structures your research into a clear three-step workflow — from suburb
            shortlisting to finance validation to return forecasting.
          </p>

          <div className={styles.stepsGrid}>
            {[
              { step: '1', heading: 'Find high-potential NSW suburbs',     body: 'Use the free Suburb Scorecard to rank all NSW suburbs across rental yield, vacancy rate, population growth, infrastructure pipeline, median household income, and price trend. Filter by region or compare suburbs side by side.',                                                                                              link: { label: 'Open Suburb Scorecard', href: '/suburb-scorecard' } },
              { step: '2', heading: 'Model your mortgage repayments',      body: 'Once you have shortlisted a location and price range, estimate your weekly or monthly repayments, test interest rate scenarios, and calculate your maximum borrowing capacity. (Coming soon.)',                                                                                                                                  link: null },
              { step: '3', heading: 'Calculate stamp duty and rental yield',body: 'Before finalising a purchase, estimate your upfront stamp duty costs (all Australian states and territories) and calculate gross and net rental yield to confirm the investment stacks up. (Coming soon.)',                                                                                                                     link: null },
            ].map((item) => (
              <div key={item.step} className={styles.stepCard}>
                <div className={styles.stepNumber}>{item.step}</div>
                <h3 className={styles.stepH3}>{item.heading}</h3>
                <p className={styles.stepBody}>{item.body}</p>
                {item.link && <Link href={item.link.href} className={styles.stepLink}>{item.link.label} →</Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ────────────────────────────────────── */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustGrid}>
            {TRUST_SIGNALS.map((signal) => (
              <div key={signal.label} className={styles.trustSignalCard}>
                <span className={styles.trustSignalIcon} aria-hidden="true">{signal.icon}</span>
                <div>
                  <p className={styles.trustSignalLabel}>{signal.label}</p>
                  <p className={styles.trustSignalDetail}>{signal.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────── */}
      <section className={styles.audienceSection}>
        <div className={`container ${styles.audienceInner}`}>
          <h2 className={styles.audienceH2}>Built for Australian Property Investors at Every Stage</h2>
          <p className={styles.audienceBody}>
            Whether you are buying your first investment property, growing a multi-suburb portfolio,
            or working as a buyer&apos;s agent comparing acquisition options — PropMarketHub replaces
            disconnected spreadsheets and multiple calculator tabs with a single, structured
            workflow. Research NSW suburbs with real data, model your finance, and stress-test your
            returns before you make an offer.
          </p>
          <div className={styles.audienceBadges}>
            {['First-home investors', 'Portfolio builders', "Buyer's agents", 'DIY investors'].map((a) => (
              <span key={a} className={styles.audienceBadge}>{a}</span>
            ))}
          </div>
          <div className={styles.audienceLinks}>
            <Link href="/suburb-scorecard" className={styles.audienceLink}>NSW Suburb Scorecard →</Link>
            <Link href="/blog"             className={styles.audienceLink}>Investment Insights Blog →</Link>
            <Link href="/about"            className={styles.audienceLink}>About PropMarketHub →</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className={styles.faqSection}>
        <div className={`container ${styles.faqInner}`}>
          <h2 className={styles.sectionH2}>Australian Property Investment — Common Questions</h2>
          <p className={styles.faqSubheading}>
            Answers to the questions Australian property investors ask most often.
          </p>
          <div className={styles.faqList}>
            {FAQS.map((item) => (
              <article key={item.question} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{item.question}</h3>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaH2}>Start your suburb research — it&apos;s free</h2>
          <p className={styles.ctaBody}>Score any of 2,500+ NSW suburbs in seconds. No account required.</p>
          <Link href="/suburb-scorecard" className={styles.ctaBtn}>
            Open Free Suburb Scorecard →
          </Link>
        </div>
      </section>
    </>
  );
}
