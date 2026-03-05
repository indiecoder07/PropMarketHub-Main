'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface HeaderUIContextValue {
  mobileOpen: boolean;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

const HeaderUIContext = createContext<HeaderUIContextValue | null>(null);

export function HeaderUIProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const value = useMemo(
    () => ({
      mobileOpen,
      dropdownOpen,
      setDropdownOpen,
      toggleMobile: () => setMobileOpen((prev) => !prev),
      closeMobile: () => setMobileOpen(false),
    }),
    [mobileOpen, dropdownOpen]
  );

  return <HeaderUIContext.Provider value={value}>{children}</HeaderUIContext.Provider>;
}

export function useHeaderUI(): HeaderUIContextValue {
  const context = useContext(HeaderUIContext);
  if (!context) {
    throw new Error('useHeaderUI must be used inside <HeaderUIProvider>');
  }
  return context;
}
