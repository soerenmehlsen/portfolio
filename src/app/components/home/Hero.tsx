"use client";

import Image from "next/image";
import RevealHeading from "@/app/components/motion/RevealHeading";
import { analyticsEvents } from "@/app/lib/analytics";
import { contactEmail } from "@/app/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="sticky top-0 flex min-h-screen flex-col justify-between overflow-hidden bg-sand px-6 pb-8 pt-24 text-ink md:px-10"
    >
      <RevealHeading
        as="h1"
        text="SØREN MEHLSEN"
        className="text-[clamp(1.5rem,9.4vw,10.5rem)] font-medium uppercase leading-[0.95] tracking-tighter"
      />

      <div className="flex flex-1 flex-col gap-8 pt-8 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-sm flex-col gap-6">
          <span aria-hidden className="text-5xl leading-none">
            ↘
          </span>
          <p className="text-xl font-medium tracking-tight md:text-2xl">
            Health Tech engineer, who likes to build things on the web.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            onClick={() =>
              analyticsEvents.trackContactClick({ type: "email", section: "hero" })
            }
            className="self-start rounded-full bg-ink px-7 py-3 font-mono text-xs uppercase tracking-wide text-sand transition-transform duration-200 hover:scale-105"
          >
            Contact ↗
          </a>
        </div>

        <div className="relative h-80 w-56 self-center md:h-[28rem] md:w-80 md:self-auto">
          <Image
            src="/profilbillede.png"
            alt="Portrait of Søren Mehlsen"
            fill
            priority
            sizes="(min-width: 768px) 20rem, 14rem"
            className="object-cover object-top grayscale"
          />
        </div>
      </div>

      <p className="self-end text-right font-mono text-xs uppercase leading-relaxed tracking-wide text-stone">
        Based in
        <br />
        Denmark
      </p>
    </section>
  );
}
