'use client';

import PropTypes from 'prop-types';
import { CALCULATOR_COPY, REPAYMENT_TYPES, STAGE_FIELD_KEYS } from '@/constants';
import { useHouseLandPackageCalculator } from '@/hooks';
import styles from './HouseLandPackageCalculator.module.css';

function ErrorList({ errors, className = '' }) {
  if (!errors.length) return null;

  return (
    <div className={[styles.errorBox, className].filter(Boolean).join(' ')} role="alert" aria-live="assertive">
      <h3 className={styles.errorHeading}>Please fix the following</h3>
      <ul className={styles.errorList}>
        {errors.map((error) => (
          <li key={error} className={styles.errorItem}>{error}</li>
        ))}
      </ul>
    </div>
  );
}

ErrorList.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function PhaseToggle({ label, value, onChange }) {
  return (
    <div className={styles.phaseToggle}>
      <span className={styles.phaseLabel}>{label}</span>
      <div className={styles.toggleGroup} role="group" aria-label={label}>
        <button
          type="button"
          className={[styles.toggleBtn, value === REPAYMENT_TYPES.IO ? styles.toggleBtnActive : ''].filter(Boolean).join(' ')}
          onClick={() => onChange(REPAYMENT_TYPES.IO)}
          aria-pressed={value === REPAYMENT_TYPES.IO}
        >
          IO — Interest Only
        </button>
        <button
          type="button"
          className={[styles.toggleBtn, value === REPAYMENT_TYPES.PI ? styles.toggleBtnActive : ''].filter(Boolean).join(' ')}
          onClick={() => onChange(REPAYMENT_TYPES.PI)}
          aria-pressed={value === REPAYMENT_TYPES.PI}
        >
          P&amp;I — Principal &amp; Interest
        </button>
      </div>
    </div>
  );
}

PhaseToggle.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export function HouseLandPackageCalculator({ className = '' }) {
  const {
    fields,
    stages,
    limits,
    actions,
    errors,
    summary,
    timelineRows,
    totalTimelineRows,
    showFullTimeline,
    toggleTimeline,
    tableColumns,
  } = useHouseLandPackageCalculator();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>

      <div className={styles.grid}>
        {/* ── Left: Inputs ── */}
        <section className={styles.formPanel} aria-label="House and land package inputs">

          <h2 className={styles.panelHeading}>{CALCULATOR_COPY.heading}</h2>
          <p className={styles.panelSubheading}>{CALCULATOR_COPY.subheading}</p>

          <div className={styles.inputGrid}>
            <label className={styles.field}>
              <span className={styles.label}>Land price</span>
              <div className={styles.inputPrefix}>
                <span className={styles.prefix}>$</span>
                <input
                  className={styles.input}
                  type="text"
                  inputMode="numeric"
                  value={fields.landPrice.input}
                  onChange={(event) => actions.setLandPriceFromInput(event.target.value)}
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Build contract price</span>
              <div className={styles.inputPrefix}>
                <span className={styles.prefix}>$</span>
                <input
                  className={styles.input}
                  type="text"
                  inputMode="numeric"
                  value={fields.buildPrice.input}
                  onChange={(event) => actions.setBuildPriceFromInput(event.target.value)}
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Deposit</span>
              <div className={styles.inputPrefix}>
                <span className={styles.prefix}>$</span>
                <input
                  className={styles.input}
                  type="text"
                  inputMode="numeric"
                  value={fields.deposit.input}
                  onChange={(event) => actions.setDepositFromInput(event.target.value)}
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Interest rate (% p.a.)</span>
              <div className={styles.inputPrefix}>
                <span className={styles.prefix}>%</span>
                <input
                  className={styles.input}
                  type="number"
                  min={limits.annualRate.min}
                  max={limits.annualRate.max}
                  step={limits.annualRate.step}
                  value={fields.annualRate}
                  onChange={(event) => actions.setAnnualRate(Number(event.target.value))}
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Loan term (years)</span>
              <div className={styles.inputPrefix}>
                <span className={styles.prefix}>yrs</span>
                <input
                  className={styles.input}
                  type="number"
                  min={limits.termYears.min}
                  max={limits.termYears.max}
                  step={limits.termYears.step}
                  value={fields.termYears}
                  onChange={(event) => actions.setTermYears(Number(event.target.value))}
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Construction period (months)</span>
              <div className={styles.inputPrefix}>
                <span className={styles.prefix}>mo</span>
                <input
                  className={styles.input}
                  type="number"
                  min={limits.constructionMonths.min}
                  max={limits.constructionMonths.max}
                  step={limits.constructionMonths.step}
                  value={fields.constructionMonths}
                  onChange={(event) => actions.setConstructionMonths(Number(event.target.value))}
                />
              </div>
            </label>
          </div>

          {/* ── Repayment type pickers ── */}
          <div className={styles.phaseSection}>
            <h3 className={styles.phaseSectionHeading}>Repayment structure</h3>
            <PhaseToggle
              label="During construction (land settlement to completion)"
              value={fields.constructionType}
              onChange={actions.setConstructionType}
            />
            <PhaseToggle
              label="After construction (full loan tenure)"
              value={fields.postConstructionType}
              onChange={actions.setPostConstructionType}
            />
          </div>

          {/* ── Stage schedule ── */}
          <div className={styles.stageHeader}>
            <h3 className={styles.stageHeading}>Progress payment stages</h3>
            <div className={styles.stageActions}>
              <button type="button" className={styles.actionButton} onClick={actions.addStage}>+ Add stage</button>
              <button type="button" className={styles.actionButton} onClick={actions.resetStages}>Reset defaults</button>
            </div>
          </div>

          <div className={styles.stageTableWrap}>
            <table className={styles.stageTable}>
              <thead>
                <tr>
                  <th scope="col">Stage</th>
                  <th scope="col">Month</th>
                  <th scope="col">Build %</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {stages.map((stage) => (
                  <tr key={stage.id}>
                    <td>
                      <input
                        type="text"
                        className={styles.tableInput}
                        value={stage.name}
                        onChange={(event) => actions.setStageField(stage.id, STAGE_FIELD_KEYS.name, event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className={styles.tableInput}
                        min={limits.stageMonth.min}
                        max={limits.stageMonth.max}
                        step={limits.stageMonth.step}
                        value={stage.month}
                        onChange={(event) => actions.setStageField(stage.id, STAGE_FIELD_KEYS.month, event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className={styles.tableInput}
                        min={limits.stagePercent.min}
                        max={limits.stagePercent.max}
                        step={limits.stagePercent.step}
                        value={stage.percentOfBuild}
                        onChange={(event) => actions.setStageField(stage.id, STAGE_FIELD_KEYS.percentOfBuild, event.target.value)}
                      />
                    </td>
                    <td>
                      <button type="button" className={styles.removeButton} onClick={() => actions.removeStage(stage.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ErrorList errors={errors} />
        </section>

        {/* ── Right: Results ── */}
        <section className={styles.resultsPanel} aria-label="Stage repayment results" aria-live="polite">

          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>At completion — IO</h3>
              <p className={styles.cardValue}>{summary.ioFinal}</p>
              <p className={styles.cardSub}>/ month</p>
            </article>
            <article className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>At completion — P&amp;I</h3>
              <p className={styles.cardValue}>{summary.piFinal}</p>
              <p className={styles.cardSub}>/ month</p>
            </article>
            <article className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>Construction IO interest</h3>
              <p className={styles.cardValue}>{summary.constructionIoInterest}</p>
              <p className={styles.cardSub}>total during build</p>
            </article>
            <article className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>Construction P&amp;I interest</h3>
              <p className={styles.cardValue}>{summary.constructionPiInterest}</p>
              <p className={styles.cardSub}>total during build</p>
            </article>
            <article className={[styles.summaryCard, styles.summaryCardAccent].join(' ')}>
              <h3 className={styles.cardTitle}>IO repayment at settlement</h3>
              <p className={styles.cardValue}>{summary.ioCurrent}</p>
              <p className={styles.cardSub}>/ month</p>
            </article>
            <article className={[styles.summaryCard, styles.summaryCardAccent].join(' ')}>
              <h3 className={styles.cardTitle}>P&amp;I repayment at settlement</h3>
              <p className={styles.cardValue}>{summary.piCurrent}</p>
              <p className={styles.cardSub}>/ month</p>
            </article>
            <article className={[styles.summaryCardWide, styles.summaryCardGap].join(' ')}>
              <h3 className={styles.cardTitle}>Cumulative gap — P&amp;I pays more during build by</h3>
              <p className={styles.cardValue}>{summary.repaymentGap}</p>
            </article>
          </div>

          {/* ── Timeline ── */}
          <div className={styles.timelineWrap}>
            <div className={styles.timelineHeader}>
              <h3 className={styles.timelineHeading}>Monthly EMI timeline</h3>
              <button
                type="button"
                className={styles.timelineToggle}
                onClick={toggleTimeline}
              >
                {showFullTimeline
                  ? 'Stage changes only'
                  : `Show all ${totalTimelineRows} months`}
              </button>
            </div>
            <p className={styles.timelineHint}>
              {showFullTimeline
                ? 'Showing every month of the full loan tenure.'
                : 'Showing months where a drawdown changes your repayment.'}
            </p>
            <div className={styles.timelineTableWrap}>
              <table className={styles.timelineTable}>
                <thead>
                  <tr>
                    <th>{tableColumns.month}</th>
                    <th>{tableColumns.event}</th>
                    <th>{tableColumns.drawnBalance}</th>
                    <th className={styles.thYour}>{tableColumns.yourRepayment}</th>
                    <th className={styles.thYour}>{tableColumns.yourChange}</th>
                    <th>{tableColumns.ioRepayment}</th>
                    <th>{tableColumns.piRepayment}</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineRows.map((row) => (
                    <tr key={`${row.month}-${row.stageEvent}`} className={row.isStageChange ? styles.stageRow : ''}>
                      <td>{row.monthLabel}</td>
                      <td>{row.stageEvent}</td>
                      <td>{row.drawnBalanceFormatted}</td>
                      <td className={styles.tdYour}>{row.yourRepaymentFormatted}</td>
                      <td className={[styles.tdYour, Number(row.selectedIncrease) > 0 ? styles.tdIncrease : ''].filter(Boolean).join(' ')}>
                        {row.yourChangeFormatted}
                      </td>
                      <td className={styles.tdRef}>{row.ioRepaymentFormatted}</td>
                      <td className={styles.tdRef}>{row.piRepaymentFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.assumptionsBox}>
            <h3 className={styles.assumptionsHeading}>Model assumptions</h3>
            <ul className={styles.assumptionsList}>
              <li>Rate is constant across all months.</li>
              <li>Interest is modelled monthly rather than daily accrual.</li>
              <li>Outputs exclude lender fees, LMI, and tax impacts.</li>
              <li>Construction timing is based on your stage month inputs.</li>
            </ul>
          </div>
        </section>
      </div>

      <p className={styles.disclaimer}>{CALCULATOR_COPY.disclaimer}</p>
    </div>
  );
}

HouseLandPackageCalculator.propTypes = {
  className: PropTypes.string,
};
