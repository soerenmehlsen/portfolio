"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RevealHeading from "@/app/components/motion/RevealHeading";
import { experiencesData } from "@/app/lib/data";

const BIG_EASE = [0.77, 0, 0.175, 1] as const;

export default function Experience() {
  // Server and first client render: every row expanded. After mount, the
  // accordion is enabled only on md+ without reduced motion.
  const [interactive, setInteractive] = useState(false);
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    const update = () => {
      frame = 0;
      const centre = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - centre);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActive(best);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    let attached = false;
    const sync = () => {
      const enable = desktop.matches && !reduced.matches;
      setInteractive(enable);
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
    desktop.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative z-10 scroll-mt-12 rounded-t-3xl bg-night px-6 pb-24 pt-20 text-bone md:px-10 md:pb-40 md:pt-32"
    >
      <p className="font-mono text-xs uppercase tracking-wide text-olive">
        (CAREER)
      </p>
      <RevealHeading
        text="EXPERIENCE /"
        className="mt-6 text-[clamp(2.5rem,9vw,8rem)] font-medium uppercase leading-[0.95] tracking-tighter"
      />

      <ol className="mt-12 border-t border-bone/20 md:mt-20">
        {experiencesData.map((item, i) => {
          const open = !interactive || i === active;
          return (
            <li
              key={i}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="border-b border-bone/20 py-6 md:py-8"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-10">
                <span className="font-mono text-xs uppercase tracking-wide text-olive md:w-24 md:shrink-0">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <h3 className="text-2xl font-medium tracking-tight md:flex-1 md:text-4xl">
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
                <p className="max-w-2xl pt-6 text-base leading-relaxed text-bone md:ml-[8.5rem] md:text-lg">
                  {item.description}
                </p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
