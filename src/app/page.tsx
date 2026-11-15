import Hero from "@/app/components/home/Hero";
import TopBar from "@/app/components/layout/TopBar";

// Temporary placeholder section; real sections are built in later tasks.
export default function Home() {
  return (
    <main>
      <TopBar />
      <Hero />
      <section id="experience" className="relative z-10 min-h-screen rounded-t-3xl bg-night" />
    </main>
  );
}
