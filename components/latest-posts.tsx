import { client, type Post } from "@/lib/sanity"
import PostCard from "./post-card"

async function getLatestPosts(type: "tech" | "books", limit = 3): Promise<Post[]> {
  try {
    const query = `
      *[_type == "post" && category->type == "${type}"] | order(_createdAt desc) [0...${limit}] {
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
    console.error(`Error fetching ${type} posts:`, error)
    return []
  }
}

interface LatestPostsProps {
  type: "tech" | "books"
  title: string
  limit?: number
}

export async function LatestPosts({ type, title, limit = 3 }: LatestPostsProps) {
  const posts: Post[] = await getLatestPosts(type, limit)

  return (
    <section
      className={`
      relative py-24 overflow-hidden
      ${type === "tech" ? "tech-theme" : "books-theme"}
    `}
    >
      {/* Epic background effects */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div
          className={`
          absolute inset-0 opacity-30
          ${
            type === "tech"
              ? "bg-gradient-to-br from-tech-primary/5 via-transparent to-tech-secondary/5"
              : "bg-gradient-to-br from-books-primary/5 via-transparent to-books-secondary/5"
          }
        `}
        />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className={`
            w-full h-full
            ${
              type === "tech"
                ? "bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]"
                : "bg-[linear-gradient(rgba(245,158,11,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.1)_1px,transparent_1px)]"
            }
            bg-[size:50px_50px] animate-grid-move
          `}
          />
        </div>

        {/* Floating orbs */}
        <div
          className={`
          absolute top-20 left-1/4 w-32 h-32 rounded-full opacity-20 animate-float blur-xl
          ${type === "tech" ? "bg-tech-primary" : "bg-books-primary"}
        `}
        />
        <div
          className={`
          absolute bottom-20 right-1/4 w-24 h-24 rounded-full opacity-15 animate-float-delayed blur-xl
          ${type === "tech" ? "bg-tech-secondary" : "bg-books-secondary"}
        `}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Epic title with gradient and glow */}
        <div className="text-center mb-16">
          <h2
            className={`
            text-5xl md:text-6xl font-bold mb-4 text-balance
            bg-gradient-to-r bg-clip-text text-transparent animate-shimmer
            ${
              type === "tech"
                ? "from-tech-primary via-tech-secondary to-tech-primary"
                : "from-books-primary via-books-secondary to-books-primary"
            }
          `}
          >
            {title}
          </h2>

          {/* Subtitle with epic styling */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {type === "tech"
              ? "Dive into the latest innovations, tutorials, and insights from the world of technology"
              : "Discover captivating stories, reviews, and literary adventures that will expand your horizons"}
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div
              className={`
              h-px w-24 opacity-50
              ${type === "tech" ? "bg-tech-primary" : "bg-books-primary"}
            `}
            />
            <div
              className={`
              w-2 h-2 rounded-full mx-4
              ${type === "tech" ? "bg-tech-primary" : "bg-books-primary"}
            `}
            />
            <div
              className={`
              h-px w-24 opacity-50
              ${type === "tech" ? "bg-tech-primary" : "bg-books-primary"}
            `}
            />
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div key={post._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <PostCard post={post} theme={type} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div
              className={`
              relative p-12 rounded-3xl border backdrop-blur-sm
              ${
                type === "tech"
                  ? "tech-card-gradient border-tech-primary/20"
                  : "books-card-gradient border-books-primary/20"
              }
            `}
            >
              <div
                className={`
                w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center
                ${type === "tech" ? "bg-tech-primary/10 text-tech-primary" : "bg-books-primary/10 text-books-primary"}
              `}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <h3
                className={`
                text-2xl font-bold mb-3
                bg-gradient-to-r bg-clip-text text-transparent
                ${type === "tech" ? "from-tech-primary to-tech-secondary" : "from-books-primary to-books-secondary"}
              `}
              >
                Coming Soon
              </h3>

              <p className="text-muted-foreground mb-2">
                {type === "tech"
                  ? "Exciting tech content is on the way!"
                  : "Amazing book reviews and literary content coming soon!"}
              </p>

              <p className="text-sm text-muted-foreground/70">Stay tuned for updates and new posts in this category.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
