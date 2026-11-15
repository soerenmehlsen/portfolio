"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LIFT_SECONDS } from "@/app/components/motion/intro";

// One black shape with a round bottom edge. The edge keeps its curve the whole
// way and the shape is lifted further than its own height, so the arc leaves
// the screen at full speed instead of slowing down or lingering at the top.
// Depth of the arc = half the gap between the corners (1000) and the control point (870).
const SHAPE = "M0 0 L926 0 L926 1000 Q463 870 0 1000 L0 0";
const SHAPE_HEIGHT_VH = 112; // just taller than the screen: the arc comes into view right away
const TRAVEL_VH = 122; // more than SHAPE_HEIGHT_VH: the arc is fully gone before the end
// Starts gently, then runs at a steady speed right to the end (the curve ends
// with slope 1), so the arc never slows down on its way out.
const LIFT_EASE = [0.25, 0, 0.8, 0.8] as const;
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
      className="preloader pointer-events-none fixed left-0 top-0 z-[100] h-screen w-screen"
      initial={{ y: "0vh" }}
      animate={{ y: `-${TRAVEL_VH}vh` }}
      transition={{ duration: LIFT_SECONDS, ease: LIFT_EASE }}
      onAnimationComplete={() => setDone(true)}
    >
      <svg
        className="absolute top-0 w-full"
        style={{ height: `${SHAPE_HEIGHT_VH}vh` }}
        viewBox="0 0 926 1000"
        preserveAspectRatio="none"
      >
        <path className="fill-night" d={SHAPE} />
      </svg>
    </motion.div>
  );
}
