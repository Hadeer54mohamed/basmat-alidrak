'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type HeroMode = 'tech' | 'security';

const STORAGE_KEY = 'basmat-alidrak-hero-mode';

function readStoredMode(): HeroMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === 'tech' || s === 'security') return s;
  } catch {
    /* ignore quota / private mode */
  }
  return null;
}

type HeroModeContextValue = {
  mode: HeroMode;
  setMode: (m: HeroMode) => void;
  toggleMode: () => void;
};

const HeroModeContext = createContext<HeroModeContextValue | null>(null);

export function HeroModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<HeroMode>('tech');

  useEffect(() => {
    const stored = readStoredMode();
    if (stored) setModeState(stored);
  }, []);

  const setMode = useCallback((m: HeroMode) => {
    setModeState(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next: HeroMode = prev === 'tech' ? 'security' : 'tech';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <HeroModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </HeroModeContext.Provider>
  );
}

export function useHeroMode() {
  const ctx = useContext(HeroModeContext);
  if (!ctx) {
    throw new Error('useHeroMode must be used within HeroModeProvider');
  }
  return ctx;
}
