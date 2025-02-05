"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";
import Link from "next/link";
import { ProjectInfo } from "@/app/lib/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { analyticsEvents } from "@/app/lib/analytics";

type ProjectCardProps = ProjectInfo;

const ImageModal: React.FC<{ imageGifUrl: string; onClose: () => void }> = ({
  imageGifUrl,
  onClose,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-2xl bg-white rounded-full p-2 w-10 h-10 inline-flex items-center justify-center text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        ×
      </button>
      <Image
        src={imageGifUrl}
        height="1000"
        width="1000"
        className="object-contain"
        alt="Full screen image"
      />
    </div>
  </div>
);

export default function ThreeDProjectCard({
  title,
  description,
  techStack,
  imageUrl,
  imageGifUrl,
  github,
  live,
}: ProjectCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.50 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <>
      <motion.div
        ref={ref}
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="group mb-0 sm:mb-3 last:mb-0"
      >
        <CardContainer className="inter-var">
          <CardBody
            className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-white/10 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border
                    "
          >
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-black dark:text-white"
            >
              {title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              {description}
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={imageUrl || "/upcoming-project.png"}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt={title}
                loading="lazy"
                onClick={() => setModalOpen(true)}
                aria-label={`Open ${title} project details`}
              />
            </CardItem>
            <CardItem translateZ="60">
              <ul className="flex flex-wrap mt-8 gap-2 sm:mt-8">
                {techStack.map((tech, index) => (
                  <li
                    className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white dark:bg-white/10"
                    key={index}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                as={Link}
                href={github}
                target="__blank"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                onClick={() =>
                  analyticsEvents.trackSocialClick({
                    platform: "github",
                    section: "projects",
                  })
                }
              >
                GitHub →
              </CardItem>
              <CardItem
                translateZ={20}
                as={Link}
                href={live}
                target="__blank"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                onClick={() =>
                  analyticsEvents.trackDemoClick({
                    project: `${title}`,
                    section: "projects",
                  })
                }
              >
                Demo
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </motion.div>
      {isModalOpen && (
        <ImageModal
          imageGifUrl={imageGifUrl || "/upcoming-project.png"}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
