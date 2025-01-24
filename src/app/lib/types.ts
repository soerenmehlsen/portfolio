import { links } from "./data";
import React from "react";
import { IconType } from "react-icons";

export type SectionName = (typeof links)[number]["hash"];

export type ProjectInfo = {
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  imageGifUrl?: string;
  github: string;
  live: string;
};

export type Link = {
  nameEng: string;
  hash: string;
};

export type VerticalElementType = {
  title: string;
  description: string;
  location: string;
  date: string;
  icon: React.ReactElement<IconType>;
};
