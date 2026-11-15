"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LIFT_SECONDS } from "@/app/components/motion/intro";
import { useIntroSequence } from "./IntroSequence";

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
// Keep the loading phase brief even if a resource stalls.
const MAX_LOADING_MS = 2800;
const MIN_LOADING_MS = 700;

/**
 * Full-screen curtain that lifts off the hero on first load. It is part of the
 * server HTML so the hero never flashes before it; `.preloader` is hidden
 * for reduced motion and without JS (see globals.css and the noscript style).
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const { started, start } = useIntroSequence();

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) {
      start();
      setDone(true);
      return;
    }
    const hero = document.getElementById("home");
    let released = false,
      fontsReady = false,
      minimumElapsed = false;
    let observer: MutationObserver | undefined;
    const release = () => {
      if (released) return;
      released = true;
      observer?.disconnect();
      start();
    };
    const check = () => {
      if (
        fontsReady &&
        minimumElapsed &&
        (!hero || hero.dataset.sceneState !== "loading")
      )
        release();
    };
    const minimum = setTimeout(() => {
      minimumElapsed = true;
      check();
    }, MIN_LOADING_MS);
    // A slow font or failed WebGL import must never trap visitors on this screen.
    const maximum = setTimeout(release, MAX_LOADING_MS);
    void document.fonts.ready.then(() => {
      fontsReady = true;
      check();
    });
    if (hero) {
      observer = new MutationObserver(check);
      observer.observe(hero, {
        attributes: true,
        attributeFilter: ["data-scene-state"],
      });
    }
    const reduce = () => {
      if (preference.matches) {
        release();
        setDone(true);
      }
    };
    preference.addEventListener("change", reduce);
    return () => {
      released = true;
      clearTimeout(minimum);
      clearTimeout(maximum);
      observer?.disconnect();
      preference.removeEventListener("change", reduce);
    };
  }, [start]);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setDone(true), (LIFT_SECONDS + 0.5) * 1000);
    return () => clearTimeout(timer);
  }, [started]);

  if (done) return null;

  return (
    <motion.div
      className="preloader fixed top-0 left-0 z-[100] h-screen w-screen"
      data-lifting={started}
      initial={{ y: "0vh" }}
      animate={{ y: started ? `-${TRAVEL_VH}vh` : "0vh" }}
      transition={{ duration: LIFT_SECONDS, ease: LIFT_EASE }}
      onAnimationComplete={() => {
        if (started) setDone(true);
      }}
    >
      <svg
        aria-hidden="true"
        className="absolute top-0 w-full"
        style={{ height: `${SHAPE_HEIGHT_VH}vh` }}
        viewBox="0 0 926 1000"
        preserveAspectRatio="none"
      >
        <path className="fill-night" d={SHAPE} />
      </svg>
      <div className="preloader-copy">
        <progress
          aria-label="Loading portfolio"
          className="preloader-spinner"
        />
        <span className="sr-only" role="status">
          {started ? "Portfolio ready" : ""}
        </span>
      </div>
    </motion.div>
  );
}
