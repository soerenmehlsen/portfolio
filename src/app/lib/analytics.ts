import { sendGAEvent } from "@next/third-parties/google";

interface SocialClickParams {
  platform: string;
  section?: string;
}

interface ContactClickParams {
  type: string;
  section?: string;
}

interface DemoClickParams {
  project: string;
  section?: string;
}

export const analyticsEvents = {
  trackSocialClick: ({ platform, section = "unknown" }: SocialClickParams) => {
    sendGAEvent({
      event: "social_click",
      platform,
      section,
    });
  },

  trackContactClick: ({ type, section = "unknown" }: ContactClickParams) => {
    sendGAEvent({
      event: "contact_click",
      type,
      section,
    });
  },

  trackDemoClick: ({ project, section = "unknown" }: DemoClickParams) => {
    sendGAEvent({
      event: "demo_click",
      project,
      section,
    });
  },
};
