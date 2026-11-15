"use client";

import { useEffect, useRef, useState } from "react";
import { createInterfaceAudio } from "@/app/lib/interface-audio";

type Playback = "idle" | "loading" | "playing" | "error";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef(0);
  const requestRef = useRef(0);
  const clickAudioRef = useRef<ReturnType<typeof createInterfaceAudio>>(null);
  const soundEnabledRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [playback, setPlayback] = useState<Playback>("idle");

  useEffect(() => {
    setMounted(true);
    const clickFeedback = (event: MouseEvent) => {
      if (
        !event.isTrusted ||
        !soundEnabledRef.current ||
        !(event.target instanceof Element)
      )
        return;
      const target = event.target.closest('button, a[href], [role="button"]');
      if (
        !target ||
        target.matches(':disabled, [aria-disabled="true"], [data-no-sound]')
      )
        return;
      clickAudioRef.current?.click();
    };
    const pauseWhenHidden = () => {
      if (!document.hidden) return;
      requestRef.current++;
      soundEnabledRef.current = false;
      clickAudioRef.current?.suspend();
      cancelAnimationFrame(fadeRef.current);
      audioRef.current?.pause();
      setPlayback("idle");
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    // Native click covers mouse, touch, Enter and Space without duplicate sounds.
    document.addEventListener("click", clickFeedback, true);
    return () => {
      requestRef.current++;
      cancelAnimationFrame(fadeRef.current);
      audioRef.current?.pause();
      soundEnabledRef.current = false;
      clickAudioRef.current?.close();
      clickAudioRef.current = null;
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      document.removeEventListener("click", clickFeedback, true);
    };
  }, []);

  const fadeVolume = (target: number, duration: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelAnimationFrame(fadeRef.current);
    const from = audio.volume,
      start = performance.now();
    const step = (now: number) => {
      const progress = Math.max(0, Math.min(1, (now - start) / duration));
      audio.volume = from + (target - from) * progress;
      if (progress < 1) fadeRef.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++requestRef.current;
    if (playback === "playing" || playback === "loading") {
      soundEnabledRef.current = false;
      clickAudioRef.current?.suspend();
      setPlayback("idle");
      if (playback === "loading") {
        cancelAnimationFrame(fadeRef.current);
        audio.pause();
      } else fadeVolume(0, 300, () => audio.pause());
      return;
    }
    cancelAnimationFrame(fadeRef.current);
    // No src at all before an explicit click: no media request on page load.
    if (!audio.getAttribute("src"))
      audio.src = "/audio/mizmo-hello-the-sun-from-47s.m4a";
    clickAudioRef.current ??= createInterfaceAudio();
    clickAudioRef.current?.resume();
    if (playback === "error") audio.load();
    audio.volume = 0;
    setPlayback("loading");
    try {
      await audio.play();
      if (request !== requestRef.current) return;
      setPlayback("playing");
      soundEnabledRef.current = true;
      fadeVolume(0.2, 900);
    } catch {
      if (request === requestRef.current) {
        soundEnabledRef.current = false;
        clickAudioRef.current?.suspend();
        setPlayback("error");
      }
    }
  };

  if (!mounted) return null;
  const playing = playback === "playing";
  const label =
    playback === "loading"
      ? "Loading"
      : playback === "error"
        ? "Retry sound"
        : playing
          ? "Sound on"
          : "Sound off";

  return (
    <div className="ambient-controls">
      <audio
        ref={audioRef}
        loop
        preload="none"
        aria-hidden="true"
        onPause={() => {
          if (audioRef.current?.paused) {
            soundEnabledRef.current = false;
            clickAudioRef.current?.suspend();
          }
          setPlayback((current) =>
            current === "error" || !audioRef.current?.paused ? current : "idle"
          );
        }}
        onError={() => {
          requestRef.current++;
          soundEnabledRef.current = false;
          clickAudioRef.current?.suspend();
          cancelAnimationFrame(fadeRef.current);
          setPlayback("error");
        }}
      />
      <button
        type="button"
        className="ambient-button"
        aria-label="Site sound"
        aria-pressed={playing}
        aria-busy={playback === "loading"}
        title={`${playing ? "Pause" : "Play"} Mizmo — Hello, The Sun Is Up, Where Are You? (from 00:47)`}
        data-playing={playing}
        onClick={() => void toggle()}
      >
        <span aria-hidden="true" className="ambient-levels">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="ambient-level" />
          ))}
        </span>
        <span className="hidden md:inline">{label}</span>
      </button>
      <span className="sr-only" role="status">
        {playback === "error"
          ? "Music could not start. Press the sound button to try again."
          : ""}
      </span>
    </div>
  );
}
