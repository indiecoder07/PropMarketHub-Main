'use client';

import { useStampDutyCalculator } from './useStampDutyCalculator';
import styles from './StampDutyCalculator.module.css';

const BUYER_TYPES = [
  { value: 'owner',    label: 'Owner-occupier' },
  { value: 'investor', label: 'Investor'        },
  { value: 'fhb',      label: 'First home buyer'},
];

export function StampDutyCalculator({ className = '' }) {
  const {
    propertyValueInput, setPropertyValueFromInput,
    propertyValue,
    state,         setState,
    buyerType,     setBuyerType,
    stateOptions,
    results,
  } = useStampDutyCalculator();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.grid}>

        {/* ── INPUTS ── */}
        <section className={styles.form} aria-label="Property details">
          <h2 className={styles.formHeading}>Property details</h2>

          <div className={styles.field}>
            <label htmlFor="sd-value" className={styles.label}>Property value</label>
            <div className={styles.inputPrefix}>
              <span className={styles.prefix} aria-hidden="true">$</span>
              <input
                id="sd-value"
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                className={styles.input}
                value={propertyValueInput}
                onChange={e => setPropertyValueFromInput(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="sd-state" className={styles.label}>State / Territory</label>
            <select
              id="sd-state"
              className={styles.select}
              value={state}
              onChange={e => setState(e.target.value)}
            >
              {stateOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Buyer type</label>
            <div className={styles.radioGroup} role="radiogroup" aria-label="Buyer type">
              {BUYER_TYPES.map(({ value, label }) => (
                <label key={value} className={[styles.radioLabel, buyerType === value ? styles.radioActive : ''].join(' ')}>
                  <input
                    type="radio"
                    name="buyer-type"
                    value={value}
                    checked={buyerType === value}
                    onChange={() => setBuyerType(value)}
                    className={styles.radioInput}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className={styles.results} aria-label="Stamp duty estimate" aria-live="polite">
          {results ? (
            <>
              <div className={styles.primaryCard}>
                <p className={styles.primaryLabel}>Stamp duty payable</p>
                <p className={styles.primaryValue}>{results.dutyFinalFmt}</p>
                <p className={styles.primarySub}>Effective rate: {results.effectiveRateFmt}</p>
              </div>

              <div className={styles.statGrid}>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.dutyFinalFmt}</p>
                  <p className={styles.statLabel}>Duty payable</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.effectiveRateFmt}</p>
                  <p className={styles.statLabel}>Effective rate</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statValue}>{results.totalUpfrontFmt}</p>
                  <p className={styles.statLabel}>Property + duty</p>
                </div>
                <div className={styles.stat}>
                  <p className={[styles.statValue, results.concession > 0 ? styles.statGreen : ''].join(' ')}>
                    {results.concessionFmt}
                  </p>
                  <p className={styles.statLabel}>FHB saving</p>
                </div>
              </div>

              {results.hasFHBBenefit && (
                <div className={styles.infoGreen} role="status">
                  <span aria-hidden="true">✅</span>
                  <span>First home buyer concession applied — saving {results.concessionFmt}.</span>
                </div>
              )}

              {results.noFHBInState && (
                <div className={styles.infoBlue} role="status">
                  <span aria-hidden="true">ℹ️</span>
                  <span>This state does not offer a first home buyer stamp duty exemption. A separate grant may apply — check your state revenue office.</span>
                </div>
              )}

              {results.isNT && (
                <div className={styles.infoBlue} role="status">
                  <span aria-hidden="true">ℹ️</span>
                  <span>NT uses a non-standard formula. This estimate is indicative — verify with the NT Revenue Office.</span>
                </div>
              )}

              <div className={styles.breakdown}>
                <p className={styles.breakdownTitle}>Cost summary</p>
                {[
                  ['Purchase price',   `$${propertyValue.toLocaleString('en-AU')}`],
                  ['Full stamp duty',  results.fullDutyFmt],
                  ['FHB concession',   results.concession > 0 ? `− ${results.concessionFmt}` : '—'],
                  ['Duty payable',     results.dutyFinalFmt],
                ].map(([label, value]) => (
                  <div key={label} className={styles.breakdownRow}>
                    <span>{label}</span><span>{value}</span>
                  </div>
                ))}
                <div className={[styles.breakdownRow, styles.breakdownTotal].join(' ')}>
                  <span>Total upfront cost</span>
                  <span>{results.totalUpfrontFmt}</span>
                </div>
              </div>
            </>
          ) : (
            <p className={styles.empty}>Enter a property value to estimate stamp duty.</p>
          )}
        </section>
      </div>

      <p className={styles.disclaimer}>
        Estimates are based on 2024–25 rates and may not reflect surcharges for foreign buyers, off-the-plan concessions, or recent legislative changes. Always verify with your state&apos;s revenue office or a conveyancer before settlement.
      </p>
    </div>
  );
}
