'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const LoanComparisonCalculatorContext = createContext(null);

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
    const next = Number(digits);
    setValue(next);
    setValueInput(formatThousands(next));
  };

  return { value, valueInput, setValueFromInput };
}

export function LoanComparisonCalculatorProvider({ children }) {
  const loanAmount = useCurrencyField(700000);
  const feeA = useCurrencyField(800);
  const feeB = useCurrencyField(450);
  const [rateA, setRateA] = useState(6.2);
  const [rateB, setRateB] = useState(5.9);
  const [termYears, setTermYears] = useState(30);

  const value = useMemo(
    () => ({
      loanAmount,
      feeA,
      feeB,
      rateA,
      setRateA,
      rateB,
      setRateB,
      termYears,
      setTermYears,
    }),
    [loanAmount, feeA, feeB, rateA, rateB, termYears]
  );

  return (
    <LoanComparisonCalculatorContext.Provider value={value}>
      {children}
    </LoanComparisonCalculatorContext.Provider>
  );
}

export function useLoanComparisonCalculatorContext() {
  const context = useContext(LoanComparisonCalculatorContext);
  if (!context) {
    throw new Error('useLoanComparisonCalculatorContext must be used inside <LoanComparisonCalculatorProvider>');
  }
  return context;
}
