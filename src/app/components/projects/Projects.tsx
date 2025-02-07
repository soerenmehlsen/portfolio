"use client";
import SectionHeading from "@/app/components/common/SectionHeading";
import { projectsData } from "@/app/lib/data";
import { useSectionInView } from "@/app/lib/useInView";
import ProjectCard from "./Project-card";

export default function Projects() {
  const { ref } = useSectionInView("#projects", 0.1);
  return (
    <section id="projects" ref={ref} className="scroll-mt-12 sm:scroll-mt-28">
      <SectionHeading>My Projects</SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 mb-28 sm:mb-40 ">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
