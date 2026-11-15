import Experience from "@/app/components/experience/Experience";
import Hero from "@/app/components/home/Hero";
import Projects from "@/app/components/projects/Projects";
import Skills from "@/app/components/skills/Skills";
import About from "@/app/components/about/About";
import TopBar from "@/app/components/layout/TopBar";

export default function Home() {
  return (
    <main>
      <TopBar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <About />
    </main>
  );
}
