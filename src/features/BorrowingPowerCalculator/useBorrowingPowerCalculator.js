'use client';

import { useMemo } from 'react';
import { useBorrowingPowerCalculatorContext } from '@/context/BorrowingPowerCalculatorContext';

const AUD = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });

function calculateBorrowing(monthlyCapacity, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r <= 0 || n <= 0) return 0;
  return monthlyCapacity * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
}

export function useBorrowingPowerCalculator() {
  const { grossIncome, otherIncome, livingExpenses, debtRepayments, interestRate, setInterestRate, termYears, setTermYears } = useBorrowingPowerCalculatorContext();

  const results = useMemo(() => {
    const totalIncomeAnnual = grossIncome.value + otherIncome.value;
    const totalCommittedAnnual = livingExpenses.value + debtRepayments.value;
    const netAnnual = totalIncomeAnnual - totalCommittedAnnual;
    if (netAnnual <= 0) return null;

    const serviceabilityRate = interestRate + 2.5;
    const monthlyCapacity = (netAnnual / 12) * 0.35;
    const maxBorrowing = calculateBorrowing(monthlyCapacity, serviceabilityRate, termYears);

    return {
      totalIncomeAnnual,
      totalCommittedAnnual,
      netAnnual,
      monthlyCapacity,
      serviceabilityRate,
      maxBorrowing,
    };
  }, [grossIncome.value, otherIncome.value, livingExpenses.value, debtRepayments.value, interestRate, termYears]);

  return {
    grossIncomeInput: grossIncome.valueInput,
    setGrossIncomeFromInput: grossIncome.setValueFromInput,
    otherIncomeInput: otherIncome.valueInput,
    setOtherIncomeFromInput: otherIncome.setValueFromInput,
    livingExpensesInput: livingExpenses.valueInput,
    setLivingExpensesFromInput: livingExpenses.setValueFromInput,
    debtRepaymentsInput: debtRepayments.valueInput,
    setDebtRepaymentsFromInput: debtRepayments.setValueFromInput,
    interestRate,
    setInterestRate,
    termYears,
    setTermYears,
    results,
    formatCurrency: (value) => AUD.format(value),
  };
}
