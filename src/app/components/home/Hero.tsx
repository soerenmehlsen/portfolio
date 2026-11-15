"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import RevealHeading from "@/app/components/motion/RevealHeading";
import TextReveal from "@/app/components/motion/TextReveal";
import { analyticsEvents } from "@/app/lib/analytics";
import { contactEmail } from "@/app/lib/data";

// Entrance choreography, in seconds after load. The curtain (Preloader) is
// still lifting while the first elements start, so the page feels continuous.
const NAME_DELAY = 1.1;
const ARROW_DELAY = 1.1;
const IMAGE_DELAY = 1.2;
const TEXT_DELAY = 1.3;
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
        <RevealHeading
          as="h1"
          text="SØREN MEHLSEN"
          immediate
          delay={NAME_DELAY}
          charDelay={0.06}
          duration={0.5}
          ease="easeOut"
          className="whitespace-nowrap text-[calc((100vw-5rem)/7.5)] font-medium uppercase leading-[0.95] tracking-tighter"
        />

        <div className="flex flex-1 flex-col gap-8 pt-8 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-sm flex-col gap-6">
            <motion.span
              aria-hidden
              className="hero-in text-5xl leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: ARROW_DELAY, ease: POWER3_OUT }}
            >
              ↘
            </motion.span>
            <TextReveal
              text="Health Tech engineer, who likes to build things on the web."
              delay={TEXT_DELAY}
              className="text-xl font-medium leading-snug tracking-tight md:text-2xl"
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

          <div className="relative h-80 w-56 self-center overflow-hidden md:h-[min(28rem,40svh)] md:w-auto md:aspect-[11/14] md:self-auto">
            <motion.div
              className="hero-clip absolute inset-0"
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0, scale: 1.3 }}
              animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, delay: IMAGE_DELAY, ease: POWER3_OUT }}
            >
              <Image
                src="/profilbillede.png"
                alt="Portrait of Søren Mehlsen"
                fill
                priority
                sizes="(min-width: 768px) 22rem, 14rem"
                className="object-cover object-top grayscale"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col items-end self-end font-mono text-xs uppercase leading-relaxed tracking-wide text-stone">
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
      </motion.div>
    </section>
  );
}
