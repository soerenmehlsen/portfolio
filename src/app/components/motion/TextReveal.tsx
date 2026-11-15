"use client";

import { motion } from "framer-motion";

type TextRevealProps = {
  text: string;
  className?: string;
  /** Seconds before the first word moves. */
  delay?: number;
  /** Extra delay per word, in seconds (0 = all words together). */
  wordDelay?: number;
};

/** Words slide up from behind a mask on mount. Real text, so it stays readable. */
export default function TextReveal({
  text,
  className,
  delay = 0,
  wordDelay = 0,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <div className="overflow-hidden">
      <span className={`block ${className ?? ""}`}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className={`hero-in inline-block ${i < words.length - 1 ? "pr-[0.25em]" : ""}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              ease: "easeOut",
              duration: 0.4,
              delay: delay + i * wordDelay,
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </div>
  );
}
