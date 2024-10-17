"use client";
import SectionHeading from "@/app/components/common/SectionHeading";
import { projectsData } from "@/app/lib/data";
import { useSectionInView } from "@/app/lib/useInView";
import ThreeDProjectCard from "@/app/components/projects/ThreeDProject-card";

export default function Projects() {
  const { ref } = useSectionInView("#projects", 0.1);
  return (
    <section id="projects" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My Projects</SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-4">
        {projectsData.map((project, index) => (
          <ThreeDProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
