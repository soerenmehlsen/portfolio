"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIntroSequence } from "./IntroSequence";

type RevealHeadingProps = {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  /** Start on mount instead of when scrolled into view (for above-the-fold). */
  immediate?: boolean;
  /** Seconds before the first character moves. */
  delay?: number;
  /** Extra delay per character, in seconds. */
  charDelay?: number;
  duration?: number;
  ease?: "easeOut" | readonly [number, number, number, number];
};

export default function RevealHeading({
  text,
  as = "h2",
  className,
  immediate = false,
  delay = 0,
  charDelay = 0.02,
  duration = 0.8,
  ease = [0.77, 0, 0.175, 1],
}: RevealHeadingProps) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const { started } = useIntroSequence();
  const active = immediate ? started : inView;

  const words = text.split(" ");
  let index = 0;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      aria-label={text}
      className={className}
    >
      {words.map((word, w) => (
        <Fragment key={w}>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const i = index++;
              return (
                // The mask is larger than the glyph box (padding), with the same
                // amount pulled back by a negative margin so line height and
                // letter spacing are unchanged. Without the extra room, ink
                // that sticks out of the box is cut flat: the slash of Ø at the
                // top and bottom, and the right side of S and R at the sides
                // (tight tracking makes each letter's box narrower than its ink).
                <span
                  key={i}
                  className="-mx-[0.1em] -my-[0.18em] inline-block overflow-hidden px-[0.1em] py-[0.18em] align-bottom leading-[1.1]"
                >
                  <motion.span
                    className="reveal-char inline-block"
                    initial={{ y: "110%" }}
                    animate={active ? { y: "0%" } : { y: "110%" }}
                    transition={{
                      duration,
                      ease: ease as never,
                      delay: delay + i * charDelay,
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
          {w < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
