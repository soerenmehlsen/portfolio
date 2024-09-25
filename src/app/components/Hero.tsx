"use client";
import React from 'react'
import Image from 'next/image'
import {BsLinkedin} from "react-icons/bs";
import {FaGithubSquare} from "react-icons/fa";
import {Mail} from 'lucide-react';
import Link from "next/link";

// Animation
import {Fade} from "react-awesome-reveal";
import {motion} from "framer-motion";
import {useSectionInView} from "@/app/lib/useInView";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";

const Hero = () => {
    const {ref} = useSectionInView("#home", 0.5);

    return (
        <section ref={ref} id="home" className="mb-28 max-w-[75rem] text-center sm:mb-0">
            <div className="flex items-center justify-center">
                <div className="relative">
                    <motion.div className="w-72 h-72 relative"
                                initial={{opacity: 0, scale: 0}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{type: "spring", stiffness: 125, damping: 10, duration: 0.2}}
                    >
                        <Image
                            src="/profilbillede.png"
                            fill
                            objectFit="cover"
                            objectPosition="top"
                            alt="hero"
                            priority={true}
                            className="rounded-full shadow-xl"
                        />
                    </motion.div>
                </div>
            </div>

            <Fade direction="up" delay={400} cascade damping={1e-1} triggerOnce={true}>
                <h1 className="mb-10 mt-4 text-2xl sm:text-4xl">
                    Hi, I&apos;m
                    <AnimatedGradientText>
                        <span
                            className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                            Soren
                        </span>
                    </AnimatedGradientText>
                    <span className="waving-hand">👋</span>
                    <p className="text-[14px]">
                        Health Tech engineer, who likes to build things on the web.
                    </p>
                </h1>
            </Fade>

            <motion.div className="flex sm:flex-row item-center justify-center gap-4 px-4 text-lg font-medium"
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1}}
            >
                <Link
                    href="mailto:soeren48@hotmail.com"
                    className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 dark:bg-white/10 active:scale-105 transition"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="btn-ping"/>
                        <span className="btn-ping_dot"/>
                    </span>
                    Connect <Mail color={"#9ca3af"}/>
                </Link>

                <a
                    className="bg-gray-900 p-4 text-white flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                    href="https://www.linkedin.com/in/soerenmehlsen"
                    target="_blank"
                >
                    <BsLinkedin/>
                </a>

                <a
                    className="bg-gray-900 p-4 text-white flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                    href="https://github.com/soerenmehlsen"
                    target="_blank"
                >
                    <FaGithubSquare/>
                </a>
            </motion.div>
        </section>
    )
}
export default Hero
