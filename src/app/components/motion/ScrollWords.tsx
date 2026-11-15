import { Fragment, type CSSProperties } from "react";

type ScrollWordsProps = {
  text: string;
  className?: string;
};

export default function ScrollWords({ text, className }: ScrollWordsProps) {
  const words = text.split(" ");

  return (
    <p className={`scroll-words ${className ?? ""}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Fragment key={i}>
            <span
              className="scroll-word"
              style={
                {
                  "--word-start": `${start * 100}%`,
                  "--word-end": `${end * 100}%`,
                } as CSSProperties
              }
            >
              {word}
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </p>
  );
}
