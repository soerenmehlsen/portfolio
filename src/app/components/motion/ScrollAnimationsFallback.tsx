"use client";

import { useEffect } from "react";

const nativeScrollSupport =
  "(animation-timeline: view()) and (animation-range: entry) and (animation-timeline: scroll(root block)) and (view-timeline-inset: 40% 15%)";
const clamp = (value: number) => Math.min(1, Math.max(0, value));

// Match Framer Motion's layout offsets, excluding visual transforms and hover.
function layoutTop(element: HTMLElement) {
  let top = 0;
  for (
    let node: HTMLElement | null = element;
    node;
    node = node.offsetParent as HTMLElement | null
  ) {
    top += node.offsetTop;
  }
  return top;
}

/** Older browsers retain the effects; native browsers attach no scroll listener here. */
export default function ScrollAnimationsFallback() {
  useEffect(() => {
    if (CSS.supports(nativeScrollSupport)) return;
    const preference = matchMedia("(prefers-reduced-motion: no-preference)");
    let stop: (() => void) | undefined;
    const sync = () => {
      stop?.();
      stop = undefined;
      if (!preference.matches) return;
      const hero = document.querySelector<HTMLElement>(".hero-scroll");
      const paragraphs = [
        ...document.querySelectorAll<HTMLElement>(".scroll-words"),
      ];
      const images = [
        ...document.querySelectorAll<HTMLElement>(".project-visual"),
      ];
      const affected = [
        hero,
        ...document.querySelectorAll<HTMLElement>(
          ".scroll-word, .project-scroll-image"
        ),
      ].filter((element): element is HTMLElement => !!element);
      document.documentElement.classList.add("scroll-animation-fallback");
      let frame = 0;

      const update = () => {
        frame = 0;
        const y = window.scrollY;
        const height = window.innerHeight;
        // Read geometry before applying any visual styles.
        const words = paragraphs.map((element) => ({
          words: [...element.querySelectorAll<HTMLElement>(".scroll-word")],
          progress: clamp(
            (y - layoutTop(element) + height * 0.85) /
              (element.offsetHeight + height * 0.45)
          ),
        }));
        const pictures = images.map((element) => ({
          image: element.querySelector<HTMLElement>(".project-scroll-image"),
          progress: clamp(
            (y - layoutTop(element) + height) / (element.offsetHeight + height)
          ),
        }));
        if (hero) {
          const progress = clamp(y / (height * 0.6));
          hero.style.opacity = String(1 - progress);
          hero.style.transform = `translateY(${progress * 42}px) scale(${1 - progress * 0.05})`;
        }
        words.forEach(({ words, progress }) =>
          words.forEach((word, i) => {
            word.style.opacity = String(
              0.2 + 0.8 * clamp(progress * words.length - i)
            );
          })
        );
        pictures.forEach(({ image, progress }) => {
          if (image)
            image.style.transform = `scale(${1.08 - 0.08 * clamp(progress * 2)})`;
        });
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      const observer = new ResizeObserver(schedule);
      observer.observe(document.body);
      paragraphs.forEach((element) => observer.observe(element));
      images.forEach((element) => observer.observe(element));
      stop = () => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        observer.disconnect();
        cancelAnimationFrame(frame);
        affected.forEach((element) => {
          element.style.removeProperty("opacity");
          element.style.removeProperty("transform");
        });
        document.documentElement.classList.remove("scroll-animation-fallback");
      };
    };
    sync();
    preference.addEventListener("change", sync);
    return () => {
      preference.removeEventListener("change", sync);
      stop?.();
    };
  }, []);
  return null;
}
