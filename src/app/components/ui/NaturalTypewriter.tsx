"use client";

import React, { useEffect, useState } from "react";

type NaturalTypewriterProps = {
  text: string;
};

const getDelay = (char: string) => {
  if (char === " ") return 35;
  if (/[.,!?]/.test(char)) return 180;
  if (/[;:]/.test(char)) return 140;
  return 45;
};

const NaturalTypewriter = ({ text }: NaturalTypewriterProps) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    setTypedText("");

    const typeNext = () => {
      if (index >= text.length) return;

      index += 1;
      setTypedText(text.slice(0, index));
      timeoutId = setTimeout(typeNext, getDelay(text[index - 1]));
    };

    timeoutId = setTimeout(typeNext, 120);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <span aria-hidden="true" className="typewriter-text">
      <span>{typedText}</span>
      <span className="typewriter-cursor">
        |
      </span>
    </span>
  );
};

export default NaturalTypewriter;
