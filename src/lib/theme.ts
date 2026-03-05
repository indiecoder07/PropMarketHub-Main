/**
 * Brand colour values for use in Clerk appearance config and other JS contexts
 * where CSS custom properties (var(--color-*)) cannot be used.
 * These mirror the tokens defined in globals.css :root
 */
export const BRAND = {
  colorPrimary: '#1B3068',
  colorText:    '#111827',
  borderRadius: '0.5rem',
} as const;
