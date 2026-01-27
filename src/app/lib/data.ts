import { Link, ProjectInfo } from "@/app/lib/types";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import { PiCertificate } from "react-icons/pi";
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
  SiKotlin,
  SiDotnet,
} from "react-icons/si";
import { GoCopilot } from "react-icons/go";
import { AiOutlineOpenAI } from "react-icons/ai";
import { VscAzure } from "react-icons/vsc";
import { DiMsqlServer } from "react-icons/di";

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
    nameEng: "Certificates",
    hash: "#certificates",
  },
  {
    nameEng: "Experience",
    hash: "#experience",
  },
];

export const projectsData: ProjectInfo[] = [
  {
    title: "What's in my food",
    description:
      "Helps users to find out how processed their food is and understand the ingredients with the help of AI.",
    techStack: ["Next.Js", "TypeScript", "TailwindCSS", "Supabase"],
    imageUrl: "/WhatsInMyFood.png",
    imageGifUrl: "/WhatsInMyFood.png",
    github: "https://github.com/soerenmehlsen/whatsInMyFood",
    live: "https://whatsinmyfood.info/",
  },
  {
    title: "DeepDR",
    description:
      "DeepDR is a program trained with deep learning model to detect diabetic retinopathy in retinal fundus images.",
    techStack: ["Matlab"],
    imageUrl: "/DeepDR.gif",
    imageGifUrl: "/DeepDR.gif",
    github: "https://github.com/soerenmehlsen/DeepDR",
    live: "https://github.com/soerenmehlsen/DeepDR",
  },
  {
    title: "Recreation of Facebook",
    description: "Designed a prototype of Facebook's start page using Play 2.0",
    techStack: ["UI/UX", "Play 2.0"],
    imageUrl: "/FacebookPage.png",
    imageGifUrl: "/FacebookPage.png",
    github: "",
    live: "https://appclip.apple.com/id?p=com.createwithplay.playgen3.Clip&pid=3d744091ab4680YaGwx&e=0",
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
      { name: "MSSQL", icon: DiMsqlServer },
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
      { name: "Azure", icon: VscAzure },
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

export const certificiateData = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    imageUrl: "/AzureFundementals.png",
    link: "https://learn.microsoft.com/api/credentials/share/da-dk/SorenMehlsen-6634/F7E22F82ACE518C4?sharingId=6D778FB19966C3A0"
  }
]

export const experiencesData = [
    {
    title: "Microsoft Certified: Azure Fundamentals",
    location: "Microsoft",
    description:
      "Achieved the Microsoft Azure Fundamentals (AZ-900) certification, demonstrating foundational knowledge of cloud services and how Microsoft Azure provides these services.",
    icon: React.createElement(PiCertificate),
    date: "jun 2025",
  },
  {
    title: "Graduated Health Technology Engineer",
    location: "Aarhus University, DK",
    description:
      "Throuhout my studies, I took various software courses to learn more about software development",
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
