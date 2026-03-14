'use client';

import { useCashFlowCalculator } from './useCashFlowCalculator';
import styles from './CashFlowCalculator.module.css';

const EXPENSE_KEYS = [
  'maintenance',
  'insurance',
  'councilRates',
  'waterRates',
  'strataFees',
  'otherCosts',
];

const FREQUENCIES = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annual', label: 'Annual' },
];

export function CashFlowCalculator({ className = '' }) {
  const {
    propertyValueInput,
    setPropertyValueFromInput,
    weeklyRentInput,
    setWeeklyRentFromInput,
    loanAmountInput,
    setLoanAmountFromInput,
    interestRate,
    setInterestRate,
    loanTermYears,
    setLoanTermYears,
    repaymentType,
    setRepaymentType,
    managementFeePct,
    setManagementFeePct,
    vacancyRatePct,
    setVacancyRatePct,
    expenses,
    setExpenseAmountFromInput,
    setExpenseFrequency,
    results,
    formatCurrency,
  } = useCashFlowCalculator();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.grid}>
        <section className={styles.form} aria-label="Cash flow inputs">
          <h2 className={styles.formHeading}>Inputs</h2>

          <div className={styles.field}>
            <label htmlFor="cf-property-value" className={styles.label}>Property value</label>
            <div className={styles.inputPrefix}>
              <span className={styles.prefix} aria-hidden="true">$</span>
              <input
                id="cf-property-value"
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                className={styles.input}
                value={propertyValueInput}
                onChange={(event) => setPropertyValueFromInput(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="cf-weekly-rent" className={styles.label}>Weekly rent</label>
            <div className={styles.inputPrefix}>
              <span className={styles.prefix} aria-hidden="true">$</span>
              <input
                id="cf-weekly-rent"
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                className={styles.input}
                value={weeklyRentInput}
                onChange={(event) => setWeeklyRentFromInput(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="cf-loan-amount" className={styles.label}>Loan amount</label>
            <div className={styles.inputPrefix}>
              <span className={styles.prefix} aria-hidden="true">$</span>
              <input
                id="cf-loan-amount"
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                className={styles.input}
                value={loanAmountInput}
                onChange={(event) => setLoanAmountFromInput(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="cf-rate" className={styles.label}>Interest rate</label>
              <span className={styles.labelRight}>{interestRate.toFixed(2)}% p.a.</span>
            </div>
            <input
              id="cf-rate"
              type="range"
              min={2}
              max={12}
              step={0.05}
              value={interestRate}
              onChange={(event) => setInterestRate(Number(event.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="cf-term" className={styles.label}>Loan term</label>
              <span className={styles.labelRight}>{loanTermYears} years</span>
            </div>
            <input
              id="cf-term"
              type="range"
              min={5}
              max={35}
              step={1}
              value={loanTermYears}
              onChange={(event) => setLoanTermYears(Number(event.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Repayment type</label>
            <div className={styles.toggleGroup}>
              <button
                type="button"
                className={[styles.toggleBtn, repaymentType === 'principal_interest' ? styles.toggleActive : ''].join(' ')}
                onClick={() => setRepaymentType('principal_interest')}
              >
                Principal + Interest
              </button>
              <button
                type="button"
                className={[styles.toggleBtn, repaymentType === 'interest_only' ? styles.toggleActive : ''].join(' ')}
                onClick={() => setRepaymentType('interest_only')}
              >
                Interest Only
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="cf-management" className={styles.label}>Property management fee</label>
              <span className={styles.labelRight}>{managementFeePct.toFixed(1)}%</span>
            </div>
            <input
              id="cf-management"
              type="range"
              min={0}
              max={15}
              step={0.5}
              value={managementFeePct}
              onChange={(event) => setManagementFeePct(Number(event.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="cf-vacancy" className={styles.label}>Vacancy allowance</label>
              <span className={styles.labelRight}>{vacancyRatePct.toFixed(1)}%</span>
            </div>
            <input
              id="cf-vacancy"
              type="range"
              min={0}
              max={15}
              step={0.5}
              value={vacancyRatePct}
              onChange={(event) => setVacancyRatePct(Number(event.target.value))}
              className={styles.slider}
            />
          </div>

          <h3 className={styles.sectionHeading}>Expenses by frequency</h3>
          <div className={styles.expenseGrid}>
            {EXPENSE_KEYS.map((key) => (
              <div key={key} className={styles.expenseCard}>
                <p className={styles.expenseLabel}>{expenses[key].label}</p>
                <div className={styles.inputPrefix}>
                  <span className={styles.prefix} aria-hidden="true">$</span>
                  <input
                    id={`cf-expense-${key}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9,]*"
                    className={styles.input}
                    value={expenses[key].amountInput}
                    onChange={(event) => setExpenseAmountFromInput(key, event.target.value)}
                  />
                </div>
                <select
                  className={styles.select}
                  value={expenses[key].frequency}
                  onChange={(event) => setExpenseFrequency(key, event.target.value)}
                >
                  {FREQUENCIES.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.results} aria-label="Cash flow results" aria-live="polite">
          {results ? (
            <>
              <div className={styles.primaryCard}>
                <p className={styles.primaryLabel}>Net monthly cash flow</p>
                <p className={styles.primaryValue}>{results.netMonthlyCashFlowFmt}</p>
                <p className={styles.primarySub}>
                  {results.isPositiveCashFlow ? 'Positively geared' : 'Negatively geared'}
                </p>
              </div>

              <div className={styles.statGrid}>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.annualRentEffectiveFmt}</p>
                  <p className={styles.statLabel}>Effective annual rent</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.annualOperatingExpensesFmt}</p>
                  <p className={styles.statLabel}>Operating expenses (annual)</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.annualDebtPaymentFmt}</p>
                  <p className={styles.statLabel}>Debt repayments (annual)</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.netAnnualCashFlowFmt}</p>
                  <p className={styles.statLabel}>Net annual cash flow</p>
                </div>
              </div>

              <div className={[styles.banner, results.isPositiveCashFlow ? styles.bannerPositive : styles.bannerNegative].join(' ')}>
                {results.isPositiveCashFlow
                  ? 'This property is currently cash-flow positive based on the assumptions.'
                  : 'This property is currently cash-flow negative based on the assumptions.'}
              </div>

              <div className={styles.breakdown}>
                <p className={styles.breakdownTitle}>Yield and repayment summary</p>
                {[
                  ['Gross yield', results.grossYieldFmt],
                  ['Net yield (before debt)', results.netYieldBeforeDebtFmt],
                  ['Net yield (after debt)', results.netYieldAfterDebtFmt],
                  ['Monthly debt payment', results.monthlyDebtPaymentFmt],
                ].map(([label, value]) => (
                  <div key={label} className={styles.breakdownRow}>
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>

              <div className={styles.breakdown}>
                <p className={styles.breakdownTitle}>Expense annualisation</p>
                {results.breakdown.map((item) => (
                  <div key={item.key} className={styles.breakdownRow}>
                    <span>{item.label} ({item.frequency})</span>
                    <span>{formatCurrency(item.annualValue)}</span>
                  </div>
                ))}
                <div className={[styles.breakdownRow, styles.breakdownTotal].join(' ')}>
                  <span>Total fixed expenses</span>
                  <span>{results.annualFixedExpensesFmt}</span>
                </div>
              </div>
            </>
          ) : (
            <p className={styles.empty}>Enter all required values to calculate cash flow.</p>
          )}
        </section>
      </div>

      <p className={styles.disclaimer}>
        This calculator provides estimates only. It does not include tax outcomes, depreciation schedules,
        transaction costs, or lender-specific fees.
      </p>
    </div>
  );
}
