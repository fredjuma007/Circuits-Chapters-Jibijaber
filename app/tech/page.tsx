"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import PostCard from "@/components/post-card"
import { client, type Post, type Category } from "@/lib/sanity"
import { Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { FeaturedBlogCard } from "@/components/featured-blog-card"
import { MinimalistHero } from "@/components/minimalist-hero"

export default function TechPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all posts
        const postsQuery = `
          *[_type == "post" && category->type == "tech"] | order(_createdAt desc) {
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

        // Fetch categories
        const categoriesQuery = `
          *[_type == "category" && type == "tech"] | order(name asc) {
            _id,
            name,
            type,
            subcategory,
            slug
          }
        `

        const [fetchedPosts, fetchedCategories] = await Promise.all([
          client.fetch(postsQuery),
          client.fetch(categoriesQuery),
        ])

        setPosts(fetchedPosts || [])
        setCategories(fetchedCategories || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredPosts = selectedCategory ? posts.filter((post) => post.category._id === selectedCategory) : posts

  const featuredPost = filteredPosts[0]
  const allPosts = filteredPosts.slice(1)

  return (
    <div className="min-h-screen tech-theme relative overflow-hidden">
      <Navigation />

      <main className="pt-16 relative">
        <MinimalistHero
          icon={<Zap className="w-8 h-8 text-blue-500" />}
          title="Tech"
          subtitle="Where innovation sparks and technology comes alive"
          theme="tech"
        />

        {featuredPost && (
          <section className="py-12 relative border-b border-border/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FeaturedBlogCard post={featuredPost} theme="tech" />
            </div>
          </section>
        )}

        {categories.length > 0 && (
          <section className="py-12 relative border-b border-border/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-3">
                {/* Clear filter button */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-sm py-3 px-6 rounded-full transition-all duration-300 font-medium ${
                    selectedCategory === null
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                      : "bg-background border border-blue-500/30 text-muted-foreground hover:border-blue-500/60"
                  }`}
                >
                  All Posts
                </button>

                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`text-sm py-3 px-6 rounded-full transition-all duration-300 font-medium ${
                      selectedCategory === category._id
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                        : "bg-background border border-blue-500/30 text-muted-foreground hover:border-blue-500/60"
                    }`}
                  >
                    {category.subcategory}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 relative">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {allPosts.length > 0 ? (
              <>
                <h2 className="text-3xl font-bold mb-12 text-balance bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                  {selectedCategory ? "Filtered Articles" : "All Tech Posts"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allPosts.map((post) => (
                    <PostCard key={post._id} post={post} theme="tech" />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 relative">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" />
                  <Zap className="relative w-16 h-16 mx-auto text-muted-foreground/60" />
                </div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  No Tech Posts Yet
                </h2>
                <p className="text-muted-foreground text-pretty max-w-md mx-auto mb-4 leading-relaxed">
                  We're working on bringing you the latest in technology. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
