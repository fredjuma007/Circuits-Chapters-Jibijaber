import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Post, urlFor } from "@/lib/sanity"
import { Calendar } from "lucide-react"

interface PostCardProps {
  post: Post
  theme?: "tech" | "books"
}

export default function PostCard({ post, theme = "tech" }: PostCardProps) {
  const themeClass = theme === "tech" ? "tech-theme" : "books-theme"

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${themeClass}`}>
      <Link href={`/${theme}/${post.slug.current}`}>
        <CardHeader className="p-0">
          {post.featuredImage && (
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <Image
                src={urlFor(post.featuredImage).width(400).height(225).url() || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {post.category.subcategory}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(post._createdAt).toLocaleDateString()}
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2 text-balance group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{post.excerpt}</p>
        </CardContent>
      </Link>
    </Card>
  )
}

export { PostCard }
