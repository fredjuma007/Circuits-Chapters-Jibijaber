"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react"
import { useState } from "react"

interface ShareButtonProps {
  title: string
  url: string
  theme?: "tech" | "books"
}

export function ShareButton({ title, url, theme = "tech" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : url
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const themeColors = {
    tech: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    books: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`
            relative overflow-hidden backdrop-blur-sm
            bg-gradient-to-r ${themeColors[theme]}
            hover:scale-105 transition-all duration-300
            group
          `}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                         translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
          />
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => window.open(shareLinks.twitter, "_blank")}>
          <Twitter className="w-4 h-4 mr-2" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(shareLinks.facebook, "_blank")}>
          <Facebook className="w-4 h-4 mr-2" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(shareLinks.linkedin, "_blank")}>
          <Linkedin className="w-4 h-4 mr-2" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard}>
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? "Copied!" : "Copy Link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
