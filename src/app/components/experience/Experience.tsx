import RevealHeading from "@/app/components/motion/RevealHeading";
import { experiencesData } from "@/app/lib/data";

// Stacked sticky cards (md and up): every card pins below the previous
// card's header and the next card slides over its body. Pure CSS, so the
// scroll length follows the card height instead of a scroll-progress runway.
const HEADER_REM = 5; // fixed header height of a card, md+
const FIRST_STICKY_TOP_REM = 6; // where the first card pins from the top

export default function Experience() {
  const last = experiencesData.length - 1;
  // Scroll per experience ≈ card min-height (md:min-h-[22rem]) + gap (md:mb-12).

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
            style={{ top: `${FIRST_STICKY_TOP_REM + i * HEADER_REM}rem` }}
            className={`border-t border-bone/20 bg-night py-6 md:sticky md:min-h-[22rem] md:py-0 ${
              i < last ? "md:mb-12" : "border-b"
            }`}
          >
            <div className="flex flex-col gap-3 md:h-20 md:flex-row md:items-center md:gap-10">
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
