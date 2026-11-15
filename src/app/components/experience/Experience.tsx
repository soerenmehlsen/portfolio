"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RevealHeading from "@/app/components/motion/RevealHeading";
import { experiencesData } from "@/app/lib/data";

const BIG_EASE = [0.77, 0, 0.175, 1] as const;

// How much scrolling each experience gets while the section is pinned.
const SCROLL_PER_ROW_SVH = 70;

export default function Experience() {
  // Server and first client render: every row expanded, normal flow. After
  // mount, the pinned scroll-driven mode is enabled only on md+ screens that
  // are tall enough to hold it, and only without reduced motion.
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const capable = window.matchMedia(
      "(min-width: 768px) and (min-height: 700px)",
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      // Progress through the pinned runway is a pure function of scroll
      // position, so it does not depend on which row is currently open.
      const rect = section.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      if (runway <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / runway));
      const count = experiencesData.length;
      setActive(Math.min(count - 1, Math.floor(progress * count)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    let attached = false;
    const sync = () => {
      const enable = capable.matches && !reduced.matches;
      setPinned(enable);
      if (enable && !attached) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        attached = true;
        schedule();
      } else if (!enable && attached) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        attached = false;
      }
    };

    sync();
    capable.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      capable.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-10 scroll-mt-12 rounded-t-3xl bg-night text-bone"
      style={
        pinned
          ? {
              height: `calc(100svh + ${experiencesData.length * SCROLL_PER_ROW_SVH}svh)`,
            }
          : undefined
      }
    >
      <div
        className={
          pinned
            ? "sticky top-0 h-svh overflow-hidden px-10 pt-20"
            : "px-6 pb-24 pt-20 md:px-10 md:pb-40 md:pt-32"
        }
      >
        <p className="font-mono text-xs uppercase tracking-wide text-olive">
          (CAREER)
        </p>
        <RevealHeading
          text="EXPERIENCE /"
          className="mt-6 text-[clamp(2.5rem,min(9vw,11vh),8rem)] font-medium uppercase leading-[0.95] tracking-tighter"
        />

        <ol
          className={`border-t border-bone/20 ${pinned ? "mt-8" : "mt-12 md:mt-20"}`}
        >
          {experiencesData.map((item, i) => {
            const open = !pinned || i === active;
            return (
              <li
                key={i}
                className={`border-b border-bone/20 ${pinned ? "py-4" : "py-6 md:py-8"}`}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-10">
                  <span className="font-mono text-xs uppercase tracking-wide text-olive md:w-24 md:shrink-0">
                    ({String(i + 1).padStart(2, "0")})
                  </span>
                  <h3
                    className={`text-2xl font-medium tracking-tight md:flex-1 md:text-4xl ${
                      pinned && !open
                        ? "text-bone/60"
                        : "text-bone"
                    } transition-colors duration-500`}
                  >
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wide text-olive md:text-right">
                    {item.location} · {item.date}
                  </p>
                </div>
                <motion.div
                  initial={false}
                  animate={
                    open
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.7, ease: BIG_EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pt-4 text-base leading-relaxed text-bone md:ml-[8.5rem] md:text-lg">
                    {item.description}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
