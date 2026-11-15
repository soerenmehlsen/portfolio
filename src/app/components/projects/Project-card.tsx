"use client";

import { useRef, useState } from "react";
import ResponsiveImage from "@/app/components/ResponsiveImage";
import assets from "@/app/lib/image-assets.json";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { analyticsEvents } from "@/app/lib/analytics";
import type { ProjectInfo } from "@/app/lib/types";

const linkClass =
  "font-mono text-xs uppercase tracking-wide text-bone underline-offset-4 transition-colors duration-200 hover:text-sand hover:underline";

export default function ProjectCard({
  project,
  index,
}: {
  project: ProjectInfo;
  index: number;
}) {
  const { title, description, techStack = [], github, live } = project;
  const source = project.imageUrl ?? "/upcoming-project.png";
  const src = Object.hasOwn(assets, source)
    ? (source as keyof typeof assets)
    : "/upcoming-project.png";
  const [playing, setPlaying] = useState(false);
  const animation = project.imageGifUrl?.endsWith(".gif")
    ? project.imageGifUrl
    : undefined;
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5],
    reduced ? [1, 1] : [1.08, 1]
  );

  return (
    <li className="border-b border-bone/20 py-10 md:py-16">
      <article className="flex flex-col gap-6 md:flex-row md:gap-10">
        <span className="font-mono text-5xl leading-none tracking-tighter text-olive md:w-48 md:shrink-0 md:text-8xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-1 flex-col gap-6">
          <motion.div
            ref={cardRef}
            whileHover={reduced ? undefined : { y: -6 }}
            transition={{ duration: 0.25 }}
            className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bone/10"
          >
            <motion.div className="absolute inset-0" style={{ scale }}>
              {playing && animation ? (
                <img
                  src={animation}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <ResponsiveImage
                  src={src}
                  alt={title}
                  sizes="(min-width: 768px) calc(100vw - 19.5rem), calc(100vw - 3rem)"
                  className="object-cover"
                />
              )}
            </motion.div>
            {animation && (
              <button
                type="button"
                aria-pressed={playing}
                aria-label={`${playing ? "Stop" : "Play"} ${title} demo`}
                onClick={() => setPlaying((value) => !value)}
                className="absolute right-4 bottom-4 rounded-full bg-ink px-5 py-3 font-mono text-xs text-sand"
              >
                {playing ? "Stop demo" : "Play demo"}
              </button>
            )}
          </motion.div>
          <p className="max-w-2xl text-base leading-relaxed text-bone md:text-lg">
            {description}
          </p>
          <h3 className="font-mono text-sm tracking-wide text-sand uppercase">
            {title}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-bone/30 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-bone uppercase"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div className="flex gap-6">
            {live !== github && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                onClick={() =>
                  analyticsEvents.trackDemoClick({
                    project: title,
                    section: "projects",
                  })
                }
              >
                LIVE ↗
              </a>
            )}
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              onClick={() =>
                analyticsEvents.trackSocialClick({
                  platform: "github",
                  section: "projects",
                })
              }
            >
              GITHUB ↗
            </a>
          </div>
        </div>
      </article>
    </li>
  );
}
