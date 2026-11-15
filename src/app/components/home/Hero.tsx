"use client";

import { useRef, useState } from "react";
import HeroSculpture, { type SceneState } from "./HeroSculpture";
import { motion } from "framer-motion";
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
const SCULPTURE_DELAY = INTRO_START + 0.1;
const TEXT_DELAY = INTRO_START + 0.2;
const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sceneState, setSceneState] = useState<SceneState>("loading");
  return (
    <section
      id="home"
      ref={sectionRef}
      data-scene-state={sceneState}
      className="hero-sequence bg-sand text-ink"
      onFocusCapture={(event) => {
        const section = sectionRef.current;
        const experience = document.getElementById("experience");
        // A sticky hero may be behind the next card when tabbing backwards.
        if (
          section &&
          experience &&
          getComputedStyle(section).position === "sticky" &&
          event.target.getBoundingClientRect().bottom >
            experience.getBoundingClientRect().top
        ) {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }}
    >
      <div className="hero-stage px-6 pt-24 pb-6 md:px-10">
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
            className="text-[length:13.2cqw] leading-[0.95] font-medium tracking-tighter whitespace-nowrap uppercase md:text-[length:13.6cqw]"
          />
        </div>

        {/* Three columns from lg; below that (phones, tablets) everything stacks. */}
        <div className="hero-body">
          <div className="hero-intro flex max-w-sm flex-col gap-3 lg:gap-6 2xl:max-w-md">
            <motion.span
              aria-hidden
              className="hero-in text-2xl leading-none md:text-3xl lg:text-4xl xl:text-5xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: ARROW_DELAY, ease: POWER3_OUT }}
            >
              ↘
            </motion.span>
            <TextReveal
              text="Health Tech engineer, who likes to build things on the web."
              delay={TEXT_DELAY}
              className="text-m leading-snug font-medium tracking-tight md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl"
            />
            <div className="self-start overflow-hidden">
              <motion.div
                className="hero-in"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: TEXT_DELAY,
                  ease: POWER3_OUT,
                }}
              >
                <a
                  href={`mailto:${contactEmail}`}
                  onClick={() =>
                    analyticsEvents.trackContactClick({
                      type: "email",
                      section: "hero",
                    })
                  }
                  className="inline-block rounded-full bg-ink px-7 py-3 font-mono text-xs tracking-wide text-sand uppercase transition-transform duration-200 hover:scale-105"
                >
                  Contact ↗
                </a>
              </motion.div>
            </div>
          </div>

          <div className="hero-art">
            <motion.div
              className="hero-clip absolute inset-0"
              initial={{
                clipPath: "inset(0 0 100% 0)",
                opacity: 0,
                scale: 1.3,
              }}
              animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1, scale: 1 }}
              transition={{
                duration: 1.8,
                delay: SCULPTURE_DELAY,
                ease: POWER3_OUT,
              }}
            >
              <HeroSculpture
                sectionRef={sectionRef}
                onStateChange={setSceneState}
              />
            </motion.div>
          </div>

          <div className="hero-location flex flex-col items-end self-end font-mono text-xs leading-relaxed tracking-wide text-stone uppercase 2xl:text-sm">
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
        <div className="hero-scroll-cue font-mono text-[0.65rem] tracking-wide text-stone uppercase">
          <a
            href="#experience"
            className="inline-flex items-center gap-3 transition-colors hover:text-ink"
          >
            <span>Scroll to explore</span>
            <span aria-hidden="true">↓</span>
          </a>
          <span className="hero-scene-meter" aria-hidden="true">
            <span />
          </span>
        </div>
      </div>
    </section>
  );
}
