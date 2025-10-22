import type { ReactNode } from "react"

interface MinimalistHeroProps {
  icon: ReactNode
  title: string
  subtitle: string
  theme: "tech" | "books"
}

export function MinimalistHero({ icon, title, subtitle, theme }: MinimalistHeroProps) {
  const themeClasses = {
    tech: {
      gradient: "from-blue-600 via-cyan-500 to-blue-700",
    },
    books: {
      gradient: "from-amber-600 via-orange-500 to-amber-700",
    },
  }

  const colors = themeClasses[theme]

  return (
    <section className="relative py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
          <div>
            <h1
              className={`text-3xl lg:text-4xl font-bold mb-1 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
            >
              {title}
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
