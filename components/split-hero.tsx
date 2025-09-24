"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BookOpen } from "lucide-react"
import { useState } from "react"

export function SplitHero() {
  const [hoveredSide, setHoveredSide] = useState<"tech" | "books" | null>(null)

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      {/* Tech Side */}
      <div
        className={`flex-1 relative overflow-hidden transition-all duration-700 ease-out tech-theme ${
          hoveredSide === "tech" ? "lg:flex-[1.1]" : hoveredSide === "books" ? "lg:flex-[0.9]" : ""
        }`}
        onMouseEnter={() => setHoveredSide("tech")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-800/30" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 lg:p-16 text-center">
          <div className="mb-8">
            <Zap className="w-16 h-16 mx-auto mb-6 text-blue-500" />
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-balance">Tech</h2>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 text-pretty">Where innovation sparks</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-md">
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold mb-2">Gadgets & Devices</h3>
              <p className="text-sm text-muted-foreground">Latest tech reviews</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold mb-2">Apps & Tools</h3>
              <p className="text-sm text-muted-foreground">Productivity boosters</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold mb-2">Developer Resources</h3>
              <p className="text-sm text-muted-foreground">Coding insights</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold mb-2">Industry Trends</h3>
              <p className="text-sm text-muted-foreground">Future predictions</p>
            </div>
          </div>

          <Button asChild size="lg" className="group">
            <Link href="/tech">
              Explore Tech
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Books Side */}
      <div
        className={`flex-1 relative overflow-hidden transition-all duration-700 ease-out books-theme ${
          hoveredSide === "books" ? "lg:flex-[1.1]" : hoveredSide === "tech" ? "lg:flex-[0.9]" : ""
        }`}
        onMouseEnter={() => setHoveredSide("books")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-amber-800/30" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 lg:p-16 text-center">
          <div className="mb-8">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-amber-500" />
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 text-balance">Books</h2>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 text-pretty">Where stories come alive</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-md">
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold mb-2">Reviews</h3>
              <p className="text-sm text-muted-foreground">Honest opinions</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold mb-2">Recommendations</h3>
              <p className="text-sm text-muted-foreground">Curated lists</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold mb-2">Author Spotlights</h3>
              <p className="text-sm text-muted-foreground">Meet the writers</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold mb-2">Book vs. Screen</h3>
              <p className="text-sm text-muted-foreground">Adaptation analysis</p>
            </div>
          </div>

          <Button asChild size="lg" className="group">
            <Link href="/books">
              Explore Books
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
