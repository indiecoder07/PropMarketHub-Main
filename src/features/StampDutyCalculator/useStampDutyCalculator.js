'use client';

import { useState, useMemo } from 'react';

// ── Stamp duty brackets 2024-25 ──────────────────────────────
// Each bracket: { upTo, base, rate } where rate is per dollar of excess over previous upTo
// Source: Each state's revenue office. Rates current as of 2024-25.
const RATES = {
  NSW: {
    name: 'New South Wales',
    brackets: [
      { upTo: 16000,    base: 0,     rate: 0.0125 },
      { upTo: 35000,    base: 200,   rate: 0.015  },
      { upTo: 93000,    base: 485,   rate: 0.0175 },
      { upTo: 351000,   base: 1500,  rate: 0.035  },
      { upTo: 1168000,  base: 10530, rate: 0.045  },
      { upTo: Infinity, base: 47295, rate: 0.055  },
    ],
    fhb: {
      // Existing home: full exemption < $650k, partial $650k–$800k
      fullExemptionBelow: 650000,
      noExemptionAbove:   800000,
    },
  },
  VIC: {
    name: 'Victoria',
    brackets: [
      { upTo: 25000,    base: 0,     rate: 0.014  },
      { upTo: 130000,   base: 350,   rate: 0.024  },
      { upTo: 440000,   base: 2870,  rate: 0.05   },
      { upTo: 550000,   base: 18370, rate: 0.06   },
      { upTo: Infinity, base: 24970, rate: 0.065  },
    ],
    fhb: {
      // New/established homes: full exemption < $600k, partial $600k–$750k
      fullExemptionBelow: 600000,
      noExemptionAbove:   750000,
    },
  },
  QLD: {
    name: 'Queensland',
    brackets: [
      { upTo: 5000,     base: 0,     rate: 0       },
      { upTo: 75000,    base: 0,     rate: 0.015   },
      { upTo: 540000,   base: 1050,  rate: 0.035   },
      { upTo: 1000000,  base: 17325, rate: 0.045   },
      { upTo: Infinity, base: 38025, rate: 0.0575  },
    ],
    fhb: {
      // Full exemption for established < $500k, new < $550k
      fullExemptionBelow: 500000,
      noExemptionAbove:   550000,
    },
  },
  WA: {
    name: 'Western Australia',
    brackets: [
      { upTo: 80000,    base: 0,     rate: 0.019  },
      { upTo: 100000,   base: 1520,  rate: 0.0285 },
      { upTo: 250000,   base: 2090,  rate: 0.038  },
      { upTo: 500000,   base: 7790,  rate: 0.0475 },
      { upTo: Infinity, base: 19665, rate: 0.0515 },
    ],
    fhb: {
      // Full exemption < $430k established, partial up to $530k
      fullExemptionBelow: 430000,
      noExemptionAbove:   530000,
    },
  },
  SA: {
    name: 'South Australia',
    brackets: [
      { upTo: 12000,    base: 0,     rate: 0.01   },
      { upTo: 30000,    base: 120,   rate: 0.02   },
      { upTo: 50000,    base: 480,   rate: 0.03   },
      { upTo: 100000,   base: 1080,  rate: 0.035  },
      { upTo: 200000,   base: 2830,  rate: 0.04   },
      { upTo: 250000,   base: 6830,  rate: 0.0425 },
      { upTo: 300000,   base: 8955,  rate: 0.0475 },
      { upTo: 500000,   base: 11330, rate: 0.05   },
      { upTo: Infinity, base: 21330, rate: 0.055  },
    ],
    fhb: null, // No SD exemption; FHB grant of $15k instead
  },
  TAS: {
    name: 'Tasmania',
    brackets: [
      { upTo: 3000,     base: 50,   rate: 0       },
      { upTo: 25000,    base: 50,   rate: 0.0175  },
      { upTo: 75000,    base: 435,  rate: 0.0225  },
      { upTo: 200000,   base: 1560, rate: 0.035   },
      { upTo: 375000,   base: 5935, rate: 0.04    },
      { upTo: 725000,   base: 12935,rate: 0.0425  },
      { upTo: Infinity, base: 27810,rate: 0.045   },
    ],
    fhb: null,
  },
  ACT: {
    name: 'Australian Capital Territory',
    brackets: [
      { upTo: 200000,   base: 0,     rate: 0.012  },
      { upTo: 300000,   base: 2400,  rate: 0.022  },
      { upTo: 500000,   base: 4600,  rate: 0.034  },
      { upTo: 750000,   base: 11400, rate: 0.0432 },
      { upTo: 1000000,  base: 22200, rate: 0.059  },
      { upTo: 1455000,  base: 36950, rate: 0.064  },
      { upTo: Infinity, base: 66120, rate: 0.0454 },
    ],
    fhb: {
      // ACT FHB pays NO duty on residential properties up to $1M (since 2019)
      fullExemptionBelow: 1000000,
      noExemptionAbove:   1000000,
    },
  },
  NT: {
    name: 'Northern Territory',
    // NT uses a unique formula; brackets below are an approximation
    brackets: [
      { upTo: 525000,   base: 0,     rate: 0.0495 }, // simplified; actual NT uses a polynomial
      { upTo: Infinity, base: 0,     rate: 0.0495 },
    ],
    ntFormula: true, // flag to use the polynomial formula for values < $525k
    fhb: null,
  },
};

// ── NT duty formula ──────────────────────────────────────────
function calcNTDuty(value) {
  if (value <= 525000) {
    // NT formula: D = (0.06571441 × V² / 10,000 + 15V) / 1,000
    // where V is the value in dollars
    return (0.06571441 * value * value / 10000 + 15 * value) / 1000;
  }
  return value * 0.0495;
}

// ── Standard bracket calculator ──────────────────────────────
function calcBracketDuty(value, brackets) {
  const prev = [0, ...brackets.slice(0, -1).map(b => b.upTo)];
  for (let i = 0; i < brackets.length; i++) {
    const { upTo, base, rate } = brackets[i];
    if (value <= upTo) {
      return base + (value - prev[i]) * rate;
    }
  }
  return 0;
}

// ── FHB concession ────────────────────────────────────────────
function applyFHBConcession(dutyFull, value, fhb) {
  if (!fhb) return { concession: 0, dutyFinal: dutyFull };
  if (value <= fhb.fullExemptionBelow) return { concession: dutyFull, dutyFinal: 0 };
  if (value >= fhb.noExemptionAbove)   return { concession: 0, dutyFinal: dutyFull };

  // Partial concession — linear taper
  const range       = fhb.noExemptionAbove - fhb.fullExemptionBelow;
  const portion     = (fhb.noExemptionAbove - value) / range;
  const concession  = Math.round(dutyFull * portion);
  return { concession, dutyFinal: Math.max(0, dutyFull - concession) };
}

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const PCT = (n) => n.toFixed(2) + '%';

function formatThousands(value) {
  return new Intl.NumberFormat('en-AU').format(value);
}

function parseDigits(value) {
  return value.replace(/[^\d]/g, '');
}

export function useStampDutyCalculator() {
  const [propertyValue, setPropertyValue] = useState(750000);
  const [propertyValueInput, setPropertyValueInput] = useState(formatThousands(750000));
  const [state,         setState]         = useState('NSW');
  const [buyerType,     setBuyerType]     = useState('owner'); // 'owner' | 'investor' | 'fhb'

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

  const stateOptions = Object.entries(RATES).map(([key, val]) => ({
    value: key,
    label: val.name,
  }));

  const results = useMemo(() => {
    if (!propertyValue || propertyValue <= 0) return null;
    const config = RATES[state];
    if (!config) return null;

    const fullDuty = config.ntFormula
      ? calcNTDuty(propertyValue)
      : calcBracketDuty(propertyValue, config.brackets);

    let concession = 0;
    let dutyFinal  = Math.round(fullDuty);

    if (buyerType === 'fhb' && config.fhb) {
      const result = applyFHBConcession(dutyFinal, propertyValue, config.fhb);
      concession = result.concession;
      dutyFinal  = result.dutyFinal;
    }

    const effectiveRate = propertyValue > 0 ? (dutyFinal / propertyValue) * 100 : 0;
    const totalUpfront  = propertyValue + dutyFinal;

    return {
      fullDuty:   Math.round(fullDuty),
      fullDutyFmt:        AUD.format(Math.round(fullDuty)),
      concession,
      concessionFmt:      AUD.format(concession),
      dutyFinal,
      dutyFinalFmt:       AUD.format(dutyFinal),
      effectiveRate,
      effectiveRateFmt:   PCT(effectiveRate),
      totalUpfront,
      totalUpfrontFmt:    AUD.format(totalUpfront),
      hasFHBBenefit:      buyerType === 'fhb' && concession > 0,
      noFHBInState:       buyerType === 'fhb' && !config.fhb,
      isNT:               config.ntFormula === true,
    };
  }, [propertyValue, state, buyerType]);

  return {
    propertyValue,
    propertyValueInput,
    setPropertyValueFromInput,
    state,         setState,
    buyerType,     setBuyerType,
    stateOptions,
    results,
  };
}
