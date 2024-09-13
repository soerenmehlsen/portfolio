import Image from "next/image";
import Hero from "@/app/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-20 md:pt-28 px-4">
      <Hero/>
    </main>
  );
}
