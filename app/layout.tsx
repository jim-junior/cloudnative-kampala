import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title:
    "Cloud Native Kampala | Advancing the Cloud Native Ecosystem in Uganda",
  description:
    "Join the Cloud Native Kampala community and connect with cloud native enthusiasts, developers, and DevOps professionals in Uganda. Learn Kubernetes, Docker, and more through workshops, meetups, and networking events.",
  keywords: [
    "CNCF",
    "Cloud Native Computing Foundation",
    "Kampala",
    "Uganda",
    "Kubernetes",
    "Docker",
    "DevOps",
    "Cloud Native",
    "Community",
    "Meetup",
    "Tech Events",
    "Container Orchestration",
    "Microservices",
    "Developer Community",
  ],
  authors: [{ name: "CNCF Kampala Community" }],
  creator: "Cloud Native Kampala",
  publisher: "Cloud Native Kampala",

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cncf.open.ug", // Update with your actual URL
    title:
      "Join Cloud Native Kampala | Cloud Native Computing Foundation Uganda",
    description:
      "Connect with fellow cloud native enthusiasts in Kampala. Learn Kubernetes, Docker, and DevOps through hands-on workshops, networking events, and community meetups.",
    siteName: "CNCF Kampala Community",
    images: [
      {
        url: "https://cncf.open.ug/cncg-icon-color.svg", // Update with your actual image URL
        width: 1200,
        height: 630,
        alt: "Cloud Native Kampala - Join the Cloud Native Revolution in Uganda",
        type: "image/svg",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Join CNCF Kampala Community",
    description:
      "Connect with cloud native enthusiasts in Kampala. Learn Kubernetes, Docker, and DevOps through workshops and meetups.",
    site: "@CNCFKampala", // Update with your actual Twitter handle
    creator: "@CNCFKampala",
    images: ["https://cncf.open.ug/cncg-icon-color.svg"], // Update with your actual image URL
  },

  // Additional metadata
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

  // Category for the page
  category: "Technology",

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",

  // Other metadata
  other: {
    "geo.region": "UG-C", // Uganda Central region code
    "geo.placename": "Kampala",
    "geo.position": "0.3476;32.5825", // Kampala coordinates
    ICBM: "0.3476, 32.5825",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CN1BGFYLHX"
        />
        <script>{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CN1BGFYLHX');
`}</script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
