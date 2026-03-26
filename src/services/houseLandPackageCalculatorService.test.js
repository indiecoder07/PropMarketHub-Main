import { describe, expect, it } from 'vitest';
import { calculateHouseLandPackageScenario } from './houseLandPackageCalculatorService';

describe('calculateHouseLandPackageScenario', () => {
  it('returns a valid timeline and summary for default input', () => {
    const result = calculateHouseLandPackageScenario();

    expect(result.errors).toEqual([]);
    expect(result.timelineRows.length).toBeGreaterThan(12);
    expect(result.summaryCards.ioCurrent).toBeGreaterThan(0);
    expect(result.summaryCards.piCurrent).toBeGreaterThan(0);
    expect(result.summaryCards.piCurrent).toBeGreaterThan(result.summaryCards.ioCurrent);
  });

  it('fails validation when stage percentages do not total 100', () => {
    const result = calculateHouseLandPackageScenario({
      stages: [
        { id: 's1', name: 'Slab', month: 1, percentOfBuild: 20 },
        { id: 's2', name: 'Frame', month: 3, percentOfBuild: 30 },
      ],
    });

    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.timelineRows).toEqual([]);
  });

  it('fails validation when stage months are not in order', () => {
    const result = calculateHouseLandPackageScenario({
      stages: [
        { id: 's1', name: 'Slab', month: 4, percentOfBuild: 40 },
        { id: 's2', name: 'Frame', month: 2, percentOfBuild: 60 },
      ],
    });

    expect(result.errors.length).toBeGreaterThan(0);
  });
});
