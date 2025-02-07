"use client";

import React from "react";
import SectionHeading from "@/app/components/common/SectionHeading";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/app/lib/data";
import { useSectionInView } from "@/app/lib/useInView";
import { VerticalElement } from "@/app/components/experience/VerticalElement";

export default function Experience() {
  const { ref } = useSectionInView("#experience", 0.1);
  return (
    <section
      id="experience"
      ref={ref}
      className="mb-28 scroll-mt-12 sm:scroll-mt-28 sm:mb-40"
    >
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="" className="dark:behind-elements">
        {experiencesData.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <VerticalElement
                title={item.title}
                description={item.description}
                location={item.location}
                date={item.date}
                icon={item.icon}
              />
            </React.Fragment>
          );
        })}
      </VerticalTimeline>
    </section>
  );
}
