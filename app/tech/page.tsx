import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import PostCard from "@/components/post-card"
import { Badge } from "@/components/ui/badge"
import { client, type Post, type Category } from "@/lib/sanity"
import { Zap } from "lucide-react"

async function getTechPosts(): Promise<Post[]> {
  try {
    const query = `
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
        _createdAt
      }
    `

    const posts = await client.fetch(query)
    return posts || []
  } catch (error) {
    console.error("Error fetching tech posts:", error)
    return []
  }
}

async function getTechCategories(): Promise<Category[]> {
  try {
    const query = `
      *[_type == "category" && type == "tech"] | order(name asc) {
        _id,
        name,
        type,
        subcategory,
        slug
      }
    `

    const categories = await client.fetch(query)
    return categories || []
  } catch (error) {
    console.error("Error fetching tech categories:", error)
    return []
  }
}

export default async function TechPage() {
  const [posts, categories]: [Post[], Category[]] = await Promise.all([getTechPosts(), getTechCategories()])

  return (
    <div className="min-h-screen tech-theme">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600/20 to-blue-800/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Zap className="w-16 h-16 mx-auto mb-6 text-blue-500" />
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-balance">Tech</h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 text-pretty">
              Where innovation sparks and technology comes alive
            </p>
          </div>
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="py-12 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Badge key={category._id} variant="secondary" className="text-sm py-2 px-4">
                    {category.subcategory}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <>
                <h2 className="text-3xl font-bold mb-12 text-balance">Latest Tech Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} theme="tech" />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Zap className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-4">No Tech Posts Yet</h2>
                <p className="text-muted-foreground text-pretty">
                  We're working on bringing you the latest in technology. Check back soon!
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Make sure to set up your Sanity environment variables and add content in the Studio.
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
