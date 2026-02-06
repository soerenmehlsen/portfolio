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
          <div className="site-background">
            <div className="site-bg-grid" />
            <div className="site-bg-noise" />
          </div>
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
