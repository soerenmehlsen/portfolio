import { links } from './data';

export type SectionName = (typeof links)[number]['hash'];

export type ProjectInfo = {
    title: string;
    description: string;
    techStack: string[];
    imageUrl?: string;
    github: string;
    live: string;
}

export type Link = {
    nameEng: string;
    hash: string;
}

export type VerticalElementType = {
    title: string;
    description: string;
    location: string;
    date: string;
    icon: React.FunctionComponentElement<any>;
};