import { Link, ProjectInfo, Social } from "@/app/lib/types";
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
import { SiClaude } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { DiMsqlServer } from "react-icons/di";

export const links: Link[] = [
  { nameEng: "Home", hash: "#home" },
  { nameEng: "Experience", hash: "#experience" },
  { nameEng: "Projects", hash: "#projects" },
  { nameEng: "Skills", hash: "#skills" },
  { nameEng: "About", hash: "#about" },
  { nameEng: "Contact", hash: "#contact" },
];

export const contactEmail = "soeren48@hotmail.com";

export const socials: Social[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/soerenmehlsen" },
  { name: "GitHub", href: "https://github.com/soerenmehlsen" },
];

export const projectsData: ProjectInfo[] = [
    {
    title: "Mit Budget",
    description:
      "A simple budgeting app to help manage personal finances and replace complicated Excel spreadsheets. ",
    techStack: ["Next.Js", "TypeScript", "TailwindCSS", "Supabase"],
    imageUrl: "/budget.png",
    imageGifUrl: "/budget.png",
    github: "https://github.com/soerenmehlsen/budget",
    live: "https://budget-vert-eight.vercel.app",
    details: {
      category: "Personal finance",
      challenge: "Keeping a personal budget in a spreadsheet can make everyday updates feel like work. The goal was to bring income, expenses and the budget overview into one accessible web app.",
      role: "I developed the project independently, from the interface to the application logic and data integration.",
      approach: "I built the application with Next.js and TypeScript, using Supabase for authentication and data storage. The interface is designed around a budget overview and dedicated flows for managing income and expenses.",
      outcome: "A working budgeting app where users can record income and expenses and follow their budget without maintaining a spreadsheet.",
    },
  },
  {
    title: "ApoStatus",
    description:
      "ApoStatus helps pharmacies to manage their inventory through structured stocktake sessions to reduce errors and improve efficiency.",
    techStack: ["Next.Js", "TypeScript", "TailwindCSS", "Azure SQL"],
    imageUrl: "/Apostatus.png",
    imageGifUrl: "/Apostatus.png",
    github: "https://github.com/soerenmehlsen/apostatus",
    live: "https://apostatus-a7bsbyggbcbzhvb5.germanywestcentral-01.azurewebsites.net/",
    details: {
      category: "Pharmacy operations",
      challenge: "A pharmacy stocktake involves product lists, physical locations and differences between expected and counted quantities. ApoStatus brings those steps into a structured workflow.",
      role: "I designed and developed the full-stack application independently, including the interface, stocktake workflow and database integration.",
      approach: "The workflow separates inventory uploads, stock counting and discrepancy review. Next.js and TypeScript connect the interface to Azure SQL through Prisma, while location-based sessions keep each stocktake organized.",
      outcome: "A web application where pharmacy staff can upload inventory, count stock across locations and review quantity and value discrepancies in one place.",
    },
  },
  {
    title: "What's in my food",
    description:
      "Helps users to easily understand the ingredients and the processing of their food with the help of AI.",
    techStack: ["Next.Js", "TypeScript", "TailwindCSS", "Gemini"],
    imageUrl: "/WhatsInMyFood.png",
    imageGifUrl: "/WhatsInMyFood.png",
    github: "https://github.com/soerenmehlsen/whatsInMyFood",
    live: "https://whatsinmyfood.info/",
    details: {
      category: "Food & AI",
      challenge: "Ingredient labels can be difficult to interpret. The goal was to make unfamiliar ingredients and processing levels easier to understand through a simple scanning flow.",
      role: "I developed the application independently, connecting the user interface, image input and AI-powered analysis.",
      approach: "I used Next.js and TypeScript for the application and Gemini for ingredient analysis. Users can photograph a label or scan a barcode, with product information retrieved from Open Food Facts.",
      outcome: "A mobile-friendly application that turns ingredient lists into readable explanations and processing classifications, with search and filtering to explore the results.",
    },
  },
  {
    title: "DeepDR",
    description:
      "DeepDR is a program trained with deep learning model to detect diabetic retinopathy in retinal fundus images.",
    techStack: ["Matlab"],
    imageUrl: "/DeepDR.png",
    imageGifUrl: "/DeepDR.gif",
    github: "https://github.com/soerenmehlsen/DeepDR",
    live: "https://github.com/soerenmehlsen/DeepDR",
    details: {
      category: "Health technology · Academic project",
      challenge: "Retinal images contain small visual features associated with diabetic retinopathy. This academic project explored how deep learning could segment those features and present the results in an accessible interface.",
      role: "I developed the MATLAB application independently as a final exam project, combining image analysis with an interactive graphical interface.",
      approach: "The application brings deep-learning segmentation into a MATLAB GUI. It displays detected lesion regions alongside quantitative results and includes tools for saving outputs and evaluating segmentation overlap.",
      outcome: "An academic prototype for inspecting retinal-image segmentation results. It demonstrates a connection between health technology, machine learning and interface development.",
    },
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
      { name: "Claude", icon: SiClaude },
    ],
  },
];

export const certificiateData = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    imageUrl: "/AzureFundementals.png",
    link: "https://learn.microsoft.com/api/credentials/share/da-dk/SorenMehlsen-6634/F7E22F82ACE518C4?sharingId=6D778FB19966C3A0"
  }
]

export const experiencesData = [
   {
    title: "Full-Stack Developer",
    location: "GEjSER ApS, DK",
    description:
      "I work with the development, optimization, and maintenance of internal business systems and integrations across the organization. My role includes building APIs, improving workflows, automating processes, and developing scalable solutions using modern web technologies and databases. I also contribute to technical strategy, AI initiatives, system  integrations, documentation, and the implementation of new digital solutions that improve efficiency and business operations.",
    icon: React.createElement(CgWorkAlt),
    date: "mar 2026",
  },
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
