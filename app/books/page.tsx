import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import PostCard from "@/components/post-card"
import { Badge } from "@/components/ui/badge"
import { client, type Post, type Category } from "@/lib/sanity"
import { BookOpen } from "lucide-react"

async function getBooksPosts(): Promise<Post[]> {
  try {
    const query = `
      *[_type == "post" && category->type == "books"] | order(_createdAt desc) {
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
    console.error("Error fetching books posts:", error)
    return []
  }
}

async function getBooksCategories(): Promise<Category[]> {
  try {
    const query = `
      *[_type == "category" && type == "books"] | order(name asc) {
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
    console.error("Error fetching books categories:", error)
    return []
  }
}

export default async function BooksPage() {
  const [posts, categories]: [Post[], Category[]] = await Promise.all([getBooksPosts(), getBooksCategories()])

  return (
    <div className="min-h-screen books-theme relative overflow-hidden">
      <Navigation />

      <main className="pt-16 relative">
        <section className="relative py-12 overflow-hidden border-b border-border/20">
          {/* Subtle animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 via-orange-500/5 to-amber-800/5" />

          {/* Minimal floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-amber-400/40 rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-orange-400/60 rounded-full animate-ping" />
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-amber-500/30 rounded-full animate-pulse" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-lg animate-pulse" />
                <BookOpen className="relative w-12 h-12 text-amber-500 drop-shadow-lg" />
              </div>

              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Books
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Where stories come alive and literature meets life
                </p>
              </div>
            </div>

            {/* Integrated categories */}
            {categories.length > 0 && (
              <div className="mt-8 pt-8 border-t border-border/20">
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Badge
                      key={category._id}
                      variant="secondary"
                      className="text-sm py-2 px-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300 hover:scale-105"
                    >
                      {category.subcategory}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/3 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <>
                <h2 className="text-3xl font-bold mb-12 text-balance bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">
                  Latest Book Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} theme="books" />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5 rounded-3xl blur-xl" />
                <div className="relative">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse" />
                    <BookOpen className="relative w-16 h-16 mx-auto text-muted-foreground/60" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    No Book Posts Yet
                  </h2>
                  <p className="text-muted-foreground text-pretty max-w-md mx-auto mb-4 leading-relaxed">
                    We're curating the best literary content for you. Check back soon!
                  </p>
                  <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto">
                    Make sure to set up your Sanity environment variables and add content in the Studio.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
