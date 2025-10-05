import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ClientLayout } from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://learndsa.me' : 'http://localhost:3000'),
  title: "Learn DSA - Master Data Structures & Algorithms with Interactive Learning",
  description: "Master Data Structures and Algorithms with comprehensive theory, dynamic visualizations, and hands-on simulations. Free interactive learning platform for students and professionals.",
  keywords: "data structures, algorithms, DSA, programming, computer science, coding, visualizations, simulations, learning, tutorial, interactive",
  authors: [{ name: "Learn DSA Team" }],
  creator: "Learn DSA",
  publisher: "Learn DSA",
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/favicon.ico',
      }
    ]
  },
  openGraph: {
    title: "Learn DSA - Master Data Structures & Algorithms",
    description: "Interactive platform to master DSA with theory, visualizations, and simulations",
    url: "https://learndsa.me",
    siteName: "Learn DSA",
    images: [
      {
        url: "/logos/main-logo.png",
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
    images: ["/logos/main-logo.png"],
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LearnDSA" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Script+MT+Bold&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <AuthContextProvider>
          <ThemeProvider>
            <ClientLayout>
              <Navigation />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </ClientLayout>
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
