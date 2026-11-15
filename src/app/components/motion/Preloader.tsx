"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// The curtain's bottom edge is a round arc that keeps its shape while the
// whole curtain lifts away, so the arc leaves the screen still curved.
const CURVED = "M0 0 L926 0 L926 1000 Q463 730 0 1000 L0 0";

const LIFT_SECONDS = 2;
// Safety net in case the animation never reports completion.
const MAX_MS = 3500;

/**
 * Full-screen curtain that lifts off the hero on first load. It is part of the
 * server HTML so the hero never flashes before it; `.preloader` is hidden
 * for reduced motion and without JS (see globals.css and the noscript style).
 */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), MAX_MS);
    return () => clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <motion.div
      aria-hidden
      className="preloader pointer-events-none fixed left-0 top-0 z-[100] h-screen w-screen bg-night"
      initial={{ y: "0vh" }}
      animate={{ y: "-100vh" }}
      transition={{ duration: LIFT_SECONDS, ease: [0.2, 0.38, 0.09, 0.91] }}
      onAnimationComplete={() => setDone(true)}
    >
      <svg
        className="absolute top-0 h-[calc(100%+300px)] w-full"
        viewBox="0 0 926 1000"
        preserveAspectRatio="none"
      >
        <path className="fill-night" d={CURVED} />
      </svg>
    </motion.div>
  );
}
