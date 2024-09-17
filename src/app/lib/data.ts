import {Link, ProjectInfo} from "@/app/lib/types";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import React from "react";

export const links: Link[] = [
    {
        nameEng: "Home",
        hash: "#home",
    },
    {
        nameEng: "About",
        hash: "#about",
    },
    {
        nameEng: "Projects",
        hash: "#projects",
    },
    {
        nameEng: "Skills",
        hash: "#skills",
    },
    {
        nameEng: "Experience",
        hash: "#experience",
    },
    {
        nameEng: "Contact",
        hash: "#contact",
    },
];

export const projectsData: ProjectInfo[] = [
    {
        title: "Project 1",
        description: "Description 1",
        techStack: ["React", "TypeScript", "TailwindCSS"],
        imageUrl: "/upcoming-project.png",
        github: "https://github.com",
        live: "https://live.com",
    },
    {
        title: "Project 2",
        description: "Description 2",
        techStack: ["React", "TypeScript", "TailwindCSS"],
        imageUrl: "/upcoming-project.png",
        github: "https://github.com",
        live: "https://live.com",
    },
];

export const skillsData = [
    {
        title: "Frontend",
        skills: [
            "React",
            "Next.js",
            "TailwindCSS",
            "Framer Motion",
            "TypeScript",
            "JavaScript",
            "WPF",
        ],
    },
    {
        title: "Backend",
        skills: ["C#", ".NET Core", "MSSQL", "MongoDB", "REST API"],
    },
    {
        title: "Others",
        skills: ["Git", "GitHub", "Copilot", "Docker", "Azure"],
    },
];

export const experiencesData = [
    {
        title: "Graduated Health Technology Engineer",
        location: "Aarhus University, DK",
        description:
            "Throuhout my studies, I took various software courses to learn about software development",
        icon: React.createElement(LuGraduationCap),
        date: "2020-2024",
    },
    {
        title: "Engineering intern",
        location: "Teknologi i Praksis, DK",
        description:
            "I was responsible for designing and 3D printing assistive devices. Gained experience in user involvement, technical presentations, and innovative problem-solving, with several solutions showcased in exhibitions.",
        icon: React.createElement(CgWorkAlt),
        date: "2023 - 2023",
    },
    {
        title: "Sales assistant",
        location: "Elgiganten A/S, DK",
        description:
            "Handled electronics sales, provided customer advice and technical support, and assisted with IT setup and troubleshooting.",
        icon: React.createElement(CgWorkAlt),
        date: "2017 - 2023",
    },
] as const;