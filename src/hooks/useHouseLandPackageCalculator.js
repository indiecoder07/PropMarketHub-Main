'use client';

import { useMemo, useState } from 'react';
import {
  CURRENCY_CODE,
  CURRENCY_LOCALE,
  REPAYMENT_TABLE_COLUMNS,
  SUMMARY_CARD_KEYS,
} from '@/constants';
import { useHouseLandPackageCalculatorContext } from '@/context/HouseLandPackageCalculatorContext';
import { calculateHouseLandPackageScenario } from '@/services';

const CURRENCY_FORMAT = new Intl.NumberFormat(CURRENCY_LOCALE, {
  style: 'currency',
  currency: CURRENCY_CODE,
  maximumFractionDigits: 0,
});

const CURRENCY_PRECISE = new Intl.NumberFormat(CURRENCY_LOCALE, {
  style: 'currency',
  currency: CURRENCY_CODE,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatDelta(value) {
  if (value > 0) return `+${CURRENCY_PRECISE.format(value)}`;
  if (value < 0) return `-${CURRENCY_PRECISE.format(Math.abs(value))}`;
  return CURRENCY_PRECISE.format(value);
}

export function useHouseLandPackageCalculator() {
  const { fields, stages, actions, limits } = useHouseLandPackageCalculatorContext();
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  const result = useMemo(() => calculateHouseLandPackageScenario({
    landPrice: fields.landPrice.raw,
    buildPrice: fields.buildPrice.raw,
    deposit: fields.deposit.raw,
    annualRate: fields.annualRate,
    termYears: fields.termYears,
    constructionMonths: fields.constructionMonths,
    constructionType: fields.constructionType,
    postConstructionType: fields.postConstructionType,
    stages,
  }), [
    fields.annualRate,
    fields.buildPrice.raw,
    fields.constructionMonths,
    fields.constructionType,
    fields.deposit.raw,
    fields.landPrice.raw,
    fields.postConstructionType,
    fields.termYears,
    stages,
  ]);

  const formattedTimeline = useMemo(() => result.timelineRows.map((row) => ({
    ...row,
    monthLabel: row.month === 0 ? 'Settlement' : `Month ${row.month}`,
    drawnBalanceFormatted: CURRENCY_FORMAT.format(row.drawnBalance),
    yourRepaymentFormatted: CURRENCY_PRECISE.format(row.selectedRepayment),
    yourChangeFormatted: formatDelta(row.selectedIncrease),
    ioRepaymentFormatted: CURRENCY_PRECISE.format(row.ioRepayment),
    piRepaymentFormatted: CURRENCY_PRECISE.format(row.piRepayment),
  })), [result.timelineRows]);

  const displayedTimeline = useMemo(() => {
    if (showFullTimeline) return formattedTimeline;
    return formattedTimeline.filter((row) => row.isStageChange);
  }, [formattedTimeline, showFullTimeline]);

  const summary = useMemo(() => ({
    ioCurrent: CURRENCY_PRECISE.format(result.summaryCards[SUMMARY_CARD_KEYS.ioCurrent] || 0),
    piCurrent: CURRENCY_PRECISE.format(result.summaryCards[SUMMARY_CARD_KEYS.piCurrent] || 0),
    ioFinal: CURRENCY_PRECISE.format(result.summaryCards[SUMMARY_CARD_KEYS.ioFinal] || 0),
    piFinal: CURRENCY_PRECISE.format(result.summaryCards[SUMMARY_CARD_KEYS.piFinal] || 0),
    constructionIoInterest: CURRENCY_FORMAT.format(result.summaryCards[SUMMARY_CARD_KEYS.constructionIoInterest] || 0),
    constructionPiInterest: CURRENCY_FORMAT.format(result.summaryCards[SUMMARY_CARD_KEYS.constructionPiInterest] || 0),
    repaymentGap: CURRENCY_FORMAT.format(result.summaryCards[SUMMARY_CARD_KEYS.cumulativeRepaymentGap] || 0),
  }), [result.summaryCards]);

  return {
    fields,
    stages,
    actions,
    limits,
    errors: result.errors,
    summary,
    timelineRows: displayedTimeline,
    totalTimelineRows: formattedTimeline.length,
    showFullTimeline,
    toggleTimeline: () => setShowFullTimeline((v) => !v),
    tableColumns: REPAYMENT_TABLE_COLUMNS,
  };
}
