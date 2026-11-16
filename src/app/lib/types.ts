export type Social = {
  name: "LinkedIn" | "GitHub";
  href: string;
};

export type ProjectInfo = {
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  imageGifUrl?: string;
  github: string;
  live: string;
  details: {
    category: string;
    challenge: string;
    role: string;
    approach: string;
    outcome: string;
  };
};

export type Link = {
  nameEng: string;
  hash: string;
};
