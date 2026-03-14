'use client';

import { useMemo } from 'react';
import { useLoanComparisonCalculatorContext } from '@/context/LoanComparisonCalculatorContext';

const AUD = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });

function calcLoan(loanAmount, rate, termYears, fee) {
  const r = rate / 100 / 12;
  const n = termYears * 12;
  const monthly = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalRepayments = monthly * n;
  const totalInterest = totalRepayments - loanAmount;
  const totalCost = totalRepayments + fee;
  return { monthly, totalRepayments, totalInterest, totalCost };
}

export function useLoanComparisonCalculator() {
  const { loanAmount, feeA, feeB, rateA, setRateA, rateB, setRateB, termYears, setTermYears } = useLoanComparisonCalculatorContext();

  const results = useMemo(() => {
    if (loanAmount.value <= 0 || termYears <= 0 || rateA <= 0 || rateB <= 0) return null;
    const optionA = calcLoan(loanAmount.value, rateA, termYears, feeA.value);
    const optionB = calcLoan(loanAmount.value, rateB, termYears, feeB.value);
    const better = optionA.totalCost <= optionB.totalCost ? 'A' : 'B';
    const savings = Math.abs(optionA.totalCost - optionB.totalCost);
    return { optionA, optionB, better, savings };
  }, [loanAmount.value, feeA.value, feeB.value, rateA, rateB, termYears]);

  return {
    loanAmountInput: loanAmount.valueInput,
    setLoanAmountFromInput: loanAmount.setValueFromInput,
    feeAInput: feeA.valueInput,
    setFeeAFromInput: feeA.setValueFromInput,
    feeBInput: feeB.valueInput,
    setFeeBFromInput: feeB.setValueFromInput,
    rateA,
    setRateA,
    rateB,
    setRateB,
    termYears,
    setTermYears,
    results,
    formatCurrency: (value) => AUD.format(value),
  };
}
