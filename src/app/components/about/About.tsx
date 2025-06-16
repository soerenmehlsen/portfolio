"use client";
import React from "react";
import SectionHeading from "../common/SectionHeading";
import { useSectionInView } from "@/app/lib/useInView";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";

export default function About() {
  const { ref } = useSectionInView("#about");

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
      ref={ref}
      className="max-w-[45rem] text-center mb-28 sm:mb-40 scroll-mt-12 sm:scroll-mt-28"
    >
      <div className="container mx-auto">
        <Fade
          direction="up"
          delay={400}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <SectionHeading>About me</SectionHeading>
        </Fade>

        <div className="grid xl:grid-cols-2 lg:text-start">
          <div className="flex-1">
            <div className="text-lg mt-2 xl:mt-3">
              <div className="flex justify-start flex-col">
                <Fade
                  direction="up"
                  delay={400}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <h3 className="font-bold mt-6">My passion</h3>
                </Fade>
                <Fade
                  direction="up"
                  delay={600}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <p className="mb-3">
                    After graduating with a bachelor&apos;s degree in{" "}
                    <span className="font-medium">
                      Health Technology Engineering
                    </span>
                    , I have focused on applying my skills to software
                    development. My interest is working with{" "}
                    <span className="font-medium">front-end development</span>{" "}
                    in React and WPF, as well as{" "}
                    <span className="font-medium">back-end systems</span> using
                    .NET Core and Web APIs. My favorite part of developing
                    software is finding solutions to complex challenges. The
                    thrill I get of solving a problem is what drives me. My core
                    stack includes{" "}
                    <span className="font-medium">
                      C# in .NET, React.JS, MongoDB, and MSSQL
                    </span>
                    , and I am continually trying to learn new skills. I am
                    currently looking for a job as a{" "}
                    <span className="font-medium">
                      full-time software developer
                    </span>
                    .
                  </p>
                </Fade>

                <Fade
                  direction="up"
                  delay={800}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <h3 className="font-bold mt-6">Personal profile</h3>
                </Fade>

                <Fade
                  direction="up"
                  delay={1000}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <p>
                    <span className="italic">When I&apos;m not coding</span>, I
                    enjoy staying active by playing padel, working out, and
                    spending time with family and friends. I also have a strong
                    interest for technology and love keeping up with the latest
                    advancements in the field.
                  </p>
                </Fade>
              </div>
            </div>
          </div>
          {/* Right image */}
          <div>
            <Fade
              direction="right"
              delay={600}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <Image
                src="Studio_Ghibli_Soren.png"
                alt="Ghibli Soren"
                width="400"
                height="300"
                loading="lazy"
                className="mt-8 mx-auto lg:mx-8 object-cover rounded-lg shadow-lg shadow-gray-500/20"
              />
            </Fade>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
