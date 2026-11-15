import Experience from "@/app/components/experience/Experience";
import Hero from "@/app/components/home/Hero";
import Projects from "@/app/components/projects/Projects";
import TopBar from "@/app/components/layout/TopBar";

// Later sections are added in subsequent tasks.
export default function Home() {
  return (
    <main>
      <TopBar />
      <Hero />
      <Experience />
      <Projects />
    </main>
  );
}
