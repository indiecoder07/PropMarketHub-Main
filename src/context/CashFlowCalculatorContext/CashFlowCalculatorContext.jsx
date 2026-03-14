'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const FREQUENCY_MULTIPLIERS = {
  weekly: 52,
  monthly: 12,
  quarterly: 4,
  annual: 1,
};

const DEFAULT_EXPENSES = {
  maintenance: { label: 'Maintenance', amount: 3000, amountInput: '3,000', frequency: 'annual' },
  insurance: { label: 'Insurance', amount: 1500, amountInput: '1,500', frequency: 'annual' },
  councilRates: { label: 'Council rates', amount: 1800, amountInput: '1,800', frequency: 'annual' },
  waterRates: { label: 'Water rates', amount: 900, amountInput: '900', frequency: 'annual' },
  strataFees: { label: 'Strata/body corp', amount: 0, amountInput: '0', frequency: 'quarterly' },
  otherCosts: { label: 'Other costs', amount: 0, amountInput: '0', frequency: 'annual' },
};

const CashFlowCalculatorContext = createContext(null);

function formatThousands(value) {
  return new Intl.NumberFormat('en-AU').format(value);
}

function parseDigits(value) {
  return value.replace(/[^\d]/g, '');
}

function useCurrencyField(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [valueInput, setValueInput] = useState(formatThousands(initialValue));

  const setValueFromInput = (input) => {
    const digits = parseDigits(input);
    if (!digits) {
      setValue(0);
      setValueInput('');
      return;
    }

    const nextValue = Number(digits);
    setValue(nextValue);
    setValueInput(formatThousands(nextValue));
  };

  return { value, valueInput, setValueFromInput };
}

export function CashFlowCalculatorProvider({ children }) {
  const propertyValueField = useCurrencyField(750000);
  const weeklyRentField = useCurrencyField(650);
  const loanAmountField = useCurrencyField(600000);

  const [interestRate, setInterestRate] = useState(6.2);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [repaymentType, setRepaymentType] = useState('principal_interest');
  const [managementFeePct, setManagementFeePct] = useState(8);
  const [vacancyRatePct, setVacancyRatePct] = useState(0);
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSES);

  const setExpenseAmountFromInput = (key, input) => {
    const digits = parseDigits(input);
    setExpenses((prev) => {
      const amount = digits ? Number(digits) : 0;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          amount,
          amountInput: digits ? formatThousands(amount) : '',
        },
      };
    });
  };

  const setExpenseFrequency = (key, frequency) => {
    setExpenses((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        frequency,
      },
    }));
  };

  const value = useMemo(
    () => ({
      propertyValue: propertyValueField.value,
      propertyValueInput: propertyValueField.valueInput,
      setPropertyValueFromInput: propertyValueField.setValueFromInput,

      weeklyRent: weeklyRentField.value,
      weeklyRentInput: weeklyRentField.valueInput,
      setWeeklyRentFromInput: weeklyRentField.setValueFromInput,

      loanAmount: loanAmountField.value,
      loanAmountInput: loanAmountField.valueInput,
      setLoanAmountFromInput: loanAmountField.setValueFromInput,

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
      frequencyMultipliers: FREQUENCY_MULTIPLIERS,
    }),
    [
      propertyValueField.value,
      propertyValueField.valueInput,
      propertyValueField.setValueFromInput,
      weeklyRentField.value,
      weeklyRentField.valueInput,
      weeklyRentField.setValueFromInput,
      loanAmountField.value,
      loanAmountField.valueInput,
      loanAmountField.setValueFromInput,
      interestRate,
      loanTermYears,
      repaymentType,
      managementFeePct,
      vacancyRatePct,
      expenses,
    ]
  );

  return (
    <CashFlowCalculatorContext.Provider value={value}>
      {children}
    </CashFlowCalculatorContext.Provider>
  );
}

export function useCashFlowCalculatorContext() {
  const context = useContext(CashFlowCalculatorContext);
  if (!context) {
    throw new Error('useCashFlowCalculatorContext must be used inside <CashFlowCalculatorProvider>');
  }
  return context;
}
