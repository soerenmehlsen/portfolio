"use client";
import React from 'react'
import SectionHeading from "./section-heading";
import {useSectionInView} from "@/app/lib/useInView";
import {motion} from "framer-motion";
import {Fade} from 'react-awesome-reveal';
import Image from 'next/image';

export default function About() {
    const { ref } = useSectionInView('#about')

    return (
        <motion.section
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.175 }}
            id="about"
            ref={ref}
            className="max-w-[45rem] text-center mt-32 leading-8 mb-28 sm:mb-40 scroll-mt-28"
            >
            <div className="container mx-auto">
                <Fade direction="up" delay={400} cascade damping={1e-1} triggerOnce={true}>
                    <SectionHeading>
                        About me
                    </SectionHeading>
                </Fade>

                <div className="grid xl:grid-cols-2 lg:text-start">
                    <div className="flex-1">
                        <div className="text-lg mt-12 xl:mt-3">
                            <div className="flex justify-start flex-col">
                                <Fade direction="up" delay={400} cascade damping={1e-1} triggerOnce={true}>
                                <h3 className="font-bold mt-6">My passion</h3>
                                </Fade>
                                <Fade direction="up" delay={600} cascade damping={1e-1} triggerOnce={true}>
                                <p className="mt-2 leading-relaxed text-sm text-gray-700 dark:text-white/70">Text about my passion random text
                                    random text random text random text random
                                    text random text random text random text random text
                                    random text random text random text random text random text
                                    random text random text random text random text random text
                                </p>
                                </Fade>

                                <Fade direction="up" delay={800} cascade damping={1e-1} triggerOnce={true}>
                                    <h3 className="font-bold mt-6">Something else about me</h3>
                                </Fade>

                                <Fade direction="up" delay={1000} cascade damping={1e-1} triggerOnce={true}>
                                <p className="mt-2 leading-relaxed text-sm text-gray-700 dark:text-white/70">
                                    random text random text random text random
                                    text random text random text random text random text
                                    random text random text random text random text random text
                                    random text random text random text random text random text
                                </p>
                                </Fade>

                            </div>
                        </div>
                    </div>
                    {/* Right image */}
                    <div>
                        <Fade direction="right" delay={600} cascade damping={1e-1} triggerOnce={true}>
                    <Image
                        src="/gaming-room.png"
                        alt="Gaming room"
                        width="600"
                        height="600"
                        loading="lazy"
                        className="mt-8 mx-auto lg:mx-8 object-cover"
                    />
                        </Fade>
                </div>
                </div>
            </div>
        </motion.section>
    );
}

