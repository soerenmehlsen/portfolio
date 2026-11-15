import RevealHeading from "@/app/components/motion/RevealHeading";
import { experiencesData } from "@/app/lib/data";

// Stacked sticky cards (md and up): every card pins below the previous
// card's header and the next card slides over its body. Pure CSS, so the
// scroll length follows the card height instead of a scroll-progress runway.
//
// A sticky card is held back by the bottom of the list, margin box included.
// Each card therefore gets a bottom margin equal to the pin offset of the
// cards after it, so every card's limit (top + height + margin) is the same:
// they all release together and keep their spacing as the stack scrolls away,
// instead of the later cards sliding over the earlier ones.
const HEADER_REM = 4; // fixed header height of a card, md+
const FIRST_STICKY_TOP_REM = 6; // where the first card pins from the top
// Scroll per experience ≈ card min-height (md:min-h-[17rem]) + its margin.

export default function Experience() {
  const last = experiencesData.length - 1;

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
        className="mt-6 text-[clamp(2.5rem,min(9vw,11vh),8rem)] font-medium uppercase leading-[0.95] tracking-tighter"
      />

      <ol className="mt-12 md:mt-20">
        {experiencesData.map((item, i) => (
          <li
            key={i}
            style={
              {
                "--pin": `${FIRST_STICKY_TOP_REM + i * HEADER_REM}rem`,
                "--release": `${(last - i) * HEADER_REM}rem`,
              } as React.CSSProperties
            }
            className="border-t border-bone/20 bg-night py-6 last:border-b md:sticky md:top-[var(--pin)] md:mb-[var(--release)] md:min-h-[17rem] md:py-0"
          >
            <div className="flex flex-col gap-3 md:h-16 md:flex-row md:items-center md:gap-10">
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
            <p className="max-w-3xl pt-6 text-base leading-relaxed text-bone md:ml-[8.5rem] md:pt-4 md:text-lg">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
