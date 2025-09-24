import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { client, type Post, urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import { Calendar, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import PostCard from "@/components/post-card"

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

interface BooksPostPageProps {
  params: { slug: string }
}

export default async function BooksPostPage({ params }: BooksPostPageProps) {
  const { slug } = params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.category._id, post._id)

  return (
    <div className="min-h-screen books-theme">
      <Navigation />

      <main className="pt-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/books">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Books
            </Link>
          </Button>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
              <Image
                src={urlFor(post.featuredImage).width(800).height(450).url() || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">{post.category.subcategory}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post._createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">{post.title}</h1>

            <p className="text-xl text-muted-foreground text-pretty">{post.excerpt}</p>
          </header>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none">{post.content && <PortableText value={post.content} />}</div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-12 text-balance">Related Book Posts</h2>
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

export async function generateStaticParams() {
  try {
    const query = `
      *[_type == "post" && category->type == "books"] {
        slug
      }
    `

    const posts = await client.fetch(query)
    return (
      posts?.map((post: { slug: { current: string } }) => ({
        slug: post.slug.current,
      })) || []
    )
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}
