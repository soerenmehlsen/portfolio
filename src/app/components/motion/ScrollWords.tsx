"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type ScrollWordsProps = {
  text: string;
  className?: string;
};

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

export default function ScrollWords({ text, className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  const words = text.split(" ");

  return (
    <p ref={ref} aria-label={text} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <span key={i} aria-hidden>
            <Word word={word} range={[start, end]} progress={scrollYProgress} />
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </p>
  );
}
