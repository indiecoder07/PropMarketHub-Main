'use client';

import { useMemo } from 'react';
import { useCashFlowCalculatorContext } from '@/context/CashFlowCalculatorContext';

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const PCT = (n) => `${n.toFixed(2)}%`;

export function useCashFlowCalculator() {
  const {
    propertyValue,
    propertyValueInput,
    setPropertyValueFromInput,
    weeklyRent,
    weeklyRentInput,
    setWeeklyRentFromInput,
    loanAmount,
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
    frequencyMultipliers,
  } = useCashFlowCalculatorContext();

  const results = useMemo(() => {
    if (propertyValue <= 0 || weeklyRent <= 0 || loanAmount <= 0 || interestRate <= 0 || loanTermYears <= 0) {
      return null;
    }

    const annualRentGross = weeklyRent * 52;
    const annualRentEffective = annualRentGross * (1 - vacancyRatePct / 100);
    const managementCost = annualRentEffective * (managementFeePct / 100);

    const annualFixedExpenses = Object.values(expenses).reduce((sum, item) => {
      const multiplier = frequencyMultipliers[item.frequency] || 1;
      return sum + item.amount * multiplier;
    }, 0);

    const annualOperatingExpenses = annualFixedExpenses + managementCost;

    const monthlyRate = interestRate / 100 / 12;
    const periods = loanTermYears * 12;

    const monthlyDebtPayment =
      repaymentType === 'interest_only'
        ? (loanAmount * (interestRate / 100)) / 12
        : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, periods))) /
          (Math.pow(1 + monthlyRate, periods) - 1);

    const annualDebtPayment = monthlyDebtPayment * 12;
    const netAnnualCashFlow = annualRentEffective - annualOperatingExpenses - annualDebtPayment;
    const netMonthlyCashFlow = netAnnualCashFlow / 12;

    const grossYield = (annualRentGross / propertyValue) * 100;
    const netYieldBeforeDebt = ((annualRentEffective - annualOperatingExpenses) / propertyValue) * 100;
    const netYieldAfterDebt = (netAnnualCashFlow / propertyValue) * 100;

    return {
      annualRentGross,
      annualRentGrossFmt: AUD.format(annualRentGross),
      annualRentEffective,
      annualRentEffectiveFmt: AUD.format(annualRentEffective),
      managementCost,
      managementCostFmt: AUD.format(managementCost),
      annualFixedExpenses,
      annualFixedExpensesFmt: AUD.format(annualFixedExpenses),
      annualOperatingExpenses,
      annualOperatingExpensesFmt: AUD.format(annualOperatingExpenses),
      annualDebtPayment,
      annualDebtPaymentFmt: AUD.format(annualDebtPayment),
      monthlyDebtPayment,
      monthlyDebtPaymentFmt: AUD.format(monthlyDebtPayment),
      netAnnualCashFlow,
      netAnnualCashFlowFmt: AUD.format(netAnnualCashFlow),
      netMonthlyCashFlow,
      netMonthlyCashFlowFmt: AUD.format(netMonthlyCashFlow),
      grossYield,
      grossYieldFmt: PCT(grossYield),
      netYieldBeforeDebt,
      netYieldBeforeDebtFmt: PCT(netYieldBeforeDebt),
      netYieldAfterDebt,
      netYieldAfterDebtFmt: PCT(netYieldAfterDebt),
      isPositiveCashFlow: netAnnualCashFlow >= 0,
      breakdown: Object.entries(expenses).map(([key, item]) => ({
        key,
        label: item.label,
        frequency: item.frequency,
        annualValue: item.amount * (frequencyMultipliers[item.frequency] || 1),
      })),
    };
  }, [
    propertyValue,
    weeklyRent,
    loanAmount,
    interestRate,
    loanTermYears,
    repaymentType,
    vacancyRatePct,
    managementFeePct,
    expenses,
    frequencyMultipliers,
  ]);

  return {
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
    formatCurrency: (value) => AUD.format(value),
  };
}
