"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [instance, setInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({ duration: 1.1 });
    setInstance(lenis);
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash) return;
      event.preventDefault();
      if (hash === "#") {
        lenis.scrollTo(0);
        return;
      }
      const target = document.querySelector<HTMLElement>(hash);
      if (target) lenis.scrollTo(target);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      setInstance(null);
    };
  }, [reduceMotion]);

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>;
}
