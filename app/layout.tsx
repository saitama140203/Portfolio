import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Le The Phu - AI Engineer Portfolio",
  description: "AI Engineer specializing in Computer Vision, Deep Learning, and MLOps. Building production-grade authentication systems and intelligent monitoring platforms.",
  metadataBase: new URL("https://ltp-portfolio.vercel.app"),
  openGraph: {
    title: "Le The Phu - AI Engineer",
    description: "AI Engineer specializing in Computer Vision, Deep Learning, and MLOps. Building production-grade systems with PyTorch, YOLO, and FastAPI.",
    url: "https://ltp-portfolio.vercel.app",
    siteName: "LTP.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Le The Phu - AI Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le The Phu - AI Engineer",
    description: "AI Engineer specializing in Computer Vision, Deep Learning, and MLOps.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
