"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Facebook, Instagram } from "lucide-react"
import { SiX, SiGoodreads, SiTiktok } from "react-icons/si"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setEmail("")
      } else {
        setMessage(data.error || "Failed to subscribe")
      }
    } catch (error) {
      console.error("Newsletter signup error:", error)
      setMessage("Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-background via-muted/30 to-background border-t border-border/50 overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-xl animate-float" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-lg animate-float-delayed" />
        <div className="absolute bottom-8 left-1/3 w-20 h-20 bg-gradient-to-br from-blue-400/8 to-transparent rounded-full blur-xl animate-float-slow" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.05)_25px,rgba(255,255,255,0.05)_26px,transparent_27px,transparent_74px,rgba(255,255,255,0.05)_75px,rgba(255,255,255,0.05)_76px,transparent_77px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:75px_75px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
                <img
                src="/Circuits&Chapterslogo.png"
                alt="Circuits & Chapters logo"
                className="w-8 h-8 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
                width={32}
                height={32}
                loading="lazy"
                />
              <span className="font-bold text-xl text-balance bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text group-hover:from-blue-500 group-hover:to-amber-500 transition-all duration-300">
                Circuits & Chapters
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 text-pretty">
              Subscribe to our newsletter for the latest tech insights and book related updates.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-sm">
              <div className="flex gap-2 mb-2">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-500 to-amber-500 hover:from-blue-600 hover:to-amber-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              {message && (
                <p
                  className={`text-sm mt-2 ${message.includes("Successfully") || message.includes("already subscribed") ? "text-green-600" : "text-red-600"}`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tech"
                  className="text-muted-foreground hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Tech
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-muted-foreground hover:text-amber-500 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Connect
            </h3>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-blue-500/10 hover:text-blue-500 hover:scale-110 transition-all duration-300"
              >
                <a href="https://github.com/fredjuma007" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-black/10 hover:text-black dark:hover:bg-white/10 dark:hover:text-white hover:scale-110 transition-all duration-300"
              >
                <a href="http://x.com/Fredjuma8Rennox" aria-label="X" target="_blank" rel="noopener noreferrer">
                  <SiX className="h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-blue-600/10 hover:text-blue-600 hover:scale-110 transition-all duration-300"
              >
                <a
                  href="https://www.facebook.com/rennox.morrison/"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-pink-500/10 hover:text-pink-500 hover:scale-110 transition-all duration-300"
              >
                <a
                  href="https://www.instagram.com/fred_peterz/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-amber-600/10 hover:text-amber-600 hover:scale-110 transition-all duration-300"
              >
                <a
                  href="https://www.goodreads.com/user/show/120096874-fred"
                  aria-label="Goodreads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGoodreads className="h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-black/10 hover:text-black dark:hover:bg-white/10 dark:hover:text-white hover:scale-110 transition-all duration-300"
              >
                <a href="hhttps://www.tiktok.com/@fred_peters" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                  <SiTiktok className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-8 text-center text-muted-foreground relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          <p>&copy; 2025 Circuits & Chapters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
