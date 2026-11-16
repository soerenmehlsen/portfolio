import RevealHeading from "@/app/components/motion/RevealHeading";
import { certificiateData, skillsData } from "@/app/lib/data";
import type { CSSProperties } from "react";

export default function Skills() {
  return (
    <section
      id="skills"
      className="skills-section relative z-10 scroll-mt-12 rounded-t-3xl bg-sand px-6 pt-20 pb-24 text-ink md:px-10 md:pt-32 md:pb-40"
    >
      <p className="font-mono text-xs tracking-wide text-stone uppercase">
        (STACK)
      </p>
      <RevealHeading
        text="SKILLS /"
        className="mt-6 text-[clamp(2.5rem,9vw,8rem)] leading-[0.95] font-medium tracking-tighter uppercase"
      />
      <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {skillsData.map((group, index) => (
          <div
            key={group.title}
            className="skills-group"
            style={{ "--skills-index": index } as CSSProperties}
          >
            <div className="skills-group-reveal">
              <h3 className="font-mono text-xs tracking-wide text-stone uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 border-t border-ink/15">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="scroll-divider-bottom relative flex items-center gap-3 border-b border-ink/15 py-3 text-lg font-medium tracking-tight"
                  >
                    <skill.icon className="text-xl" aria-hidden="true" />
                    {skill.name}
                    <span aria-hidden="true" className="scroll-divider-line" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-16 border-t border-ink/15 md:mt-24">
        {certificiateData.map((certificate) => (
          <li
            key={certificate.title}
            className="certificate-entry scroll-divider-bottom relative border-b border-ink/15 py-6"
          >
            <div className="certificate-reveal flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                  {certificate.title}
                </h3>
                <p className="mt-1 font-mono text-xs tracking-wide text-stone uppercase">
                  {certificate.issuer}
                </p>
              </div>
              <a
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View certificate: ${certificate.title}`}
                className="font-mono text-xs tracking-wide uppercase underline-offset-4 transition-colors duration-200 hover:text-stone hover:underline"
              >
                VIEW ↗
              </a>
            </div>
            <span aria-hidden="true" className="scroll-divider-line" />
          </li>
        ))}
      </ul>
    </section>
  );
}
