'use client';

import { useMortgageCalculator } from './useMortgageCalculator';
import styles from './MortgageCalculator.module.css';

const FREQUENCIES = ['monthly', 'fortnightly', 'weekly'];

export function MortgageCalculator({ className = '' }) {
  const {
    propertyPriceInput, setPropertyPriceFromInput,
    depositPct,    setDepositPct,
    rate,          setRate,
    term,          setTerm,
    frequency,     setFrequency,
    depositFormatted,
    rateFormatted,
    results,
  } = useMortgageCalculator();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.grid}>

        {/* ── INPUTS ── */}
        <section className={styles.form} aria-label="Loan inputs">
          <h2 className={styles.formHeading}>Loan details</h2>

          <div className={styles.field}>
            <label htmlFor="mc-price" className={styles.label}>Property price</label>
            <div className={styles.inputPrefix}>
              <span className={styles.prefix} aria-hidden="true">$</span>
              <input
                id="mc-price"
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                className={styles.input}
                value={propertyPriceInput}
                onChange={e => setPropertyPriceFromInput(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="mc-deposit" className={styles.label}>Deposit</label>
              <span className={styles.labelRight}>{depositFormatted}</span>
            </div>
            <div className={styles.sliderRow}>
              <input
                id="mc-deposit"
                type="range"
                className={styles.slider}
                min={5} max={50} step={1}
                value={depositPct}
                onChange={e => setDepositPct(Number(e.target.value))}
                aria-valuetext={depositFormatted}
              />
              <span className={styles.sliderBadge}>{depositPct}%</span>
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="mc-rate" className={styles.label}>Interest rate</label>
              <span className={styles.labelRight}>{rateFormatted}</span>
            </div>
            <div className={styles.sliderRow}>
              <input
                id="mc-rate"
                type="range"
                className={styles.slider}
                min={2} max={12} step={0.05}
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                aria-valuetext={rateFormatted}
              />
              <span className={styles.sliderBadge}>{rate.toFixed(2)}%</span>
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="mc-term" className={styles.label}>Loan term</label>
              <span className={styles.labelRight}>{term} years</span>
            </div>
            <div className={styles.sliderRow}>
              <input
                id="mc-term"
                type="range"
                className={styles.slider}
                min={5} max={30} step={1}
                value={term}
                onChange={e => setTerm(Number(e.target.value))}
                aria-valuetext={`${term} years`}
              />
              <span className={styles.sliderBadge}>{term} yrs</span>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Repayment frequency</label>
            <div className={styles.toggleGroup} role="group" aria-label="Repayment frequency">
              {FREQUENCIES.map(f => (
                <button
                  key={f}
                  type="button"
                  className={[styles.toggleBtn, frequency === f ? styles.toggleActive : ''].join(' ')}
                  onClick={() => setFrequency(f)}
                  aria-pressed={frequency === f}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className={styles.results} aria-label="Calculation results" aria-live="polite">
          {results ? (
            <>
              <div className={styles.primaryCard}>
                <p className={styles.primaryLabel}>
                  {frequency.charAt(0).toUpperCase() + frequency.slice(1)} repayment
                </p>
                <p className={styles.primaryValue}>{results.repaymentFormatted}</p>
              </div>

              <div className={styles.statGrid}>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.loanAmountFormatted}</p>
                  <p className={styles.statLabel}>Loan amount</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.lvrFormatted}</p>
                  <p className={styles.statLabel}>LVR</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.totalRepaidFormatted}</p>
                  <p className={styles.statLabel}>Total repayments</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.totalInterestFormatted}</p>
                  <p className={styles.statLabel}>Total interest</p>
                </div>
              </div>

              {results.lmiRisk && (
                <div className={styles.warning} role="alert">
                  <span aria-hidden="true">⚠️</span>
                  <span>LVR above 80% — Lenders Mortgage Insurance (LMI) may apply, adding thousands to upfront costs.</span>
                </div>
              )}

              <div className={styles.breakdown}>
                <p className={styles.breakdownTitle}>All frequencies</p>
                {[
                  ['Monthly',     results.monthlyFormatted],
                  ['Fortnightly', results.fortnightlyFormatted],
                  ['Weekly',      results.weeklyFormatted],
                ].map(([label, value]) => (
                  <div key={label} className={styles.breakdownRow}>
                    <span>{label}</span><span>{value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className={styles.empty}>Enter your loan details to see repayments.</p>
          )}
        </section>
      </div>

      <p className={styles.disclaimer}>
        Estimates are for principal &amp; interest only. Does not include lender fees, LMI, offset accounts, or redraw facilities. Always confirm with your lender or mortgage broker.
      </p>
    </div>
  );
}
