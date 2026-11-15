"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const IntroContext = createContext({ started: true, start: () => {} });

/** Keep the original hero choreography synchronized with the curtain lift. */
export function IntroSequence({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);
  const start = useCallback(() => setStarted(true), []);
  const value = useMemo(() => ({ started, start }), [started, start]);
  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}

export const useIntroSequence = () => useContext(IntroContext);
