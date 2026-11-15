"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";

export type SceneState = "loading" | "ready" | "fallback";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
  onStateChange: (state: SceneState) => void;
};

export default function HeroSculpture({ sectionRef, onStateChange }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SceneState>("loading");
  const gradientId = useId();

  useEffect(() => {
    const host = hostRef.current;
    const section = sectionRef.current;
    if (!host || !section) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    const fallback = () => {
      if (cancelled) return;
      section.style.removeProperty("--scene-progress");
      setState("fallback");
      onStateChange("fallback");
    };
    // Load the renderer separately from the page's text and navigation.
    void import("./hero-scene")
      .then(({ createHeroScene }) => {
        if (cancelled) return;
        try {
          dispose = createHeroScene(host, section, fallback);
          setState("ready");
          onStateChange("ready");
        } catch {
          fallback();
        }
      })
      .catch(fallback);
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [sectionRef, onStateChange]);

  return (
    <div
      ref={hostRef}
      className="hero-sculpture"
      data-rendered={state === "ready"}
      aria-hidden="true"
    >
      <div className="hero-sculpture-shadow" />
      <svg
        className="hero-sculpture-fallback"
        viewBox="0 0 500 500"
        fill="none"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="110"
            y1="80"
            x2="390"
            y2="410"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#e8e8e3" />
            <stop offset="0.2" stopColor="#8c8c73" />
            <stop offset="0.43" stopColor="#d1d1c7" />
            <stop offset="0.67" stopColor="#4f5046" />
            <stop offset="0.85" stopColor="#b4b49f" />
            <stop offset="1" stopColor="#6b645c" />
          </linearGradient>
        </defs>
        {[0, 60, 120].map((angle) => (
          <ellipse
            key={angle}
            cx="250"
            cy="235"
            rx="145"
            ry="72"
            stroke={`url(#${gradientId})`}
            strokeWidth="46"
            transform={`rotate(${angle} 250 235)`}
          />
        ))}
      </svg>
    </div>
  );
}
