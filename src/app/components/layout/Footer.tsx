"use client";

import { useEffect, useState } from "react";
import RevealHeading from "@/app/components/motion/RevealHeading";
import { analyticsEvents } from "@/app/lib/analytics";
import { contactEmail, socials } from "@/app/lib/data";

const PLACEHOLDER = "--:--:--";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Copenhagen",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function LocalTime() {
  const [time, setTime] = useState(PLACEHOLDER);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p>
      LOCAL TIME <span className="text-sand tabular-nums">{time}</span>
    </p>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="contact-section relative z-10 -mt-6 scroll-mt-12 rounded-t-3xl bg-night px-6 pt-20 pb-8 text-bone md:px-10 md:pt-32"
    >
      <div className="contact-reveal">
        <RevealHeading
          text="LET'S TALK"
          className="text-[clamp(3rem,13vw,12rem)] leading-[0.95] font-medium tracking-tighter text-sand uppercase"
        />
        <div className="mt-10 flex flex-col items-start gap-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <a
            href={`mailto:${contactEmail}`}
            onClick={() =>
              analyticsEvents.trackContactClick({
                type: "email",
                section: "footer",
              })
            }
            className="rounded-full bg-sand px-7 py-3 font-mono text-xs tracking-wide text-ink uppercase transition-transform duration-200 hover:scale-105"
          >
            {contactEmail} ↗
          </a>
          <div className="flex gap-6 font-mono text-xs tracking-wide uppercase">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  analyticsEvents.trackSocialClick({
                    platform: social.name.toLowerCase(),
                    section: "footer",
                  })
                }
                className="transition-opacity duration-200 hover:opacity-60"
              >
                {social.name} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-2 border-t border-bone/15 pt-6 font-mono text-xs tracking-wide uppercase md:mt-32 md:flex-row md:justify-between">
        <p>© 2026 Søren Mehlsen</p>
        <LocalTime />
      </div>
    </footer>
  );
}
