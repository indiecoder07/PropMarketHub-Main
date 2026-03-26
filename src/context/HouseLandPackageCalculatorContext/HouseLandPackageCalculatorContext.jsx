'use client';

import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';
import {
  CURRENCY_LOCALE,
  DEFAULT_INPUTS,
  DEFAULT_STAGES,
  INPUT_LIMITS,
  REPAYMENT_TYPES,
  STAGE_FIELD_KEYS,
  ZERO_VALUE,
} from '@/constants';

const HouseLandPackageCalculatorContext = createContext(null);

const DIGITS_ONLY_PATTERN = /[^\d]/g;

function formatThousands(value) {
  return new Intl.NumberFormat(CURRENCY_LOCALE).format(value);
}

function parseDigits(value) {
  return String(value || '').replace(DIGITS_ONLY_PATTERN, '');
}

function createCurrencyField(initialValue) {
  return {
    raw: initialValue,
    input: formatThousands(initialValue),
  };
}

function setCurrencyFieldFromInput(input, setter) {
  const digits = parseDigits(input);

  if (!digits) {
    setter({ raw: ZERO_VALUE, input: '' });
    return;
  }

  const value = Number(digits);
  setter({ raw: value, input: formatThousands(value) });
}

export function HouseLandPackageCalculatorProvider({ children }) {
  const [landPrice, setLandPrice] = useState(createCurrencyField(DEFAULT_INPUTS.landPrice));
  const [buildPrice, setBuildPrice] = useState(createCurrencyField(DEFAULT_INPUTS.buildPrice));
  const [deposit, setDeposit] = useState(createCurrencyField(DEFAULT_INPUTS.deposit));
  const [annualRate, setAnnualRate] = useState(DEFAULT_INPUTS.annualRate);
  const [termYears, setTermYears] = useState(DEFAULT_INPUTS.termYears);
  const [constructionMonths, setConstructionMonths] = useState(DEFAULT_INPUTS.constructionMonths);
  const [constructionType, setConstructionType] = useState(DEFAULT_INPUTS.constructionType);
  const [postConstructionType, setPostConstructionType] = useState(DEFAULT_INPUTS.postConstructionType);
  const [stages, setStages] = useState(DEFAULT_STAGES);

  const value = useMemo(() => ({
    fields: {
      landPrice,
      buildPrice,
      deposit,
      annualRate,
      termYears,
      constructionMonths,
      constructionType,
      postConstructionType,
    },
    limits: INPUT_LIMITS,
    stages,
    actions: {
      setLandPriceFromInput: (input) => setCurrencyFieldFromInput(input, setLandPrice),
      setBuildPriceFromInput: (input) => setCurrencyFieldFromInput(input, setBuildPrice),
      setDepositFromInput: (input) => setCurrencyFieldFromInput(input, setDeposit),
      setAnnualRate,
      setTermYears,
      setConstructionMonths,
      setConstructionType: (type) => setConstructionType(
        type === REPAYMENT_TYPES.IO ? REPAYMENT_TYPES.IO : REPAYMENT_TYPES.PI
      ),
      setPostConstructionType: (type) => setPostConstructionType(
        type === REPAYMENT_TYPES.IO ? REPAYMENT_TYPES.IO : REPAYMENT_TYPES.PI
      ),
      setStageField: (stageId, key, value) => {
        setStages((prev) => prev.map((stage) => {
          if (stage.id !== stageId) return stage;

          if (key === STAGE_FIELD_KEYS.month) {
            return { ...stage, month: Math.max(ZERO_VALUE, Number(value) || ZERO_VALUE) };
          }

          if (key === STAGE_FIELD_KEYS.percentOfBuild) {
            return { ...stage, percentOfBuild: Math.max(ZERO_VALUE, Number(value) || ZERO_VALUE) };
          }

          return { ...stage, [key]: String(value) };
        }));
      },
      addStage: () => {
        setStages((prev) => {
          const newId = `stage-custom-${Date.now()}`;
          const fallbackMonth = prev.length ? prev[prev.length - 1].month : ZERO_VALUE;
          return [...prev, { id: newId, name: 'Custom stage', month: fallbackMonth, percentOfBuild: ZERO_VALUE }];
        });
      },
      removeStage: (stageId) => {
        setStages((prev) => prev.filter((stage) => stage.id !== stageId));
      },
      resetStages: () => {
        setStages(DEFAULT_STAGES);
      },
    },
  }), [annualRate, buildPrice, constructionMonths, constructionType, deposit, landPrice, postConstructionType, stages, termYears]);

  return (
    <HouseLandPackageCalculatorContext.Provider value={value}>
      {children}
    </HouseLandPackageCalculatorContext.Provider>
  );
}

HouseLandPackageCalculatorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useHouseLandPackageCalculatorContext() {
  const context = useContext(HouseLandPackageCalculatorContext);

  if (!context) {
    throw new Error('useHouseLandPackageCalculatorContext must be used within HouseLandPackageCalculatorProvider');
  }

  return context;
}
