"use client"

import { useEffect, useState } from "react"

export function PageLoading() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide loading screen after a short delay to allow hydration
    const timer = setTimeout(() => setIsVisible(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex flex-col items-center gap-8">
        {/* Animated logo/icon */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-amber-500 opacity-20 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-lg bg-gradient-to-r from-blue-500 to-amber-500 flex items-center justify-center">
            <img 
              src="/Circuits & Chapters logo.png" 
              alt="Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-sm font-medium text-slate-300">Loading</p>
          <div className="flex gap-1 justify-center mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
