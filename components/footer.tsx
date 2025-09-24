"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter signup logic would go here
    console.log("Newsletter signup:", email)
    setEmail("")
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
              <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-amber-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">C&C</span>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-amber-400/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
              </div>
              <span className="font-bold text-xl text-balance bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text group-hover:from-blue-500 group-hover:to-amber-500 transition-all duration-300">
                Circuits & Chapters
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 text-pretty">
              Where Tech Sparks Meet Story Pages. Exploring the intersection of technology and literature.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-amber-500 hover:from-blue-600 hover:to-amber-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Subscribe
              </Button>
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
                <a href="#" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-blue-400/10 hover:text-blue-400 hover:scale-110 transition-all duration-300"
              >
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-blue-600/10 hover:text-blue-600 hover:scale-110 transition-all duration-300"
              >
                <a href="#" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-amber-500/10 hover:text-amber-500 hover:scale-110 transition-all duration-300"
              >
                <a href="#" aria-label="Email">
                  <Mail className="h-4 w-4" />
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
