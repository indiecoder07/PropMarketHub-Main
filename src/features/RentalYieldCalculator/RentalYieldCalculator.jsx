'use client';

import { useRentalYieldCalculator } from './useRentalYieldCalculator';
import styles from './RentalYieldCalculator.module.css';

const COLOUR_MAP = {
  red:    styles.badgeRed,
  orange: styles.badgeOrange,
  yellow: styles.badgeYellow,
  green:  styles.badgeGreen,
};

function CurrencyField({ id, label, value, onChange, step = 100 }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <div className={styles.inputPrefix}>
        <span className={styles.prefix} aria-hidden="true">$</span>
        <input
          id={id}
          type="number"
          className={styles.input}
          value={value}
          min={0}
          step={step}
          onChange={e => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export function RentalYieldCalculator({ className = '' }) {
  const {
    propertyValueInput, setPropertyValueFromInput,
    weeklyRent,     setWeeklyRent,
    managementFee,  setManagementFee,
    maintenance,    setMaintenance,
    insurance,      setInsurance,
    councilRates,   setCouncilRates,
    waterRates,     setWaterRates,
    otherCosts,     setOtherCosts,
    results,
  } = useRentalYieldCalculator();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.grid}>

        {/* ── INPUTS ── */}
        <section className={styles.form} aria-label="Property and rental inputs">
          <h2 className={styles.formHeading}>Property details</h2>

          <div className={styles.field}>
            <label htmlFor="ry-value" className={styles.label}>Property value</label>
            <div className={styles.inputPrefix}>
              <span className={styles.prefix} aria-hidden="true">$</span>
              <input
                id="ry-value"
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                className={styles.input}
                value={propertyValueInput}
                onChange={e => setPropertyValueFromInput(e.target.value)}
              />
            </div>
          </div>
          <CurrencyField id="ry-rent"   label="Weekly rent"       value={weeklyRent}    onChange={setWeeklyRent}    step={10}    />

          <div className={styles.divider} />
          <h3 className={styles.sectionLabel}>Annual expenses</h3>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="ry-mgmt" className={styles.label}>Property management</label>
              <span className={styles.labelRight}>{managementFee}% of rent</span>
            </div>
            <div className={styles.sliderRow}>
              <input
                id="ry-mgmt"
                type="range"
                className={styles.slider}
                min={0} max={15} step={0.5}
                value={managementFee}
                onChange={e => setManagementFee(Number(e.target.value))}
              />
              <span className={styles.sliderBadge}>{managementFee}%</span>
            </div>
          </div>

          <div className={styles.expenseGrid}>
            <CurrencyField id="ry-maint"   label="Maintenance"     value={maintenance}  onChange={setMaintenance}  />
            <CurrencyField id="ry-ins"     label="Insurance"       value={insurance}    onChange={setInsurance}    />
            <CurrencyField id="ry-council" label="Council rates"   value={councilRates} onChange={setCouncilRates} />
            <CurrencyField id="ry-water"   label="Water rates"     value={waterRates}   onChange={setWaterRates}   />
            <CurrencyField id="ry-other"   label="Other costs"     value={otherCosts}   onChange={setOtherCosts}   />
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className={styles.results} aria-label="Yield results" aria-live="polite">
          {results ? (
            <>
              <div className={styles.yieldCards}>
                <div className={styles.yieldCard}>
                  <p className={styles.yieldLabel}>Gross yield</p>
                  <p className={styles.yieldValue}>{results.grossYieldFmt}</p>
                  <span className={[styles.badge, COLOUR_MAP[results.grossBenchmark.colour]].join(' ')}>
                    {results.grossBenchmark.label}
                  </span>
                </div>
                <div className={[styles.yieldCard, styles.yieldCardAccent].join(' ')}>
                  <p className={styles.yieldLabel}>Net yield</p>
                  <p className={styles.yieldValue}>{results.netYieldFmt}</p>
                  <span className={[styles.badge, COLOUR_MAP[results.netBenchmark.colour]].join(' ')}>
                    {results.netBenchmark.label}
                  </span>
                </div>
              </div>

              <div className={styles.statGrid}>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.annualRentFmt}</p>
                  <p className={styles.statLabel}>Annual rent</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.totalExpensesFmt}</p>
                  <p className={styles.statLabel}>Total expenses</p>
                </div>
                <div className={styles.stat}>
                  <p className={[styles.statValue, results.cashflowPositive ? styles.statGreen : styles.statRed].join(' ')}>
                    {results.netAnnualIncomeFmt}
                  </p>
                  <p className={styles.statLabel}>Net annual income</p>
                </div>
                <div className={styles.stat}>
                  <p className={[styles.statValue, results.cashflowPositive ? styles.statGreen : styles.statRed].join(' ')}>
                    {results.monthlyIncomeFmt}
                  </p>
                  <p className={styles.statLabel}>Monthly cash flow</p>
                </div>
              </div>

              <div className={[styles.cashflowBanner, results.cashflowPositive ? styles.cashflowPositive : styles.cashflowNegative].join(' ')} role="status">
                <span>{results.cashflowPositive ? '✅ Positively geared' : '⚠️ Negatively geared'}</span>
                <span>{results.cashflowPositive ? `+${results.monthlyIncomeFmt}/mo after expenses` : `${results.monthlyIncomeFmt}/mo after expenses`}</span>
              </div>

              <div className={styles.breakdown}>
                <p className={styles.breakdownTitle}>Expense breakdown</p>
                {results.expensesBreakdown.map(({ label, value }) => (
                  <div key={label} className={styles.breakdownRow}>
                    <span>{label}</span>
                    <span>{new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value)}</span>
                  </div>
                ))}
                <div className={[styles.breakdownRow, styles.breakdownTotal].join(' ')}>
                  <span>Total</span>
                  <span>{results.totalExpensesFmt}</span>
                </div>
              </div>
            </>
          ) : (
            <p className={styles.empty}>Enter property value and weekly rent to calculate yield.</p>
          )}
        </section>
      </div>

      <p className={styles.disclaimer}>
        Gross yield = (annual rent ÷ property value) × 100. Net yield deducts annual operating expenses. Does not include depreciation, capital gains, land tax, or mortgage costs. Not financial advice.
      </p>
    </div>
  );
}
