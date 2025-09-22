import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn DSA - Master Data Structures & Algorithms with Interactive Learning",
  description: "Master Data Structures and Algorithms with comprehensive theory, dynamic visualizations, and hands-on simulations. Free interactive learning platform for students and professionals.",
  keywords: "data structures, algorithms, DSA, programming, computer science, coding, visualizations, simulations, learning, tutorial, interactive",
  authors: [{ name: "Learn DSA Team" }],
  creator: "Learn DSA",
  publisher: "Learn DSA",
  openGraph: {
    title: "Learn DSA - Master Data Structures & Algorithms",
    description: "Interactive platform to master DSA with theory, visualizations, and simulations",
    url: "https://learndsa.me",
    siteName: "Learn DSA",
    images: [
      {
        url: "https://learndsa.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "Learn DSA - Interactive Data Structures and Algorithms Learning Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn DSA - Master Data Structures & Algorithms",
    description: "Interactive platform to master DSA with theory, visualizations, and simulations",
    images: ["https://learndsa.me/twitter-image.png"],
    creator: "@learndsa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
