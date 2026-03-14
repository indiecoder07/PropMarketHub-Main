'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const BorrowingPowerCalculatorContext = createContext(null);

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
    if (!digits) { setValue(0); setValueInput(''); return; }
    const next = Number(digits);
    setValue(next);
    setValueInput(formatThousands(next));
  };
  return { value, valueInput, setValueFromInput };
}

export function BorrowingPowerCalculatorProvider({ children }) {
  const grossIncome = useCurrencyField(140000);
  const otherIncome = useCurrencyField(0);
  const livingExpenses = useCurrencyField(36000);
  const debtRepayments = useCurrencyField(6000);
  const [interestRate, setInterestRate] = useState(6.1);
  const [termYears, setTermYears] = useState(30);

  const value = useMemo(() => ({
    grossIncome,
    otherIncome,
    livingExpenses,
    debtRepayments,
    interestRate,
    setInterestRate,
    termYears,
    setTermYears,
  }), [grossIncome, otherIncome, livingExpenses, debtRepayments, interestRate, termYears]);

  return <BorrowingPowerCalculatorContext.Provider value={value}>{children}</BorrowingPowerCalculatorContext.Provider>;
}

export function useBorrowingPowerCalculatorContext() {
  const context = useContext(BorrowingPowerCalculatorContext);
  if (!context) throw new Error('useBorrowingPowerCalculatorContext must be used inside <BorrowingPowerCalculatorProvider>');
  return context;
}
