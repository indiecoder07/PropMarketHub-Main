'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface RichTextEditorUIContextValue {
  showHTML: boolean;
  htmlSource: string;
  openHTML: (html: string) => void;
  closeHTML: () => void;
  setHtmlSource: (html: string) => void;
}

const RichTextEditorUIContext = createContext<RichTextEditorUIContextValue | null>(null);

export function RichTextEditorUIProvider({ children }: { children: ReactNode }) {
  const [showHTML, setShowHTML] = useState(false);
  const [htmlSource, setHtmlSource] = useState('');

  const value = useMemo(
    () => ({
      showHTML,
      htmlSource,
      openHTML: (html: string) => {
        setHtmlSource(html);
        setShowHTML(true);
      },
      closeHTML: () => setShowHTML(false),
      setHtmlSource,
    }),
    [showHTML, htmlSource]
  );

  return (
    <RichTextEditorUIContext.Provider value={value}>
      {children}
    </RichTextEditorUIContext.Provider>
  );
}

export function useRichTextEditorUI(): RichTextEditorUIContextValue {
  const context = useContext(RichTextEditorUIContext);
  if (!context) {
    throw new Error('useRichTextEditorUI must be used inside <RichTextEditorUIProvider>');
  }
  return context;
}
