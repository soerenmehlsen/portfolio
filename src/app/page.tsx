import RevealHeading from "@/app/components/motion/RevealHeading";
import ScrollWords from "@/app/components/motion/ScrollWords";

// Temporary placeholder; sections are built in later tasks.
export default function Home() {
  return (
    <main>
      <section id="home" className="flex min-h-screen items-center px-6">
        <RevealHeading
          as="h1"
          text="Søren Mehlsen, full-stack developer"
          className="text-6xl font-medium tracking-tight md:text-8xl"
        />
      </section>
      <section id="about" className="flex min-h-[150vh] items-center px-6">
        <ScrollWords
          text="I design and build thoughtful web products, from the first sketch to the final deploy, with a taste for clear structure and quiet motion."
          className="max-w-4xl text-3xl font-medium tracking-tight md:text-5xl"
        />
      </section>
    </main>
  );
}
