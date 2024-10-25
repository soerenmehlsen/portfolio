import { Link, ProjectInfo } from "@/app/lib/types";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import React from "react";
import {
  FaReact,
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaGitAlt,
  FaDocker,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiPostman,
  SiAzuredevops,
  SiKotlin,
  SiDotnet,
  SiMicrosoftsqlserver,
} from "react-icons/si";
import { GoCopilot } from "react-icons/go";
import { AiOutlineOpenAI } from "react-icons/ai";

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
];

export const projectsData: ProjectInfo[] = [
  {
    title: "DeepDR",
    description:
      "DeepDR is a program trained with deep learning model to detect diabetic retinopathy in retinal fundus images.",
    techStack: ["Matlab"],
    imageUrl: "/DeepDR.png",
    imageGifUrl: "/DeepDR.gif",
    github: "https://github.com/soerenmehlsen/DeepDR",
    live: "https://github.com/soerenmehlsen/DeepDR",
  },
  {
    title: "Recreation of Facebook start page",
    description: "Designed a prototype of Facebook's start page using Play 2.0",
    techStack: ["UI/UX", "Play 2.0"],
    imageUrl: "/FacebookPage.png",
    imageGifUrl: "/FacebookPage.png",
    github: "",
    live: "https://appclip.apple.com/id?p=com.createwithplay.playgen3.Clip&pid=3d744091ab4680YaGwx&e=0",
  },
  {
    title: "Upcoming Project",
    description: "Stay tuned for my upcoming project!",
    techStack: ["React", "TypeScript", "TailwindCSS"],
    imageUrl: "/upcoming-project.png",
    github: "https://github.com",
    live: "https://github.com/soerenmehlsen/DeepDR",
  },
];

export const skillsData = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: FaReact },
      { name: "CSS", icon: FaCss3Alt },
      { name: "HTML", icon: FaHtml5 },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: FaJs },
      { name: "WPF", icon: SiDotnet },
      { name: "Kotlin", icon: SiKotlin },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "C#", icon: SiDotnet },
      { name: ".NET Core", icon: SiDotnet },
      { name: "MSSQL", icon: SiMicrosoftsqlserver },
      { name: "MongoDB", icon: SiMongodb },
      { name: "REST API", icon: FaNodeJs },
      { name: "EF Core", icon: SiDotnet },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub", icon: FaGithub },
      { name: "Postman", icon: SiPostman },
      { name: "Docker", icon: FaDocker },
      { name: "Azure", icon: SiAzuredevops },
    ],
  },
  {
    title: "AI",
    skills: [
      { name: "Copilot", icon: GoCopilot },
      { name: "ChatGPT", icon: AiOutlineOpenAI },
    ],
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
