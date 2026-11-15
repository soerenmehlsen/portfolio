"use client";

import { motion } from "framer-motion";
import { INTRO_START } from "@/app/components/motion/intro";
import { links } from "@/app/lib/data";
import { useIntroSequence } from "@/app/components/motion/IntroSequence";

export default function TopBar() {
  const { started } = useIntroSequence();
  return (
    <motion.header
      className="hero-in absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 font-mono text-xs tracking-wide text-ink uppercase md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: started ? 1 : 0 }}
      transition={{ duration: 0.5, delay: INTRO_START + 0.2, ease: "easeIn" }}
    >
      <span>Full-Stack Developer</span>
      <nav aria-label="Primary" className="hidden gap-8 md:flex">
        {links
          .filter((link) => link.hash !== "#home")
          .map((link) => (
            <a
              key={link.hash}
              href={link.hash}
              className="transition-opacity duration-200 hover:opacity-60"
            >
              {link.nameEng}
            </a>
          ))}
      </nav>
    </motion.header>
  );
}
