'use client';

import { useBorrowingPowerCalculator } from './useBorrowingPowerCalculator';
import styles from './BorrowingPowerCalculator.module.css';

export function BorrowingPowerCalculator({ className = '' }) {
  const {
    grossIncomeInput,
    setGrossIncomeFromInput,
    otherIncomeInput,
    setOtherIncomeFromInput,
    livingExpensesInput,
    setLivingExpensesFromInput,
    debtRepaymentsInput,
    setDebtRepaymentsFromInput,
    interestRate,
    setInterestRate,
    termYears,
    setTermYears,
    results,
    formatCurrency,
  } = useBorrowingPowerCalculator();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.grid}>
        <section className={styles.form}>
          <h2 className={styles.formHeading}>Serviceability inputs</h2>
          <div className={styles.field}><label className={styles.label}>Gross income (annual)</label><div className={styles.inputPrefix}><span className={styles.prefix}>$</span><input className={styles.input} type="text" inputMode="numeric" value={grossIncomeInput} onChange={(e) => setGrossIncomeFromInput(e.target.value)} /></div></div>
          <div className={styles.field}><label className={styles.label}>Other income (annual)</label><div className={styles.inputPrefix}><span className={styles.prefix}>$</span><input className={styles.input} type="text" inputMode="numeric" value={otherIncomeInput} onChange={(e) => setOtherIncomeFromInput(e.target.value)} /></div></div>
          <div className={styles.field}><label className={styles.label}>Living expenses (annual)</label><div className={styles.inputPrefix}><span className={styles.prefix}>$</span><input className={styles.input} type="text" inputMode="numeric" value={livingExpensesInput} onChange={(e) => setLivingExpensesFromInput(e.target.value)} /></div></div>
          <div className={styles.field}><label className={styles.label}>Debt repayments (annual)</label><div className={styles.inputPrefix}><span className={styles.prefix}>$</span><input className={styles.input} type="text" inputMode="numeric" value={debtRepaymentsInput} onChange={(e) => setDebtRepaymentsFromInput(e.target.value)} /></div></div>
          <div className={styles.field}><div className={styles.labelRow}><label className={styles.label}>Assessment rate</label><span className={styles.labelRight}>{interestRate.toFixed(2)}%</span></div><input className={styles.slider} type="range" min={3} max={12} step={0.05} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} /></div>
          <div className={styles.field}><div className={styles.labelRow}><label className={styles.label}>Loan term</label><span className={styles.labelRight}>{termYears} years</span></div><input className={styles.slider} type="range" min={5} max={35} value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} /></div>
        </section>
        <section className={styles.results}>
          {results ? (
            <>
              <div className={styles.primaryCard}><p className={styles.primaryLabel}>Estimated borrowing power</p><p className={styles.primaryValue}>{formatCurrency(results.maxBorrowing)}</p><p className={styles.primarySub}>Includes a 2.5% serviceability buffer</p></div>
              <div className={styles.statGrid}>
                <div className={styles.stat}><p className={styles.statValue}>{formatCurrency(results.totalIncomeAnnual)}</p><p className={styles.statLabel}>Total income</p></div>
                <div className={styles.stat}><p className={styles.statValue}>{formatCurrency(results.totalCommittedAnnual)}</p><p className={styles.statLabel}>Committed expenses</p></div>
                <div className={styles.stat}><p className={styles.statValue}>{formatCurrency(results.netAnnual)}</p><p className={styles.statLabel}>Net annual surplus</p></div>
                <div className={styles.stat}><p className={styles.statValue}>{formatCurrency(results.monthlyCapacity)}</p><p className={styles.statLabel}>Repayment capacity</p></div>
              </div>
            </>
          ) : <p className={styles.empty}>Enter income and expenses to estimate borrowing power.</p>}
        </section>
      </div>
    </div>
  );
}
