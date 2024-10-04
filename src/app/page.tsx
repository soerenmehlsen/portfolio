import Hero from "@/app/components/home/Hero";
import React from "react";
import About from "@/app/components/about/About";
import Projects from "@/app/components/projects/Projects";
import Skills from "@/app/components/skills/Skills";
import Experience from "@/app/components/experience/Experience";
import SectionDivider from "@/app/components/common/SectionDivider";

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-20 md:pt-28 px-4">
      <Hero />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
    </main>
  );
}
