import RevealHeading from "@/app/components/motion/RevealHeading";
import ScrollWords from "@/app/components/motion/ScrollWords";
import { projectsData } from "@/app/lib/data";
import ProjectCard from "./Project-card";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 scroll-mt-12 bg-night px-6 pb-24 pt-20 text-bone md:px-10 md:pb-40 md:pt-32"
    >
      <p className="font-mono text-xs uppercase tracking-wide text-olive">
        (PROJECTS)
      </p>
      <RevealHeading
        text="SELECTED WORKS /"
        className="mt-6 text-[clamp(2.5rem,9vw,8rem)] font-medium uppercase leading-[0.95] tracking-tighter"
      />
      <ScrollWords
        text="A selection of things I have built, from side projects to tools used in practice."
        className="mt-10 max-w-3xl text-2xl font-medium leading-snug tracking-tight md:text-4xl"
      />
      <ul className="mt-12 border-t border-bone/20 md:mt-20">
        {projectsData.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </ul>
    </section>
  );
}
