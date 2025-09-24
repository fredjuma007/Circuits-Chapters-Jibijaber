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
}

export async function LatestPosts({ type, title }: LatestPostsProps) {
  const posts: Post[] = await getLatestPosts(type)

  return (
    <section className={`py-16 ${type === "tech" ? "tech-theme" : "books-theme"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-balance">{title}</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} theme={type} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No posts available yet. Check back soon!</p>
            <p className="text-sm mt-2">
              Make sure to set up your Sanity environment variables and add content in the Studio.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
