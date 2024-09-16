import Hero from "@/app/components/Hero";
import React from "react";
import About from "@/app/components/about";

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-20 md:pt-28 px-4">
      <Hero/>
        <About/>
    </main>
  );
}
