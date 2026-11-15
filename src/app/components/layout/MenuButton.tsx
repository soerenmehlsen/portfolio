"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { links, socials } from "@/app/lib/data";
import { analyticsEvents } from "@/app/lib/analytics";
import { useLenis } from "@/app/components/motion/SmoothScroll";

export default function MenuButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [open, lenis]);

  const shown = visible || open;

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`fixed right-5 top-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sand text-ink transition-all duration-300 hover:scale-105 ${
          shown ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
        }`}
      >
        <span className="relative block h-3 w-6">
          <span
            className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${
              open ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-night px-6 pb-10 pt-28 text-sand md:px-10"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          >
            <nav aria-label="Menu" className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.hash}
                  href={link.hash}
                  onClick={() => setOpen(false)}
                  className="text-5xl font-medium tracking-tight transition-opacity duration-200 hover:opacity-60 md:text-7xl"
                >
                  {link.nameEng}
                </a>
              ))}
            </nav>
            <div className="flex gap-6 font-mono text-xs uppercase tracking-wide text-bone">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    analyticsEvents.trackSocialClick({
                      platform: social.name.toLowerCase(),
                      section: "menu",
                    })
                  }
                  className="transition-opacity duration-200 hover:opacity-60"
                >
                  {social.name} ↗
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
