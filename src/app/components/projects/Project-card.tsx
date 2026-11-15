"use client";

import { useRef } from "react";
import Image from "next/image";
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
  const src = project.imageGifUrl ?? project.imageUrl ?? "/upcoming-project.png";
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5],
    reduced ? [1, 1] : [1.08, 1],
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
              <Image
                src={src}
                alt={title}
                fill
                unoptimized
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <p className="max-w-2xl text-base leading-relaxed text-bone md:text-lg">
            {description}
          </p>
          <h3 className="font-mono text-sm uppercase tracking-wide text-sand">
            {title}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-bone/30 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wide text-bone"
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
