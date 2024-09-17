"use client";
import SectionHeading from "@/app/components/section-heading";
import { projectsData } from "@/app/lib/data";
import Project from "@/app/components/project-card";
import { useSectionInView } from "@/app/lib/useInView";

export default function Projects() {
    const { ref } = useSectionInView("#projects", 0.1)
    return (
        <section id="projects" ref={ref} className="scroll-mt-28 mb-28">
            <SectionHeading>
                My Projects
            </SectionHeading>

            <div>
                {
                    projectsData.map((project, index) => (
                        <Project {...project} key={index} />
                    ))
                }
            </div>
        </section>
    )
}
