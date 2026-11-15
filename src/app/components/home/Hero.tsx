"use client";

import ResponsiveImage from "@/app/components/ResponsiveImage";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import RevealHeading from "@/app/components/motion/RevealHeading";
import TextReveal from "@/app/components/motion/TextReveal";
import { INTRO_START } from "@/app/components/motion/intro";
import { analyticsEvents } from "@/app/lib/analytics";
import { contactEmail } from "@/app/lib/data";

// Entrance choreography, in seconds after load. Nothing moves until the
// curtain (Preloader) has left the screen; after that the elements follow
// each other with the same small offsets as the original sequence.
const NAME_DELAY = INTRO_START;
const ARROW_DELAY = INTRO_START;
const IMAGE_DELAY = INTRO_START + 0.1;
const TEXT_DELAY = INTRO_START + 0.2;
const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  // Content eases out as the dark sections roll over the hero: progress is
  // 0 at the top of the page and 1 once 60% of a viewport has been scrolled.
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (y) =>
    typeof window === "undefined"
      ? 0
      : Math.min(1, Math.max(0, y / (window.innerHeight * 0.6))),
  );
  const scale = useTransform(progress, [0, 1], reduced ? [1, 1] : [1, 0.95]);
  const lift = useTransform(progress, [0, 1], reduced ? [0, 0] : [0, 42]);
  const fade = useTransform(progress, [0, 1], reduced ? [1, 1] : [1, 0]);

  return (
    <section
      id="home"
      className="md:sticky md:top-0 flex min-h-svh flex-col overflow-hidden bg-sand px-6 pb-8 pt-24 text-ink md:px-10"
    >
      <motion.div
        style={{ scale, y: lift, opacity: fade }}
        className="flex flex-1 flex-col justify-between"
      >
        {/* Container-relative type size: the name fills the content width at any
            screen size (cqw = 1% of this wrapper), whatever the scrollbar or padding. */}
        <div className="@container">
          <RevealHeading
            as="h1"
            text="SØREN MEHLSEN"
            immediate
            delay={NAME_DELAY}
            charDelay={0.06}
            duration={0.5}
            ease="easeOut"
            className="whitespace-nowrap text-[length:13.2cqw] font-medium uppercase leading-[0.95] tracking-tighter md:text-[length:13.6cqw]"
          />
        </div>

        {/* Three columns from lg; below that (phones, tablets) everything stacks. */}
        <div className="flex flex-1 flex-col gap-8 pt-8 lg:grid lg:grid-cols-3 lg:gap-10">
          <div className="flex max-w-sm flex-col gap-6 2xl:max-w-md">
            <motion.span
              aria-hidden
              className="hero-in text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: ARROW_DELAY, ease: POWER3_OUT }}
            >
              ↘
            </motion.span>
            <TextReveal
              text="Health Tech engineer, who likes to build things on the web."
              delay={TEXT_DELAY}
              className="text-m font-medium leading-snug tracking-tight md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl"
            />
            <div className="self-start overflow-hidden">
              <motion.div
                className="hero-in"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: TEXT_DELAY, ease: POWER3_OUT }}
              >
                <a
                  href={`mailto:${contactEmail}`}
                  onClick={() =>
                    analyticsEvents.trackContactClick({
                      type: "email",
                      section: "hero",
                    })
                  }
                  className="inline-block rounded-full bg-ink px-7 py-3 font-mono text-xs uppercase tracking-wide text-sand transition-transform duration-200 hover:scale-105"
                >
                  Contact ↗
                </a>
              </motion.div>
            </div>
          </div>

          <div className="relative aspect-[11/14] h-[min(20rem,42svh)] max-w-full w-auto self-center overflow-hidden md:h-[clamp(18rem,42svh,36rem)] lg:justify-self-center lg:self-start">
            <motion.div
              className="hero-clip absolute inset-0"
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0, scale: 1.3 }}
              animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, delay: IMAGE_DELAY, ease: POWER3_OUT }}
            >
              <ResponsiveImage
                src="/profilbillede.png"
                alt="Portrait of Søren Mehlsen"
                priority
                sizes="(min-width: 768px) min(28.3rem, max(14.2rem, 33svh)), min(15.8rem, 33svh)"
                className="object-cover object-top"
              />
            </motion.div>
          </div>

          <div className="flex flex-col items-end self-end font-mono text-xs uppercase leading-relaxed tracking-wide text-stone lg:justify-self-end 2xl:text-sm">
            <TextReveal
              text="Based in"
              delay={TEXT_DELAY}
              wordDelay={0.01}
              className="text-right"
            />
            <TextReveal
              text="Denmark"
              delay={TEXT_DELAY + 0.05}
              wordDelay={0.01}
              className="text-right"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
