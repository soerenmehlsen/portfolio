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
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      )
        return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash) return;
      event.preventDefault();
      if (hash === "#" || hash === "#home") {
        lenis.scrollTo(0, { force: true });
        if (hash === "#home") history.pushState(null, "", hash);
        return;
      }
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        lenis.scrollTo(target, { force: true });
        history.pushState(null, "", hash);
      }
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
