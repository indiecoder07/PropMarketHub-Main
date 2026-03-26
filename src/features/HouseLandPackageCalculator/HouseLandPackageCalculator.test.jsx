import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HouseLandPackageCalculatorProvider } from '@/context/HouseLandPackageCalculatorContext';
import { HouseLandPackageCalculator } from './HouseLandPackageCalculator';

describe('HouseLandPackageCalculator', () => {
  it('renders without crashing', () => {
    render(
      <HouseLandPackageCalculatorProvider>
        <HouseLandPackageCalculator />
      </HouseLandPackageCalculatorProvider>,
    );

    expect(screen.getByText(/House & Land Package Calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly EMI timeline/i)).toBeInTheDocument();
  });

  it('shows validation error when stage percentages are invalid', () => {
    render(
      <HouseLandPackageCalculatorProvider>
        <HouseLandPackageCalculator />
      </HouseLandPackageCalculatorProvider>,
    );

    const percentageInputs = screen.getAllByRole('spinbutton').filter((node) =>
      node.getAttribute('max') === '100',
    );

    fireEvent.change(percentageInputs[0], { target: { value: '10' } });

    expect(screen.getByText(/Build stage percentages must total 100%/i)).toBeInTheDocument();
  });

  it('updates stage month interaction', () => {
    render(
      <HouseLandPackageCalculatorProvider>
        <HouseLandPackageCalculator />
      </HouseLandPackageCalculatorProvider>,
    );

    const monthInputs = screen.getAllByRole('spinbutton').filter((node) =>
      node.getAttribute('max') === '48',
    );

    fireEvent.change(monthInputs[0], { target: { value: '2' } });

    expect(monthInputs[0]).toHaveValue(2);
  });
});
