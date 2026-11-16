"use client";

import { useEffect, useRef, useState } from "react";

export default function ProjectCounter({ count }: { count: number }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = rail.current?.closest(".project-list");
    if (!list) return;
    const cards = [...list.querySelectorAll<HTMLElement>(".project-item")];
    const desktop = matchMedia("(min-width: 768px)");
    let observer: IntersectionObserver | undefined;
    let lastY = scrollY;

    const update = () => {
      const threshold = innerHeight * (scrollY < lastY ? 0.33 : 0.2);
      lastY = scrollY;
      let current = 0;
      cards.forEach((card, i) => {
        if (card.getBoundingClientRect().top <= threshold + 1) current = i;
      });
      setActive(current);
    };

    const observe = () => {
      observer?.disconnect();
      if (!desktop.matches) return;
      update();
      // Watch the same 20–33% activation band in both scroll directions.
      // Pixel margins are intentional: IntersectionObserver percentages use width.
      observer = new IntersectionObserver(update, {
        rootMargin: `-${innerHeight * 0.2}px 0px -${innerHeight * 0.67}px 0px`,
        threshold: 0,
      });
      cards.forEach((card) => observer!.observe(card));
    };

    list.classList.add("project-counter-ready");
    observe();
    window.addEventListener("resize", observe);
    desktop.addEventListener("change", observe);
    return () => {
      observer?.disconnect();
      list.classList.remove("project-counter-ready");
      window.removeEventListener("resize", observe);
      desktop.removeEventListener("change", observe);
    };
  }, []);

  const number = String(active + 1).padStart(2, "0");

  return (
    <div ref={rail} className="project-counter-rail" aria-hidden="true">
      <div className="project-counter tracking-tighter text-olive">
        <span>{number.slice(0, -1)}</span>
        <div className="project-counter-window">
          <div
            className="project-counter-track"
            style={{ transform: `translateY(${-active * 0.8}em)` }}
          >
            {Array.from({ length: count }, (_, i) => (
              <span key={i}>{(i + 1) % 10}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
