import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Post, urlFor } from "@/lib/sanity"
import { Calendar, ArrowRight } from "lucide-react"

interface PostCardProps {
  post: Post
  theme?: "tech" | "books"
}

export default function PostCard({ post, theme = "tech" }: PostCardProps) {
  const themeClass = theme === "tech" ? "tech-theme" : "books-theme"

  return (
    <Card
      className={`group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ${themeClass} relative overflow-hidden backdrop-blur-sm border-opacity-20`}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme === "tech" ? "bg-gradient-to-br from-tech-primary/5 to-tech-secondary/5" : "bg-gradient-to-br from-books-primary/5 to-books-secondary/5"}`}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-20 animate-float ${theme === "tech" ? "bg-tech-primary" : "bg-books-primary"}`}
        />
        <div
          className={`absolute top-1/2 -left-1 w-2 h-2 rounded-full opacity-30 animate-float-delayed ${theme === "tech" ? "bg-tech-secondary" : "bg-books-secondary"}`}
        />
      </div>

      <Link href={`/${theme}/${post.slug.current}`}>
        <CardHeader className="p-0 relative z-10">
          {post.featuredImage && (
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image
                src={urlFor(post.featuredImage).width(400).height(225).url() || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="secondary"
              className={`text-xs border transition-colors duration-300 ${
                theme === "tech"
                  ? "bg-tech-primary/10 text-tech-primary border-tech-primary/20 group-hover:border-tech-primary/40"
                  : "bg-books-primary/10 text-books-primary border-books-primary/20 group-hover:border-books-primary/40"
              }`}
            >
              {post.category.subcategory}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(post._createdAt).toLocaleDateString()}
            </div>
          </div>

          <h3
            className={`font-semibold text-lg mb-2 text-balance transition-all duration-300 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent ${
              theme === "tech"
                ? "group-hover:from-tech-primary group-hover:to-tech-secondary"
                : "group-hover:from-books-primary group-hover:to-books-secondary"
            }`}
          >
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed text-pretty mb-6">{post.excerpt}</p>
        </CardContent>
      </Link>

        <div className="px-6 pb-6 relative z-10">
          <Link href={`/${theme}/${post.slug.current}`}>
            <button
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 w-fit ${
            theme === "tech"
              ? "bg-tech-primary/10 text-tech-primary hover:bg-tech-primary/20 hover:text-white"
              : "bg-books-primary/10 text-books-primary hover:bg-books-primary/20 hover:text-white"
          }`}
            >
          Read Blog
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>


      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </Card>
  )
}

export { PostCard }
