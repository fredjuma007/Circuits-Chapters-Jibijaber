import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"
import ScrollUpButton from "@/components/scrollup"
import ComingSoonWrapper from "@/components/coming-soon-wrapper"

export const metadata: Metadata = {
  title: "Circuits & Chapters Jibijaber",
  description: "Where Tech Sparks Meet Story Pages - A blog exploring technology and literature",
  generator: "Next.js",
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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ComingSoonWrapper>{children}</ComingSoonWrapper>
          </ThemeProvider>
        </Suspense>
        <Analytics />
        <ScrollUpButton />
      </body>
    </html>
  )
}
