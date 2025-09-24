"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShareButton } from "@/components/share-button"
import { client, type Post, urlFor } from "@/lib/sanity"
import { calculateReadingTime } from "@/lib/reading-time"
import { PortableText } from "@portabletext/react"
import { Calendar, ArrowLeft, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import PostCard from "@/components/post-card"
import { techPortableTextComponents } from "@/lib/portable-text-components"
import { useEffect, useState } from "react"

async function getPost(slug: string): Promise<Post | null> {
  try {
    const query = `
      *[_type == "post" && slug.current == $slug && category->type == "tech"][0] {
        _id,
        title,
        slug,
        category->{
          _id,
          name,
          type,
          subcategory,
          slug
        },
        featuredImage,
        excerpt,
        content,
        _createdAt
      }
    `

    return await client.fetch(query, { slug })
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

async function getRelatedPosts(categoryId: string, currentPostId: string): Promise<Post[]> {
  try {
    const query = `
      *[_type == "post" && category._ref == $categoryId && _id != $currentPostId] | order(_createdAt desc) [0...3] {
        _id,
        title,
        slug,
        category->{
          _id,
          name,
          type,
          subcategory,
          slug
        },
        featuredImage,
        excerpt,
        _createdAt
      }
    `

    const posts = await client.fetch(query, { categoryId, currentPostId })
    return posts || []
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}

interface TechPostPageProps {
  slug: string
}

export default function TechPostPageClient({ slug }: TechPostPageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [readingTime, setReadingTime] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const fetchedPost = await getPost(slug)
      if (!fetchedPost) {
        notFound()
      }
      setPost(fetchedPost)
      const fetchedRelatedPosts = await getRelatedPosts(fetchedPost.category._id, fetchedPost._id)
      setRelatedPosts(fetchedRelatedPosts)
      setReadingTime(calculateReadingTime(fetchedPost.content).toString())
      setLoading(false)
    }
    fetchData()
  }, [slug])

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Tech-themed floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping" />
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-500/50 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-300/30 rounded-full animate-ping" />
      </div>

      <Navigation />

      <main className="pt-16 relative z-10">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-600/5 border-b border-blue-500/10">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button variant="ghost" asChild className="mb-4 hover:bg-blue-500/10">
              <Link href="/tech">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tech
              </Link>
            </Button>

            {post.featuredImage && (
              <div className="relative aspect-video mb-6 overflow-hidden rounded-xl border border-blue-500/20 shadow-2xl">
                <Image
                  src={urlFor(post.featuredImage).width(800).height(450).url() || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30">
                  {post.category.subcategory}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post._createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {readingTime} min read
                  </div>
                </div>
                <ShareButton title={post.title} url={`/tech/${slug}`} theme="tech" />
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-balance bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                {post.title}
              </h1>

              <p className="text-base lg:text-lg text-muted-foreground text-pretty leading-relaxed">{post.excerpt}</p>
            </header>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative">
            {/* Subtle background pattern for reading comfort */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] via-transparent to-cyan-500/[0.02] rounded-2xl" />
            <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:32px_32px] rounded-2xl" />

            {/* Content container with enhanced styling */}
            <div className="relative bg-card/30 backdrop-blur-sm border border-blue-500/10 rounded-2xl p-6 lg:p-10 shadow-lg">
              <div
                className="prose prose-lg lg:prose-xl max-w-none
                           prose-headings:text-foreground prose-headings:font-semibold prose-headings:tracking-tight
                           prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-blue-300 prose-h2:border-b prose-h2:border-blue-500/20 prose-h2:pb-3
                           prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-cyan-300
                           prose-h4:text-lg prose-h4:lg:text-xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-blue-400
                           prose-p:text-muted-foreground prose-p:leading-[1.7] prose-p:mb-6 prose-p:text-base prose-p:lg:text-lg
                           prose-strong:text-foreground prose-strong:font-semibold
                           prose-em:text-cyan-300 prose-em:font-medium
                           prose-a:text-blue-400 prose-a:font-medium prose-a:underline prose-a:decoration-blue-400/50 prose-a:underline-offset-4 hover:prose-a:text-blue-300 hover:prose-a:decoration-blue-300
                           prose-code:bg-slate-900/80 prose-code:text-cyan-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-blue-500/20
                           prose-pre:bg-slate-900/90 prose-pre:border prose-pre:border-blue-500/20 prose-pre:rounded-lg prose-pre:p-4 prose-pre:shadow-xl
                           prose-blockquote:border-l-4 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                           prose-blockquote:text-blue-200 prose-blockquote:font-medium prose-blockquote:italic
                           prose-ul:text-muted-foreground prose-ul:space-y-2 prose-ul:my-6
                           prose-ol:text-muted-foreground prose-ol:space-y-2 prose-ol:my-6
                           prose-li:text-base prose-li:leading-relaxed prose-li:pl-1
                           prose-li:marker:text-blue-400
                           prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-blue-500/20 prose-img:my-8
                           prose-table:border-collapse prose-table:border prose-table:border-blue-500/20 prose-table:rounded-lg prose-table:overflow-hidden
                           prose-th:bg-blue-500/10 prose-th:text-blue-300 prose-th:font-semibold prose-th:p-3 prose-th:border prose-th:border-blue-500/20
                           prose-td:p-3 prose-td:border prose-td:border-blue-500/10 prose-td:text-muted-foreground
                           prose-hr:border-blue-500/20 prose-hr:my-8"
              >
                <div>
                  {post.content && <PortableText value={post.content} components={techPortableTextComponents} />}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-blue-500/10 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-balance bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Related Tech Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost._id} post={relatedPost} theme="tech" />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
