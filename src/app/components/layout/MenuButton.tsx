"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { links, socials } from "@/app/lib/data";
import { analyticsEvents } from "@/app/lib/analytics";

export default function MenuButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  const shown = visible || open;

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-haspopup="dialog"
        onClick={openMenu}
        className={`fixed top-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-sand/30 bg-ink text-sand transition-all duration-300 hover:scale-105 ${
          shown
            ? "scale-100 opacity-100"
            : "md:pointer-events-none md:invisible md:scale-75 md:opacity-0"
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

      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        data-lenis-prevent
        className="menu-dialog fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-night p-0 text-sand"
      >
        <form method="dialog" className="absolute top-5 right-5 z-10">
          <button
            type="submit"
            autoFocus
            aria-label="Close menu"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-sand/30 bg-ink text-sand motion-safe:transition-transform motion-safe:hover:scale-105"
          >
            <span aria-hidden className="relative block h-6 w-6">
              <span className="absolute top-3 left-0 h-px w-6 rotate-45 bg-current" />
              <span className="absolute top-3 left-0 h-px w-6 -rotate-45 bg-current" />
            </span>
          </button>
        </form>
        {open && (
          <motion.div
            className="flex min-h-full flex-col justify-between gap-10 bg-night px-6 pt-28 pb-10 md:px-10"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.77, 0, 0.175, 1],
            }}
          >
            <nav aria-label="Menu" className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.hash}
                  href={link.hash}
                  onClick={closeMenu}
                  className="text-5xl font-medium tracking-tight transition-opacity duration-200 hover:opacity-60 md:text-7xl"
                >
                  {link.nameEng}
                </a>
              ))}
            </nav>
            <div className="flex gap-6 font-mono text-xs tracking-wide text-bone uppercase">
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
      </dialog>
    </>
  );
}
