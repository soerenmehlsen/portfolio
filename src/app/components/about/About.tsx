import ScrollWords from "@/app/components/motion/ScrollWords";
import ResponsiveImage from "@/app/components/ResponsiveImage";

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-12 bg-sand px-6 pt-8 pb-32 text-ink md:px-10 md:pt-16 md:pb-40"
    >
      <h2 className="font-mono text-xs tracking-wide text-stone uppercase">
        (ABOUT)
      </h2>
      <ScrollWords
        text="The thrill of solving a problem is what drives me."
        className="mt-6 max-w-5xl text-[clamp(2rem,6vw,5rem)] leading-[1.05] font-medium tracking-tighter"
      />
      <div className="about-content mt-16 border-t border-ink/15 pt-8 md:mt-24 md:pt-10">
        <div className="about-layout">
          <figure className="about-portrait-entry">
            <div className="about-portrait-reveal">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
                <ResponsiveImage
                  src="/profilbillede.png"
                  alt="Portrait of Søren Mehlsen"
                  sizes="(min-width: 1280px) 448px, (min-width: 912px) 40vw, (min-width: 768px) 448px, calc(100vw - 3rem)"
                  className="about-portrait-image object-cover object-[50%_35%]"
                />
              </div>
            </div>
          </figure>
          <div className="about-copy">
            <div className="border-b border-ink/15 pb-8">
              <h3 className="font-mono text-xs tracking-wide text-stone uppercase">
                FROM HEALTH TECH TO SOFTWARE
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed">
                I&apos;m a full-stack developer with a bachelor&apos;s degree in{" "}
                <span className="font-medium">
                  Health Technology Engineering
                </span>
                . I&apos;ve taken that interest in practical problem-solving
                into software, building web applications and internal business
                systems. I work across the stack with .NET and React, with a
                focus on understanding the problem and making the solution easy
                to use.
              </p>
            </div>
            <div className="border-b border-ink/15 py-8">
              <h3 className="font-mono text-xs tracking-wide text-stone uppercase">
                OUTSIDE OF CODE
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed">
                Away from the screen, you&apos;ll usually find me playing padel,
                working out or spending time with family and friends. I&apos;m
                curious about technology and enjoy exploring new tools and
                ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
