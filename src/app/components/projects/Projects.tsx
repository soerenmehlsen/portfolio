"use client";
import SectionHeading from "@/app/components/common/SectionHeading";
import { projectsData } from "@/app/lib/data";
import { useSectionInView } from "@/app/lib/useInView";
import ProjectCard from "./Project-card";
import BottomDrawer from "../layout/BottomDrawer";
import { useState } from "react";

export default function Projects() {
  const { ref } = useSectionInView("#projects", 0.1);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

   const handleOpenDrawer = (project: typeof projectsData[0]) => {
    setSelectedProject(project);
    setDrawerOpen(true);
  };

  return (
    <section id="projects" ref={ref} className="scroll-mt-12 sm:scroll-mt-28">
      <SectionHeading>My Projects</SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 mb-28 sm:mb-40 ">
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
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {selectedProject.title}
            </h2>
            <p className="text-sm">{selectedProject.description}</p>
            {/* You can render more project info here */}
          </div>
        )}
      </BottomDrawer>
    </section>
  );
}
