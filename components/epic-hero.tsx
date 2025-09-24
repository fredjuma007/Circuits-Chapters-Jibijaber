"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Zap, BookOpen } from "lucide-react"

export function EpicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle system for tech side
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw wireframe grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1

      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw and update particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "multiply" }} />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-pulse">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
          <span className="text-sm font-medium text-primary">Where Innovation Meets Imagination</span>
        </div>

        {/* Main Title with Epic Typography */}
        <div className="space-y-4 mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter">
            <span className="block bg-gradient-to-r from-primary via-primary to-blue-600 bg-clip-text text-transparent animate-pulse">
              CIRCUITS
            </span>
            <span className="block text-2xl md:text-4xl lg:text-5xl font-light text-muted-foreground mt-2">&</span>
            <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent animate-pulse">
              CHAPTERS
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 text-lg md:text-xl text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary animate-pulse" />
              <span>Tech Sparks</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500 animate-pulse" />
              <span>Story Pages</span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Jibijaber - Where cutting-edge technology meets timeless storytelling. Explore the intersection of innovation
          and imagination.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/tech" tabIndex={-1}>
            <Button
              size="lg"
              className="group px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Explore Tech
              <Zap className="ml-2 w-5 h-5 group-hover:animate-pulse" />
            </Button>
          </a>

          <a href="/books" tabIndex={-1}>
            <Button
              size="lg"
              variant="outline"
              className="group px-8 py-4 text-lg font-semibold border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Discover Books
              <BookOpen className="ml-2 w-5 h-5 group-hover:animate-pulse" />
            </Button>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg rotate-12 animate-pulse" />
      <div
        className="absolute top-40 right-20 w-16 h-16 border border-amber-500/20 rounded-full animate-spin"
        style={{ animationDuration: "20s" }}
      />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/10 rounded-lg rotate-45 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-amber-500/20 rounded-lg -rotate-12 animate-pulse" />
    </div>
  )
}
