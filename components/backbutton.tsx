"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
    theme?: "tech" | "books"
    label?: string
}

const themeColors = {
    tech: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    books: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
}

export function BackButton({ theme = "tech", label = "Back" }: BackButtonProps) {
    const router = useRouter()

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className={`
                relative overflow-hidden backdrop-blur-sm
                bg-gradient-to-r ${themeColors[theme]}
                hover:scale-105 transition-all duration-300
                group
            `}
        >
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                     -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
            <ArrowLeft className="w-4 h-4 mr-2" />
            {label}
        </Button>
    )
}

export default BackButton