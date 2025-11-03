"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Zap, BookOpen, ArrowRight } from "lucide-react"

export default function ComingSoon() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: "blue" | "amber"
    }> = []

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? "blue" : "amber",
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)"
      ctx.lineWidth = 0.5

      const gridSize = 80
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

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        const color = particle.color === "blue" ? "59, 130, 246" : "217, 119, 6"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${particle.opacity})`
        ctx.fill()
      })

      particles.forEach((particle, index) => {
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              const color = particle.color === "blue" ? "59, 130, 246" : "217, 119, 6"
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(${color}, ${0.08 * (1 - distance / 150)})`
              ctx.lineWidth = 0.3
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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "Welcome to the community!")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Failed to subscribe. Please try again.")
      console.error("Newsletter signup error:", error)
    }

    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 4000)
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "multiply" }} />

      <div className="absolute top-10 left-5 w-12 h-12 border border-primary/20 rounded-lg rotate-12 animate-pulse" />
      <div
        className="absolute top-24 right-10 w-10 h-10 border border-amber-500/20 rounded-full animate-spin"
        style={{ animationDuration: "20s" }}
      />
      <div className="absolute bottom-32 left-5 w-8 h-8 bg-primary/10 rounded-lg rotate-45 animate-pulse" />
      <div className="absolute bottom-16 right-5 w-14 h-14 border border-amber-500/20 rounded-lg -rotate-12 animate-pulse" />

      <div className="relative z-10 max-w-2xl w-full px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-pulse">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
            <span className="text-xs font-medium text-primary">Where Innovation Meets Imagination</span>
          </div>

          <div className="space-y-2 mb-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              <span className="block bg-gradient-to-r from-primary via-primary to-blue-600 bg-clip-text text-transparent">
                CIRCUITS
              </span>
              <span className="block text-lg font-light text-muted-foreground">&</span>
              <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                CHAPTERS
              </span>
            </h1>

            <div className="flex items-center justify-center gap-3 text-sm md:text-base text-muted-foreground pt-2">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Tech Sparks</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Story Pages</span>
              </div>
            </div>
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            The ultimate blog platform where cutting-edge technology meets timeless storytelling.
          </p>
        </div>

        <div className="bg-background/40 backdrop-blur border border-border/50 rounded-xl p-6 md:p-8 mb-6 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">Be Among the First</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
            Get notified when we launch! Subscribe now to stay updated on our journey.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-sm"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap text-sm"
              >
                {status === "loading" ? "Subscribing..." : "Notify Me"}
                {status !== "loading" && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            {message && (
              <p
                className={`text-sm font-medium text-balance ${
                  status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-border/50">
            <div className="space-y-2 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/20 rounded-lg">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Tech Insights</h3>
              </div>
              <p className="text-xs text-muted-foreground">Deep dives into cutting-edge technologies</p>
            </div>
            <div className="space-y-2 p-3 rounded-lg bg-gradient-to-br from-amber-500/5 to-transparent">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-500/20 rounded-lg">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Book Reviews</h3>
              </div>
              <p className="text-xs text-muted-foreground">Thoughtful reviews of inspiring books</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
