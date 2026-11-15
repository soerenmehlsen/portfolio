import ScrollWords from "@/app/components/motion/ScrollWords";

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-12 bg-sand px-6 pb-32 pt-8 text-ink md:px-10 md:pb-40 md:pt-16"
    >
      <h2 className="font-mono text-xs uppercase tracking-wide text-stone">
        (ABOUT)
      </h2>
      <ScrollWords
        text="The thrill of solving a problem is what drives me."
        className="mt-6 max-w-5xl text-[clamp(2rem,6vw,5rem)] font-medium leading-[1.05] tracking-tighter"
      />
      <div className="mt-16 border-t border-ink/15 md:mt-24">
        <div className="grid gap-4 border-b border-ink/15 py-8 md:grid-cols-2 md:gap-10">
          <h3 className="font-mono text-xs uppercase tracking-wide text-stone">
            MY PASSION
          </h3>
          <p className="max-w-2xl text-lg leading-relaxed">
            After graduating with a bachelor&apos;s degree in{" "}
            <span className="font-medium">Health Technology Engineering</span>,
            I have focused on applying my skills to software development. My
            interest is working with{" "}
            <span className="font-medium">front-end development</span> in React
            and WPF, as well as{" "}
            <span className="font-medium">back-end systems</span> using .NET
            Core and Web APIs. My favorite part of developing software is
            finding solutions to complex challenges. The thrill I get of solving
            a problem is what drives me. My core stack includes{" "}
            <span className="font-medium">
              C# in .NET, React.JS, MongoDB, and MSSQL
            </span>
            , and I am continually trying to learn new skills.
          </p>
        </div>
        <div className="grid gap-4 border-b border-ink/15 py-8 md:grid-cols-2 md:gap-10">
          <h3 className="font-mono text-xs uppercase tracking-wide text-stone">
            PERSONAL PROFILE
          </h3>
          <p className="max-w-2xl text-lg leading-relaxed">
            <span className="font-medium">When I&apos;m not coding</span>, I
            enjoy staying active by playing padel, working out, and spending
            time with family and friends. I also have a strong interest for
            technology and love keeping up with the latest advancements in the
            field.
          </p>
        </div>
      </div>
    </section>
  );
}
