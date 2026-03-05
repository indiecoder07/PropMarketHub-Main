'use client';

import type { ReactNode } from 'react';
import { HeaderUIProvider } from './HeaderUIContext';

export function UIProviders({ children }: { children: ReactNode }) {
  return <HeaderUIProvider>{children}</HeaderUIProvider>;
}
