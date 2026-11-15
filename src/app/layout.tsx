import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/app/containers/providers";
import Footer from "@/app/components/layout/Footer";
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
  description: "My personal portfolio",
  openGraph: {
    title: "Søren Mehlsen – Full-Stack Developer",
    description: "My personal portfolio",
    type: "website",
    url: "https://soerenmehlsen.me",
    siteName: "Søren's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Søren Mehlsen – Full-Stack Developer",
    description: "My personal portfolio",
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
          <Providers>
            {children}
            <GoogleAnalytics gaId="G-CJD54H1QRS" />
            <Footer />
          </Providers>
        </body>
      </PostHogProvider>
    </html>
  );
}
