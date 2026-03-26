import {
  DEFAULT_INPUTS,
  DEFAULT_STAGES,
  MONTHS_PER_YEAR,
  PERCENT_DIVISOR,
  REPAYMENT_TYPES,
  SUMMARY_CARD_KEYS,
  VALIDATION_MESSAGES,
  ZERO_VALUE,
  ONE_VALUE,
} from '@/constants';

const ABS_TOLERANCE = 0.01;

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function roundCurrency(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function calculateAmortizedRepayment(principal, monthlyRate, remainingMonths) {
  if (principal <= ZERO_VALUE || remainingMonths <= ZERO_VALUE) {
    return ZERO_VALUE;
  }

  if (monthlyRate <= ZERO_VALUE) {
    return principal / remainingMonths;
  }

  const growth = Math.pow(ONE_VALUE + monthlyRate, remainingMonths);
  return principal * ((monthlyRate * growth) / (growth - ONE_VALUE));
}

function sanitizeStages(stages) {
  return (Array.isArray(stages) ? stages : DEFAULT_STAGES)
    .map((stage, idx) => ({
      id: stage.id || `stage-${idx + ONE_VALUE}`,
      name: String(stage.name || `Stage ${idx + ONE_VALUE}`),
      month: Math.max(ZERO_VALUE, Math.floor(toNumber(stage.month) || ZERO_VALUE)),
      percentOfBuild: Math.max(ZERO_VALUE, toNumber(stage.percentOfBuild) || ZERO_VALUE),
    }));
}

function validateInputs(inputs, stages) {
  const errors = [];

  const landPrice = toNumber(inputs.landPrice);
  const buildPrice = toNumber(inputs.buildPrice);
  const deposit = toNumber(inputs.deposit);
  const annualRate = toNumber(inputs.annualRate);
  const termYears = toNumber(inputs.termYears);
  const constructionMonths = toNumber(inputs.constructionMonths);

  if ([landPrice, buildPrice, deposit, annualRate, termYears, constructionMonths].some((v) => Number.isNaN(v))) {
    errors.push(VALIDATION_MESSAGES.invalidNumbers);
    return errors;
  }

  const totalProjectCost = landPrice + buildPrice;
  if (deposit > totalProjectCost) {
    errors.push(VALIDATION_MESSAGES.depositTooHigh);
  }

  if (!stages.length) {
    errors.push(VALIDATION_MESSAGES.noStages);
    return errors;
  }

  const buildStages = stages.filter((stage) => stage.percentOfBuild > ZERO_VALUE);
  const buildTotal = buildStages.reduce((sum, stage) => sum + stage.percentOfBuild, ZERO_VALUE);
  if (Math.abs(buildTotal - PERCENT_DIVISOR) > ABS_TOLERANCE) {
    errors.push(VALIDATION_MESSAGES.stageTotal);
  }

  for (let i = ONE_VALUE; i < stages.length; i += ONE_VALUE) {
    if (stages[i].month < stages[i - ONE_VALUE].month) {
      errors.push(VALIDATION_MESSAGES.stageOrder);
      break;
    }
  }

  if (stages.some((stage) => stage.month > constructionMonths || stage.month < ZERO_VALUE)) {
    errors.push(VALIDATION_MESSAGES.stageMonthRange);
  }

  return errors;
}

export function calculateHouseLandPackageScenario(rawInput = {}) {
  const inputs = {
    ...DEFAULT_INPUTS,
    ...rawInput,
  };

  const stages = sanitizeStages(rawInput.stages ?? DEFAULT_STAGES);
  const validationErrors = validateInputs(inputs, stages);

  if (validationErrors.length) {
    return {
      errors: validationErrors,
      timelineRows: [],
      summaryCards: {},
      assumptions: {
        monthlyApproximation: true,
        constantRate: true,
      },
    };
  }

  const landPrice = toNumber(inputs.landPrice);
  const buildPrice = toNumber(inputs.buildPrice);
  const deposit = toNumber(inputs.deposit);
  const annualRate = toNumber(inputs.annualRate);
  const termYears = toNumber(inputs.termYears);
  const constructionMonths = Math.floor(toNumber(inputs.constructionMonths));

  const totalProjectCost = landPrice + buildPrice;
  const loanRequired = Math.max(ZERO_VALUE, totalProjectCost - deposit);
  const fundingRatio = totalProjectCost > ZERO_VALUE ? loanRequired / totalProjectCost : ZERO_VALUE;

  const constructionType = inputs.constructionType || REPAYMENT_TYPES.IO;
  const postConstructionType = inputs.postConstructionType || REPAYMENT_TYPES.PI;

  const financedLandDraw = roundCurrency(landPrice * fundingRatio);
  const financedBuildTotal = roundCurrency(buildPrice * fundingRatio);
  const monthlyRate = annualRate / PERCENT_DIVISOR / MONTHS_PER_YEAR;
  const totalMonths = Math.max(MONTHS_PER_YEAR, Math.floor(termYears * MONTHS_PER_YEAR));

  const drawdownByMonth = new Map();

  drawdownByMonth.set(
    ZERO_VALUE,
    [{ name: 'Land settlement draw', amount: financedLandDraw }],
  );

  stages
    .filter((stage) => stage.percentOfBuild > ZERO_VALUE)
    .forEach((stage) => {
      const stageAmount = roundCurrency(financedBuildTotal * (stage.percentOfBuild / PERCENT_DIVISOR));
      const list = drawdownByMonth.get(stage.month) || [];
      list.push({ name: `${stage.name} draw`, amount: stageAmount });
      drawdownByMonth.set(stage.month, list);
    });

  const timelineRows = [];
  let drawnBalance = ZERO_VALUE;
  let previousIo = ZERO_VALUE;
  let previousPi = ZERO_VALUE;
  let previousSelected = ZERO_VALUE;
  let constructionIoInterestTotal = ZERO_VALUE;
  let constructionPiInterestTotal = ZERO_VALUE;
  let cumulativeRepaymentGap = ZERO_VALUE;

  for (let month = ZERO_VALUE; month <= totalMonths; month += ONE_VALUE) {
    const events = drawdownByMonth.get(month) || [];
    let monthEvent = '';

    if (events.length) {
      const monthDraw = events.reduce((sum, event) => sum + event.amount, ZERO_VALUE);
      drawnBalance = roundCurrency(drawnBalance + monthDraw);
      monthEvent = events.map((event) => event.name).join(' + ');
    }

    const inConstruction = month <= constructionMonths;
    const remainingMonths = Math.max(ONE_VALUE, totalMonths - month);
    const ioRepayment = roundCurrency(drawnBalance * monthlyRate);
    const piRepayment = roundCurrency(calculateAmortizedRepayment(drawnBalance, monthlyRate, remainingMonths));
    const ioIncrease = roundCurrency(ioRepayment - previousIo);
    const piIncrease = roundCurrency(piRepayment - previousPi);

    const activeType = inConstruction ? constructionType : postConstructionType;
    const selectedRepayment = activeType === REPAYMENT_TYPES.IO ? ioRepayment : piRepayment;
    const selectedIncrease = roundCurrency(selectedRepayment - previousSelected);

    const piMonthInterest = roundCurrency(drawnBalance * monthlyRate);

    if (inConstruction) {
      constructionIoInterestTotal = roundCurrency(constructionIoInterestTotal + ioRepayment);
      constructionPiInterestTotal = roundCurrency(constructionPiInterestTotal + piMonthInterest);
    }

    cumulativeRepaymentGap = roundCurrency(cumulativeRepaymentGap + (piRepayment - ioRepayment));

    timelineRows.push({
      month,
      stageEvent: monthEvent || '-',
      drawnBalance,
      ioRepayment,
      ioIncrease,
      piRepayment,
      piIncrease,
      selectedRepayment,
      selectedIncrease,
      inConstruction,
      isStageChange: events.length > ZERO_VALUE || month === totalMonths,
    });

    previousIo = ioRepayment;
    previousPi = piRepayment;
    previousSelected = selectedRepayment;
  }

  const currentIndex = Math.min(constructionMonths, timelineRows.length - ONE_VALUE);
  const current = timelineRows[currentIndex];
  const final = timelineRows[timelineRows.length - ONE_VALUE];

  const summaryCards = {
    [SUMMARY_CARD_KEYS.ioCurrent]: current?.ioRepayment ?? ZERO_VALUE,
    [SUMMARY_CARD_KEYS.piCurrent]: current?.piRepayment ?? ZERO_VALUE,
    [SUMMARY_CARD_KEYS.ioFinal]: final?.ioRepayment ?? ZERO_VALUE,
    [SUMMARY_CARD_KEYS.piFinal]: final?.piRepayment ?? ZERO_VALUE,
    [SUMMARY_CARD_KEYS.constructionIoInterest]: constructionIoInterestTotal,
    [SUMMARY_CARD_KEYS.constructionPiInterest]: constructionPiInterestTotal,
    [SUMMARY_CARD_KEYS.cumulativeRepaymentGap]: cumulativeRepaymentGap,
  };

  return {
    errors: [],
    inputs: {
      ...inputs,
      loanRequired,
      totalProjectCost,
      fundedLand: financedLandDraw,
      fundedBuild: financedBuildTotal,
      monthlyRate,
      totalMonths,
    },
    timelineRows,
    summaryCards,
    assumptions: {
      monthlyApproximation: true,
      constantRate: true,
    },
  };
}
