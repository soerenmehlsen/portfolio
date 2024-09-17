"use client";
import SectionHeading from "@/app/components/section-heading";
import {skillsData} from "@/app/lib/data";
import { useSectionInView} from "@/app/lib/useInView";

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
        <section id="skills" ref={ref} className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40">
            <SectionHeading>
                {"My Tech Stack"}
            </SectionHeading>
            <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
                {
                    skillsData.map((skill, index) => (
                        <motion.li
                            variants={fadeInAnimationVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{once: true}}
                            custom={index}
                            key={index}>
                            <h3 className="dark:10 dark:text-white/80">{skill.title}</h3>
                            <ul>
                                {
                                    skill.skills.map((tech, index) => (
                                        <motion.li
                                            variants={fadeInAnimationVariants}
                                            initial="initial"
                                            whileInView="animate"
                                            viewport={{once: true}}
                                            custom={index}
                                            key={index} className="bg-white border-black rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80 mt-2"
                                        >{tech}</motion.li>
                                    ))
                                }
                            </ul>
                        </motion.li>
                    ))
                }
            </ul>
        </section>
    )
}