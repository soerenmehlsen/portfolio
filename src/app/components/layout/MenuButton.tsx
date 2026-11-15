"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { links, socials } from "@/app/lib/data";
import { analyticsEvents } from "@/app/lib/analytics";

let displayTransitionsSupported: boolean | undefined;

function supportsTopLayerExit() {
  if (
    !CSS.supports("overlay", "auto") ||
    !CSS.supports("transition-behavior", "allow-discrete")
  )
    return false;
  if (displayTransitionsSupported !== undefined)
    return displayTransitionsSupported;
  // Some browsers parse allow-discrete without actually transitioning display.
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;width:0;height:0;pointer-events:none;transition:display 1s allow-discrete!important;display:block";
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = "none";
  displayTransitionsSupported = getComputedStyle(probe).display === "block";
  probe.remove();
  return displayTransitionsSupported;
}

export default function MenuButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const closingRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setOpen(true);
  };
  const closeMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return Promise.resolve();
    if (closingRef.current) return closingRef.current;
    if (supportsTopLayerExit()) {
      dialog.close();
      return Promise.resolve();
    }
    // Keep the native modal open until the exit finishes in Safari/Firefox.
    dialog.setAttribute("data-closing", "");
    const animations = dialog.getAnimations({ subtree: true });
    const finish = async () => {
      let timeout: ReturnType<typeof setTimeout> | undefined;
      try {
        await Promise.race([
          Promise.allSettled(animations.map((animation) => animation.finished)),
          new Promise<void>((resolve) => {
            timeout = setTimeout(resolve, 1000);
          }),
        ]);
        if (dialog.hasAttribute("data-closing")) {
          dialog.close();
          dialog.removeAttribute("data-closing");
        }
      } finally {
        clearTimeout(timeout);
        closingRef.current = null;
      }
    };
    closingRef.current = finish();
    return closingRef.current;
  };

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
        onClose={() => setOpen(!!dialogRef.current?.open)}
        onCancel={(event) => {
          if (!supportsTopLayerExit()) {
            event.preventDefault();
            void closeMenu();
          }
        }}
        data-lenis-prevent
        className="menu-dialog fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-night p-0 text-sand"
      >
        <form
          method="dialog"
          onSubmit={(event) => {
            event.preventDefault();
            void closeMenu();
          }}
          className="absolute top-5 right-5 z-10"
        >
          <button
            type="submit"
            autoFocus
            aria-label="Close menu"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-sand/30 bg-ink text-sand motion-safe:transition-transform motion-safe:hover:scale-105"
          >
            <span aria-hidden className="relative block h-6 w-6">
              <span className="menu-close-line-first absolute top-3 left-0 h-px w-6 bg-current" />
              <span className="menu-close-line-last absolute top-3 left-0 h-px w-6 bg-current" />
            </span>
          </button>
        </form>
        <div className="flex min-h-full flex-col justify-between gap-10 bg-night px-6 pt-28 pb-10 md:px-10">
          <nav aria-label="Menu" className="flex flex-col gap-2">
            {links.map((link, index) => (
              <a
                key={link.hash}
                href={link.hash}
                onClick={closeMenu}
                style={{ "--menu-index": index } as CSSProperties}
                className="menu-link text-5xl font-medium tracking-tight md:text-7xl"
              >
                {link.nameEng}
              </a>
            ))}
          </nav>
          <div className="menu-socials flex gap-6 font-mono text-xs tracking-wide text-bone uppercase">
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
        </div>
      </dialog>
    </>
  );
}
