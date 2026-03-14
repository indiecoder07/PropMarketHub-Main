'use client';

import { useLoanComparisonCalculator } from './useLoanComparisonCalculator';
import styles from './LoanComparisonCalculator.module.css';

export function LoanComparisonCalculator({ className = '' }) {
  const {
    loanAmountInput,
    setLoanAmountFromInput,
    feeAInput,
    setFeeAFromInput,
    feeBInput,
    setFeeBFromInput,
    rateA,
    setRateA,
    rateB,
    setRateB,
    termYears,
    setTermYears,
    results,
    formatCurrency,
  } = useLoanComparisonCalculator();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.grid}>
        <section className={styles.form}>
          <h2 className={styles.formHeading}>Compare two loan options</h2>
          <div className={styles.field}><label className={styles.label}>Loan amount</label><div className={styles.inputPrefix}><span className={styles.prefix}>$</span><input className={styles.input} type="text" inputMode="numeric" value={loanAmountInput} onChange={(e) => setLoanAmountFromInput(e.target.value)} /></div></div>
          <div className={styles.field}><div className={styles.labelRow}><label className={styles.label}>Loan term</label><span className={styles.labelRight}>{termYears} years</span></div><input className={styles.slider} type="range" min={5} max={35} value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} /></div>
          <div className={styles.field}><div className={styles.labelRow}><label className={styles.label}>Option A interest</label><span className={styles.labelRight}>{rateA.toFixed(2)}%</span></div><input className={styles.slider} type="range" min={2} max={12} step={0.05} value={rateA} onChange={(e) => setRateA(Number(e.target.value))} /></div>
          <div className={styles.field}><label className={styles.label}>Option A upfront fee</label><div className={styles.inputPrefix}><span className={styles.prefix}>$</span><input className={styles.input} type="text" inputMode="numeric" value={feeAInput} onChange={(e) => setFeeAFromInput(e.target.value)} /></div></div>
          <div className={styles.field}><div className={styles.labelRow}><label className={styles.label}>Option B interest</label><span className={styles.labelRight}>{rateB.toFixed(2)}%</span></div><input className={styles.slider} type="range" min={2} max={12} step={0.05} value={rateB} onChange={(e) => setRateB(Number(e.target.value))} /></div>
          <div className={styles.field}><label className={styles.label}>Option B upfront fee</label><div className={styles.inputPrefix}><span className={styles.prefix}>$</span><input className={styles.input} type="text" inputMode="numeric" value={feeBInput} onChange={(e) => setFeeBFromInput(e.target.value)} /></div></div>
        </section>
        <section className={styles.results}>
          {results ? (
            <>
              <div className={styles.primaryCard}><p className={styles.primaryLabel}>Better option</p><p className={styles.primaryValue}>Option {results.better}</p><p className={styles.primarySub}>Estimated saving: {formatCurrency(results.savings)}</p></div>
              <div className={styles.statGrid}>
                <div className={styles.stat}><p className={styles.statValue}>{formatCurrency(results.optionA.monthly)}</p><p className={styles.statLabel}>A monthly</p></div>
                <div className={styles.stat}><p className={styles.statValue}>{formatCurrency(results.optionB.monthly)}</p><p className={styles.statLabel}>B monthly</p></div>
                <div className={styles.stat}><p className={styles.statValue}>{formatCurrency(results.optionA.totalCost)}</p><p className={styles.statLabel}>A total cost</p></div>
                <div className={styles.stat}><p className={styles.statValue}>{formatCurrency(results.optionB.totalCost)}</p><p className={styles.statLabel}>B total cost</p></div>
              </div>
            </>
          ) : (
            <p className={styles.empty}>Enter inputs to compare loans.</p>
          )}
        </section>
      </div>
    </div>
  );
}
