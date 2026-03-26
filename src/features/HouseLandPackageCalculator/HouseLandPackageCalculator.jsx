'use client';

import PropTypes from 'prop-types';
import { CALCULATOR_COPY, STAGE_FIELD_KEYS } from '@/constants';
import { useHouseLandPackageCalculator } from '@/hooks';
import styles from './HouseLandPackageCalculator.module.css';

function ErrorList({ errors, className = '' }) {
  if (!errors.length) {
    return null;
  }

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

export function HouseLandPackageCalculator({ className = '' }) {
  const {
    fields,
    stages,
    limits,
    actions,
    errors,
    summary,
    timelineRows,
    tableColumns,
  } = useHouseLandPackageCalculator();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <header className={styles.header}>
        <h2 className={styles.heading}>{CALCULATOR_COPY.heading}</h2>
        <p className={styles.subheading}>{CALCULATOR_COPY.subheading}</p>
      </header>

      <div className={styles.grid}>
        <section className={styles.formPanel} aria-label="House and land package inputs">
          <div className={styles.inputGrid}>
            <label className={styles.field}>
              <span className={styles.label}>Land price</span>
              <input
                className={styles.input}
                type="text"
                inputMode="numeric"
                value={fields.landPrice.input}
                onChange={(event) => actions.setLandPriceFromInput(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Build contract price</span>
              <input
                className={styles.input}
                type="text"
                inputMode="numeric"
                value={fields.buildPrice.input}
                onChange={(event) => actions.setBuildPriceFromInput(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Deposit</span>
              <input
                className={styles.input}
                type="text"
                inputMode="numeric"
                value={fields.deposit.input}
                onChange={(event) => actions.setDepositFromInput(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Interest rate (% p.a.)</span>
              <input
                className={styles.input}
                type="number"
                min={limits.annualRate.min}
                max={limits.annualRate.max}
                step={limits.annualRate.step}
                value={fields.annualRate}
                onChange={(event) => actions.setAnnualRate(Number(event.target.value))}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Loan term (years)</span>
              <input
                className={styles.input}
                type="number"
                min={limits.termYears.min}
                max={limits.termYears.max}
                step={limits.termYears.step}
                value={fields.termYears}
                onChange={(event) => actions.setTermYears(Number(event.target.value))}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Construction period (months)</span>
              <input
                className={styles.input}
                type="number"
                min={limits.constructionMonths.min}
                max={limits.constructionMonths.max}
                step={limits.constructionMonths.step}
                value={fields.constructionMonths}
                onChange={(event) => actions.setConstructionMonths(Number(event.target.value))}
              />
            </label>
          </div>

          <div className={styles.stageHeader}>
            <h3 className={styles.stageHeading}>Progress payment stages</h3>
            <div className={styles.stageActions}>
              <button type="button" className={styles.actionButton} onClick={actions.addStage}>Add stage</button>
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
                  <th scope="col">Action</th>
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

        <section className={styles.resultsPanel} aria-label="Stage repayment results" aria-live="polite">
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>Current IO repayment</h3>
              <p className={styles.cardValue}>{summary.ioCurrent}</p>
            </article>
            <article className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>Current P&amp;I repayment</h3>
              <p className={styles.cardValue}>{summary.piCurrent}</p>
            </article>
            <article className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>Final IO repayment</h3>
              <p className={styles.cardValue}>{summary.ioFinal}</p>
            </article>
            <article className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>Final P&amp;I repayment</h3>
              <p className={styles.cardValue}>{summary.piFinal}</p>
            </article>
            <article className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>Construction IO interest</h3>
              <p className={styles.cardValue}>{summary.constructionIoInterest}</p>
            </article>
            <article className={styles.summaryCard}>
              <h3 className={styles.cardTitle}>Construction P&amp;I interest estimate</h3>
              <p className={styles.cardValue}>{summary.constructionPiInterest}</p>
            </article>
            <article className={styles.summaryCardWide}>
              <h3 className={styles.cardTitle}>Cumulative repayment gap (P&amp;I - IO)</h3>
              <p className={styles.cardValue}>{summary.repaymentGap}</p>
            </article>
          </div>

          <div className={styles.timelineWrap}>
            <h3 className={styles.timelineHeading}>Monthly EMI timeline</h3>
            <div className={styles.timelineTableWrap}>
              <table className={styles.timelineTable}>
                <thead>
                  <tr>
                    <th>{tableColumns.month}</th>
                    <th>{tableColumns.event}</th>
                    <th>{tableColumns.drawnBalance}</th>
                    <th>{tableColumns.ioRepayment}</th>
                    <th>{tableColumns.ioIncrease}</th>
                    <th>{tableColumns.piRepayment}</th>
                    <th>{tableColumns.piIncrease}</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineRows.map((row) => (
                    <tr key={`${row.month}-${row.stageEvent}`}>
                      <td>{row.monthLabel}</td>
                      <td>{row.stageEvent}</td>
                      <td>{row.drawnBalanceFormatted}</td>
                      <td>{row.ioRepaymentFormatted}</td>
                      <td>{row.ioIncreaseFormatted}</td>
                      <td>{row.piRepaymentFormatted}</td>
                      <td>{row.piIncreaseFormatted}</td>
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
