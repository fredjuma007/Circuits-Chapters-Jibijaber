"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { ShareButton } from "@/components/share-button"
import { client, type Post, urlFor } from "@/lib/sanity"
import { calculateReadingTime } from "@/lib/reading-time"
import { PortableText } from "@portabletext/react"
import { Calendar, ArrowLeft, BookOpen } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import PostCard from "@/components/post-card"
import { booksPortableTextComponents } from "@/lib/portable-text-components"
import { useEffect, useState } from "react"
import {BackButton} from "@/components/backbutton"

async function getPost(slug: string): Promise<Post | null> {
  try {
    const query = `
      *[_type == "post" && slug.current == $slug && category->type == "books"][0] {
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

interface BooksPostPageClientProps {
  slug: string
}

export default function BooksPostPageClient({ slug }: BooksPostPageClientProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [readingTime, setReadingTime] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const fetchedPost = await getPost(slug)
        if (!fetchedPost) {
          notFound()
        }
        setPost(fetchedPost)
        const fetchedRelatedPosts = await getRelatedPosts(fetchedPost.category._id, fetchedPost._id)
        setRelatedPosts(fetchedRelatedPosts)
        setReadingTime(calculateReadingTime(fetchedPost.content))
      } catch (err: any) {
        console.error("Error fetching data:", err)
        setError("Failed to load post. Please try again later.")
        notFound()
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        {/* Books-themed floating elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-amber-500/30 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-orange-400/40 rounded-full animate-ping" />
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-amber-400/20 rounded-full animate-bounce" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-500/50 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-amber-300/30 rounded-full animate-ping" />
        </div>

        <div className="relative z-10 text-center">
          {/* Animated loading spinner with book theme */}
          <div className="relative mb-8">
            <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-orange-400 rounded-full animate-spin mx-auto"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            ></div>
          </div>

          {/* Loading text with gradient and serif font */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-serif bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500 bg-clip-text text-transparent">
              Loading Book Review
            </h2>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground font-serif">Preparing your literary journey...</p>
          </div>

          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-600/5 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  }

  if (!post) {
    return null
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Books-themed floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-500/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-orange-400/40 rounded-full animate-ping" />
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-amber-400/20 rounded-full animate-bounce" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-500/50 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-amber-300/30 rounded-full animate-ping" />
      </div>

      <Navigation />

      <main className="pt-16 relative z-10">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-amber-600/5 border-b border-amber-500/10">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <BackButton theme="books" label="Back to Books" />
            <div className="h-4" />

            {post.featuredImage && (
              <div className="relative aspect-video mb-6 overflow-hidden rounded-xl border border-amber-500/20 shadow-2xl">
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
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30">
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
                    <BookOpen className="w-4 h-4 mr-2" />
                    {readingTime} min read
                  </div>
                </div>
                <ShareButton title={post.title} url={`/books/${slug}`} theme="books" />
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-balance bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500 bg-clip-text text-transparent">
                {post.title}
              </h1>

              <p className="text-base lg:text-lg text-muted-foreground text-pretty leading-relaxed">{post.excerpt}</p>
            </header>
          </div>
        </div>

        {/* Article Content - Enhanced for comfortable reading */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] via-transparent to-orange-500/[0.02] rounded-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.01),transparent)] rounded-2xl" />

            <div className="relative bg-card/40 backdrop-blur-sm border border-amber-500/10 rounded-2xl p-6 lg:p-10 shadow-lg">
              <div
                className="prose prose-lg lg:prose-xl max-w-none font-serif
                           prose-headings:text-foreground prose-headings:font-semibold prose-headings:font-serif prose-headings:tracking-tight
                           prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-amber-300 prose-h2:border-b prose-h2:border-amber-500/20 prose-h2:pb-3
                           prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-orange-300
                           prose-h4:text-lg prose-h4:lg:text-xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-amber-400
                           prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-base prose-p:lg:text-lg prose-p:text-justify
                           prose-strong:text-foreground prose-strong:font-semibold prose-strong:font-serif
                           prose-em:text-orange-300 prose-em:font-medium prose-em:font-serif
                           prose-a:text-amber-400 prose-a:font-medium prose-a:underline prose-a:decoration-amber-400/50 prose-a:underline-offset-4 hover:prose-a:text-amber-300 hover:prose-a:decoration-amber-300
                           prose-code:bg-slate-900/80 prose-code:text-amber-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-amber-500/20
                           prose-pre:bg-slate-900/90 prose-pre:border prose-pre:border-amber-500/20 prose-pre:rounded-lg prose-pre:p-4 prose-pre:shadow-xl
                           prose-blockquote:border-l-4 prose-blockquote:border-l-amber-500 prose-blockquote:bg-amber-500/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                           prose-blockquote:text-amber-200 prose-blockquote:font-medium prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:text-lg
                           prose-ul:text-muted-foreground prose-ul:space-y-2 prose-ul:my-6 prose-ul:font-serif
                           prose-ol:text-muted-foreground prose-ol:space-y-2 prose-ol:my-6 prose-ol:font-serif
                           prose-li:text-base prose-li:leading-relaxed prose-li:pl-1 prose-li:font-serif
                           prose-li:marker:text-amber-400
                           prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-amber-500/20 prose-img:my-8
                           prose-table:border-collapse prose-table:border prose-table:border-amber-500/20 prose-table:rounded-lg prose-table:overflow-hidden
                           prose-th:bg-amber-500/10 prose-th:text-amber-300 prose-th:font-semibold prose-th:p-3 prose-th:border prose-th:border-amber-500/20 prose-th:font-serif
                           prose-td:p-3 prose-td:border prose-td:border-amber-500/10 prose-td:text-muted-foreground prose-td:font-serif
                           prose-hr:border-amber-500/20 prose-hr:my-8"
              >
                <div className="mb-6 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                  <div className="flex items-center justify-between text-sm text-amber-300">
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Reading Time: {readingTime} minutes
                    </span>
                    <span className="text-muted-foreground">
                      {[
                      "Grab a mug of tea ☕",
                      "Wrap yourself in a blanket 🧣",
                      "Light a scented candle 🕯️",
                      "Find a comfy chair 🛋️",
                      "Put on your favorite playlist 🎶",
                      "Snuggle up with your pet 🐾",
                      "Let the rain set the mood 🌧️",
                      "Enjoy a sweet treat 🍪",
                      "Dim the lights for ambiance 💡",
                      "Take a deep breath and relax 🌿"
                      ][Math.floor(Math.random() * 10)]}
                    </span>
                  </div>
                </div>

                {post.content && <PortableText value={post.content} components={booksPortableTextComponents} />}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-amber-500/10 bg-gradient-to-br from-amber-500/5 to-orange-500/5 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-balance bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent font-serif">
                Related Book Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost._id} post={relatedPost} theme="books" />
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
