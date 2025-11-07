import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"
import ScrollUpButton from "@/components/scrollup"
import ComingSoonWrapper from "@/components/coming-soon-wrapper"

export const metadata: Metadata = {
  metadataBase: new URL("https://circuits-chapters.vercel.app"),
  title: {
    default: "Circuits & Chapters Jibijaber",
    template: "%s | Circuits & Chapters",
  },
  description:
    "Where Tech Sparks Meet Story Pages — a blog exploring technology, books, and storytelling through an innovative lens.",
  generator: "Next.js",
  applicationName: "Circuits & Chapters Jibijaber",
  authors: [{ name: "Fred Juma", url: "https://jumaportfolio.netlify.app/" }],
  keywords: [
    "Tech Blog",
    "Book Reviews",
    "Technology",
    "Programming",
    "Literature",
    "Reading Culture",
    "Digital Storytelling",
    "Book Lovers",
    "Tech Enthusiasts",
    "Book Blog",
    "Software Development",
    "Fiction and Non-Fiction",
    "Tech Trends",
    "Creative Writing",
    "Book Recommendations",
    "Coding Tutorials",
    "Tech News",
    "Author Interviews",
    "Literary Analysis",
    "Innovation in Tech",
    "Tech and Books",
  ],
  openGraph: {
    title: "Circuits & Chapters Jibijaber",
    description:
      "Where Tech Sparks Meet Story Pages — connecting literature and technology in creative ways.",
    url: "https://circuits-chapters.vercel.app",
    siteName: "Circuits & Chapters",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/Circuits%20&%20Chapters%20logo.png",
        width: 1200,
        height: 630,
        alt: "Circuits & Chapters — Tech Meets Storytelling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Circuits & Chapters Jibijaber",
    description:
      "Where Tech Sparks Meet Story Pages — dive into thought-provoking reads on books, tech, and creativity.",
    creator: "@fredjuma",
    images: ["/Circuits%20&%20Chapters%20logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://circuits-chapters.vercel.app",
  },
  icons: {
    icon: "/Circuits%20&%20Chapters%20logo.png",
    apple: "/Circuits%20&%20Chapters%20logo.png",
  },
  category: "Technology & Books",
}

// themeColor for viewport meta tag
export const viewport: Viewport = {
  themeColor: "#0f172a",
}

export const revalidate = 0

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ComingSoonWrapper>{children}</ComingSoonWrapper>
          </ThemeProvider>
        </Suspense>
        <Analytics />
        <ScrollUpButton />
      </body>
    </html>
  )
}
