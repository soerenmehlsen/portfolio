import { ProjectInfo } from "@/app/lib/types";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { analyticsEvents } from "@/app/lib/analytics";

type ProjectCardProps = ProjectInfo & {
  onClick?: () => void;
};

export default function ProjectCard({
  title,
  description,
  techStack = [],
  imageUrl,
  live,
  onClick,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [1, 1]);
  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="flex flex-col items-center px-4 pt-10 md:pt-10"
      onClick={onClick}
    >
      <article className="w-[400px] max-w-full overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg cursor-pointer">
        <Image
          src={imageUrl || "/upcoming-project.png"}
          height="1000"
          width="1000"
          className="h-56 w-full object-cover"
          alt={title}
          loading="lazy"
        />

        <div className="bg-white px-4 py-4 dark:bg-white/10 sm:px-6 sm:py-4">
          <div>
            <ul className="flex flex-wrap gap-2 pb-2">
              {techStack.map((tech, index) => (
                <li
                  className="rounded-full bg-black/[0.7] px-3 py-1 text-[0.5rem] uppercase tracking-wider text-white dark:bg-white/10 dark:text-white"
                  key={index}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <a
            // href={live}
            onClick={() =>
              analyticsEvents.trackDemoClick({
                project: `${title}`,
                section: "projects",
              })
            }
          >
            <h3 className="mt-0.5 text-lg text-gray-900 hover:text-orange-400 hover:shadow-2xl dark:text-white">
              {title}
            </h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-300">
            {description}
          </p>
        </div>
      </article>
    </motion.div>
  );
}
