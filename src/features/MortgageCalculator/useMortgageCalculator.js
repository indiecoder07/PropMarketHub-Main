'use client';

import { useState, useMemo } from 'react';

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const AUD_PRECISE = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatThousands(value) {
  return new Intl.NumberFormat('en-AU').format(value);
}

function parseDigits(value) {
  return value.replace(/[^\d]/g, '');
}

export function useMortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(750000);
  const [propertyPriceInput, setPropertyPriceInput] = useState(formatThousands(750000));
  const [depositPct,    setDepositPct]    = useState(20);
  const [rate,          setRate]          = useState(6.25);
  const [term,          setTerm]          = useState(30);
  const [frequency,     setFrequency]     = useState('monthly');

  const setPropertyPriceFromInput = (input) => {
    const digits = parseDigits(input);
    if (!digits) {
      setPropertyPrice(0);
      setPropertyPriceInput('');
      return;
    }

    const value = Number(digits);
    setPropertyPrice(value);
    setPropertyPriceInput(formatThousands(value));
  };

  const deposit   = useMemo(() => Math.round(propertyPrice * depositPct / 100), [propertyPrice, depositPct]);
  const loanAmount = Math.max(0, propertyPrice - deposit);

  const results = useMemo(() => {
    if (loanAmount <= 0 || rate <= 0 || term <= 0) return null;

    const r = rate / 100 / 12;
    const n = term * 12;
    const monthly      = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const fortnightly  = monthly * 12 / 26;
    const weekly       = monthly * 12 / 52;
    const totalRepaid  = monthly * n;
    const totalInterest = totalRepaid - loanAmount;
    const lvr          = (loanAmount / propertyPrice) * 100;

    const repayment = frequency === 'fortnightly' ? fortnightly
                    : frequency === 'weekly'       ? weekly
                    : monthly;

    return {
      repayment,
      repaymentFormatted: AUD_PRECISE.format(repayment),
      monthly,
      monthlyFormatted:      AUD_PRECISE.format(monthly),
      fortnightly,
      fortnightlyFormatted:  AUD_PRECISE.format(fortnightly),
      weekly,
      weeklyFormatted:       AUD_PRECISE.format(weekly),
      loanAmountFormatted:   AUD.format(loanAmount),
      totalRepaid,
      totalRepaidFormatted:  AUD.format(totalRepaid),
      totalInterest,
      totalInterestFormatted: AUD.format(totalInterest),
      lvr,
      lvrFormatted:          lvr.toFixed(1) + '%',
      lmiRisk:               lvr > 80,
    };
  }, [loanAmount, rate, term, frequency, propertyPrice]);

  return {
    // raw state
    propertyPrice,
    propertyPriceInput,
    setPropertyPriceFromInput,
    depositPct,    setDepositPct,
    rate,          setRate,
    term,          setTerm,
    frequency,     setFrequency,
    // derived
    deposit,
    depositFormatted: AUD.format(deposit),
    loanAmount,
    rateFormatted: rate.toFixed(2) + '% p.a.',
    // results
    results,
  };
}
