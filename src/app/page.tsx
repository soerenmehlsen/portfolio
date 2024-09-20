import Hero from "@/app/components/Hero";
import React from "react";
import About from "@/app/components/about";
import Projects from "@/app/components/projects";
import Skills from "@/app/components/skills";
import Experience from "@/app/components/experience";
import SectionDivider from "@/app/components/section-divider";

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-20 md:pt-28 px-4">
      <Hero/>
        <SectionDivider/>
        <About/>
        <Projects/>
        <Skills/>
        <Experience/>
    </main>
  );
}

