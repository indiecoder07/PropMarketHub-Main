import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FeatureErrorBoundary } from './FeatureErrorBoundary';

function Thrower() {
  throw new Error('boom');
}

describe('FeatureErrorBoundary', () => {
  it('renders fallback when child throws', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <FeatureErrorBoundary>
        <Thrower />
      </FeatureErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    errorSpy.mockRestore();
  });
});
