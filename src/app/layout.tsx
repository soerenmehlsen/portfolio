import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/app/containers/providers";
import Footer from "@/app/components/layout/Footer";
import MenuButton from "@/app/components/layout/MenuButton";
import Preloader from "@/app/components/motion/Preloader";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "@/app/providers";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Søren Mehlsen – Full-Stack Developer",
  description: "Portfolio of Søren Mehlsen – full-stack developer and health technology engineer based in Denmark.",
  openGraph: {
    title: "Søren Mehlsen – Full-Stack Developer",
    description: "Portfolio of Søren Mehlsen – full-stack developer and health technology engineer based in Denmark.",
    type: "website",
    url: "https://soerenmehlsen.me",
    siteName: "Søren's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Søren Mehlsen – Full-Stack Developer",
    description: "Portfolio of Søren Mehlsen – full-stack developer and health technology engineer based in Denmark.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PostHogProvider>
        <body
          className={`${interTight.variable} ${geistMono.variable} antialiased font-sans`}
        >
          <noscript>
            <style>{`.reveal-char{transform:none!important}.scroll-word{opacity:1!important}.hero-in{opacity:1!important;transform:none!important}.hero-clip{opacity:1!important;transform:none!important;clip-path:none!important}.preloader{display:none!important}`}</style>
          </noscript>
          <Preloader />
          <Providers>
            {children}
            <GoogleAnalytics gaId="G-CJD54H1QRS" />
            <MenuButton />
            <Footer />
          </Providers>
        </body>
      </PostHogProvider>
    </html>
  );
}
