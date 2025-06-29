import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Providers from "@/app/containers/providers";
import Navbar from "@/app/components/layout/Navbar";
import ThemeSwitch from "@/app/components/layout/ThemeSwitch";
import Footer from "@/app/components/layout/Footer";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "@/app/providers";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My personal portfolio",
  openGraph: {
    title: "Portfolio",
    description: "My personal portfolio",
    type: "website",
    url: "https://soerenmehlsen.me",
    siteName: "Søren's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description: "My personal portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <PostHogProvider>
        <body
          className={`${sora.variable} antialiasing relative flex flex-col overscroll-x-auto bg-gray-50 font-Sora text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
        >
          {/* Gradient Background Color */}
          <div className="absolute right-[-11rem] top-[-6rem] z-[-10] h-[31.25rem] w-[31.25rem] flex-1 rounded-full bg-[#fbe2e3] blur-[10rem] dark:bg-[#946263] sm:w-[68.75rem]"></div>

          <div className="absolute left-[-35rem] top-[-1rem] z-[-10] h-[31.25rem] w-[50rem] flex-1 rounded-full bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
          <Providers>
            <Navbar />
            {children}
            <GoogleAnalytics gaId="G-CJD54H1QRS" />
            <ThemeSwitch />
            <Footer />
          </Providers>
        </body>
      </PostHogProvider>
    </html>
  );
}
