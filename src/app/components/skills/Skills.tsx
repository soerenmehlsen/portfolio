import RevealHeading from "@/app/components/motion/RevealHeading";
import { certificiateData, skillsData } from "@/app/lib/data";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 -mt-6 scroll-mt-12 rounded-t-3xl bg-sand px-6 pb-24 pt-20 text-ink md:px-10 md:pb-40 md:pt-32"
    >
      <p className="font-mono text-xs uppercase tracking-wide text-stone">
        (STACK)
      </p>
      <RevealHeading
        text="SKILLS /"
        className="mt-6 text-[clamp(2.5rem,9vw,8rem)] font-medium uppercase leading-[0.95] tracking-tighter"
      />
      <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {skillsData.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-xs uppercase tracking-wide text-stone">
              {group.title}
            </h3>
            <ul className="mt-4 border-t border-ink/15">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center gap-3 border-b border-ink/15 py-3 text-lg font-medium tracking-tight"
                >
                  <skill.icon className="text-xl" aria-hidden="true" />
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ul className="mt-16 border-t border-ink/15 md:mt-24">
        {certificiateData.map((certificate) => (
          <li
            key={certificate.title}
            className="flex flex-col gap-3 border-b border-ink/15 py-6 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                {certificate.title}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-stone">
                {certificate.issuer}
              </p>
            </div>
            <a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View certificate: ${certificate.title}`}
              className="font-mono text-xs uppercase tracking-wide underline-offset-4 transition-colors duration-200 hover:text-stone hover:underline"
            >
              VIEW ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
