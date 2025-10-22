import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { type Post, urlFor } from "@/lib/sanity"
import { calculateReadingTime } from "@/lib/reading-time"

interface FeaturedBlogCardProps {
  post: Post
  theme: "tech" | "books"
}

export function FeaturedBlogCard({ post, theme }: FeaturedBlogCardProps) {
  const readingTime = calculateReadingTime(post.content || [])
  const href = theme === "tech" ? `/tech/${post.slug.current}` : `/books/${post.slug.current}`

  const themeClasses = {
    tech: {
      gradient: "from-blue-600 via-cyan-500 to-blue-700",
      accentColor: "text-cyan-500",
      accentBg: "bg-cyan-500",
      borderColor: "border-cyan-500/30",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      buttonBg: "bg-cyan-500 hover:bg-cyan-600",
    },
    books: {
      gradient: "from-amber-600 via-orange-500 to-amber-700",
      accentColor: "text-amber-500",
      accentBg: "bg-amber-500",
      borderColor: "border-amber-500/30",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      buttonBg: "bg-amber-500 hover:bg-amber-600",
    },
  }

  const colors = themeClasses[theme]

  return (
    <Link href={href}>
      <div
        className={`group relative overflow-hidden rounded-2xl border ${colors.borderColor} bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-opacity-100 cursor-pointer`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-between">
            {/* Featured Badge */}
            <div>
              <Badge className={`${colors.badgeBg} border mb-6`}>Featured Post</Badge>

              {/* Title */}
              <h2
                className={`text-3xl lg:text-4xl font-bold mb-4 text-balance leading-tight bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
              >
                {post.title}
              </h2>

              {/* Subtitle */}
              <p className="text-muted-foreground text-lg mb-6 line-clamp-2">{post.excerpt}</p>

              {/* Category Badge */}
              <div className="mb-6">
                <Badge className={colors.badgeBg}>{post.category.subcategory}</Badge>
              </div>
            </div>

            {/* Meta Info and CTA */}
            <div className="space-y-6">
              {/* Date and Reading Time */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {readingTime} min read
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`${colors.buttonBg} text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-all duration-300 group-hover:gap-3 w-fit`}
              >
                Read Featured Post
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 lg:h-auto overflow-hidden">
            {post.featuredImage && (
              <Image
                src={urlFor(post.featuredImage).width(600).height(500).url() || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/20" />
          </div>
        </div>
      </div>
    </Link>
  )
}
