'use client';

import { useState, useMemo } from 'react';

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const PCT = (n) => n.toFixed(2) + '%';

// ── Yield benchmarks for Australian investors ──────────────
const YIELD_BENCHMARKS = [
  { min: 0,    max: 3,   label: 'Below average', colour: 'red'    },
  { min: 3,    max: 4.5, label: 'Average',        colour: 'orange' },
  { min: 4.5,  max: 6,   label: 'Good',           colour: 'yellow' },
  { min: 6,    max: 8,   label: 'Strong',          colour: 'green'  },
  { min: 8,    max: 999, label: 'Exceptional',     colour: 'green'  },
];

function getBenchmark(yieldPct) {
  return YIELD_BENCHMARKS.find(b => yieldPct >= b.min && yieldPct < b.max)
    || YIELD_BENCHMARKS[YIELD_BENCHMARKS.length - 1];
}

function formatThousands(value) {
  return new Intl.NumberFormat('en-AU').format(value);
}

function parseDigits(value) {
  return value.replace(/[^\d]/g, '');
}

export function useRentalYieldCalculator() {
  const [propertyValue,  setPropertyValue]  = useState(750000);
  const [propertyValueInput, setPropertyValueInput] = useState(formatThousands(750000));
  const [weeklyRent,     setWeeklyRent]     = useState(650);
  const [managementFee,  setManagementFee]  = useState(8);    // % of annual rent
  const [maintenance,    setMaintenance]    = useState(3000); // annual $
  const [insurance,      setInsurance]      = useState(1500); // annual $
  const [councilRates,   setCouncilRates]   = useState(1800); // annual $
  const [waterRates,     setWaterRates]     = useState(900);  // annual $
  const [otherCosts,     setOtherCosts]     = useState(0);    // annual $

  const setPropertyValueFromInput = (input) => {
    const digits = parseDigits(input);
    if (!digits) {
      setPropertyValue(0);
      setPropertyValueInput('');
      return;
    }

    const value = Number(digits);
    setPropertyValue(value);
    setPropertyValueInput(formatThousands(value));
  };

  const results = useMemo(() => {
    if (!propertyValue || propertyValue <= 0 || !weeklyRent || weeklyRent <= 0) return null;

    const annualRent = weeklyRent * 52;
    const grossYield = (annualRent / propertyValue) * 100;

    const managementCost = annualRent * (managementFee / 100);
    const totalExpenses  = managementCost + maintenance + insurance + councilRates + waterRates + otherCosts;
    const netAnnualIncome = annualRent - totalExpenses;
    const netYield       = (netAnnualIncome / propertyValue) * 100;
    const monthlyIncome  = netAnnualIncome / 12;

    const grossBenchmark = getBenchmark(grossYield);
    const netBenchmark   = getBenchmark(netYield);

    return {
      annualRent,
      annualRentFmt:      AUD.format(annualRent),
      grossYield,
      grossYieldFmt:      PCT(grossYield),
      totalExpenses,
      totalExpensesFmt:   AUD.format(totalExpenses),
      managementCost,
      managementCostFmt:  AUD.format(managementCost),
      netAnnualIncome,
      netAnnualIncomeFmt: AUD.format(netAnnualIncome),
      netYield,
      netYieldFmt:        PCT(Math.max(0, netYield)),
      monthlyIncome,
      monthlyIncomeFmt:   AUD.format(monthlyIncome),
      grossBenchmark,
      netBenchmark,
      cashflowPositive:   netAnnualIncome > 0,
      expensesBreakdown: [
        { label: `Management (${managementFee}%)`, value: managementCost },
        { label: 'Maintenance',                     value: maintenance    },
        { label: 'Insurance',                       value: insurance      },
        { label: 'Council rates',                   value: councilRates   },
        { label: 'Water rates',                     value: waterRates     },
        ...(otherCosts > 0 ? [{ label: 'Other', value: otherCosts }] : []),
      ],
    };
  }, [
    propertyValue, weeklyRent, managementFee,
    maintenance, insurance, councilRates, waterRates, otherCosts,
  ]);

  return {
    propertyValue,
    propertyValueInput,
    setPropertyValueFromInput,
    weeklyRent,     setWeeklyRent,
    managementFee,  setManagementFee,
    maintenance,    setMaintenance,
    insurance,      setInsurance,
    councilRates,   setCouncilRates,
    waterRates,     setWaterRates,
    otherCosts,     setOtherCosts,
    results,
  };
}
