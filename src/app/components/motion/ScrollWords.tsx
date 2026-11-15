"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

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
  return (
    <motion.span className="scroll-word" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export default function ScrollWords({ text, className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Fragment key={i}>
            <Word word={word} range={[start, end]} progress={scrollYProgress} />
            {i < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </p>
  );
}
