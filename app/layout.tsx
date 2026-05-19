import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NXL Digital — Digital Audience Engine",
    template: "%s | NXL Digital",
  },
  description:
    "NXL Digital is a Manila-based growth and strategy collective helping businesses build audience advantage through strategic clarity, creative execution, and structured growth systems.",
  keywords: [
    "digital strategy",
    "audience growth",
    "brand positioning",
    "content systems",
    "SEO",
    "digital marketing",
    "growth strategy",
    "NXL Digital",
    "Manila",
  ],
  authors: [{ name: "NXL Digital", url: "https://www.nxldigital.com" }],
  creator: "NXL Digital",
  publisher: "NXL Digital",
  metadataBase: new URL("https://www.nxldigital.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nxldigital.com",
    title: "NXL Digital — Digital Audience Engine",
    description:
      "A strategic operating system for visibility, trust, and measurable business impact. Don't be an option, be the preference.",
    siteName: "NXL Digital",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "NXL Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NXL Digital — Digital Audience Engine",
    description:
      "A strategic operating system for visibility, trust, and measurable business impact.",
    images: ["/logo.webp"],
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
  icons: {
    icon: [{ url: "/favcon.png", type: "image/png" }],
    apple: [{ url: "/favcon.png", type: "image/png" }],
    shortcut: "/favcon.png",
  },
  alternates: {
    canonical: "https://www.nxldigital.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#08091C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#08091C] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
