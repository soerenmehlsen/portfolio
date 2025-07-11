"use client";
import SectionHeading from "@/app/components/common/SectionHeading";
import { skillsData } from "@/app/lib/data";
import { useSectionInView } from "@/app/lib/useInView";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("#skills", 0.1);
  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-12 text-center sm:mb-40 sm:scroll-mt-28"
    >
      <SectionHeading>{"My Tech Stack"}</SectionHeading>
      <ul className="mt-0 flex flex-wrap justify-center gap-2 text-lg text-gray-800 sm:mt-28">
        {skillsData.map((skill, index) => (
          <motion.li
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            key={index}
          >
            <h3 className="dark:10 mt-10 dark:text-white sm:m-auto">
              {skill.title}
            </h3>
            <ul>
              {skill.skills.map((skill, index) => (
                <motion.li
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                  key={index}
                  className="mt-2 rounded-xl border-black bg-white px-5 py-3 dark:bg-white/10 dark:text-white/80"
                >
                  <span className="flex items-center gap-2 text-neutral-600/90 hover:text-black hover:duration-300 dark:text-neutral-400/90 hover:dark:text-white">
                    <skill.icon className="text-xl" />
                    {skill.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
