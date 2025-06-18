"use client";
import SectionHeading from "@/app/components/common/SectionHeading";
import { projectsData } from "@/app/lib/data";
import { useSectionInView } from "@/app/lib/useInView";
import ProjectCard from "./Project-card";
import BottomDrawer from "../layout/BottomDrawer";
import { useState } from "react";
import CloseButton from "../ui/CloseButton";

export default function Projects() {
  const { ref } = useSectionInView("#projects", 0.1);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);

  const handleOpenDrawer = (project: (typeof projectsData)[0]) => {
    setSelectedProject(project);
    setDrawerOpen(true);
  };

  return (
    <section id="projects" ref={ref} className="scroll-mt-12 sm:scroll-mt-28">
      <SectionHeading>My Projects</SectionHeading>

      <div className="mb-28 grid grid-cols-1 sm:mb-40 lg:grid-cols-2">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            onClick={() => handleOpenDrawer(project)}
          />
        ))}
      </div>

      <BottomDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {selectedProject && (
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between border-b border-gray-200 px-4 pb-4 pt-2">
              <h2 className="text-xl font-semibold">{selectedProject.title}</h2>
              <CloseButton onClick={() => setDrawerOpen(false)} />
            </div>
          </div>
        )}
      </BottomDrawer>
    </section>
  );
}
