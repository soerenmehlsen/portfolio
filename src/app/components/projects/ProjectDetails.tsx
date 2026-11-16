"use client";

import { useId, useRef, useState } from "react";
import type { PointerEvent } from "react";
import ResponsiveImage from "@/app/components/ResponsiveImage";
import type assets from "@/app/lib/image-assets.json";
import type { ProjectInfo } from "@/app/lib/types";
import { analyticsEvents } from "@/app/lib/analytics";

function outside(event: PointerEvent<HTMLDialogElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  return (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
}

export default function ProjectDetails({
  project,
  index,
  src,
}: {
  project: ProjectInfo;
  index: number;
  src: keyof typeof assets;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pressedOutside = useRef(false);
  const [hasOpened, setHasOpened] = useState(false);
  const id = useId();
  const sections = [
    ["The challenge", project.details.challenge],
    ["My role", project.details.role],
    ["The approach", project.details.approach],
    ["The outcome", project.details.outcome],
  ];

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-controls={id}
        aria-label={`View ${project.title} project`}
        onClick={() => {
          setHasOpened(true);
          dialog.current?.showModal();
          if (dialog.current) dialog.current.scrollTop = 0;
        }}
        className="rounded-full border border-bone/40 px-5 py-3 font-mono text-xs tracking-wide text-sand uppercase transition-colors hover:bg-sand hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
      >
        View project <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialog}
        id={id}
        aria-labelledby={`${id}-title`}
        {...{ closedby: "any" }}
        data-lenis-prevent
        className="project-dialog"
        onPointerDown={(event) => {
          if (!("closedBy" in HTMLDialogElement.prototype))
            pressedOutside.current = outside(event);
        }}
        onPointerUp={(event) => {
          if (
            !("closedBy" in HTMLDialogElement.prototype) &&
            pressedOutside.current &&
            outside(event)
          )
            dialog.current?.close();
          pressedOutside.current = false;
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-ink/15 bg-sand px-6 py-3 md:px-10">
          <p className="font-mono text-xs tracking-wide text-stone uppercase">
            Project / {String(index + 1).padStart(2, "0")}
          </p>
          <form method="dialog">
            <button
              autoFocus
              type="submit"
              aria-label="Close project"
              className="flex min-h-11 items-center gap-3 rounded-full px-3 font-mono text-xs tracking-wide uppercase transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </form>
        </div>
        <div className="p-6 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="font-mono text-xs tracking-wide text-stone uppercase">
                {project.details.category}
              </p>
              <h2
                id={`${id}-title`}
                className="mt-4 text-4xl leading-[1.05] font-medium tracking-tight md:text-6xl"
              >
                {project.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
                {project.description}
              </p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink/5">
              {hasOpened && (
                <ResponsiveImage
                  src={src}
                  alt={`${project.title} preview`}
                  sizes="(min-width: 992px) 404px, (min-width: 768px) 44vw, calc(100vw - 4rem)"
                  className="object-cover"
                />
              )}
            </div>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {sections.map(([label, text], i) => (
              <section key={label} className="border-t border-ink/15 pt-5">
                <h3 className="font-mono text-xs tracking-wide text-stone uppercase">
                  <span aria-hidden="true" className="mr-3">
                    0{i + 1}
                  </span>
                  {label}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink/85">
                  {text}
                </p>
              </section>
            ))}
          </div>
          <div className="mt-10 border-t border-ink/15 pt-6">
            <p className="font-mono text-xs tracking-wide text-stone uppercase">
              Built with
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-ink/20 px-3 py-1 font-mono text-xs"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {project.live !== project.github && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink px-6 py-3 font-mono text-xs tracking-wide text-sand uppercase transition-colors hover:bg-stone"
                  onClick={() =>
                    analyticsEvents.trackDemoClick({
                      project: project.title,
                      section: "project-details",
                    })
                  }
                >
                  Visit live site <span aria-hidden="true">↗</span>
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 font-mono text-xs tracking-wide uppercase underline-offset-4 hover:underline"
                onClick={() =>
                  analyticsEvents.trackSocialClick({
                    platform: "github",
                    section: "project-details",
                  })
                }
              >
                View source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
