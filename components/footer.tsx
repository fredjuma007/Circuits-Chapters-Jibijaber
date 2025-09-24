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
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C&C</span>
              </div>
              <span className="font-bold text-xl text-balance">Circuits & Chapters</span>
            </Link>
            <p className="text-muted-foreground mb-6 text-pretty">
              Where Tech Sparks Meet Story Pages. Exploring the intersection of technology and literature.
            </p>

            {/* Newsletter Signup */}
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tech" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tech
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-muted-foreground hover:text-foreground transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <a href="#" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="#" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Circuits & Chapters Jibijaber. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
