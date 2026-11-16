import RevealHeading from "@/app/components/motion/RevealHeading";
import ScrollWords from "@/app/components/motion/ScrollWords";
import { projectsData } from "@/app/lib/data";
import ProjectCard from "./Project-card";
import ProjectCounter from "./ProjectCounter";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 scroll-mt-12 bg-night px-6 pt-20 pb-24 text-bone md:px-10 md:pt-32 md:pb-40"
    >
      <p className="font-mono text-xs tracking-wide text-olive uppercase">
        (PROJECTS)
      </p>
      <RevealHeading
        text="SELECTED WORKS /"
        className="mt-6 text-[clamp(2.5rem,9vw,8rem)] leading-[0.95] font-medium tracking-tighter uppercase"
      />
      <ScrollWords
        text="A selection of things I have built, from side projects to tools used in practice."
        className="mt-10 max-w-3xl text-2xl leading-snug font-medium tracking-tight md:text-4xl"
      />
      <div className="project-list relative mt-12 md:mt-20">
        <ProjectCounter count={projectsData.length} />
        <ul className="border-t border-bone/20">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
