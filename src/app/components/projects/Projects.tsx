"use client";
import SectionHeading from "@/app/components/common/SectionHeading";
import { projectsData } from "@/app/lib/data";
import { useSectionInView } from "@/app/lib/useInView";
import ProjectCard from "./Project-card";
import BottomDrawer from "../layout/BottomDrawer";
import { useState } from "react";
import CloseButton from "../ui/CloseButton";
import { ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";

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
            {/* Action buttons */}
            <div className="flex gap-3 border-b px-4 py-4">
              <a
                href={selectedProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
              <a
                href={selectedProject.github}
                target=""
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FiGithub className="h-4 w-4" />
                View Code
              </a>
            </div>
          </div>
        )}
      </BottomDrawer>
    </section>
  );
}
