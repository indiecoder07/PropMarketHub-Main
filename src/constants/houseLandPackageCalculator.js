export const HOUSE_LAND_CALCULATOR_ROUTE = '/house-land-package-calculator';

export const CURRENCY_LOCALE = 'en-AU';
export const CURRENCY_CODE = 'AUD';

export const PERCENT_DIVISOR = 100;
export const MONTHS_PER_YEAR = 12;
export const ZERO_VALUE = 0;
export const ONE_VALUE = 1;

export const DEFAULT_INPUTS = {
  landPrice: 420000,
  buildPrice: 380000,
  deposit: 160000,
  annualRate: 6.2,
  termYears: 30,
  constructionMonths: 9,
};

export const INPUT_LIMITS = {
  landPrice: { min: 0, max: 5000000 },
  buildPrice: { min: 0, max: 5000000 },
  deposit: { min: 0, max: 3000000 },
  annualRate: { min: 0.1, max: 20, step: 0.01 },
  termYears: { min: 5, max: 40, step: 1 },
  constructionMonths: { min: 1, max: 48, step: 1 },
  stageMonth: { min: 0, max: 48, step: 1 },
  stagePercent: { min: 0, max: 100, step: 1 },
};

export const DEFAULT_STAGES = [
  { id: 'stage-land-settlement', name: 'Land settlement', month: 0, percentOfBuild: 0 },
  { id: 'stage-slab', name: 'Slab', month: 1, percentOfBuild: 15 },
  { id: 'stage-frame', name: 'Frame', month: 3, percentOfBuild: 20 },
  { id: 'stage-lockup', name: 'Lock-up', month: 5, percentOfBuild: 25 },
  { id: 'stage-fixing', name: 'Fixing', month: 7, percentOfBuild: 25 },
  { id: 'stage-completion', name: 'Practical completion', month: 9, percentOfBuild: 15 },
];

export const STAGE_FIELD_KEYS = {
  name: 'name',
  month: 'month',
  percentOfBuild: 'percentOfBuild',
};

export const CALCULATOR_COPY = {
  heading: 'House & Land Package Calculator',
  subheading:
    'Track how repayments increase after each drawdown stage with side-by-side Interest-Only and Principal & Interest timelines.',
  disclaimer:
    'This tool provides estimates only. Lender policy, daily interest accrual, fees, and settlement timing can change final repayments.',
};

export const VALIDATION_MESSAGES = {
  invalidNumbers: 'Please enter valid numbers for all required fields.',
  depositTooHigh: 'Deposit cannot be greater than total project cost.',
  stageTotal: 'Build stage percentages must total 100%.',
  stageOrder: 'Stage months must be in non-decreasing order.',
  stageMonthRange: 'Stage month must be within the construction period.',
  noStages: 'At least one build stage is required.',
};

export const SUMMARY_CARD_KEYS = {
  ioCurrent: 'ioCurrent',
  piCurrent: 'piCurrent',
  ioFinal: 'ioFinal',
  piFinal: 'piFinal',
  constructionIoInterest: 'constructionIoInterest',
  constructionPiInterest: 'constructionPiInterest',
  cumulativeRepaymentGap: 'cumulativeRepaymentGap',
};

export const REPAYMENT_TABLE_COLUMNS = {
  month: 'Month',
  event: 'Stage event',
  drawnBalance: 'Loan drawn',
  ioRepayment: 'IO repayment',
  ioIncrease: 'IO increase',
  piRepayment: 'P&I repayment',
  piIncrease: 'P&I increase',
};

export const BREAKPOINT_TOKENS = {
  sm: '--bp-sm',
  md: '--bp-md',
  lg: '--bp-lg',
};

export const FAQ_ITEMS = [
  {
    q: 'How does repayment change during a house and land build?',
    a: 'Repayments rise whenever a new stage is funded because the drawn loan balance increases. This calculator shows that increase month by month.',
  },
  {
    q: 'What is the difference between Interest-Only and P&I during construction?',
    a: 'Interest-Only covers interest on the amount drawn. P&I starts paying principal immediately, so monthly repayments are usually higher early but reduce long-term interest.',
  },
  {
    q: 'Why does this tool show both repayment tracks at the same time?',
    a: 'Side-by-side tracks make it easier to compare cash flow pressure during the build and total repayment impact after completion.',
  },
  {
    q: 'Do lenders always charge monthly interest during construction?',
    a: 'Most construction loans accrue interest daily and charge monthly. This calculator uses a monthly approximation for planning.',
  },
  {
    q: 'Can I edit the stage schedule?',
    a: 'Yes. You can update stage month and percentage to match your builder contract and lender drawdown schedule.',
  },
  {
    q: 'Does this include LMI and lender fees?',
    a: 'No. This version focuses on repayment movement by stage and excludes LMI, establishment fees, and other lender-specific charges.',
  },
  {
    q: 'What happens if construction takes longer than expected?',
    a: 'A longer construction period generally means more months of progress payments. You can increase construction months and stage timing to model delays.',
  },
  {
    q: 'Is this calculator suitable for Australian buyers only?',
    a: 'The defaults, language, and formatting are built for Australian users and common construction-loan stage structures.',
  },
];
